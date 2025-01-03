import * as THREE from 'three';

import { FiniteStateMachine } from '../mangers/fsm';
import { State } from '../mangers/fsm';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import fireTexturePath from '../assets/img/fire.png';

import spaceshipPath from '../assets/models/spaceship.glb';

class SpaceshipControllerProxy {
    constructor(animations) {
        this._animations = animations;
    }

    get animations() {
        return this._animations;
    }
}

export class SpaceshipController {
    constructor(params) {
        this._Init(params);
    }

    _Init(params) {
        this._params = params;
        this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this._acceleration = new THREE.Vector3(1, 0.1, 10.0);
        this._velocity = new THREE.Vector3(0, 0, 0);
        this._position = new THREE.Vector3();

        this._animations = {};
        this._input = new SpaceshipControllerInput();
        this._stateMachine = new SpaceshipFSM(
            new SpaceshipControllerProxy(this._animations));

        this._LoadModels();
    }

    _CreateFireParticles() {
        const particleCount = 500;
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 0.2;
            const height = Math.random() * 0.5;

            positions[i * 3] = radius * Math.cos(angle);
            positions[i * 3 + 1] = height;
            positions[i * 3 + 2] = radius * Math.sin(angle);

            velocities[i * 3] = (Math.random() - 0.5) * 0.05;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
            velocities[i * 3 + 2] = -1 * Math.random() * 0.05;

            sizes[i] = Math.random() * 0.1 + 0.05;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            color: 0xff5500,
            size: 0.1,
            map: new THREE.TextureLoader().load(fireTexturePath),
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        this._fireParticles = new THREE.Points(particleGeometry, particleMaterial);

        // Position the particles around the rear of the spaceship
        this._fireParticles.position.set(1, 0, -2.5); // Adjust to align with the cone
        this._fireParticles.visible = false; // Initially hidden

        // Attach the fire particles to the spaceship
        if (this._target) {
            this._target.add(this._fireParticles);
        } else {
            console.error('Error: _target is not initialized when _CreateFireParticles is called');
        }
    }

    _LoadModels() {
        const loader = new GLTFLoader();
        loader.load(spaceshipPath, (gltf) => {
            gltf.scene.scale.setScalar(0.5);

            // Apply shadows to all meshes
            gltf.scene.traverse(c => {
                if (c.isMesh) {
                    c.castShadow = false;
                }
            });

            // Store the entire scene as target
            this._target = gltf.scene;
            this._target.position.set(56, 0, -80);
            this._params.scene.add(this._target);

            this._CreateFireParticles();

            // Setup animation mixer
            this._mixer = new THREE.AnimationMixer(this._target);

            this._manager = new THREE.LoadingManager();
            this._manager.onLoad = () => {
                this._stateMachine.SetState('idle');
            };

            const _OnLoad = (animName, gltf) => {
                // GLTF animations are stored in the animations array
                if (gltf.animations && gltf.animations.length > 0) {
                    const clip = gltf.animations[0];
                    const action = this._mixer.clipAction(clip);

                    this._animations[animName] = {
                        clip: clip,
                        action: action,
                    };
                }
            };
        });
    }

