import {Entity} from 'aframe-react';
import React from 'react';

export default props =>
    <Entity geometry={{primitive: 'sphere', radius: 5000}}
            material={{color: "#000", shader: 'flat'}}
            scale="1 1 -1"/>;
