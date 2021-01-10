document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.dsmForm .inputLabel input[type=text]').forEach(e => e.addEventListener("change", (
        e) => {
        if (e.target.value != "") {
            e.target.parentNode.querySelector('label').style.fontSize = "11px";
            e.target.parentNode.querySelector('label').style.lineHeight = "19px";
            e.target.parentNode.querySelector('label').style.transform = "translateY(-13px)";
            e.target.parentNode.querySelector('label').style.color = "rgb(170, 170, 170)";
        } else {
            e.target.parentNode.querySelector('label').removeAttribute("style");
        }
    }))

    document.querySelectorAll('.dsmButton').forEach(e => e.addEventListener("click", (e) => {
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
    }))

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


    document.body.addEventListener("click", (e) => {
        e.preventDefault();
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
            e.stopPropagation;

            e.stopImmediatePropagation;
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

    function selectItem(value) {
        null;
    }

    let fadeInterval, exitInterval;


    document.querySelectorAll('.dsmTooltip').forEach(e => {
        const el = e.querySelector('.container');
        const containerHeight = el.clientHeight;
        const containerWidth = el.clientWidth;



        if (e.classList.contains('right')) {
            el.style.left = `-${containerHeight + 20}px`;
            el.style.top = `-${containerHeight /2}px`;
            e.style.width = containerWidth;
            e.querySelector('.item').style.left = `${containerWidth/2}px`;
        } else {
            el.style.left = `0px`;
            el.style.top = `-${containerHeight + 20}px`;
            e.style.width = containerWidth;
            e.querySelector('.item').style.left = `${containerWidth/2}px`;
        }

        if (e.classList.contains('click')) {
            e.addEventListener("click", e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
                clearInterval(exitInterval);
                const el = e.target.closest('.dsmTooltip').querySelector('.container');
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