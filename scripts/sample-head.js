const fs = require('fs');
const THREE = require('three');

// Read GLB
const buffer = fs.readFileSync('./public/models/head.glb');
const chunk0Length = buffer.readUInt32LE(12);
const jsonString = buffer.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonString);

const chunk1Offset = 20 + chunk0Length;
const chunk1Length = buffer.readUInt32LE(chunk1Offset);
const binBuffer = buffer.subarray(chunk1Offset + 8, chunk1Offset + 8 + chunk1Length);

const prim = gltf.meshes[0].primitives[0];
const posAccessor = gltf.accessors[prim.attributes.POSITION];
const normAccessor = gltf.accessors[prim.attributes.NORMAL];
const indAccessor = gltf.accessors[prim.indices];

const posView = gltf.bufferViews[posAccessor.bufferView];
const normView = gltf.bufferViews[normAccessor.bufferView];
const indView = gltf.bufferViews[indAccessor.bufferView];

const positions = new Float32Array(binBuffer.buffer, binBuffer.byteOffset + (posView.byteOffset || 0) + (posAccessor.byteOffset || 0), posAccessor.count * 3);
const normals = new Float32Array(binBuffer.buffer, binBuffer.byteOffset + (normView.byteOffset || 0) + (normAccessor.byteOffset || 0), normAccessor.count * 3);
const indices = new Uint16Array(binBuffer.buffer, binBuffer.byteOffset + (indView.byteOffset || 0) + (indAccessor.byteOffset || 0), indAccessor.count);

console.log('Parsed mesh successfully. Triangles:', indices.length / 3);

// Let's compute triangle areas
const numTriangles = indices.length / 3;
const triangleAreas = new Float64Array(numTriangles);
const cumulativeAreas = new Float64Array(numTriangles);

let totalArea = 0;
for (let i = 0; i < numTriangles; i++) {
  const i0 = indices[i * 3];
  const i1 = indices[i * 3 + 1];
  const i2 = indices[i * 3 + 2];

  const ax = positions[i0 * 3], ay = positions[i0 * 3 + 1], az = positions[i0 * 3 + 2];
  const bx = positions[i1 * 3], by = positions[i1 * 3 + 1], bz = positions[i1 * 3 + 2];
  const cx = positions[i2 * 3], cy = positions[i2 * 3 + 1], cz = positions[i2 * 3 + 2];

  // Cross product (B - A) x (C - A)
  const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
  const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;

  const crx = e1y * e2z - e1z * e2y;
  const cry = e1z * e2x - e1x * e2z;
  const crz = e1x * e2y - e1y * e2x;

  const area = 0.5 * Math.sqrt(crx * crx + cry * cry + crz * crz);
  
  // Weight front-facing triangles higher for hero camera
  // Normal of triangle
  const nz = crz / (2 * area || 1);
  const frontWeight = nz > -0.3 ? 1.0 : (nz > -0.6 ? 0.3 : 0.05);

  const weightedArea = area * frontWeight;
  triangleAreas[i] = weightedArea;
  totalArea += weightedArea;
  cumulativeAreas[i] = totalArea;
}

console.log('Total weighted area:', totalArea);

// Binary search helper for area sampling
function pickTriangle(target) {
  let low = 0, high = numTriangles - 1;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (cumulativeAreas[mid] < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

// Sample 40,000 points
const sampleCount = 40000;
const sampledPoints = new Float32Array(sampleCount * 3);
const sampledNormals = new Float32Array(sampleCount * 3);

for (let i = 0; i < sampleCount; i++) {
  const rArea = Math.random() * totalArea;
  const triIdx = pickTriangle(rArea);

  const i0 = indices[triIdx * 3];
  const i1 = indices[triIdx * 3 + 1];
  const i2 = indices[triIdx * 3 + 2];

  let r1 = Math.random();
  let r2 = Math.random();
  if (r1 + r2 > 1) {
    r1 = 1 - r1;
    r2 = 1 - r2;
  }
  const r0 = 1 - r1 - r2;

  // Position
  const px = r0 * positions[i0 * 3] + r1 * positions[i1 * 3] + r2 * positions[i2 * 3];
  const py = r0 * positions[i0 * 3 + 1] + r1 * positions[i1 * 3 + 1] + r2 * positions[i2 * 3 + 1];
  const pz = r0 * positions[i0 * 3 + 2] + r1 * positions[i1 * 3 + 2] + r2 * positions[i2 * 3 + 2];

  // Normal
  const nx = r0 * normals[i0 * 3] + r1 * normals[i1 * 3] + r2 * normals[i2 * 3];
  const ny = r0 * normals[i0 * 3 + 1] + r1 * normals[i1 * 3 + 1] + r2 * normals[i2 * 3 + 1];
  const nz = r0 * normals[i0 * 3 + 2] + r1 * normals[i1 * 3 + 2] + r2 * normals[i2 * 3 + 2];

  // Scale and center head: scale to match canvas world units (~65 units high)
  const SCALE = 8.5;
  sampledPoints[i * 3] = px * SCALE;
  sampledPoints[i * 3 + 1] = (py + 0.2) * SCALE;
  sampledPoints[i * 3 + 2] = pz * SCALE;

  sampledNormals[i * 3] = nx;
  sampledNormals[i * 3 + 1] = ny;
  sampledNormals[i * 3 + 2] = nz;
}

// Write to public/models/head-particles.bin
// Format: Header [4 bytes: count], then [count * 3 floats: positions], then [count * 3 floats: normals]
const outBuffer = Buffer.alloc(4 + sampleCount * 3 * 4 + sampleCount * 3 * 4);
outBuffer.writeUInt32LE(sampleCount, 0);

Buffer.from(sampledPoints.buffer).copy(outBuffer, 4);
Buffer.from(sampledNormals.buffer).copy(outBuffer, 4 + sampleCount * 3 * 4);

fs.writeFileSync('./public/models/head-particles.bin', outBuffer);
console.log('Successfully generated head-particles.bin! File size:', outBuffer.length, 'bytes');

