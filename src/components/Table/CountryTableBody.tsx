import { TableRow, TableCell, makeStyles } from "@material-ui/core";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { CountryType } from "../../types/types";

type Props = {
  country: CountryType;
};

export const CountryTableBody: FC<Props> = ({ country }) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <TableRow
      className={classes.hover}
      key={country._id}
      onClick={() => history.push(`/${country.name}`)}
    >
      <TableCell>{country.name}</TableCell>
      <TableCell>{country.region}</TableCell>
      <TableCell>{country.subregion}</TableCell>
      <TableCell>{country.capital ? country.capital : "N/A"}</TableCell>
      <TableCell align="right">
        {country.area ? country.area.toLocaleString() : "N/A"}
      </TableCell>
      <TableCell align="right">
        {country.population ? country.population.toLocaleString() : "N/A"}
      </TableCell>
    </TableRow>
  );
};

const useStyles = makeStyles({
  hover: {
    "&:hover": {
      backgroundColor: "lightgrey !important",
      cursor: "pointer",
    },
  },
});
