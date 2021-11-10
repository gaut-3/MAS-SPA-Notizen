import {ColumnName} from "./ColumnName";
import {SortOrder} from "./SortOrder";

export interface NoteOrder  {
    sortColumn: ColumnName
    sortOrder: SortOrder,
    icon: string
}