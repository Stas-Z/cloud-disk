### Сущность Навигационной цепочки (Хлебные крошки)

Описание: Навигационная цепочка, показывает путь от корневой папки до папки которую на данный момент просматривает пользователь.

#### Public api

-   Components

`BreadcrumbsList` - Компонент со списком цепочки навигации.

-   Functions

`breadcrumbsReducer` - Редьюсер для breadcrumbs.

`breadcrumbsActions` - Redux actions для breadcrumbs.

-   Selectors

`getBreadcrumbs` - Селектор, возвращающий список цепочки навигации.

`getBreadcrumbsWithoutLast` - Селектор, возвращающий список цепочки навигации без последнего элемента.

`getBreadcrumbsWithoutLast` - Селектор, возвращающий имя последнего в списке цепочки навигации.

-   Const

`defaultBreadcrumb` - Начальное дефолтное значение в цепочка навигации _(Файлы > ... > ... )_.

-   Types

`BreadcrumbsSchema` - Описывает тип хранилища redux для цепочки навигации.
