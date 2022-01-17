// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20.sol";

contract Governance {
    struct Answer {
        string answer;
        uint256 count;
        uint256 question_id;
        uint256 answer_id;
    }
    struct Question {
        string question;
        uint256 question_id;
        uint256 startTimestamp;
        uint256 endTimestamp;
    }

    Question[] public questions;
    Answer[] public answers;

    uint256 public questionsCount;
    uint256 public answersCount;

    uint256 public votersCount;

    address owner;

    address ERC20_token_address;

    modifier _ownerOnly() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _ERC20_token_address) {
        owner = msg.sender;
        ERC20_token_address = _ERC20_token_address;
    }

    function addQuestion(
        string memory _question,
        string[] memory _answers,
        uint256 _startTimestamp,
        uint256 _endTimestamp
    ) public _ownerOnly {
        require(_answers.length <= 2**8, "Too many answers (max 256)");
        require(
            _startTimestamp < _endTimestamp,
            "Start time needs to be older than end time"
        );

        questions.push(
            Question(_question, questionsCount, _startTimestamp, _endTimestamp)
        );
        for (uint256 i = 0; i < _answers.length; i++) {
            answers.push(Answer(_answers[i], 0, questionsCount, answersCount));
            answersCount++;
        }

        questionsCount++;
    }

    function getQuestionById(uint256 _question_id)
        public
        view
        returns (Question memory)
    {
        require(_question_id < questionsCount, "No question with that index");
        return questions[_question_id];
    }

    function getAllQuestions() public view returns (Question[] memory) {
        return questions;
    }

    function getAnswersOfQuestion(uint256 _question_id)
        public
        view
        returns (Answer[] memory)
    {
        require(_question_id < questionsCount, "No question with that index");
        Answer[] memory questionAnswers = new Answer[](answersCount);
        uint256 j = 0;
        for (uint256 i = 0; i < answers.length; i++) {
            if (answers[i].question_id == _question_id) {
                Answer memory answer = answers[i];
                questionAnswers[j] = answer;
                j++;
            }
        }
        return questionAnswers;
    }

    // add test to check if user has already vote
    function vote(uint256 _questionIndex, uint256 _answerIndex) public {
        require(_questionIndex < questionsCount, "No question with that index");
        Question memory question = questions[_questionIndex];
        require(
            question.startTimestamp <= block.timestamp,
            "Voting hasn't started"
        );
        require(question.endTimestamp >= block.timestamp, "Voting has ended!");
        require(_answerIndex < answers.length, "No answer with that index");
        IERC20 token = IERC20(ERC20_token_address);
        uint256 balance = token.balanceOf(msg.sender);
        // ADD CHECK THAT USER HAVE AT LEAST 1 TOKEN
        require(balance > 0, "You need to have tokens!");
        // require(
        //     voters[msg.sender].voted[_answerIndex] == false,
        //     "You already answered this question"
        // );
        // ADD VOTE FOR 1 X NUM OF TOKENS
        answers[_answerIndex].count += balance;
        // voters[msg.sender].voted[_answerIndex] = true;
    }

    function getQuestionsCount() public view returns (uint256) {
        return questionsCount;
    }

    function getAnswersCount(uint256 _question_id)
        public
        view
        returns (uint256)
    {
        require(_question_id < questionsCount, "No question with that index");
        uint256 answersLength = 0;
        for (uint256 i = 0; i < answers.length; i++) {
            if (answers[i].question_id == _question_id) {
                answersLength++;
            }
        }
        return answersLength;
    }

    function getMostVoted(uint256 _question_id)
        public
        view
        returns (Answer memory)
    {
        require(_question_id < questionsCount, "No question with that index");
        uint256 mostVotedIndex = 0;
        for (uint256 i = 1; i < answers.length; i++) {
            if (
                answers[i].question_id == _question_id &&
                answers[i].count > answers[mostVotedIndex].count
            ) {
                mostVotedIndex = i;
            }
        }
        return answers[mostVotedIndex];
    }
}
