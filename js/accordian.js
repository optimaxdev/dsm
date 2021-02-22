import { replaceIcons } from './icons.js'

document.querySelectorAll('.dsmAccordian').forEach((a) => {
  if (!a.querySelector('svg')) {
    a.querySelector('summary').innerHTML = `${
      a.querySelector('summary').innerText
    } <i class="dsmIcons plus"></i>`
    replaceIcons()
  }
  if (!a.querySelector('summary~*')) {
    let splitElements = a.innerHTML.split('</summary>')
    a.innerHTML = `${splitElements[0]}</summary><span class="accordianContent">${splitElements[1]}</span>`
  }
  a.addEventListener('click', (e) => {
    e.preventDefault()
    let el = e.target.closest('details')
    el.setAttribute('aria-listener', true)
    if (el.getAttribute('open') == null) {
      let count = 0
      document.querySelectorAll('.dsmAccordian').forEach((a) => {
        let currEl = a
        count++
        if (currEl.getAttribute('open') == null) return
        currEl.classList.add('closeAccordian')
        setTimeout(() => {
          currEl.removeAttribute('open')
          currEl.classList.remove('closeAccordian')
        }, 200)
        setTimeout(() => {
          currEl.style.minHeight = '0px'
        }, 200)
      })

      if (count == document.querySelectorAll('.dsmAccordian').length) {
        el.style.minHeight = el.offsetHeight + 'px'
        el.setAttribute('open', '')
      }
    } else {
      el.classList.add('closeAccordian')
      setTimeout(() => {
        el.removeAttribute('open')
        el.classList.remove('closeAccordian')
      }, 200)
      setTimeout(() => {
        el.style.minHeight = '0px'
      }, 200)
    }
  })
})
