import React from "react";

function QuestionItem({ question, questions, setQuestions, deleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function myServerObj(qstn)
  {
    if (qstn === undefined || qstn === null || qstn.length < 10) return null;
    else
    {
      //console.log("qstn = ", qstn);
      let myanswrsarr = [qstn.answers[0], qstn.answers[1], qstn.answers[2], qstn.answers[3]];
      let mysvrobj = {
        prompt: qstn.prompt,
        answers: myanswrsarr,
        correctIndex: qstn.correctIndex
      };
      return mysvrobj;
    }
  }
  
  function getQuestionFromEventTarget(eventtarget)
  {
    //somehow get the question from the list and send the object to the delete method prop
    //console.log("eventtarget = ", eventtarget);
    //console.log("event.target.parentNode.getElementsByTagName(h4)[0] = ", event.target.parentNode.getElementsByTagName("h4")[0]);
    let mytxtcontent = eventtarget.getElementsByTagName("h4")[0].textContent;
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
    return remq;
  }

  function handleDelEvent(event)
  {
    deleteQuestion(getQuestionFromEventTarget(event.target.parentNode));
  }

  function newCorrectAnswer(event)
  {
    console.log(event.target);
    console.log(event.target.value);
    console.log(event.target.parentNode.parentNode);
    const myqstn = getQuestionFromEventTarget(event.target.parentNode.parentNode);
    //console.log("myqstn", myqstn);
    //delete the question, then add the new question
    //OR I can get a list of all of the questions then when I come to this one, replace it.
    //the second option is still highly encouraged
    let nwqstn = {...myqstn};
    //for (let n = 0; n < 4; n++) nwqstn.answers[n] = "" + myqstn.answers[n];
    nwqstn.correctIndex = event.target.value;
    //console.log("nwqstn", nwqstn);
    let mynwqstns = questions.map((qstn) => {
      if (qstn.id === myqstn.id) return nwqstn;
      else return qstn;
    });
    let myconfigobj = {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(myServerObj(nwqstn))
    };
    fetch("http://localhost:4000/questions/" + nwqstn.id, myconfigobj).then((response) => response.json()).then((response) => {
      console.log("response = ", response);
      console.log("updated the question on the server!");
      setQuestions(mynwqstns);
      console.log("updated the questions list!");
    }).catch((err) => {
      console.error("there was a problem updating the question on the server!");
      console.error(err);
      alert("there was a problem updating the question on the server!");
    });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={newCorrectAnswer}>{options}</select>
      </label>
      <button onClick={handleDelEvent}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
