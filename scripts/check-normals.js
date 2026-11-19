const fs = require("fs");
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

const posView = gltf.bufferViews[posAccessor.bufferView];
const normView = gltf.bufferViews[normAccessor.bufferView];
const indView = gltf.bufferViews[indAccessor.bufferView];

const positions = new Float32Array(binBuffer.buffer, binBuffer.byteOffset + (posView.byteOffset || 0) + (posAccessor.byteOffset || 0), posAccessor.count * 3);
const normals = new Float32Array(binBuffer.buffer, binBuffer.byteOffset + (normView.byteOffset || 0) + (normAccessor.byteOffset || 0), normAccessor.count * 3);
const indices = new Uint16Array(binBuffer.buffer, binBuffer.byteOffset + (indView.byteOffset || 0) + (indAccessor.byteOffset || 0), indAccessor.count);

let frontTriangles = 0;
let backTriangles = 0;

for (let i = 0; i < indices.length / 3; i++) {
  const i0 = indices[i * 3];
  const i1 = indices[i * 3 + 1];
  const i2 = indices[i * 3 + 2];
  
  const avgZ = (positions[i0 * 3 + 2] + positions[i1 * 3 + 2] + positions[i2 * 3 + 2]) / 3;
  const avgNormZ = (normals[i0 * 3 + 2] + normals[i1 * 3 + 2] + normals[i2 * 3 + 2]) / 3;
  if (avgNormZ > 0) frontTriangles++;
  else backTriangles++;
}
console.log("Triangles with normal.z > 0 (front-facing):", frontTriangles);
console.log("Triangles with normal.z <= 0 (back-facing):", backTriangles);

