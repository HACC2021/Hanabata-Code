import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import useEnhancedReducer from "./useEnhancedReducer";
import { loginWithToken } from "./useLogin";
import { getTrails } from "./apiService";

const userInfo = createContext({
  state: undefined,
  dispatch: undefined,
  getState: undefined,
});
const { Provider } = userInfo;

let initialState = {
  userId: undefined,
  trails: undefined,
};

const UserInfoProvider = ({ children }) => {
  const [state, dispatch, getState] = useEnhancedReducer(
    useCallback((state, action) => {
      const { userId, trails } = action.payload;
      console.log("context", userId);
      switch (action.type) {
        case "LOGIN":
          return {
            ...state,
            userId,
          };
        case "ALL_TRAILS":
          return {
            ...state,
            trails,
          };
        default:
          return state;
      }
    }, []),
    initialState
  );

  // const memo = useMemo(()=>({state, dispatch, getState}),[]);
  useEffect(() => {
    loginWithToken().then((res) => {
      dispatch({
        type: "LOGIN",
        payload: {
          userId: res,
        },
      });
    });

    getTrails().then((res) => {
      console.log("trails", res)
      dispatch({
        type: "ALL_TRAILS",
        payload: {
          trails: res,
        },
      });
    });
  }, []);

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useUserInfo = () => useContext(userInfo);

export { useUserInfo, UserInfoProvider };
