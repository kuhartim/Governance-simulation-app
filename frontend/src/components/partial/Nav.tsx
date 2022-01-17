import React, { useState, useCallback, useContext, useEffect } from "react";
import {Link, useLocation } from "react-router-dom";
import clsx from "clsx"
import ERC20Contract from "../../contracts/ERC20.json"
import GovernanceContract from "../../contracts/Governance.json"

import { providerWeb3Context, signerContext, ERC20ContractWeb3Context, GovernanceContractWeb3Context} from "./Layout"


import "./scss/Nav.scss";
import { ethers, utils } from "ethers";


function Nav() {

	const [balance, setBalance] = useState("");

	const location = useLocation();

	const providerContext = useContext(providerWeb3Context)
	const signer = useContext(signerContext)
	const ERC20 = useContext(ERC20ContractWeb3Context)
	const Governance = useContext(GovernanceContractWeb3Context)

	const connect = async () => {
		try{
			if(!signer.signer)
				await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
		}
		catch(err : any) {
			if(err?.code === 4001) {
				console.log("connect to metamask")
			}
			else {
				console.error(err)
			}
			return
		}
		const newSigner = providerContext?.getSigner();
		signer.setSigner(newSigner);
		signer.setAddress(await newSigner?.getAddress())

		if(!process.env.REACT_APP_CONTRACT_ERC20_ADDRESS) console.log("contract address doesn't exist")

		const contractERC20 = new ethers.Contract(process.env.REACT_APP_CONTRACT_ERC20_ADDRESS || "", ERC20Contract.abi, newSigner);
		ERC20.setContract(contractERC20)

		const contractGovernance = new ethers.Contract(process.env.REACT_APP_CONTRACT_GOVERNANCE_ADDRESS || "", GovernanceContract.abi, newSigner);
		Governance.setContract(contractGovernance)

		const balance = await contractERC20.balanceOf(await newSigner?.getAddress())
		setBalance(utils.formatEther(balance))
		// console.log(await newSigner?.getAddress())
		// const balance = await contract.balanceOf(await newSigner?.getAddress())
		// console.log(balance)
		// console.log(utils.formatEther(balance))
	}

	return (

		<nav className="nav">
			<ul className="nav__menu">
				<li className={clsx("nav__menu-item", location.pathname == "/" && "nav__menu-item--active")}>
					<Link className="nav__menu-item-link" to="/">Home</Link>
				</li>
				<li className={clsx("nav__menu-item", location.pathname == "/give-tokens" && "nav__menu-item--active")}>
					<Link className={"nav__menu-item-link"} to="/give-tokens">Give Tokes</Link>
				</li>
				<li className={clsx("nav__menu-item", location.pathname == "/create-question" && "nav__menu-item--active")}>
					<Link className={"nav__menu-item-link"} to="/create-question">Create Question</Link>
				</li>
				<li className="nav__menu-item-button">
					<button className="nav__button" onClick={connect}>{
						signer?.address || "Connect with metamask"
					}</button>
				</li>{
					balance && <span className="nav__menu-balance">Balance: {balance}</span>
				}
			</ul>
		</nav>

	);
}

export default Nav;