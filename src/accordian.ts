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
      } <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 8L1.5 8" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M8 14.5L8 1.5" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`
    }

    // if (!a.querySelector('.accordianContent')) {
    //   let splitElements = a.innerHTML.split('</summary>')
    //   a.innerHTML = `${splitElements[0]}</summary><span class="accordianContent">${splitElements[1]}</span>`
    // }

    if (a && a.getAttribute('open') != null) {
      a.style.minHeight = a.offsetHeight + 'px'
    }
    a.addEventListener('click', (e) => {
      const element = e.target as HTMLElement
      if (element.tagName == 'A') return
      e.preventDefault()
      let el = element.closest('details')

      el.style.maxHeight = el.clientHeight + 1 + 'px'
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
            currEl.classList.add('accordianClosed')
            setTimeout(() => {
              currEl.classList.remove('accordianClosed')
            }, 300)
            count++
          }, 200)
          setTimeout(() => {
            currEl.style.minHeight = '0px'
          }, 200)
        })
        let loopFinished = setInterval(() => {
          if (count == openElements.length) {
            clearInterval(loopFinished)
            el.style.maxHeight = ''
            el.setAttribute('open', '')
          }
        }, 50)
      } else {
        const paddding = window.innerWidth > 768 ? 41 : 18 * 2 + 1
        el.style.maxHeight =
          el.querySelector('summary').clientHeight + paddding + 'px'
        el.classList.add('closeAccordian')
        setTimeout(() => {
          el.classList.add('accordianClosed')
          setTimeout(() => {
            el.classList.remove('accordianClosed')
          }, 500)
        }, 300)
        setTimeout(() => {
          el.removeAttribute('open')
          el.style.maxHeight = ''
          el.classList.remove('closeAccordian')
        }, 500)
      }
    })
  })
}
