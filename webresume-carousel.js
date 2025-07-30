// webresume-carousel.js
// Karuzela WebResume - automatyczna zmiana co 2s

document.addEventListener('DOMContentLoaded', function() {
  const features = [
    {
      tytul: 'Responsywny Design',
      opis: 'Twoje CV będzie wyglądać doskonale na każdym urządzeniu - od smartfona po monitor komputera. Nowoczesny, czysty design przyciąga uwagę rekruterów.',
      ikona: '💻'
    },
    {
      tytul: 'Interaktywne Elementy',
      opis: 'Dodaj animacje, efekty hover, płynne przejścia i interaktywne sekcje. Twoje CV będzie żywe i angażujące, co zwiększy zainteresowanie pracodawców.',
      ikona: '🚀'
    },
    {
      tytul: 'Portfolio Projektów',
      opis: 'Pokaż swoje projekty w atrakcyjny sposób z galeriami, opisami i linkami. Idealny format dla programistów, designerów i specjalistów IT.',
      ikona: '📊'
    },
    {
      tytul: 'Łatwe Udostępnianie',
      opis: 'Jeden link do Twojego WebResume można udostępnić wszędzie - w emailu, na LinkedIn, na wizytówce. Nie musisz wysyłać plików PDF.',
      ikona: '🔗'
    },
    {
      tytul: 'Analityka i Statystyki',
      opis: 'Śledź, kto odwiedza Twoje CV online, skąd pochodzą odwiedzający i które sekcje są najbardziej popularne.',
      ikona: '📈'
    },
    {
      tytul: 'Łatwa Aktualizacja',
      opis: 'Zmieniaj treść swojego CV w czasie rzeczywistym. Nie musisz ponownie wysyłać dokumentów - zmiany są widoczne od razu.',
      ikona: '🔄'
    }
  ];
  let webresumeIndex = 0;
  let webresumeInterval = null;

  function renderWebresumeCarousel() {
    const carousel = document.getElementById('webresume-carousel');
    if (!carousel) return;
    carousel.innerHTML = '';
    const feature = features[webresumeIndex];
    const div = document.createElement('div');
    div.className = 'webresume-card';
    div.style = 'background:rgba(0,0,0,0.7);border:2px solid #00ff00;border-radius:14px;box-shadow:0 2px 18px #00ff0033;min-width:220px;max-width:420px;padding:28px 18px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;color:#fff;';
    div.innerHTML = `<div style='font-size:2.5rem;margin-bottom:10px;'>${feature.ikona}</div><h3 style='color:#00ff00;font-size:1.35rem;font-weight:bold;margin-bottom:8px;text-align:center;'>${feature.tytul}</h3><div style='font-size:1.08rem;text-align:center;'>${feature.opis}</div>`;
    carousel.appendChild(div);
    // Kropki
    const dots = document.getElementById('webresume-carousel-dots');
    if (!dots) return;
    dots.innerHTML = '';
    for(let i=0;i<features.length;i++){
      const dot = document.createElement('span');
      dot.style.width='16px';dot.style.height='16px';dot.style.borderRadius='50%';dot.style.background=i===webresumeIndex?'#00ff00':'#333';dot.style.cursor='pointer';dot.style.transition='background 0.2s, transform 0.2s';
      dot.onclick=()=>{webresumeIndex=i;renderWebresumeCarousel();resetWebresumeInterval();};
      dots.appendChild(dot);
    }
  }
  function showPrevWebresume(){
    webresumeIndex=(webresumeIndex-1+features.length)%features.length;renderWebresumeCarousel();resetWebresumeInterval();
  }
  function showNextWebresume(){
    webresumeIndex=(webresumeIndex+1)%features.length;renderWebresumeCarousel();resetWebresumeInterval();
  }
  function setWebresumeInterval(){
    clearWebresumeInterval();
    webresumeInterval = setInterval(()=>{
      showNextWebresume();
    }, 2000);
  }
  function clearWebresumeInterval(){
    if(webresumeInterval){
      clearInterval(webresumeInterval);
      webresumeInterval = null;
    }
  }
  function resetWebresumeInterval(){
    setWebresumeInterval();
  }
  function handleWebresumeView(){
    if(window.innerWidth>700){
      document.getElementById('webresume-grid').style.display='grid';
      document.getElementById('webresume-carousel-wrapper').style.display='none';
      clearWebresumeInterval();
    }else{
      document.getElementById('webresume-grid').style.display='none';
      document.getElementById('webresume-carousel-wrapper').style.display='block';
      renderWebresumeCarousel();
      setWebresumeInterval();
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const prevBtn = document.getElementById('webresume-carousel-prev');
    const nextBtn = document.getElementById('webresume-carousel-next');
    if(prevBtn) prevBtn.onclick=showPrevWebresume;
    if(nextBtn) nextBtn.onclick=showNextWebresume;
    handleWebresumeView();
  });
  window.addEventListener('resize',handleWebresumeView);
});
