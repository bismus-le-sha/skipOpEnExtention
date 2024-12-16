let skipIntroClicked = false;
let nextEpisodeClicked = false;
let playButtonClicked = false;

function clickButtonWhenReady(selector, action, flagName) {
  const interval = setInterval(() => {
    const button = document.querySelector(selector);
    if (button && !button.classList.contains("vjs-hidden") && button.getAttribute("aria-disabled") === "false") {
      action(button);
      window[flagName] = true; 
      console.log(`${selector} нажата.`);
      clearInterval(interval); 
    }
  }, 1000); 
}

function monitorVisibility(selector, action, flagName) {
  const targetElement = document.querySelector(selector);
  if (!targetElement) {
    console.log(`Элемент с селектором "${selector}" не найден.`);
    return;
  }

  const observer = new MutationObserver(() => {
    if (!targetElement.classList.contains("vjs-hidden")) {
      if (!window[flagName]) {
        action(targetElement); 
        window[flagName] = true; 
      }
    }
  }, 1000);

  observer.observe(targetElement, { attributes: true, attributeFilter: ["class"] });
  console.log(`Наблюдение за "${selector}" запущено.`);
}

function skipIntroAction(button) {
  button.click();
  console.log('Кнопка "Пропустить заставку" нажата.');
}

function nextEpisodeAction(button) {
  button.click();
  console.log('Кнопка "Следующая серия" нажата.');
}

function playVideoAction(button) {
  if (!playButtonClicked) {
    button.click();
    console.log('Кнопка "Воспроизвести видео" нажата.');
  }
}

function initializeObservers() {
  skipIntroClicked = false;
  nextEpisodeClicked = false;
  playButtonClicked = false;

  clickButtonWhenReady('.vjs-big-play-button', playVideoAction, "playButtonClicked");
  monitorVisibility('.vjs-overlay.vjs-overlay-bottom-left.vjs-overlay-skip-intro.vjs-overlay-background', skipIntroAction, "skipIntroClicked");
  monitorVisibility('.vjs-overlay.vjs-overlay-bottom-right.vjs-overlay-skip-intro.vjs-overlay-background', nextEpisodeAction, "nextEpisodeClicked");
}


window.addEventListener("load", () => {
  console.log("Новая страница загружена, инициализация...");
  initializeObservers(); 
});

initializeObservers();
