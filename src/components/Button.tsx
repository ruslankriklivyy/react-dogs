import React from 'react';

interface IButton {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<IButton> = (props) => {
  return (
    <button className={props.className ?? 'btn'} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
