import { replaceIcons } from "./icons";
import Swiper, { Navigation } from "swiper";
Swiper.use([Navigation]);

let apiURL = "https://api.freud-online.co.uk:3100";
if (
  window.location.href.includes("glassesusa.com") ||
  window.location.href.includes("gusa")
) {
  apiURL =
    window.innerWidth > 768
      ? "https://www.glassesusa.com/bff/trustpilot"
      : "https://m.glassesusa.com/bff/trustpilot";
}

export function startTrustpilot() {
  let container = document.querySelector(".dsmTrustpilot") as HTMLElement;
  if (container.dataset.noScript === "true") return;
  if (!container.querySelector(".swiper-outer"))
    container.innerHTML = `<div class="swiper-outer"><div class="swiper-container" id="swiper-reviews"><div class="swiper-wrapper"></div></div><div class="arrowContainer arrow-left swiperArrows" id="swiperLeftArrow"><i class="dsmIcons arrow-left"></i></div><div class="arrowContainer arrow-right swiperArrows" id="swiperRightArrow"><i class="dsmIcons arrow-right"></i></div>  <div class="swiper-pagination"></div></div>
      `;
  replaceIcons();
  if (document.querySelector(".dsmTrustpilot .swiper-slide")) {
    startSwiper();
  } else {
    let params: any = [
      "url=https://api.trustpilot.com/v1/business-units/4a89c04f00006400050497f3/reviews",
    ];
    if (container.dataset.tags) {
      params.push(`tags=${container.dataset.tags}`);
    }
    if (container.dataset.stars) {
      params.push(`stars=${container.dataset.stars.split(",")}`);
    } else {
      params.push(`stars=4,5`);
    }
    params = params.join("&");
    let reviewsRequest = new XMLHttpRequest();
    let starEmpty = `<svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.3" viewBox="0 0 17.4 17.3" overflow="visible"><g transform="translate(0 .5)" fill-rule="evenodd" clip-rule="evenodd"><polygon points="0,16.8 17.4,16.8 17.4,-0.5 0,-0.5" fill="#dcdce6"/><path d="M14.7 6.8h-4.6L8.7 2.4 7.2 6.8H2.6l3.8 2.7L5 13.9l3.8-2.7L11 9.5l3.7-2.7zm-6 4.3l2.6-.7 1.1 3.4-3.7-2.7z" fill="#fff"/></g></svg>`;
    let star = `<svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.3" viewBox="0 0 17.4 17.3" overflow="visible"><g transform="translate(0 .5)" fill-rule="evenodd" clip-rule="evenodd"><polygon points="0,16.8 17.4,16.8 17.4,-0.5 0,-0.5" fill="#00b67a"/><path d="M14.7 6.8h-4.6L8.7 2.4 7.2 6.8H2.6l3.8 2.7L5 13.9l3.8-2.7L11 9.5l3.7-2.7zm-6 4.3l2.6-.7 1.1 3.4-3.7-2.7z" fill="#fff"/></g></svg>`;
    reviewsRequest.open("GET", `${apiURL}/reviews?${params}`);
    reviewsRequest.send();

    reviewsRequest.addEventListener("error", () => {
      container.innerHTML = "";
      console.error(
        "There was an error connecting to the API. Please try again later"
      );
    });
    reviewsRequest.addEventListener("load", () => {
      let reviews = JSON.parse(reviewsRequest.response);
      let count = 0;
      let slidesAdded = 0;
      let maxSlides = container.dataset.maxSlides
        ? parseInt(container.dataset.maxSlides)
        : 0;
      if (window.innerWidth < 768) {
        maxSlides = container.dataset.mobileMaxSlides
          ? parseInt(container.dataset.mobileMaxSlides)
          : 6;
      }
      reviews.forEach((r, q) => {
        if (maxSlides && slidesAdded == maxSlides) return;
        count++;
        let minChars = container.dataset.minChars
          ? parseInt(container.dataset.minChars)
          : 75;
        if (r.text.length < minChars) return;

        let slide = document.createElement("div");
        let stars = "";
        let date: any = new Date(r.date);
        date = `${date.getDate()} ${date.toLocaleDateString("default", {
          month: "short",
        })}, ${date.getFullYear()}`;
        for (let i = 0; i < r.stars; i++) {
          stars += star;
        }
        for (let i = 0; i < 5 - r.stars; i++) {
          stars += starEmpty;
        }
        slide.className = "";
        slide.classList.add("swiper-slide");
        slide.innerHTML += `<div class="swiperTop">
        <div class="swiperRating">${stars}</div>
        <div class="swiperDate">${date}</div>
      </div>
      <div class="swiperTitle">${r.title}</div>
      <div class="swiperText">${r.text}</div>
      <div class="swiperAuthor">${r.author}</div>`;
        document
          .querySelector(".dsmTrustpilot .swiper-wrapper")
          .appendChild(slide);
        slidesAdded++;
      });
      if (count >= reviews.length || slidesAdded == maxSlides) {
        return startSwiper();
      }
    });
  }
}

