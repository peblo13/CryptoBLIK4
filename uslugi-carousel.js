// Karuzela usług na mobile
let uslugiCarouselIndex = 0;
let startXUslugi = null;

// Wymuszamy obecność globalnej tablicy usług
if (!window.filteredUslugi) {
  window.filteredUslugi = [
    {
      nazwa: "Tworzenie profesjonalnych stron internetowych",
      lokalizacja: "Cała Polska / Online",
      opis: "Nowoczesne, szybkie strony i sklepy. SEO, responsywność, wsparcie. Oferta ekspercka!",
      osoba: "Freelancer Paweł Śliwiński",
      wyroznione: true
    },
    {
      nazwa: "Usługi budowlane",
      lokalizacja: "Warszawa i okolice",
      opis: "Remonty, wykończenia, elewacje, dachy. Szybko i solidnie.",
      osoba: "Jan Kowalski",
      wyroznione: false
    },
    {
      nazwa: "Korepetycje matematyka",
      lokalizacja: "Kraków / Online",
      opis: "Przygotowanie do matury, egzaminów, indywidualne podejście.",
      osoba: "Anna Nowak",
      wyroznione: false
    },
    {
      nazwa: "Tłumaczenia angielski-polski",
      lokalizacja: "Online",
      opis: "Tłumaczenia dokumentów, stron, korespondencji. Szybko i profesjonalnie.",
      osoba: "Michał Zieliński",
      wyroznione: false
    },
    {
      nazwa: "Hydraulik 24h",
      lokalizacja: "Poznań",
      opis: "Awaryjne naprawy, montaż, serwis. Dojazd gratis.",
      osoba: "Piotr Wiśniewski",
      wyroznione: false
    }
  ];
}

