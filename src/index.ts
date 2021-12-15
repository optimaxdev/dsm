import buttonClick from './buttons'
import { selectButtonClick, selectClick } from './dropdown'
import { openTooltip, closeTooltip, adjustTooltip } from './tooltip'
import { runHeader, startTrustpilot } from './trustpilot'
import { loadAccordian } from './accordian'
import { replaceIcons } from './icons'
import { loadSlider } from './slider'
import Swiper from 'swiper'

globalThis.reloadElements = () => loadElements()

document.addEventListener('DOMContentLoaded', () => {
  loadElements()
})

export function loadElements() {
  setTimeout(() => {
    loadAccordian()
  }, 250)
  replaceIcons()
  loadSlider()
  document.addEventListener('change', (e) => {
    const el = e.target as HTMLInputElement
    if (
      el.type == 'text' ||
      el.type == 'email' ||
      (el.type == 'number' && el.closest('.dsmForm'))
    ) {
      // Text input styling including effects on change values
      if (el.value != '') {
        if (!el.classList.contains('error'))
          el.style.color = 'rgba(15, 15, 15, 1)'
        if (!el.parentNode.querySelector('label')) return
        el.parentNode.querySelector('label').style.fontSize = '11px'
        el.parentNode.querySelector('label').style.lineHeight = '19px'
        el.parentNode.querySelector('label').style.transform =
          'translateY(-13px)'
        el.parentNode.querySelector('label').style.color = 'rgb(170, 170, 170)'
      } else {
        if (el.parentNode.querySelector('label'))
          el.parentNode.querySelector('label').removeAttribute('style')
      }
    }
  })

  if (document.querySelector('.dsmTrustpilot-Header')) {
    runHeader()
  }
  if (
    typeof Swiper !== 'undefined' &&
    document.querySelector('.dsmTrustpilot')
  ) {
    startTrustpilot()
  }
  document.querySelectorAll('.selectContainer button').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopImmediatePropagation()
      e.stopPropagation()
      selectButtonClick(e)
    }),
  )

  document
    .querySelectorAll('.dsmButton')
    .forEach((e) => (e.innerHTML = `<span>${e.innerHTML}</span>`))

  document.querySelectorAll<HTMLElement>('.selectContainer').forEach((e) => {
    if (e.querySelector('button')) return
    e.innerHTML =
      `<button ${e.dataset.disabled ? 'disabled' : ''}>
                <span class = "selectedItem" > ${
                  e.dataset.placeholder != null
                    ? e.dataset.placeholder
                    : 'Placeholder'
                } </span>  
                    <svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(137, 149, 156)" width="12px" height="10px">
                    <path d="M1 1l5 6 5-6" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                    </svg>
                </button>` + e.innerHTML
  })
  document.querySelectorAll<HTMLElement>('.checkboxContainer').forEach((e) => {
    if (e.querySelector('.checkbox')) return
    if (e.dataset.checked) {
      e.dataset.size ? e.classList.add(e.dataset.size) : ''
      e.innerHTML = `<input type="checkbox" ${
        e.dataset.disabled ? 'disabled' : ''
      }><span class="checkbox ticked${
        e.dataset.error ? ' error' : ''
      }"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.4 12.4">
                <path fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"
                    d="M1.2 6.3l4.7 4.9 7.3-10" />
            </svg></span>`
    } else {
      e.dataset.size ? e.classList.add(e.dataset.size) : ''
      e.innerHTML = `<input type="checkbox" ${
        e.dataset.disabled ? 'disabled' : ''
      }${
        e.getAttribute('checked') != null ? ' checked' : ''
      }><span class="checkbox${e.dataset.error ? ' error' : ''}"></span>`
    }
  })

  document.querySelectorAll<HTMLElement>('label.dsmSlider').forEach((e) => {
    e.innerHTML = ` <input type="checkbox"><span class="slider"></span> `
    if (e.dataset.disabled)
      e.innerHTML = `<input type="checkbox" disabled><span class="slider"></span> `
  })
  document.querySelectorAll('.dsmForm .inputLabel').forEach((e) => {
    if (!e.querySelector('label'))
      e.querySelector('input').classList.add('noLabel')
  })
  document
    .querySelectorAll<HTMLElement>('.dsmForm .radioContainer')
    .forEach((e) => {
      if (!e.querySelector('.radioStyling')) {
        if (e.dataset.error) {
          e.innerHTML += `<span class="radioStyling error"></span>`
        } else if (e.dataset.size) {
          e.innerHTML += `<span class="radioStyling ${e.dataset.size}"></span>`
        } else {
          e.innerHTML += `<span class="radioStyling"></span>`
        }
      }
    })
  adjustTooltip()
  document.querySelectorAll<HTMLElement>('.dsmTooltip').forEach((e) => {
    if (e.classList.contains('click')) return
    e.addEventListener('mouseover', (r) => {
      const element = r.target as HTMLElement
      const container = element
        .closest('.dsmTooltip')
        .querySelector<HTMLElement>('.container')

      container.style.opacity = ''
      container.style.visibility = ''
    })
  })
}

document.body.addEventListener('click', function (e) {
  clickHandler(e)
})

function clickHandler(e) {
  let el = e.target

  if (el.closest('svg') && el.closest('.dsmTooltip .container')) {
    if (el.closest('.dsmTooltip.click') || el.closest('.dsmTooltip.close')) {
      closeTooltip(el.closest('.dsmTooltip'))
    }
  }
  if (!el.closest('.dsmTooltip.click')) {
    document.querySelectorAll('.dsmTooltip.click').forEach((el) => {
      closeTooltip(el)
    })
  }

  if (!el.closest('.selectContainer')) {
    if (!document.querySelectorAll('.selectContainer')) return
    document.querySelectorAll('.selectContainer').forEach((e) => {
      e.classList.remove('selected')
      if (e.querySelector('ul') && e.querySelector('button')) {
        e.querySelector('ul').style.display = 'none'
        e.querySelector('button').classList.add('filled')
        e.querySelector('button').classList.remove('active')
      }
    })
  }

  if (el.closest('.dsmTooltip.click')) openTooltip(e)
  if (el.closest('.dsmButton')) buttonClick(e)
  if (el.closest('.selectContainer li')) selectClick(e)
  if (el.closest('.selectContainer') && el.closest('button')) {
    selectButtonClick(e)
  }
}
