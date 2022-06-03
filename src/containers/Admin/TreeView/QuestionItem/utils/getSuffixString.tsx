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
    suffixString += " | 🖼";
  }

  if (question.resources.length) {
    suffixString += ` | 🎬 (${question.resources.length})`;
  }

  if (question.history.length) {
    suffixString += ` | 📊 (${question.history.length})`;
  }

  return suffixString;
};

export default getSuffixString;
