import TimeController from './TimeController.js';
import {
  backwardsvg,
  forwardsvg,
  TIME,
  SPEED_DEFAULT,
  SPEEDS_ARR,
} from './config.js';

var player = videojs(
  'my-video',
  {
    controls: true,
    fluid: true,
    html5: {
      vhs: {
        overrideNative: true,
      },
    },
  },
  function () {
    var player = this;
    player.eme();
    player.src({
      src: 'https://cdn.bitmovin.com/content/assets/art-of-motion_drm/mpds/11331.mpd',
      type: 'application/dash+xml',
      keySystems: {
        'com.widevine.alpha': 'https://cwip-shaka-proxy.appspot.com/no_auth',
      },
    });

    player.ready(function () {
      player.tech(true).on('keystatuschange', function (event) {
        console.log('event: ', event);
      });
      // passing in the player into TimeContoller constructor
      const timeControl = new TimeController(player);

      // adding functionality of backward and forward movement of video by "TIME" seconds
      timeControl.createSkip(TIME, backwardsvg, forwardsvg);

      // adding functionality of speed up and down based on SPEED_DEFAULT and SPEED_ARR which defines available speeds
      timeControl.createPlaybackRate(SPEED_DEFAULT, SPEEDS_ARR);
    });
  }
);
