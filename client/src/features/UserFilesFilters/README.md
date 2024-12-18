### Фича для сортировки и поиска файлов

Описание: Осуществляет поиск и сортировку файлов. Сортирует файлы по разным показателям _( названию, размеру, типу, дате )_, Также меняет отображение файлов _( список, плитка, большая плитка)_. Вся логика redux реализована в этой фиче.

#### Public api

-   Components

`FileSearch` - Компонент с логикой поиска файлов.

`UserFilesFilters` - Компонент с сортировкой и выбором отображения файлов.

-   Functions

`userFilesFiltersActions` - Редьюсер для сортировки и поиска файлов.

`userFilesFiltersReducer` - Redux actions для сортировки и поиска файлов.

-   Selectors

`getFileFiltersSearch` - Селектор, возвращающий название искомого файла.

`getFileFiltersView` - Селектор, возвращающий отображение файлов.

`getFileFiltersInited` - Селектор, возвращающий залогинен ли пользователь.

-   Types

`UserFilesFiltersSchema` - Описывает тип хранилища redux для сортировки и поиска файлов.
