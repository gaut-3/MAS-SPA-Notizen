import {NoteSortColumn} from "./NoteSortColumn";
import {NoteSortOrder} from "./NoteSortOrder";

export interface NoteOrder  {
    sortColumn: NoteSortColumn
    sortOrder: NoteSortOrder,
    icon: string
}