import {Entity} from 'aframe-react';
import React, {PropTypes} from 'react';
import LeapMotionHand from './LeapMotionHand';

import 'leapjs-plugins';
import Leap from 'leapjs';

import {Cursor} from 'react-cursor';

import _ from 'lodash';

class LeapMotion extends React.Component {
  static propTypes = {
    cursor: PropTypes.instanceOf(Cursor),
  };

  componentDidMount() {
    const cursor = this.props.cursor;

    Leap.loop({background: true}, (frame) => {
        _.each(frame.hands, hand => cursor.refine(hand.type).set({
          confidence: hand.confidence,
          fingers: hand.fingers.map(finger => arrToV3(finger.tipPosition).divideScalar(1000)),
          palm: arrToV3(hand.palmPosition).divideScalar(1000),
          pitchYawRoll: V3(hand.pitch(), -hand.yaw(), hand.roll()).multiplyScalar(180 / Math.PI),
          pinchStrength: hand.pinchStrength,
          grabStrength: hand.grabStrength,
        }));
      })
      .use('handEntry')
      .on('handFound', (hand) => {
      })
      .on('handLost', (hand) => {
        cursor.refine(hand.type, 'confidence').set(0);
      });
  }

  render() {
    const {isVR, left, right} = this.props.cursor.value();
    return (
      <Entity rotation={isVR ? "90 0 180" : "0 0 0"}
              position={isVR ? "0 0 0" : "0 -0.2 -0.7"}>
        <LeapMotionHand hand={left}/>
        <LeapMotionHand hand={right}/>
      </Entity>
    );
  }
}

export default LeapMotion;
