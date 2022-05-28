import classnames from 'classnames';
import PropTypes from 'prop-types';
import InputBar from '@/components/InputBar/InputBar';
import styled from './Landing.module.scss';

const propTypes = { className : PropTypes.string };
const defaultProps = { className : '' };

const Landing = (props) => {
  const { className } = props;

  return (
    <div className={classnames(styled.Landing, className)}>
      <InputBar />
    </div>
  );
};

Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;

export default Landing;