    _UpdateFireEffects() {
        if (this._target && this._fireParticles) {
            // Show fire when moving forward or backward
            if (this._input._keys.forward || this._input._keys.backward) {
                this._fireParticles.visible = true;

                const positions = this._fireParticles.geometry.attributes.position.array;
                const velocities = this._fireParticles.geometry.attributes.velocity.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i] += velocities[i];     // x
                    positions[i + 1] += velocities[i + 1]; // y
                    positions[i + 2] += velocities[i + 2]; // z

                    // Reset particles that move out of range
                    if (positions[i + 2] < -2 || Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2) > 0.75) {
                        positions[i] = (Math.random() - 0.5) * 0.2;
                        positions[i + 1] = Math.random() * 0.2;
                        positions[i + 2] = (Math.random() - 0.5) * 0.2;
                    }
                }
                this._fireParticles.geometry.attributes.position.needsUpdate = true;
            } else {
                this._fireParticles.visible = false;
            }
        }
    }

    get Position() {
        return this._position;
    }

    get Rotation() {
        if (!this._target) {
            return new THREE.Quaternion();
        }
        return this._target.quaternion;
    }

    Update(timeInSeconds) {
        if (!this._target) {
            return;
        }

        this._stateMachine.Update(timeInSeconds, this._input);

        const velocity = this._velocity;
        const frameDecceleration = new THREE.Vector3(
            velocity.x * this._decceleration.x,
            velocity.y * this._decceleration.y,
            velocity.z * this._decceleration.z
        );
        frameDecceleration.multiplyScalar(timeInSeconds);
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
            Math.abs(frameDecceleration.z), Math.abs(velocity.z));

        velocity.add(frameDecceleration);

        const controlObject = this._target;
        const _Q = new THREE.Quaternion();
        const _A = new THREE.Vector3();
        const _R = controlObject.quaternion.clone();

        const acc = this._acceleration.clone();

        if (this._input._keys.forward) {
            velocity.z += acc.z * timeInSeconds;
        }
        if (this._input._keys.backward) {
            velocity.z -= acc.z * timeInSeconds;
        }
        if (this._input._keys.left) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }
        if (this._input._keys.right) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }

        controlObject.quaternion.copy(_R);

        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();

        sideways.multiplyScalar(velocity.x * timeInSeconds);
        forward.multiplyScalar(velocity.z * timeInSeconds);

        controlObject.position.add(forward);
        controlObject.position.add(sideways);

        this._position.copy(controlObject.position);

        // Update fire position and visibility
        this._UpdateFireEffects();
        const deltaTime = timeInSeconds * 1000;
        if (this._fireCone?.material?.uniforms?.time) {
            this._fireCone.material.uniforms.time.value += deltaTime;
        }
        if (this._fireParticles?.material?.uniforms?.time) {
            this._fireParticles.material.uniforms.time.value += deltaTime;
        }

        if (this._mixer) {
            this._mixer.update(timeInSeconds);
        }
    }
}

class SpaceshipControllerInput {
    constructor() {
        this._Init();
    }

    _Init() {
        this._keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        };
        document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }

    _onKeyDown(event) {
        switch (event.keyCode) {
            case 87: // w
                this._keys.forward = true;
                break;
            case 65: // a
                this._keys.left = true;
                break;
            case 83: // s
                this._keys.backward = true;
                break;
            case 68: // d
                this._keys.right = true;
                break;
        }
    }

    _onKeyUp(event) {
        switch (event.keyCode) {
            case 87: // w
                this._keys.forward = false;
                break;
            case 65: // a
                this._keys.left = false;
                break;
            case 83: // s
                this._keys.backward = false;
                break;
            case 68: // d
                this._keys.right = false;
                break;
        }
    }
}

class SpaceshipFSM extends FiniteStateMachine {
    constructor(proxy) {
        super();
        this._proxy = proxy;
        this._Init();
    }

    _Init() {
        this._AddState('idle', IdleState);
        this._AddState('fly', FlyState);
    }
}

class FlyState extends State {
    constructor(parent) {
        super(parent);
    }

    get Name() {
        return 'fly';
    }

    Enter(prevState) {
        const curAction = this._parent._proxy._animations['fly'].action;
        if (prevState) {
            const prevAction = this._parent._proxy._animations[prevState.Name].action;

            curAction.enabled = true;

            curAction.crossFadeFrom(prevAction, 0.5, true);
            curAction.play();
        } else {
            curAction.play();
        }
    }

    Exit() {
    }

    Update(timeElapsed, input) {
        if (input._keys.forward || input._keys.backward) {
            return;
        }

        this._parent.SetState('idle');
    }
}

class IdleState extends State {
    constructor(parent) {
        super(parent);
    }

    get Name() {
        return 'idle';
    }

    Enter(prevState) {
        const idleAction = this._parent._proxy._animations['idle'].action;
        if (prevState) {
            const prevAction = this._parent._proxy._animations[prevState.Name].action;
            idleAction.time = 0.0;
            idleAction.enabled = true;
            idleAction.setEffectiveTimeScale(1.0);
            idleAction.setEffectiveWeight(1.0);
            idleAction.crossFadeFrom(prevAction, 0.5, true);
            idleAction.play();
        } else {
            idleAction.play();
        }
    }

    Exit() {
    }

    Update(_, input) {
        if (input._keys.forward || input._keys.backward) {
            this._parent.SetState('fly');
        }
    }
}
