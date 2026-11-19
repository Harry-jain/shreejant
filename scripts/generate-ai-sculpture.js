const fs = require("fs");

// Read head.glb
const buffer = fs.readFileSync("./public/models/head.glb");
const chunk0Length = buffer.readUInt32LE(12);
const jsonString = buffer.toString("utf8", 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonString);

const chunk1Offset = 20 + chunk0Length;
const binBuffer = buffer.subarray(chunk1Offset + 8);

const prim = gltf.meshes[0].primitives[0];
const posAccessor = gltf.accessors[prim.attributes.POSITION];
const normAccessor = gltf.accessors[prim.attributes.NORMAL];
const indAccessor = gltf.accessors[prim.indices];

const pos = new Float32Array(
  binBuffer.buffer,
  binBuffer.byteOffset + (gltf.bufferViews[posAccessor.bufferView].byteOffset || 0) + (posAccessor.byteOffset || 0),
  posAccessor.count * 3
);
const norm = new Float32Array(
  binBuffer.buffer,
  binBuffer.byteOffset + (gltf.bufferViews[normAccessor.bufferView].byteOffset || 0) + (normAccessor.byteOffset || 0),
  normAccessor.count * 3
);
const indices = new Uint16Array(
  binBuffer.buffer,
  binBuffer.byteOffset + (gltf.bufferViews[indAccessor.bufferView].byteOffset || 0) + (indAccessor.byteOffset || 0),
  indAccessor.count
);

const numTriangles = indices.length / 3;
const filteredIndices = [];
const cumulativeAreas = [];
let totalArea = 0;

for (let i = 0; i < numTriangles; i++) {
  const i0 = indices[i * 3];
  const i1 = indices[i * 3 + 1];
  const i2 = indices[i * 3 + 2];

  const ax = pos[i0 * 3], ay = pos[i0 * 3 + 1], az = pos[i0 * 3 + 2];
  const bx = pos[i1 * 3], by = pos[i1 * 3 + 1], bz = pos[i1 * 3 + 2];
  const cx = pos[i2 * 3], cy = pos[i2 * 3 + 1], cz = pos[i2 * 3 + 2];

  const avgX = (ax + bx + cx) / 3;
  const avgY = (ay + by + cy) / 3;
  const avgZ = (az + bz + cz) / 3;

  const nx = (norm[i0 * 3] + norm[i1 * 3] + norm[i2 * 3]) / 3;
  const ny = (norm[i0 * 3 + 1] + norm[i1 * 3 + 1] + norm[i2 * 3 + 1]) / 3;
  const nz = (norm[i0 * 3 + 2] + norm[i1 * 3 + 2] + norm[i2 * 3 + 2]) / 3;

  // 1. Cut below neck
  if (avgY < -1.4) continue;
  // 2. Cut wide horizontal shoulders (keep sleek neck)
  if (avgY < -0.4 && Math.abs(avgX) > 1.35) continue;
  // 3. Cut back of skull (nz < -0.2)
  if (nz < -0.15) continue;

  const e1x = bx - ax, e1y = by - ay, e1z = bz - az;
  const e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
  const crx = e1y * e2z - e1z * e2y;
  const cry = e1z * e2x - e1x * e2z;
  const crz = e1x * e2y - e1y * e2x;
  const area = 0.5 * Math.sqrt(crx * crx + cry * cry + crz * crz);
  if (area <= 0.000001) continue;

  // Smooth, pure physical area weighting: zero artificial boxes or patches!
  let weight = 1.0;
  if (nz > 0.1) {
    weight = 2.0; // Uniform front-facing enhancement
  }

  // Taper neck smoothly down to -1.4
  if (avgY < -0.7) {
    weight *= Math.max(0.2, (avgY - (-1.4)) / 0.7);
  }

  const weightedArea = area * weight;
  totalArea += weightedArea;

  filteredIndices.push(i0, i1, i2);
  cumulativeAreas.push(totalArea);
}

const numFilteredTriangles = filteredIndices.length / 3;

function pickTriangle(target) {
  let low = 0, high = numFilteredTriangles - 1;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (cumulativeAreas[mid] < target) low = mid + 1;
    else high = mid;
  }
  return low;
}

const TOTAL_POINTS = 36000;
const points = new Float32Array(TOTAL_POINTS * 3);
const outNormals = new Float32Array(TOTAL_POINTS * 3);

// Center vertically on nose level Y = 1.10
const Y_CENTER = 1.10;
const SCALE = 16.5;

