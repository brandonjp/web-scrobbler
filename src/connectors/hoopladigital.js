// *** for any players *** //
// div[id*="ControlsContainer"] is the actual player but it gets created/destroyed when switching from audiobook to music that web-scrobbler can't keep a handle on it (*i think)
// Connector.playerSelector = '#app div[id*="ControlsContainer"]';
Connector.playerSelector = '#app > div:first-child > div:first-child > div:first-child > div[id*="ControlsContainer"]';
Connector.playButtonSelector = 'button[aria-label="Play"], button[aria-label="Pause"]';
Connector.isPlaying = () => !!$('button[aria-label="Pause"]').length;
Connector.trackArtSelector = `${Connector.playerSelector} div[role="main"] img`;

// combining both music and audiobook selectors from the player bar
const Audiobook_metaWrap = '._2OWZqLIjt4iVi6S6YV69RM'
const Music_metaWrap = '._2cWWrzqjTPrsKdttqGRQCJ';
const Audiobook_trackSelector = `${Audiobook_metaWrap} > ._3DF8icl1qNjH9jHEXlOh1X`
const Music_trackSelector = `${Music_metaWrap} > ._2ssCZ5gIrSlfqAPz7dDm0M`;
Connector.trackSelector = `${Audiobook_trackSelector}, ${Music_trackSelector}`;

// on hoopla music tracks when using Utils split, the 'artist' is actually the album & 'track' is artist
const getAlbumArtistText = () => $(`${Audiobook_metaWrap}, ${Music_metaWrap}`).find('div:last-child').text();
const getAlbumAristObj = () => {
  let text = getAlbumArtistText();
  let splitArray = text.split(' - ');
  let artist = splitArray.pop();
  let album = splitArray.join(' - ');
  return { artist:artist, album:album };
}

Connector.getArtist = () => {
  let text = getAlbumArtistText();
  let split = getAlbumAristObj();
  return ((split||{}).album) ? split.artist : text;
}

Connector.getAlbum = () => {
  let text = getAlbumArtistText();
  let split = getAlbumAristObj();
  return ((split||{}).album) ? split.album : $(Connector.trackSelector).text();
}

Connector.getUniqueID = () => {
  let trackName = $(`${Connector.trackSelector}`).text().trim();
  return $(`${Connector.trackArtSelector}`).attr('src').split('.net/').slice(-1)[0]+`_${trackName}_dev426`;
}

const $playerSlider = $('#app > div > div > div:first-child > div[id*="ControlsContainer"] > div > div:last-child div[role="slider"]');
Connector.getDuration = () => $playerSlider.attr('aria-valuemax');
Connector.getCurrentTime = () => $playerSlider.attr('aria-valuenow');
