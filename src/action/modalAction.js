import {OPEN_MODAL} from "../types/modalType"

export const openModal = (openClose, content) => {
    return {
      type: OPEN_MODAL,
      payload: { openClose, content }
    };
  };