import * as THREE from 'three';

import { WorldAppManager } from "./mangers/world-app-manager";
import { SpaceApp } from "./mangers/world-app-manager";
import { PlanetApp } from "./mangers/world-app-manager";

import planetTexture2 from './assets/img/planetTexture2.jpg';
import planetTexture3 from './assets/img/planetTexture3.png';
import planetTexture4 from './assets/img/planetTexture4.jpg';
import planetTexture5 from './assets/img/planetTexture5.jpg';

import content from './content.json';

const textureMapSpace = {
    'planetTexture2': loadTextureSpace(planetTexture2),
    'planetTexture3': loadTextureSpace(planetTexture3),
    'planetTexture4': loadTextureSpace(planetTexture4),
    'planetTexture5': loadTextureSpace(planetTexture5),
};

const textureMapLanded = {
    'planetTexture2': loadTextureLanded(planetTexture2),
    'planetTexture3': loadTextureLanded(planetTexture3),
    'planetTexture4': loadTextureLanded(planetTexture4),
    'planetTexture5': loadTextureLanded(planetTexture5),
};

const appManager = new WorldAppManager();

appManager.AddApp('space', SpaceApp);
appManager.AddApp('planet', PlanetApp);

const contentMap = new Map();
const planets = [];

content.planets.forEach(planet => {
    const { title, contentSections, texturePath, sizeFactor, positionFactor, revolutionSpeedFactor, rotationSpeedFactor } = planet;
    contentMap.set(title, { title, contentSections, texture: textureMapLanded[texturePath] });
    planets.push({ sizeFactor, positionFactor, revolutionSpeedFactor, rotationSpeedFactor, texture: textureMapSpace[texturePath], title });
});

const planetParams = {
    planets: planets
}

// Initialize the SpaceApp on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    appManager.SwitchApp('space', planetParams);
});

// Example: Switching between apps dynamically
document.addEventListener('keydown', (event) => {
    if (appManager.CurrentState.Name == 'space') {
        if (event.key === 'e' || event.key === 'E') {
            const planet = appManager.CurrentState.LookedAtObject;
            if (planet) {
                const params = contentMap.get(planet.Title);
                appManager.SwitchApp('planet', params);
            }
        }
    }

    if (appManager.CurrentState.Name == 'planet') {
        if (event.key === 'Escape') {
            appManager.SwitchApp('space', planetParams);
        }
    }
});


function loadTextureSpace(texturePath) {
    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(texturePath);

    return texture;
}

function loadTextureLanded(texturePath) {
    const textureLoader = new THREE.TextureLoader();

    const texture = textureLoader.load(texturePath, () => {
        texture.minFilter = THREE.LinearFilter; 
        texture.magFilter = THREE.LinearFilter; 
        texture.anisotropy = 16; 
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);  
    });

    return texture;
}

