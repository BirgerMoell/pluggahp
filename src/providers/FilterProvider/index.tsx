import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  createContext,
  useContext,
} from "react";

interface FailedFilter {
  failed: boolean;
  setFailed: Dispatch<SetStateAction<boolean>>;
}

interface TimeFilter {
  timeFilter: { minutes: number; seconds: number } | null;
  setTimeFilter: Dispatch<
    SetStateAction<{ minutes: number; seconds: number } | null>
  >;
}

interface XYZFilter {
  XYZFilter: boolean;
  setXYZFilter: Dispatch<SetStateAction<boolean>>;
}

interface KVAFilter {
  KVAFilter: boolean;
  setKVAFilter: Dispatch<SetStateAction<boolean>>;
}

interface NOGFilter {
  NOGFilter: boolean;
  setNOGFilter: Dispatch<SetStateAction<boolean>>;
}

export interface Filter
  extends FailedFilter,
    TimeFilter,
    XYZFilter,
    KVAFilter,
    NOGFilter {}

export const FilterContext = createContext<Filter | null>(null);

export const useFailed = (): FailedFilter => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFailed must be inside the FilterProvider");
  }
  const { failed, setFailed } = context;
  return {
    failed,
    setFailed,
  };
};

export const useTimeFilter = (): TimeFilter => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useTimeFilter must be inside the FilterProvider");
  }
  const { timeFilter, setTimeFilter } = context;
  return {
    timeFilter,
    setTimeFilter,
  };
};

export const useXYZFilter = (): XYZFilter => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useXYZFilter must be inside the FilterProvider");
  }
  const { XYZFilter, setXYZFilter } = context;
  return {
    XYZFilter,
    setXYZFilter,
  };
};

export const useKVAFilter = (): KVAFilter => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useKVAFilter must be inside the FilterProvider");
  }
  const { KVAFilter, setKVAFilter } = context;
  return {
    KVAFilter,
    setKVAFilter,
  };
};

export const useNOGFilter = (): NOGFilter => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFishable must be inside the FilterProvider");
  }
  const { NOGFilter, setNOGFilter } = context;
  return {
    NOGFilter,
    setNOGFilter,
  };
};

const FilterProvider: FC = ({ children }) => {
  const [failed, setFailed] = useState(false);
  const [timeFilter, setTimeFilter] = useState<{
    minutes: number;
    seconds: number;
  } | null>(null);
  const [XYZFilter, setXYZFilter] = useState(false);
  const [KVAFilter, setKVAFilter] = useState(false);
  const [NOGFilter, setNOGFilter] = useState(false);

  return (
    <FilterContext.Provider
      value={{
        failed,
        setFailed,
        timeFilter,
        setTimeFilter,
        XYZFilter,
        setXYZFilter,
        KVAFilter,
        setKVAFilter,
        NOGFilter,
        setNOGFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
