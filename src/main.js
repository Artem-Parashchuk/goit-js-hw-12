import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";

import { fetchPhotoByPixaby } from "./js/pixabay-api";
import { createCard } from "./js/render-functions";


const formElem = document.querySelector('.form')
const inputFormElem = document.querySelector('.form-input')
const galleryListElem = document.querySelector('.gallery-list')
const loaderElem = document.querySelector('.loader')
const loadMoreBtnElem = document.querySelector('.gallery-btn')

let textInput = null
let numberPage = 1

async function inputSearch(event) {
    event.preventDefault();

    textInput = inputFormElem.value
    numberPage = 1

    if (textInput.trim() === '') {
        iziToast.info({
            message: 'Введіть слово в поле для пошуку',
            position: 'topRight',
            backgroundColor: 'orange',
        })
        galleryListElem.innerHTML = ''

        return
    }

    try {
        loaderElem.classList.add('is-visible')

        //reset gallery 
        galleryListElem.innerHTML = ''

        // reset input
        inputFormElem.value = ''

        const { data } = await fetchPhotoByPixaby(textInput, numberPage)
        loaderElem.classList.remove('is-visible')

        if (!data.hits.length) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                backgroundColor: 'red',
                theme: 'dark',
                position: 'topRight',
            });
            return
        }

        galleryListElem.innerHTML = createCard(data.hits)
        loadMoreBtnElem.classList.remove('is-hidden')
        loadMoreBtnElem.addEventListener('click', onLoadMoreBtn)

        gallery.refresh()

    } catch (error) {
        console.log(error)
    }
}

// SimpleLightbox
let gallery = new SimpleLightbox('.gallery-item__link', {
    captionsData: 'alt',
    captionDelay: 250
}
);

gallery.on('show.simplelightbox', function (event) {
    event.preventDefault()
});
// SimpleLightbox //end

async function onLoadMoreBtn() {
    try {
        numberPage++
        const { data } = await fetchPhotoByPixaby(textInput, numberPage)

        galleryListElem.insertAdjacentHTML('beforeend', createCard(data.hits))

        if (numberPage >= data.totalHits) {
            loadMoreBtnElem.classList.remove('is-hidden')
            loadMoreBtnElem.removeEventListener('click', onLoadMoreBtn)

            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                backgroundColor: 'blue',
                theme: 'light',
                position: 'topRight',
            });
        }
        // Code for scroll
        function getCardHeight() {
            const card = document.querySelector('.gallery-item')
            const cardRect = card.getBoundingClientRect()
            return cardRect.height
        }

        function smoothScroll(distance) {
            window.scrollBy({
                top: distance,
                behavior: 'smooth'
            })
        }
        const cardHeight = getCardHeight()
        smoothScroll(cardHeight * 2)
        // Code for scroll //end

    } catch (error) {
        console.log(error)
    }
}

formElem.addEventListener('submit', inputSearch)