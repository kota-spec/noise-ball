#ifdef GL_ES
precision highp float;
#endif

uniform float time;
varying vec2 vUv;

void main(){
  float t=time*.001;
  gl_FragColor=vec4(vUv,sin(t),1.);
}