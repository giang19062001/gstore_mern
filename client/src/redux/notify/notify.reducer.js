import socketActionType from './notify.type'
const INITIAL_STATE = {
  socket: null,
  notify:[]
};

const notifyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case socketActionType.ADD_SOCKET:
        console.log(action.payload);
        return{
            socket:action.payload,
            ...state
        };
      case socketActionType.ADD_NOTIFY:
        return{
             ...state,
             notify : [...state.notify,action.payload]
        };

    default:
      return state;
  }
};

export default notifyReducer;
