// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { ColumnDataType } from "./ColumnDataType";
import type { IsForeignKey } from "./IsForeignKey";

export interface Column {
  name: string;
  label: string | null;
  dataType: ColumnDataType;
  isNullable: boolean;
  isAutoIncrement: boolean;
  isPrimaryKey: boolean;
  isIndexed: boolean;
  isForeignKey: IsForeignKey;
}
