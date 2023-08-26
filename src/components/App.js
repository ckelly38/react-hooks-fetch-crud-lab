import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

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

  function addQuestion(qstn)
  {
    console.log("qstn", qstn);
    if (qstn === undefined || qstn === null || qstn.length < 10)
    {
      throw new Error("question is invalid!");
    }
    else
    {
      for (let n = 0; n < questions.length; n++)
      {
        if (questions[n].prompt === qstn.prompt)
        {
          throw new Error("question is already used!");
        }
        //else;//do nothing
      }
    }

    //question is valid
    let myanswrsarr = [qstn.answer1, qstn.answer2, qstn.answer3, qstn.answer4];
    let myqstnobj = {
      prompt: qstn.prompt,
      answers: myanswrsarr,
      correctIndex: qstn.correctIndex
    };

    let myconfigobj = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(myServerObj(myqstnobj))
    };
    fetch("http://localhost:4000/questions/", myconfigobj).then((response) => response.json()).then((response) => {
      console.log("response = ", response);
      console.log("added the question to the server!");
      let nwquestions = [...questions, response];
      setQuestions(nwquestions);
      console.log("added the question to the list and to the server!");
    }).catch((err) => {
      console.error("there was a problem adding the question to the list or to the server!");
      console.error(err);
      alert("there was a problem adding the question to the list or to the server!");
    });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> :
      <QuestionList questions={questions} setQuestions={setQuestions} />}
    </main>
  );
}

export default App;
