const videoListInput = document.getElementById('video-list');
const updateVideoListButton = document.getElementById('video-list-btn');
const videoContainer = document.getElementById('hytPlayerWrapOuter');

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Take an array of YT videos Ids, and insert them as elements into HTML
const injectLinksIntoNewElements = (ids) => {
  ids.forEach((id) => {
    // Create <iframe> element for video
    const iframe = document.createElement('iframe');
    setAttribute(iframe, {
      width: '640',
      height: '360',
      src: `https://www.youtube.com/embed/${id}?rel=0&enablejsapi=1`,
      frameborder: '0',
    });
    // Create div, and Put <iframe> into <div>
    const div = document.createElement('div');
    div.classList.add('hytPlayerWrap');
    div.appendChild(iframe);
    // Put div into Outer videoContainer
    videoContainer.appendChild(div);
  });
  hideRelated();
};

// Slice ID from youtube url
const getYoutubeVideoId = (url) => {
  let regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  let match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

// Create array of videos Ids from an array of links
const getYoutubeIdsArrayFromLinksInput = (input) => {
  result = [];

  for (let link of input.split(',')) {
    result.push(getYoutubeVideoId(link));
  }
  return result;
};

const updatePadsFromInputList = () => {
  // Get actual text from input
  const rawInput = videoListInput.value;
  // fetch youtube video Ids from raw input, into an array of ids
  const youtubeIdsArray = getYoutubeIdsArrayFromLinksInput(rawInput);

  injectLinksIntoNewElements(youtubeIdsArray);
};

updateVideoListButton.addEventListener('click', updatePadsFromInputList);
