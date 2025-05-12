import { useEffect, useRef } from "react";
import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const ThreeScene = ({ onLoaded , darkMode}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(3.5, 0, -10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 10, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(2048, 2048);
    scene.add(dirLight);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 0.6));
    scene.add(new THREE.PointLight(0xffffff, 0.5).position.set(2, 2, 2));

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    // Mouse parallax
    const mouse = { x: 0, y: 0 };

    // Sparkle effect
  

    // Star field
    const stars = [];
    for (let i = 0; i < 1000; i++) {
      const star = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 12, 12),
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: Math.random(),
        })
      );
      star.position.set(
        THREE.MathUtils.randFloatSpread(100),
        THREE.MathUtils.randFloatSpread(100),
        THREE.MathUtils.randFloatSpread(100)
      );
      scene.add(star);
      stars.push(star);
    }

    // Load model + glow texture
    const loader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const modelPath =
      darkMode === false
        ? "/3d_assets/purple_planet/scene.gltf"
        : "/3d_assets/green_planet/scene.gltf";

    textureLoader.load("/3d_assets/glow.png", (glowTexture) => {
      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene;
          modelRef.current = model;

          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          model.position.set(3.5, 0, 0);
          scene.add(model);

          const spriteMaterial = new THREE.SpriteMaterial({
            map: glowTexture,
            color: 0xa38bfe,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.4,
          });

          const glow = new THREE.Sprite(spriteMaterial);
          glow.scale.set(4, 5, 2);
          model.add(glow);

          // Notify parent component after 1s
          if (onLoaded) {
            setTimeout(() => {
              onLoaded();
            }, 1000);
          }
        },
        undefined,
        (error) => console.error("Error loading GLTF model:", error)
      );
    });

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (modelRef.current) {
        modelRef.current.rotation.y += delta * 0.3;
        modelRef.current.position.y = -Math.sin(clock.elapsedTime * 1) * 0.1;
      }

      stars.forEach((star, i) => {
        star.material.opacity = 0.5 + Math.sin(clock.elapsedTime * 2 + i) * 0.3;
        const s = star.position;
        const angle = 0.0005;
        const x = s.x * Math.cos(angle) - s.z * Math.sin(angle);
        const z = s.x * Math.sin(angle) + s.z * Math.cos(angle);
        star.position.set(x, s.y, z);
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // GSAP camera fly-in
    gsap.to(camera.position, {
      duration: 2.5,
      delay: 0.2,
      x: 5,
      y: 0,
      z: 2.5,
      ease: "power3.inOut",
    });

    // Handle resize
    const handleResize = () => {
      const { width, height } = container.getBoundingClientRect();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full absolute" />;
};

export default ThreeScene;
