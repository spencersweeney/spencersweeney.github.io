import { WorldAppManager } from "./mangers/world-app-manager";
import { SpaceApp } from "./mangers/world-app-manager";
import { PlanetApp } from "./mangers/world-app-manager";

import { hasPlanetMaterialConfig, getPlanetTexturePaths } from './materials/planet-textures';
import skyboxRight from './assets/img/skybox/right.png';
import skyboxLeft from './assets/img/skybox/left.png';
import skyboxTop from './assets/img/skybox/top.png';
import skyboxBottom from './assets/img/skybox/bottom.png';
import skyboxFront from './assets/img/skybox/front.png';
import skyboxBack from './assets/img/skybox/back.png';
import sunTextureAsset from './assets/img/sun.jpg';
import spaceshipModelAsset from './assets/models/spaceship.glb';
import fireTextureAsset from './assets/img/fire.png';
import content from './content.json';

const loadingScreen = document.getElementById('loading-screen');
const loadingText = loadingScreen ? loadingScreen.querySelector('.loading-text') : null;
const MIN_LOADING_DURATION = 600;
let loadingStartTime = 0;
const contentMap = new Map();
let planetParams = null;
if (typeof window !== 'undefined') {
    window.__universeReady = false;
}

const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp']);
const coreAssetManifest = buildCoreAssetManifest();
let preloadSummary = { total: coreAssetManifest.length, failed: 0 };
let assetPreloadPromise = null;
let sceneInitialized = false;

function getTimestamp() {
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        return performance.now();
    }
    return Date.now();
}

function showLoadingScreen(message = 'Loading the universe...') {
    if (!loadingScreen || !loadingText) {
        return;
    }

    loadingStartTime = getTimestamp();
    loadingText.textContent = message;
    loadingScreen.style.display = 'flex';
    loadingScreen.classList.remove('fade-out');
}

function hideLoadingScreen() {
    if (!loadingScreen) {
        return;
    }

    const elapsed = getTimestamp() - loadingStartTime;
    const remaining = Math.max(0, MIN_LOADING_DURATION - elapsed);

    const finalizeHide = () => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    };

    if (remaining > 0) {
        setTimeout(finalizeHide, remaining);
    } else {
        finalizeHide();
    }
}

function getActivePlanetTextureAssets() {
    if (!Array.isArray(content?.planets)) {
        return [];
    }

    const textureKeys = Array.from(new Set(content.planets
        .map((planet) => planet.texturePath)
        .filter(Boolean)));

    return getPlanetTexturePaths(textureKeys);
}

function buildCoreAssetManifest() {
    const manifest = new Set();
    [
        skyboxRight,
        skyboxLeft,
        skyboxTop,
        skyboxBottom,
        skyboxFront,
        skyboxBack,
        sunTextureAsset,
        spaceshipModelAsset,
        fireTextureAsset
    ].forEach((asset) => {
        if (asset) {
            manifest.add(asset);
        }
    });

    getActivePlanetTextureAssets().forEach((asset) => {
        if (asset) {
            manifest.add(asset);
        }
    });

    return Array.from(manifest);
}

function startCoreAssetPreload() {
    if (assetPreloadPromise) {
        return assetPreloadPromise;
    }

    if (typeof window === 'undefined') {
        assetPreloadPromise = Promise.resolve(preloadSummary);
        return assetPreloadPromise;
    }

    assetPreloadPromise = preloadCoreAssets(coreAssetManifest)
        .then((summary) => {
            preloadSummary = summary;
            return summary;
        })
        .catch((error) => {
            console.error('Error preloading core assets:', error);
            const failedSummary = {
                total: coreAssetManifest.length,
                failed: coreAssetManifest.length,
            };
            preloadSummary = failedSummary;
            document.dispatchEvent(new CustomEvent('assets:error', {
                detail: {
                    message: 'Failed to preload assets. Launch will still attempt to continue.',
                }
            }));
            return failedSummary;
        });

    return assetPreloadPromise;
}

function preloadCoreAssets(manifest) {
    if (!manifest.length) {
        dispatchAssetProgress(1, 1, 'Assets ready.');
        return Promise.resolve({ total: 0, failed: 0 });
    }

    let completed = 0;
    dispatchAssetProgress(0, manifest.length, 'Initializing hangar systems...');

    const loaders = manifest.map((url) => {
        return preloadSingleAsset(url)
            .then(() => ({ url, failed: false }))
            .catch((error) => {
                console.warn(`Failed to preload asset: ${url}`, error);
                return { url, failed: true };
            })
            .finally(() => {
                completed += 1;
                dispatchAssetProgress(
                    completed,
                    manifest.length,
                    `Loading assets (${completed}/${manifest.length})`,
                    url
                );
            });
    });

    return Promise.all(loaders).then((results) => {
        const failedAssets = results
            .filter((result) => result.failed)
            .map((result) => result.url);

        if (failedAssets.length) {
            document.dispatchEvent(new CustomEvent('assets:error', {
                detail: {
                    failed: failedAssets,
                    message: 'Some assets failed to preload. Launch is still available.',
                }
            }));
        }

        return {
            total: manifest.length,
            failed: failedAssets.length,
        };
    });
}

