import "./styles/reset/reset.scss";
import "./styles/main.scss";
import {
  revealBtn,
  revealAboutUs,
  hideAboutUs,
  revealparagraph,
} from "./js/animation";
import axios from "axios";
import runtime from "serviceworker-webpack-plugin/lib/runtime";
import gsap from "gsap";

const musicDiv = document.querySelector(".music__btn");
const transcription = document.getElementById("transcription");
const interviewP = document.querySelectorAll("#transcription p");

const addTargetLink = (str) => {
  const regSpaceBtnA = /((<a)\s(?=href))/gi;
  let pArr = str.replace(regSpaceBtnA, "$1 target='_blank' ");
  return pArr;
};

const classnameTag = (str2, loc2, p) => {
  const regB = /(<)(p)(>)(Bryant:)/gi;
  let sArr = str2.replace(
    regB,
    '$1$2 class = "int__paragraph" $3 <span class = "int__name">$4</span> '
  );
  loc2.innerHTML = sArr;
};

const apiCall = async () => {
  const channel = "bryant-wells-eeaqnoam1yc";
  const makeURL = (page, per) =>
    `https://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;
  const url = "https://api.are.na/v2/channels/652012/contents";

  const data = axios
    .get(makeURL(1, 1))
    .then((res) => {
      const dataTrs = res.data.contents[0].content_html;
      const interviewReq = document.querySelector(".interview__req");
      interviewReq.addEventListener("click", (e) => {
        e.preventDefault();

        gsap.set(interviewReq, {
          writingMode: "vertical-rl",
        });
        //Regex funtion on strings
        let text = addTargetLink(dataTrs);
        classnameTag(text, transcription, interviewP);
        //revealparagraph(transcription.children, 0.1);

        if ("caches" in window) {
          caches.open("interviews").then((cache) => {
            cache.add(makeURL(1, 1));
          });
        }
      });
      return dataTrs;
    })
    .catch((err) => {
      console.log(err);
    });

  //images
  axios.get(url).then((res) => {
    const imgArr = res.data.contents;
    const refPanel = document.querySelector(".img__postion");
    const template = (link) =>
      `<img src="${link}" alt="bryant-wells" style = "width: 100%">`;

    for (let i = 1; i < imgArr.length; i++) {
      const e = imgArr[i].image;
      if (e) {
        let elink = imgArr[i].image.display.url;
        refPanel.insertAdjacentHTML("beforeend", template(elink));
      } else if (e === null) {
        let vlink = imgArr[i].attachment.url;
        refPanel.insertAdjacentHTML("beforeend", template(vlink));
      }
    }
  });
  return data;
};

//service worker

if (
  "serviceWorker" in navigator &&
  (window.location.protocol === "https:" ||
    window.location.hostname === "localhost")
) {
  //Dont register till everything is okay
  //const registration = runtime.register();
}

//music

const musicPlayer = () => {
  let playing = true;
  let song = document.querySelector(".song");
  let play = document.getElementById("play");
  let iconChnage = document.querySelector("#play use");

  play.addEventListener("click", () => {
    if (playing) {
      song.play();
      playing = false;
      iconChnage.setAttribute("xlink:href", "/assets/sprite.svg#icon-pause");
      song.addEventListener("ended", () => {
        iconChnage.setAttribute("xlink:href", "/assets/sprite.svg#icon-play3");
      });
    } else {
      song.pause();
      playing = true;
      iconChnage.setAttribute("xlink:href", "/assets/sprite.svg#icon-play3");
    }
  });
};

musicPlayer();

//Animation calls
const animationCalls = () => {
  const interviewReq = document.querySelector(".interview__req");
  let aboutUs = document.querySelector(".about-us__info");
  const aboutUsBtn = document.querySelector(".about-us__btn");
  let state = true;
  let r = true;

  interviewReq.addEventListener("click", (e) => {
    if (state) {
      state = !state;
      revealBtn(musicDiv, 0.6);
    }
  });
  aboutUsBtn.addEventListener("click", () => {
    if (r) {
      r = !r;
      revealAboutUs(aboutUs, 1);
    } else {
      r = !r;
      hideAboutUs(aboutUs, 1);
    }
  });

  const str = apiCall();
  str.then((res) => {
    const regA = /<p>[\w].+?\/p>/gi;
    const pTags = res.match(regA);
  });
};

animationCalls();

//sticky top fucntion

const stickyNav = () => {
  if (musicDiv) {
    let stickTop = musicDiv.offsetTop;
    document.addEventListener("scroll", () => {
      if (window.scrollY >= stickTop) {
        musicDiv.classList.add("fixedNav");
      } else {
        musicDiv.classList.remove("fixedNav");
      }
    });
  }
};

stickyNav();

// loop through links

const loopLinks = () => {
  let interviewReq = document.querySelector(".interview__req").innerHTML;
  let letter = interviewReq.split(/(\w)/i);
  let fLetter = letter[1];
  console.log(fLetter);
};

loopLinks();
