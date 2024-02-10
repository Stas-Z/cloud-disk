import type {
    StateSchema,
    ReduxStoreWithManager,
    StateSchemaKey,
    ThunkConfig,
    AppDispatch,
} from './config/StateSchema'
import { createReduxStore } from './config/store'
import { StoreProvider } from './ui/StoreProvider'

export { StoreProvider, createReduxStore }

export type {
    StateSchema,
    AppDispatch,
    StateSchemaKey,
    ReduxStoreWithManager,
    ThunkConfig,
}
