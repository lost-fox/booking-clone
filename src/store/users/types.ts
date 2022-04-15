import { GetUserDataResponse } from "../../api/getUserData.api";

interface LoadedUsersAction {
  type: UsersActionsTypes.USERS_LOADED;
  payload: GetUserDataResponse;
}

export enum UsersActionsTypes {
  USERS_LOADED = "USERS_LOADED",
}

export type UsersActions = LoadedUsersAction;

export interface InitialUsersState {
  user: GetUserDataResponse | null;
}
