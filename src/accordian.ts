import { replaceIcons } from './icons'

export function loadAccordian() {
  document.querySelectorAll<HTMLElement>('.dsmAccordian').forEach((a) => {
    if (typeof a === 'undefined') return
    if (!a.querySelector('summary>span')) {
      a.querySelector('summary').innerHTML = `<span>${
        a.querySelector('summary').innerHTML
      }</span>`
    }

    if (!a.querySelector('svg')) {
      a.querySelector('summary').innerHTML = `${
        a.querySelector('summary').innerHTML
      } <i class="dsmIcons plus"></i>`
      replaceIcons()
    }

    if (!a.querySelector('.accordianContent')) {
      let splitElements = a.innerHTML.split('</summary>')
      a.innerHTML = `${splitElements[0]}</summary><span class="accordianContent">${splitElements[1]}</span>`
    }

    if (a && a.getAttribute('open') != null) {
      a.style.minHeight = a.offsetHeight + 'px'
    }
    a.addEventListener('click', (e) => {
      const element = e.target as HTMLElement
      if (element.tagName == 'A') return
      e.preventDefault()
      let el = element.closest('details')
      el.setAttribute('aria-listener', 'true')
      if (el.getAttribute('open') == null) {
        let count = 0
        let openElements = document.querySelectorAll('.dsmAccordian[open]')
        openElements.forEach((a) => {
          let currEl = a as HTMLElement
          currEl.classList.add('closeAccordian')
          setTimeout(() => {
            currEl.removeAttribute('open')
            currEl.classList.remove('closeAccordian')
            count++
          }, 200)
          setTimeout(() => {
            currEl.style.minHeight = '0px'
          }, 200)
        })
        let loopFinished = setInterval(() => {
          if (count == openElements.length) {
            clearInterval(loopFinished)
            el.setAttribute('open', '')
          }
        }, 50)
      } else {
        el.classList.add('closeAccordian')
        setTimeout(() => {
          el.removeAttribute('open')
          el.classList.remove('closeAccordian')
        }, 500)
      }
    })
  })
}
