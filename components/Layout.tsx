import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Head from "next/head";
import Link from "next/link";

import { Container, Nav, NavItem } from "reactstrap";
import { logout } from "../lib/auth";

const Layout = (props) => {
	const title = "My Next App";
	const { user, setUser } = useContext(AppContext);

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
				<link
					rel='stylesheet'
					href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
					integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
					crossOrigin='anonymous'
				/>
				<script src='https://js.stripe.com/v3' />
			</Head>
			<header>
				<style jsx>{`
					a {
						color: white;
					}
				`}</style>
				<Nav className='navbar navbar-dark bg-dark'>
					<NavItem>
						<Link href='/'>
							<a className='navbar-brand'>Home</a>
						</Link>
					</NavItem>
					{user ? (
						<>
							<NavItem className='ml-auto'>
								<h5>{user.username}</h5>
							</NavItem>

							<NavItem>
								<Link href='/'>
									<a
										className='nav-link'
										onClick={() => {
											logout();
											setUser(null);
										}}>
										Log Out
									</a>
								</Link>
							</NavItem>
						</>
					) : (
						<>
							{" "}
							<NavItem className='ml-auto'>
								<Link href='/login'>
									<a className='nav-link'>Sign In</a>
								</Link>
							</NavItem>
							<NavItem>
								<Link href='/register'>
									<a className='nav-link'>Sign Up</a>
								</Link>
							</NavItem>
						</>
					)}{" "}
				</Nav>
			</header>
			<Container>{props.children}</Container>
		</div>
	);
};

export default Layout;
