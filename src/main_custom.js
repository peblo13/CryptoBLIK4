function openApplicationForm(jobTitle) {
  console.log('=== OTWIERANIE FORMULARZA APLIKACJI ===');
  console.log('Tytuł pracy:', jobTitle);
  const formOverlay = document.getElementById('application-form');
  const jobTitleSpan = document.getElementById('job-title-form');
  console.log('Element formOverlay:', formOverlay);
  console.log('Element jobTitleSpan:', jobTitleSpan);
  if (formOverlay && jobTitleSpan) {
    console.log('Ustawiam tytuł pracy w formularzu...');
    formOverlay.style.display = 'flex';
    formOverlay.style.visibility = 'visible';
    formOverlay.style.opacity = '1';
    formOverlay.style.pointerEvents = 'auto';
    formOverlay.style.zIndex = '999999';
    console.log('Dodaję klasę form-open do body...');
    document.body.classList.add('form-open');
    console.log('✅ Formularz aplikacji otwarty pomyślnie');
    console.log('Aktualny display formularza:', formOverlay.style.display);
    console.log('Klasy na body:', document.body.className);
  } else {
    console.error('❌ Nie znaleziono elementów formularza aplikacji');
    console.error('formOverlay:', formOverlay);
    console.error('jobTitleSpan:', jobTitleSpan);
  }
  jobTitleSpan.textContent = jobTitle;
  formOverlay.style.display = 'flex';
  formOverlay.style.visibility = 'visible';
  formOverlay.style.opacity = '1';
  formOverlay.style.pointerEvents = 'auto';
  formOverlay.style.zIndex = '999999';
  document.body.classList.add('form-open');
}
}
// FAQ toggle & animacja wejścia
function setupFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', function() {
      const answer = q.nextElementSibling;
      if (!answer || !answer.classList.contains('faq-answer')) return;
      document.querySelectorAll('.faq-answer.faq-animated').forEach(a => {
        if (a !== answer) a.classList.remove('faq-animated');
      });
      document.querySelectorAll('.faq-question.faq-open').forEach(qq => {
        if (qq !== q) qq.classList.remove('faq-open');
      });
      answer.classList.toggle('faq-animated');
      q.classList.toggle('faq-open');
    });
  });
  const faqItems = document.querySelectorAll('.faq-item');
  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-animated');
        const q = entry.target.querySelector('.faq-question');
        if(q) q.classList.add('faqq-animated');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  faqItems.forEach(item => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', setupFAQ);

function openJobForm() {
  var form = document.getElementById('job-offer-form');
  if(form) form.style.display = 'block';
  window.scrollTo({ top: form.offsetTop - 40, behavior: 'smooth' });
}
function closeJobForm() {
  var form = document.getElementById('job-offer-form');
  if(form) form.style.display = 'none';
}

function closeApplicationForm() {
  console.log('=== ZAMYKANIE FORMULARZA APLIKACJI ===');
  const formOverlay = document.getElementById('application-form');
  console.log('Element formularza:', formOverlay);
  if (formOverlay) {
    console.log('Ukrywam formularz...');
    formOverlay.style.display = 'none';
    formOverlay.style.visibility = 'hidden';
    formOverlay.style.opacity = '0';
    formOverlay.setAttribute('style', 'display: none !important; visibility: hidden !important; opacity: 0 !important;');
    console.log('Usuwam klasę form-open z body...');
    document.body.classList.remove('form-open');
    const form = document.getElementById('job-application-form');
    if (form) {
      console.log('Resetuję formularz...');
      form.reset();
    }
    console.log('✅ Formularz aplikacji zamknięty pomyślnie');
    console.log('Display po zamknięciu:', formOverlay.style.display);
  } else {
    console.error('❌ Nie znaleziono elementu formularza do zamknięcia');
  }
  formOverlay.style.display = 'none';
  formOverlay.style.visibility = 'hidden';
  formOverlay.style.opacity = '0';
  formOverlay.setAttribute('style', 'display: none !important; visibility: hidden !important; opacity: 0 !important;');
  document.body.classList.remove('form-open');
  const form = document.getElementById('job-application-form');
  if (form) form.reset();
}
}

