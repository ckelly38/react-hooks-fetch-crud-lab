import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
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
    })
  }, []);

  //console.log("rendering component:");
  //console.log("isLoaded = " + isLoaded);
  //console.log("questions = ", questions);

  let myqstnsarr = null;
  if (questions === undefined || questions === null || questions.length < 1);
  else
  {
    myqstnsarr = questions.map((qstn) => {
      return (
        <QuestionItem key={qstn.id} question={qstn} />
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
