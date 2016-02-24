import React, { Component } from 'react';
import 'aframe';
import {Scene, Entity} from 'aframe-react';
import Camera from './components/Camera'
import Image from './components/Image'
import Sky from './components/Sky'
import Text from './components/Text'

import { NICE, SUPER_NICE } from './colors';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 3000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Text text={{text: `Counter (${this.props.increment}): ${this.state.counter}`}}
            material={{color: this.props.color}}/>
    );
  }
}

export class App extends Component {
  render() {
    return (
        <Scene>
          <Camera/>
          <Sky/>
          <Image position="0 0 -5" rotation="0 0 90" url="images/test.jpg" pixelsPerMeter={300} />

          <Entity position="-2 2 -4">
            <Counter increment={1} color={NICE} />
          </Entity>
          <Entity position="-2 1 -4">
            <Counter increment={5} color={SUPER_NICE} />
          </Entity>
          <Text text={{text: 'It takes some time to extrude new text.', size: 0.2}}
                position="-2 -1 -4"
                material={{color: this.props.color}}/>
          <Text text={{text: 'Thus the lag when the timer updates', size: 0.2}}
                position="-2 -1.25 -4"
                material={{color: this.props.color}}/>
        </Scene>
    );
  }
}