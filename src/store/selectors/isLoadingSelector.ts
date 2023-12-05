import { userStateAtom } from "../atoms/userStateAtom";
import {selector} from "recoil";

export const isUserLoading = selector({
  key: 'userLoadingState',
  get: ({get}) => {
    const state = get(userStateAtom);

    return state.isLoading;
  },
});