function dispatchAssetProgress(loaded, total, message, currentUrl) {
    if (typeof document === 'undefined') {
        return;
    }

    const percent = total === 0 ? 100 : Math.round((loaded / total) * 100);
    document.dispatchEvent(new CustomEvent('assets:progress', {
        detail: {
            loaded,
            total,
            percent,
            message,
            currentUrl,
        }
    }));
}

function preloadSingleAsset(url) {
    if (!url) {
        return Promise.resolve();
    }

    const extension = getAssetExtension(url);

    if (IMAGE_EXTENSIONS.has(extension)) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.decoding = 'async';
            image.loading = 'eager';
            image.onload = () => resolve();
            image.onerror = () => reject(new Error(`Image preload failed: ${url}`));
            image.src = url;
        });
    }

    return fetch(url, { cache: 'force-cache' })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to preload ${url}: ${response.status}`);
            }
            return response.arrayBuffer().then(() => undefined);
        });
}

function getAssetExtension(url = '') {
    const normalized = url.split('?')[0];
    const parts = normalized.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

function emitAssetsReady(planetsLoaded) {
    document.dispatchEvent(new CustomEvent('assets:ready', {
        detail: {
            ...preloadSummary,
            planetsLoaded,
        }
    }));
}

const appManager = new WorldAppManager();
appManager.AddApp('space', SpaceApp);
appManager.AddApp('planet', PlanetApp);

if (typeof window !== 'undefined') {
    startCoreAssetPreload();
}

// Initialize the SpaceApp on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        const planets = [];

        if (content.sun) {
            const {
                title,
                crawlIntro,
                crawlText,
                crawlTitle,
                layout,
                contactHeading,
                contactIntro,
                contactDetails
            } = content.sun;

            contentMap.set(title, {
                title,
                crawlIntro,
                crawlText,
                crawlTitle,
                layout,
                contactHeading,
                contactIntro,
                contactDetails
            });
        }

        content.planets.forEach(planet => {
            const { title, crawlIntro, crawlText, crawlTitle, texturePath, sizeFactor, positionFactor, revolutionSpeedFactor, rotationSpeedFactor } = planet;
            contentMap.set(title, { title, crawlIntro, crawlText, crawlTitle, layout: planet.layout || 'crawl' });
            if (!hasPlanetMaterialConfig(texturePath)) {
                console.warn(`No material definition found for planet '${title}' with texture key '${texturePath}'.`);
                return;
            }

            planets.push({ 
                sizeFactor, 
                positionFactor, 
                revolutionSpeedFactor, 
                rotationSpeedFactor, 
                textureKey: texturePath,
                title 
            });
        });

        planetParams = { planets };

        startCoreAssetPreload()
            .finally(() => {
                initializeSpaceScene(planets.length);
            });
    } catch (error) {
        console.error('Error during initialization:', error);
        if (loadingText) {
            loadingText.textContent = 'Error loading the universe. Please refresh the page.';
        }
        document.dispatchEvent(new CustomEvent('assets:error', {
            detail: {
                message: 'Unable to prepare the universe. Please refresh the page.',
            }
        }));
        if (typeof window !== 'undefined') {
            window.__universeReady = false;
        }
    }
});

function initializeSpaceScene(planetsLoaded) {
    if (sceneInitialized || !planetParams) {
        return;
    }

    try {
        sceneInitialized = true;
        appManager.SwitchApp('space', planetParams);
        hideLoadingScreen();
        if (typeof window !== 'undefined') {
            window.__universeReady = true;
        }
        document.dispatchEvent(new CustomEvent('universe:ready', {
            detail: {
                planetsLoaded
            }
        }));
        emitAssetsReady(planetsLoaded);
    } catch (error) {
        sceneInitialized = false;
        console.error('Error during space scene initialization:', error);
        if (loadingText) {
            loadingText.textContent = 'Error loading the universe. Please refresh the page.';
        }
        document.dispatchEvent(new CustomEvent('assets:error', {
            detail: {
                message: 'Unable to initialize the space scene. Please refresh the page.',
            }
        }));
        if (typeof window !== 'undefined') {
            window.__universeReady = false;
        }
    }
}

// Example: Switching between apps dynamically
document.addEventListener('keydown', async (event) => {
    if (appManager.CurrentState.Name == 'space') {
        if (event.key === 'e' || event.key === 'E') {
            const planet = appManager.CurrentState.LookedAtObject;
            if (planet) {
                try {
                    showLoadingScreen(`Preparing to land on ${planet.Title}...`);
                    const params = contentMap.get(planet.Title);
                    
                    if (!params) {
                        throw new Error(`No content found for planet ${planet.Title}`);
                    }
                    
                    appManager.SwitchApp('planet', params);
                    hideLoadingScreen();
                } catch (error) {
                    console.error('Error landing on planet:', error);
                    if (loadingText) {
                        loadingText.textContent = 'Error landing on planet. Please try again.';
                    }
                }
            }
        }
    }

    if (appManager.CurrentState.Name == 'planet') {
        if (event.key === 'Escape') {
            showLoadingScreen('Returning to space...');
            appManager.SwitchApp('space', planetParams);
            hideLoadingScreen();
        }
    }
});

