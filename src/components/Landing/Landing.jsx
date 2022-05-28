import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from './Landing.module.scss';

const propTypes = { className : PropTypes.string };
const defaultProps = { className : '' };

const Landing = (props) => {
  const { className } = props;

  return (
    <div className={classnames(styled.Landing, className)}>
      cool website 🚀
    </div>
  );
};

Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;

export default Landing;
