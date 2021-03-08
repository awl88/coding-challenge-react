import { gql, useQuery } from "@apollo/client";
import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { arrayToString } from "../Table/TableHelpers";
import { CountryInfoBox } from "./CountryInfoBox";

const SUBREGION_BY_REGION_QUERY = gql`
  query Country($country: String!) {
    Country(filter: { name: $country }) {
      _id
      name
      area
      capital
      population
      populationDensity
      flag {
        emoji
      }
      timezones {
        name
      }
      officialLanguages {
        name
      }
      currencies {
        name
      }
      subregion {
        name
        region {
          name
        }
      }
    }
  }
`;

export const Country = () => {
  const history = useHistory();
  const { countryName } = useParams<{ countryName: string }>();
  const { data, loading, error } = useQuery(SUBREGION_BY_REGION_QUERY, {
    variables: { country: countryName },
  });
  const classes = useStyles();

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  const countryData = data.Country[0];

  return (
    <>
      <Button onClick={history.goBack}>Back</Button>
      <Typography variant="h1" align="center" component="h1" gutterBottom>
        {countryData.flag.emoji}
        {countryData.name}
        {countryData.flag.emoji}
      </Typography>
      <Paper className={classes.paper}>
        <Grid container alignItems="flex-start" spacing={2}>
          <CountryInfoBox
            data={countryData.subregion.region.name}
            label={"Region"}
          />
          <CountryInfoBox
            data={countryData.subregion.name}
            label={"Subregion"}
          />
          <CountryInfoBox
            data={countryData.subregion.capital}
            label={"Capital"}
          />
          <CountryInfoBox
            data={countryData.area ? countryData.area.toLocaleString() : "N/A"}
            label={"Area (km²)"}
          />
          <CountryInfoBox
            data={
              countryData.population
                ? countryData.population.toLocaleString()
                : "N/A"
            }
            label={"Population"}
          />
          <CountryInfoBox
            data={
              countryData.populationDensity
                ? countryData.populationDensity.toLocaleString()
                : "N/A"
            }
            label={"Population per km²"}
          />
          <CountryInfoBox
            data={arrayToString(countryData.officialLanguages, "name")}
            label={
              "Official " +
              (countryData.timezones.length > 1 ? "Languages" : "Language")
            }
          />
          <CountryInfoBox
            data={arrayToString(countryData.timezones, "name")}
            label={countryData.timezones.length > 1 ? "Timezones" : "Timezone"}
          />
          <CountryInfoBox
            data={arrayToString(countryData.currencies, "name")}
            label={countryData.timezones.length > 1 ? "Currencies" : "Currency"}
          />
        </Grid>
      </Paper>
    </>
  );
};

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "lightgrey",
    margin: "10px 100px",
    textAlign: "center",
  },
  name: {
    fontSize: 60,
  },
}));
