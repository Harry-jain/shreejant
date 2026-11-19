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

// Find the front-most point (tip of nose)
let maxZ = -999, noseIdx = -1;
for (let i = 0; i < posAccessor.count; i++) {
  const z = positions[i * 3 + 2];
  if (z > maxZ) {
    maxZ = z;
    noseIdx = i;
  }
}

console.log("Tip of nose at:", positions[noseIdx * 3], positions[noseIdx * 3 + 1], positions[noseIdx * 3 + 2]);

