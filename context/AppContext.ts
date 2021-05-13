import { createContext } from "react";

interface IAppContext {
	isAuthenticated: boolean;
}

export const AppContext = createContext<any>({ isAuthenticated: false });
