import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'aframe';
import './util/shorthand';
import {Scene, Entity} from 'aframe-react';
import Camera from './components/Camera';
import Image from './components/Image';
import Sky from './components/Sky';
import Text from './components/Text';
import LeapMotion from './components/LeapMotion';

import {Cursor} from 'react-cursor';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      leapMotion: {
        isVR: false,
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
      },
    };
  }

  render() {
    const cursor = Cursor.build(this);
    const leapCur = cursor.refine('leapMotion');

    return (
      <Scene onEnterVR={() => {leapCur.refine('isVR').set(true);}}
             onExitVR={() => {leapCur.refine('isVR').set(false);}}
      >
        <Camera>
          <LeapMotion cursor={leapCur} />
        </Camera>
        <Sky/>

      </Scene>
    );
  }
}