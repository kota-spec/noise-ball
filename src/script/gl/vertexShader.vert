#pragma glslify:cnoise=require(./simplex/3d.glsl)

varying float noise;
varying vec2 vUv;
uniform float time;
//グネグネの振り幅
const float amplitude=.2;
//グネグネのスピード
const float speed=.07;

void main(){
  float t=time*.003;
  vUv=uv;
  noise=cnoise(vec3(normal*amplitude+t*speed));
  
  vec3 p=position+normal*noise*.2;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
}