// Karuzela CV Tips: Do & Don't, automatyczna zmiana co 2,5 s
// Karuzela DO/DON'T w sekcji CV Tips na mobile
// Karuzela DO/DON'T w sekcji CV Tips na mobile
const cvTipsSlides = [
  { typ: 'do', tytul: 'DO', tekst: `<ul style="color:#ffffff;margin:0;padding-left:1.5rem;"><li>Dostosowuj CV do każdej oferty pracy</li><li>Używaj słów kluczowych z ogłoszenia</li><li>Sprawdzaj pisownię i gramatykę</li><li>Używaj czytelnej czcionki (Arial, Calibri)</li><li>Zapisuj w formacie PDF</li><li>Kwantyfikuj swoje osiągnięcia</li><li>Używaj aktywnych czasowników</li><li>Zachowaj spójny format</li><li>Dodaj profesjonalny adres e-mail</li><li>Aktualizuj CV regularnie</li></ul>` },
  { typ: 'dont', tytul: "DON'T", tekst: `<ul style="color:#ffffff;margin:0;padding-left:1.5rem;"><li>Nie dodawaj zdjęcia (w Polsce)</li><li>Nie podawaj wieku, stanu cywilnego</li><li>Nie używaj kolorowych czcionek</li><li>Nie przekraczaj 2 stron</li><li>Nie kłam ani nie przesadzaj</li><li>Nie używaj żargonu branżowego</li><li>Nie dodawaj referencji bez pytania</li><li>Nie używaj pierwszej osoby ("ja", "mój")</li><li>Nie dodawaj nieistotnych informacji</li><li>Nie wysyłaj tego samego CV wszędzie</li></ul>` }
];
let cvTipsCarouselIndex = 0;
let cvTipsAutoInterval = null;
function renderCvTipsCarousel() {
  const carousel = document.getElementById('cv-tips-carousel');
  if (!carousel) return;
  carousel.innerHTML = '';
  const slide = cvTipsSlides[cvTipsCarouselIndex];
  const div = document.createElement('div');
  div.className = 'cv-tips-card ' + (slide.typ === 'do' ? 'do-card' : 'dont-card');
  div.style = 'background:rgba(0,0,0,0.7);border:2px solid ' + (slide.typ === 'do' ? '#00ff00' : '#ff2222') + ';border-radius:14px;box-shadow:0 2px 18px ' + (slide.typ === 'do' ? '#00ff0033' : '#ff222233') + ';min-width:220px;max-width:320px;padding:18px 12px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;color:#fff;';
  div.innerHTML = `<h3 style="color:${slide.typ === 'do' ? '#00ff00' : '#ff2222'};font-size:1.15rem;font-weight:bold;margin-bottom:4px;">${slide.tytul}</h3>${slide.tekst}`;
  carousel.appendChild(div);
  // Kropki
  const dots = document.getElementById('cv-tips-carousel-dots');
  if (!dots) return;
  dots.innerHTML = '';
  for(let i=0;i<cvTipsSlides.length;i++){
    const dot = document.createElement('span');
    dot.style.width='16px';dot.style.height='16px';dot.style.borderRadius='50%';dot.style.background=i===cvTipsCarouselIndex?(cvTipsSlides[i].typ==='do'?'#00ff00':'#ff2222'):'#333';dot.style.cursor='pointer';dot.style.transition='background 0.2s, transform 0.2s';
    dot.onclick=()=>{cvTipsCarouselIndex=i;renderCvTipsCarousel();resetCvTipsAutoInterval();};
    dots.appendChild(dot);
  }
}
function showPrevCvTips(){
  cvTipsCarouselIndex=(cvTipsCarouselIndex-1+cvTipsSlides.length)%cvTipsSlides.length;renderCvTipsCarousel();resetCvTipsAutoInterval();
}
function showNextCvTips(){
  cvTipsCarouselIndex=(cvTipsCarouselIndex+1)%cvTipsSlides.length;renderCvTipsCarousel();resetCvTipsAutoInterval();
}
function handleCvTipsView(){
  if(window.innerWidth>700){
    document.getElementById('cv-tips-grid').style.display='grid';
    document.getElementById('cv-tips-carousel-wrapper').style.display='none';
    clearCvTipsAutoInterval();
  }else{
    document.getElementById('cv-tips-grid').style.display='none';
    document.getElementById('cv-tips-carousel-wrapper').style.display='block';
    renderCvTipsCarousel();
    setCvTipsAutoInterval();
  }
}
function setCvTipsAutoInterval(){
  clearCvTipsAutoInterval();
  cvTipsAutoInterval = setInterval(()=>{
    showNextCvTips();
  }, 2000);
}
function clearCvTipsAutoInterval(){
  if(cvTipsAutoInterval){
    clearInterval(cvTipsAutoInterval);
    cvTipsAutoInterval = null;
  }
}
function resetCvTipsAutoInterval(){
  if(window.innerWidth<=700){
    setCvTipsAutoInterval();
  }
}
document.addEventListener('DOMContentLoaded',()=>{
  const prevBtn = document.getElementById('cv-tips-carousel-prev');
  const nextBtn = document.getElementById('cv-tips-carousel-next');
  if(prevBtn) prevBtn.onclick=showPrevCvTips;
  if(nextBtn) nextBtn.onclick=showNextCvTips;
  handleCvTipsView();
});
window.addEventListener('resize',handleCvTipsView);
