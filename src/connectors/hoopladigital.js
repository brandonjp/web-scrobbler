"use strict";

// noisetrade does this... not sure if we should or not
// $('video').first().bind('playing pause', Connector.onStateChanged);

let useScreenText = true;
let useMediaElement = false;
let useSliderPositions = false;

let mediaElement = document.querySelector('video');

// '[id*="ControlsContainer"]'
let musicSelector = "#musicControlsContainer";
let audiobookSelector = "#audiobookControlsContainer";
let currentPlayerSelector = `${audiobookSelector}`;

let isMusic = !!$(`${currentPlayerSelector}`).length;
let isAudiobook = !!$(`${currentPlayerSelector}`).length;

Connector.playerSelector = `${currentPlayerSelector}`;
Connector.isPlaying = () => !!$('button[aria-label="Pause"]').length;
Connector.trackArtSelector = `${Connector.playerSelector} div[role="main"] img`;

if (isAudiobook) {

  Connector.artistSelector = `${Connector.playerSelector} ._2OWZqLIjt4iVi6S6YV69RM > div:last-child`;
  Connector.trackSelector = `${Connector.playerSelector} ._2OWZqLIjt4iVi6S6YV69RM > div:first-child`;
  Connector.albumSelector = `${Connector.trackSelector}`;
  Connector.getArtist = () => {
    let imgAlt = $(`${Connector.trackArtSelector}`).attr('alt');
    return imgAlt.split(' by ')[0];
	};

  if (useScreenText) {
    Connector.currentTimeSelector = `${Connector.playerSelector} [role="slider"]:eq(1) + div > span:first-child`;
    Connector.durationSelector = `${Connector.playerSelector} [role="slider"]:eq(1) + div > span:last-child`;
  } else if (useSliderPositions) {
    Connector.getCurrentTime = () => $(`${Connector.playerSelector} [role="slider"]:eq(1)`).attr('aria-valuenow');
    Connector.getDuration = () => $(`${Connector.playerSelector} [role="slider"]:eq(1)`).attr('aria-valuemax');
  } else if (useMediaElement) {
    Connector.getCurrentTime = () => mediaElement.currentTime;
    Connector.getDuration = () => mediaElement.duration;
    Connector.isPlaying = () => !mediaElement.paused;
  }

}
