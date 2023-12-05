import { userStateAtom } from "../atoms/userStateAtom";
import {selector} from "recoil";

export const userEmailState = selector({
  key: 'userEmailState',
  get: ({get}) => {
    const state = get(userStateAtom);

    return state.userEmail;
  },
});