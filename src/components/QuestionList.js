import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions}) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    fetch("http://localhost:4000/questions").then((response) => response.json()).then((response) => {
      console.log("response = ", response);
      setQuestions(response);
      setIsLoaded(true);
    }).catch((err) => {
      console.error("there was a problem fetching the data from the server!");
      console.error(err);
      alert("there was a problem fetching the data from the server!");
    });
  }, []);

  function handleDeleteQuestion(question)
  {
    if (question === undefined || question === null)
    {
      throw "invalid question! Question must be defined!";
    }
    //else;//do nothing

    //need to remove the question from the server, list, and the DOM
    //when removed from the list, the DOM will rerender
    let myconfigobj = {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json"
      }
    };
    fetch("http://localhost:4000/questions/" + question.id, myconfigobj).then((response) => response.json()).then((response) => {
      console.log("response = ", response);
      console.log("deleted from the server!");
      let nwquestions = questions.filter((qstn) => {
        if (qstn.id === question.id) return false;
        else return true;
      });
      setQuestions(nwquestions);
      console.log("deleted from the list and the server!");
    }).catch((err) => {
      console.error("there was a problem deleting the data from the server!");
      console.error(err);
      alert("there was a problem deleting the data from the server!");
    });
  }

  //console.log("rendering component:");
  //console.log("isLoaded = " + isLoaded);
  //console.log("questions = ", questions);

  let myqstnsarr = null;
  if (questions === undefined || questions === null || questions.length < 1);
  else
  {
    myqstnsarr = questions.map((qstn) => {
      return (
        <QuestionItem key={qstn.id} question={qstn} questions={questions} setQuestions={setQuestions} deleteQuestion={handleDeleteQuestion} />
      );
    });
  }
  //console.log("myqstnsarr = ", myqstnsarr);

  return (
    <section>
      <h1>Quiz Questions</h1>
      {isLoaded ? <ul>{myqstnsarr}</ul> : <ul>Loading...</ul>}
    </section>
  );
}

export default QuestionList;
