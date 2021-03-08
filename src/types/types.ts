export type RegionType = {
  name: string;
  subregion?: RegionListType;
};

export type RegionListType = RegionType[];

export type SubregionType = {
  name: string;
  region?: RegionType;
};

export type SubregionListType = SubregionType[];

export type CountryDtoType = {
  _id: string;
  name: string;
  area: number;
  capital: string;
  population: number;
  populationDensity: number;
  subregion: SubregionType;
};

export type CountryType = {
  _id: string;
  name: string;
  area: number;
  capital: string;
  population: number;
  populationDensity: number;
  subregion: string;
  region: string;
};

export type CountryListType = CountryType[];

type TimezoneType = {
  name: string;
};

type TimezoneListType = TimezoneType[];

type LangugageType = {
  name: string;
};

type LanguageListType = LanguageListType[];

export type Order = "asc" | "desc";

export type HeadCellType = {
  id: keyof CountryType;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
};

export type HeadCellListType = HeadCellType[];
