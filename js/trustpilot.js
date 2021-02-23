import { replaceIcons } from './icons.js'

if (
  document.querySelector('.dsmTrustpilot') &&
  typeof Swiper != 'undefined' &&
  document.querySelector('.dsmTrustpilot').dataset.apikey != undefined
) {
  let container = document.querySelector('.dsmTrustpilot')
  container.innerHTML = `<div class="swiper-outer"><div class="swiper-container" id="swiper-reviews"><div class="swiper-wrapper"></div></div><div class="arrowContainer arrow-left swiperArrows" id="swiperLeftArrow"><i class="dsmIcons arrow-left"></i></div><div class="arrowContainer arrow-right swiperArrows" id="swiperRightArrow"><i class="dsmIcons arrow-right"></i></div>  <div class="swiper-pagination"></div></div>
      `
  replaceIcons()

  let params = ['perPage=40']
  params.push(`apikey=${container.dataset.apikey}`)
  if (container.dataset.tags) {
    params.push(`tagValue=${container.dataset.tags}`)
  }
  if (container.dataset.stars) {
    params.push(`stars=${container.dataset.stars.split(',')}`)
  } else {
    params.push(`stars=4,5`)
  }
  params = params.join('&')
  let reviewsRequest = new XMLHttpRequest()
  let starEmpty = `<svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.3" viewBox="0 0 17.4 17.3" overflow="visible"><g transform="translate(0 .5)" fill-rule="evenodd" clip-rule="evenodd"><polygon points="0,16.8 17.4,16.8 17.4,-0.5 0,-0.5" fill="#dcdce6"/><path d="M14.7 6.8h-4.6L8.7 2.4 7.2 6.8H2.6l3.8 2.7L5 13.9l3.8-2.7L11 9.5l3.7-2.7zm-6 4.3l2.6-.7 1.1 3.4-3.7-2.7z" fill="#fff"/></g></svg>`
  let star = `<svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.3" viewBox="0 0 17.4 17.3" overflow="visible"><g transform="translate(0 .5)" fill-rule="evenodd" clip-rule="evenodd"><polygon points="0,16.8 17.4,16.8 17.4,-0.5 0,-0.5" fill="#00b67a"/><path d="M14.7 6.8h-4.6L8.7 2.4 7.2 6.8H2.6l3.8 2.7L5 13.9l3.8-2.7L11 9.5l3.7-2.7zm-6 4.3l2.6-.7 1.1 3.4-3.7-2.7z" fill="#fff"/></g></svg>`
  reviewsRequest.open(
    'GET',
    `https://api.trustpilot.com/v1/business-units/4a89c04f00006400050497f3/reviews?${params}`,
  )
  reviewsRequest.send()
  reviewsRequest.addEventListener('load', () => {
    let reviews = JSON.parse(reviewsRequest.response).reviews
    let count = 0
    let slidesAdded = 0
    let maxSlides = container.dataset.maxSlides
      ? parseInt(container.dataset.maxSlides)
      : 0
    if (window.innerWidth < 768) {
      maxSlides = container.dataset.mobileMaxSlides
        ? parseInt(container.dataset.mobileMaxSlides)
        : 6
    }
    reviews.forEach((r, q) => {
      if (maxSlides != 0 && slidesAdded >= maxSlides) {
        return startSwiper()
      }
      count++
      let minChars = container.dataset.minChars
        ? parseInt(container.dataset.minChars)
        : 75
      if (r.text.length < minChars) return count++
      let slide = document.createElement('div')
      let stars = ''
      let date = new Date(r.createdAt)
      date = `${date.getDate()} ${date.toLocaleDateString('default', {
        month: 'short',
      })}, ${date.getFullYear()}`
      for (let i = 0; i < r.stars; i++) {
        stars += star
      }
      for (let i = 0; i < 5 - r.stars; i++) {
        stars += starEmpty
      }
      slide.classList = 'swiper-slide'
      slide.innerHTML += `<div class="swiperTop">
        <div class="swiperRating">${stars}</div>
        <div class="swiperDate">${date}</div>
      </div>
      <div class="swiperTitle">${r.title}</div>
      <div class="swiperText">${r.text}</div>
      <div class="swiperAuthor">${r.consumer.displayName}</div>`
      document
        .querySelector('.dsmTrustpilot .swiper-wrapper')
        .appendChild(slide)
      slidesAdded++

      if (count >= reviews.length) {
        startSwiper()
      }
    })
  })
}

function startSwiper() {
  let container = document.querySelector('.dsmTrustpilot')

  let loop = container.dataset.loop ? container.dataset.loop == 'true' : 'true'
  let slidesPerView = container.dataset.slides ? container.dataset.slides : 3
  let spaceBetween = container.dataset.spaceBetween
    ? container.dataset.spaceBetween
    : 20
  let slidesPerGroup = container.dataset.slidesPerGroup
    ? container.dataset.slidesPerGroup
    : 1
  let allowTouchMove = container.dataset.touchMove
    ? container.dataset.touchMove == 'true'
    : 'true'
  let speed = container.dataset.speed ? container.dataset.speed : '300'
  let swiper = new Swiper('.dsmTrustpilot .swiper-container', {
    navigation: {
      nextEl: '#swiperRightArrow',
      prevEl: '#swiperLeftArrow',
    },
    loop: loop,
    slidesPerView: slidesPerView,
    spaceBetween: parseInt(spaceBetween),
    slidesPerGroup: parseInt(slidesPerGroup),
    speed: parseInt(speed),
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      1024: {
        allowTouchMove: allowTouchMove,
      },
      736: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      320: {
        allowTouchMove: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
  })
  delete container.dataset.apikey
}
