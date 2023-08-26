import React from "react";

function QuestionItem({ question, questions, deleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelEvent(event)
  {
    //somehow get the question from the list and send the object to the delete method prop
    //console.log("event.target = ", event.target);
    //console.log("event.target.parentNode.getElementsByTagName(h4)[0] = ", event.target.parentNode.getElementsByTagName("h4")[0]);
    let mytxtcontent = event.target.parentNode.getElementsByTagName("h4")[0].textContent;
    //console.log("mytxtcontent = " + mytxtcontent);
    let myidstr = mytxtcontent.substring(mytxtcontent.indexOf("Question ") + 9);
    //console.log("myidstr = " + myidstr);
    //console.log("questions = ", questions);

    //the questions are generated in order, once we get the question text, we can figure out where it is on the list
    //assumes the questions are unique
    //alternatively search for h4 to obtain id, then search the list for it
    //this second approach will be used because it avoids my assumption on the other one
    
    let remq = null;
    for (let n = 0; n < questions.length; n++)
    {
      if (questions[n].id === Number(myidstr))
      {
        remq = questions[n];
        break;
      }
      //else;//do nothing
    }
    deleteQuestion(remq);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelEvent}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
