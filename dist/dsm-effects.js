document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("change", e => {
        if (e.target.type == 'text' && e.target.closest('.dsmForm')) {
            // Text input styling including effects on change values
            if (e.target.value != "") {
                e.target.parentNode.querySelector('label').style.fontSize = "11px";
                e.target.parentNode.querySelector('label').style.lineHeight = "19px";
                e.target.parentNode.querySelector('label').style.transform = "translateY(-13px)";
                e.target.parentNode.querySelector('label').style.color = "rgb(170, 170, 170)";
            } else {
                e.target.parentNode.querySelector('label').removeAttribute("style");
            }
        }
    })

    document.body.addEventListener("click", function (e) {
        clickHandler(e);
    });

    document.querySelectorAll('.selectContainer').forEach(e => {
        if (e.querySelector('button')) return;
        e.innerHTML = `<button ${(e.dataset.disabled) ? 'disabled' : ''}>
                <span class = "selectedItem" > ${
                    (e.dataset.placeholder != null) ? e.dataset.placeholder : 'Placeholder'} </span>  
                    <svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(137, 149, 156)" width="12px" height="10px">
                    <path d="M1 1l5 6 5-6" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                    </svg>
                </button>` + e.innerHTML;
    })
    document.querySelectorAll('.checkboxContainer').forEach(e => {
        e.innerHTML = `<input type="checkbox" ${(e.dataset.disabled) ? 'disabled' : ''}>
            <span class="checkbox${(e.dataset.error) ? ' error' : ''}"></span>`
    })

    document.querySelectorAll('label.dsmSlider').forEach(e => {
        e.innerHTML = ` <input type="checkbox"><span class="slider"></span> `;
        if (e.dataset.disabled) e.innerHTML = `<input type="checkbox" disabled><span class="slider"></span> `;
    })
    document.querySelectorAll('.dsmForm .inputLabel').forEach(e => {
        if (!e.querySelector('label')) e.innerHTML = `<label>${e.querySelector('input').placeholder}</label>${e.innerHTML}`;
        console.log(e.querySelector('label').innerText);
        if (e.querySelector('label').innerText == "") e.querySelector('label').innerText = "Please insert a placeholder";
    })

    document.querySelectorAll('.dsmTooltip').forEach(e => {
        e.innerHTML = `<div class="item">?</div><div class="container">
            <div class="arrow"></div>
            <div class="infoBox">
                <div class="textArea">${e.innerText}</div>
            </div>
        </div>`
        const el = e.querySelector('.container');
        const containerHeight = el.clientHeight;
        const containerWidth = el.clientWidth;

        switch (true) {
            case e.classList.contains('right'):
                el.style.top = `-${containerHeight /2}px`;
                el.style.left = `-${containerWidth}px`;
                e.style.marginLeft = `${containerWidth}px`;
                break;
            case e.classList.contains('left'):
                el.style.top = `-${containerHeight /2}px`;
                el.style.right = `-${containerWidth}px`;
                el.style.left = `30px`;
                break;
            case e.classList.contains('bottom'):
                el.style.top = `30px`;
                el.style.left = `-${containerWidth /2}px`;
                break;
            default:
                el.style.left = `-${containerWidth /2}px`;
                el.style.top = `unset`;
                el.style.bottom = `30px`;
                e.style.marginTop = `${containerHeight}px`;
                e.style.marginLeft = `${containerWidth /2}px`;
                break;
        }

        if (e.classList.contains('close')) {
            el.innerHTML = el.innerHTML + `<svg onclick="closeTooltip(this)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="100%" height="100%"><g fill="none" stroke="#b0bdc5"><path d="M12.3.7L.6 12.3M.7.7l11.7 11.6"></path></g></svg>`
        }
    })
})


function openTooltip(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    let fadeInterval;
    clearInterval(fadeInterval);
    if (e.target.classList.contains("textArea") == true | e.target.tagName == 'svg') return;
    const el = e.target.closest('.dsmTooltip.click').querySelector('.container');

    if (el.style.visibility === 'visible') return closeTooltip(el);

    document.querySelectorAll('.dsmTooltip.click .container').forEach(e => {
        e.style.visibility = "hidden";
        e.style.opacity = 0;
    })

    if (el.style.opacity > 0.9) return;
    el.style.visibility = "visible";
    let opacity = 0;
    el.style.opacity = opacity;

    fadeInterval = setInterval(() => {
        if (opacity > 0.9) {
            el.style.visibility = "visible";
            return clearInterval(fadeInterval)
        };
        opacity = opacity + 0.1
        el.style.opacity = opacity;
    }, 20);
}

function closeTooltip(el) {
    el = el.closest('.dsmTooltip.click').querySelector('.container');
    let opacity = 1;
    el.style.opacity = opacity;
    let exitInterval;
    clearInterval(exitInterval);

    exitInterval = setInterval(() => {
        if (opacity < 0.1 && opacity > -0.9) {
            el.style.opacity = 0;
            el.style.visibility = "hidden";
            clearInterval(exitInterval);
        };
        opacity = opacity - 0.1
        el.style.opacity = opacity;
    }, 20);
}

function selectClick(e) {
    document.querySelectorAll('.selectContainer li').forEach(e => e.classList.remove('selected'));
    e.target.classList.add("selected");
    selectItem(e.target.innerText);
    e.target.parentNode.style.display = "none";
    e.target.parentNode.parentNode.querySelector('button .selectedItem').innerHTML = e.target.innerText;
    e.target.parentNode.parentNode.querySelector('button').classList.add('filled');
    e.target.parentNode.parentNode.querySelector('button').classList.remove("active");
}

function selectButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    let el = e.target.closest('.selectContainer');

    if (el.querySelector('button').classList.contains('active')) {
        el.querySelector('button').classList.remove("active");
        return el.querySelector('ul').style.display = "none";
    }

    el.querySelector('ul').style.display = "block";
    el.querySelector('button').classList.add("active");
}

function clickHandler(e) {
    e.stopPropagation();
    let el = e.target;

    if (!el.closest('.dsmTooltip.click')) {
        document.querySelectorAll('.dsmTooltip.click').forEach(el => {
            closeTooltip(el);
        })
    }

    if (el.closest('.dsmTooltip.click')) openTooltip(e);
    if (el.closest('.dsmButton')) buttonClick(e);
    if (el.closest('.selectContainer li')) selectClick(e);
    if (el.closest('.selectContainer button')) selectButtonClick(e);
}

function selectItem(value) {
    null;
}

function buttonClick(e) {
    e.preventDefault();
    let el = e.target.closest("button");
    if (el.classList.contains('round')) {
        el.classList.add("disabled");
        el.style.width = el.clientWidth + 'px';

        el.innerHTML = `<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                    <animateTransform 
                        attributeName="transform" 
                        attributeType="XML" 
                        type="rotate"
                        dur="1s" 
                        from="0 50 50"
                        to="360 50 50" 
                        repeatCount="indefinite" />
                </path>
                </svg>`
    } else {
        el.classList.add("disabled");
        el.innerHTML = (`<div class="progress"><div class="indeterminate"></div></div>` + el.innerHTML);
        el.setAttribute("disabled", true);
    }
}