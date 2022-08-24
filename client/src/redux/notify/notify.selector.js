import { createSelector } from "reselect";


const selectSocket = (state) => state.notify;


export const selectSocketIo = createSelector(
  [selectSocket],
  (notify) => notify.socket
);

export const selectNotify = createSelector(
  [selectSocket],
  (notify) => notify.notify
);

