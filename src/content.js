(function () {
  'use strict';

  const config = {
    selectors: {
      player: '#my-player',
      buttons: [
        '.vjs-big-play-button',
        '.vjs-overlay.vjs-overlay-bottom-left.vjs-overlay-skip-intro',
        '.vjs-overlay.vjs-overlay-bottom-right.vjs-overlay-skip-intro'
      ]
    },
    observer: {
      debounceDelay: 100,
      timeout: 80000
    }
  };

  let isFirstLoad = true;
  let observer;
  let timeoutId;

  function log(level, message) {
    const timestamp = new Date().toISOString();
    console[level](`[${timestamp}] ${message}`);
  }

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  class DOMHelper {
    static isElementClickable(element) {
      return (
        element &&
        element.offsetParent !== null &&
        window.getComputedStyle(element).pointerEvents !== 'none'
      );
    }

    static isElementVisible(element) {
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const topElement = document.elementFromPoint(centerX, centerY);
      return element.contains(topElement);
    }

    static waitForElement(container, selector, options = {}) {
      return new Promise((resolve, reject) => {
        try {
          const searchInContainer = () =>
            container?.querySelector(selector) || null;

          const elm = searchInContainer();
          if (elm && (!options.checkVisibility || this.isElementVisible(elm))) {
            return resolve(elm);
          }

          const observer = new MutationObserver((obs) => {
            try {
              const elm = searchInContainer();
              if (
                elm &&
                (!options.checkVisibility || this.isElementVisible(elm))
              ) {
                obs.disconnect();
                resolve(elm);
              }
            } catch (err) {
              obs.disconnect();
              reject(err);
            }
          });

          observer.observe(container, {
            childList: true,
            subtree: true,
            attributes: options.observeAttributes || false
          });

          setTimeout(() => {
            observer.disconnect();
            reject(
              new Error(
                `Элемент ${selector} не найден за ${config.observer.timeout} мс`
              )
            );
          }, config.observer.timeout);
        } catch (err) {
          reject(err);
        }
      });
    }
  }

  function clickWhenReady(container, selectors, clickedButtons) {
    let found = false;

    selectors.forEach((selector) => {
      if (clickedButtons.has(selector)) return;

      DOMHelper.waitForElement(container, selector, {
        checkVisibility: true,
        observeAttributes: true
      })
        .then((elm) => {
          if (DOMHelper.isElementClickable(elm)) {
            log('info', `Кнопка найдена и нажата: ${selector}`);
            elm.click();
            clickedButtons.add(selector);
            found = true;
          } else {
            log('warn', `Кнопка ${selector} найдена, но недоступна для клика`);
          }
        })
        .catch((err) => log('error', err.message));
    });

    return found;
  }

  function isVideoPlaying(player) {
    return player.classList.contains('vjs-playing');
  }

  function isVideoPaused(player) {
    return player.classList.contains('vjs-paused');
  }

  function startObserver() {
    const { player: playerSelector, buttons } = config.selectors;
    let clickedButtons = new Set();

    function checkAndClickButtons() {
      const player = document.querySelector(playerSelector);
      if (!player) return;

      if (isFirstLoad) {
        const playButtonSelector = buttons[0];
        clickWhenReady(player, [playButtonSelector], clickedButtons);
        isFirstLoad = false;
      }

      if (isVideoPaused(player)) {
        log('info', 'Видео на паузе, поиск кнопок пропуска остановлен');
        if (timeoutId) clearTimeout(timeoutId);
        return;
      }

      if (isVideoPlaying(player)) {
        const skipButtons = buttons.slice(1);
        const found = clickWhenReady(player, skipButtons, clickedButtons);

        if (!found && !timeoutId) {
          timeoutId = setTimeout(() => {
            log('info', 'Кнопки пропуска не найдены, поиск остановлен');
            if (observer) observer.disconnect();
          }, config.observer.timeout);
        }
      }
    }

    checkAndClickButtons();

    observer = new MutationObserver(
      debounce(checkAndClickButtons, config.observer.debounceDelay)
    );
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    log('info', 'Observer запущен!');
  }

  if (document.readyState === 'complete') {
    startObserver();
  } else {
    window.addEventListener('load', startObserver);
  }
})();
