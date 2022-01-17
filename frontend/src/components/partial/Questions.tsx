import React, {useState, useEffect, useContext} from "react";

import { GovernanceContractJsonRpcContext } from "./Layout"

import QuestionPanel from "./QuestionPanel"

import "./scss/Questions.scss"


function Questions() {

    const [questions, setQuestions] = useState<any[]>([])

	const GovernanceContract = useContext(GovernanceContractJsonRpcContext)

    useEffect(() => {
		(async () => {
			if(!GovernanceContract) {
				console.log("Contract missing")
				return
			}

			try {
				const contractQuestions = await GovernanceContract.getAllQuestions()
				setQuestions(contractQuestions)
			}
			catch(err: any) {
				console.error(err)
			}
		})()
	}, [GovernanceContract])

	return (

		<div className="questions">
			<span className="questions__title">QUESTIONS</span>
			{
                questions.map((questionData) => <QuestionPanel key={questionData.question_id} {...questionData} />)
            }
        </div>

	);
}

export default Questions;