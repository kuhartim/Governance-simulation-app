import React, {useState, useEffect, useContext} from "react";
import {Link, useLocation } from "react-router-dom";

import {utils} from "ethers"

import { GovernanceContractWeb3Context } from "./Layout"

import "./scss/AnswerPanel.scss"

type Props = {
    answer: string,
    count: number,
    question_id: number,
    answer_id: number
}

function AnswerPanel({answer, count, question_id, answer_id}: Props) {

    const { contract: Governance } = useContext(GovernanceContractWeb3Context)

    const vote = async () => {

			if(!Governance) {
				console.log("Contract missing")
				return
			}

			try {
				await Governance.vote(question_id, answer_id)
			}
			catch(err: any) {
				alert("Wallet is not connected!")
				console.error(err)
			}
		
	}

	return (

		<button className="answer" onClick={vote}>
            <span className="answer__title">{answer}</span><br />
            <span className="answer__text">Votes: {utils.formatUnits(count)}</span>
        </button>

	);
}

export default AnswerPanel;