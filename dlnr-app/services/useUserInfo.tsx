import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import useEnhancedReducer from "./useEnhancedReducer";
import { loginWithToken } from "./useLogin";

const userInfo = createContext({
  state: undefined,
  dispatch: undefined,
  getState: undefined,
});
const { Provider } = userInfo;

const UserInfoProvider = ({ children }) => {
  const [state, dispatch, getState] = useEnhancedReducer(
    useCallback((state, action) => {
      const { userId } = action.payload;
      console.log("context", userId)
      switch (action.type) {
        case "LOGIN":
          return {
            userId,
          };
        default:
          return state;
      }
    }, [])
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
  }, []);

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useUserInfo = () => useContext(userInfo);

export { useUserInfo, UserInfoProvider };
