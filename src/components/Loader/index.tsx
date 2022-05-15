import { CircularProgress } from "@mui/material";
import { FC } from "react";
import "./loader.css";

const Loader: FC = () => {
  return (
    <div className="square">
      <CircularProgress />
    </div>
  );
};

export default Loader;
