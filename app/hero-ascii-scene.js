"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";

function shapeToMesh(shape, material) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 1.1,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08,
    curveSegments: 24
  });
  geometry.center();
  return new THREE.Mesh(geometry, material);
}

function buildLetterJ(material) {
  const shape = new THREE.Shape();
  shape.moveTo(-3.95, 5.1);
  shape.lineTo(3.65, 5.1);
  shape.lineTo(3.65, 4.15);
  shape.lineTo(1.55, 4.15);
  shape.lineTo(1.55, 3.35);
  shape.lineTo(0.62, 3.35);
  shape.lineTo(0.62, -2.95);
  shape.quadraticCurveTo(0.62, -4.95, -0.55, -6.05);
  shape.quadraticCurveTo(-1.72, -7.1, -3.55, -7.1);
  shape.quadraticCurveTo(-4.7, -7.1, -5.7, -6.7);
  shape.lineTo(-5.7, -5.28);
  shape.quadraticCurveTo(-4.72, -5.9, -3.75, -5.9);
  shape.quadraticCurveTo(-2.52, -5.9, -1.85, -5.15);
  shape.quadraticCurveTo(-1.2, -4.38, -1.2, -2.98);
  shape.lineTo(-1.2, 3.35);
  shape.lineTo(-4.15, 3.35);
  shape.lineTo(-4.15, 4.15);
  shape.lineTo(-3.95, 4.15);
  shape.closePath();
  return shapeToMesh(shape, material);
}

function buildLetterI(material) {
  const shape = new THREE.Shape();
  shape.moveTo(-3.8, 5.1);
  shape.lineTo(3.8, 5.1);
  shape.lineTo(3.8, 4.15);
  shape.lineTo(1.32, 4.15);
  shape.lineTo(1.32, 3.35);
  shape.lineTo(0.55, 3.35);
  shape.lineTo(0.55, -5.6);
  shape.lineTo(1.32, -5.6);
  shape.lineTo(1.32, -6.4);
  shape.lineTo(3.8, -6.4);
  shape.lineTo(3.8, -7.35);
  shape.lineTo(-3.8, -7.35);
  shape.lineTo(-3.8, -6.4);
  shape.lineTo(-1.32, -6.4);
  shape.lineTo(-1.32, -5.6);
  shape.lineTo(-0.55, -5.6);
  shape.lineTo(-0.55, 3.35);
  shape.lineTo(-1.32, 3.35);
  shape.lineTo(-1.32, 4.15);
  shape.lineTo(-3.8, 4.15);
  shape.closePath();
  return shapeToMesh(shape, material);
}

function buildLetterA(material) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 6.4);
  shape.lineTo(5.55, -7.2);
  shape.lineTo(4.0, -7.2);
  shape.lineTo(2.7, -4.1);
  shape.lineTo(-2.7, -4.1);
  shape.lineTo(-4.0, -7.2);
  shape.lineTo(-5.55, -7.2);
  shape.lineTo(0, 6.4);
  shape.closePath();

  const inner = new THREE.Path();
  inner.moveTo(0, 2.9);
  inner.lineTo(2.18, -1.72);
  inner.lineTo(-2.18, -1.72);
  inner.closePath();
  shape.holes.push(inner);

  return shapeToMesh(shape, material);
}

function createLetterStack(buildLetter, faceMaterial, bodyMaterial) {
  const group = new THREE.Group();
  const depthLayers = 3;

  for (let layer = depthLayers; layer >= 1; layer -= 1) {
    const shell = buildLetter(bodyMaterial);
    shell.position.set(-layer * 0.2, layer * 0.12, -layer * 0.18);
    shell.rotation.z = -0.003 * layer;
    group.add(shell);
  }

  const face = buildLetter(faceMaterial);
  face.renderOrder = 2;
  group.add(face);

  return group;
}

