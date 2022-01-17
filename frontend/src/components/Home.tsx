import React from "react";


import Questions from "./partial/Questions";



function App() {




	// const [contract, _setContract] = useState(null)
	// const [provider, _setProvider] = useState(null)
	// const [signer, _setSigner] = useState(null)
	
	// const setContract = () => {
	// 	const CONTRACT_ADDRESS = ERC20Contract.networks['5777'].address;

	// 	const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');

	// 	const signer = provider.getSigner()

	// 	_setProvider(provider as any)
	// 	_setSigner(signer as any)

	// 	const ABI = [
	// 		'function name() public view virtual override returns (string memory)',
	// 		'function symbol() public view virtual override returns (string memory)'
	// 	]

	// 	const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
	// 	_setContract(contract as any)
	// };




	return (

		<div>
			<Questions />
        </div>

	);
}

export default App;