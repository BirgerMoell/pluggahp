import {
  Grid,
  IconButton,
  styled,
  Typography,
  Checkbox,
  Slider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FC, useState } from "react";
import { useFilter } from "../../providers/FilterProvider";
import "./Filter.css";
import { useAnswers } from "../../providers/AnswersProvider";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

type Props = {
  closeFilter: () => void;
};

const Filter: FC<Props> = ({ closeFilter }) => {
  const { answers } = useAnswers();
  const { filter, filtered, setFilter } = useFilter();
  const { failed, XYZ, KVA, NOG, time } = filter;
  const [timeState, setTimeState] = useState(time);
  const totalTime = timeState
    ? timeState?.minutes * 60 + timeState?.seconds
    : 0;

  return (
    <Box sx={{ width: 300 }} role="presentation">
      <DrawerHeader>
        <Typography>Filter</Typography>
        <IconButton onClick={closeFilter}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              edge="start"
              onChange={() => setFilter({ ...filter, failed: !failed })}
              checked={failed}
              inputProps={{ "aria-labelledby": "failed" }}
            />
          </ListItemIcon>
          <ListItemText id={"failed"} primary={`Failed questions`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              edge="start"
              onChange={() => setFilter({ ...filter, XYZ: !XYZ })}
              checked={XYZ}
              inputProps={{ "aria-labelledby": "XYZ" }}
            />
          </ListItemIcon>
          <ListItemText id={"XYZ"} primary={`XYZ questions`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              edge="start"
              onChange={() => setFilter({ ...filter, NOG: !NOG })}
              checked={NOG}
              inputProps={{ "aria-labelledby": "NOG" }}
            />
          </ListItemIcon>
          <ListItemText id={"NOG"} primary={`NOG questions`} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox
              edge="start"
              onChange={() => setFilter({ ...filter, KVA: !KVA })}
              checked={KVA}
              inputProps={{ "aria-labelledby": "KVA" }}
            />
          </ListItemIcon>
          <ListItemText id={"KVA"} primary={`KVA questions`} />
        </ListItem>
        <ListItem sx={{ flexWrap: "wrap" }}>
          <Typography id="input-slider" gutterBottom sx={{ width: "100%" }}>
            Questions that took longer than
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={totalTime}
                max={Math.max(
                  ...answers.map((a) => a.minutes * 80 + a.seconds)
                )}
                onChange={(_, total) => {
                  if (typeof total === "number") {
                    setTimeState({
                      minutes: Math.floor(total / 60),
                      seconds: total % 60,
                    });
                  }
                }}
                onChangeCommitted={(_, total) => {
                  if (total === 0) {
                    setFilter({
                      ...filter,
                      time: null,
                    });
                  } else if (typeof total === "number") {
                    setFilter({
                      ...filter,
                      time: {
                        minutes: Math.floor(total / 60),
                        seconds: total % 60,
                      },
                    });
                  }
                }}
                aria-labelledby="input-slider"
              />
            </Grid>
            <Grid item>
              <Typography>
                {timeState
                  ? `${
                      timeState.minutes.toString().length === 1
                        ? "0" + timeState.minutes
                        : timeState.minutes
                    }:${
                      timeState.seconds.toString().length === 1
                        ? "0" + timeState.seconds
                        : timeState.seconds
                    }`
                  : "00:00"}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid>
            <Grid item>
              <Typography>Currently filtered: </Typography>
            </Grid>
            <Grid item>
              <Typography>{filtered.length} questions</Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Box>
  );
};

export default Filter;
