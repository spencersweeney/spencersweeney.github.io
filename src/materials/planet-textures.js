// textures.js
import * as THREE from 'three';

import coruscantDiffuse from '../assets/img/Coruscant/Coruscant (Diffuse).png';
import coruscantBump from '../assets/img/Coruscant/Coruscant (Bump).png';
import coruscantSpecular from '../assets/img/Coruscant/Coruscant (Specular).png';
import coruscantLights from '../assets/img/Coruscant/Coruscant (Lights Metropolis).png';

import csillaDiffuse from '../assets/img/Csilla/Csilla (Diffuse 4k).png';
import csillaBump from '../assets/img/Csilla/Csilla (Bump 4k).png';
import csillaRoughness from '../assets/img/Csilla/Csilla (Roughness 4k).png';
import csillaLights from '../assets/img/Csilla/Csilla (Lights Metropolis 4k).png';

import narShaddaaDiffuse from '../assets/img/NarShaddaa/Nar Shaddaa (Diffuse 4k).png';
import narShaddaaBump from '../assets/img/NarShaddaa/Nar Shaddaa (Bump 4k).png';
import narShaddaaRoughness from '../assets/img/NarShaddaa/Nar Shaddaa (Roughness 4k).png';
import narShaddaaLights from '../assets/img/NarShaddaa/Nar Shaddaa (Lights Metropolis 4k).png';
import narShaddaaWater from '../assets/img/NarShaddaa/Nar Shaddaa (Water 4k).png';

import desertDiffuse from '../assets/img/Desert/Desert 05 (Diffuse).png';
import desertBump from '../assets/img/Desert/Desert 05 (Bump).png';
import desertSpecular from '../assets/img/Desert/Desert 05 (Specular).png';
import desertLightsUrban from '../assets/img/Desert/Desert 05 (Lights Urban).png';

import korribanDiffuse from '../assets/img/Korriban/Korriban (Diffuse 4k).png';
import korribanBump from '../assets/img/Korriban/Korriban (Bump 4k).png';
import korribanRoughness from '../assets/img/Korriban/Korriban (Roughness 4k).png';

// NOTE: Use with THREE.MeshPhysicalMaterial.
// - Color textures (albedo/lights) => colorSpace = SRGB
// - Non-color data (bump/roughness/specularIntensity) => leave linear
// - Planets are dielectrics => metalness = 0

const SRGB_COLORSPACE = THREE.SRGBColorSpace || 'srgb';

const PLANET_TEXTURE_SOURCES = {
    coruscant: {
        textures: {
        map: { path: coruscantDiffuse, colorSpace: SRGB_COLORSPACE }, // sRGB
        bumpMap: { path: coruscantBump },                             // linear
        specularIntensityMap: { path: coruscantSpecular },            // linear
        emissiveMap: { path: coruscantLights, colorSpace: SRGB_COLORSPACE }, // sRGB
        },
        options: {
        bumpScale: 0.045,
        // Coruscant spec map is very bright → keep fairly rough and dim specular color
        roughness: 0.75,
        metalness: 0.0,
        // Dims warmth from specular highlights (MeshPhysicalMaterial supports specularColor)
        specularColor: new THREE.Color(0xaaaaaa),
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.15, // lights still pop, but won’t wash the albedo
        },
    },

    csilla: {
        textures: {
        map: { path: csillaDiffuse, colorSpace: SRGB_COLORSPACE },
        bumpMap: { path: csillaBump },
        roughnessMap: { path: csillaRoughness },
        emissiveMap: { path: csillaLights, colorSpace: SRGB_COLORSPACE },
        },
        options: {
        bumpScale: 0.065,
        roughness: 0.85,
        metalness: 0.0,
        specularColor: new THREE.Color(0xdddddd),
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.3,
        },
    },

    narShaddaa: {
        textures: {
        map: { path: narShaddaaDiffuse, colorSpace: SRGB_COLORSPACE },
        bumpMap: { path: narShaddaaBump },
        roughnessMap: { path: narShaddaaRoughness },
        specularIntensityMap: { path: narShaddaaWater },
        emissiveMap: { path: narShaddaaLights, colorSpace: SRGB_COLORSPACE },
        },
        options: {
        bumpScale: 0.05,
        roughness: 0.75,
        metalness: 0.0,
        specularColor: new THREE.Color(0xbbbbbb),
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.18,
        },
    },

    desert: {
        textures: {
        map: { path: desertDiffuse, colorSpace: SRGB_COLORSPACE },
        bumpMap: { path: desertBump },
        specularIntensityMap: { path: desertSpecular },
        emissiveMap: { path: desertLightsUrban, colorSpace: SRGB_COLORSPACE },
        },
        options: {
        bumpScale: 0.035,
        roughness: 0.7,
        metalness: 0.0,
        specularColor: new THREE.Color(0xcccccc),
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 0.2,
        },
    },

    korriban: {
        textures: {
        map: { path: korribanDiffuse, colorSpace: SRGB_COLORSPACE },
        bumpMap: { path: korribanBump },
        roughnessMap: { path: korribanRoughness },
        },
        options: {
        bumpScale: 0.05,
        roughness: 0.8,
        metalness: 0.0,
        specularColor: new THREE.Color(0xaaaaaa),
        emissive: new THREE.Color(0x331111),
        emissiveIntensity: 0.05,
        },
    },
};

