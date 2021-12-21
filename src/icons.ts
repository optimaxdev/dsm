import config from '../dist/svg-icons.js'
import { Icons } from '../dist/icons.js'

function replaceIcons() {
  document.querySelectorAll('.dsmIcons').forEach((a, i) => {
    if (a.classList.length == 1) return
    let classes = []
    a.classList.forEach((c) => classes.push(c))
    classes.splice(classes.indexOf('dsmIcons'), 1)
    if (Icons[classes[0]]) {
      let oldClasses = [classes[0], 'dsmIcons']
      a.innerHTML = Icons[classes[0]]
      a.querySelector('svg').classList.add(...oldClasses)
      a.classList.add(...oldClasses)
      a.outerHTML = a.innerHTML
    } else if (config[classes[0]]) {
      let oldClasses = [classes[0], 'dsmIcons']
      a.innerHTML = config[classes[0]]
      a.querySelector('svg').classList.add(...oldClasses)
      a.classList.add(...oldClasses)
      a.outerHTML = a.innerHTML
    }
    a = document.querySelectorAll('.dsmIcons')[i]
    onClassChange(a)
  })

  document.querySelectorAll('.dsmLogo').forEach((a, i) => {
    if (a.classList.length == 1) return

    let classes = []
    a.classList.forEach((c) => classes.push(c))
    classes.splice(classes.indexOf('dsmLogo'), 1)
    if (config[classes[0]]) {
      let oldClasses = [classes[0], 'dsmLogo']
      a.innerHTML = config[classes[0]]
      a.querySelector('svg').classList.add(...oldClasses)
      a.classList.add(...oldClasses)
      a.outerHTML = a.innerHTML
    }
    a = document.querySelectorAll('.dsmIcons')[i]
    onClassChange(a)
  })
}

replaceIcons()
export { replaceIcons }

function onClassChange(a) {
  if (!a) return
  // Options for the observer (which mutations to observe)
  const observerConfig = {
    attributes: true,
    attributeFilter: ['class'],
    attributeOldValue: true,
    characterDataOldValue: true,
    characterData: true,
  }
  // Create an observer instance linked to the callback function

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type != 'attributes') return
      if (
        mutation.target.classList.length < mutation.oldValue.split(' ').length
      )
        return
      observer.disconnect()
      let a = mutation.target

      if (a.classList.length == 1) return
      let classes = []
      a.classList.forEach((c) => classes.push(c))
      if (classes.includes('dsmIcons')) {
        classes.splice(classes.indexOf('dsmIcons'), 1)
      } else {
        classes.splice(classes.indexOf('dsmLogo'), 1)
      }
      if (config[classes[0]]) {
        a.innerHTML = config[classes[0]]

        for (
          let index = a.querySelector('svg').attributes.length - 1;
          index > -1;
          --index
        ) {
          let attribute = a.querySelector('svg').attributes[index]
          a.setAttribute(attribute.name, attribute.value)
        }
        a.innerHTML = a.querySelector('svg').innerHTML
        observer.observe(a, observerConfig)
      }
    }
  }

  const observer = new MutationObserver(callback)
  observer.observe(a, observerConfig)
}
