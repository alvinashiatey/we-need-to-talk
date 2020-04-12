import "./styles/reset/reset.scss";
import "./styles/main.scss";
import axios from "axios";

const apiCall = async () => {
  const channel = "bryant-wells-eeaqnoam1yc";
  const makeURL = (page, per) =>
    `http://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;

  axios
    .get(makeURL(1, 1))
    .then((res) => {
      const transcription = document.getElementById("transcription");
      const dataTrs = res.data.contents[0].content_html;
      transcription.innerHTML = dataTrs;
    })
    .catch((err) => {
      console.log(err);
    });
};

apiCall();

//
