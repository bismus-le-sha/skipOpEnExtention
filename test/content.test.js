const {
  isElementClickable,
  clickButton,
  observeSkipButtons
} = require('../src/content');

describe('isElementClickable', () => {
  it('должна возвращать true для кликабельного элемента', () => {
    const element = document.createElement('div');
    element.offsetParent = {}; // Элемент видим
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ pointerEvents: 'auto' })
    });
    expect(isElementClickable(element)).toBe(true);
  });

  it('должна возвращать false для некликабельного элемента', () => {
    const element = document.createElement('div');
    element.offsetParent = null; // Элемент не видим
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ pointerEvents: 'none' })
    });
    expect(isElementClickable(element)).toBe(false);
  });
});

describe('clickButton', () => {
  it('должна нажимать кнопку, если она кликабельна', () => {
    const button = document.createElement('div');
    button.click = jest.fn();
    button.offsetParent = {}; // Элемент видим
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ pointerEvents: 'auto' })
    });

    const result = clickButton(button);
    expect(button.click).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('не должна нажимать кнопку, если она не кликабельна', () => {
    const button = document.createElement('div');
    button.click = jest.fn();
    button.offsetParent = null; // Элемент не видим
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({ pointerEvents: 'none' })
    });

    const result = clickButton(button);
    expect(button.click).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });
});

describe('observeSkipButtons', () => {
  let player;
  let skipFlags;
  let observerCallback;

  beforeEach(() => {
    player = document.createElement('div');
    skipFlags = { intro: false, outro: false };
    jest.spyOn(global, 'MutationObserver').mockImplementation((callback) => {
      observerCallback = callback;
      return {
        observe: jest.fn(),
        disconnect: jest.fn()
      };
    });
  });

  it('должна нажимать кнопку пропуска интро, если она доступна', () => {
    const skipIntroButton = document.createElement('div');
    skipIntroButton.className =
      'vjs-overlay vjs-overlay-bottom-left vjs-overlay-skip-intro';
    player.appendChild(skipIntroButton);

    observeSkipButtons(player, skipFlags);
    observerCallback();

    expect(skipFlags.intro).toBe(true);
  });

  it('не должна нажимать кнопку пропуска интро, если она уже нажата', () => {
    skipFlags.intro = true;
    const skipIntroButton = document.createElement('div');
    skipIntroButton.className =
      'vjs-overlay vjs-overlay-bottom-left vjs-overlay-skip-intro';
    player.appendChild(skipIntroButton);

    observeSkipButtons(player, skipFlags);
    observerCallback();

    expect(skipFlags.intro).toBe(true);
  });
});
