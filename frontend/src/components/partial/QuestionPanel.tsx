import React, {useState, useEffect} from "react";
import {Link, useLocation } from "react-router-dom";

import "./scss/QuestionPanel.scss"

type Props = {
    question: string,
    startTimestamp: number,
    endTimestamp: number,
    question_id: number
}

function QuestionPanel({question, startTimestamp, endTimestamp, question_id}: Props) {

	return (

		<Link className="question-panel" to={"/question/" + question_id}>
            <span className="question-panel__question">{question}</span>
            <span className="question-panel__button">Vote</span>
        </Link>

	);
}

export default QuestionPanel;