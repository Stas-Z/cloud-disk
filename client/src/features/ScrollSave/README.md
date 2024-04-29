### Фича для сохранения позиции скролла

Описание: Сохраняет значение скролла по id директории. Вся логика redux реализована в этой фиче.

#### Public api

-   Functions

`scrollSaveReducer` - Редьюсер для сохранения позиции скролла.

`scrollSaveActions` - Redux actions для сохранения позиции скролла.

`deleteDirScroll` - Удаления из стэйта скролла по id элемента.

-   Selectors

`getScrollSaveByDir` - Селектор, возвращающий позицию скролла в зависимости от директории.

-   Types

`ScrollSaveSchema` - Описывает тип хранилища redux для сохранения позиции скролла.