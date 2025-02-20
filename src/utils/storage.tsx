import { AUTH } from "./auth";

export const storage = {
	getToken: () => {
		try {
			return window?.localStorage?.getItem("token") || null;
		} catch (e) {
			console.log('Storage access failed:', e);
			return null;
		}
	},
	setToken: (token: string) => {
		try {
			window?.localStorage?.setItem("token", token);
		} catch (e) {
			console.log('Storage access failed:', e);
		}
	},
	clearToken: () => {
		try {
			window?.localStorage?.removeItem("token");
		} catch (e) {
			console.log('Storage access failed:', e);
		}
	},
	validateRememberMe: () => {
		try {
			return window?.localStorage?.getItem(AUTH.REMEMBERME) === AUTH.TRUE;
		} catch (e) {
			console.log('Storage access failed:', e);
			return false;
		}
	},
	storeRememberMe: (token: string) => {
		try {
			window?.localStorage?.setItem(AUTH.REMEMBERME, token);
		} catch (e) {
			console.log('Storage access failed:', e);
		}
	}
};

export default storage;