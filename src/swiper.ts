type configType = {
  type?: 'default' | 'slideIn'
  gap: number
  padding: number
  slidesPerView: number
  mobileStyle: 'single' | 'double' | 'pagination'
  withDots?: boolean
  withArrows?: boolean
  withScrollIndicator?: boolean
  loop?: boolean
  autoplay?: {
    enabled: boolean
    speed: number
  }
  arrows?: {
    prevArrow: HTMLElement
    nextArrow: HTMLElement
  }
  breakpoints?: {
    [breakpoint: number]: {
      gap?: number
      padding?: number
      slidesPerView?: number
      loop?: boolean
      withDots?: boolean
      withArrows?: boolean
      withScrollIndicator?: boolean
      mobileStyle?: 'single' | 'double'
      autoplay?: {
        enabled: boolean
        speed: number
      }
    }
  }
}

let pos = { top: 0, left: 0, x: 0, y: 0 }

globalThis.initiateSwiper = initiateSwiper

function trackProgress(event: MouseEvent, swiperContainer: HTMLElement) {
  const el = Array.from(swiperContainer.querySelectorAll('.slide')).filter(
    (e) => {
      const slide = e as HTMLElement
      const slideRect = slide.getClientRects()[0]
      const contRect = (event.target as HTMLElement).getClientRects()[0]
      if (
        slideRect.left + slide.clientWidth >=
        contRect.left + (parseInt(slide.style.marginRight) || 0)
      ) {
        return e
      }
    },
  )[0]

  const pos =
    Array.from(swiperContainer.querySelector('.slides').children).indexOf(el) +
    1
  swiperContainer
    .querySelectorAll('.pagination .active')
    .forEach((e) => e.classList.remove('active'))
  if (swiperContainer.querySelector(`.pagination .dot:nth-child(${pos})`))
    swiperContainer
      .querySelector(`.pagination .dot:nth-child(${pos})`)
      .classList.add('active')
}

function scrollProgress(swiperContainer: HTMLElement) {
  const slides = swiperContainer.querySelector('.slides')
  const percent = slides.scrollLeft / (slides.scrollWidth - slides.clientWidth)

  if (percent > 0)
    (swiperContainer.querySelector('.progress') as HTMLElement).style.opacity =
      '1'
  else
    (swiperContainer.querySelector('.progress') as HTMLElement).style.opacity =
      '0'
  ;(swiperContainer.querySelector(
    '.progress .indicator',
  ) as HTMLElement).style.transform = `scaleX(${percent})`
}

function restartAutoplay(swiperContainer: HTMLElement, config: configType) {
  let { breakpoints, autoplay, loop } = config

  for (const key in breakpoints) {
    if (window.innerWidth >= parseInt(key)) {
      const el = breakpoints[key]
      autoplay = el.autoplay || autoplay
    } else {
    }
  }
  if (autoplay && autoplay.enabled) {
    const autoplayID = `autoplay-${swiperContainer.dataset.swiperId}`

    if (this[autoplayID]) clearInterval(this[autoplayID])
    this[autoplayID] = setInterval(() => {
      nextSlide(swiperContainer, loop, false, config)
    }, autoplay.speed)
  }
}

