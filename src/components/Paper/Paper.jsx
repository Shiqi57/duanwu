import classnames from 'classnames';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import useAppStore from '@/store/_app.js';
import styled from './Paper.module.scss';

const propTypes = { className : PropTypes.string };
const defaultProps = { className : '' };

const Paper = (props) => {
  const { className } = props;
  const [play, setPlay] = useState(false);
  const ref = useRef();
  const formSubmited = useAppStore(state => state.formSubmited);

  useEffect(() => {
    if (formSubmited) {
      setPlay(formSubmited);
      gsap.to(
        ref.current,
        {
          scale    : 0.2,
          rotate   : 160,
          opacity  : 0,
          duration : 3,
          delay    : 3
        }
      );
    }
  }, [formSubmited]);

  const boxClasses = classnames(
    styled.box,
    { [styled.playBox] : play }
  );

  return (
    <div ref={ref} className={classnames(styled.Paper, className)}>
      {/* <button onClick={() => setPlay(true)}>play</button> */}
      <div className={styled.back} />
      <div className={styled.front}>
        <div className={boxClasses}><div className={styled.one} /></div>
        <div className={boxClasses}><div className={styled.two} /></div>
        <div className={boxClasses}><div className={styled.three} /></div>
        <div className={boxClasses}><div className={styled.four} /></div>
      </div>
    </div>
  );
};

Paper.propTypes = propTypes;
Paper.defaultProps = defaultProps;

export default Paper;
