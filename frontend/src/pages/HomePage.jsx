import { useState } from "react";
import { FaUserClock, FaUserPlus } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdPayment } from "react-icons/md";
import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const HomePage = () => {
	const [formData, setFormData] = useState({
		description: "",
		paymentType: "",
		category: "",
		amount: "",
		location: "",
		date: "",
	});
	const [logout, { client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

	const handleLogout = async () => {
		try {
			await logout();
			client.resetStore();
		} catch (error) {
			console.error("Error logging out:", error);
			toast.error(error.message);
		}
	};

	return (
		<div className="flex sm:items-center p-8 space-x-4">
			{/* Left side: Form */}
			<div className="w-1/2 max-w-md bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400  rounded-3xl shadow-lg">
				<div className="p-3 mt-7 m-4 mb-5  flex justify-center gap-5 bg-gradient-to-br from-purple-400 via-purple-700 to-purple-400 rounded-2xl">
					<FaUserPlus className="text-white text-3xl" />
					<HiArrowLongRight className="text-white text-3xl" />
					<FaUserClock className="text-white text-3xl" />
					<HiArrowLongRight className="text-white text-3xl" />
					<MdPayment className="text-cyan-500 text-3xl" />
				</div>
				<TransactionForm />
			</div>

			{/* Right side: Cards (History) */}
			<div className="w-1/2">
				<Cards />
			</div>
		</div>
	);
};

export default HomePage;
