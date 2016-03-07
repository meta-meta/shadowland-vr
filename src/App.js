import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'aframe';
import './util/shorthand';
import {Scene, Entity} from 'aframe-react';
import Camera from './components/Camera';
import Image from './components/Image';
import Sky from './components/Sky';
import Text from './components/Text';
import Box from './components/Box';
import {hsvToHex} from './util/colorConversion';

import _ from 'lodash';
import Leap from 'leapjs';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      leapFrame: undefined,
      left: {
        fingers: [],
        palm: V3(),
        pitchYawRoll: V3(),
        grabStrength: 0,
        pinchStrength: 0,
      },
      right: {
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
          fingers: hand.fingers.map(finger => arrToV3(finger.tipPosition).divideScalar(1000)),
          palm: arrToV3(hand.palmPosition).divideScalar(1000),
          pitchYawRoll: V3(hand.pitch(), -hand.yaw(), hand.roll()).multiplyScalar(180 / Math.PI),
          pinchStrength: hand.pinchStrength,
          grabStrength: hand.grabStrength,
        }
      }));
    });
    //  .use('handEntry')
    //.on('handFound', (hand) => {
    //
    //})

  }

  render() {
    const {left, right} = this.state;

    const hand = (hand) => <Entity >
      {
        hand.fingers.map(
          (finger, i) => <Box key={i}
                              color={hsvToHex(i / 5, 1, i < 2 ? 0.5 + hand.pinchStrength / 2 : 0.5 )}
                              width={0.01}
                              height={0.01}
                              depth={0.01}
                              position={finger.toAframeString()}
          />)
      }
      <Box color={hsvToHex(0, 0, 0.5)}
           width={0.01}
           height={0.01}
           depth={0.01}
           position={hand.palm.toAframeString()}
           scale={V3(1, 1, 1).add(V3(1, 1, 1).multiplyScalar(hand.grabStrength)).toAframeString()}
      />
      {
        /*<Entity position={hand.palm.toAframeString()}
         rotation={hand.pitchYawRoll.toAframeString()}
         ref={(cmp)=>{
         //const el = ReactDOM.findDOMNode(cmp);
         //console.log(el && el.object3D)
         }}
         >
         <Box color={hsvToHex(0, 1, 0.5)}
         width={0.02}
         height={0.01}
         depth={0.02}
         position="-0.01 0 0.01"
         />

         <Box color={hsvToHex(0.2, 1, 0.5)}
         width={0.02}
         height={0.01}
         depth={0.02}
         position="0.01 0 0.01"
         />

         <Box color={hsvToHex(0.4, 1, 0.5)}
         width={0.02}
         height={0.01}
         depth={0.02}
         position="-0.01 0 -0.01"
         />

         <Box color={hsvToHex(0.8, 1, 0.5)}
         width={0.02}
         height={0.01}
         depth={0.02}
         position="0.01 0 -0.01"
         />
         </Entity>*/
      }

    </Entity>;


    return (
      <Scene>
        <Camera/>
        <Sky/>

        <Entity position="0 -0.2 -0.2">
          {hand(left)}
          {hand(right)}
        </Entity>

      </Scene>
    );
  }
}