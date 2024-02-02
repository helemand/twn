import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { ImageType } from "../../types";
import { Fields, SortColumn, SortOrder } from "../../types";

export type Person = {
  body: string;
  image: ImageType;
  firstname: string;
  id: string;
  intro: string;
  sex: string;
  phone: string;
  personal_code: string | number;
  surname: string;
};

export type QueryResult = {
  list: Person[];
};

interface TableHeaderProps {
  fields: Fields;
  sortColumn: string;
  sortOrder: SortOrder;
  handleSortChange: (column: SortColumn) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  fields,
  sortColumn,
  sortOrder,
  handleSortChange,
}) =>
  Object.keys(fields).map((field: string) => {
    const isSortable = field !== "phone";
    const isCurrentSortColumn = field === sortColumn;

    return (
      <th
        key={field}
        onClick={
          isSortable ? () => handleSortChange(field as SortColumn) : undefined
        }
      >
        {fields[field]}
        {isSortable && (
          <span className="icon-container">
            {isCurrentSortColumn && sortOrder === SortOrder.ASC && (
              <FontAwesomeIcon icon={faSortUp} />
            )}
            {isCurrentSortColumn && sortOrder === SortOrder.DESC && (
              <FontAwesomeIcon icon={faSortDown} />
            )}
            {!isCurrentSortColumn && <FontAwesomeIcon icon={faSort} />}
          </span>
        )}
      </th>
    );
  });

export default TableHeader;
