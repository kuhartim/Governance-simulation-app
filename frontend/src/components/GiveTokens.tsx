import React, {useState, useEffect, useCallback, useContext} from "react";

import { ERC20ContractWeb3Context } from "./partial/Layout"
import { utils } from "ethers"

import "./scss/GiveTokens.scss"

function GiveTokens() {

    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);

    const onAddressChange = useCallback( ({ target: { value } }) => setAddress(value), [setAddress]);
    const onAmountChange = useCallback( ({ target: { value } }) => setAmount(value), [setAmount]);

    const { contract: ERC20 } = useContext(ERC20ContractWeb3Context)

    const formSubmit = async (e: any) => {
        e.preventDefault();
        if(!ERC20) {
            console.log("Contract missing")
            return
        }

        try {
            await ERC20.transfer(address, utils.parseEther(String(amount)))
            setAddress("")
            setAmount(0)
        }
        catch(err: any) {
            console.error(err)
        }
    }

	return (

		<div className="give-tokens">
			<form className="give-tokens__form" onSubmit={formSubmit}>
                <input type="text" className="give-tokens__field" name="address" placeholder="Insert address" value={ address } onChange={ onAddressChange } required/>
                <input type="number" className="give-tokens__field" name="amount" placeholder="Insert amount" value={ amount } onChange={ onAmountChange } required/>
                <button type="submit" className="give-tokens__button">Add</button>
            </form>
        </div>

	);
}

export default GiveTokens;