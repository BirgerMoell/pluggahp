import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      welcome
      <div>
        <Link to="filter">Filter</Link>
      </div>
      <div>
        <Link to="overview">Overview</Link>
      </div>
      <div>
        <Link to="question">Next question</Link>
      </div>
    </div>
  );
};

export default Home;
