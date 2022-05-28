import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from './InputBar.module.scss';

const propTypes = { className : PropTypes.string };
const defaultProps = { className : '' };

const InputBar = (props) => {
  const { className } = props;
  const [name, setName] = useState(null);
  const [btnCopy, setBtnCopy] = useState('Next');
  const nameInput = useRef();
  const wishInput = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    if (!name) {
      setName(nameInput.current.value);
      setBtnCopy('Submit');
    }
    else {
      const data = {
        Name : name,
        Wish : wishInput.current.value
      };
      // console.info(encode({ 'form-name' : 'contact', ...data }));
      fetch('https://main--marvelous-mooncake-ac1ba6.netlify.app/', {
        method  : 'POST',
        headers : { 'Content-Type' : 'application/x-www-form-urlencoded' },
        body    : encode({ 'form-name' : 'contact', ...data })
      })
        // eslint-disable-next-line no-console
        .then(() => console.log('Form successfully submitted'))
        .catch((error) => alert(error));
    }
  };
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  return (
    <div className={classnames(styled.InputBar, className)}>
      <form name='contact' method='POST' data-netlify='true' className={styled.form}>
        <input type="hidden" name="form-name" value="contact" />
        {!name && <div>Your Name: <input ref={nameInput} className={styled.input} /></div>}
        {name && <div>Your Wish: <input ref={wishInput} className={styled.input} /></div>}
        <p>
          <button className={styled.submit} onClick={handleClick}>{btnCopy}</button>
        </p>
      </form>
    </div>
  );
};

InputBar.propTypes = propTypes;
InputBar.defaultProps = defaultProps;

export default InputBar;
