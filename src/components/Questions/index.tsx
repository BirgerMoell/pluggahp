import { useState } from "react";
import { useQuestions } from "../../providers/QuestionsProvider";
import { updateUserData, UserData } from "../../data/user";
import Question from "../Question";
import { useUser } from "../../providers/UserProvider";
import { useStopwatch } from "react-timer-hook";
import { Solution } from "../../data/segments";
import { Header } from "../Header/Header";
import Result from "../Results";

const Questions = () => {
  const { userData, setUserData } = useUser();
  const { minutes, seconds, reset } = useStopwatch({ autoStart: true });
  const questions = useQuestions();
  const [staticQuestions] = useState(questions);
  const [dynamicQuestions, setDynamicQuestions] = useState(questions);
  const nextQuestion = (answer: Solution): void => {
    const answerData = {
      answer,
      minutes,
      seconds,
      timeStamp: new Date().getTime(),
    };
    const newUserData = updateUserData(
      userData,
      dynamicQuestions[0],
      answerData
    );
    setDynamicQuestions(dynamicQuestions.slice(1));
    reset();
    setUserData(newUserData);
  };
  return (
    <div>
      <Header
        title={dynamicQuestions.length ? `${minutes}:${seconds}` : "Result:"}
      />
      {dynamicQuestions.length ? (
        <Question question={dynamicQuestions[0]} nextQuestion={nextQuestion} />
      ) : (
        <Result
          answers={staticQuestions.reduce<UserData>(
            (answersObject, question) => {
              const id = question.id;
              answersObject[id] = userData[id];
              return answersObject;
            },
            {}
          )}
        />
      )}
    </div>
  );
};

export default Questions;
