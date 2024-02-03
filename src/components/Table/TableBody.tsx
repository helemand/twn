import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import { formatPhoneNumber, reverseDateFormat } from "../../assets/utils";
import { Person } from "../../types";

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
      const truncatedBody = `${body.split(/<\/p>\s*<p>/)[0]}...`;

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
            <tr className="expanded-tablerow" role="button" tabIndex={0}>
              <td colSpan={5}>
                <div className="expanded-content">
                  <div
                    className="content-img"
                    style={{
                      backgroundImage: `url(${image.large})`,
                    }}
                  />
                  <div className="body">
                    <p dangerouslySetInnerHTML={{ __html: truncatedBody }} />
                    <NavLink className="form-button" to={`/article/${id}`}>
                      loe rohkem
                    </NavLink>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
};

export default TableBody;
