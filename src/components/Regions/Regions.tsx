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
import { RegionType } from "../../types/types";
import { CountriesTable } from "../Table/CountriesTable";

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
  const { data, loading, error } = useQuery(REGION_QUERY);

  if (loading || error) {
    return <></>;
  }
  return (
    <Grid container>
      {/* <Grid item xs={12}>
        {data.Region.map((val: RegionType) => (
          <Subregions key={val.name} region={val} />
        ))}
      </Grid> */}
      <Grid item xs={12}>
        <CountriesTable />
      </Grid>
    </Grid>
  );
};
