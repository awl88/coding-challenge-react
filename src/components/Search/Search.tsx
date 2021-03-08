import { TextField } from "@material-ui/core";
import { FC } from "react";

type Props = {
  searchUpdate: (searchText: string) => void;
};

export const Search: FC<Props> = ({ searchUpdate }) => {
  const handleOnChange = (event: any) => {
    if (event && event.target && event.target) searchUpdate(event.target.value);
  };

  return <TextField label="Country" onChange={handleOnChange}></TextField>;
};
