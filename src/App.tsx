import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './Routers/AppRouter';
import store from './Store/store';
import ScooterDetail from './Components/Modal/ScooterDetail/ScooterDetail';

const App = () => (
  <Provider store={store}>
    <AppRouter />
    <ScooterDetail />
  </Provider>
);

export default App;
