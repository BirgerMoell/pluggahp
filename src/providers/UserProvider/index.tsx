import { FC, useContext, createContext } from "react";
import { UserData } from "../../data/user";
import useLocalStorage from "../../utils/useLocalStorage";

export const UserContext = createContext<{
  userData: UserData;
  setUserData: (value: UserData | ((val: UserData) => UserData)) => void;
} | null>(null);

export const useUser = (): {
  userData: UserData;
  setUserData: (value: UserData | ((val: UserData) => UserData)) => void;
} => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be inside the UserProvider");
  }

  const { userData, setUserData } = context;

  return { userData, setUserData };
};

const UserProvider: FC = ({ children }) => {
  const [userData, setUserData] = useLocalStorage<UserData>("USER", {});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
