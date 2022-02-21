import { ChangeEvent } from "react";
import { useFilter } from "../../providers/FilterProvider";
import "./Filter.css";

const Filter = () => {
  const { filter, setFilter } = useFilter();
  const { failed, XYZ, KVA, NOG, time } = filter;
  return (
    <div className="filter">
      <div>
        <input
          id="failed"
          type="checkbox"
          checked={failed}
          onChange={() => setFilter({ ...filter, failed: !failed })}
        />
        <label htmlFor="failed">Only failed or unanswered questions</label>
      </div>

      <div>
        <input
          id="XYZ"
          type="checkbox"
          checked={XYZ}
          onChange={() => setFilter({ ...filter, XYZ: !XYZ })}
        />
        <label htmlFor="failed">Only XYZ questions</label>
      </div>
      <div>
        <input
          id="KVA"
          type="checkbox"
          checked={KVA}
          onChange={() => setFilter({ ...filter, KVA: !KVA })}
        />
        <label htmlFor="failed">Only KVA questions</label>
      </div>
      <div>
        <input
          id="NOG"
          type="checkbox"
          checked={NOG}
          onChange={() => setFilter({ ...filter, NOG: !NOG })}
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
            value={time?.minutes || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilter({
                ...filter,
                time: {
                  minutes: Number(e.target.value),
                  seconds: time?.seconds || 0,
                },
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
            value={time?.seconds || 0}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilter({
                ...filter,
                time: {
                  seconds: Number(e.target.value),
                  minutes: time?.minutes || 0,
                },
              })
            }
          />
        </div>
        Clear timefilter:{" "}
        <button onClick={() => setFilter({ ...filter, time: null })}>x</button>
      </div>
    </div>
  );
};

export default Filter;
