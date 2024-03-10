import { combineReducers } from "redux";
import Redcuer from "./Reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const RootReducer = combineReducers({
  Redcuer,
});

const PersistReducer = persistReducer({ key: "root", storage }, RootReducer);

export default PersistReducer;