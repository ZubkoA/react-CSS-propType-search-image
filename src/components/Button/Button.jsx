import React from 'react';

import css from './Button.module.css';

const Button = ({ handleClick }) => {
  return (
    <button type="button" className={css.Button} onClick={handleClick}>
      Load more
    </button>
  );
};

export default Button;
