import { CrawlController } from "./crawl-controller";

export class PlanetWorld {
    constructor(params) {
        this._title = params.title;
        this._crawlTitle = params.crawlTitle;
        this._crawlText = params.crawlText;
        this._crawlIntro = params.crawlIntro;
        this._layout = params.layout || 'crawl';
        this._contactIntro = params.contactIntro;
        this._contactHeading = params.contactHeading;
        this._contactDetails = params.contactDetails;
        this._stars = [];
        this._frameId = null;
        this._elements = {};
        this._crawlContainer = null;
        this._crawlController = null;
        this._overlayHideTimeout = null;
        this._overlayFadeTimeout = null;
        this._resizeHandler = this._OnWindowResize.bind(this);
        this._animateStars = this._AnimateStars.bind(this);
        this._Initialize();
    }

    _Initialize() {
        this._CacheElements();
        this._SetupUI();
        this._PrepareStars();

        window.addEventListener('resize', this._resizeHandler, false);
        this._frameId = requestAnimationFrame(this._animateStars);

        if (this._layout === 'contact') {
            this._RenderContactPanel();
            return;
        }

        this._RenderContent();
        this._PlayIntroSequence();
    }

    _CacheElements() {
        this._elements.content = document.getElementById('content');
        this._elements.starCanvas = document.getElementById('crawl-stars');
        this._elements.introOverlay = document.getElementById('intro-overlay');
        this._elements.introText = document.getElementById('intro-text');
        this._elements.crawlContainer = document.querySelector('.crawl-container');
        this._elements.crawlTitle = document.getElementById('crawl-title');
        this._elements.contentInfo = document.getElementById('content-info');
        this._elements.contactPanel = document.getElementById('contact-panel');
        this._elements.contactTitle = document.getElementById('contact-title');
        this._elements.contactIntro = document.getElementById('contact-intro');
        this._elements.contactDetails = document.getElementById('contact-details');
        this._crawlContainer = this._elements.crawlContainer;

        if (this._crawlContainer) {
            this._crawlController = new CrawlController(this._crawlContainer);
        }
    }

    _SetupUI() {
        const popup = document.getElementById('esc-popup');
        if (popup) {
            popup.style.display = 'block';
        }

        if (this._elements.content) {
            this._elements.content.style.display = 'block';
        }
    }

    _PrepareStars() {
        const canvas = this._elements.starCanvas;
        if (!canvas) {
            return;
        }

        this._ctx = canvas.getContext('2d');
        this._ResizeCanvas();
        this._CreateStars();
    }

