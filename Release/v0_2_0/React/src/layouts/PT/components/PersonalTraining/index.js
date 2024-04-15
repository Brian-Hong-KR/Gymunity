import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chatbot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

const PersonalTraining = () => {
    const [player, setPlayer] = useState(null);
    const [index, setIndex] = useState(0);
    const [videoList, setVideoList] = useState(null);
    const [done, setDone] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('http://localhost:5000/exercise', { "user_id": 1 });
            setVideoList(response.data.videoList);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (videoList) {  // Ensure videoList is available before creating player
            const onYouTubePlayerAPIReady = () => {
              const newPlayer = new YT.Player('player', {
                videoId: videoList[index],
                playerVars: { rel: 0 },
                events: {
                  onStateChange: onPlayerStateChange,
                },
              });
              setPlayer(newPlayer);
            };

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/player_api';
            tag.async = true;
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = onYouTubePlayerAPIReady;
        }
    }, [videoList]);

    const onPlayerStateChange = (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          if (index < videoList.length - 2) {
            setProgress ( (index + 1) / videoList.length * 100 );
            // Update progress bar here (implementation depends on your UI library)
            setIndex(index + 1);
            player.loadVideoById(videoList[index]);
          } else {
            axios.post('http://localhost:5000/exercise_done', {"user_id":1})
            .then(response => setDone(response.data))
            .catch(error => console.error(error));
          }
        }
    };

  const steps = [
  {
    id:'0',
    message:"안녕하세요.",
    trigger:'1',
  },
  {
    id:'1',
    user:true,
    trigger:'2',
  },
  {
    id:'2',
    message:"{previousValue}님 반갑습니다.",
    end:true,
  },
  ]

  const theme = {
    background:"#f8f9fa",
    botBubbleColor:"#344767",
    botFontColor:"#FFFFFF",
    userBubbleColor:"#5974a2",
    userFontColor:"#FFFFFF",
  };


  return (
    <SoftBox>
        <SoftTypography variant="h6"> 오늘 운동 진행률 </SoftTypography>
        <SoftProgress value={progress} color="success" variant="gradient" label={false} />
        <div style={{ position:'relative', width:'100%', paddingBottom:'56.25%'}}>
            <div style={{ position:'absolute', width:'100%', height:'100%' }} id="player"></div>
        </div>
        <div style={{ position: 'relative'}}>
            <ThemeProvider theme={theme}>
                <Chatbot  steps={steps} hideHeader={true} placeholder={'질문'} />
            </ThemeProvider>
        </div>
    </SoftBox>

  );
};

export default PersonalTraining;
