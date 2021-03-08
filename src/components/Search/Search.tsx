import {
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { FC } from "react";
import { CountryType, HeadCellType } from "../../types/types";
import { headCells } from "../Table/TableHelpers";

type Props = {
  searchUpdate: (searchText: string, searchField: keyof CountryType) => void;
};

export const Search: FC<Props> = ({ searchUpdate }) => {
  const classes = useStyles();
  const handleOnChange = (event: any, field: keyof CountryType) => {
    if (event && event.target && event.target)
      searchUpdate(event.target.value, field);
  };

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="body1" align="left" className={classes.search}>
            Search:
          </Typography>
        </Grid>
        {headCells.map((headCell: HeadCellType) => (
          <Grid key={headCell.id} item xs={4}>
            <TextField
              className={classes.space}
              label={headCell.label}
              onChange={(e) => handleOnChange(e, headCell.id)}
            ></TextField>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.subtext}>
          Filter rows by clicking the column's header. Click on a country below
          to see more information:
        </Typography>
      </Grid>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  paper: {
    margin: "10px 10px",
    textAlign: "center",
  },
  space: {
    margin: 15,
  },
  subtext: {
    color: "grey",
    fontSize: 12,
  },
  search: {
    position: "absolute",
    margin: "70px 0 0 20px",
    color: "grey",
  },
}));
