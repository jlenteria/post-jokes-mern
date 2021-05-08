import { ACTIVE } from "../types";

const initialState = {
  activeHeader: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case ACTIVE:
      return {
        ...state,

        activeHeader: action.payload,
      };

    default:
      return state;
  }
}
