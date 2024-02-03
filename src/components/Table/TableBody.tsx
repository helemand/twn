import React, { useState } from "react";
import "./index.scss";
import { formatPhoneNumber, reverseDateFormat } from "../../assets/utils";
import { Person } from "../../types";
import ExpandedRow from "./ExpandedRow";

interface TableBodyProps {
  data: Person[];
  currentPage: number;
}

const TableBody: React.FC<TableBodyProps> = ({ data, currentPage }) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const itemsPerPage = 10;

  const expandTableRow = (id: string) => {
    setExpandedRow((prevRow) => (prevRow === id ? null : id));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return data
    .slice(startIndex, endIndex)
    .map(({ id, firstname, surname, sex, phone, image, body, birthday }) => {
      const isRowExpanded = expandedRow === id;
      return (
        <React.Fragment key={id}>
          <tr
            role="button"
            tabIndex={0}
            onClick={() => expandTableRow(id)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                expandTableRow(id);
              }
            }}
            className={
              isRowExpanded ? "expanded-tablerow-header" : "clickable-tablerow"
            }
          >
            <td>
              <span>{firstname}</span>
            </td>
            <td>{surname}</td>
            <td>{sex === "f" ? "Naine" : "Mees"}</td>
            <td>{reverseDateFormat(birthday)}</td>
            <td>{formatPhoneNumber(phone as string)}</td>
          </tr>
          {isRowExpanded && (
            <ExpandedRow imageUrl={image.large} id={id} body={body} />
          )}
        </React.Fragment>
      );
    });
};

export default TableBody;
