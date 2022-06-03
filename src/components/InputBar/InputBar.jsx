import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import useAppStore from '@/store/_app.js';
import styled from './InputBar.module.scss';

const propTypes = { className : PropTypes.string };
const defaultProps = { className : '' };

const InputBar = (props) => {
  const { className } = props;
  const [name, setName] = useState(null);
  const [wish, setWish] = useState(null);
  const [btnCopy, setBtnCopy] = useState('Next');
  const formRef = useRef();
  const nameInput = useRef();
  const wishInput = useRef();
  const setFormSubmited = useAppStore(state => state.setFormSubmited);

  const formSubmited = useAppStore(state => state.formSubmited);

  useEffect(() => {
    if (formSubmited) {
      gsap.to(
        formRef.current,
        {
          opacity  : 0,
          duration : 1
        }
      );}
  }, [formSubmited]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!name) {

      setName(nameInput.current.value);
      setBtnCopy('Submit');
    }
    else {
      const data = encode({
        'form-name' : 'contact',
        'name'      : name,
        'wish'      : wish
      });

      // console.info(encode({ 'form-name' : 'contact', ...data }));
      fetch('/', {
        method  : 'POST',
        headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
        body    : data
      })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('Form successfully submitted');
          setFormSubmited();
        })
        .catch((error) => alert(error));

    }
  };
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };
  const updateWish = (e) => {
    setWish(e.target.value);
  };

  return (
    <div ref={formRef} className={classnames(styled.InputBar, className)}>
      <form name='contact' method='POST'
        data-netlify='true' className={styled.form}>
        <input type="hidden" name="form-name"
          value="contact" />
        {!name && (
          <div><p className={styled.label}>告诉我你的名字: </p><br></br>
            <input ref={nameInput} className={styled.input}
              name='name' /></div>
        )}
        {name && (
          <div>
            <p className={styled.label}>说出你的愿望: </p><br></br>
            <textarea ref={wishInput} className={classnames(styled.input, styled.inputArea)}
              name='wish' onChange={updateWish} />
          </div>
        )}
        <input type="hidden" name="test-field"
          value="testAll" />
        <p>
          <button type='submit' className={styled.submit}
            onClick={handleClick}>{btnCopy}</button>
        </p>
      </form>
    </div>
  );
};

InputBar.propTypes = propTypes;
InputBar.defaultProps = defaultProps;

export default InputBar;
