import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import {store,persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './components/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SnackbarProvider>
                        <App />
                </SnackbarProvider>
            </PersistGate>
        </Provider>
    </BrowserRouter>
);