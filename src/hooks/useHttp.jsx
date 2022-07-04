import axios from "axios";

import {
	useState,
	useEffect
} from "react";

const useHttp = (request)=>{
	const [httpResponse,setHttpResponse] = useState(null);
	const [httpError,setHttpError] = useState(null);
	const [httpLoader,setHttpLoader] = useState(true);

	axios(request)
	.then((response)=>{
		setHttpResponse(response.data);
	})
	.catch((err)=>{
		setHttpError(err);
	})
	.finally(()=>{
		setHttpLoader(false);
	});

	useEffect(()=>{
		if(request)
		{
			axios();
		}
	},[request]);

	return [httpResponse, httpError, httpLoader];
}

export default useHttp;