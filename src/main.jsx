/**
 * main.jsx — Application Entry Point
 * 
 * React Concepts:
 * - StrictMode: Activates additional development checks and warnings
 * - createRoot: React 18's root API for concurrent rendering
 * 
 * Redux Concepts:
 * - Provider: Makes the Redux store available to all child components
 *   via React Context. Any component can then use useSelector/useDispatch.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provider wraps the entire app, making the Redux store globally accessible */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
