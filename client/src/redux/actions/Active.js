import { ACTIVE } from "../types";

export const setActive = (active) => (dispatch) => {
  dispatch({
    type: ACTIVE,
    payload: active,
  });
};
