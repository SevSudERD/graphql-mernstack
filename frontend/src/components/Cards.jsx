import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import Card from "./Card";

const Cards = () => {
	const { data, loading, error } = useQuery(GET_TRANSACTIONS);
	const { data: authUser, loading: loadingAuth } = useQuery(GET_AUTHENTICATED_USER);

	const { data: userAndTransactions, loading: loadingUserAndTransactions } = useQuery(
		GET_USER_AND_TRANSACTIONS,
		{
			variables: {
				userId: authUser?.authUser?._id,
			},
			skip: !authUser?.authUser?._id, // userId yoksa sorguyu atlama
		}
	);

	console.log("userAndTransactions:", userAndTransactions);
	console.log("cards:", data);

	if (loading || loadingAuth || loadingUserAndTransactions) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-2xl text-white text-center uppercase my-10'>Hıstory</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{data?.transactions?.map((transaction) => (
					<Card key={transaction._id} transaction={transaction} authUser={authUser.authUser} />
				))}
			</div>
			{data?.transactions?.length === 0 && (
				<p className='text-1xl text-white text-center w-full'>No transaction history found.</p>
			)}
		</div>
	);
};

export default Cards;