// Dynamiczne ładowanie i wyświetlanie ofert pracy z pliku praca_baza.csv
// Wymaga Papaparse (cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js)

const OFFERS_PER_PAGE = 3;
let allOffers = [];
let filteredOffers = [];
let currentPage = 1;
let totalPages = 1;

function renderOffersPage(page) {
  console.log('renderOffersPage', {page, filteredOffers});
  const start = (page - 1) * OFFERS_PER_PAGE;
  const end = start + OFFERS_PER_PAGE;
  const offers = filteredOffers.slice(start, end);
  const grid = document.createElement('div');
  grid.className = 'job-offer-grid';
  offers.forEach((offer, idx) => {
    console.log('Oferta', idx, offer);
    const stanowisko = (offer['Stanowisko'] || '').replace(/"/g, '').trim();
    const miejsce = (offer['Miejsce pracy'] || '').replace(/"/g, '').trim();
    const umowa = (offer['Rodzaj umowy'] || '').replace(/"/g, '').trim();
    const pracodawca = (offer['Pracodawca'] || '').replace(/"/g, '').trim();
    const card = document.createElement('div');
    card.className = 'job-offer-card-ue';
    // Stylowanie tylko przez CSS
    const title = document.createElement('div');
    title.className = 'job-title-red-bold';
    title.textContent = stanowisko;
    card.appendChild(title);
    const loc = document.createElement('div');
    loc.className = 'job-location-ue';
    loc.innerHTML = `<span style="color:#00ff00;font-size:1.15em;vertical-align:middle;margin-right:6px;">📍</span>${miejsce}`;
    card.appendChild(loc);
    const btnRow = document.createElement('div');
    btnRow.className = 'apply-btn-row';
    const btn = document.createElement('button');
    btn.className = 'apply-btn-red-ue';
    btn.textContent = 'Aplikuj';
    btn.onclick = function(e) {
      e.stopPropagation();
      document.getElementById('job-contact-modal')?.style.display = 'flex';
    };
    btnRow.appendChild(btn);
    card.appendChild(btnRow);
    const details = document.createElement('div');
    details.className = 'job-offer-details-hidden';
    const desc = document.createElement('div');
    desc.className = 'job-desc-ue';
    desc.textContent = (umowa ? umowa + ' | ' : '') + pracodawca;
    details.appendChild(desc);
    card.appendChild(details);
    grid.appendChild(card);
  });
  const listings = document.getElementById('job-offers-list');
  if (listings) {
    listings.innerHTML = '';
    listings.appendChild(grid);
  }
  const counter = document.getElementById('job-offers-count');
  if (counter) counter.textContent = filteredOffers.length;
  renderPaginationBar();
}

function renderPaginationBar() {
  let bar = document.getElementById('pagination-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'pagination-bar';
    bar.style = 'display:flex;justify-content:center;gap:6px;margin:18px 0;flex-wrap:wrap;';
    const offersList = document.getElementById('job-offers-list');
    if (offersList) offersList.parentNode.insertBefore(bar, offersList.nextSibling);
  }
  bar.innerHTML = '';
  totalPages = Math.max(1, Math.ceil(filteredOffers.length / OFFERS_PER_PAGE));
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '←';
  prevBtn.className = 'pagination-btn';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = function() {
    if (currentPage > 1) {
      currentPage--;
      renderOffersPage(currentPage);
    }
  };
  bar.appendChild(prevBtn);
  let maxPagesToShow = 7;
  let startPage = Math.max(1, currentPage - 3);
  let endPage = Math.min(totalPages, currentPage + 3);
  if (totalPages > maxPagesToShow) {
    if (currentPage <= 4) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage >= totalPages - 3) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - 3;
      endPage = currentPage + 3;
    }
  } else {
    startPage = 1;
    endPage = totalPages;
  }
  if (startPage > 1) {
    const firstBtn = document.createElement('button');
    firstBtn.textContent = '1';
    firstBtn.className = 'pagination-btn';
    firstBtn.onclick = function() {
      currentPage = 1;
      renderOffersPage(currentPage);
    };
    bar.appendChild(firstBtn);
    if (startPage > 2) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      dots.style = 'color:#00ff00;font-weight:bold;padding:0 6px;';
      bar.appendChild(dots);
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
    btn.disabled = i === currentPage;
    btn.onclick = function() {
      currentPage = i;
      renderOffersPage(currentPage);
    };
    bar.appendChild(btn);
  }
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      dots.style = 'color:#00ff00;font-weight:bold;padding:0 6px;';
      bar.appendChild(dots);
    }
    const lastBtn = document.createElement('button');
    lastBtn.textContent = totalPages;
    lastBtn.className = 'pagination-btn';
    lastBtn.onclick = function() {
      currentPage = totalPages;
      renderOffersPage(currentPage);
    };
    bar.appendChild(lastBtn);
  }
  const nextBtn = document.createElement('button');
  nextBtn.textContent = '→';
  nextBtn.className = 'pagination-btn';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = function() {
    if (currentPage < totalPages) {
      currentPage++;
      renderOffersPage(currentPage);
    }
  };
  bar.appendChild(nextBtn);
}

