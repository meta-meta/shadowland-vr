import {Entity} from 'aframe-react';
import React from 'react';

class Sound extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(!this.props.isPlaying && nextProps.isPlaying) {
      this.sound && this.sound.play();
    }
  }

  render() {
    const onLoaded = evt => {
      const el = evt.target;
      this.sound = el.components.sound;

      if(this.props.isPlaying){
        this.sound.play();
      }

      el.addEventListener('sound-ended', () => {
        this.props.onEnded();
        this.isPlaying = false;
      });
    };

    return (
      <Entity {...this.props}
        sound={{src: this.props.src, autoplay: false}}
        onLoaded={onLoaded}
      />
    )
  }
}

Sound.defaultProps = {
  onEnded: () => {},
};

export default Sound;