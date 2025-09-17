import { loadDashboard } from './modules/dashboard.js';
import { loadNemovitosti } from './modules/nemovitosti.js';
import { loadPlatby } from './modules/platby.js';
import { loadPruvodce } from './modules/pruvodce.js';

const routes = {
  dashboard: loadDashboard,
  nemovitosti: loadNemovitosti,
  platby: loadPlatby,
  pruvodce: loadPruvodce,
};

function setActiveNav(module) {
  document.querySelectorAll('.sidebar-nav li').forEach(li => {
    li.classList.toggle('active', li.dataset.module === module);
  });
}

function loadModule(module) {
  setActiveNav(module);
  const loader = routes[module] || loadDashboard;
  loader(document.getElementById('main-content'));
  document.querySelector('.breadcrumbs').textContent =
    module.charAt(0).toUpperCase() + module.slice(1);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sidebar-nav li').forEach(li => {
    li.addEventListener('click', () => {
      loadModule(li.dataset.module);
    });
  });
  // Default load dashboard
  loadModule('dashboard');
});