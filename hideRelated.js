// from: https://maxl.us/hide-related
'use strict';
function hideRelated() {

  let onYouTubeIframeAPIReadyCallbacks = [];
  for (let playerWrap of document.querySelectorAll('.player_wrap')) {
    let playerFrame = playerWrap.querySelector('iframe');
    
    let onPlayerStateChange = function (event) {
      if (event.data == YT.PlayerState.ENDED) {
        playerWrap.classList.add('ended');
      } else if (event.data == YT.PlayerState.PAUSED) {
        playerWrap.classList.add('paused');
      } else if (event.data == YT.PlayerState.PLAYING) {
        playerWrap.classList.remove('ended');
        playerWrap.classList.remove('paused');
      }
    };

    let player;
    onYouTubeIframeAPIReadyCallbacks.push(function () {
      player = new YT.Player(playerFrame, {
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    });

    playerWrap.addEventListener('click', () => {
      const statusesToPlay = [YT.PlayerState.PAUSED, YT.PlayerState.CUED, YT.PlayerState.UNSTARTED];
      if (player.getPlayerState) {
        let playerState = player.getPlayerState();
        if (playerState == YT.PlayerState.ENDED) {
          player.seekTo(0);
        } else if (statusesToPlay.includes(playerState)) {
          player.playVideo();
        }
      }
    });
  }

  window.onYouTubeIframeAPIReady = function () {
    luanchCallbacks();
  };
  
  // Added as function and call as deafault, in case of new videos input
  const luanchCallbacks = () => {
    for (let callback of onYouTubeIframeAPIReadyCallbacks) {
        callback();
      }
  };

  if (window.hideYTActivated) {
    luanchCallbacks();
  }
  
  window.hideYTActivated = true;
};

document.addEventListener('DOMContentLoaded', hideRelated);