function renderUslugiCarousel() {
  const carousel = document.getElementById('uslugi-carousel');
  carousel.innerHTML = '';
  const usl = window.filteredUslugi?.[uslugiCarouselIndex] || null;
  if (!usl) return;
  const slide = document.createElement('div');
  slide.className = 'uslugi-card-carousel';
  slide.style.margin = '0 auto';
  slide.style.maxWidth = '98vw';
  slide.style.border = '2px solid #00ff00';
  slide.style.borderRadius = '14px';
  slide.style.padding = '18px 12px';
  slide.style.display = 'flex';
  slide.style.flexDirection = 'column';
  slide.style.alignItems = 'flex-start';
  slide.style.gap = '8px';
  slide.style.color = '#fff';
  if (usl.wyroznione) {
    // Premium: zielona łuna, animacja, komentarz, gwiazdka
    slide.style.background = 'rgba(32,32,0,0.88)';
    slide.style.boxShadow = '0 0 48px 0 #ffe600cc, 0 0 96px 0 #fff700cc, 0 0 128px 0 #ffe60099';
    slide.style.animation = 'premiumPulseGold 2.5s infinite alternate';
    slide.innerHTML = `
      <div style='display:flex;align-items:center;gap:8px;margin-bottom:6px;'>
        <span style="font-size:1.5em;color:#FFD700;">&#9733;&#9733;&#9733;</span>
        <span style="color:#FFD700;font-weight:bold;font-size:1.08em;">Ogłoszenie premium – wyróżnione!</span>
      </div>
      <h3 style=\"color:#FFD700;font-size:1.18rem;font-weight:bold;margin-bottom:4px;\">${usl.nazwa}</h3>
      <div style=\"color:#fff700;font-size:1.01rem;\"><span style=\"color:#FFD700;font-size:1.1em;vertical-align:middle;margin-right:6px;\">📍</span>${usl.lokalizacja}</div>
      <div style=\"font-size:0.98rem;color:#fff;\">${usl.opis}</div>
      <div style=\"font-size:0.97rem;color:#FFD700;margin-bottom:4px;\">${usl.osoba}</div>
      <a href='#' class='apply-button' onclick=\"document.getElementById('service-contact-modal').style.display='flex'\" style=\"margin-top:8px;background:linear-gradient(90deg,#FFD700 60%,#fff700 100%);color:#111;border:none;border-radius:8px;font-weight:bold;font-size:1.01rem;padding:8px 18px;text-decoration:none;align-self:flex-end;transition:background 0.2s;\">Skontaktuj się</a>
    `;
  } else {
    slide.style.background = 'rgba(0,0,0,0.7)';
    slide.style.boxShadow = '0 2px 18px #00ff0033';
    slide.innerHTML = `<h3 style=\"color:#00ff00;font-size:1.15rem;font-weight:bold;margin-bottom:4px;\">${usl.nazwa}</h3><div style=\"color:#00fff7;font-size:1.01rem;\"><span style=\"color:#00ff00;font-size:1.1em;vertical-align:middle;margin-right:6px;\">📍</span>${usl.lokalizacja}</div><div style=\"font-size:0.98rem;color:#fff;\">${usl.opis}</div><div style=\"font-size:0.97rem;color:#00ff00;margin-bottom:4px;\">${usl.osoba}</div><a href='#' class='apply-button' onclick=\"document.getElementById('service-contact-modal').style.display='flex'\" style=\"margin-top:8px;background:linear-gradient(90deg,#00ff00 60%,#00fff7 100%);color:#111;border:none;border-radius:8px;font-weight:bold;font-size:1.01rem;padding:8px 18px;text-decoration:none;align-self:flex-end;transition:background 0.2s;\">Skontaktuj się</a>`;
  }
  // Dodaj animację premiumPulse do dokumentu jeśli nie istnieje
  if (!document.getElementById('premiumPulseGoldStyle')) {
    const style = document.createElement('style');
    style.id = 'premiumPulseGoldStyle';
    style.innerHTML = `@keyframes premiumPulseGold {0%{box-shadow:0 0 48px 0 #ffe600cc,0 0 96px 0 #fff700cc,0 0 128px 0 #ffe60099;}100%{box-shadow:0 0 64px 0 #ffe600ee,0 0 128px 0 #fff700ee,0 0 192px 0 #ffe600bb;}}`;
    document.head.appendChild(style);
  }
  carousel.appendChild(slide);
  // Pigmentacja kropek jak w ofertach pracy (stałe kolory)
  const dots = document.getElementById('uslugi-carousel-dots');
  dots.innerHTML = '';
  // Kolory dla kropek (możesz dodać więcej, jeśli jest więcej usług)
  const colors = [
    '#00ff00', // zielony
    '#00cfff', // niebieski
    '#ff2222', // czerwony
    '#ffea00', // żółty
    '#a020f0', // fioletowy
    '#ff8800', // pomarańczowy
    '#00fff7', // morski
    '#ff00aa'  // różowy
  ];
  for(let i=0;i<window.filteredUslugi.length;i++){
    const dot = document.createElement('span');
    dot.style.width = i === uslugiCarouselIndex ? '22px' : '16px';
    dot.style.height = i === uslugiCarouselIndex ? '22px' : '16px';
    dot.style.borderRadius = '50%';
    dot.style.cursor = 'pointer';
    dot.style.transition = 'background 0.3s, transform 0.2s';
    dot.style.background = colors[i % colors.length];
    dot.style.opacity = i === uslugiCarouselIndex ? '1' : '0.6';
    dot.style.boxShadow = i === uslugiCarouselIndex ? '0 0 12px 2px ' + colors[i % colors.length] : 'none';
    dot.onclick = () => { uslugiCarouselIndex = i; renderUslugiCarousel(); };
    dots.appendChild(dot);
  }
}
function showPrevUsluga(){
  uslugiCarouselIndex=(uslugiCarouselIndex-1+window.filteredUslugi.length)%window.filteredUslugi.length;renderUslugiCarousel();
}
function showNextUsluga(){
  uslugiCarouselIndex=(uslugiCarouselIndex+1)%window.filteredUslugi.length;renderUslugiCarousel();
}
function handleUslugiView(){
  // Karuzela zawsze widoczna, siatka usług usunięta
  document.getElementById('uslugi-carousel-wrapper').style.display='block';
  renderUslugiCarousel();
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('uslugi-carousel-prev').onclick=showPrevUsluga;
  document.getElementById('uslugi-carousel-next').onclick=showNextUsluga;
  document.getElementById('uslugi-carousel').addEventListener('touchstart',e=>{startXUslugi=e.touches[0].clientX;});
  document.getElementById('uslugi-carousel').addEventListener('touchend',e=>{
    if(startXUslugi!==null){
      let dx=e.changedTouches[0].clientX-startXUslugi;
      if(dx>40)showPrevUsluga();
      else if(dx<-40)showNextUsluga();
      startXUslugi=null;
    }
  });
  handleUslugiView();
});
window.addEventListener('resize',handleUslugiView);
