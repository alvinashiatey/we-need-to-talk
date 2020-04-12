import "./styles/main.scss";
import axios from "axios";

const apiCall = async () => {
  const channel = "bryant-wells-eeaqnoam1yc";
  const makeURL = (page, per) =>
    `http://api.are.na/v2/channels/${channel}?page=${page}&amp;per=${per}`;
  //
  axios
    .get(makeURL(1, 1))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

apiCall();

//
