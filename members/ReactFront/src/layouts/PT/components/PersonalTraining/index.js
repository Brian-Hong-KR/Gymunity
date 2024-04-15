import React, { useState, useEffect } from "react";

import Chatbot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const PersonalTraining = () => {
  const [player, setPlayer] = useState(null);
  const [index, setIndex] = useState(0);
  //  const videoList = '{{video_list}}'.split(',');
  const videoList = "E_WBjEFXzKU,ZW1pnq0b8Hs".split(",");

  useEffect(() => {
    const onYouTubePlayerAPIReady = () => {
      const newPlayer = new YT.Player("player", {
        videoId: videoList[index],
        playerVars: { rel: 0 },
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
      setPlayer(newPlayer);
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/player_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = onYouTubePlayerAPIReady;
  }, []);

  const onPlayerStateChange = (event) => {
    if (event.data === YT.PlayerState.ENDED) {
      if (index < videoList.length - 2) {
        const progress = ((index + 1) / videoList.length) * 100;
        // Update progress bar here (implementation depends on your UI library)
        setIndex(index + 1);
        player.loadVideoById(videoList[index]);
      } else {
        // Exercise finished
        // Update progress bar to 100% (implementation depends on UI library)
        fetch("/exercise_done", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: 1 }),
        }); // TODO: Replace with actual user ID
      }
    }
  };

  const steps = [
    {
      id: "0",
      message: "안녕하세요.",
      trigger: "1",
    },
    {
      id: "1",
      user: true,
      trigger: "2",
    },
    {
      id: "2",
      message: "{previousValue}님 반갑습니다.",
      end: true,
    },
  ];

  const theme = {
    background: "#f8f9fa",
    botBubbleColor: "#344767",
    botFontColor: "#FFFFFF",
    userBubbleColor: "#5974a2",
    userFontColor: "#FFFFFF",
    botAvatar: "assets/images/Logo_icon.png",
  };

  return (
    <div>
      <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%" }}>
        <div style={{ position: "absolute", width: "100%", height: "100%" }} id="player"></div>
      </div>

      <div style={{ position: "relative", align: "center" }}>
        <ThemeProvider theme={theme}>
          <Chatbot steps={steps} hideHeader={true} placeholder={"질문"} />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default PersonalTraining;
