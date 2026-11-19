const fs = require("fs");
const buffer = fs.readFileSync("./public/models/head.glb");
const chunk0Length = buffer.readUInt32LE(12);
const jsonString = buffer.toString("utf8", 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonString);
const prim = gltf.meshes[0].primitives[0];
const posAccessor = gltf.accessors[prim.attributes.POSITION];
console.log("Min:", posAccessor.min);
console.log("Max:", posAccessor.max);

