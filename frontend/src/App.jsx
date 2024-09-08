import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
import TransactionPage from "./pages/TransactionPage";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {
	const { loading, data } = useQuery(GET_AUTHENTICATED_USER);
  
	if (loading) return null;

	return (
		<div className="w-full h-screen flex justify-center items-center bg-purple-950">
			
			<Routes>
				<Route path='/home' element={ <HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/' element={<SignUpPage />} />
				<Route
					path='/transaction/:id'
					element={<TransactionPage />}
				/>
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;