function calculateSlides(swiperContainer: HTMLElement, config: configType) {
  let { gap, slidesPerView, breakpoints, autoplay, loop, withDots } = config

  for (const key in breakpoints) {
    if (swiperContainer.clientWidth >= parseInt(key)) {
      const el = breakpoints[key]
      gap = el.gap || gap
      autoplay = el.autoplay || autoplay
      slidesPerView = el.slidesPerView || slidesPerView
      loop = el.loop || loop
      withDots = el.withDots || withDots

      swiperContainer.style.padding = `0 ${el.padding || config.padding}px`
    } else {
    }
  }

  if (autoplay && autoplay.enabled) {
    const autoplayID = `autoplay-${swiperContainer.dataset.swiperId}`

    if (this[autoplayID]) clearInterval(this[autoplayID])
    this[autoplayID] = setInterval(() => {
      nextSlide(swiperContainer, loop, false, config)
    }, autoplay.speed)
  }

  if (swiperContainer.querySelector('.pagination') && withDots !== false) {
    const pagination = swiperContainer.querySelector('.pagination')
    pagination.innerHTML = ''
    let pages =
      swiperContainer.querySelectorAll('.slide').length - slidesPerView
    for (let i = 0; i < pages + 1; i++) {
      let el = document.createElement('i')
      el.className = 'dot'
      el.dataset.page = i.toString()
      if (i === 0) el.classList.add('active')
      pagination.appendChild(el)
      el.addEventListener('click', () => moveTo(i, swiperContainer))
    }
  }

  const slidesContainer = swiperContainer.querySelector('.slides')
  slidesContainer.scrollLeft = 0
  const containerWidth = slidesContainer.clientWidth
  const slideWidth = containerWidth / slidesPerView
  swiperContainer.querySelectorAll('.slide').forEach((slide, count) => {
    if (count + 1 != swiperContainer.querySelectorAll('.slide').length) {
      ;(slide as HTMLElement).style.marginRight = gap + 'px'
    }
    if (window.innerWidth < 1025) {
      switch (config.mobileStyle) {
        case 'single':
          ;(slide as HTMLElement).style.width = 315 + 'px'
          break
        case 'double':
          ;(slide as HTMLElement).style.width = 152.5 + 'px'
          break
        case 'pagination':
          ;(slide as HTMLElement).style.width =
            Math.round(slideWidth - gap + gap / slidesPerView) + 'px'
          break

        default:
          break
      }
      return
    }
    ;(slide as HTMLElement).style.width =
      Math.round(slideWidth - gap + gap / slidesPerView) + 'px'
  })
}

function moveTo(pos: number, swiperContainer: HTMLElement) {
  const ele = swiperContainer.querySelector('.slides')
  const el = ele.querySelector('.slide')
  ele.scrollTo({
    left:
      pos * el.clientWidth +
      pos * parseInt((el as HTMLElement).style.marginRight),
    behavior: 'smooth',
  })
}

function initiateSwiper(swiperContainer: HTMLElement, config: configType) {
  const slidesContainer = swiperContainer.querySelector('.slides')
  slidesContainer.addEventListener('mousedown', (e: MouseEvent) =>
    onMouseDown(e, slidesContainer as HTMLElement, swiperContainer),
  )
  slidesContainer.addEventListener(
    'touchmove',
    (mouseMove = (e) => onMouseMove(e, swiperContainer)),
  )
  slidesContainer.addEventListener(
    'touchend',
    (mouseUp = () =>
      onMouseUp(slidesContainer as HTMLElement, swiperContainer)),
  )

  swiperContainer.style.padding = `0 ${config.padding}px`
  swiperContainer.dataset.swiperId = (Math.random() + 1)
    .toString(36)
    .substring(7)
  calculateSlides(swiperContainer, config)
  if (config.withArrows !== false) {
    if (
      !config?.arrows?.nextArrow &&
      swiperContainer.querySelector('.swiper-arrow.right')
    ) {
      swiperContainer
        .querySelector('.swiper-arrow.right')
        .addEventListener('click', () =>
          nextSlide(swiperContainer, config.loop, true, config),
        )
    } else if (typeof config?.arrows?.nextArrow !== 'undefined')
      config.arrows.nextArrow.addEventListener('click', () =>
        nextSlide(swiperContainer, config.loop, true, config),
      )

    if (
      !config?.arrows?.prevArrow &&
      swiperContainer.querySelector('.swiper-arrow.left')
    ) {
      swiperContainer
        .querySelector('.swiper-arrow.left')
        .addEventListener('click', () =>
          prevSlide(swiperContainer, config.loop, true, config),
        )
    } else if (typeof config?.arrows?.prevArrow !== 'undefined')
      config.arrows.prevArrow.addEventListener('click', () =>
        prevSlide(swiperContainer, config.loop, true, config),
      )
  }
  window.addEventListener('resize', () =>
    calculateSlides(swiperContainer, config),
  )

  if (swiperContainer.querySelector('.pagination')) {
    swiperContainer
      .querySelector('.slides')
      .addEventListener('scroll', (e: MouseEvent) =>
        trackProgress(e, swiperContainer),
      )
  }

  if (
    config.withScrollIndicator &&
    swiperContainer.querySelector('.progress')
  ) {
    swiperContainer
      .querySelector('.slides')
      .addEventListener('scroll', (e: MouseEvent) =>
        scrollProgress(swiperContainer),
      )
  }
}

