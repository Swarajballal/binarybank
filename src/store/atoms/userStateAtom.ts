import {atom} from "recoil";

export const userStateAtom = atom({
  key: 'userStateAtom',
  default: {
    isLoading: true,
    userEmail: null,
    userType: null
  },
});