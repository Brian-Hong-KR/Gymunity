import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import SideBar from "../layout/SideBar";
import TopBar from "../layout/TopBar";

const Pt = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [myPlaylist, setMyPlaylist] = useState([""]); // 유튜브 비디오 ID 목록
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // YouTube API와 관련된 초기화 로직
    // 여기에서 비디오 목록을 설정하거나 가져올 수 있습니다.
  }, []);

  const handleVideoEnd = () => {
    // 비디오 종료 시 호출될 함수
    if (currentVideoIndex < myPlaylist.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      // 모든 비디오 재생 완료 처리
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // AJAX 요청과 유사한 처리
  //   axios.post("/question", { msg: userInput }).then((response) => {
  //     setChatMessages([
  //       ...chatMessages,
  //       { type: "bot", message: response.data },
  //     ]);
  //   });
  //   setUserInput("");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      type: "user",
      message: userInput,
    };

    // 채팅 메시지 추가
    setChatMessages([...chatMessages, message]);

    // 서버에 메시지 보내기
    axios
      .post("/question", { msg: userInput })
      .then((response) => {
        const botMessage = {
          type: "bot",
          message: response.data,
        };
        setChatMessages([...chatMessages, message, botMessage]);
      })
      .catch((error) => console.error("Error:", error));

    setUserInput(""); // 입력 필드 초기화
  };

  // 유튜브 화면 사이즈
  const videoOpts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar />

          <YouTube
            videoId={myPlaylist[currentVideoIndex]}
            opts={videoOpts}
            onEnd={handleVideoEnd}
          />

          <div id="chatbox">
            {chatMessages.map((msg, index) => (
              <p
                key={index}
                className={msg.type === "user" ? "userText" : "botText"}
              >
                <span>{msg.message}</span>
              </p>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <input
              id="question"
              type="text"
              name="question"
              placeholder="Question"
              className="form-control"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" className="btn btn-warning">
              Send
            </button>
          </form>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Gymunity 2024</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Pt;
