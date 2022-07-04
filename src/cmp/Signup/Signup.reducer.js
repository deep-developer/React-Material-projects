import {
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR
} from './Signup.state';

const model = {
	isLoader: false,
	error: null,
	data: []
}

const signupReducer = (state=model,action)=>{
	switch(action.type)
	{
		case SIGNUP_REQUEST : return {
			...state,
			isLoader: true
		}

		case SIGNUP_SUCCESS : return {
			...state,
			isLoader: false,
			data: action.payload
		}

		case SIGNUP_ERROR : return {
			...state,
			isLoader: false,
			error: action.error	
		}

		default: return state;
	}
}

export default signupReducer;