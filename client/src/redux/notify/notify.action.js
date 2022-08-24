import socketActionType from "./notify.type";

export const addSocket = (socket) => ({
    type: socketActionType.ADD_SOCKET,
    payload: socket,
  });

  export const addNotify = (notify) => ({
    type: socketActionType.ADD_NOTIFY,
    payload: notify,
  });