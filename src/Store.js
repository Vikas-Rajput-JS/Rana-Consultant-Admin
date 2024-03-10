import { createStore } from "redux";
import PersistReducer from './Redux/Reducers/Main';
import { persistStore } from "redux-persist";


const Store = createStore(PersistReducer)

const persistor = persistStore(Store)

export {Store,persistor}