import * as THREE from 'three';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export class Planet {
    constructor(params) {
        this._params = params;
        this._internalRotation = 0;
        this._orbitObject = new THREE.Object3D();
        this._orbitObject.position.set(
            params.orbitPoint.x,
            params.orbitPoint.y,
            params.orbitPoint.z
        );

        const geo = new THREE.SphereGeometry(params.radius, 30, 30);
        const mat = new THREE.MeshStandardMaterial({
            map: params.texture
        });
        this._planetMesh = new THREE.Mesh(geo, mat);

        this._orbitObject.add(this._planetMesh);

        this._planetMesh.position.set(
            params.position.x,
            params.position.y,
            params.position.z
        );

        this._params.scene.add(this._orbitObject);
        this._addTitle(this._params.title);
        
    }

    get Position() {
        return this._planetMesh.position;
    }

    get Title() {
        return this._title;
    }

    get UUID() {
        return this._planetMesh.uuid;
    }

    _addTitle(text) {
        this._title = text;

        const loader = new FontLoader();

        loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {

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

            textGeometry.translate(-xOffset, -yOffset + 1.5 * this._params.radius, -zOffset);

            const textMaterial = new THREE.MeshStandardMaterial({
                map: this._params.texture
            });

            this._textMesh = new THREE.Mesh(textGeometry, textMaterial);

            this._textMesh.position.copy(this.Position);
            this._textMesh.scale.x = this._calcTextXScale(boundingBox);
            this._textMesh.scale.z = this._calcTextZScale(boundingBox);
            this._textMesh.castShadow = true;

            this._params.scene.add(this._textMesh);
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
        this._planetMesh.rotateY(this._params.rotationSpeed);
        this._orbitObject.rotateY(this._params.revolutionSpeed);
        this._updateInternalRotation(this._params.revolutionSpeed);
    }

    _updateInternalRotation(deltaAngle) {
        this._internalRotation += deltaAngle;

        if (this._internalRotation >= 2 * Math.PI) this._internalRotation -= 2 * Math.PI;
    }

    UpdateText(spacheshipPosition) {
        if (this._textMesh) {
            const planetCoordinates = new THREE.Vector3();
            this._planetMesh.getWorldPosition(planetCoordinates)

            this._textMesh.position.set(
                planetCoordinates.x,
                planetCoordinates.y,
                planetCoordinates.z,
            )
            this._textMesh.rotation.y = this._calcYRotation(
                spacheshipPosition.x,
                spacheshipPosition.z,
                planetCoordinates.x,
                planetCoordinates.z,
            );
        }
    }

    _calcYRotation(x, z, originX, originZ) {
        x = x - originX;
        z = z - originZ;

        let angle = Math.atan2(-x, -z);

        // Adjust angle to be in range [0, 2π]
        if (angle < 0) {
            angle += 2 * Math.PI;
        }

        return angle;
    }

    _getPlanetCoordinates() {
        const distance = Math.sqrt(this.Position.x ** 2 + this.Position.z ** 2);
        const angle = this._internalRotation;
        const x = distance * Math.cos(angle);
        const z = -distance * Math.sin(angle);
        return {
            x: x,
            z: z,
        };
    }
}