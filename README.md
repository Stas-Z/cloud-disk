# Облачное хранилище данных "OpenCloud"

Ознакомиться с приложением можно по ссылке [>>> Open-Cloud <<<](https://cloud-disk.openblogapp.ru)

## Описание

Проект представляет собой облачное хранилище данных. Приложение позволяет пользователю хранить, управлять и обмениваться файлами через интернет.
За основу был взят дизайн YandexDisk'а. Интуитивно понятный интерфейс обеспечивает удобное взаимодействие с приложением.
Основна клиентской части: React, TypeScript, Redux toolkit, самописная UI библиотека и т.д.
Серверная часть приложения реализована с использованием Node.js и фреймворка Express.js, а также библиотеки для работы с базой данных, Mongoose для MongoDB.

## Как работает приложение

-   **Регистрация и аутентификация пользователей:** Пользователи могут зарегистрироваться в системе, предоставив свой адрес электронной почты и пароль. После регистрации они могут войти в систему, используя свои учетные данные.
-   **Управление файлами и папками:** Пользователи могут создавать новые папки, загружать файлы, скачивать файлы и папки и удалять их.
-   **Хранение данных:** Данные о пользователях, файлах и папках хранятся в базе данных MongoDB. Для взаимодействия с базой данных используется библиотека Mongoose.

## [Клиентская часть](client/README.md)

-   Клиентская часть приложения отвечает за интерфейс пользователя и представление данных. Здесь пользователи могут взаимодействовать с файлами и папками через удобный и интуитивно понятный пользовательский интерфейс.

## [Серверная часть](server/README.md)

-   Серверная часть приложения отвечает за бизнес-логику, обработку запросов и взаимодействие с базой данных. Здесь реализованы API эндпоинты для выполнения операций с файлами и папками, также в проекте используется JWT token для регистрации и аутентификации пользователей.
