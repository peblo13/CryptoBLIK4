// Przykładowe oferty pracy (możesz podmienić na dynamiczne ładowanie)

// Przykładowe usługi (możesz podmienić na dynamiczne ładowanie)
const services = [
  { name: "Usługa 1", description: "Opis usługi 1" },
  { name: "Usługa 2", description: "Opis usługi 2" },
  { name: "Usługa 3", description: "Opis usługi 3" },
  { name: "Usługa 4", description: "Opis usługi 4" },
  { name: "Usługa 5", description: "Opis usługi 5" },
  { name: "Usługa 6", description: "Opis usługi 6" },
  { name: "Usługa 7", description: "Opis usługi 7" },
  { name: "Usługa 8", description: "Opis usługi 8" },
  { name: "Usługa 9", description: "Opis usługi 9" },
  { name: "Usługa 10", description: "Opis usługi 10" },
  { name: "Usługa 11", description: "Opis usługi 11" },
  { name: "Usługa 12", description: "Opis usługi 12" },
  { name: "Usługa 13", description: "Opis usługi 13" },
  { name: "Usługa 14", description: "Opis usługi 14" },
  { name: "Usługa 15", description: "Opis usługi 15" },
  { name: "Usługa 16", description: "Opis usługi 16" },
  { name: "Usługa 17", description: "Opis usługi 17" },
  { name: "Usługa 18", description: "Opis usługi 18" },
  { name: "Usługa 19", description: "Opis usługi 19" },
  { name: "Usługa 20", description: "Opis usługi 20" }
];

function getServicesPerPage() {
  return window.innerWidth <= 600 ? 8 : 16;
}

let currentPage = 1;
let filteredServices = services;

function renderServices(page = 1) {
  const perPage = getServicesPerPage();
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageServices = filteredServices.slice(start, end);
  const list = document.getElementById('uslugi-list');
  list.innerHTML = pageServices.map(serviceToHTML).join('');
  renderPagination(page);
}

function renderPagination(page) {
  const perPage = getServicesPerPage();
  const totalPages = Math.ceil(filteredServices.length / perPage);
  const bar = document.getElementById('uslugi-pagination-bar');
  if (totalPages <= 1) {
    bar.innerHTML = '';
    return;
  }
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="service-page-btn${i === page ? ' active' : ''}" data-page="${i}">${i}</button>`;
  }
  bar.innerHTML = html;
  Array.from(bar.querySelectorAll('button')).forEach(btn => {
    btn.onclick = () => changePage(parseInt(btn.dataset.page));
  });
}

function changePage(page) {
  currentPage = page;
  renderServices(page);
  window.scrollTo({ top: document.getElementById('uslugi-list').offsetTop - 20, behavior: 'smooth' });
}

function serviceToHTML(service) {
  return `<div class="service-card"><h3>${service.name}</h3><p>${service.description}</p></div>`;
}

function handleResize() {
  renderServices(currentPage);
}

window.addEventListener('resize', handleResize);

// Optional: implement search
const searchInput = document.getElementById('service-search-input');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    const val = this.value.trim().toLowerCase();
    filteredServices = val ? services.filter(s => (s.name || '').toLowerCase().includes(val)) : services;
    currentPage = 1;
    renderServices(currentPage);
  });
}

// Initial render
renderServices(currentPage);

window.addEventListener("resize", handleResize);
window.addEventListener("DOMContentLoaded", () => {
  changePage(1);
});
