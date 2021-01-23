import React, {useReducer} from "react";
import {
  BOUNCE_AUTH_TOKEN,
  HANDLE_AUTH_TOKEN,
  HANDLE_SHOW_CONNECT_MODAL,
} from "./const";

const mainContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_SHOW_CONNECT_MODAL:
      return {...state, showConnectModal: action.showConnectModal}
    case HANDLE_AUTH_TOKEN:
      return {...state, authToken: action.authToken}
    default:

      return state
  }
}

const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, {
    showConnectModal: true,
    authToken: window.localStorage.getItem(BOUNCE_AUTH_TOKEN)
  });
  return (
      <mainContext.Provider value={{state, dispatch}}>
        {props.children}
      </mainContext.Provider>
  );
};

export {reducer, mainContext, ContextProvider};
