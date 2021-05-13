import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { GetServerSideProps } from "next";

import { CheckoutForm } from "../components/checkout/CheckoutForm";

import { Cart } from "../components/Cart";

const Checkout = ({ stripeKey }) => {
	const stripePromise = loadStripe(stripeKey);

	return (
		<Row>
			<Col
				style={{ paddingRight: 0 }}
				sm={{ size: 3, order: 1, offset: 2 }}>
				<h1 style={{ margin: 20 }}>Checkout</h1>
				<Cart />
			</Col>
			<Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
				<Elements stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			</Col>
		</Row>
	);
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	return {
		props: {
			stripeKey: process.env.STRIPE_PKKEY,
		},
	};
};

export default Checkout;
