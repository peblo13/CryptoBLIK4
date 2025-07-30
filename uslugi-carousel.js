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
  slide.style.background = 'rgba(0,0,0,0.7)';
  slide.style.border = '2px solid #00ff00';
  slide.style.borderRadius = '14px';
  slide.style.boxShadow = '0 2px 18px #00ff0033';
  slide.style.padding = '18px 12px';
  slide.style.display = 'flex';
  slide.style.flexDirection = 'column';
  slide.style.alignItems = 'flex-start';
  slide.style.gap = '8px';
  slide.style.color = '#fff';
  slide.innerHTML = `<h3 style=\"color:#00ff00;font-size:1.15rem;font-weight:bold;margin-bottom:4px;\">${usl.nazwa}</h3><div style=\"color:#00fff7;font-size:1.01rem;\"><span style=\"color:#00ff00;font-size:1.1em;vertical-align:middle;margin-right:6px;\">📍</span>${usl.lokalizacja}</div><div style=\"font-size:0.98rem;color:#fff;\">${usl.opis}</div><a href='#' class='apply-button' onclick=\"document.getElementById('service-contact-modal').style.display='flex'\" style=\"margin-top:8px;background:linear-gradient(90deg,#00ff00 60%,#00fff7 100%);color:#111;border:none;border-radius:8px;font-weight:bold;font-size:1.01rem;padding:8px 18px;text-decoration:none;align-self:flex-end;transition:background 0.2s;\">Skontaktuj się</a>`;
  carousel.appendChild(slide);
  // Kropki
  const dots = document.getElementById('uslugi-carousel-dots');
  dots.innerHTML = '';
  for(let i=0;i<window.filteredUslugi.length;i++){
    const dot = document.createElement('span');
    dot.style.width='16px';dot.style.height='16px';dot.style.borderRadius='50%';dot.style.background=i===uslugiCarouselIndex?'#00ff00':'#333';dot.style.cursor='pointer';dot.style.transition='background 0.2s, transform 0.2s';
    dot.onclick=()=>{uslugiCarouselIndex=i;renderUslugiCarousel();};
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
  if(window.innerWidth>700){
    document.getElementById('uslugi-list').style.display='grid';
    document.getElementById('uslugi-carousel-wrapper').style.display='none';
    if(window.renderUslugi) window.renderUslugi();
  }else{
    document.getElementById('uslugi-list').style.display='none';
    document.getElementById('uslugi-carousel-wrapper').style.display='block';
    renderUslugiCarousel();
  }
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
