import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from './WindowTooSmall.module.scss';

const propTypes = { className : PropTypes.string };

const defaultProps = { className : '' };

const WindowTooSmall = (props) => {
  const { className } = props;

  return (
    <div className={classnames(styled.WindowTooSmall, className)}>
      Window Too Small
    </div>
  );
};

WindowTooSmall.propTypes = propTypes;
WindowTooSmall.defaultProps = defaultProps;

export default WindowTooSmall;
