import './bootstrap';
import '../css/main.css';

import { render } from 'react-dom'; // eslint-disable-line
import routes from './routes.jsx';

render(
  routes,
  window.document.getElementById('root')
);
