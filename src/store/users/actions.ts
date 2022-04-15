import { AppThunk } from "..";
import { getUserDataApi } from "../../api/getUserData.api";
import { UsersActions, UsersActionsTypes } from "./types";

export const getUserData = (): AppThunk<UsersActions> => async (dispatch) => {
  try {
    const userData = await getUserDataApi();
    dispatch({ type: UsersActionsTypes.USERS_LOADED, payload: userData });
  } catch (e) {}
};
