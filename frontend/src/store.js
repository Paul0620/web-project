import React, { createContext, useContext } from "react";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
} from "use-reducer-with-side-effects";
import { getStorageItem, setStorageItem } from "utils/useLocalStorage";

// context를 통해서 jwtToken을 공유하기

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type } = action;
  // 토큰값 저장
  if (type === SET_TOKEN) {
    const { payload: jwtToken } = action;
    const newState = {
      ...prevState,
      jwtToken,
      isAuthenticated: true,
    };
    // sideEffects가 없다면
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", jwtToken); // 로컬스토리지에 저장이 되도록
    });
  }
  // 토큰값을 지우는 것
  else if (type === DELETE_TOKEN) {
    const newState = {
      ...prevState,
      jwtToken: "",
      isAuthenticated: false,
    };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", "");
    });
  }
  return prevState;
};

export const AppProvider = ({ children }) => {
  const jwtToken = getStorageItem("jwtToken", "");

  // useReducer를 통해 초기값을 읽어냄
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    // 토큰을 읽어냄
    jwtToken,
    // 토큰값이 있는지 확인
    isAuthenticated: jwtToken.length > 0,
  });

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

// actions, 노출되는 부분들이 아님
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

// action creators, 노출되는 부분
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});
export const deleteToken = () => ({ type: DELETE_TOKEN });
