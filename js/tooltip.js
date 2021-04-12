function openTooltip(e) {
  e.preventDefault()
  e.stopImmediatePropagation()
  e.stopPropagation()
  let fadeInterval
  clearInterval(fadeInterval)
  if (
    (e.target.classList.contains('textArea') == true) |
    (e.target.tagName == 'svg')
  )
    return
  const el = e.target.closest('.dsmTooltip.click').querySelector('.container')

  if (el.style.visibility === 'visible') return closeTooltip(el)

  document.querySelectorAll('.dsmTooltip.click .container').forEach((e) => {
    e.style.visibility = 'hidden'
    e.style.opacity = 0
  })

  if (el.style.opacity > 0.9) return
  el.style.visibility = 'visible'
  let opacity = 0
  el.style.opacity = opacity

  fadeInterval = setInterval(() => {
    if (opacity > 0.9) {
      el.style.visibility = 'visible'
      return clearInterval(fadeInterval)
    }
    opacity = opacity + 0.1
    el.style.opacity = opacity
  }, 20)
}

function closeTooltip(el) {
  el = el.closest('.dsmTooltip.click') || el.closest('.dsmTooltip.close')
  el = el.querySelector('.container')
  if (!el) return
  let opacity = 1
  el.style.opacity = opacity
  let exitInterval
  clearInterval(exitInterval)

  exitInterval = setInterval(() => {
    if (opacity < 0.1 && opacity > -0.9) {
      el.style.opacity = 0
      el.style.visibility = 'hidden'
      clearInterval(exitInterval)
    }
    opacity = opacity - 0.1
    el.style.opacity = opacity
  }, 20)
}

function adjustTooltip() {
  document.querySelectorAll('.dsmTooltip').forEach((e) => {
    if (e.querySelector('.item')) return
    let text = e.innerText
    e.innerHTML = `<div class="item">?</div><div class="container">
            <div class="arrow"></div>
            <div class="infoBox">
                <div class="textArea">${text}</div>
            </div>
        </div>`
    const el = e.querySelector('.container')
    const containerHeight = el.clientHeight
    const containerWidth = el.clientWidth

    switch (true) {
      case e.classList.contains('right'):
        el.style.top = `-${containerHeight / 2 - 5}px`
        el.style.left = `-${containerWidth}px`
        el.querySelector('.arrow').style.top = `${containerHeight / 2 - 4}px`
        break
      case e.classList.contains('left'):
        el.style.top = `-${containerHeight / 2 - 5}px`
        el.style.right = `-${containerWidth}px`
        el.querySelector('.arrow').style.top = `${containerHeight / 2 - 4}px`
        el.style.left = `40px`
        break
      case e.classList.contains('bottom'):
        el.style.top = `30px`
        el.style.left = `-${containerWidth / 2 - 10}px`
        break
      default:
        el.style.left = `-${containerWidth / 2 - 15}px`
        el.style.top = `unset`
        el.style.bottom = `30px`
        break
    }

    if (e.classList.contains('close')) {
      el.innerHTML =
        el.innerHTML +
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="100%" height="100%"><g fill="none" stroke="#b0bdc5"><path d="M12.3.7L.6 12.3M.7.7l11.7 11.6"></path></g></svg>`
    }
  })
}

export { openTooltip, closeTooltip, adjustTooltip }
