import { createContext, useEffect, useReducer } from "react";

export const SET_TOKEN = "MYSTORE/SET_TOKEN";
export const DELETE_TOKEN = "MYSTORE/DELETE_TOKEN";
const TOKEN_KEY_NAME = "userJwtToken";

const publicActions = {
  SET_TOKEN: "MYSTORE/SET_TOKEN",
  DELETE_TOKEN: "MYSTORE/DELETE_TOKEN",
};

const pricateActions = {
  INIT_TOKEN: "MYSTORE/INIT_TOKEN",
};

function reducer(prevState, action) {
  console.log("LOG: MYSTORE/REDUCER");

  switch (action.type) {
    case publicActions.SET_TOKEN: {
      return {
        ...prevState,
        jwtToken: action.payload.jwtToken,
      };
    }
    case publicActions.DELETE_TOKEN: {
      return {
        ...prevState,
        jwtToken: "",
      };
    }
    case pricateActions.INIT_TOKEN: {
      return {
        ...prevState,
        jwtToken: action.payload.jwtToken,
      };
    }
    default: {
      return prevState;
    }
  }
}

// 아래 MyStoreProvider에 쓰이는 Context 객체
export const MyStoreContext = createContext();

/**
 * state에 3개를 담고 있는 Provider 내장 REACT 컴포넌트
 *
 * <MyStoreProvider> <div> ... </div> </MyStoreProvider> 로 정의하면
 * Provider가 자동 적용되어 useContext로 state를 사용 할 수 있다.
 */
export function MyStoreProvider({ children }) {
  let dumyValue = 3;
  let jwtToken = "";
  let isAuthentiacted = false;

  try {
    jwtToken = window.localStorage.getItem(TOKEN_KEY_NAME);
  } catch {
    jwtToken = "";
  }

  if (jwtToken.length > 0) {
    isAuthentiacted = true;
  }

  const initialValues = {
    version: dumyValue,
    jwtToken,
    isAuthentiacted,
  };

  const [state, dispatch] = useReducer(reducer, initialValues);

  // 단순히 마운트시 정보만 표기
  useEffect(() => {
    console.log("LOG: MYSTORE/MOUNT", state);
  }, []);

  // state 중 jwtToken이 변한 경우, 그 값만 localStorage에 저장한다.
  useEffect(() => {
    try {
      const { jwtToken } = state;
      window.localStorage.setItem(TOKEN_KEY_NAME, JSON.stringify(jwtToken));
    } catch (error) {
      console.log(error);
    }
    console.log("LOG: MYSTORE/UDPATE", state);
  }, [state]);

  return (
    <MyStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </MyStoreContext.Provider>
  );
}
