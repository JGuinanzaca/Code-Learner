import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

// index.js is already configured to the provider and the store(along with localstorage), all that's needed is to
// import the following functions and reducers:
//      import { useDispatch/useSelector } from "react-redux";
//      import { selectId/saveId } from "./redux/authSlice";
// then you would save the id by invoking dispatch(saveId(ID)), where dispatch = useDispatch()
// and call the id in the store by using e.g., const id = useSelector((state) => selectId(state));

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  userDetails: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
  reducer: persistedReducer,
});
