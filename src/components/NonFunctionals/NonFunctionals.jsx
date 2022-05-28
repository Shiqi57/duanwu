import classnames from 'classnames';
import PropTypes from 'prop-types';
import useNonFunctionalCheck from '@/hooks/use-non-functional-check';
import { useNonFunctionalStore } from '@/store';
import DeviceUnsupported from './DeviceUnsupported/DeviceUnsupported.jsx';
import RotateDevice from './RotateDevice/RotateDevice.jsx';
import WindowTooSmall from './WindowTooSmall/WindowTooSmall.jsx';
import WebGlDisabled from './WebGlDisabled/WebGlDisabled.jsx';
import JavaScriptDisabled from './JavaScriptDisabled/JavaScriptDisabled.jsx';
import styled from './NonFunctionals.module.scss';

const propTypes = { className : PropTypes.string };

const defaultProps = { className : '' };

const NonFunctionals = (props) => {
  const { className } = props;

  // check for non-functional states
  useNonFunctionalCheck();

  const {
    windowTooSmall,
    rotateDevice,
    deviceSupport,
    webglDisabled
  } = useNonFunctionalStore(state => ({
    windowTooSmall : state.windowTooSmall,
    rotateDevice   : state.rotateDevice,
    deviceSupport  : state.deviceSupport,
    webglDisabled  : state.webglDisabled,
  }));

  return (
    <div className={classnames(styled.NonFunctionals, className)}>
      {windowTooSmall && <WindowTooSmall />}
      {rotateDevice && <RotateDevice />}
      {webglDisabled && <WebGlDisabled />}
      <JavaScriptDisabled />
      {
        !(deviceSupport.browser && deviceSupport.os) &&
          <DeviceUnsupported />
      }
    </div>
  );
};

NonFunctionals.propTypes = propTypes;
NonFunctionals.defaultProps = defaultProps;

export default NonFunctionals;
