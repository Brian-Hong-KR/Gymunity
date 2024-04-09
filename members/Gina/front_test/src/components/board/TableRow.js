import React from "react";
import { Link } from "react-router-dom";

const TableRow = ({ board }) => {
  return (
    <tr>
      <td>{board.ch_id}</td>
      <td>
        {board.re_level > 0 && (
          <>
            <img
              alt="level"
              src="/images/level.gif"
              width={board.re_level * 20}
              height="15"
            />
            <img alt="re" src="/images/re.gif" />
          </>
        )}
        <Link to={`/challenge/view/${board.ch_id}`}> {board.title} </Link>
      </td>
      <td>{board.user_id}</td>
      <td>{board.category}</td>
      <td>{board.batting_point}</td>
    </tr>
  );
};

export default TableRow;
