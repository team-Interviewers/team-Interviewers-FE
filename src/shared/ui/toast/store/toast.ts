import { create } from 'zustand';

export type ToastMessage =
  | '정답입니다!'
  | '라이프가 모두 소진되었습니다!'
  | '오답입니다!'
  | '정답을 입력해주세요!'
  | '시간이 초과되었습니다!';

export type ToastMode = 'SUCCESS' | 'DELETE' | 'ERROR';

export interface Toast {
  id?: string;
  message: ToastMessage;
  mode?: ToastMode;
}

interface ToastStore {
  toasts: Toast[];
  duration: number;
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
  setDuration: (duration: number) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  duration: 2000,
  addToast: (toast: Toast) =>
    set((state) => ({ toasts: [...state.toasts, toast] })),
  removeToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  setDuration: (duration: number) => set({ duration }),
}));

export default useToastStore;
