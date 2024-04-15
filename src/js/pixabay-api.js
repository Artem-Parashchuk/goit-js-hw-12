import axios from "axios"

axios.defaults.baseURL = 'https://pixabay.com'
const KEY_API = '43330022-ba36650dc11c5492edb18bb80'

export function fetchPhotoByPixaby(searchWord, numberPage) {
    const searchParams = {
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        key: KEY_API,
        q: searchWord,
        page: numberPage,
        per_page: 15
    }

    return axios.get('/api/?', { params: searchParams })
}