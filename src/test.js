class ElementInteractor {
  constructor(selector) {
    this.selector = selector;
    this.element = null;
  }

  find() {
    this.element = document.querySelector(this.selector);
    return this.element;
  }

  click() {
    if (this.element) {
      this.element.click();
    } else {
      throw new Error(`Element with selector "${this.selector}" not found`);
    }
  }

  isEnabled() {
    // Ensure this checks the actual DOM element (not the ElementInteractor instance)
    return (
      this.element && this.element.getAttribute('aria-disabled') === 'false'
    );
  }

  onVisibilityChanged(callback) {
    if (!this.element) return;
    const observer = new MutationObserver(() => {
      if (!this.element.classList.contains('vjs-hidden')) {
        callback(this.element);
      }
    });

    observer.observe(this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}

class ActionScheduler {
  static clickWhenReady(selector, action) {
    const interval = setInterval(() => {
      const interactor = new ElementInteractor(selector);
      const element = interactor.find();
      if (element && interactor.isEnabled()) {
        // Corrected here: using interactor to check isEnabled
        action(element);
        clearInterval(interval);
      }
    }, 1000);
  }
}

class App {
  static initialize() {
    this.setupClickAction('.vjs-big-play-button');
    this.setupVisibilityObservers();
  }

  static setupClickAction(selector) {
    // Using ActionScheduler to trigger the click when the element is ready
    ActionScheduler.clickWhenReady(selector, (button) => {
      const interactor = new ElementInteractor(selector);
      interactor.click();
    });
  }

  static setupVisibilityObservers() {
    const overlays = [
      '.vjs-overlay.vjs-overlay-bottom-left.vjs-overlay-skip-intro.vjs-overlay-background',
      '.vjs-overlay.vjs-overlay-bottom-right.vjs-overlay-skip-intro.vjs-overlay-background'
    ];

    overlays.forEach((selector) => {
      const interactor = new ElementInteractor(selector);
      interactor.onVisibilityChanged(() => {
        interactor.click();
      });
    });
  }
}

window.addEventListener('load', () => {
  App.initialize(); // This triggers the setup for both click and visibility observers
});
