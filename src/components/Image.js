import React from 'react';
import {Entity} from 'aframe-react';
import Plane from './Plane';

class Image extends React.Component {
  constructor() {
    super();

    this.state = {
      imgWidth: 0,
      imgHeight: 0,
    };
  }

  componentWillMount() {
    let img = document.createElement('img');

    let wait = setInterval(() => {
      if(img.width) {
        this.setState({imgWidth: img.width, imgHeight: img.height});
        clearInterval(wait);
      }
    }, 100);

    img.setAttribute('src', this.props.url);
  }

  render() {
    const {imgWidth, imgHeight} = this.state;
    //TODO: if only width specified, size to that; if only height, ' '
    const width = imgWidth / this.props.pixelsPerMeter;
    const height = imgHeight / this.props.pixelsPerMeter;

    return (
      <Plane {...this.props}
        width={this.props.width || width}
        height={this.props.height || height}
        material={{src: `url(${this.props.url})`, transparent: true, opacity: this.props.opacity}}
      />
    );
  }
}

Image.defaultProps = {
  pixelsPerMeter: 1000,
  opacity: 1,
};

export default Image;