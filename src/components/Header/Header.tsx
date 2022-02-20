import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

type Props = {
  title: string;
};

export const Header: FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <button onClick={() => navigate("/")}>back</button>
      <div>{title}</div>
    </div>
  );
};
