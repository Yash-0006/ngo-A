"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const DualGallerySection = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append renderer to the ref container
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create a basic plane geometry for the image
    const geometry = new THREE.PlaneGeometry(1, 1); // Adjust width and height as needed

    // Function to load an image and create a material
    function loadImage(imageUrl) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(imageUrl);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      return material;
    }

    // Array to hold image data (replace with your image paths)
    const images = [
      "maingallery/a.JPG",
      "maingallery/b.JPG",
      "maingallery/c.JPG",
      // Add more image paths here
    ];

    // Function to create and position meshes for images
    function createGalleryItems(imagesArray) {
      const galleryItems = [];
      let xOffset = 0; // Initial offset for horizontal arrangement

      imagesArray.forEach((imageUrl, index) => {
        const material = loadImage(imageUrl);
        const mesh = new THREE.Mesh(geometry, material);

        // Position the mesh
        mesh.position.x = xOffset;
        mesh.position.y = 0; // Adjust Y position if needed
        mesh.position.z = 0; // Adjust Z position for depth

        scene.add(mesh);
        galleryItems.push(mesh);

        // Update the xOffset for the next item
        xOffset += 1.5; // Adjust spacing between images
      });
      return galleryItems;
    }

    // Create the gallery items
    const galleryItems = createGalleryItems(images);

    // Camera position
    camera.position.z = 5;

    // Animation loop
    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);

      // Example animation: Rotate each mesh
      galleryItems.forEach((mesh) => {
        mesh.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    }

    animate();

    // Handle window resizing
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      // Fix: Only try to remove if mountRef.current and renderer.domElement exist and are attached
      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default DualGallerySection;
