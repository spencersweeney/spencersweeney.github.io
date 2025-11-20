export class CrawlController {
    constructor(container, options = {}) {
        this._container = container;
        this._duration = options.duration ?? 90000; // 90 seconds
        this._distance = options.distance ?? 6000;
        this._wheelScale = options.wheelScale ?? 0.6;
        this._manualStep = options.manualStep ?? 35;

        this._currentOffset = 0;
        this._startTime = 0;
        this._frameId = null;
        this._isManual = false;
        this._isDestroyed = false;
        this._eventsAttached = false;

        this._wheelOptions = { passive: false };
        this._tick = this._tick.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleWheel = this._handleWheel.bind(this);
    }

    start() {
        if (!this._container || this._isDestroyed) {
            return;
        }

        this._currentOffset = 0;
        this._isManual = false;
        this._applyTransform();
        this._startTime = performance.now();

        if (this._frameId) {
            cancelAnimationFrame(this._frameId);
        }
        this._frameId = requestAnimationFrame(this._tick);
        this._attachEvents();
    }

    reset() {
        if (!this._container) {
            return;
        }

        this._currentOffset = 0;
        this._applyTransform();
        this._isManual = false;

        if (this._frameId) {
            cancelAnimationFrame(this._frameId);
            this._frameId = null;
        }
    }

    destroy() {
        this._isDestroyed = true;
        this.reset();
        this._detachEvents();
        this._container = null;
    }

    _tick(now) {
        if (this._isManual || !this._container) {
            return;
        }

        const elapsed = now - this._startTime;
        const progress = Math.min(elapsed / this._duration, 1);

        this._currentOffset = -this._distance * progress;
        this._applyTransform();

        if (progress >= 1) {
            this._isManual = true; // allow manual control after auto finishes
            this._frameId = null;
            return;
        }

        this._frameId = requestAnimationFrame(this._tick);
    }

    _attachEvents() {
        if (this._eventsAttached || !this._container) {
            return;
        }

        document.addEventListener('keydown', this._handleKeyDown);
        document.addEventListener('wheel', this._handleWheel, this._wheelOptions);
        this._eventsAttached = true;
    }

    _detachEvents() {
        if (!this._eventsAttached) {
            return;
        }

        document.removeEventListener('keydown', this._handleKeyDown);
        document.removeEventListener('wheel', this._handleWheel, this._wheelOptions);
        this._eventsAttached = false;
    }

    _handleKeyDown(event) {
        if (!this._container) {
            return;
        }

        if (event.code === 'Space') {
            event.preventDefault();
            this._toggleManualMode();
            return;
        }

        if (!this._isManual) {
            return;
        }

        if (event.code === 'ArrowUp' || event.code === 'KeyW') {
            event.preventDefault();
            this._adjustOffset(-this._manualStep);
        } else if (event.code === 'ArrowDown' || event.code === 'KeyS') {
            event.preventDefault();
            this._adjustOffset(this._manualStep);
        }
    }

    _handleWheel(event) {
        if (!this._isManual || !this._container) {
            return;
        }

        event.preventDefault();
        const delta = -event.deltaY * this._wheelScale;
        this._adjustOffset(delta);
    }

    _toggleManualMode() {
        if (!this._container) {
            return;
        }

        if (this._isManual) {
            this._resumeAuto();
        } else {
            this._enterManual();
        }
    }

    _enterManual() {
        this._isManual = true;
        if (this._frameId) {
            cancelAnimationFrame(this._frameId);
            this._frameId = null;
        }
    }

    _resumeAuto() {
        this._isManual = false;
        const progress = Math.abs(this._currentOffset) / this._distance;
        this._startTime = performance.now() - progress * this._duration;

        if (this._frameId) {
            cancelAnimationFrame(this._frameId);
        }

        this._frameId = requestAnimationFrame(this._tick);
    }

    _adjustOffset(delta) {
        const clamped = Math.min(0, Math.max(-this._distance, this._currentOffset + delta));
        this._currentOffset = clamped;
        this._applyTransform();
    }

    _applyTransform() {
        if (!this._container) {
            return;
        }

        this._container.style.transform = `rotateX(45deg) translateY(${this._currentOffset}px) translateZ(0)`;
    }
}

