import classnames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from './InputBar.module.scss';

const propTypes = { className : PropTypes.string };
const defaultProps = { className : '' };

const InputBar = (props) => {
  const { className } = props;
  const [name, setName] = useState(null);
  const [wish, setWish] = useState(null);
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
  const updateWish = (e) => {
    setWish(e.target.value);
  };

  return (
    <div className={classnames(styled.InputBar, className)}>
      <form name='contact' method='POST'
        data-netlify='true' className={styled.form}>
        <input type="hidden" name="form-name"
          value="contact" />
        {!name && (
          <div>Your Name: <input ref={nameInput} className={styled.input}
            name='name' /></div>
        )}
        {name && (
          <div>
            Your Wish: <input ref={wishInput} className={styled.input}
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
