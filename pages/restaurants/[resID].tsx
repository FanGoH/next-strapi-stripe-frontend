import { GetServerSideProps } from "next";
import ClientOnly from "../../components/ClientOnly";

import DishesList from "../../components/DishesList";

const Restaurant = ({ resID }) => {
	return (
		<main>
			<ClientOnly>
				<DishesList resID={resID as string} />
			</ClientOnly>
		</main>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	return { props: { resID: query.resID } };
};

export default Restaurant;
