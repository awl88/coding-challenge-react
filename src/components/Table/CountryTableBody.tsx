import { TableRow, TableCell } from "@material-ui/core";
import { FC } from "react";
import { CountryType } from "../../types/types";

type Props = {
  country: CountryType;
};

export const CountryTableBody: FC<Props> = ({ country }) => {
  return (
    <TableRow key={country._id}>
      <TableCell>{country.name}</TableCell>
      <TableCell>{country.region}</TableCell>
      <TableCell>{country.subregion}</TableCell>
      <TableCell>{country.capital ? country.capital : "N/A"}</TableCell>
      <TableCell>
        {country.area ? country.area.toLocaleString() : "N/A"}
      </TableCell>
      <TableCell>
        {country.population ? country.population.toLocaleString() : "N/A"}
      </TableCell>
    </TableRow>
  );
};
