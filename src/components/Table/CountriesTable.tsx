import { gql, useQuery } from "@apollo/client";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import {
  CountryDtoType,
  CountryListType,
  CountryType,
  Order,
} from "../../types/types";
import { CountryTableBody } from "./CountryTableBody";
import { CountryTableHeader } from "./CountryTableHeader";
import {
  convertCountryDtoToCountryType,
  getComparator,
  headCells,
  stableSort,
} from "./TableHelpers";

const COUTRIES_TABLE_QUERY = gql`
  {
    Country {
      _id
      name
      area
      capital
      population
      subregion {
        name
        region {
          name
        }
      }
    }
  }
`;

type Props = {
  searchTerm: string | undefined;
  searchField: keyof CountryType | undefined;
};

export const CountriesTable: FC<Props> = ({ searchTerm, searchField }) => {
  const { data, loading, error } = useQuery(COUTRIES_TABLE_QUERY);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof CountryType>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [countryList, setCountryList] = useState<CountryListType>();
  const [
    searchedCountryList,
    setSearchedCountryList,
  ] = useState<CountryListType>();
  const classes = useStyles();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CountryType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (property: keyof CountryType) => (
    event: React.MouseEvent<unknown>
  ) => {
    handleRequestSort(event, property);
  };

  useEffect(() => {
    if (data && data.Country) {
      setCountryList(
        data.Country.map((data: CountryDtoType) =>
          convertCountryDtoToCountryType(data)
        )
      );
    }
  }, [data]);

  useEffect(() => {
    setSearchedCountryList(countryList);
  }, [countryList]);

  useEffect(() => {
    if (countryList && searchTerm && searchField) {
      switch (searchField) {
        case "name":
          setSearchedCountryList(
            countryList.filter((country) => {
              return country.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            })
          );
          break;
        case "region":
          setSearchedCountryList(
            countryList.filter((country) => {
              return country.region
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            })
          );
          break;
        case "subregion":
          setSearchedCountryList(
            countryList.filter((country) => {
              return country.subregion
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            })
          );
          break;
        case "capital":
          setSearchedCountryList(
            countryList.filter((country) => {
              return country.capital
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            })
          );
          break;
        case "area":
          setSearchedCountryList(
            countryList.filter((country) => {
              return country.area === parseInt(searchTerm);
            })
          );
          break;
        case "population":
          setSearchedCountryList(
            countryList.filter((country) => {
              return country.population === parseInt(searchTerm);
            })
          );
          break;
        default:
          break;
      }
      setSearchedCountryList(
        countryList.filter((country) => {
          return country.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }
  }, [searchTerm, countryList, searchField]);

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <colgroup>
            <col width="25%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>
          <TableHead>
            <TableRow className={classes.head}>
              {headCells.map((headCell: any) => (
                <TableCell key={headCell.id}>
                  <CountryTableHeader
                    headCell={headCell}
                    orderBy={orderBy}
                    order={order}
                    createSortHandler={() => createSortHandler(headCell.id)}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedCountryList &&
              stableSort(searchedCountryList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return <CountryTableBody key={row._id} country={row} />;
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={searchedCountryList ? searchedCountryList.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const useStyles = makeStyles(() => ({
  head: {
    backgroundColor: "grey",
  },
}));
