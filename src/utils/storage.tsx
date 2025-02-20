import { AUTH } from "./auth";

const storage = {
	getToken: () => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("token");
		}
		return null;
	},

	setToken: (token: string) => {
		if (typeof window !== "undefined") {
			localStorage.setItem("token", token);
		}
	},

	clearToken: () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("token");
		}
	},

	validateRememberMe: () => {
		if (typeof window !== "undefined") {
			return localStorage.getItem(AUTH.REMEMBERME) === AUTH.TRUE;
		}
		return false;
	},

	storeRememberMe: (token: string) => {
		if (typeof window !== "undefined") {
			localStorage.setItem(AUTH.REMEMBERME, token);
		}
	}
};

export default storage;
