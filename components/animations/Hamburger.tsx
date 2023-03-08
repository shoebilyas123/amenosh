import React, { FC, useRef } from 'react';
import styles from './Hamburger.module.css';

interface IProps {
  onClick: () => void;
  isOpen: boolean;
}

const Hamburger: FC<IProps> = ({ onClick, isOpen }) => {
  const hamRef = useRef<any>();

  const onClickHandler = () => {
    onClick();
  };

  return (
    <div
      ref={hamRef}
      id={styles['nav-icon-hamburger']}
      onClick={onClickHandler}
      className={isOpen ? styles['open'] : ''}
    >
      <span style={{ background: 'white' }}></span>
      <span style={{ background: 'white' }}></span>
      <span style={{ background: 'white' }}></span>
    </div>
  );
};

export default Hamburger;
