import { useUser } from "../../providers/UserProvider";
import { Header } from "../Header/Header";

const Overview = () => {
  const { userData } = useUser();
  return (
    <div>
      <Header title="Overview" />
      <div>Questions answered: {Object.keys(userData).length}</div>
    </div>
  );
};

export default Overview;
