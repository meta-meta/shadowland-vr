import {Entity} from 'aframe-react';
import React from 'react';
import Box from './Box';

import {hsvToHex} from '../util/colorConversion';

export default props => <Entity >
  {
    props.hand.fingers.map(
      (finger, i) => props.hand.confidence ? <Box key={i}
                                            color={hsvToHex(i / 5, 1, i < 2 ? 0.5 + props.hand.pinchStrength / 2 : 0.5 )}
                                            opacity={props.hand.confidence}
                                            width={0.01}
                                            height={0.01}
                                            depth={0.01}
                                            position={finger.toAframeString()}
      /> : null)
  }
  {
    props.hand.confidence ? <Box color={hsvToHex(0, 0, 0.5)}
                           opacity={props.hand.confidence}
                           width={0.01}
                           height={0.01}
                           depth={0.01}
                           position={props.hand.palm.toAframeString()}
                           scale={V3(1, 1, 1).add(V3(1, 1, 1).multiplyScalar(props.hand.grabStrength)).toAframeString()}
    /> : null
  }

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
