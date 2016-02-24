import {Entity} from 'aframe-react';
import React from 'react';

import {aframeCore} from 'aframe';
import {component} from 'aframe-text-component';
aframeCore.registerComponent('text', component);

export default props =>
    <Entity {...props}/>;
