/**
 * @param
 *@description class created for adding functionality of adding forward and backward specified time and change playback speed
 */

class TImeController {
  constructor(player) {
    this.player = player;
  }
  /**
   *
   * @param {Number} defaultSpeed
   * @param {Array} speeds
   * @description takes in default speed and and speed array to create functionality for playback speed
   */
  createPlaybackRate(defaultSpeed, speeds) {
    const customComponent = videojs.getComponent('Component');

    // Create a custom component
    const speedSelection = new customComponent(this.player);
    // adding a classs to it to access it later and adding it to the control bar
    speedSelection.addClass('speed-select');
    this.player.controlBar.addChild(speedSelection, {}, 5);
    const speedSelect = document.querySelector('.speed-select');
    speedSelect.innerHTML = `
    <select class="speed-select" name="playbackspeed" >
      ${speeds
        .map(speed => {
          return `<option  ${
            speed === defaultSpeed ? 'selected' : ''
          } value="${speed}">${speed}X</option>`;
        })
        .join('')}
    </select>`;
    speedSelect.addEventListener(
      'change',
      function (e) {
        this._changePlaybackSpeed(parseFloat(e.target.value));
      }.bind(this)
    );
  }
  /**
   * @param {Number} speed
   * @description Change playback speed
   */
  _changePlaybackSpeed(speed) {
    this.player.playbackRate(speed);
  }
  /**
   * @param {number} TIME_SKIP_SEC
   * @param {string} forwardsvg
   * @param {string} backwardsvg
   * @description Takes in Time and two svg strings to display two buttons for forward and backward movement of time in the video by mentioned time in seconds
   */
  createSkip(TIME_SKIP_SEC, backwardsvg, forwardsvg) {
    const ButtonComp = videojs.getComponent('Button');

    // Create button componenets

    const forwardBtn = new ButtonComp(this.player, {
      clickHandler: function (e, time = TIME_SKIP_SEC) {
        this._timeControl(time);
      }.bind(this),
    });

    const backwardBtn = new ButtonComp(this.player, {
      clickHandler: function (e, time = -TIME_SKIP_SEC) {
        this._timeControl(time);
      }.bind(this),
    });

    // add class to button components to acces them later

    forwardBtn.addClass('forward-btn');
    backwardBtn.addClass('backward-btn');

    // add button components to the control bar

    this.player.controlBar.addChild(backwardBtn, {}, 2);
    this.player.controlBar.addChild(forwardBtn, {}, 3);

    // add svg icons to the button components

    document.querySelector('.forward-btn .vjs-icon-placeholder').innerHTML =
      forwardsvg;
    document.querySelector('.backward-btn .vjs-icon-placeholder').innerHTML =
      backwardsvg;
  }
  /**
   *
   * @param {number} time
   * @description does the actual movemnt of time both forward and backward by taking in positive and negaitve value respectively
   */
  _timeControl(time) {
    this.player.currentTime(this.player.currentTime() + time);
  }
}
export default TImeController;
