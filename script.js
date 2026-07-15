// Language Switcher — English ↔ Telugu
(function () {
  const STORAGE_KEY = 'prd_lang';

  function applyLang(lang) {
    const t = translations[lang];
    if (!t) return;

    // Update all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // Update all [data-i18n-placeholder] elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // Sync all lang selectors on the page
    document.querySelectorAll('#lang-select').forEach(function (sel) {
      sel.value = lang;
    });

    // Persist choice
    localStorage.setItem(STORAGE_KEY, lang);

    // Set html lang attribute
    document.documentElement.lang = lang === 'te' ? 'te' : 'en';
  }

  function init() {
    // Restore saved language
    const saved = localStorage.getItem(STORAGE_KEY) || 'en';

    // Attach change listeners to all selectors
    document.querySelectorAll('#lang-select').forEach(function (sel) {
      sel.value = saved;
      sel.addEventListener('change', function () {
        applyLang(this.value);
      });
    });

    // Apply on load
    applyLang(saved);
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();




const videos = [

{
title:"",
description:"",
video:"https://res.cloudinary.com/dv5eromyn/video/upload/v1784134954/rakesh03_zkrrj0.mp4",

},

{
title:"ఓటు అనే ఆయుధం పొంది మీ భవిష్యత్తుకు బంగారు బాటలు వేయండి.",
description:"మీ ఓటు..మీ హక్కు.మీ భవిష్యత్తు.ప్రభుత్వం తలపెట్టిన ప్రత్యేక ఓటర్ సవరణ జాబితా ప్రక్రియ(SIR) ను ప్రతి ఒక్క హిందూ బిడ్డ తమతమ ఓటును నమోదు చేసుకొని. రాజ్యాంగం మనకు కల్పించిన ఓటు యొక్క విలువను మన తోటి హిందువులకు తెలియజేసి వారి ఓటును నమోదు చేసుకునేలా సహకారం అందించండి.",
video:"https://res.cloudinary.com/dv5eromyn/video/upload/v1784134951/rakesh01_vakjmc.mp4",

},

{
title:"ఆర్మూర్ ఆదర్శ పాఠశాల ఆకస్మిక తనిఖీ",
description:"",
video:"https://res.cloudinary.com/dv5eromyn/video/upload/v1784134952/rakesh02_dr1dyl.mp4",

},

{
title:"",
description:"",
video:"https://res.cloudinary.com/dv5eromyn/video/upload/v1784134940/rakesh04_gnfgcd.mp4",

},



];

const player = document.getElementById("player");
const title = document.getElementById("title");
const description = document.getElementById("description");
const playlist = document.getElementById("playlist");

let currentIndex = 0;

function renderPlaylist(){

    playlist.innerHTML="";

    videos.forEach((video,index)=>{

        const card=document.createElement("div");

        card.className="card";

        if(index===currentIndex)
            card.classList.add("active");

        card.innerHTML = `
<video
    src="${video.video}"
    muted
    preload="metadata"
    playsinline>
</video>

<div class="card-body">
    <h3>${video.title}</h3>
    <p>${video.description}</p>
</div>
`;

        card.onclick=function(){

            currentIndex=index;

            playVideo();

        };

        playlist.appendChild(card);

    });

}

function playVideo(){

    player.src=videos[currentIndex].video;

    title.textContent=videos[currentIndex].title;

    description.textContent=videos[currentIndex].description;

    player.load();

    player.play().catch(function(error){

        console.log("Autoplay blocked until user interacts.");

    });

    renderPlaylist();

}

player.addEventListener("ended",function(){

    currentIndex++;

    if(currentIndex>=videos.length){

        currentIndex=0;

    }

    playVideo();

});

// When user clicks the video, enable sound
player.addEventListener("click",function(){

    player.muted=false;

});

// When user presses play, enable sound
player.addEventListener("play",function(){

    player.muted=false;

});

playVideo();
