import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import InputBar from '@/components/InputBar/InputBar.jsx';
import Paper from '@/components/Paper/Paper.jsx';
import useAppStore from '@/store/_app.js';
import styled from './Landing.module.scss';

const propTypes = { className : PropTypes.string };
const defaultProps = { className : '' };

const Landing = (props) => {
  const { className } = props;

  return (
    <div className={classnames(styled.Landing, className)}>
      <Paper />
      <InputBar />
    </div>
  );
};

Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;

export default Landing;
