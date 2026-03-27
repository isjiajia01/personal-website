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

  group.add(buildLetter(faceMaterial));
  return group;
}

export default function HeroAsciiScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const bgColor = new THREE.Color(0xf4eadb);
    const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);
    camera.position.set(0.18, 0.7, 48);
    camera.lookAt(0, 0.72, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(bgColor, 0);
    renderer.domElement.style.display = "none";

    const effect = new AsciiEffect(renderer, " .,:;=ox%#@", {
      invert: false,
      resolution: 0.12
    });
    effect.domElement.className = "hero-ascii-output";
    effect.domElement.style.background = "transparent";
    effect.domElement.style.color = "#5b4429";
    container.appendChild(effect.domElement);

    const scene = new THREE.Scene();
    const ambient = new THREE.AmbientLight(0xfff3e4, 0.72);
    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.2);
    const fillLight = new THREE.DirectionalLight(0xe9c99c, 0.88);
    const rimLight = new THREE.DirectionalLight(0x8e643d, 0.42);

    keyLight.position.set(10, 14, 18);
    fillLight.position.set(-12, -2, 10);
    rimLight.position.set(-14, 10, 6);

    scene.add(ambient, keyLight, fillLight, rimLight);

    const faceMaterial = new THREE.MeshStandardMaterial({
      color: 0x2c2218,
      roughness: 0.66,
      metalness: 0.01
    });

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xddc2a2,
      roughness: 0.96,
      metalness: 0,
      transparent: true,
      opacity: 0.18
    });

    const root = new THREE.Group();
    const j = createLetterStack(buildLetterJ, faceMaterial, bodyMaterial);
    const i = createLetterStack(buildLetterI, faceMaterial, bodyMaterial);
    const a = createLetterStack(buildLetterA, faceMaterial, bodyMaterial);

    j.position.x = -5.85;
    i.position.x = 0;
    a.position.x = 5.95;
    a.position.z = 0.2;

    root.add(j, i, a);
    root.scale.setScalar(0.82);
    root.position.y = 0.92;
    scene.add(root);

    let width = 0;
    let height = 0;
    let frameId = 0;
    let isVisible = true;
    let lastRenderAt = 0;
    let snapTransitionActive = false;
    let glitchEndsAt = 0;
    let nextGlitchAt = performance.now() + 2600;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerCurrentX = 0;
    let pointerCurrentY = 0;
    const normalFrameInterval = 1000 / 20;
    const snapFrameInterval = 1000 / 9;

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
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible && !document.hidden && !frameId) {
          frameId = window.requestAnimationFrame(render);
        }
      },
      { threshold: 0.08 }
    );
    visibilityObserver.observe(container);

    const handlePointerMove = (event) => {
      if (snapTransitionActive) return;
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

    const handleSnapTransition = (event) => {
      snapTransitionActive = Boolean(event.detail?.active);
      if (snapTransitionActive) {
        pointerTargetX = 0;
        pointerTargetY = 0;
      }
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("hero-snap-transition", handleSnapTransition);

    const handleVisibilityChange = () => {
      if (document.hidden && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        return;
      }

      if (!document.hidden && isVisible && !frameId) {
        frameId = window.requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const render = (time) => {
      frameId = 0;
      if (!isVisible || document.hidden) return;

      const activeFrameInterval = snapTransitionActive ? snapFrameInterval : normalFrameInterval;
      if (time - lastRenderAt < activeFrameInterval) {
        frameId = window.requestAnimationFrame(render);
        return;
      }
      lastRenderAt = time;

      const t = time * 0.001;
      const isGlitching = time < glitchEndsAt;

      if (time > nextGlitchAt) {
        glitchEndsAt = time + 140;
        nextGlitchAt = time + 3200 + Math.random() * 4200;
      }

      const pointerLerp = snapTransitionActive ? 0.12 : 0.06;
      pointerCurrentX += (pointerTargetX - pointerCurrentX) * pointerLerp;
      pointerCurrentY += (pointerTargetY - pointerCurrentY) * pointerLerp;

      root.rotation.x = -0.04 + Math.cos(t * 0.7) * 0.01 - pointerCurrentY * 0.028;
      root.rotation.y = 0.095 + Math.sin(t * 0.52) * 0.022 + pointerCurrentX * 0.04;
      root.rotation.z = Math.sin(t * 0.3) * 0.008;
      root.position.y = 0.92 + Math.sin(t * 0.9) * 0.08 - pointerCurrentY * 0.11;
      root.position.x = pointerCurrentX * 0.14;

      if (isGlitching) {
        root.rotation.y += (Math.random() - 0.5) * 0.028;
        root.position.x = (Math.random() - 0.5) * 0.08;
        camera.position.x = 0.18 + (Math.random() - 0.5) * 0.05;
      } else {
        camera.position.x += (0.18 - camera.position.x) * 0.12;
      }

      camera.lookAt(root.position.x * 0.05, 0.72, 0);

      effect.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("hero-snap-transition", handleSnapTransition);
      effect.domElement.remove();
      root.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.geometry.dispose();
        }
      });
      faceMaterial.dispose();
      bodyMaterial.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div className="hero-ascii-scene" aria-hidden="true" ref={mountRef} />;
}
