# Клиентская часть приложения:

## Запуск проекта

-   `npm install` - устанавливаем зависимости
-   `npm run start:dev` - запуск проекта в dev режиме

---

## Скрипты

-   `npm run start` - Запуск frontend проекта на webpack dev server
-   `npm run build:prod` - Сборка в prod режиме
-   `npm run build:dev` - Сборка в dev режиме (не минимизирован)
-   `npm run lint:ts` - Проверка ts файлов линтером
-   `npm run lint:ts:fix` - Исправление ts файлов линтером
-   `npm run lint:scss` - Проверка scss файлов style линтером
-   `npm run lint:scss:fix` - Исправление scss файлов style линтером
-   `npm run prepare` - Прекоммит хуки
-   `npm run generate:slice` - Скрипт для генерации FSD слайсов
-   `npm run generate:slice` - Скрипт для генерации readme файлов
-   `npm run postinstall` - Применяет патчи после npm i

---

## Рекомендуемые расширения для Visual Studio Code

Чтобы улучшить процесс разработки, мы рекомендуем установить следующие расширения для Visual Studio Code:

-   **ESLint** (`dbaeumer.vscode-eslint`): Интегрирует ESLint в VS Code для проверки кода JavaScript и TypeScript.
-   **Prettier** (`esbenp.prettier-vscode`): Применяется для автоматического форматирования кода.

Вы можете установить эти расширения, выполнив поиск во вкладке «Extensions» в Visual Studio Code или воспользовавшись фильтром `@recommended:workspace`, чтобы просмотреть список рекомендуемых расширений.

---

## Архитектура проекта

Проект написан в соответствии с методологией Feature-Sliced Design (FSD)

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Ссылка на документацию - [i18next](https://react.i18next.com/)

---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов
используется собственный eslint plugin _eslint-plugin-fsd-pathcheker_,
который содержит 3 правила

1. path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2. layer-imports - проверяет корректность использования слоев с точки зрения FSD
   (например widgets нельзя использовать в features и entitites)
3. public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

### Запуск линтеров

-   `npm run lint:ts` - Проверка ts файлов линтером
-   `npm run lint:ts:fix` - Исправление ts файлов линтером
-   `npm run lint:scss` - Проверка scss файлов style линтером
-   `npm run lint:scss:fix` - Исправление scss файлов style линтером

---

## Конфигурация проекта

Для разработки в проекте используется сборщик Webpack:

Конфигурация Webpack - [./config/build](./config/build)

В папке `scripts` находятся различные скрипты для рефакторинга\упрощения написания кода\генерации отчетов и тд.

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.

По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [Async Thunk](./src/shared/api/api.ts).

Для асинхронного подключения редюсеров (чтобы не тянуть их в общий бандл) используется [DynamicModuleLoader](./src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx).

---

## App slices

### Shared

Shared папка содержит весь общий код, который можно использовать в любой части приложения и который не связан с какой-либо конкретной сущностью.

### Сущности (entities)

Повторно используемые части, относящиеся к определенному объекту. Позже они объединяются в значимые блоки в виджетах.

-   [Breadcrumbs](./src/entities/Breadcrumbs/README.md): Компоненты и функциональность связанные с Цепочкой навигации (хлебные крошки).
-   [Counter](./src/entities/Counter/README.md): Счётчик.
-   [File](./src/entities/File/README.md): Компоненты и функциональность связанные с Файлами.
-   [Notice](./src/entities/Notice/README.md): Компоненты и функциональность связанные с Уведомлениями.
-   [User](./src/entities/User/README.md): Компоненты и функциональность связанные с Пользователем.

### Фичи (features)

Features — это функциональные блоки, которые предоставляют пользователю действия, которые пользователь может совершать в приложении для взаимодействия с бизнес-объектами.

Одна фичя = одна функциональность.

-   [AuthorizationForm](./src/features/AuthorizationForm/README.md): позволяет пользователю зарегистрироваться или авторизоваться с помощью адреса email.
-   [AvatarDropdown](./src/features/AvatarDropdown/README.md): отображает раскрывающееся меню для пользователя.
-   [CreateNewDir](./src/features/CreateNewDir/README.md): allows users to rate articles.
-   [EditableProfileCard](./src/features/EditableProfileCard/README.md): отображает информацию профиля пользователя.
-   [FilePageGreeting](./src/features/FilePageGreeting/README.md): отображает приветственное сообщение, когда пользователь впервые авторизовался.
-   [FileToolBar](./src/features/FileToolBar/README.md): отображает тулбар для взаимодействия с выбранным файлом.
-   [LangSwitcher](./src/features/LangSwitcher/README.md): позволяет пользователям переключаться между разными языками.
-   [ScrollSave](./src/features/ScrollSave/README.md): сохраняет позицую скролла.
-   [UploaderBar](./src/features/UploaderBar/README.md): отображает процесс загрузки файлов.
-   [UploadFiles](./src/features/UploadFiles/README.md): позволяет загружать файлы на сервер.
-   [UsedSpaceBar](./src/features/UsedSpaceBar/README.md): отображает использованное место выделенное пользователю.
-   [UserFilesFilters](./src/features/UserFilesFilters/README.md): позволяет пользователям фильтровать файлы по различным критериям.

### Widgets

-   [DragAndDrop](./src/widgets/DragAndDrop/README.md): осуществляет логику загрузки файлов способом Drag-and-drop.
-   [LoginModal](./src/widgets/LoginModal/README.md): отображает модульное окно регистрации/авторизации.
-   [Navbar](./src/widgets/Navbar/README.md): отображает панель для поиска файлов, также данные связанные с пользователем, такие как панель пользователя.
-   [Page](./src/widgets/Page/README.md): базовый компонент страницы, который устанавливает стили страницы по умолчанию (например: отступы, поля) и общие функции страницы (например: восстановление положения прокрутки страницы).
-   [PageError](./src/widgets/PageError/README.md): отображает блок с сообщением об ошибке, когда страница не загружается.
-   [Sidebar](./src/widgets/Sidebar/README.md): отображает боковую панель со ссылками на различные разделы сайта, а также блок с созданием папки и загрузки файлов.

### Pages

-   [FilesPage](./src/pages/FilesPage/README.md): отображает список файлов.
-   [ForbiddenPage](./src/pages/ForbiddenPage/README.md): отображает сообщение об ошибке, когда пользователь пытается получить доступ к запрещенной странице.
-   [LoginPage](./src/pages/ForbiddenPage/README.md): отображает страницу аторизации/регистрации.
-   [NotFoundPage](./src/pages/NotFoundPage/README.md): отображает сообщение об ошибке, когда пользователь пытается получить доступ к несуществующей странице.
-   [ProfilePage](./src/pages/ProfilePage/README.md): отображает информацию профиля пользователя.

### App

Папка App содержит весь код, связанный с приложением, который никогда не используется ни в каких других слоях _(за исключением типов)_.
