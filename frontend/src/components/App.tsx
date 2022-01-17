import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./partial/Layout";
import Home from "./Home";
import GiveTokens from "./GiveTokens";
import Question from "./Question";
import CreateQuestion from "./CreateQuestion";

function App() {

	return (

		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/give-tokens" element={<GiveTokens />} />
					<Route path="/question/:id" element={<Question />} />
					<Route path="/create-question" element={<CreateQuestion />} />
				</Routes>
			</Layout>
		</BrowserRouter>

	);
}

export default App;