import Router from "next/router";
import Cookie from "js-cookie";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const registerUser = async (
	username: string,
	email: string,
	password: string
) => {
	if (typeof window === "undefined") {
		return;
	}

	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/auth/local/register`, {
				username,
				email,
				password,
			})
			.then((res) => {
				Cookie.set("token", res.data.jwt);

				resolve(res);

				Router.push("/");
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const login = (identifier: string, password: string) => {
	if (typeof window === "undefined") {
		return;
	}

	return new Promise((resolve, reject) => {
		axios
			.post(`${API_URL}/auth/local`, { identifier, password })
			.then((res) => {
				Cookie.set("token", res.data.jwt);

				resolve(res);

				Router.push("/");
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const logout = () => {
	Cookie.remove("token");

	//delete window.__user;

	window.localStorage.setItem("logout", Date.now().toString());

	Router.push("/");
};
