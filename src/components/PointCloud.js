import {Entity} from 'aframe-react';
import React from 'react';
import _ from 'lodash';

const getImageData = ( image ) => {
  var canvas = document.createElement( 'canvas' );
  canvas.width = image.width;
  canvas.height = image.height;

  var context = canvas.getContext( '2d' );
  context.drawImage( image, 0, 0 );

  return context.getImageData( 0, 0, image.width, image.height );

};

const getPixel = ( imagedata, x, y ) => {

  var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
  return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };

}


class PointCloud extends React.Component {


  onLoaded = (evt, image, gap, dotSize) => {
    const el = evt.target;
    const obj = el.object3D;

    var geometry = new THREE.BufferGeometry();

    const vertices = _.flatten(this.props.vertices);

    geometry.addAttribute( 'position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    //geometry.addAttribute( 'color', new THREE.BufferAttribute(vertices, 3));

    var numVertices = geometry.attributes.position.count;
    var alphas = new Float32Array( numVertices * 1 ); // 1 values per vertex

    for( var i = 0; i < numVertices; i++ ) {
      alphas[ i ] = Math.random() * 0.7;
    }

    geometry.addAttribute( 'alpha', new THREE.BufferAttribute( alphas, 1 ) );

    var texture = new THREE.TextureLoader().load( "images/star-smiley-234.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    var shaderMaterial = new THREE.ShaderMaterial( {
      uniforms: {
        color: { type: "c", value: new THREE.Color( this.props.color ) },
        texture:   { type: "t", value: texture },
      },
      vertexShader:   `
            attribute float alpha;
            varying float vAlpha;

            void main() {
                vAlpha = alpha;
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_PointSize = ${dotSize * 10}.0 / -mvPosition.z;
                gl_Position = projectionMatrix * mvPosition;
            }
          `,
      fragmentShader: `
            uniform vec3 color;
            uniform sampler2D texture;
            varying float vAlpha;

            void main() {
              vec4 color = vec4( color, vAlpha ) * texture2D( texture, gl_PointCoord );
              gl_FragColor = color;
            }
          `,
      transparent:    true

    });

    shaderMaterial.blending = THREE.AdditiveBlending;
    shaderMaterial.depthTest = false;
    window.mat = shaderMaterial;

    this.cloud = new THREE.Points( geometry, shaderMaterial );

    obj.add( this.cloud );


    const animate = () => {
      this.lastFrame = new Date();
      var alphas = this.cloud.geometry.attributes.alpha;
      var count = alphas.count;

      for (var i = 0; i < count; i++) {

        // dynamically change alphas
        alphas.array[i] *= 0.999;

        if (alphas.array[i] < 0.5) {
          alphas.array[i] = Math.random();
        }

      }

      alphas.needsUpdate = true; // important!

    };

    setInterval(animate, 20);

  };

  render() {




    const {image, gap, dotSize} = this.props;

    return (
      <Entity {...this.props}
        onLoaded={evt => this.onLoaded(evt, image, gap, dotSize)}
        key={`${image}${gap}${dotSize}` /*reload when shader specific stuff changes*/}
      />
    )
  }
}

PointCloud.propTypes = {
  vertices: React.PropTypes.array,
  gap: React.PropTypes.number,
  dotSize: React.PropTypes.number
};

PointCloud.defaultProps = {
};



export default PointCloud;