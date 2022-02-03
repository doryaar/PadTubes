const addPadFromLinkButton = document.getElementById('add-btn');
const videoContainer = document.getElementById('video_wrap_outer');

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Take an array of YT videos Ids, and insert them as elements into HTML
const injectYoutubeIDIntoHtmlAsNewPadElement = (videoID) => {
  // Create <iframe> element for video
  const iframe = document.createElement('iframe');
  setAttribute(iframe, {
    width: '640',
    height: '360',
    src: `https://www.youtube.com/embed/${videoID}?rel=0&enablejsapi=1`,
    frameborder: '0',
  });
  // Create div, and Put <iframe> into <div>
  const div = document.createElement('div');
  div.classList.add('player_wrap');
  div.appendChild(iframe);
  // Put div into Outer videoContainer
  videoContainer.appendChild(div);
  // update HideRelated
  hideRelated();
};

// Slice ID from youtube url
const getYoutubeVideoId = (url) => {
  let regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  let match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

const updatePadsFromInputList = () => {
  const rawPromptInput = prompt('Insert YouTube Video Url:');

  const inputYoutubeVideoId = getYoutubeVideoId(rawPromptInput);

  injectYoutubeIDIntoHtmlAsNewPadElement(inputYoutubeVideoId);
};

addPadFromLinkButton.addEventListener('click', updatePadsFromInputList);
