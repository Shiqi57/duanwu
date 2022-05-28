import classnames from 'classnames';
import PropTypes from 'prop-types';
import ThreeCanvas from '@/components/Canvas/Canvas.jsx';
import styled from './index.module.scss';

const propTypes = { className : PropTypes.string };
const defaultProps = { className : '' };

const Canvas = (props) => {
  const { className } = props;

  return (
    <main className={classnames(styled.Canvas, className)}>
      <ThreeCanvas />
    </main>
  );
};

Canvas.propTypes = propTypes;
Canvas.defaultProps = defaultProps;

export default Canvas;
