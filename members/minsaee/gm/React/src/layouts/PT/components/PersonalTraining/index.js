import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import SoftButton from "components/SoftButton";
const PersonalTraining = () => {
    const player = useRef(null);
    const index = useRef(0);

    const [videoList, setVideoList] = useState(null);
    const [progress, setProgress] = useState(0);

//localStorage.getItem("Authorization")
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('http://192.168.0.60:5000/exercise', { "user_id": localStorage.getItem("userId") });
            setVideoList(response.data.videoList);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (videoList) {
            const onYouTubePlayerAPIReady = () => {
              player.current = new YT.Player('YTP', {
                videoId: videoList[index.current],
                playerVars: { rel: 0 },
                events: {
                  onStateChange: onPlayerStateChange,
                },
              });
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
          if (index.current < videoList.length -1 ) {
            index.current += 1;
            player.current.loadVideoById(videoList[index.current]);
            setProgress ( (index.current) / (videoList.length -1) * 100 );

          } else {
            axios.post('http://http://192.168.0.60:5000/exercise_done', {"user_id":1});
          }
        }
    };

    const handleSkipClick = () => {
      if (index.current < videoList.length - 1) {
        index.current += 1;
        player.current.loadVideoById(videoList[index.current]);
        setProgress((index.current) / (videoList.length - 1) * 100);
      } else {
        // Handle scenario when user skips the last video (already in onPlayerStateChange)
      }
    };

  return (
  <SoftBox py={3}>
        <SoftBox mb={3}>
            <SoftTypography variant="h6">오늘 운동 진행률</SoftTypography>
            <SoftButton onClick={() => handleSkipClick()}>Skip</SoftButton>
            <SoftProgress value={progress} color="success" variant="gradient" label={false} />
        </SoftBox>
        <div style={{ position:'relative', width:'100%', paddingBottom:'56.25%'}}>
            <div style={{ position:'absolute', width:'100%', height:'100%' }} id="YTP"></div>
        </div>
    </SoftBox>

  );
};

export default PersonalTraining;