function nextSlide(
  swiperContainer: HTMLElement,
  loop: boolean,
  manual: boolean,
  config: configType,
) {
  const slide = swiperContainer.querySelector('.slide')
  if (
    config.type === 'slideIn' &&
    !swiperContainer.classList.contains('expanded')
  ) {
    swiperContainer.classList.add('expanded')
    return
  }
  if (manual) {
    const autoplayID = `autoplay-${swiperContainer.dataset.swiperId}`
    if (this[autoplayID]) clearInterval(this[autoplayID])

    setTimeout(() => {
      restartAutoplay(swiperContainer, config)
    }, 500)
  }

  swiperContainer.querySelector('.slides').scrollBy({
    behavior: 'smooth',
    left:
      Math.round(slide.clientWidth) +
      parseInt((slide as HTMLElement).style.marginRight),
  })

  if (
    swiperContainer.querySelector('.slides').scrollLeft >=
      swiperContainer.querySelector('.slides').scrollWidth -
        swiperContainer.querySelector('.slides').clientWidth &&
    loop
  ) {
    swiperContainer.querySelector('.slides').scrollTo({
      behavior: 'smooth',
      left: 0,
    })
  }
}
function prevSlide(
  swiperContainer: HTMLElement,
  loop: boolean,
  manual: boolean,
  config: configType,
) {
  const slide = swiperContainer.querySelector('.slide')

  if (manual) {
    const autoplayID = `autoplay-${swiperContainer.dataset.swiperId}`
    if (this[autoplayID]) clearInterval(this[autoplayID])

    setTimeout(() => {
      restartAutoplay(swiperContainer, config)
    }, 500)
  }

  let left = -(
    Math.round(slide.clientWidth) +
    parseInt((slide as HTMLElement).style.marginRight)
  )

  if (
    swiperContainer.querySelector('.slides').scrollLeft <=
    slide.clientWidth + parseInt((slide as HTMLElement).style.marginRight)
  ) {
    left = -1000
  }

  swiperContainer.querySelector('.slides').scrollBy({
    behavior: 'smooth',
    left: left,
  })

  if (swiperContainer.querySelector('.slides').scrollLeft === 0 && loop) {
    swiperContainer.querySelector('.slides').scrollTo({
      behavior: 'smooth',
      left: swiperContainer.querySelector('.slides').scrollWidth,
    })
  }
}

let mouseMove: (e: any) => void, mouseUp: (e: any) => void

function onMouseDown(
  e: MouseEvent,
  ele: HTMLElement,
  swiperContainer: HTMLElement,
) {
  pos = {
    // The current scroll
    left: ele.scrollLeft,
    top: ele.scrollTop,
    // Get the current mouse position
    x: e.clientX,
    y: e.clientY,
  }
  document.addEventListener(
    'mousemove',
    (mouseMove = (e) => onMouseMove(e, ele)),
  )
  document.addEventListener(
    'mouseup',
    (mouseUp = () => onMouseUp(ele, swiperContainer)),
  )
  ele.addEventListener(
    'mouseleave',
    (mouseUp = () => {
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('mouseup', mouseUp)
    }),
  )
}

function onMouseMove(e: MouseEvent, ele: HTMLElement) {
  // How far the mouse has been moved
  const dx = e.clientX - pos.x
  const dy = e.clientY - pos.y

  // Scroll the element
  ele.scrollTop = pos.top - dy
  ele.scrollLeft = pos.left - dx
}

function onMouseUp(ele: HTMLElement, swiperContainer: HTMLElement) {
  document.removeEventListener('mousemove', mouseMove)
  document.removeEventListener('mouseup', mouseUp)

  ele.style.cursor = 'grab'
  ele.style.removeProperty('user-select')

  const el = Array.from(swiperContainer.querySelectorAll('.slide')).filter(
    (e) => {
      const contRect = (swiperContainer.querySelector(
        '.slides',
      ) as HTMLElement).getClientRects()[0]
      const slide = e as HTMLElement
      const slideRect = slide.getClientRects()[0]
      if (
        slideRect.left + slide.clientWidth >=
        contRect.left + (parseInt(slide.style.marginRight) || 0)
      ) {
        return e
      }
    },
  )[0]

  const pos = Array.from(
    swiperContainer.querySelector('.slides').children,
  ).indexOf(el)

  ele.scrollTo({
    left:
      pos * el.clientWidth +
      pos * parseInt((el as HTMLElement).style.marginRight) -
      2,
    behavior: 'smooth',
  })
}
