import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from './index.module.scss';

const propTypes = { className : PropTypes.string };

const defaultProps = { className : '' };

const _404 = (props) => {
  const { className } = props;

  return (
    <main className={classnames(styled._404, className)}>
      404 Not Found
    </main>
  );
};

_404.propTypes = propTypes;
_404.defaultProps = defaultProps;

export default _404;
