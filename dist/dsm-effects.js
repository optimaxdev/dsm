import buttonClick from '../js/buttons.js'
import { selectButtonClick, selectClick } from '../js/dropdown.js'
import '../js/trustpilot.js'
import { openTooltip, closeTooltip, adjustTooltip } from '../js/tooltip.js'
import '../js/icons.js'
import '../js/accordian.js'
import { runHeader, startTrustpilot } from '../js/trustpilot.js'
import { loadAccordian } from '../js/accordian.js'
import { replaceIcons } from '../js/icons.js'

globalThis.reloadElements = () => loadElements()

document.addEventListener('DOMContentLoaded', function () {
  loadElements()
})
export function loadElements() {
  loadAccordian()
  replaceIcons()
  document.addEventListener('change', (e) => {
    if (e.target.type == 'text' && e.target.closest('.dsmForm')) {
      // Text input styling including effects on change values
      if (e.target.value != '') {
        e.target.parentNode.querySelector('label').style.fontSize = '11px'
        e.target.parentNode.querySelector('label').style.lineHeight = '19px'
        e.target.parentNode.querySelector('label').style.transform =
          'translateY(-13px)'
        e.target.parentNode.querySelector('label').style.color =
          'rgb(170, 170, 170)'
      } else {
        e.target.parentNode.querySelector('label').removeAttribute('style')
      }
    }
  })

  if (document.querySelector('.dsmTrustpilot-Header')) {
    runHeader()
  }
  if (
    document.querySelector('.dsmTrustpilot') &&
    typeof Swiper != 'undefined'
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

  document.querySelectorAll('.selectContainer').forEach((e) => {
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
  document.querySelectorAll('.checkboxContainer').forEach((e) => {
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

  document.querySelectorAll('label.dsmSlider').forEach((e) => {
    e.innerHTML = ` <input type="checkbox"><span class="slider"></span> `
    if (e.dataset.disabled)
      e.innerHTML = `<input type="checkbox" disabled><span class="slider"></span> `
  })
  document.querySelectorAll('.dsmForm .inputLabel').forEach((e) => {
    if (!e.querySelector('label'))
      e.innerHTML = `<label>${e.querySelector('input').placeholder}</label>${
        e.innerHTML
      }`
    if (e.querySelector('label').innerText == '')
      e.querySelector('label').innerText = 'Please insert a placeholder'
  })
  document.querySelectorAll('.dsmForm .radioContainer').forEach((e) => {
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
  document.querySelectorAll('.dsmTooltip').forEach((e) => {
    if (e.classList.contains('click')) return
    e.addEventListener('mouseover', (r) => {
      r.target
        .closest('.dsmTooltip')
        .querySelector('.container').style.opacity = ''
      r.target
        .closest('.dsmTooltip')
        .querySelector('.container').style.visibility = ''
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
