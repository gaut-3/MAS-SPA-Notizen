import {ColumnName} from "../utils/ColumnName";
import {SortOrder} from "./SortOrder";

export interface NoteOrder  {
    sortColumn: ColumnName
    sortOrder: SortOrder,
}