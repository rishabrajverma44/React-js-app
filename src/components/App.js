import { Header } from './Header.js';
import { Form } from './Form.js';
import { Table } from './Table.js';

export function renderApp() {
  const root = document.getElementById('app');
  root.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'main-app';

  container.appendChild(Header());

  const mainDiv = document.createElement('div');
  mainDiv.className = 'main-div';
  mainDiv.appendChild(Form());
  mainDiv.appendChild(Table());

  container.appendChild(mainDiv);
  container.appendChild(mainDiv);

  root.appendChild(container);
}
