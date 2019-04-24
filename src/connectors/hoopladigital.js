"use strict";

// $('video').first().bind('playing pause', Connector.onStateChanged);

// '[id*="ControlsContainer"]'
const musicSelector = "#musicControlsContainer";
const audiobookSelector = "#audiobookControlsContainer";

const getPlayerWrapper = () => $(`${musicSelector}, ${audiobookSelector}`);
const getCurrentPlayerSlider = () => getPlayerWrapper().find('[role="slider"]:eq(1)');
const isMusicPlayer = () => !!$(`${musicSelector}`).length;

const musicControlsChild = '._2jUesww3ZWJuIQecXKG0nX';

const musicMetaWrap = '._2cWWrzqjTPrsKdttqGRQCJ';
const audiobookMetaWrap = '._2OWZqLIjt4iVi6S6YV69RM';
const trackWrap = 'div:first-child';
const albumArtistWrap = 'div:last-child';

const getMusicArtist = () => Util.splitArtistTrack(getPlayerWrapper().find(`${musicMetaWrap} > ${albumArtistWrap}`).text()).track;
const getAudiobookArtist = () => getPlayerWrapper().find(`${audiobookMetaWrap} > ${albumArtistWrap}`).text();

const getMusicTrack = () => getPlayerWrapper().find(`${musicMetaWrap} > ${trackWrap}`).text();
const getAudiobookTrack = () => getPlayerWrapper().find(`${audiobookMetaWrap} > ${trackWrap}`).text();

const getMusicAlbum = () => Util.splitArtistTrack(getPlayerWrapper().find(`${musicMetaWrap} > ${albumArtistWrap}`).text()).artist;
const getAudiobookAlbum = () => getPlayerWrapper().find(`${audiobookMetaWrap} > ${trackWrap}`).text();

Connector.playerSelector = '#app > div > div > div > div[data-radium="true"]:not(#update-modal)';

Connector.getArtist = () => isMusicPlayer() ? getMusicArtist() : getAudiobookArtist();
Connector.getTrack = () => isMusicPlayer() ? getMusicTrack() : getAudiobookTrack();
Connector.getAlbum = () => isMusicPlayer() ? getMusicAlbum() : getAudiobookAlbum();
Connector.getTrackArt = () => getPlayerWrapper().find('div[role="main"] img').attr('src');

Connector.getDuration = () => getCurrentPlayerSlider().find('input').attr('max');
Connector.getCurrentTime = () => getCurrentPlayerSlider().find('input').attr('value');
Connector.isPlaying = () => !$('button[aria-label="Pause"]').length;
Connector.getUniqueID = () => Connector.getTrackArt().split('.net/').slice(-1)[0]+`_${Connector.getTrack()}`+"_dev123";
