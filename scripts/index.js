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
        if (e.target.classList.contains('round')) {
            let el = e.target;
            if (e.target.tagName == 'SPAN') el = e.target.parentNode;
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
            let el = e.target;
            if (e.target.tagName == 'SPAN') el = e.target.parentNode;
            el.classList.add("disabled");
            el.innerHTML = (`<div class="progress"><div class="indeterminate"></div></div>` + el.innerHTML);
            el.setAttribute("disabled", true);
        }
    }))

    document.querySelectorAll('.dsmForm .selectContainer button').forEach(e => {
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
        e.stopPropagation();
        document.querySelectorAll('.dsmForm .selectContainer ul').forEach(e => {
            if (e.getAttribute("style") == null) return;
            e.style.display = "none";
            let el = e.closest('.selectContainer');
            el.querySelector('button').classList.remove("active");
        });
    })
    document.querySelectorAll('.dsmForm .selectContainer li').forEach(e => e.addEventListener("click", (e) => {
        document.querySelectorAll('.dsmForm .selectContainer li').forEach(e => e.classList.remove('selected'));
        e.target.classList.add("selected");
        e.target.parentNode.style.display = "none";
        e.target.parentNode.parentNode.querySelector('button .selectedItem').innerHTML = e.target.innerText;
        e.target.parentNode.parentNode.querySelector('button').classList.add('filled');
        e.target.parentNode.parentNode.querySelector('button').classList.remove("active");

    }))

})