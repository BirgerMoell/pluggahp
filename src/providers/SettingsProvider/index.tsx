import { FC, createContext, useContext } from "react";
import useLocalStorage from "../../utils/useLocalStorage";

type Settings = {
  hideTime: boolean;
};

type SettingsContextType = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be inside the SettingsProvider");
  }
  return context;
};

const SettingsProvider: FC = ({ children }) => {
  const [settings, setSettings] = useLocalStorage<Settings>("SETTINGS", {
    hideTime: false,
  });

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
