import { Grid } from "@material-ui/core";
import { CountryType, RegionType } from "../../types/types";
import { CountriesTable } from "../Table/CountriesTable";
import { Search } from "../Search/Search";
import { useState } from "react";

export const Regions = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<keyof CountryType>();

  const searchUpdate = (
    searchText: string,
    searchFieldUsed: keyof CountryType
  ) => {
    setSearch(searchText);
    setSearchField(searchFieldUsed);

    console.log(searchField);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Search searchUpdate={searchUpdate} />
      </Grid>
      <Grid item xs={12}>
        <CountriesTable searchTerm={search} />
      </Grid>
    </Grid>
  );
};
