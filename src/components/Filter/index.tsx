import { ChangeEvent } from "react";
import {
  useFailed,
  useKVAFilter,
  useNOGFilter,
  useTimeFilter,
  useXYZFilter,
} from "../../providers/FilterProvider";
import { useQuestions } from "../../providers/QuestionsProvider";
import { Header } from "../Header/Header";
import "./Filter.css";

const Filter = () => {
  const { failed, setFailed } = useFailed();
  const { timeFilter, setTimeFilter } = useTimeFilter();
  const { XYZFilter, setXYZFilter } = useXYZFilter();
  const { KVAFilter, setKVAFilter } = useKVAFilter();
  const { NOGFilter, setNOGFilter } = useNOGFilter();
  const questions = useQuestions();
  return (
    <div className="filter">
      <Header title="Filter" />
      <div>
        <input
          id="failed"
          type="checkbox"
          checked={failed}
          onChange={() => setFailed(!failed)}
        />
        <label htmlFor="failed">Only failed questions</label>
      </div>

      <div>
        <input
          id="XYZ"
          type="checkbox"
          checked={XYZFilter}
          onChange={() => setXYZFilter(!XYZFilter)}
        />
        <label htmlFor="failed">Only XYZ questions</label>
      </div>
      <div>
        <input
          id="KVA"
          type="checkbox"
          checked={KVAFilter}
          onChange={() => setKVAFilter(!KVAFilter)}
        />
        <label htmlFor="failed">Only KVA questions</label>
      </div>
      <div>
        <input
          id="NOG"
          type="checkbox"
          checked={NOGFilter}
          onChange={() => setNOGFilter(!NOGFilter)}
        />
        <label htmlFor="failed">Only NOG questions</label>
      </div>
      <div>
        Only questions that have taken longer than:
        <div>
          <label htmlFor="minutes">Minutes</label>
          <input
            id="minutes"
            type="number"
            min="0"
            value={timeFilter?.minutes || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTimeFilter({
                minutes: Number(e.target.value),
                seconds: timeFilter?.seconds || 0,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="seconds">Seconds</label>
          <input
            id="seconds"
            type="number"
            min="0"
            value={timeFilter?.seconds || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTimeFilter({
                seconds: Number(e.target.value),
                minutes: timeFilter?.minutes || 0,
              })
            }
          />
        </div>
        Clear timefilter: <button onClick={() => setTimeFilter(null)}>x</button>
      </div>
      <hr />
      <div>Questions in loop: {questions.length}</div>
    </div>
  );
};

export default Filter;
