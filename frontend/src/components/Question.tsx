import React, {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom"

import AnswerPanel from "./partial/AnswerPanel";

import { GovernanceContractJsonRpcContext } from "./partial/Layout"

import "./scss/Question.scss"

function Question() {

    const { id } = useParams()

    const [question, setQuestion] = useState<any>(null)

    const [answers, setAnswers] = useState<any[]>([])

	const GovernanceContract = useContext(GovernanceContractJsonRpcContext)

    useEffect(() => {
		(async () => {
			if(!GovernanceContract) {
				console.log("Contract missing")
				return
			}

			try {
				const contractQuestion = await GovernanceContract.getQuestionById(id)
                const contractAnswers = await GovernanceContract.getAnswersOfQuestion(id)
				setQuestion(contractQuestion)
                setAnswers(contractAnswers)
			}
			catch(err: any) {
				console.error(err)
			}
		})()
	}, [GovernanceContract])

	return (

		<div className="question">
            <span className="question__question">{question ? question.question : ""}</span>
            <div className="question__answers">{
                answers.map((answer, i) => answer.answer && <AnswerPanel key={answer.answer_id} {...answer} />)
            }</div>
        </div>

	);
}

export default Question;