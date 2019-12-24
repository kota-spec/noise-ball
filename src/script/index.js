import * as THREE from 'three';

import vertexShader from './gl/vertexShader.vert';
import fragmentShader from './gl/fragmentShader.frag';

class Ball {
  constructor () {
    this.renderer = null;
    this.scene = null;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.ratio = window.devicePixelRatio ? window.devicePixelRatio : 1;

    this.material = null;
    this.geometry = null;

    this.time = 0;

    this.mesh = null;
    this.mouse = new THREE.Vector2(0.0, 0.0);

    this.camera = null;

    this.onResize = this.onResize.bind(this);
  }

  init () {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#js-canvas')
    });

    this.scene = new THREE.Scene();

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(this.ratio);

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      10000
    );
    this.camera.position.set(0, 0, 1.5);

    this.geometry = new THREE.IcosahedronGeometry(0.5, 5);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { type: 'f', value: 0.01 }
      },
      vertexShader,
      fragmentShader
    });

    // メッシュを作成
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // 3D空間にメッシュを追加
    this.scene.add(this.mesh);

    this.renderer.render(this.scene, this.camera);

    this.onListener();
  }

  onListener () {
    window.addEventListener('resize', this.onResize);

    this.animate();
  }

  animate () {
    console.log();
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  render () {
    this.time = performance.now();
    this.material.uniforms.time.value = this.time;
    // this.material.uniforms.uMouse.value = this.mouse;
    this.renderer.render(this.scene, this.camera);
  }

  onResize () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height; // カメラのアスペクト比を変更
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
}

const ball = new Ball();

ball.init();
