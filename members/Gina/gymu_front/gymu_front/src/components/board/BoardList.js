import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { boardActions } from "../../toolkit/actions/board_action";
import TableRow from "./TableRow";
import PageNavigation from "./PageNavigation";

// http://localhost:3000/board/list/1
// http://localhost:3000/board/list/:currentPage
//  const { currentPage } = useParams();
const BoardList = () => {
  const { currentPage } = useParams();
  const dispatch = useDispatch();

  const getBoardList = (currentPage) => {
    console.log("currentPage:", currentPage);
    dispatch(boardActions.getBoardList(currentPage));
  };

  useEffect(() => {
    getBoardList(currentPage);
  }, []);

  // useEffect(() => {
  //   dispatch(boardActions.getBoardList(currentPage));
  // }, []);

  const challengeList = useSelector((state) => state.challenges.challengeList);
  const pv = useSelector((state) => state.challenges.pv);

  return (
    <div>
      <Link className="btn btn-danger" to="/board/write">
        글쓰기
      </Link>
      <h3 className="text-center">게시판 목록</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <colgroup>
          <col width="8%" />
        </colgroup>

        <thead>
          <tr>
            <th>번호</th>
          </tr>
        </thead>

        <tbody>
          {challengeList &&
            challengeList.map((challenges) => {
              return <TableRow challenges={challenges} key={challenges.ch_id} />;
            })}
        </tbody>
      </table>

      {pv && <PageNavigation getBoardList={getBoardList} />}
    </div>
  );
};

export default BoardList;
