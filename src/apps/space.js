import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { SpaceshipController } from '../entities/spaceship.js';
import { ThirdPersonCamera } from '../entities/camera.js';
import { Planet } from '../entities/planet.js';
import { Sun } from '../entities/sun.js';

import stars_right from '../assets/img/skybox/right.png'
import stars_left from '../assets/img/skybox/left.png';
import stars_top from '../assets/img/skybox/top.png';
import stars_bottom from '../assets/img/skybox/bottom.png';
import stars_front from '../assets/img/skybox/front.png';
import stars_back from '../assets/img/skybox/back.png';
import sunTexture from '../assets/img/sun.jpeg';

const SUN_RADIUS = 20;
const FOV = 60;
const ASPECT = 1920 / 1080;
const NEAR = 1.0;
const FAR = 100000.0;

export class Space {
    constructor(params) {
        this._params = params;
        console.log(params);
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
        this._camera.position.set(0, 0, 0);

        this._scene = new THREE.Scene();

        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this._scene.add(ambientLight);

        const cubeTextureLoader = new THREE.CubeTextureLoader();
        this._scene.background = cubeTextureLoader.load([
            stars_right,
            stars_left,
            stars_top,
            stars_bottom,
            stars_front,
            stars_back
        ]);

        const controlspPopup = document.getElementById('controls-popup');
        if (controlspPopup) {
            controlspPopup.style.display = 'block';
        }

        this._LoadSun();
        this._LoadPlanets();
        this._LoadAnimatedModel();
        this._LoadBloom();
        this._stopRendering = false;
        this._RAF();
    }

    _LoadSun() {
        const params = {
            scene: this._scene,
            revolutionSpeed: 0.01,
            radius: SUN_RADIUS,
            texture: sunTexture,
            position: new THREE.Vector3(),
        }

        this._sun = new Sun(params);
        this._sun.addTitle('Spencer Sweeney');
    }

    _LoadPlanets() {
        this._planets = [];
        this._params.planets.forEach((planet) => {
            this._planets.push(this._LoadPlanet(
                new THREE.Vector3(),
                planet.revolutionSpeedFactor * SUN_RADIUS,
                planet.rotationSpeedFactor * SUN_RADIUS,
                planet.sizeFactor * SUN_RADIUS,
                planet.texture,
                new THREE.Vector3(planet.positionFactor * SUN_RADIUS, 0, 0),
                planet.title
            ))
        })

        this._planetMap = new Map();
        this._planets.forEach((planet) => {
            if (planet) {
                this._planetMap.set(planet.UUID, planet);
            }
        });

    }

    _LoadPlanet(orbitPoint, revolutionSpeed, rotationSpeed, radius, texture, position, title) {
        const params = {
            scene: this._scene,
            orbitPoint: orbitPoint,
            revolutionSpeed: revolutionSpeed,
            rotationSpeed: rotationSpeed,
            radius: radius,
            texture: texture,
            position: position,
            title: title,
        }

        return new Planet(params)
    }

    _LoadAnimatedModel() {
        const params = {
            camera: this._camera,
            scene: this._scene,
        }
        this._controls = new SpaceshipController(params);

        this._thirdPersonCamera = new ThirdPersonCamera({
            camera: this._camera,
            target: this._controls,
        });
    }

    _LoadBloom() {
        // Post-Processing Setup
        this._composer = new EffectComposer(this._threejs);
        this._composer.addPass(new RenderPass(this._scene, this._camera));

        // Unreal Bloom Pass
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight), // Resolution
            0.75, // Strength
            0.4, // Radius
            0.85 // Threshold
        );
        this._composer.addPass(bloomPass);
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

        const timeElapsedS = timeElapsed * 0.001;
        if (this._mixers) {
            this._mixers.map(m => m.update(timeElapsedS));
        }

        if (this._controls) {
            this._controls.Update(timeElapsedS);
        }

        if (this._sun) {
            this._sun.Update(timeElapsedS);
            if (this._controls) {
                this._sun.UpdateText(this._controls.Position);
            }
        }

        if (this._planets) {
            this._planets.forEach((planet) => {
                if (planet) {
                    planet.Update(timeElapsed);
                    if (this._controls) {
                        planet.UpdateText(this._controls.Position);
                    }
                }
            });
        }

        this._lookedAtObject = this._findObjectLookedAt();
        if (this._lookedAtObject) {
            const popup = document.getElementById('popup');
            const popupTitle = document.getElementById('popup-title');

            popupTitle.textContent = this._lookedAtObject.Title;
            popup.style.display = 'block';
        } else {
            popup.style.display = 'none';
        }

        this._composer.render();

        this._thirdPersonCamera.Update(timeElapsedS);
    }

    _findObjectLookedAt() {
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2(0, 0);

        raycaster.setFromCamera(pointer, this._camera);

        // Check for intersections with objects in the scene
        const intersects = raycaster.intersectObjects(this._scene.children, true);

        const popup = document.getElementById('popup');
        const popupTitle = document.getElementById('popup-title');

        if (intersects.length > 0) {
            // The first object in the intersects array is the closest one
            const lookedAtObject = intersects[0].object;
            const lookedAtPlanet = this._planetMap.get(lookedAtObject.uuid);
            if (lookedAtPlanet) {
                return lookedAtPlanet;
            }
            return null;
        } else {
            return null;
        }
    }

    get LookedAtObject() {
        return this._lookedAtObject;
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
        this._controls = null;
        this._composer = null;
        this._planets = [];
        this._sun = null;
        this._planetMap.clear();
        console.log('setting stop render to true');
        this._stopRendering = true;
        popup.style.display = 'none';
        const controlspPopup = document.getElementById('controls-popup');
        if (controlspPopup) {
            controlspPopup.style.display = 'none';
        }
    }
}