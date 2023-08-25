import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { ColorType } from '../utils/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonColor?: ColorType;
  activeButtonColor?: ColorType;
  disabledButtonColor?: ColorType;
  width?: number;
  height?: number;
  fontSize?: number;
}

const Button = ({ children, type = 'button', ...rest }: ButtonProps) => {
  return (
    <StyledButton type={type} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || 100}%;
  height: ${(props) => props.height || 3}rem;
  border: 0 solid transparent;
  border-radius: 0.5rem;
  background-color: ${(props) =>
    props.theme.colors[props.buttonColor || 'primary']};
  font-size: ${(props) => props.fontSize || 1}rem;
  white-space: nowrap;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${(props) =>
      props.theme.colors[props.disabledButtonColor || 'primary']};
    cursor: not-allowed;
  }

  &:active {
    background-color: ${(props) =>
      props.theme.colors[props.activeButtonColor || 'primaryActive']};
  }
`;