    _ResizeCanvas() {
        const canvas = this._elements.starCanvas;
        if (!canvas) {
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    _CreateStars() {
        const canvas = this._elements.starCanvas;
        if (!canvas) {
            return;
        }

        const starCount = Math.floor((canvas.width + canvas.height) * 0.4);
        this._stars = Array.from({ length: starCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.2 + 0.2,
            alpha: Math.random(),
            twinkle: (Math.random() * 0.02) + 0.005,
        }));
    }

    _AnimateStars() {
        if (!this._ctx || !this._elements.starCanvas) {
            return;
        }

        const canvas = this._elements.starCanvas;
        this._ctx.fillStyle = '#000';
        this._ctx.fillRect(0, 0, canvas.width, canvas.height);

        this._stars.forEach((star) => {
            star.alpha += star.twinkle;
            if (star.alpha <= 0 || star.alpha >= 1) {
                star.twinkle *= -1;
            }

            this._ctx.beginPath();
            this._ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            this._ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this._ctx.fill();
        });

        this._frameId = requestAnimationFrame(this._animateStars);
    }

    _RenderContent() {
        if (this._layout === 'contact') {
            return;
        }

        const { crawlTitle, contentInfo } = this._elements;

        if (crawlTitle) {
            crawlTitle.textContent = this._crawlTitle || '';
            crawlTitle.style.display = this._crawlTitle ? 'block' : 'none';
        }

        if (contentInfo) {
            contentInfo.innerHTML = '';
            const paragraphs = (this._crawlText || '')
                .split('\n')
                .map((text) => text.trim())
                .filter((text) => text.length > 0);

            if (paragraphs.length === 0) {
                const fallback = document.createElement('p');
                fallback.textContent = 'Incoming transmission unavailable.';
                contentInfo.appendChild(fallback);
            } else {
                paragraphs.forEach((text) => {
                    const paragraph = document.createElement('p');
                    paragraph.appendChild(this._CreateLinkAwareFragment(text));
                    contentInfo.appendChild(paragraph);
                });
            }
        }
    }

    _RenderContactPanel() {
        const {
            contactPanel,
            contactTitle,
            contactIntro,
            contactDetails,
            starCanvas,
            introOverlay,
            crawlContainer
        } = this._elements;

        if (!contactPanel || !contactTitle || !contactIntro || !contactDetails) {
            return;
        }

        if (starCanvas) {
            starCanvas.style.display = 'block';
        }
        if (introOverlay) {
            introOverlay.style.display = 'none';
        }
        if (crawlContainer) {
            crawlContainer.style.display = 'none';
        }

        contactPanel.style.display = 'flex';
        contactTitle.textContent = this._contactHeading || this._title || 'Mission Control';
        contactIntro.textContent = this._contactIntro || 'Placeholder intro text for mission control.';
        contactDetails.innerHTML = '';

        if (Array.isArray(this._contactDetails) && this._contactDetails.length > 0) {
            this._contactDetails.forEach((entry) => {
                if (!entry) {
                    return;
                }

                const row = document.createElement('div');
                row.className = 'contact-detail-row';

                const label = document.createElement('span');
                label.className = 'contact-detail-label';
                label.textContent = entry.label || 'Channel';

                const value = document.createElement('span');
                value.className = 'contact-detail-value';

                const formattedValue = this._CreateContactValueElement(entry.value);
                value.appendChild(formattedValue);

                row.appendChild(label);
                row.appendChild(value);
                contactDetails.appendChild(row);
            });
        } else {
            const fallback = document.createElement('div');
            fallback.className = 'contact-detail-row';
            fallback.textContent = 'Update contactDetails in content.json to show channels here.';
            contactDetails.appendChild(fallback);
        }
    }

    _CreateContactValueElement(value) {
        const safeValue = (value || '').trim();

        if (/^https?:\/\//i.test(safeValue)) {
            const link = document.createElement('a');
            link.href = safeValue;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = safeValue.replace(/^https?:\/\//i, '');
            return link;
        }

        if (/^[\w-.]+@[\w-]+\.\w+$/i.test(safeValue)) {
            const link = document.createElement('a');
            link.href = `mailto:${safeValue}`;
            link.textContent = safeValue;
            return link;
        }

        return document.createTextNode(safeValue || 'TBD');
    }

    _CreateLinkAwareFragment(text) {
        const fragment = document.createDocumentFragment();
        if (!text) {
            return fragment;
        }

        const pattern = /(https?:\/\/[^\s]+)|([\w.-]+@[\w.-]+\.\w+)/gi;
        let lastIndex = 0;
        let match;

        while ((match = pattern.exec(text)) !== null) {
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
            }

            const token = match[0];
            if (token.toLowerCase().startsWith('http')) {
                const link = document.createElement('a');
                link.href = token;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = token.replace(/^https?:\/\//i, '');
                fragment.appendChild(link);
            } else {
                const link = document.createElement('a');
                link.href = `mailto:${token}`;
                link.textContent = token;
                fragment.appendChild(link);
            }

            lastIndex = pattern.lastIndex;
        }

        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
        }

        return fragment;
    }

    _PlayIntroSequence() {
        const introOverlay = this._elements.introOverlay;
        const introText = this._elements.introText;
        const crawlContainer = this._crawlContainer || document.querySelector('.crawl-container');

        if (this._overlayHideTimeout) {
            clearTimeout(this._overlayHideTimeout);
            this._overlayHideTimeout = null;
        }

        if (this._overlayFadeTimeout) {
            clearTimeout(this._overlayFadeTimeout);
            this._overlayFadeTimeout = null;
        }

        if (crawlContainer) {
            crawlContainer.style.visibility = 'hidden';
            crawlContainer.style.animation = 'none';
            crawlContainer.style.transform = '';
        }

        if (this._crawlController) {
            this._crawlController.reset();
        }

        if (introOverlay && introText) {
            introText.textContent = (this._crawlIntro && this._crawlIntro.length > 0)
                ? this._crawlIntro
                : 'A long time ago in a galaxy far, far away...';
            introOverlay.style.display = 'flex';
            introOverlay.style.opacity = '1';
            introOverlay.classList.remove('fade-out');
        }

        const introDuration = 2000;
        const fadeDuration = 800;

        this._overlayHideTimeout = setTimeout(() => {
            if (introOverlay) {
                introOverlay.classList.add('fade-out');
                this._overlayFadeTimeout = setTimeout(() => {
                    introOverlay.style.display = 'none';
                    this._StartCrawlAnimation();
                }, fadeDuration);
            } else {
                this._StartCrawlAnimation();
            }
        }, introDuration);
    }

    _StartCrawlAnimation() {
        const crawlContainer = this._crawlContainer || document.querySelector('.crawl-container');

        if (!crawlContainer) {
            return;
        }

        crawlContainer.style.visibility = 'visible';
        crawlContainer.style.animation = 'none';
        crawlContainer.style.transform = 'rotateX(45deg) translateY(0) translateZ(0)';
        crawlContainer.offsetHeight; // Trigger reflow

        if (this._crawlController) {
            this._crawlController.start();
        } else {
            crawlContainer.style.animation = 'crawl 120s linear forwards';
        }
    }

    _OnWindowResize() {
        this._ResizeCanvas();
        this._CreateStars();
    }

    Update(timeElapsed) {
        // No-op: the crawl animation is CSS-driven and the stars animate via RAF.
    }

    Cleanup() {
        if (this._frameId) {
            cancelAnimationFrame(this._frameId);
            this._frameId = null;
        }

        window.removeEventListener('resize', this._resizeHandler);

        if (this._overlayHideTimeout) {
            clearTimeout(this._overlayHideTimeout);
            this._overlayHideTimeout = null;
        }

        if (this._overlayFadeTimeout) {
            clearTimeout(this._overlayFadeTimeout);
            this._overlayFadeTimeout = null;
        }

        if (this._elements.content) {
            this._elements.content.style.display = 'none';
        }

        if (this._elements.starCanvas) {
            this._elements.starCanvas.style.display = '';
        }

        if (this._elements.introOverlay) {
            this._elements.introOverlay.style.display = 'none';
            this._elements.introOverlay.classList.remove('fade-out');
        }

        if (this._elements.contactPanel) {
            this._elements.contactPanel.style.display = 'none';
        }
        if (this._elements.contactDetails) {
            this._elements.contactDetails.innerHTML = '';
        }

        if (this._crawlContainer) {
            this._crawlContainer.style.display = '';
            this._crawlContainer.style.visibility = 'hidden';
            this._crawlContainer.style.animation = 'none';
            this._crawlContainer.style.transform = '';
        }

        if (this._crawlController) {
            this._crawlController.destroy();
            this._crawlController = null;
        }

        const popup = document.getElementById('esc-popup');
        if (popup) {
            popup.style.display = 'none';
        }

        this._stars = [];
        this._ctx = null;
    }
}