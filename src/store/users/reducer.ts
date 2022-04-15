import { InitialUsersState, UsersActions, UsersActionsTypes } from "./types";

const initialState: InitialUsersState = {
  user: null,
};

export const usersReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  action: UsersActions
): InitialUsersState => {
  switch (action.type) {
    case UsersActionsTypes.USERS_LOADED:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
