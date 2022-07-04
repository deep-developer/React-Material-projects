import {
	Grid,
    Stack,
    Button,
    Container,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel
} from "@mui/material";

import {
	useState
} from "react";

import {
	Link,
	useNavigate
} from 'react-router-dom';

import * as yup from 'yup';

const Login = ()=>{
	const navigate = useNavigate();
	const [input,setInput] = useState({
		username: "",
		password: ""
	});

	const handleInput = (e)=>{
		e.preventDefault();
		const input = e.target;
		const key = input.name;
		const value = input.value;
		return setInput((oldData)=>{
			return {
				...oldData,
				[key]: value
			};
		});
	}

	const schema = yup.object().shape({
		username: yup.string().required().email();
		password: yup.string.required.min(8).max(15);
	});

	const login = (e)=>{
		e.preventDefault();
		navigate("/admin");
	}

	const design = (
		<>
			<Container>
				<Grid container>
					<Grid item sm={6}>
						<h1>One</h1>
					</Grid>

					<Grid item sm={6}>
						<h1>Login</h1>
						<form>
						<Stack direction="column" spacing={3}>
							<TextField 
							label="Username" 
							variant="outlined"
							name="username"
							value={input.username}
							onChange={handleInput}
							 />

							<TextField 
							label="Password"
							variant="outlined" 
							type="password"
							name="password"
							value={input.password}
							onChange={handleInput}
							 />
							<Stack direction="row" justifyContent="space-between">
								<FormGroup>
									<FormControlLabel control={<Checkbox />} label="Rememeber me"/>
								</FormGroup>
								<Button variant="contained" color="secondary" onClick={login}>Login</Button>
							</Stack>
							<Stack direction="row" justifyContent="space-between">
								<a href="#">Forgot Password</a>
								<Link to="/">Create New Account</Link>
							</Stack>
						</Stack>
						</form>
					</Grid>
				</Grid>
			</Container>
		</>
	);
	return design;
}

export default Login;