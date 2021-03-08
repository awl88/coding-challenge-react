import { TextField } from "@material-ui/core";
import { FC } from "react";
import { CountryType } from "../../types/types";
import { headCells } from "../Table/TableHelpers";

type Props = {
  searchUpdate: (searchText: string, searchField: keyof CountryType) => void;
};

export const Search: FC<Props> = ({ searchUpdate }) => {
  const handleOnChange = (event: any, field: keyof CountryType) => {
    if (event && event.target && event.target)
      searchUpdate(event.target.value, field);
  };

  return (
    <div>
      {headCells.map((headCell) => {
        <TextField
          label={headCell.label}
          onChange={(e) => handleOnChange(e, headCell.id)}
        ></TextField>;
      })}
    </div>
  );
};
