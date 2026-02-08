class ParallaxManager {
  constructor() {
    this.sections = document.querySelectorAll('[data-parallax-depth]');
    this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.requestId = null;

    if (!this.isMobile && this.sections.length > 0) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.onScroll();
  }

  onScroll() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
    this.requestId = requestAnimationFrame(() => this.updateSections());
  }

  updateSections() {
    const scrollY = window.pageYOffset;
    this.sections.forEach(section => {
      const depth = parseFloat(section.getAttribute('data-parallax-depth')) || 0;
      const yOffset = scrollY * depth;
      section.style.transform = `translate3d(0, ${yOffset}px, 0)`;
    });
  }
}

const parallax = new ParallaxManager();
