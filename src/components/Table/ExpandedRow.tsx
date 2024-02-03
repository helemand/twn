import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";

interface ExpandedRowProps {
  imageUrl: string;
  id: string;
  body: string;
}

const truncatedBody = (body: string) => `${body.split(/<\/p>\s*<p>/)[0]}...`;

const ExpandedRow: React.FC<ExpandedRowProps> = ({ imageUrl, id, body }) => (
  <tr className="expanded-tablerow" role="button" tabIndex={0}>
    <td colSpan={5}>
      <div className="expanded-content">
        <div
          className="content-img"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        <div className="body">
          <p dangerouslySetInnerHTML={{ __html: truncatedBody(body) }} />
          <NavLink className="form-button" to={`/article/${id}`}>
            loe rohkem
          </NavLink>
        </div>
      </div>
    </td>
  </tr>
);

export default ExpandedRow;
