import {
  CountryDtoType,
  CountryType,
  HeadCellListType,
  Order,
} from "../../types/types";

export const headCells: HeadCellListType = [
  { id: "name", numeric: false, label: "Country" },
  { id: "region", numeric: true, label: "Region" },
  { id: "subregion", numeric: true, label: "Subregion" },
  { id: "capital", numeric: true, label: "Capital" },
  {
    id: "area",
    numeric: true,
    label: "Area (km²)",
  },
  {
    id: "population",
    numeric: true,
    label: "Population",
  },
];

export const convertCountryDtoToCountryType = ({
  subregion,
  ...rest
}: CountryDtoType): CountryType => {
  return {
    subregion: subregion ? subregion.name : "N/A",
    region: subregion && subregion.region ? subregion.region.name : "N/A",
    ...rest,
  };
};

export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((
  a: { [key in Key]: number | string | undefined },
  b: { [key in Key]: number | string | undefined }
) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T>(
  array: T[],
  comparator: (a: T, b: T) => number
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const arrayToString = <T>(a: T[], name: keyof T) => {
  const newArray = a.map((val: T) => {
    return val[name];
  });

  return newArray.join("\n");
};
