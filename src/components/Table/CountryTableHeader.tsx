import { TableSortLabel } from "@material-ui/core";
import { MouseEventHandler } from "react";
import { FC } from "react";
import { CountryType, Order } from "../../types/types";

type Props = {
  headCell: any;
  orderBy: keyof CountryType;
  order: Order;
  createSortHandler: (
    id: string
  ) => MouseEventHandler<HTMLAnchorElement> | undefined;
};

export const CountryTableHeader: FC<Props> = ({
  headCell,
  orderBy,
  order,
  createSortHandler,
}) => {
  return (
    <TableSortLabel
      active={orderBy === headCell.id}
      direction={orderBy === headCell.id ? order : "asc"}
      onClick={createSortHandler(headCell.id)}
    >
      {headCell.label}
    </TableSortLabel>
  );
};
