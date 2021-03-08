import { Grid, Typography } from "@material-ui/core";
import { CountryType } from "../types/types";
import { CountriesTable } from "./Table/CountriesTable";
import { Search } from "./Search/Search";
import { useState } from "react";

export const Home = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [searchField, setSearchField] = useState<keyof CountryType>();

  const searchUpdate = (
    searchText: string,
    searchFieldUsed: keyof CountryType
  ) => {
    setSearch(searchText);
    setSearchField(searchFieldUsed);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Countries of the World
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Search searchUpdate={searchUpdate} />
      </Grid>
      <Grid item xs={12}>
        <CountriesTable searchTerm={search} searchField={searchField} />
      </Grid>
    </Grid>
  );
};
