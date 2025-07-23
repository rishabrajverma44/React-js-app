import { getState, setState } from '../app.state.js';
import { renderApp } from './App.js';

export function Form() {
  const form = document.createElement('form');
  const state = JSON.parse(getState());
  const isEdit = !!state.form.Id;

  form.innerHTML = `
    <div id='applicationForm'>
      <label for="company">Company Name:</label>
      <input type="text" id="company" placeholder="Company name" value="${
        state.form.company || ''
      }" />
      <span class="validation-error" id="erorCompany">Enter company name</span>

      <label for="role">Role:</label>
      <input type="text" id="role" placeholder="Enter role" value="${state.form.role || ''}" />
      <span class="validation-error" id="erorJobRole">Enter job role</span>

      <label for="jobType">Job Type:</label>
      <select id="jobType">
        <option value="" disabled ${!state.form.jobType ? 'selected' : ''}>Select job type</option>
        <option value="Remote" ${state.form.jobType === 'Remote' ? 'selected' : ''}>Remote</option>
        <option value="Onsite" ${state.form.jobType === 'Onsite' ? 'selected' : ''}>Onsite</option>
        <option value="Hybrid" ${state.form.jobType === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
      </select>
      <span class="validation-error" id="erorJobType">Select job type</span>

      <label for="location" id="locationLabel">Location:</label>
      <input type="text" id="location" placeholder="Enter location" value="${
        state.form.location || ''
      }" />
      <span class="validation-error" id="erorLocation">Enter location</span>

      <label for="date">Application Date:</label>
      <input type="date" id="date" value="${state.form.date || ''}" />
      <span class="validation-error" id="erorDate">Select date</span>

      <label for="status">Application Status:</label>
      <select id="status" class="form-control">
        <option value="" disabled ${!state.form.status ? 'selected' : ''}>Select status</option>
        <option value="Applied" ${
          state.form.status === 'Applied' ? 'selected' : ''
        }>Applied</option>
        <option value="Interviewing" ${
          state.form.status === 'Interviewing' ? 'selected' : ''
        }>Interviewing</option>
        <option value="Rejected" ${
          state.form.status === 'Rejected' ? 'selected' : ''
        }>Rejected</option>
        <option value="Hired" ${state.form.status === 'Hired' ? 'selected' : ''}>Hired</option>
      </select>
      <span class="validation-error" id="erorJobStatus">Select job status</span>

      <label for="notes">Notes:</label>
      <textarea id="notes" rows="3">${state.form.notes || ''}</textarea>

      <button type="submit" id="submitBtn">
        ${isEdit ? 'Update' : 'Add'} Application
      </button>
    </div>
  `;

  // Grab all DOM elements inside the form
  const company = form.querySelector('#company');
  const role = form.querySelector('#role');
  const jobType = form.querySelector('#jobType');
  const location = form.querySelector('#location');
  const locationLabel = form.querySelector('#locationLabel');
  const date = form.querySelector('#date');
  const status = form.querySelector('#status');
  const notes = form.querySelector('#notes');

  const erorCompany = form.querySelector('#erorCompany');
  const erorJobRole = form.querySelector('#erorJobRole');
  const erorJobType = form.querySelector('#erorJobType');
  const erorLocation = form.querySelector('#erorLocation');
  const erorDate = form.querySelector('#erorDate');
  const erorJobStatus = form.querySelector('#erorJobStatus');

  // Hide error spans innitially
  [erorCompany, erorJobRole, erorJobType, erorLocation, erorJobStatus].forEach((el) => {
    el.style.display = 'none';
  });

  const toggleLocationField = () => {
    const isRemote = jobType.value === 'Remote';
    location.disabled = isRemote;
    location.style.display = isRemote ? 'none' : 'block';
    locationLabel.style.display = isRemote ? 'none' : 'block';
    erorLocation.style.display = isRemote || jobType.value === '' ? 'none' : 'block';
  };

  jobType.addEventListener('change', toggleLocationField);
  toggleLocationField();
  erorLocation.style.display = 'none';

  // Submit event trigger
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    //validation check
    const showError = (input, errorElement) => {
      if (!input.value.trim()) {
        errorElement.style.display = 'block';
        input.style.borderColor = 'red';
        isValid = false;
      } else {
        errorElement.style.display = 'none';
        input.style.borderColor = '';
      }
    };

    showError(company, erorCompany);
    showError(role, erorJobRole);
    showError(date, erorDate);
    if (!jobType.value) {
      erorJobType.style.display = 'block';
      jobType.style.borderColor = 'red';
      isValid = false;
    } else {
      erorJobType.style.display = 'none';
      jobType.style.borderColor = '';
    }
    //if not remote then only check location error
    if (jobType.value !== 'Remote') {
      showError(location, erorLocation);
    }

    if (!status.value) {
      erorJobStatus.style.display = 'block';
      status.style.borderColor = 'red';
      isValid = false;
    } else {
      erorJobStatus.style.display = 'none';
      status.style.borderColor = '';
    }

    if (!isValid) return;

    // Prepare form
    const formData = {
      Id: isEdit ? state.form.Id : null,
      company: company.value.trim(),
      role: role.value.trim(),
      jobType: jobType.value,
      location: jobType.value === 'Remote' ? '' : location.value.trim(),
      date: date.value,
      status: status.value,
      notes: notes.value.trim(),
    };

    setState(formData);
    renderApp();
  });

  return form;
}
