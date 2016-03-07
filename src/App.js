import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'aframe';
import './util/shorthand';
import {Scene, Entity} from 'aframe-react';
import Camera from './components/Camera';
import Image from './components/Image';
import Sky from './components/Sky';
import Text from './components/Text';
import Hand from './components/Hand';

import _ from 'lodash';
import 'leapjs-plugins';
import Leap from 'leapjs';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      isVR: false,
      leapFrame: undefined,
      left: {
        confidence: 0,
        fingers: [],
        palm: V3(),
        pitchYawRoll: V3(),
        grabStrength: 0,
        pinchStrength: 0,
      },
      right: {
        confidence: 0,
        fingers: [],
        palm: V3(),
        pitchYawRoll: V3(),
        grabStrength: 0,
        pinchStrength: 0,
      },
    };

    Leap.loop({background: true}, (frame) => {
        if (frame.hands.length) {
          //debugger;
        }
        _.each(frame.hands, hand => this.setState({
          [hand.type]: {
            confidence: hand.confidence,
            fingers: hand.fingers.map(finger => arrToV3(finger.tipPosition).divideScalar(1000)),
            palm: arrToV3(hand.palmPosition).divideScalar(1000),
            pitchYawRoll: V3(hand.pitch(), -hand.yaw(), hand.roll()).multiplyScalar(180 / Math.PI),
            pinchStrength: hand.pinchStrength,
            grabStrength: hand.grabStrength,
          }
        }));
      })
      .use('handEntry')
      .on('handFound', (hand) => {
      })
      .on('handLost', (hand) => {
        this.setState({[hand.type]: _.extend(this.state[hand.type], {confidence: 0})});
      })

  }

  render() {
    const {left, right} = this.state;

    return (
      <Scene onEnterVR={() => {this.setState({isVR: true});}}
             onExitVR={() => {this.setState({isVR: false});}}
      >
        <Camera>
          <Entity rotation={this.state.isVR ? "90 0 180" : "0 0 0"}
                  position={this.state.isVR ? "0 0 0" : "0 -0.2 -0.7"}>
            <Hand hand={left}/>
            <Hand hand={right}/>
          </Entity>
        </Camera>
        <Sky/>

      </Scene>
    );
  }
}