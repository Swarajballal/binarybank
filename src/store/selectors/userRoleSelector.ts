import { userStateAtom } from "../atoms/userStateAtom";
import {selector} from "recoil";

export const userRoleSelector = selector({
  key: 'userRoleSelector',
  get: ({get}) => {
    const state = get(userStateAtom);

    return state.userType;
  },
});