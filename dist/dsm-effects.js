document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.dsmForm .inputLabel input[type=text]').forEach(e => e.addEventListener("change", (
        e) => {
        // Text input styling including effects on change values
        if (e.target.value != "") {
            e.target.parentNode.querySelector('label').style.fontSize = "11px";
            e.target.parentNode.querySelector('label').style.lineHeight = "19px";
            e.target.parentNode.querySelector('label').style.transform = "translateY(-13px)";
            e.target.parentNode.querySelector('label').style.color = "rgb(170, 170, 170)";
        } else {
            e.target.parentNode.querySelector('label').removeAttribute("style");
        }
    }))

    document.body.addEventListener("click", function (e) {
        clickHandler(e);
    });


    function clickHandler(e) {
        e.stopPropagation();
        document.querySelectorAll('.selectContainer ul').forEach(e => {
            if (e.getAttribute("style") == null) return;
            e.style.display = "none";
            let el = e.closest('.selectContainer');
            el.querySelector('button').classList.remove("active");
        });

        document.querySelectorAll('.dsmTooltip.click').forEach(el => {
            el = el.querySelector('.container');
            if (el.style.opacity < 1) return;
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            clearInterval(fadeInterval);
            let opacity = 1;
            el.style.opacity = opacity;
            exitInterval = setInterval(() => {
                if (opacity < 0.1) {
                    clearInterval(exitInterval)
                    return el.style.visibility = "hidden";
                };
                opacity = opacity - 0.1
                el.style.opacity = opacity;
            }, 20);
        })

        let el = e.target;
        if (el.closest('.dsmButton')) buttonClick(e);

    }


    function closeTooltip(el) {
        el = el.closest('.dsmTooltip.click').querySelector('.container');
        let opacity = 1;
        el.style.opacity = opacity;
        exitInterval = setInterval(() => {
            if (opacity < 0.1) {
                clearInterval(exitInterval)
                return el.style.visibility = "hidden";
            };
            opacity = opacity - 0.1
            el.style.opacity = opacity;
        }, 20);
    }

    function selectItem(value) {
        null;
    }

    function buttonClick(e) {
        e.preventDefault();
        let el = e.target.closest("button");
        if (el.classList.contains('round')) {
            el.classList.add("disabled");

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

    document.querySelectorAll('.selectContainer button').forEach(e => {
        e.innerHTML = e.innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" stroke="rgb(137, 149, 156)" width="12px" height="10px">
                    <path d="M1 1l5 6 5-6" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"
                        stroke-linejoin="round"></path>
                </svg>`;
        e.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            let el = e.target.closest('.selectContainer');
            el.querySelector('button').classList.remove("active");
            if (el.querySelector('ul').getAttribute("style") != null & el.querySelector('ul').style.display == "block") return el.querySelector('ul').style.display = "none"
            el.querySelector('ul').style.display = "block";
            el.querySelector('button').classList.add("active");
        })
    })

    document.querySelectorAll('.selectContainer li').forEach(e => e.addEventListener("click", (e) => {
        document.querySelectorAll('.selectContainer li').forEach(e => e.classList.remove('selected'));
        e.target.classList.add("selected");
        selectItem(e.target.innerText);
        e.target.parentNode.style.display = "none";
        e.target.parentNode.parentNode.querySelector('button .selectedItem').innerHTML = e.target.innerText;
        e.target.parentNode.parentNode.querySelector('button').classList.add('filled');
        e.target.parentNode.parentNode.querySelector('button').classList.remove("active");

    }))

    let fadeInterval, exitInterval;


    document.querySelectorAll('.dsmTooltip').forEach(e => {
        e.innerHTML = `<div class="container">
            <div class="arrow"></div>
            <div class="infoBox">
                <div class="textArea">${e.innerText}</div>
            </div>
        </div>
        <div class="item">?</div>`
        const el = e.querySelector('.container');
        const containerHeight = el.clientHeight;
        const containerWidth = el.clientWidth;

        switch (true) {
            case e.classList.contains('right'):
                el.style.top = `-${containerHeight /2}px`;
                el.style.left = `-${containerWidth + 10}px`;
                e.style.marginLeft = `${containerWidth + 10}px`;
                break;
            case e.classList.contains('left'):
                el.style.top = `-${containerHeight /2}px`;
                el.style.right = `-${containerWidth + 10}px`;
                e.style.marginRight = `${containerWidth + 10}px`;
                break;
            case e.classList.contains('bottom'):
                el.style.top = `30px`;
                el.style.left = `-${containerWidth /2}px`;
                break;
            default:
                el.style.left = `-${containerWidth /2}px`;
                el.style.top = `-${containerHeight + 20}px`;
                e.style.marginTop = `${containerHeight + 20}px`;
                e.style.marginLeft = `${containerWidth /2}px`;
                break;
        }

        if (e.classList.contains('close')) {
            el.innerHTML = el.innerHTML + `<svg onclick="closeTooltip(this)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13" width="100%" height="100%"><g fill="none" stroke="#b0bdc5"><path d="M12.3.7L.6 12.3M.7.7l11.7 11.6"></path></g></svg>`
        }

        if (e.classList.contains('click')) {
            e.addEventListener("click", e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
                if (e.target.classList.contains("textArea") == true | e.target.tagName == 'svg') return;
                document.querySelectorAll('.dsmTooltip.click .container').forEach(e => {
                    e.style.opacity = 0;
                    e.style.visibility = "none";
                })
                const el = e.target.closest('.dsmTooltip.click').querySelector('.container');
                if (el.style.opacity > 0.9) return;
                el.style.visibility = "visible";
                let opacity = 0;
                el.style.opacity = opacity;

                fadeInterval = setInterval(() => {
                    if (opacity > 0.9) return clearInterval(fadeInterval);
                    opacity = opacity + 0.1
                    el.style.opacity = opacity;
                }, 20);
            })
        } else {

            e.addEventListener("mouseenter", e => {
                e.stopImmediatePropagation;
                e.stopPropagation;
                clearInterval(exitInterval);
                const el = e.target.closest('.dsmTooltip').querySelector('.container');
                el.style.visibility = "visible";
                let opacity = 0;
                el.style.opacity = opacity;

                fadeInterval = setInterval(() => {
                    if (opacity > 0.9) return clearInterval(fadeInterval);
                    opacity = opacity + 0.1
                    el.style.opacity = opacity;
                }, 20);
            })
            e.addEventListener("mouseleave", e => {
                e.stopPropagation;
                e.stopImmediatePropagation;
                clearInterval(fadeInterval);
                const el = e.target.closest('.dsmTooltip').querySelector('.container');
                let opacity = 1;
                el.style.opacity = opacity;
                exitInterval = setInterval(() => {
                    if (opacity < 0.1) {
                        clearInterval(exitInterval)
                        return el.style.visibility = "hidden";
                    };
                    opacity = opacity - 0.1
                    el.style.opacity = opacity;
                }, 20);
            })
        }
    })
})