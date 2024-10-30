import { configureStore } from "@reduxjs/toolkit";
import WaterTracker from "../WaterTracker/WaterTracker";
import User from "../User/User";

// create redux store
const store = configureStore({
  reducer: {
    waterTracker: WaterTracker.reducer,
    user: User.reducer,
  },
});

// create types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
