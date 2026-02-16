export default function buttonClick(e) {
  let el = e.target.closest("button");
  if (!el) return;
  e.preventDefault();
  e.stopPropagation();
  el.style.width = el.getClientRects()[0].width + "px";
  el.classList.add("loading");
  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 35 35">
  <circle cx="17.5" cy="17.5" r="16" stroke="#fff" stroke-opacity=".5" stroke-width="3" opacity=".3"/>
  <path stroke="#fff" stroke-linecap="round" stroke-width="3" d="M33.5 17.5a16 16 0 0 1-16 16">
    <animateTransform attributeName="transform" dur="1s" from="0 17.5 17.5" repeatCount="indefinite" to="360 17.5 17.5" type="rotate"/>
  </path>
</svg>
${el.innerHTML}`;
}