export default function HeroAsciiScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(0xf4eadb);
    scene.background = bgColor;
    const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);
    camera.position.set(0.85, 1.0, 39);
    camera.lookAt(0, 1.0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(bgColor, 1);

    const asciiChars = " .,:;=ox%#@";
    const effect = new AsciiEffect(renderer, asciiChars, { invert: false, resolution: 0.16 });
    effect.domElement.className = "hero-ascii-output";
    effect.domElement.style.backgroundColor = "#f4eadb";
    effect.domElement.style.color = "#5b4429";

    container.appendChild(effect.domElement);

    const ambient = new THREE.AmbientLight(0xfff3e4, 0.72);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.2);
    keyLight.position.set(10, 14, 18);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe9c99c, 0.88);
    fillLight.position.set(-12, -2, 10);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x8e643d, 0.42);
    rimLight.position.set(-14, 10, 6);
    scene.add(rimLight);

    const faceMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c2218,
      roughness: 0.66,
      metalness: 0.01
    });

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xddc2a2,
      roughness: 0.96,
      metalness: 0.0,
      transparent: true,
      opacity: 0.18
    });

    const root = new THREE.Group();
    const j = createLetterStack(buildLetterJ, faceMaterial, bodyMaterial);
    const i = createLetterStack(buildLetterI, faceMaterial, bodyMaterial);
    const a = createLetterStack(buildLetterA, faceMaterial, bodyMaterial);

    j.position.x = -6.8;
    i.position.x = 0;
    a.position.x = 6.95;
    a.position.z = 0.2;

    root.add(j, i, a);
    root.scale.setScalar(0.98);
    root.position.y = 1.55;
    scene.add(root);

    let width = 0;
    let height = 0;
    let frameId = 0;
    let glitchEndsAt = 0;
    let nextGlitchAt = performance.now() + 2600;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerCurrentX = 0;
    let pointerCurrentY = 0;

    const resize = () => {
      width = container.clientWidth || 960;
      height = container.clientHeight || 440;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      effect.setSize(width, height);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const normalizedX = (event.clientX - rect.left) / rect.width;
      const normalizedY = (event.clientY - rect.top) / rect.height;
      pointerTargetX = (normalizedX - 0.5) * 2;
      pointerTargetY = (normalizedY - 0.5) * 2;
    };

    const handlePointerLeave = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);

    const render = (time) => {
      const t = time * 0.001;
      const isGlitching = time < glitchEndsAt;

      if (time > nextGlitchAt) {
        glitchEndsAt = time + 140;
        nextGlitchAt = time + 3200 + Math.random() * 4200;
      }

      pointerCurrentX += (pointerTargetX - pointerCurrentX) * 0.06;
      pointerCurrentY += (pointerTargetY - pointerCurrentY) * 0.06;

      root.rotation.x = -0.06 + Math.cos(t * 0.7) * 0.014 - pointerCurrentY * 0.04;
      root.rotation.y = 0.14 + Math.sin(t * 0.52) * 0.035 + pointerCurrentX * 0.06;
      root.rotation.z = Math.sin(t * 0.3) * 0.008;
      root.position.y = 1.55 + Math.sin(t * 0.9) * 0.14 - pointerCurrentY * 0.18;
      root.position.x = pointerCurrentX * 0.24;

      if (isGlitching) {
        root.rotation.y += (Math.random() - 0.5) * 0.05;
        root.position.x = (Math.random() - 0.5) * 0.18;
        camera.position.x = 0.85 + (Math.random() - 0.5) * 0.1;
      } else {
        camera.position.x += (0.85 - camera.position.x) * 0.12;
      }

      camera.lookAt(root.position.x * 0.08, 0.98, 0);

      effect.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      effect.domElement.remove();

      root.traverse((node) => {
        if (!(node instanceof THREE.Mesh)) return;
        node.geometry.dispose();
      });
      faceMaterial.dispose();
      bodyMaterial.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div className="hero-ascii-scene" aria-hidden="true" ref={mountRef} />;
}
