import { gql, useQuery } from "@apollo/client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { FC, useState } from "react";
import { RegionType } from "../../types/types";

type Props = {
  region: RegionType;
};

// const SUBREGION_BY_REGION_QUERY = gql`
//   query Subregion($region: String!) {
//     Subregion(filter: { region: { name: $region } }) {
//       name
//     }
//   }
// `;

export const Subregions: FC<Props> = ({ region }) => {
  const [accoridonOpen, setAccordianOpen] = useState(false);
  // const { data, loading, error } = useQuery(SUBREGION_BY_REGION_QUERY, {
  //   variables: { region: region.name },
  // });
  const classes = useStyles();

  // if (loading || error) {
  //   return <p>{error ? error.message : "Loading..."}</p>;
  // }

  return (
    <Paper className={classes.paper}>
      <p className={classes.name}>{region.name}</p>
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  paper: {
    height: 80,
    backgroundColor: "lightgrey",
    margin: "10px 100px",
    textAlign: "center",
  },
  name: {
    fontSize: 60,
  },
}));
