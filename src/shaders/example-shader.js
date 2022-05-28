export const vertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;

  vec4 pos = modelViewMatrix * vec4(position, 1.0);
  vPosition = pos.xyz;

  gl_Position = projectionMatrix * pos;
}
`;

export const fragmentShader = /* glsl */ `
uniform vec3 color;
uniform float colorMix;

varying vec3 vPosition;

void main() {
  vec3 positionColor = vPosition;
  vec3 finalColor = mix(positionColor, color, colorMix);

  gl_FragColor = vec4(finalColor, 1);
}
`;
