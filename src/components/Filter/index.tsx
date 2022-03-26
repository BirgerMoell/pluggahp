import { FC } from "react";
import { useFilter } from "../../providers/FilterProvider";
import SelectorGroup from "../SelectorGroup";
import { COLORS } from "../../constants/colors";
import SelectorItem from "../SelectorItem";
import { Stack } from "@mui/material";
import LimitSelect from "../LimitSelect";

const Filter: FC = () => {
  const { filter, setFilter } = useFilter();
  const { unanswered, incorrect, tooSlow, correct, XYZ, KVA, NOG, limit } =
    filter;

  return (
    <Stack spacing={2}>
      <SelectorGroup
        title="Delar"
        changeAll={(argument) =>
          setFilter({ ...filter, XYZ: argument, KVA: argument, NOG: argument })
        }
      >
        <SelectorItem
          color={COLORS.xyz}
          name={"XYZ"}
          onClick={(XYZ) => setFilter({ ...filter, XYZ })}
          selected={XYZ}
        />
        <SelectorItem
          color={COLORS.kva}
          name={"KVA"}
          onClick={(KVA) => setFilter({ ...filter, KVA })}
          selected={KVA}
        />
        <SelectorItem
          color={COLORS.nog}
          name={"NOG"}
          onClick={(NOG) => setFilter({ ...filter, NOG })}
          selected={NOG}
        />
      </SelectorGroup>
      <SelectorGroup
        title="Historik"
        changeAll={(argument) =>
          setFilter({
            ...filter,
            incorrect: argument,
            unanswered: argument,
            tooSlow: argument,
            correct: argument,
          })
        }
      >
        <SelectorItem
          color={COLORS.unanswered}
          name={"Obesvarade"}
          onClick={(unanswered) => setFilter({ ...filter, unanswered })}
          selected={unanswered}
        />
        <SelectorItem
          color={COLORS.incorrect}
          name={"Felsvarade"}
          onClick={(incorrect) => setFilter({ ...filter, incorrect })}
          selected={incorrect}
        />
        <SelectorItem
          color={COLORS.tooSlow}
          name={"För långsamma"}
          onClick={(tooSlow) => setFilter({ ...filter, tooSlow })}
          selected={tooSlow}
        />
        <SelectorItem
          color={COLORS.correct}
          name={"Rättsvarade"}
          onClick={(correct) => setFilter({ ...filter, correct })}
          selected={correct}
        />
      </SelectorGroup>
      <LimitSelect
        limit={limit}
        onChange={(limit) => setFilter({ ...filter, limit })}
      />
    </Stack>
  );
};

export default Filter;
