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
  posts: undefined,
};

const posts = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
    detail: "heeyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
    detail:"weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  },
];

const UserInfoProvider = ({ children }) => {
  const [state, dispatch, getState] = useEnhancedReducer(
    useCallback((state, action) => {
      const { userId, trails, posts, post } = action.payload;
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
        case "ADD_ALL_POSTS":
          return {
            ...state,
            posts
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
          userId: res,
        },
      });
    });

    getTrails().then((res) => {
      dispatch({
        type: "ALL_TRAILS",
        payload: {
          trails: res,
        },
      });
    });

    dispatch({
      type: "ADD_ALL_POSTS",
      payload: {
        posts,
      },
    });
  }, []);

  return <Provider value={{ state, dispatch, getState }}>{children}</Provider>;
};

const useUserInfo = () => useContext(userInfo);

export { useUserInfo, UserInfoProvider };