let dsmSwiper;

function startSwiper() {
  let container = document.querySelector(".dsmTrustpilot") as HTMLElement;
  if (container.dataset.loaded) return;
  container.dataset.loaded = "true";

  let loop = container.dataset.loop ? container.dataset.loop == "true" : true;
  let slidesPerView = container.dataset.slides
    ? parseInt(container.dataset.slides)
    : 3;
  let spaceBetween = container.dataset.spaceBetween
    ? parseInt(container.dataset.spaceBetween)
    : 20;
  let slidesPerGroup = container.dataset.slidesPerGroup
    ? parseInt(container.dataset.slidesPerGroup)
    : 1;
  let allowTouchMove = container.dataset.touchMove
    ? container.dataset.touchMove == "true"
    : true;
  let speed = container.dataset.speed ? container.dataset.speed : "300";

  dsmSwiper = new Swiper(".dsmTrustpilot .swiper-container", {
    navigation: {
      nextEl: "#swiperRightArrow",
      prevEl: "#swiperLeftArrow",
    },
    loop: loop,
    slidesPerView: slidesPerView,
    spaceBetween: spaceBetween,
    slidesPerGroup: slidesPerGroup,
    speed: parseInt(speed),
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      1024: {
        allowTouchMove: allowTouchMove,
        slidesPerGroup: slidesPerGroup,
        slidesPerView: slidesPerView,
      },
      736: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      320: {
        allowTouchMove: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
    },
  });
}

export const getScore = () => {
  return new Promise((res, rej) => {
    let reviewsRequest = new XMLHttpRequest();
    reviewsRequest.open("GET", `${apiURL}/rating`);
    reviewsRequest.send();

    reviewsRequest.addEventListener("load", () => {
      if (reviewsRequest.status === 404) {
        return rej();
      }

      res(JSON.parse(reviewsRequest.response));
    });
    reviewsRequest.addEventListener("error", () => {
      rej();
    });
  }) as Promise<{ score: number; numberOfReviews: string } | undefined>;
};

