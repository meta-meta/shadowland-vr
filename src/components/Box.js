import {Entity} from 'aframe-react';
import React from 'react';

class Box extends React.Component {
    render() {
        const {width, height, depth, color} = this.props;
        return (
            <Entity material={{color}}
                {...this.props}
                    geometry={{primitive: 'box', width, height, depth}}
            />
        );
    }
}

export default Box;
