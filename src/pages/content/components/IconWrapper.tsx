import React, { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

interface IconWrapperProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconWrapper = ({ children, ...rest }: IconWrapperProps) => {
  return <Button {...rest}>{children}</Button>;
};

export default IconWrapper;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
`;
