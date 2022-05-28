import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from './WebGlDisabled.module.scss';

const propTypes = { className : PropTypes.string };

const defaultProps = { className : '' };

const WebGlDisabled = (props) => {
  const { className } = props;

  return (
    <div className={classnames(styled.WebGlDisabled, className)}>
      WebGL Disabled
    </div>
  );
};

WebGlDisabled.propTypes = propTypes;
WebGlDisabled.defaultProps = defaultProps;

export default WebGlDisabled;
