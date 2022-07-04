import {
	useDispatch,
	useSelector
} from "react-redux";

import {
	signupRequest
} from './Signup.action';

import {
	Typography,
	Grid,
	Button,
	Stack,
	TextField,
	Checkbox,
	FormGroup,
	FormControlLabel
} from "@mui/material";

import useHttp from "../../hooks/useHttp";

import {
	useState,
	useEffect
} from "react";

import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

import SweetAlert from 'react-bootstrap-sweetalert';

const Signup = ()=>{
	const dispatch = useDispatch();
	const response = useSelector(response=>response);

	const signupForm = {
		fullname: "",
		phone: "",
		email: "",
		password: ""
	}

	const signupFormError = {
		fullname: {
			state: false,
			message: ""
		},
		phone: {
			state: false,
			message: ""
		},
		email: {
			state: false,
			message: ""
		},
		password: {
			state: false,
			message: ""
		}
	}

	const [input,setInput] = useState(signupForm);
	const [error,setError] = useState(signupFormError);
	const [checked,setChecked] = useState(false);
	const [sweetAlert,setSweetAlert] = useState({
		state: false,
		title: "",
		icon: "",
		message:""
	});
	

	const Alert = ()=>{
		const alert = (
			<>
				<SweetAlert 
				show={sweetAlert.state}
				title={sweetAlert.title}
				type={sweetAlert.icon}
				customButtons={
					<>
						<Button variant="outlined" color="warning" sx={{mr:2}}>Cancel</Button>
						<Button variant="Contained" color="Primary">Login</Button>
					</>
				}
				>
				{sweetAlert.message}
				</SweetAlert>
			</>
		);
		return alert;
	}

	const fullnameValidation = (e)=>{
		const input = e.target;
		const key = input.name;
		const isRequired = required(input);
		return setError((oldData)=>{
			return {
				...oldData,
				[key]: isRequired
			}
		});
	}

	const phoneValidation = (e)=>{
		const input = e.target;
		const key = input.name;
		const isRequired = required(input);
		const isMin = minLength(input,4);
		const isMax = maxLength(input,13);
		return setError((oldData)=>{
			return {
				...oldData,
				[key]: (isRequired.state && isRequired) || (isMin.state && isMin) || isMax
			}
		});
	}

	const emailValidation = (e)=>{
		const input = e.target;
		const key = input.name;
		const isRequired = required(input);
		const isEmail = emailSyntex(input);
		console.log(isEmail);
		return setError((oldData)=>{
			return {
				...oldData,
				[key]: (isRequired.state && isRequired) || isEmail
			}
		});
	}

	const passwordValidation = (e)=>{
		const input = e.target;
		const key = input.name;
		const isRequired = required(input);
		const isMin = minLength(input,8);
		const isMax = maxLength(input,15);
		const isStrong = strongPassword(input);
		return setError((oldData)=>{
			return {
				...oldData,
				[key]: (isRequired.state && isRequired) || (isStrong.state && isStrong) || (isMin.state && isMin) || isMax
			}
		});
	}

	const required = (input)=>{
		const value = input.value.trim();
		if(value.length === 0)
		{
			return {
				state: true,
				message: "This field is required"
			}
		}
		else{
			return {
				state: false,
				message: ""
			}
		}
	}

	const emailSyntex = (input)=>{
		const value = input.value.trim();
		const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
		if(regExp.test(value))
		{
			return {
				state: false,
				message: ""
			}
		}

		else{
			return {
				state: true,
				message: "Email is not valid"
			}
		}
	}

	const strongPassword = (input)=>{
		const value = input.value.trim();
		const regExp = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/g
		if(regExp.test(value))
		{
			return {
				state: false,
				message: ""
			}
		}

		else{
			return {
				state: true,
				message: "first 2 letters in uppercase, 1 special character, 2 numbers, 3 letters in lowercase"
			}
		}
	}

	const minLength = (input,requiredLength)=>{
		const value = input.value.trim();
		if(value.length < requiredLength)
		{
			return {
				state: true,
				message: `minimum ${requiredLength} characters required`
			}
		}

		else {
			return {
				state: false,
				message: ""
			}
		}
	}

	const maxLength = (input,requiredLength)=>{
		const value = input.value.trim();
		if(value.length > requiredLength)
		{
			return {
				state: true,
				message: `maximum ${requiredLength} characters acceptable`
			}
		}

		else {
			return {
				state: false,
				message: ""
			}
		}
	}


	const updateValue = (e)=>{
		let input = e.target;
		let key = input.name;
		let value = input.value;
		return setInput((oldData)=>{
			return {
				...oldData,
				[key]: value
			}
		});
	}


	const validOnSubmit = ()=>{
		let valid = true;
		for(let key in input)
		{	
			if(input[key].length === 0)
			{	
				valid = false;
				setError((oldData)=>{
					return {
						...oldData,
						[key]: {
							state: true,
							message: "This field is required"
						}
					}
				});
			}
		}
		return valid;
	}

	const register = (e)=>{
		e.preventDefault();
		const isValid = validOnSubmit();
		if(isValid)
		{
			dispatch(signupRequest(input)); 
		}
	}

	const design = (
		<>
			<Grid container>
				<Grid item>
				  <MediaQuery minWidth={1224}>
					<img src="images/auth.jpg" alt="auth" width="100%" />
				  </MediaQuery>

				   <MediaQuery maxWidth={1224}>
						<img src="images/auth-mobile.jpg" alt="auth" width="100%"/>
				   </MediaQuery>
				</Grid>
				<Grid item sx={{p:5}}>
					<Typography variant="h4" sx={{mb:4}}>
						Register
					</Typography>
					<form onSubmit={register}>
						<Stack direction="column" spacing={3}>
							<TextField 
							error={error.fullname.state}
							helperText={error.fullname.message}
							name="fullname" 
							value={input.fullname} 
							label="Fullname" 
							variant="outlined" 
							onChange={updateValue}
							onBlur={fullnameValidation}
							onInput={fullnameValidation}
							/>

							<TextField 
							error={error.phone.state}
							helperText={error.phone.message}
							name="phone" 
							value={input.phone} 
							type="number" 
							label="Phone Number" 
							variant="outlined" 
							onChange={updateValue}
							onBlur={phoneValidation}
							onInput={phoneValidation}
							/>

							<TextField 
							error={error.email.state}
							helperText={error.email.message}
							name="email" 
							value={input.email} 
							type="email" 
							label="Email" 
							variant="outlined" 
							onChange={updateValue}
							onBlur={emailValidation}
							onInput={emailValidation}
							/>

							<TextField 
							error={error.password.state}
							helperText={error.password.message}
							name="password" 
							value={input.password} 
							type="password" 
							label="Password" 
							variant="outlined" 
							onChange={updateValue}
							onBlur={passwordValidation}
							onInput={passwordValidation} 
							/>

							<Stack direction="row" justifyContent="space-between">
								<FormGroup>
									<FormControlLabel checked={checked} onChange={()=>setChecked(!checked)} label="I accept terms & conditions" control={<Checkbox />}/>
								</FormGroup>
								<Button type="button" component={Link} to="login">Already have an account</Button>
							</Stack>
							<Button 
							disabled={
								error.fullname.state ||
								error.phone.state ||
								error.email.state ||
								error.password.state ||
								!checked
							}
							type="submit" 
							variant="contained"
							>
							Signup</Button>
						</Stack>
					</form>
					<Alert/>
				</Grid>
			</Grid>
		</>
	);
	return design;
}

export default Signup;