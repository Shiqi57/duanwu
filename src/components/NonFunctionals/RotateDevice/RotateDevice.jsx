import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from './RotateDevice.module.scss';

const propTypes = { className : PropTypes.string };

const defaultProps = { className : '' };

const RotateDevice = (props) => {
  const { className } = props;

  return (
    <div className={classnames(styled.RotateDevice, className)}>
      Rotate Device
    </div>
  );
};

RotateDevice.propTypes = propTypes;
RotateDevice.defaultProps = defaultProps;

export default RotateDevice;
