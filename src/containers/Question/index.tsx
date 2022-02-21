import { Navigate, useParams } from "react-router-dom";
import getQuestionFromId from "../../utils/getQuestionFromId";

const Question = () => {
  const { id } = useParams();
  if (!id) {
    return <Navigate to="/" replace={true} />;
  }
  const question = getQuestionFromId(id);
  return <div>{question.id}</div>;
};

export default Question;
