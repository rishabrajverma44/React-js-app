import { saveToStorage } from './app.storage';
import { generateId } from './Utils/id';

export const state = {
  items: [],
  form: {
    Id: null,
    company: '',
    role: '',
    jobType: '',
    location: '',
    date: '',
    status: '',
    notes: '',
  },
};

export function getState() {
  return JSON.stringify(state);
}

export function setFormEdit(editId = null) {
  if (editId !== null) {
    const formState = state.items.find((item) => item.Id === editId);
    if (formState) {
      state.form = formState;
    }
  }
}

export function setState(form) {
  if (form.Id == null || form.Id == undefined) {
    //for adding new state
    const id = generateId();
    const newForm = { ...form, Id: id };
    state.items.push(newForm);
  } else if (form.Id !== null && form.Id !== undefined) {
    //for update state
    const index = state.items.findIndex((item) => item.Id === form.Id);
    if (index !== -1) {
      state.items[index] = { ...form };
    }
  }
  //reset
  state.form = {};
  saveToStorage();
}

export function deleteForm(id) {
  state.items = state.items.filter((item) => item.Id !== id);
  saveToStorage(state.items);
}
