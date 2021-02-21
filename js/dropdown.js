const selectEvent = new Event('select')

function selectClick(e) {
  e.stopPropagation()
  document
    .querySelectorAll('.selectContainer li')
    .forEach((e) => e.classList.remove('selected'))
  e.target.classList.add('selected')
  e.target.parentNode.style.display = 'none'
  e.target.parentNode.parentNode.querySelector(
    'button .selectedItem',
  ).innerHTML = e.target.innerText
  e.target.parentNode
    .closest('.selectContainer')
    .querySelector('.selectedItem')
    .dispatchEvent(selectEvent)
  e.target.parentNode.parentNode.querySelector('button').classList.add('filled')
  e.target.parentNode.parentNode
    .querySelector('button')
    .classList.remove('active')
}

function selectButtonClick(e) {
  e.preventDefault()
  e.stopPropagation()
  let el = e.target.closest('.selectContainer')

  if (el.querySelector('button').classList.contains('active')) {
    el.querySelector('button').classList.remove('active')
    return (el.querySelector('ul').style.display = 'none')
  }

  el.querySelector('ul').style.display = 'block'
  el.querySelector('button').classList.add('active')
}

export { selectClick, selectButtonClick }
