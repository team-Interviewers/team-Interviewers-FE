import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

import {
  BiCheckbox as BoxIcon,
  BiCheckboxChecked as CheckIcon,
} from 'react-icons/bi';

type CheckBoxProps = {
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange' | 'checked'>;

export const CheckBox: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckBoxProps
> = ({ id, onChange, isChecked, children, ...restProps }, ref) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const _onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.target;
    setChecked(checked);
    onChange?.(checked);
  };

  return (
    <StyledLabel htmlFor={id}>
      <StyledInput
        type={'checkbox'}
        id={id}
        onChange={_onChange}
        onClick={() => {
          onChange?.(true);
        }}
        checked={checked}
        {...restProps}
        ref={ref}
      />
      {checked ? (
        <CheckIcon color="green" size={24} />
      ) : (
        <BoxIcon color="gray" size={24} />
      )}
      {children}
    </StyledLabel>
  );
};

export default forwardRef(CheckBox);

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  height: fit-content;
`;

const StyledInput = styled.input`
  display: none;
`;
