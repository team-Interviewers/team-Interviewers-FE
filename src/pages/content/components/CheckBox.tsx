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
  disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange' | 'checked'>;

export const CheckBox: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckBoxProps
> = (
  { id, onChange, isChecked, disabled = false, children, ...restProps },
  ref
) => {
  const [checked, setChecked] = useState<boolean>(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const _onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (disabled) return;
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
      <IconWrapper>
        {checked ? (
          <CheckIcon color="green" width={40} size={30} />
        ) : (
          <BoxIcon color="gray" width={40} size={30} />
        )}
      </IconWrapper>
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

const IconWrapper = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  display: none;
  align-items: center;
`;
