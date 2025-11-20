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
import sunTexture from '../assets/img/sun.jpg';

const SUN_RADIUS = 50;
const FOV = 60;
const ASPECT = 1920 / 1080;
const NEAR = 1.0;
const FAR = 100000.0;

export class Space {
    constructor(params) {
        this._params = params;
        console.log(params);
        this._celestialObjectMap = new Map();
        this._raycastTargets = [];
        this._raycaster = new THREE.Raycaster();
        this._pointer = new THREE.Vector2(0, 0);
        this._Initialize();
    }

    _Initialize() {
        this._threejs = new THREE.WebGLRenderer({
            antialias: true,
        });
        // Modern three: outputColorSpace; fall back to legacy outputEncoding
        if ('outputColorSpace' in this._threejs) {
            this._threejs.outputColorSpace = THREE.SRGBColorSpace;
        } else {
            this._threejs.outputEncoding = THREE.sRGBEncoding;
        }
        // Keep tone mapping neutral while debugging color; you can switch to ACES later
        this._threejs.toneMapping = THREE.NoToneMapping;
        this._threejs.toneMappingExposure = 1.0;
        this._threejs.shadowMap.enabled = false;
        const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        this._threejs.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        this._threejs.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this._threejs.domElement);

        window.addEventListener('resize', () => {
            this._OnWindowResize();
        }, false);

        this._camera = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
        this._camera.position.set(0, 0, 0);

        this._scene = new THREE.Scene();

        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
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

        // Starfield PNGs are color data → sRGB
        if (this._scene.background && 'colorSpace' in this._scene.background) {
            this._scene.background.colorSpace = THREE.SRGBColorSpace;
        }

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
            revolutionSpeed: 0.001,
            radius: SUN_RADIUS,
            texture: sunTexture,
            position: new THREE.Vector3(),
        }

        this._sun = new Sun(params);
        this._sun.addTitle('Spencer Sweeney');
        this._registerCelestialObject(this._sun);
    }

    _LoadPlanets() {
        this._planets = [];
        this._params.planets.forEach((planet) => {
            const planetInstance = this._LoadPlanet(
                new THREE.Vector3(),
                planet.revolutionSpeedFactor * SUN_RADIUS,
                planet.rotationSpeedFactor * SUN_RADIUS,
                planet.sizeFactor * SUN_RADIUS,
                planet.textureKey,
                new THREE.Vector3(planet.positionFactor * SUN_RADIUS, 0, 0),
                planet.title
            );

            this._planets.push(planetInstance);
            this._registerCelestialObject(planetInstance);
        });
    }

    _LoadPlanet(orbitPoint, revolutionSpeed, rotationSpeed, radius, textureKey, position, title) {
        const params = {
            scene: this._scene,
            orbitPoint: orbitPoint,
            revolutionSpeed: revolutionSpeed,
            rotationSpeed: rotationSpeed,
            radius: radius,
            textureKey: textureKey,
            position: position,
            title: title,
        }

        return new Planet(params)
    }

    _registerCelestialObject(object) {
        if (!object || !object.UUID) {
            return;
        }

        this._celestialObjectMap.set(object.UUID, object);
        if (object.RaycastObject) {
            this._raycastTargets.push(object.RaycastObject);
        }
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
        const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        this._threejs.setPixelRatio(Math.min(devicePixelRatio, 1.5));
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
            // this._threejs.render(this._scene, this._camera); 
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
        const popup = document.getElementById('popup');
        const popupTitle = document.getElementById('popup-title');
        if (popup && popupTitle) {
            if (this._lookedAtObject) {
                popupTitle.textContent = this._lookedAtObject.Title;
                popup.style.display = 'block';
            } else {
                popup.style.display = 'none';
            }
        }

        this._composer.render();

        this._thirdPersonCamera.Update(timeElapsedS);
    }

    _findObjectLookedAt() {
        if (!this._raycastTargets.length) {
            return null;
        }

        this._raycaster.setFromCamera(this._pointer, this._camera);

        // Check for intersections with objects in the scene
        const intersects = this._raycaster.intersectObjects(this._raycastTargets, true);

        if (intersects.length > 0) {
            // The first object in the intersects array is the closest one
            const lookedAtObject = intersects[0].object;
            const landableObject = this._celestialObjectMap.get(lookedAtObject.uuid);
            if (landableObject) {
                return landableObject;
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
        this._celestialObjectMap.clear();
        console.log('setting stop render to true');
        this._stopRendering = true;
        const popup = document.getElementById('popup');
        if (popup) {
            popup.style.display = 'none';
        }
        const controlspPopup = document.getElementById('controls-popup');
        if (controlspPopup) {
            controlspPopup.style.display = 'none';
        }
    }
}