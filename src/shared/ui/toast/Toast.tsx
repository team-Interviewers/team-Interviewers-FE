import styled, { keyframes } from 'styled-components';
import useToastStore, { ToastMessage, ToastMode } from './store/toast';
import { BsFillCheckCircleFill as SuccessIcon } from 'react-icons/bs';
import { AiOutlineCloseCircle as CloseIcon } from 'react-icons/ai';
import { BsFillExclamationTriangleFill as ErrorIcon } from 'react-icons/bs';
import {
  ColorType,
  ToastColorType,
  darkTheme,
} from '@root/src/pages/content/utils/theme';
import getRem from '../../util/getRem';

interface ToastProps {
  message: ToastMessage;
  mode?: ToastMode;
}

const icon: Record<ToastMode, React.ReactNode> = {
  SUCCESS: <SuccessIcon color={darkTheme.colors.white} />,
  DELETE: <CloseIcon color={darkTheme.colors.white} />,
  ERROR: <ErrorIcon color={darkTheme.colors.black} />,
} as const;

const modeColor: Record<ToastMode, ToastColorType> = {
  SUCCESS: 'success',
  DELETE: 'delete',
  ERROR: 'error',
} as const;

const modeTextColor: Record<ToastMode, ColorType> = {
  SUCCESS: 'white',
  DELETE: 'white',
  ERROR: 'black',
} as const;

const Toast = ({ message, mode = 'SUCCESS' }: ToastProps) => {
  const { duration } = useToastStore();
  return (
    <StyleToast duration={duration} backgroundColor={modeColor[mode]}>
      <StyleToastMessage mode={mode}>
        <Top>
          {icon[mode]}
          <ToastText mode={mode}>{message}</ToastText>
        </Top>
      </StyleToastMessage>
    </StyleToast>
  );
};

export default Toast;

const floating = keyframes`
    0% {opacity: 0}
    25% {opacity: 1}
    50% {opacity: 1}
    75% {opacity: 1}
    100% {opacity: 0}
`;

interface StyleToastProps {
  duration: number;
  backgroundColor: ToastColorType;
}

const StyleToast = styled.div<StyleToastProps>`
  position: fixed;
  bottom: 50%;
  right: 0;
  width: ${getRem(300)};
  left: calc(50% - ${getRem(150)});
  animation: ${floating} ${({ duration }) => duration}ms ease-in-out;
  border-radius: ${getRem(8)};
  background-color: ${(props) => props.theme.toast[props.backgroundColor]};
  z-index: 99999999999;
`;

const StyleToastMessage = styled.div<{ mode: ToastMode }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: ${getRem(52)};
  padding: 0 ${getRem(20)};
  border-radius: ${getRem(8)};
  background: ${(props) => props.theme.toast[props.mode]};
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${getRem(10)};
`;

const ToastText = styled.span<{ mode: ToastMode }>`
  color: ${({ mode }) => modeTextColor[mode]};
  font-size: ${getRem(14)};
  font-weight: 500;
  line-height: ${getRem(20)};
`;
