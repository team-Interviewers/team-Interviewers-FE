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
`;
