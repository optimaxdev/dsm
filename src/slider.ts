export function loadSlider() {
  var indicator = document.querySelector<HTMLElement>(".nav-indicator");
  var items = document.querySelectorAll(".dsmSliderToggleBtn");
  var event = new Event("filter");
  function handleIndicator(el) {
    items.forEach((item) => {
      item.classList.remove("is-active");
      item.removeAttribute("style");
    });

    indicator.style.width = el.offsetWidth + "px";
    indicator.style.left = el.offsetLeft + "px";
    el.classList.add("is-active");
    document.querySelector(".dsmSliderToggle").dispatchEvent(event);
  }

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      handleIndicator(e.target);
    });
    item.classList.contains("is-active") && handleIndicator(item);
  });
}
