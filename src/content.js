(function () {
  'use strict';

  const config = {
    selectors: {
      player: '#my-player',
      playButton: '.vjs-big-play-button',
      skipButtons: [
        '.vjs-overlay.vjs-overlay-bottom-left.vjs-overlay-skip-intro',
        '.vjs-overlay.vjs-overlay-bottom-right.vjs-overlay-skip-intro'
      ]
    }
  };

  let isFirstLoad = true;
  const skipFlags = { intro: false, outro: false };

  function log(level, message) {
    console[level](`[${new Date().toISOString()}] ${message}`);
  }

  function isElementClickable(element) {
    return (
      element &&
      element.offsetParent !== null &&
      window.getComputedStyle(element).pointerEvents !== 'none'
    );
  }

  function clickButton(button) {
    if (isElementClickable(button)) {
      button.click();
      log('info', `Кнопка нажата: ${button.className}`);
      return true;
    }
    log('warn', `Кнопка недоступна: ${button.className}`);
    return false;
  }

  function observeSkipButtons(player, skipFlags) {
    const observer = new MutationObserver(() => {
      config.selectors.skipButtons.forEach((selector, index) => {
        const flagKey = index === 0 ? 'intro' : 'outro';
        if (!skipFlags[flagKey]) {
          const button = player.querySelector(selector);
          if (button && !button.classList.contains('vjs-hidden')) {
            if (clickButton(button)) {
              skipFlags[flagKey] = true;
            }
          }
        }
      });
    });

    observer.observe(player, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }

  function startObserver() {
    const player = document.querySelector(config.selectors.player);
    if (!player) return log('error', 'Плеер не найден');

    if (isFirstLoad) {
      const playButton = player.querySelector(config.selectors.playButton);
      if (playButton) {
        requestIdleCallback(
          () => {
            if (clickButton(playButton)) {
              isFirstLoad = false;
              log('info', 'Видео запущено, начинаем мониторинг');
              observeSkipButtons(player, skipFlags);
            }
          },
          { timeout: 1000 }
        );
      }
    } else {
      observeSkipButtons(player, skipFlags);
    }
  }

  if (document.readyState === 'complete') {
    startObserver();
  } else {
    window.addEventListener('load', startObserver);
  }
})();
