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

    if (window.innerWidth < 768) {
      document.querySelectorAll('.dsmAccordian').forEach((a) => {
        if (a.getAttribute('open') == null) return
        a.classList.add('closeAccordian')
        setTimeout(() => {
          a.removeAttribute('open')
          a.classList.remove('closeAccordian')
        }, 150)
      })
    }

    if (el.getAttribute('open') != null) {
      el.classList.add('closeAccordian')

      setTimeout(() => {
        el.removeAttribute('open')
        el.classList.remove('closeAccordian')
      }, 200)
      setTimeout(() => {
        el.style.minHeight = '0px'
      }, 150)
    } else {
      el.style.minHeight = el.offsetHeight + 'px'
      el.setAttribute('open', '')
    }
  })
})
