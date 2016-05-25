import React, { Component } from 'react';
import 'aframe';
import './util/shorthand';
import {Scene, Entity} from 'aframe-react';
import Camera from './components/Camera';
import Sky from './components/Sky';
import PointCloud from './components/PointCloud';

import stars from './stars';

import {Cursor} from 'react-cursor';

export class App extends Component {
  render() {
    const {cursor} = this.props;
    const leapCur = cursor.refine('leapMotion');

    window.stars = stars;
    const starVerts = stars.map(star => [star.X / 10, star.Y / 10, star.Z / 10]);

    return (
      <Scene onEnterVR={() => {leapCur.refine('isVR').set(true);}}
             onExitVR={() => {leapCur.refine('isVR').set(false);}}
      >
        <Entity camera look-controls wasd-controls="fly: true"/>
        <Sky/>

        {
          /*stars.map(star => <Entity position={`${star.X / 10} ${star.Y / 10} ${star.Z / 10}`} geometry="primitive: box; width: 1; height: 1; depth: 1" />)*/
        }
        <PointCloud vertices={starVerts} dotSize={2} gap={5} position="0 0 0" rotation={`0 0 0`} color="#FFF"/>
        <Entity position="0 0 0" geometry="primitive: sphere; radius: 0.35" />
      </Scene>
    );
  }
}