// Funkcja do pobierania i zliczania ofert pracy po mieście z pliku CSV
async function getCityOfferCounts(csvPath) {
  const response = await fetch(csvPath);
  const text = await response.text();
  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
  console.log('[CSV] Liczba wczytanych linii:', lines.length);
  if (lines.length < 2) return {};
  const cityCounts = {};
  const batchSize = 2000;
  let i = 1;
  async function processBatch() {
    const end = Math.min(i + batchSize, lines.length);
    for (; i < end; i++) {
      const cols = lines[i].split(';');
      if (cols.length < 2) continue;
      let city = cols[1].replace(/"/g, '').split(',')[0].trim();
      if (!city) continue;
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    }
    if (i < lines.length) {
      await new Promise(resolve => setTimeout(resolve, 0));
      return processBatch();
    }
  }
  await processBatch();
  console.log('[CSV] Zliczone miasta:', Object.keys(cityCounts).length);
  console.log('[CSV] Przykładowe wyniki:', Object.entries(cityCounts).slice(0, 10));
  return cityCounts;
}

// Automatyczne generowanie rankingu miast po załadowaniu strony
document.addEventListener('DOMContentLoaded', function() {
  // Ranking miast
  getCityOfferCounts('src/praca_baza.csv').then(cityCounts => {
    const sorted = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]);
    const top20 = sorted.slice(0, 20);
    const rankingList = document.getElementById('ranking-list');
    if (rankingList) {
      rankingList.innerHTML = '';
      top20.forEach(([city, count], idx) => {
        const li = document.createElement('li');
        li.textContent = `${idx + 1}. ${city} (${count})`;
        if (idx === 0) {
  fetch('praca_baza.csv')
    .then(res => {
      if (!res.ok) throw new Error('Nie można pobrać pliku CSV: ' + res.status);
      return res.text();
    })
    .then(text => {
      const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
      console.log('[Oferty] Liczba wczytanych linii:', lines.length);
      if (lines.length < 2) {
        console.warn('Brak ofert pracy w pliku CSV!');
        return;
      }
      const headers = lines[0].split(';');
      const offers = lines.slice(1).map(line => {
        const cols = line.split(';');
        return {
          stanowisko: cols[0] || '',
          miasto: cols[1] || '',
          firma: cols[2] || '',
          wynagrodzenie: cols[3] || '',
          typ: cols[4] || '',
          opis: cols[5] || ''
        };
      });
      let currentPage = 1;
      const offersPerPage = 8;
      const jobListings = document.getElementById('job-listings');
      const paginationBar = document.getElementById('pagination-bar');

      jobListings.style.display = 'flex';
      jobListings.style.flexDirection = 'column';
      jobListings.style.gap = '28px';
      jobListings.style.width = '100%';

      function renderOffers(page) {
        jobListings.innerHTML = '';
        const start = (page - 1) * offersPerPage;
        const end = start + offersPerPage;
        const pageOffers = offers.slice(start, end);
        pageOffers.forEach(offer => {
          const div = document.createElement('div');
          div.className = 'job-offer-card-ue';
          div.style.margin = '0';
          div.style.padding = '18px 22px';
          div.style.background = '#222';
          div.style.borderRadius = '12px';
          div.style.boxShadow = '0 2px 12px #00ff00aa';
          div.innerHTML = `
            <h3 style=\"color:#00ff00; margin-bottom:6px;\">${offer.stanowisko}</h3>
            <div style=\"font-size:1.1rem; color:#fff; margin-bottom:4px;\">${offer.firma} &bull; ${offer.miasto}</div>
            <div style=\"color:#00cfff; font-weight:bold; margin-bottom:4px;\">${offer.wynagrodzenie}</div>
            <div style=\"color:#fff; margin-bottom:4px;\">${offer.typ}</div>
            <div style=\"color:#ccc; font-size:0.98rem;\">${offer.opis}</div>
          `;
          jobListings.appendChild(div);
        });
        // Aktualizuj licznik widocznych ofert
        const counter = document.getElementById('job-offers-count');
        if (counter) counter.textContent = pageOffers.length;
      }

      function renderPagination() {
        paginationBar.innerHTML = '';
        const totalPages = Math.ceil(offers.length / offersPerPage);
        for (let i = 1; i <= totalPages; i++) {
          const btn = document.createElement('button');
          btn.textContent = i;
          btn.style.margin = '0 4px';
          btn.style.padding = '6px 14px';
          btn.style.borderRadius = '6px';
          btn.style.border = '1.5px solid #00ff00';
          btn.style.background = i === currentPage ? '#00ff00' : '#222';
          btn.style.color = i === currentPage ? '#222' : '#00ff00';
          btn.style.fontWeight = i === currentPage ? 'bold' : 'normal';
          btn.onclick = () => {
            currentPage = i;
            renderOffers(currentPage);
            renderPagination();
            window.scrollTo({ top: jobListings.offsetTop - 40, behavior: 'smooth' });
          };
          paginationBar.appendChild(btn);
        }
      }

      renderOffers(currentPage);
      renderPagination();
    })
    .catch(err => {
      console.error('Błąd ładowania ofert pracy:', err);
    });
          btn.onclick = () => {
            currentPage = i;
            renderOffers(currentPage);
            renderPagination();
            window.scrollTo({ top: jobListings.offsetTop - 40, behavior: 'smooth' });
          };
          paginationBar.appendChild(btn);
        }
      }

      renderOffers(currentPage);
      renderPagination();
    });
});

// Przykład użycia:
// getCityOfferCounts('src/praca_baza.csv').then(counts => console.log(counts));
// Wynik: { Radom: 25, Kraków: 10, ... }
// Możesz wykorzystać obiekt cityCounts do generowania rankingu miast na stronie.
