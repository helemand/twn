import "./index.scss";
import { useState } from "react";
import {
  convertPersonalCodeToDate,
  formatPhoneNumber,
} from "../../assets/utils";
import { NavLink } from "react-router-dom";
import { Person } from "../../types";
import React from "react";

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

  if (data) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data
      .slice(startIndex, endIndex)
      .map(
        ({
          id,
          firstname,
          surname,
          sex,
          personal_code,
          phone,
          image,
          body,
        }: Person) => {
          const isRowExpanded = expandedRow === id;
          const truncatedBody = body.split(/<\/p>\s*<p>/)[0] + "...";

          return (
            <React.Fragment key={id}>
              <tr
                onClick={() => expandTableRow(id)}
                className={isRowExpanded ? "expanded-tablerow" : ""}
              >
                <td>
                  <span>{firstname}</span>
                </td>
                <td>{surname}</td>
                <td>{sex === "f" ? "Naine" : "Mees"}</td>
                <td>{convertPersonalCodeToDate(personal_code.toString())}</td>
                <td>{formatPhoneNumber(phone as string)}</td>
              </tr>
              {isRowExpanded && (
                <tr className="expanded-tablerow">
                  <td colSpan={5}>
                    <div className="expanded-content">
                      <div
                        className="content-img"
                        style={{
                          backgroundImage: `url(${image.large})`,
                        }}
                      ></div>
                      <div className="body">
                        <p
                          dangerouslySetInnerHTML={{ __html: truncatedBody }}
                        ></p>
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
        }
      );
  }
};

export default TableBody;
