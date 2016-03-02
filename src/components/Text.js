import {Entity} from 'aframe-react';
import React from 'react';

import {registerComponent} from 'aframe';
import {component} from 'aframe-text-component';
registerComponent('text', component);

export default props => <Entity {...props}/>;
