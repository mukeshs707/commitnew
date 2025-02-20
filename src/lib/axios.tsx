import Axios, { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../config";
import storage from "../utils/storage";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	const niyoToken =
		typeof window !== "undefined" ? window.localStorage.getItem("niyoToken") : null;

	const token = niyoToken || storage.getToken();

	config.headers = config.headers || {};

	if (token) {
		config.headers.authorization = `Bearer ${token}`;
	}
	config.headers.Accept = "application/json";
	
	return config;
}

export const axios = Axios.create({
	baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
	(response) => response.data,
	(error) => {
		if (
			typeof window !== "undefined" &&
			error.response &&
			error.response.status === 401 &&
			storage.getToken()
		) {
			storage.clearToken();
			window.location.href = "/login";
		}
		return Promise.reject(error.response);
	}
);
