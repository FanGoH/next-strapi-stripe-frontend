import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../Hooks/apolloClient";
import { AppProps } from "next/app";
import Head from "next/head";

import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";

import { AppContext } from "../context/AppContext";

import Layout from "../components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
	const [user, setUser] = useState(null);
	const [cart, setCart] = useState({ items: [], total: 0 });

	useEffect(() => {
		const token = Cookie.get("token");
		const cartCookie = Cookie.get("cart");

		if (typeof cartCookie === "string" && cart !== undefined) {
			JSON.parse(cartCookie).forEach((item) => {
				setCart({
					items: [...cart.items, item],
					total: cart.total + item.price * item.quantity,
				});
			});
		}

		if (token) {
			fetch(
				`https://next-strapi-stripe-backend.herokuapp.com//users/me`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			).then(async (res) => {
				if (!res.ok) {
					Cookie.remove("token");
					setUser(null);
					return null;
				}
				const user = await res.json();
				setUser(user);
			});
		}
	}, []);

	const addItem = (item: { quantity: number; price: number; id: string }) => {
		const { items } = cart;
		const newItem = items.find((i) => i.id === item.id);

		if (!newItem) {
			item.quantity = 1;
			setCart({
				items: [...items, item],
				total: cart.total + item.price,
			});
			return;
		}

		setCart({
			items: items.map((item) =>
				item.id === newItem.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			),
			total: cart.total + item.price,
		});
	};

	const removeItem = (item: {
		quantity: number;
		price: number;
		id: string;
	}) => {
		const { items } = cart;
		const newItem = items.find((i) => i.id === item.id);

		if (newItem.quantity > 1) {
			setCart({
				items: cart.items.map((item) =>
					item.id === newItem.id
						? { ...item, quantity: item.quantity - 1 }
						: item
				),
				total: cart.total - item.price,
			});
			return;
		}

		const index = items.findIndex((i) => i.id === newItem.id);

		items.splice(index, 1);
		setCart({
			items: [...items],
			total: cart.total - item.price,
		});
	};

	useEffect(() => {
		Cookie.set("cart", cart.items);
	}, [cart]);

	return (
		<AppContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				setUser,
				cart,
				addItem: addItem,
				removeItem: removeItem,
			}}>
			<Head>
				<link
					rel='stylesheet'
					href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
					integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
					crossOrigin='anonymous'
				/>
				<title>My Next App</title>
			</Head>
			<Layout>
				<ApolloProvider client={client}>
					<Component {...pageProps} />
				</ApolloProvider>
			</Layout>
		</AppContext.Provider>
	);
};

export default App;
