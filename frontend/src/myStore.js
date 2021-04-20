import { createContext, useEffect, useContext, useReducer } from "react";

const SET_TOKEN = "MYSTORE/SET_TOKEN";
const DELETE_TOKEN = "MYSTORE/DELETE_TOKEN";
function reducer(prevState, action) {
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
    initValueJwtToken = window.localStorage.getItem("jwtToken");
  } catch {
    initValueJwtToken = "";
  }

  const initialValues = {
    version: 3,
    jwtToken: initValueJwtToken,
  };

  const [state, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    try {
      const { jwtToken } = state;
      window.localStorage.setItem("jwtToken", jwtToken);
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  return (
    <MyStoreContext.Provider value={dispatch}>
      {children}
    </MyStoreContext.Provider>
  );
}
