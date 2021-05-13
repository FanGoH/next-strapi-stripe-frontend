import { useQuery, gql } from "@apollo/client";

import {
	Alert,
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Row,
} from "reactstrap";
import { Cart } from "./Cart";

import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const GET_RESTAURANT_DISHES = gql`
	query ($id: ID!) {
		restaurant(id: $id) {
			id
			name
			dishes {
				id
				name
				description
				price
				image {
					url
				}
			}
		}
	}
`;

const DishesList = ({ resID }: { resID: string }) => {
	const appContext = useContext(AppContext);

	const { data, loading, error } = useQuery<{
		restaurant: {
			id: string;
			name: string;
			dishes: {
				id: string;
				name: string;
				description: string;
				price: number;
				image: { url: string };
			}[];
		};
	}>(GET_RESTAURANT_DISHES, { variables: { id: resID } });

	if (error) return <Alert color='danger'>Couldn't load dishes</Alert>;

	if (loading) return <h1> Loading data . . . </h1>;

	if (data.restaurant) {
		const { restaurant } = data;
		return (
			<>
				<h1>{restaurant.name}</h1>
				<Row>
					{restaurant.dishes.map((dish) => (
						<Col xs='6' sm='4' style={{ padding: 0 }} key={dish.id}>
							<Card style={{ margin: "0 10px" }}>
								<CardImg
									top={true}
									style={{ height: 250 }}
									src={`${dish.image.url}`}
								/>
								<CardBody>
									<CardTitle>{dish.name}</CardTitle>
									<CardText>{dish.description}</CardText>
									<CardText>${dish.price}</CardText>
								</CardBody>
								<div className='card-footer'>
									<Button
										outline
										color='primary'
										onClick={() =>
											appContext.addItem({
												id: dish.id,
												name: dish.name,
												price: dish.price,
												quantity: 1,
											})
										}>
										+ Add To Cart
									</Button>

									<style jsx>
										{`
											a {
												color: white;
											}
											a:link {
												text-decoration: none;
												color: white;
											}
											.container-fluid {
												margin-bottom: 30px;
											}
											.btn-outline-primary {
												color: #007bff !important;
											}
											a:hover {
												color: white !important;
											}
										`}
									</style>
								</div>
							</Card>
						</Col>
					))}
					<Col xs='3' style={{ padding: 0 }}>
						<div>
							<Cart />
						</div>
					</Col>
				</Row>
			</>
		);
	}
	return <h1>Add dishes</h1>;
};

export default DishesList;
