import { useState, useContext } from "react";
import Head from "next/head";
import { Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
import ClientOnly from "../components/ClientOnly";

import RestaurantList from "../components/RestaurantList";

const Restaurants = () => {
	const [query, setQuery] = useState("");
	return (
		<div>
			<Head>
				<title> Restaurant from client </title>
			</Head>

			<main>
				<h2> Restaurant List</h2>
				<Row>
					<Col>
						<div className='search'>
							<InputGroup>
								<InputGroupAddon addonType='append'>
									Search
								</InputGroupAddon>
								<Input
									onChange={(e) =>
										setQuery(e.target.value.toLowerCase())
									}
									value={query}
								/>
							</InputGroup>
						</div>
						<ClientOnly>
							<RestaurantList search={query} />
						</ClientOnly>
					</Col>{" "}
				</Row>
				<style jsx>
					{`
						.search {
							margin: 20px;
							width: 500px;
						}
					`}
				</style>
			</main>
		</div>
	);
};

export default Restaurants;
