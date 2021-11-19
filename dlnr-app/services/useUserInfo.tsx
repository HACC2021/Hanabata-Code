import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
} from "react";
import useEnhancedReducer from "./useEnhancedReducer";
import { loginWithToken } from "./authenticationService";
import { getTrails, getAllPosts } from "./apiService";

const userInfo = createContext({
  state: undefined,
  dispatch: undefined,
  getState: undefined,
});
const { Provider } = userInfo;

let initialState = {
  userInfo: undefined,
  trails: undefined,
  posts: undefined,
};

const UserInfoProvider = ({ children }) => {
  const [state, dispatch, getState] = useEnhancedReducer(
    useCallback((state, action) => {
      const { userInfo, trails, posts, post } = action.payload;
      switch (action.type) {
        case "LOGIN":
          return {
            ...state,
            userInfo,
          };
        case "LOGOUT":
          return {
            ...state,
            userInfo,
          };
        case "ALL_TRAILS":
          return {
            ...state,
            trails,
          };
        case "ADD_ALL_POSTS":
          return {
            ...state,
            posts,
          };
        case "ADD_POST":
          return {
            ...state,
            posts: [...state.posts, post],
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
          userInfo: res,
        },
      });
    });
  }, []);

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useUserInfo = () => useContext(userInfo);

export { useUserInfo, UserInfoProvider };
