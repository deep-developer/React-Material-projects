import signupReducer from './cmp/Signup/Signup.reducer';
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
const midddlewares = applyMiddleware(
	logger,
	thunk
);

const storage = createStore(signupReducer,{},midddlewares);
export default storage;