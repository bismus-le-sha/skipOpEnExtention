# Auto Button Clicker

## Описание

**Auto Button Clicker** — это расширение для браузера, которое автоматически выполняет следующие действия на сайте **[jut.su](https://jut.su)**:

- **Пропуск заставки**: автоматически нажимает кнопку пропуска заставки, как только она становится доступной.
- **Автоматическое воспроизведение видео**: нажимает кнопку воспроизведения, если видео ещё не запущено.
- **Переход к следующей серии**: после завершения текущей серии автоматически кликает по кнопке для перехода к следующей серии.

Расширение упрощает просмотр контента на **jut.su**, исключая необходимость вручную нажимать кнопки для перехода между сериями или пропуска заставок.

## Функционал

- **Пропуск заставки**: автоматически нажимает кнопку для пропуска заставки в видео.
- **Автоматическое воспроизведение**: автоматически запускает видео, если оно не воспроизводится.
- **Переход к следующей серии**: автоматически переходит к следующему видео или серии, когда оно завершено.

### Примечания

- **Поддерживаемый сайт**: Расширение работает только на сайте **[jut.su](https://jut.su)**. Оно не будет функционировать на других сайтах.
- Расширение не требует дополнительных настроек, оно работает сразу после установки.

## Установка локально

Чтобы установить это расширение на вашем браузере, выполните следующие шаги:

### 1. Подготовьте файлы расширения

Скачайте или клонируйте репозиторий проекта на ваш компьютер.

1. Чтобы клонировать репозиторий, выполните команду:
   ```bash
   git clone https://github.com/bismus-le-sha/skipOpEnExtention.git
   ```

### 2. Установите расширение в браузер

1. **Для Google Chrome или браузеров на движке Chromium (например, Vivaldi):**

   - Перейдите на страницу расширений в браузере по адресу `chrome://extensions` или `vivaldi://extensions`.
   - Включите "Режим разработчика" в правом верхнем углу страницы.
   - Нажмите кнопку **"Загрузить распакованное"**.
   - Выберите папку с клонированным или скачанным репозиторием.

2. **Для Mozilla Firefox:**
   - Перейдите в меню настроек (три горизонтальные полоски в правом верхнем углу).
   - Выберите **"Дополнения"**.
   - Нажмите на значок шестерёнки в правом верхнем углу и выберите **"Установить дополнение из файла..."**.
   - Выберите файл расширения `.xpi` (если вы создали архив, вы можете выбрать его).

### 3. Перезагрузите браузер

После того как расширение будет загружено, перезагрузите браузер, чтобы оно стало доступно.

### 4. Начните использовать

Теперь вы можете начать использовать расширение. Перейдите на сайт **[jut.su](https://jut.su)**, откройте видео, и расширение автоматически выполнит все необходимые действия: пропустит заставку, запустит видео и перейдёт к следующей серии по завершению текущего видео.

### 5. Отключение расширения

Если вам нужно временно отключить расширение, вы можете сделать это на странице управления расширениями (`chrome://extensions` для Google Chrome и Vivaldi, `addons.mozilla.org` для Firefox), отключив его или удалив.

## Разработка

Если вы хотите внести изменения в расширение, просто откройте код проекта и отредактируйте его. Для тестирования изменений вы можете перезагрузить расширение через страницу управления расширениями в браузере.

### Установка зависимостей

Если вам нужно установить зависимости для разработки, вы можете использовать пакетный менеджер, например `npm` или `yarn`, для установки любых дополнительных пакетов, которые могут понадобиться для проекта.

```bash
npm install
```

## Лицензия

Это расширение распространяется по лицензии MIT License - см. файл [LICENSE](./LICENSE). Вы можете свободно использовать, изменять и распространять его, в том числе для личных и коммерческих целей.

---

Если у вас возникли вопросы или предложения по улучшению, не стесняйтесь создавать **issues** или **pull requests** в репозитории!
