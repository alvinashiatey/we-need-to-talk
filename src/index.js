import "./styles/reset/reset.scss";
import "./styles/main.scss";
import axios from "axios";
import runtime from "serviceworker-webpack-plugin/lib/runtime";

const apiCall = async () => {
  const channel = "bryant-wells-eeaqnoam1yc";
  const makeURL = (page, per) =>
    `http://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;

  axios
    .get(makeURL(1, 1))
    .then((res) => {
      const transcription = document.getElementById("transcription");
      const dataTrs = res.data.contents[0].content_html;
      const interviewReq = document.querySelector(".interview__req");
      interviewReq.addEventListener("click", (e) => {
        e.preventDefault();
        transcription.innerHTML = dataTrs;
        if ("caches" in window) {
          caches.open("interviews").then((cache) => {
            cache.add(makeURL(1, 1));
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

apiCall();

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

  console.log();

  play.addEventListener("click", () => {
    if (playing) {
      song.play();
      playing = false;
      iconChnage.setAttribute("xlink:href", "/assets/sprite.svg#icon-pause");
    } else {
      song.pause();
      playing = true;
      iconChnage.setAttribute("xlink:href", "/assets/sprite.svg#icon-play3");
    }
  });
};

musicPlayer();
