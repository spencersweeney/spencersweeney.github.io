import * as THREE from 'three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import { loadLabelFont } from '../utils/label-font';

export class Sun {
    constructor(params) {
        this._params = params;

        const textureLoader = new THREE.TextureLoader();

        const geo = new THREE.SphereGeometry(params.radius, 30, 30);
        const mat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(params.texture),
            emissive: new THREE.Color(0xffff00),
            emissiveIntensity: .3,
            emissiveMap: textureLoader.load(params.texture),
        });
        this._sunMesh = new THREE.Mesh(geo, mat);

        // Add a Point Light at the Sun's Position
        const sunLight = new THREE.PointLight(0xffffff, 1.5, 750);
        sunLight.position.set(
            params.position.x,
            params.position.y,
            params.position.z
        );
        this._params.scene.add(sunLight);

        this._sunMesh.position.set(
            params.position.x,
            params.position.y,
            params.position.z
        );
        this._params.scene.add(this._sunMesh)
    }

    get Position() {
        return this._sunMesh.position;
    }

    get UUID() {
        return this._sunMesh.uuid;
    }

    get Title() {
        return this._title;
    }

    get RaycastObject() {
        return this._sunMesh;
    }

    addTitle(text) {
        this._title = text;

        // Remove existing text mesh if it exists
        if (this._textMesh) {
            this._params.scene.remove(this._textMesh);
            this._textMesh.geometry.dispose();
            this._textMesh.material.dispose();
            this._textMesh = null;
        }

        loadLabelFont().then((font) => {

            const textGeometry = new TextGeometry(text, {
                font: font,
                size: this._params.radius / 2,
                depth: this._params.radius / 16,
                curveSegments: 16,
            });

            // Compute the bounding box
            textGeometry.computeBoundingBox();

            // Center the geometry
            const boundingBox = textGeometry.boundingBox;
            const xOffset = (boundingBox.max.x - boundingBox.min.x) / 2;
            const yOffset = (boundingBox.max.y - boundingBox.min.y) / 2;
            const zOffset = (boundingBox.max.z - boundingBox.min.z) / 2;

            textGeometry.translate(-xOffset, -yOffset, -zOffset);

            const textureLoader = new THREE.TextureLoader();
            const textMaterial = new THREE.MeshStandardMaterial({
                map: textureLoader.load(this._params.texture),
            });

            this._textMesh = new THREE.Mesh(textGeometry, textMaterial);

            this._textMesh.position.y += 1.5 * this._params.radius;
            this._textMesh.scale.x = this._calcTextXScale(boundingBox);
            this._textMesh.scale.z = this._calcTextZScale(boundingBox);

            this._params.scene.add(this._textMesh);
        }).catch((error) => {
            console.error('Failed to load sun label font.', error);
        });
    }

    _calcTextXScale(boundingBox) {
        const xWidth = boundingBox.max.x - boundingBox.min.x;
        const xTarget = 4 * this._params.radius;
        return -(xTarget / xWidth);
    }

    _calcTextZScale(boundingBox) {
        const zDepth = boundingBox.max.z - boundingBox.min.z;
        const zTarget = this._params.radius / 4;
        return zTarget / zDepth;
    }

    Update(timeElapsed) {
        this._sunMesh.rotateY(this._params.revolutionSpeed);
    }

    UpdateText(spacheshipPosition) {
        if (this._textMesh) {
            this._textMesh.rotation.y = this._calcYRotation(spacheshipPosition.x, spacheshipPosition.z);
        }
    }

    _calcYRotation(x, z) {
        let angle = Math.atan2(-x, -z);

        // Adjust angle to be in range [0, 2π]
        if (angle < 0) {
            angle += 2 * Math.PI;
        }

        return angle;
    }
}