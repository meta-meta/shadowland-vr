import {Entity} from 'aframe-react';
import React from 'react';

export default props => {
  const geometry = {
    primitive: 'ring',
    radiusInner: 0.0001,
    radiusOuter: 0.00016
  };
  const material = {
    color: props.color,
    shader: 'flat',
    opacity: props.opacity || 0.09,
    transparent: true
  };
  return (
    <Entity cursor={props} geometry={geometry} material={material}
            position="0 0 -1"/>
  );
}
