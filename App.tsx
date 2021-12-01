import React, { ReactNode } from 'react';
import { default as Router } from './src/router/Router';

/**
 * @name App
 * @description Our React Native App.
 * @constructor
 */
const App: () => ReactNode = () => <Router />;

export default App;
