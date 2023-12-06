import {atom} from "recoil";

export const userStateAtom = atom({
  key: 'userStateAtom',
  default: {
    isLoading: true,
    userEmail: null as string | null,
    userType: null as string | null,
  },
});