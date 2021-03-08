import { gql, useQuery } from "@apollo/client";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
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
  searchTerm: string;
};

export const CountriesTable: FC<Props> = ({ searchTerm }) => {
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
      setSearchedCountryList(countryList);
    }
  }, [data]);

  useEffect(() => {
    if (countryList) {
      setSearchedCountryList(
        countryList.filter((country) => {
          return country.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }
  }, [searchTerm]);

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
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
        count={data.Country.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};
