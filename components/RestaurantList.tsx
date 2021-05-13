import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import {
	Alert,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Row,
	Col,
} from "reactstrap";

const QUERY = gql`
	query {
		restaurants {
			id
			name
			description
			image {
				url
			}
		}
	}
`;

const RestaurantList = ({ search }) => {
	const { data, loading, error } =
		useQuery<{
			restaurants: Array<{
				id: string;
				name: string;
				description: string;
				image: { url: string };
			}>;
		}>(QUERY);

	if (loading) {
		return <Alert color='success'>Loading</Alert>;
	}

	if (error) {
		return <Alert color='danger'>{error.name}</Alert>;
	}

	if (data.restaurants && data.restaurants.length) {
		const searchQuery = data.restaurants.filter((query) =>
			query.name.toLowerCase().includes(search)
		);

		if (searchQuery.length !== 0) {
			return (
				<Row>
					{searchQuery.map((res) => (
						<Col xs='6' sm='4' key={res.id}>
							<Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
								<CardImg
									top={true}
									style={{ height: 250 }}
									src={`${res.image.url}`}
								/>
								<CardBody>
									<CardTitle>{res.name}</CardTitle>
									<CardText
										dangerouslySetInnerHTML={{
											__html: res.description,
										}}
									/>
								</CardBody>
								<div className='card-footer'>
									<Link href={`/restaurants/${res.id}`}>
										<a className='btn btn-primary'>View</a>
									</Link>
								</div>
							</Card>
						</Col>
					))}

					<style jsx global>
						{`
							a {
								color: white;
							}
							a:link {
								text-decoration: none;
								color: white;
							}
							a:hover {
								color: white;
							}
							.card-columns {
								column-count: 3;
							}
						`}
					</style>
				</Row>
			);
		} else {
			return <h1>No restaurants found</h1>;
		}
	}
	return <h5>Add Restaurants</h5>;
};

export default RestaurantList;
