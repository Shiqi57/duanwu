import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from './DeviceUnsupported.module.scss';

const propTypes = { className : PropTypes.string };

const defaultProps = { className : '' };

const DeviceUnsupported = (props) => {
  const { className } = props;

  return (
    <div className={classnames(styled.DeviceUnsupported, className)}>
      Device Unsupported
    </div>
  );
};

DeviceUnsupported.propTypes = propTypes;
DeviceUnsupported.defaultProps = defaultProps;

export default DeviceUnsupported;
