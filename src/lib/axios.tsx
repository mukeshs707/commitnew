import Axios, { InternalAxiosRequestConfig } from "axios";

import { API_URL } from "../config";
import storage from "../utils/storage";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	let niyoToken = null;
	try {
		niyoToken = window?.localStorage?.getItem('niyoToken');
	} catch (e) {
		console.log('Storage access failed:', e);
	}

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
	(response) => {
		return response.data;
	},
	(error) => {
		if (error.response && error.response.status === 401 && storage.getToken()) {
			try {
				window?.localStorage?.clear();
				window?.location?.assign('/login');
			} catch (e) {
				console.log('Navigation failed:', e);
			}
		}
		return Promise.reject(error.response);
	}
);

const getBaseUrl = () => {
	try {
		return window?.location?.origin || '';
	} catch (e) {
		console.log('Location access failed:', e);
		return '';
	}
};
