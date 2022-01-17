import React, {useState, useEffect, useCallback, useContext} from "react";

import { GovernanceContractWeb3Context } from "./partial/Layout"
import { utils, BigNumber } from "ethers"



import "./scss/CreateQuestion.scss"

type TargetProp = {
    target: {
        value: any
    }
}

function CreateQuestion() {

    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState("");

    const onQuestionChange = ({ target: { value } }: TargetProp) => setQuestion(value);
    const onAnswersChange = ({target: { value }}: TargetProp) => setAnswers(value);

    const { contract: Governance } = useContext(GovernanceContractWeb3Context)

    const formSubmit = async (e: any) => {
        e.preventDefault();
        if(!Governance) {
            console.log("Contract missing")
            return
        }

        try {
            const curTime = Math.round(Date.now() / 1000)
            const startTime = curTime - 100
            const endTime = curTime + 60 * 60 * 10
            const options = {
                // gasLimit: "10000000"
            }
            await Governance.addQuestion(question, answers.split('\n'), startTime, endTime, options)
            setQuestion("")
            setAnswers("")
        }
        catch(err: any) {
            console.error(err)
        }
    }

	return (

		<div className="create-question">
            <span>Only contract owner can do that</span>
			<form className="create-question__form" onSubmit={formSubmit}>
                <input type="text" className="create-question__field" name="question" placeholder="Insert question" value={ question } onChange={ onQuestionChange } required/>
                <textarea className="create-question__field" name="answers" placeholder="Insert answers and split them by new line" value={ answers } onChange={ onAnswersChange } required/>
                
                <button type="submit" className="create-question__button">Add to blockchain</button>
            </form>
        </div>

	);
}

export default CreateQuestion;