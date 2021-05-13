import { Button, Alert } from "reactstrap";
import Link from "next/link";
import { Cart } from "../components/Cart";

const App = () => {
	return (
		<div>
			<div>
				<Alert color='primary'>
					Hello Project is Strapi-Next with Bootstrap
				</Alert>
				&nbsp;{" "}
				<Link href='/restaurants'>
					<Button color='primary'> Go to Restaurant List </Button>
				</Link>
				<Cart />
			</div>
		</div>
	);
};

export default App;
