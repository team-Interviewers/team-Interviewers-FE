import React, { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface ButtonContainerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonContainer = ({ children, ...rest }: ButtonContainerProps) => {
  return <Button {...rest}>{children}</Button>;
};

export default ButtonContainer;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;

  color: inherit;
  font: inherit;

  line-height: normal;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  -webkit-appearance: none;
`;
