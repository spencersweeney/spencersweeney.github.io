import * as THREE from 'three';

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import skyHDR from '../assets/img/skyHDR.hdr';

const FOV = 60;
const ASPECT = 1920 / 1080;
const NEAR = 1;
const FAR = 1000.0;

export class PlanetWorld {
    constructor(params) {
        this._title = params.title;
        this._planetTexture = params.texture;
        this._contentSections = params.contentSections;
        this._Initialize();
    }

    _Initialize() {
        this._threejs = new THREE.WebGLRenderer({
            antialias: true,
        });
        this._threejs.outputEncoding = THREE.sRGBEncoding;
        this._threejs.shadowMap.enabled = true;
        this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        this._threejs.setPixelRatio(window.devicePixelRatio);
        this._threejs.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this._threejs.domElement);

        window.addEventListener('resize', () => {
            this._OnWindowResize();
        }, false);

        this._camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
        this._camera.position.set(25, 20, 25);
        this._camera.rotateX(Math.PI / 12);

        this._scene = new THREE.Scene();

        const light = new THREE.AmbientLight(0xFFFFFF, 0.25);
        this._scene.add(light);

        const popup = document.getElementById('esc-popup');
        if (popup) {
            popup.style.display = 'block';
        }

        this._LoadAtmosphere();
        this._LoadGround();
        this._LoadContent();

        this._mixers = [];
        this._previousRAF = null;

        this._RAF();
    }

    _LoadAtmosphere() {
        const loader = new RGBELoader();
        loader.load(skyHDR, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            this._scene.background = texture;
            this._scene.environment = texture;
        });
    }

    _LoadGround() {
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);

        const planeMaterial = new THREE.MeshStandardMaterial({
            map: this._planetTexture,
            roughness: 0.9, 
            metalness: 0.2,
            wireframe: false,
        });

        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;

        // Use a Perlin noise function for terrain displacement
        const vertices = planeGeometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
            vertices[i + 2] = Math.random() * 5; // Displace z for rough terrain
        }
        planeGeometry.computeVertexNormals(); // Recompute normals for lighting
        this._scene.add(plane);
    }

    _LoadContent() {
        const content = document.getElementById('content');
        const contentTitle = document.getElementById('content-title');
        const contentInfo = document.getElementById('content-info');

        contentInfo.innerHTML = '';

        contentTitle.textContent = this._title;

        const contentSections = this._contentSections;

        contentSections.forEach(section => {
            const sectionContainer = document.createElement('div');

            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section.sectionTitle;
            sectionContainer.appendChild(sectionTitle);

            const sectionDescription = document.createElement('p');
            sectionDescription.textContent = section.description;
            sectionContainer.appendChild(sectionDescription);

            if (section.items && section.items.length > 0) {
                const ul = document.createElement('ul');
                section.items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                });
                sectionContainer.appendChild(ul);
            }

            contentInfo.appendChild(sectionContainer);
        });

        content.style.display = 'block';
    }

    _OnWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._threejs.setSize(window.innerWidth, window.innerHeight);
    }

    _RAF() {
        if (this._stopRendering) {
            return;
        }

        requestAnimationFrame((t) => {
            if (this._stopRendering) {
                return;
            }

            if (this._previousRAF === null) {
                this._previousRAF = t;
            }

            this._RAF(); 
            this._threejs.render(this._scene, this._camera); 
            this._Step(t - this._previousRAF); 
            this._previousRAF = t; 
        });
    }


    _Step(timeElapsed) {
        if (!this._threejs || !this._scene || !this._camera) {
            return;
        }
    }

    Update(timeElapsed) {
        this._Step(timeElapsed);
    }

    Cleanup() {
        if (this._threejs) {
            this._threejs.dispose();
        }
        if (this._scene) {
            while (this._scene.children.length > 0) {
                this._scene.remove(this._scene.children[0]);
            }
        }
        window.removeEventListener('resize', this._OnWindowResize);
        const canvas = this._threejs.domElement;
        if (canvas && canvas.parentElement) {
            canvas.parentElement.removeChild(canvas);
        }
        this._threejs = null;
        this._camera = null;
        this._scene = null;
        this._stopRendering = true;
        content.style.display = 'none';
        const popup = document.getElementById('esc-popup');
        if (popup) {
            popup.style.display = 'none';
        }
    }
}