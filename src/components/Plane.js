import {Entity} from 'aframe-react';
import React from 'react';

class Plane extends React.Component {
    render() {
        const {width, height, color} = this.props;
        return (
            <Entity material={{color}}
                    {...this.props}
                    geometry={{primitive: 'plane', width, height}}
            />
        );
    }
}

export default Plane;
