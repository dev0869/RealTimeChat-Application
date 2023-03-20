import {createContext, useContext, useReducer } from "react";
import { useChatContext } from "./AuthContext";
export const MessageContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useChatContext();
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
    blank: true,
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":

        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.uid
            : action.payload.uid + currentUser.uid,
          blank: false,
        }



      default:
        return state;
    }
  };


  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);


  return (
    <MessageContext.Provider value={{ data: state, dispatch, }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  return useContext(MessageContext)
}