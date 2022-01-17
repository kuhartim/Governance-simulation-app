const Governance = artifacts.require("Governance");

contract("Governance", (accounts) => {
  const admin = accounts[0];

  it("...should add question", async () => {
    const GovernanceInstance = await Governance.deployed();

    const curTime = Math.round(Date.now() / 1000);
    const startTime = curTime - 100;
    const endTime = curTime + 60 * 60 * 10;

    await GovernanceInstance.addQuestion(
      "test question",
      ["sfgsdjhfgsdhjfg", "sdfsdfsdfsdf", "sfsdfsdfsdf"],
      startTime,
      endTime,
      { from: admin }
    );

    const count = await GovernanceInstance.questionsCount();
    assert.equal(count, 1, "Question was not added");

    const question = await GovernanceInstance.getQuestionById(0);
    assert.equal(question.question_id, 0, "Question was not added");

    // const q = await GovernanceInstance.getAllQuestions();
  });
});