// Sample 32,000 pure anatomical points
const meshPointsCount = 32000;
for (let i = 0; i < meshPointsCount; i++) {
  const rArea = Math.random() * totalArea;
  const triIdx = pickTriangle(rArea);

  const i0 = filteredIndices[triIdx * 3];
  const i1 = filteredIndices[triIdx * 3 + 1];
  const i2 = filteredIndices[triIdx * 3 + 2];

  let r1 = Math.random(), r2 = Math.random();
  if (r1 + r2 > 1) {
    r1 = 1 - r1;
    r2 = 1 - r2;
  }
  const r0 = 1 - r1 - r2;

  const px = r0 * pos[i0 * 3] + r1 * pos[i1 * 3] + r2 * pos[i2 * 3];
  const py = r0 * pos[i0 * 3 + 1] + r1 * pos[i1 * 3 + 1] + r2 * pos[i2 * 3 + 1];
  const pz = r0 * pos[i0 * 3 + 2] + r1 * pos[i1 * 3 + 2] + r2 * pos[i2 * 3 + 2];

  const nx = r0 * norm[i0 * 3] + r1 * norm[i1 * 3] + r2 * norm[i2 * 3];
  const ny = r0 * norm[i0 * 3 + 1] + r1 * norm[i1 * 3 + 1] + r2 * norm[i2 * 3 + 1];
  const nz = r0 * norm[i0 * 3 + 2] + r1 * norm[i1 * 3 + 2] + r2 * norm[i2 * 3 + 2];

  points[i * 3] = px * SCALE;
  points[i * 3 + 1] = (py - Y_CENTER) * SCALE;
  points[i * 3 + 2] = (pz - 1.2) * SCALE;

  outNormals[i * 3] = nx;
  outNormals[i * 3 + 1] = ny;
  outNormals[i * 3 + 2] = nz;
}

// 2,500 Cybernetic Vertical Circuit Streams (forehead/crown & sleek neck)
const streamPointsCount = 2500;
for (let i = meshPointsCount; i < meshPointsCount + streamPointsCount; i++) {
  const isNeck = Math.random() < 0.45;
  let sx, sy, sz;
  if (isNeck) {
    const angle = (Math.random() - 0.5) * 1.5;
    sx = Math.sin(angle) * 1.05;
    sy = -0.5 - Math.random() * 0.9;
    sz = Math.cos(angle) * 1.15;
  } else {
    const angle = (Math.random() - 0.5) * 2.0;
    sx = Math.sin(angle) * 1.45;
    sy = 2.4 + Math.random() * 1.3;
    sz = Math.cos(angle) * 1.3;
  }

  points[i * 3] = sx * SCALE;
  points[i * 3 + 1] = (sy - Y_CENTER) * SCALE;
  points[i * 3 + 2] = (sz - 1.2) * SCALE;

  outNormals[i * 3] = sx * 0.5;
  outNormals[i * 3 + 1] = isNeck ? -0.2 : 0.4;
  outNormals[i * 3 + 2] = 0.85;
}

// 1,500 Subtle ambient floating motes
for (let i = meshPointsCount + streamPointsCount; i < TOTAL_POINTS; i++) {
  const baseIdx = Math.floor(Math.random() * meshPointsCount) * 3;
  const bx = points[baseIdx];
  const by = points[baseIdx + 1];
  const bz = points[baseIdx + 2];
  const bnx = outNormals[baseIdx];
  const bny = outNormals[baseIdx + 1];
  const bnz = outNormals[baseIdx + 2];

  const dist = 0.4 + Math.random() * 1.6;
  points[i * 3] = bx + bnx * dist + (Math.random() - 0.5) * 0.6;
  points[i * 3 + 1] = by + bny * dist + (Math.random() - 0.5) * 0.6;
  points[i * 3 + 2] = bz + bnz * dist + (Math.random() - 0.5) * 0.6;

  outNormals[i * 3] = bnx;
  outNormals[i * 3 + 1] = bny;
  outNormals[i * 3 + 2] = bnz;
}

// Write to public/models/head-particles.bin
const outBuffer = Buffer.alloc(4 + TOTAL_POINTS * 3 * 4 + TOTAL_POINTS * 3 * 4);
outBuffer.writeUInt32LE(TOTAL_POINTS, 0);

Buffer.from(points.buffer).copy(outBuffer, 4);
Buffer.from(outNormals.buffer).copy(outBuffer, 4 + TOTAL_POINTS * 3 * 4);

fs.writeFileSync("./public/models/head-particles.bin", outBuffer);
console.log("SUCCESS: Pure anatomical sculpture generated!");
