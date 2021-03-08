import { Grid, makeStyles, TextField } from "@material-ui/core";
import { FC } from "react";

type Props = {
  data: string | number | undefined;
  label: string;
};

export const CountryInfoBox: FC<Props> = ({ data, label }) => {
  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <TextField
        className={classes.box}
        variant="outlined"
        disabled
        multiline
        label={label}
        defaultValue={data ? data : "N/A"}
      />
    </Grid>
  );
};

const useStyles = makeStyles({
  box: {
    margin: 10,
  },
});
