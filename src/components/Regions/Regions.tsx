import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { Subregions } from "../Subregions/Subregions";
import { CountryType, RegionType } from "../../types/types";
import { CountriesTable } from "../Table/CountriesTable";
import { Search } from "../Search/Search";
import { useState } from "react";

const REGION_QUERY = gql`
  {
    Region {
      name
      subregions {
        name
      }
    }
  }
`;

export const Regions = () => {
  // const { data, loading, error } = useQuery(REGION_QUERY);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<keyof CountryType>();

  const searchUpdate = (
    searchText: string
    // searchFieldUsed: keyof CountryType
  ) => {
    setSearch(searchText);
    // setSearchField(searchFieldUsed);
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
