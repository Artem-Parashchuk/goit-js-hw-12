import{a as g,S as b,i as d}from"./assets/vendor-4d51048b.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();g.defaults.baseURL="https://pixabay.com";const L="43330022-ba36650dc11c5492edb18bb80";function f(i,e){const o={image_type:"photo",orientation:"horizontal",safesearch:!0,key:L,q:i,page:e,per_page:15};return g.get("/api/?",{params:o})}function h(i){return i.map(e=>`<li class="gallery-item">
            <a class="gallery-item__link" href="${e.largeImageURL}"><div class="img-container"><img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}"></div>
            <ul class="img-description__list">
            <li class="img-description__item">
                <p class="img-description__title">
                Likes
                </p>
                <p class="img-description__text">
                ${e.likes}
                </p>
            </li>
            <li class="img-description__item">
                <p class="img-description__title">
                Views
                </p>
                <p class="img-description__text">
                ${e.views}
                </p>
            </li>
            <li>
                <li class="img-description__item">
                <p class="img-description__title">
                    Comments
                </p>
                <p class="img-description__text">
                    ${e.comments}
                </p>
                </li>
            </li>
            <li>
                <li class="img-description__item">
                <p class="img-description__title">
                    Downloads
                </p>
                <p class="img-description__text">
                    ${e.downloads}
                </p>
                </li>
            </li>
            </ul>
        </a>
      </li>`).join("")}const v=document.querySelector(".form"),u=document.querySelector(".form-input"),m=document.querySelector(".gallery-list"),p=document.querySelector(".loader"),c=document.querySelector(".gallery-btn");let a=null,s=1;async function w(i){if(i.preventDefault(),a=u.value,s=1,a.trim()===""){d.info({message:"Введіть слово в поле для пошуку",position:"topRight",backgroundColor:"orange"}),m.innerHTML="";return}try{p.classList.add("is-visible");const{data:e}=await f(a,s);if(p.classList.remove("is-visible"),!e.hits.length){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"red",theme:"dark",position:"topRight"});return}m.innerHTML=h(e.hits),c.classList.remove("is-hidden"),c.addEventListener("click",_),y.refresh(),u.value=""}catch(e){console.log(e)}}let y=new b(".gallery-item__link",{captionsData:"alt",captionDelay:250});y.on("show.simplelightbox",function(i){i.preventDefault()});async function _(){try{let e=function(){return document.querySelector(".gallery-item").getBoundingClientRect().height},o=function(t){window.scrollBy({top:t,behavior:"smooth"})};s++;const{data:i}=await f(a,s);m.insertAdjacentHTML("beforeend",h(i.hits)),s===i.totalHits&&(c.classList.remove("is-hidden"),c.removeEventListener("click",_),d.info({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"blue",theme:"light",position:"topRight"}));const n=e();o(n*2)}catch(i){console.log(i)}}v.addEventListener("submit",w);
//# sourceMappingURL=commonHelpers.js.map