function normalize(str) {
  return (str||'').toLowerCase()
    .replace(/ą/g,'a').replace(/ć/g,'c').replace(/ę/g,'e').replace(/ł/g,'l')
    .replace(/ń/g,'n').replace(/ó/g,'o').replace(/ś/g,'s').replace(/ż/g,'z').replace(/ź/g,'z');
}

function filterOffers() {
  const q = normalize((document.getElementById('job-search-input')?.value || '').trim());
  filteredOffers = allOffers.filter(offer => {
    if (!offer['Stanowisko'] || !offer['Miejsce pracy']) return false;
    const stanowisko = normalize((offer['Stanowisko']||'').trim());
    const pracodawca = normalize((offer['Pracodawca']||'').trim());
    const miejsce = normalize((offer['Miejsce pracy']||'').trim());
    const opis = normalize((offer['Opis']||'').trim());
    return (
      stanowisko.includes(q) ||
      pracodawca.includes(q) ||
      miejsce.includes(q) ||
      opis.includes(q)
    );
  });
}

document.getElementById('job-search-btn')?.addEventListener('click', function() {
  filterOffers();
  currentPage = 1;
  renderOffersPage(currentPage);
});
document.getElementById('job-search-input')?.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    filterOffers();
    currentPage = 1;
    renderOffersPage(currentPage);
  }
});
document.getElementById('advanced-job-search-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const loc = document.getElementById('adv-job-location')?.value.toLowerCase() || '';
  const type = document.getElementById('adv-job-type')?.value.toLowerCase() || '';
  const exp = document.getElementById('adv-job-experience')?.value.toLowerCase() || '';
  const salary = parseInt(document.getElementById('adv-job-salary')?.value, 10) || 0;
  const cats = Array.from(document.querySelectorAll('input[name="category[]"]:checked')).map(cb => cb.value.toLowerCase());
  filteredOffers = allOffers.filter(offer => {
    let ok = true;
    if (loc && !(offer['Miejsce pracy']||'').toLowerCase().includes(loc)) ok = false;
    if (type && !(offer['Rodzaj umowy']||'').toLowerCase().includes(type)) ok = false;
    if (exp && !(offer['Doświadczenie']||'').toLowerCase().includes(exp)) ok = false;
    if (salary && parseInt(offer['Wynagrodzenie']||'0',10) < salary) ok = false;
    if (cats.length > 0 && !cats.some(cat => (offer['Kategoria']||'').toLowerCase().includes(cat))) ok = false;
    return ok;
  });
  currentPage = 1;
  renderOffersPage(currentPage);
});

// Ładowanie ofert pracy po załadowaniu DOM i biblioteki PapaParse
document.addEventListener('DOMContentLoaded', function() {
  if (window.Papa) {
    Papa.parse('src/praca_baza.csv', {
      download: true,
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      complete: function(results) {
        console.log('Wynik PapaParse:', results);
        allOffers = results.data;
        filteredOffers = allOffers.slice();
        totalPages = Math.max(1, Math.ceil(filteredOffers.length / OFFERS_PER_PAGE));
        currentPage = 1;
        renderOffersPage(currentPage);
      },
      error: function(err) {
        alert('Błąd ładowania pliku ofert pracy: ' + err);
      }
    });
  }
});
