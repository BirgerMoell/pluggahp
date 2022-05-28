import { Question } from "../../../../../data/questions";

type Props = {
  question?: Question;
};

const getSuffixString = ({ question }: Props) => {
  if (!question) {
    return "";
  }

  let suffixString = `| ${question.solution} `;

  if (question.image) {
    suffixString += "| 🖼";
  }

  if (question.resources.length) {
    return (suffixString += `| 🎬 (${question.resources.length})`);
  }

  return suffixString;
};

export default getSuffixString;
