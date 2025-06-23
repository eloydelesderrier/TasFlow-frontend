import { create } from "zustand";

interface ModalStore {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isLoginOpen: false,
  isRegisterOpen: false,
  openLogin: () => set({ isLoginOpen: true, isRegisterOpen: false }),
  openRegister: () => set({ isRegisterOpen: true, isLoginOpen: false }),
  closeAll: () => set({ isRegisterOpen: false }),
}));