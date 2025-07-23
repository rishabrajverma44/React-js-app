import { getState, setFormEdit, deleteForm } from '../app.state';
import { renderApp } from './App.js';

export function Table() {
  //get current state
  const state = JSON.parse(getState());
  const tableDiv = document.createElement('div');
  tableDiv.className = 'table-main';
  tableDiv.innerHTML = `
  <table>
    <thead>
      <tr><th>Company</th><th>Role</th><th>Job-Type</th><th>Location</th><th>Date</th><th>status</th><th>notes</th><th>Actions</th></tr>
    </thead>
    <tbody>
      ${state.items
        .map(
          (item) => `
        <tr>
          <td>${item.company}</td>
          <td>${item.role}</td>
          <td>${item.jobType}</td>
          <td>${item.location === '' ? '####' : item.location}</td>
          <td>${item.date}</td>
          <td style="color:${
            item.status === 'Rejected' ? 'red' : item.status === 'Hired' ? 'green' : ''
          }">${item.status}</td>
          <td>${item.notes}</td>
          <td class="action">
            <button data-id=${item.Id} class="edit-btn">Edit</button>
            <button data-id=${item.Id} class="delete-btn">Delete</button>
          </td>
        </tr>`
        )
        .join('')}</tbody>
     </table>
     `;

  if (state.items.length === 0) {
    tableDiv.style.display = 'none';
  }

  tableDiv.querySelectorAll('.edit-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if (id) {
        setFormEdit(id);
        renderApp();
      }
    });
  });

  tableDiv.querySelectorAll('.delete-btn').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (e) => {
      if (confirm('delete ?')) {
        const id = e.target.dataset.id;
        deleteForm(id);
        renderApp();
      }
    });
  });

  return tableDiv;
}
