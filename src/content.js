function clickButtonWhenReady(selector, action, flagName) {
  const interval = setInterval(() => {
    const button = document.querySelector(selector);
    if (
      button &&
      !button.classList.contains('vjs-hidden') &&
      button.getAttribute('aria-disabled') === 'false'
    ) {
      action(button);
      window[flagName] = true;

      clearInterval(interval);
    }
  }, 1000);
}

function monitorVisibility(selector, action) {
  const targetElement = document.querySelector(selector);
  if (!targetElement) {
    return;
  }

  const observer = new MutationObserver(() => {
    if (!targetElement.classList.contains('vjs-hidden')) {
      action(targetElement);
    }
  });

  observer.observe(targetElement, {
    attributes: true,
    attributeFilter: ['class']
  });
}

function clickAction(button) {
  button.click();
}

function initializeObservers() {
  clickButtonWhenReady('.vjs-big-play-button', clickAction);
  monitorVisibility(
    '.vjs-overlay.vjs-overlay-bottom-left.vjs-overlay-skip-intro.vjs-overlay-background',
    clickAction
  );
  monitorVisibility(
    '.vjs-overlay.vjs-overlay-bottom-right.vjs-overlay-skip-intro.vjs-overlay-background',
    clickAction
  );
}

window.addEventListener('load', () => {
  initializeObservers();
});

initializeObservers();
