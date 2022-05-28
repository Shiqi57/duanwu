import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Color } from 'three';
import { fragmentShader, vertexShader } from '@/shaders/example-shader';

const propTypes = {
  color    : PropTypes.string,
  colorMix : PropTypes.number,
};

const defaultProps = {
  color    : '#0000ff',
  colorMix : 0.9,
};

const ExampleShaderObject = ({
  color, colorMix, ...restProps
}) => {
  const shaderArgs = useMemo(() => {
    return {
      uniforms : {
        color    : { value : new Color() },
        colorMix : { value : colorMix },
      },
      fragmentShader,
      vertexShader,
    };
  }, [colorMix]);

  return (
    <mesh {...restProps}>
      <boxGeometry />
      <shaderMaterial
        attach="material"
        args={[shaderArgs]}
        uniforms-color-value={color}
        uniforms-colorMix-value={colorMix}
      />
    </mesh>
  );
};

ExampleShaderObject.propTypes = propTypes;
ExampleShaderObject.defaultProps = defaultProps;

export default ExampleShaderObject;
