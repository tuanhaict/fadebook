import userReducer from "./features/userSlice";
import postReducer from "./features/postSlice";
import friendReducer from "./features/friendSlice";
import loadingReducer from "./features/loadingSlice"
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  user: userReducer,
  post: postReducer,
  friend: friendReducer,
  loading: loadingReducer
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>