const textureLoader = new THREE.TextureLoader();
const materialCache = new Map();

function applyColorSpace(texture, colorSpace) {
  if (!texture || !colorSpace) return;

  const wantsSRGB = colorSpace === SRGB_COLORSPACE || colorSpace === THREE.SRGBColorSpace || colorSpace === 'srgb';

  if (wantsSRGB) {
    if ('colorSpace' in texture && THREE.SRGBColorSpace) {
      texture.colorSpace = THREE.SRGBColorSpace;
      return;
    }

    if ('encoding' in texture && typeof THREE.sRGBEncoding !== 'undefined') {
      texture.encoding = THREE.sRGBEncoding;
    }
  }
}

function loadTextureFromDescriptor(descriptor = {}) {
  if (!descriptor.path) return null;

  const texture = textureLoader.load(descriptor.path);

  // Modern three.js: set colorSpace (or encoding) only for color data
  if (descriptor.colorSpace) applyColorSpace(texture, descriptor.colorSpace);

  if (descriptor.wrapS) texture.wrapS = descriptor.wrapS;
  if (descriptor.wrapT) texture.wrapT = descriptor.wrapT;

  if (descriptor.repeat) {
    const repeatX = descriptor.repeat.x ?? descriptor.repeat[0] ?? 1;
    const repeatY = descriptor.repeat.y ?? descriptor.repeat[1] ?? 1;
    texture.repeat.set(repeatX, repeatY);
  }

  if (typeof descriptor.flipY === 'boolean') texture.flipY = descriptor.flipY;

  return texture;
}

function buildMaterialConfig(definition) {
  const materialProps = { ...(definition.options || {}) };

  Object.entries(definition.textures || {}).forEach(([materialProp, descriptor]) => {
    const texture = loadTextureFromDescriptor(descriptor);
    if (texture) materialProps[materialProp] = texture;
  });

  return materialProps;
}

export function getPlanetMaterialConfig(key) {
  if (!key) return null;
  if (materialCache.has(key)) return materialCache.get(key);

  const definition = PLANET_TEXTURE_SOURCES[key];
  if (!definition) return null;

  const materialProps = buildMaterialConfig(definition);
  materialCache.set(key, materialProps);
  return materialProps;
}

export function hasPlanetMaterialConfig(key) {
  return Boolean(PLANET_TEXTURE_SOURCES[key]);
}

export function getPlanetTexturePaths(keys) {
  const paths = new Set();
  const targetKeys = Array.isArray(keys) && keys.length
    ? keys.filter((key) => PLANET_TEXTURE_SOURCES[key])
    : Object.keys(PLANET_TEXTURE_SOURCES);

  targetKeys.forEach((key) => {
    const definition = PLANET_TEXTURE_SOURCES[key];
    Object.values(definition?.textures || {}).forEach((descriptor = {}) => {
      if (descriptor.path) {
        paths.add(descriptor.path);
      }
    });
  });

  return Array.from(paths);
}


