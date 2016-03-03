import React, { Component } from 'react';
import 'aframe';
import './util/shorthand';
import {Scene, Entity} from 'aframe-react';
import Camera from './components/Camera'
import Image from './components/Image'
import Sky from './components/Sky'
import Text from './components/Text'


export class App extends Component {
  render() {
    return (
      <Scene>
        <Camera/>
        <Sky/>

        <Image position="0 0 -5" rotation="0 0 90" url="images/test.jpg" pixelsPerMeter={300} />


          { // not working at the moment
          false ? <Text text={{text: "Hello there, World", size:0.2}}
                        position="0 0 -5"
                        material={{color: '#fff'}}
          /> : null
        }
      </Scene>
    );
  }
}