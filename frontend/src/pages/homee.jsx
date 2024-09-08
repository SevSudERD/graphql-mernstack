<form className='w-full max-w-lg flex flex-col gap-5 px-2 mt-6' onSubmit={handleSubmit}>
				{/* TRANSACTION */}
				<div className='flex flex-wrap'>
					<div className='w-full'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-3'
							htmlFor='description'
						>
							Transaction
						</label>
						<img
						src={authUserData?.authUser?.profilePicture || '/default-avatar.png'}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='description'
							name='description'
							type='text'
							placeholder='Salary,market,rent etc.'
							value={formData.description}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* PAYMENT TYPE */}
				<div className='flex flex-wrap gap-3'>
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='paymentType'
						>
							Payment Type
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='paymentType'
								name='paymentType'
								onChange={handleInputChange}
								defaultValue={formData.paymentType}
							>
								<option value={"card"}>Card</option>
								<option value={"cash"}>Cash</option>
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
								>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>

					{/* CATEGORY */}
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='category'
						>
							Category
						</label>
						<div className='relative'>
							<select
								className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
								id='category'
								name='category'
								onChange={handleInputChange}
								defaultValue={formData.category}
							>
								<option value={"saving"}>Saving</option>
								<option value={"expense"}>Expense</option>
								<option value={"investment"}>Investment</option>
							</select>
							<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
								<svg
									className='fill-current h-4 w-4'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
								>
									<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
								</svg>
							</div>
						</div>
					</div>

					{/* AMOUNT */}
					<div className='w-full flex-1 mb-3 md:mb-0'>
						<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
							Amount($)
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='amount'
							name='amount'
							type='number'
							placeholder='150'
							value={formData.amount}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				{/* LOCATION */}
				<div className='flex flex-wrap gap-3'>
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='location'
						>
							Location
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
							id='location'
							name='location'
							type='text'
							placeholder='New York'
							value={formData.location}
							onChange={handleInputChange}
						/>
					</div>

					{/* DATE */}
					<div className='w-full flex-1'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='date'
						>
							Date
						</label>
						<input
							type='date'
							name='date'
							id='date'
							className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[8px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white'
							placeholder='Select date'
							value={formData.date}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* SUBMIT BUTTON */}
				<button
					className='w-full bg-slate-100 text-white p-3 rounded-lg:bg-black focus:ring-2 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-900  rounded-2xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
					type='submit'
				>
					Make a Transaction
				</button>
				{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
				{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
			</form>









import { useState } from "react";
import { FaUserClock, FaUserPlus } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdPayment } from "react-icons/md";
import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import { MdLogout } from "react-icons/md";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";

const TransactionPage = () => {
	const [formData, setFormData] = useState({
		description: "",
		paymentType: "",
		category: "",
		amount: "",
		location: "",
		date: "",
	});
	const { data } = useQuery(GET_TRANSACTION_STATISTICS);
	const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);

	const [logout, { loading, client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("formData", formData);
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleLogout = async () => {
		try {
			await logout();
			// Clear the Apollo Client cache FROM THE DOCS
			// https://www.apollographql.com/docs/react/caching/advanced-topics/#:~:text=Resetting%20the%20cache,any%20of%20your%20active%20queries
			client.resetStore();
		} catch (error) {
			console.error("Error logging out:", error);
			toast.error(error.message);
		}
	};


	// if (loading) return <TransactionFormSkeleton />;

	return (
		<div className='p-8  max-w-md w-full mx-auto bg-gradient-to-br from-purple-500 via-purple-700 to-purple-400 rounded-3xl shadow-lg '>
			 <div className='p-3 max-w-80 w-full mx-auto gap-5 flex justify-center  bg-gradient-to-br from-purple-400 via-purple-700 to-purple-400 rounded-2xl'>
                <FaUserPlus  className='text-white text-3xl' />
               <HiArrowLongRight className='flex items-center  text-white text-3xl' /> 
               <FaUserClock className='text-white text-3xl' />
               <HiArrowLongRight className='flex items-center  text-white text-3xl' /> 
               <MdPayment className='flex items-center  text-green-500 text-3xl' /> 
               </div>
			<TransactionForm/>
			<Cards/>
		</div>
	);
};
export default TransactionPage;