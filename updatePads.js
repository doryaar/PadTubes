const addPadButton = document.getElementById('add-btn');
const removePadButton = document.getElementById('remove-btn');
const videoContainer = document.getElementById('video_wrap_outer');
const allCurrentPads = [];

function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

const cleanPadsContainer = () => {
  videoContainer.innerHTML = '';
};

// Take an array of YT videos Ids, and insert them as elements into HTML
const updateHtmlFromAllCurrentPads = () => {
  cleanPadsContainer();

  allCurrentPads.forEach((videoID) => {
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
  });
  // update hideRelated script
  hideRelated();
};

// Returns Video-ID from youtube url
const regxVideoIdFromYoutubeUrl = (url) => {
  let regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  let match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};

// Return false if invalid input
const askForYoutubeLinkAndReturnVideoID = (promptText) => {
  const rawPromptInput = prompt(`${promptText}`);
  if (rawPromptInput) {
    return regxVideoIdFromYoutubeUrl(rawPromptInput);
  }
  else return false;
};

const deletePad = (videoId) => {
  if (allCurrentPads.includes(videoId)) {
    const removeIndex = allCurrentPads.indexOf(videoId);
    if (removeIndex !== -1) {
      allCurrentPads.splice(removeIndex, 1);
      updateHtmlFromAllCurrentPads();
    }
  }
};

const addPadFromInputLink = () => {
  const videoId = askForYoutubeLinkAndReturnVideoID(
    'Insert YouTube Video Url:'
  );

  if (videoId) {
    allCurrentPads.push(videoId);
    updateHtmlFromAllCurrentPads();
  } else return;
};

const removePadFromInputLink = () => {
  const videoId = askForYoutubeLinkAndReturnVideoID(
    'Insert YouTube Video Url to Remove:'
  );

  if (videoId) {
    deletePad(videoId);
  } else return;
};

addPadButton.addEventListener('click', addPadFromInputLink);
removePadButton.addEventListener('click', removePadFromInputLink);
