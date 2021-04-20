import { createContext, useEffect, useReducer } from "react";

export const SET_TOKEN = "MYSTORE/SET_TOKEN";
export const DELETE_TOKEN = "MYSTORE/DELETE_TOKEN";
const TOKEN_KEY_NAME = "userJwtToken";

function reducer(prevState, action) {
  console.log("스토어 리듀서");

  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...prevState,
        jwtToken: action.payload.jwtToken,
      };
    }
    case DELETE_TOKEN: {
      return {
        ...prevState,
        jwtToken: "",
      };
    }
    default: {
      return prevState;
    }
  }
}

export const MyStoreContext = createContext();

export function MyStoreProvider({ children }) {
  let initValueJwtToken = "";

  try {
    initValueJwtToken = window.localStorage.getItem(TOKEN_KEY_NAME);
  } catch {
    initValueJwtToken = "";
  }

  const initialValues = {
    version: 3,
    jwtToken: initValueJwtToken,
  };

  const [state, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    console.log("초기 데이터", initialValues);
  }, []);

  useEffect(() => {
    console.log("유즈 이펙트");

    try {
      console.log("단계 H");
      const { jwtToken } = state;

      console.log("jwtToken", jwtToken);
      window.localStorage.setItem(TOKEN_KEY_NAME, JSON.stringify(jwtToken));
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  return (
    <MyStoreContext.Provider value={{ dispatch }}>
      {children}
    </MyStoreContext.Provider>
  );
}
