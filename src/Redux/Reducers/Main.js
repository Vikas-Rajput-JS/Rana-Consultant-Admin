import { combineReducers } from "redux";
import Reducer from "./Reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const RootReducer = combineReducers({
  Reducer,
});

const PersistReducer = persistReducer({ key: "root", storage }, RootReducer);

export default PersistReducer;