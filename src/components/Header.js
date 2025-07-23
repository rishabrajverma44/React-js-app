import { getState } from '../app.state';

export function Header() {
  const Header = document.createElement('div');
  Header.className = 'counter';
  //get current state
  const state = JSON.parse(getState());
  //take all states of header :
  const total = state.items.length;
  const applied = state.items.filter((item) => item.status === 'Applied').length;
  const interviewing = state.items.filter((item) => item.status === 'Interviewing').length;
  const hired = state.items.filter((item) => item.status === 'Hired').length;
  const rejected = state.items.filter((item) => item.status === 'Rejected').length;

  Header.innerHTML = `<div class="header"><h4>Job Application Tracker</h4>
                         <p><span>Job Application : ${total}</span> <span>Applied : ${applied}</span> <span>Interviewing : ${interviewing}</span> <span>Hired : ${hired}</span> <span>Rejected : ${rejected}</span></p>
                       </div>`;

  return Header;
}
