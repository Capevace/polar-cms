import './bootstrap';
import '../css/main.css';

import { render } from 'react-dom';
import routes from './routes';

render(
  routes,
  window.document.getElementById('root')
);