export async function runHeader() {
  let container = document.querySelector(".dsmTrustpilot-Header");
  try {
    let reviews = await getScore();
    let starHalf = `<svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.3" viewBox="0 0 19.5 19.8" overflow="visible"><style>.st0,.st1,.st2{fill-rule:evenodd;clip-rule:evenodd}.st0{fill-opacity:.33;fill:#b0b0b0}.st1,.st2{fill:#00b67a}.st2{fill:#fff}</style><polygon id="Fill-5_1_" class="st0" points="9.1,19.8 19.5,19.8 19.5,0 9.1,0"/><polygon id="Fill-6_1_" class="st1" points="0,19.8 10.4,19.8 10.4,0 0,0"/><path id="Fill-11_1_" class="st2" d="M16.9 8h-5.5L9.7 3 8.1 8H2.6L7 11.1l-1.7 5L9.8 13l2.7-1.9L16.9 8zm-7.2 5l3.1-.8 1.3 3.9L9.7 13z"/></svg>`;
    let starEmpty = `<svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.3" viewBox="0 0 17.4 17.3" overflow="visible"><g transform="translate(0 .5)" fill-rule="evenodd" clip-rule="evenodd"><polygon points="0,16.8 17.4,16.8 17.4,-0.5 0,-0.5" fill="#dcdce6"/><path d="M14.7 6.8h-4.6L8.7 2.4 7.2 6.8H2.6l3.8 2.7L5 13.9l3.8-2.7L11 9.5l3.7-2.7zm-6 4.3l2.6-.7 1.1 3.4-3.7-2.7z" fill="#fff"/></g></svg>`;
    let star = `<svg xmlns="http://www.w3.org/2000/svg" width="17.4" height="17.3" viewBox="0 0 17.4 17.3" overflow="visible"><g transform="translate(0 .5)" fill-rule="evenodd" clip-rule="evenodd"><polygon points="0,16.8 17.4,16.8 17.4,-0.5 0,-0.5" fill="#00b67a"/><path d="M14.7 6.8h-4.6L8.7 2.4 7.2 6.8H2.6l3.8 2.7L5 13.9l3.8-2.7L11 9.5l3.7-2.7zm-6 4.3l2.6-.7 1.1 3.4-3.7-2.7z" fill="#fff"/></g></svg>`;
    let starsContainer = "";
    let stars = reviews.score;

    if (stars % 1 != 0) {
      for (let i = 0; i < stars - 1; i++) {
        starsContainer += star;
      }
      starsContainer += starHalf;
      for (let i = 0; i < 5 - stars - 1; i++) {
        starsContainer += starEmpty;
      }
    } else {
      for (let i = 0; i < stars; i++) {
        starsContainer += star;
      }
      for (let i = 0; i < 5 - stars; i++) {
        starsContainer += starEmpty;
      }

      container.innerHTML = `<svg class="trustpilotLogo" width="98" height="24" viewBox="0 0 98 24" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <polygon id="a"
                    points="0.0520413687 0.0351614393 72.4868114 0.0351614393 72.4868114 15.8147403 0.0520413687 15.8147403" />
                <polygon id="c" points="0 0.0695061498 23.677176 0.0695061498 23.677176 22.4824378 0 22.4824378" />
            </defs>
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(24.945 8)">
                    <mask id="b" fill="#fff">
                        <use xlink:href="#a" />
                    </mask>
                    <path
                        d="M67.258 3.47h1.483V.764h1.96V3.47h1.768v1.485h-1.768V9.77c0 .21.008.387.026.545.017.15.06.28.121.386.06.106.156.185.286.238.13.052.295.079.52.079.14 0 .278 0 .417-.01.138-.008.277-.026.416-.06v1.537c-.217.026-.434.044-.633.07a4.987 4.987 0 01-.633.035c-.52 0-.937-.052-1.249-.15-.312-.096-.563-.245-.737-.438a1.531 1.531 0 01-.364-.72 5.468 5.468 0 01-.113-.994V4.973h-1.482V3.47h-.018zm-5.063 7.688a2.25 2.25 0 001.136-.281c.32-.184.58-.43.789-.73.208-.298.355-.64.46-1.018.095-.378.147-.765.147-1.16 0-.387-.052-.764-.148-1.151a3.024 3.024 0 00-.46-1.02 2.404 2.404 0 00-.788-.72 2.249 2.249 0 00-1.136-.28c-.434 0-.815.096-1.136.28-.32.185-.581.43-.79.72a3.205 3.205 0 00-.459 1.02 4.762 4.762 0 00-.147 1.15c0 .396.052.783.147 1.16.096.378.252.721.46 1.02.208.298.468.545.789.729.32.193.702.281 1.136.281zm0 1.573c-.711 0-1.344-.123-1.9-.36a4.192 4.192 0 01-1.413-.984 4.298 4.298 0 01-.875-1.503 5.87 5.87 0 01-.304-1.915 5.8 5.8 0 01.304-1.898c.2-.58.494-1.08.875-1.502a3.993 3.993 0 011.414-.984c.555-.238 1.188-.36 1.899-.36.71 0 1.344.122 1.899.36a4.192 4.192 0 011.413.984c.381.421.676.922.876 1.502.2.58.303 1.212.303 1.898 0 .694-.104 1.335-.303 1.915-.2.58-.495 1.08-.876 1.503a3.995 3.995 0 01-1.413.984c-.555.237-1.188.36-1.9.36zm-7.969-.246h1.96V.035h-1.96v12.45zm-3.71 0h1.959V3.47h-1.96v9.015zm0-10.57h1.959V.035h-1.96v1.88zm-3.46 6.071c0-.404-.052-.8-.156-1.186a3.219 3.219 0 00-.469-1.019 2.398 2.398 0 00-.771-.711 2.14 2.14 0 00-1.067-.273c-.823 0-1.448.29-1.864.87-.416.58-.624 1.353-.624 2.32 0 .456.052.878.165 1.265.112.386.268.72.494 1.001.217.281.477.501.78.66.304.166.66.245 1.058.245.45 0 .824-.097 1.136-.281.312-.184.563-.43.763-.72.2-.3.347-.633.433-1.01.078-.379.122-.765.122-1.16zm-6.85-4.516h1.855v1.222h.035c.278-.528.659-.896 1.153-1.125a3.757 3.757 0 011.604-.343c.703 0 1.31.123 1.83.378.52.246.954.589 1.3 1.028.347.44.599.95.772 1.529.174.58.26 1.204.26 1.863 0 .606-.078 1.194-.234 1.757a4.731 4.731 0 01-.702 1.511c-.312.44-.711.782-1.197 1.045-.485.264-1.049.396-1.708.396a4.73 4.73 0 01-.858-.08 3.753 3.753 0 01-.824-.254 2.967 2.967 0 01-.728-.448 2.77 2.77 0 01-.564-.633h-.035v4.499h-1.96V3.47zm-6.599 0h1.483V.764h1.96V3.47h1.769v1.485h-1.77V9.77c0 .21.01.387.027.545.017.15.06.28.121.386.06.106.156.185.286.238.13.052.295.079.52.079.14 0 .278 0 .417-.01.138-.008.277-.026.416-.06v1.537c-.217.026-.434.044-.633.07a4.985 4.985 0 01-.633.035c-.52 0-.936-.052-1.249-.15-.312-.096-.563-.245-.737-.438-.182-.194-.294-.43-.364-.72a5.484 5.484 0 01-.112-.994V4.973h-1.483V3.47h-.018zM27.14 9.594c.06.58.278.984.65 1.222.382.228.833.351 1.362.351.182 0 .39-.018.624-.044.234-.026.46-.088.66-.167.207-.079.372-.202.51-.36.13-.158.191-.36.183-.615a.854.854 0 00-.278-.624 1.948 1.948 0 00-.659-.395 6.527 6.527 0 00-.919-.255c-.347-.07-.694-.15-1.049-.229a9.876 9.876 0 01-1.058-.298 3.215 3.215 0 01-.91-.475 2.079 2.079 0 01-.642-.755c-.165-.308-.243-.686-.243-1.142 0-.492.122-.897.356-1.23.234-.334.537-.598.893-.8a4.104 4.104 0 011.205-.43c.442-.08.867-.124 1.266-.124.46 0 .902.053 1.318.15.416.096.798.255 1.136.483.338.22.616.51.841.861.225.352.364.782.425 1.283h-2.046c-.096-.475-.304-.8-.642-.958-.338-.167-.728-.246-1.162-.246-.139 0-.303.009-.494.035-.191.027-.364.07-.538.132a1.164 1.164 0 00-.425.281.685.685 0 00-.173.483c0 .246.087.44.251.589.165.15.382.272.65.378.27.097.573.184.92.255.347.07.702.15 1.066.228.356.08.703.185 1.05.299.346.114.65.272.919.474.268.202.485.448.65.747.165.299.251.677.251 1.116 0 .536-.121.984-.364 1.362a2.901 2.901 0 01-.936.905 4.367 4.367 0 01-1.284.51 6.358 6.358 0 01-1.396.157 5.848 5.848 0 01-1.56-.193 3.777 3.777 0 01-1.24-.58 2.865 2.865 0 01-.824-.975c-.2-.387-.303-.852-.32-1.388h1.976v-.018zm-3.338 2.89h-1.925v-1.256h-.035a2.691 2.691 0 01-1.075 1.09c-.477.272-.962.413-1.456.413-1.17 0-2.02-.29-2.54-.879-.521-.588-.781-1.476-.781-2.662V3.47h1.96v5.527c0 .79.147 1.353.45 1.678.295.325.72.492 1.257.492.417 0 .755-.062 1.032-.193.278-.132.503-.299.668-.519a2 2 0 00.373-.773c.078-.299.112-.624.112-.975V3.479h1.96v9.006zM9.581 3.47h1.838v1.74h.035c.06-.246.173-.483.338-.712a3.15 3.15 0 01.598-.632 3.18 3.18 0 01.78-.466 2.36 2.36 0 01.877-.176c.225 0 .39.01.476.018.087.009.174.026.27.035v1.916a6.236 6.236 0 00-.426-.062 3.573 3.573 0 00-.425-.026c-.329 0-.641.07-.936.202a2.161 2.161 0 00-.763.588c-.217.264-.39.58-.52.967-.13.386-.191.826-.191 1.327v4.287h-1.96V3.47h.01zM.061.035h9.945v1.88h-3.91v10.57h-2.15V1.915H.051V.035h.009z"
                        fill="#0F0F0F" />
                </g>
                <polygon fill="#00B67A" mask="url(#d)"
                    points="23.677176 8.63506842 14.6356823 8.63506842 11.8429429 0.0695061498 9.04147626 8.63506842 -1.74546201e-05 8.62638124 7.32219608 13.9255628 4.5207294 22.4824378 11.8429429 17.1919435 19.1564292 22.4824378 16.3636898 13.9255628" />
                <polygon fill="#005128" points="16.9272727 16.3309693 16.3836672 14.2222222 12.4727273 17.7777778" />
            </g>
        </svg><div class="starsContainer">${starsContainer}</div><span class="numberOfReviews"><span class="reviewsDot">•&nbsp; </span><span class="desktopText">Reviews ${reviews.numberOfReviews
        .toString()
        .replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )}+</span><span class="mobileText">Based on <span class="underlineReviews">${reviews.numberOfReviews
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}+ reviews</span></span>`;
    }
  } catch {}
}
