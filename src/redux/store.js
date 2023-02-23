import { configureStore , combineReducers} from '@reduxjs/toolkit'
import useRreducer from './user';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    } from 'redux-persist'
    import storage from 'redux-persist/lib/storage';

    const persistConfig = {
        key: 'root',
        version: 1,
        storage,
    }

    const rootReducer = combineReducers({
        admin:persistReducer(persistConfig, useRreducer) , 
    })

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store)