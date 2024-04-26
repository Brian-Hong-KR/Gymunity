import React, { useState, useEffect, useRef, Component } from 'react';
import axios from 'axios';
import { gConst } from 'layouts/gConst';

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";
import SoftButton from "components/SoftButton";

import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';


class DBPedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: '',
    };
  }
  componentWillMount() {
    const { steps } = this.props;
    const questionText = steps.question.value;
    const cur_unit_name = localStorage.getItem("current_unit_name");

    axios.post(`${gConst.API_BASE_URL}:5000/question`,
    { user_id:localStorage.getItem("userId"), unit_name: cur_unit_name, question: questionText })
      .then(response => {
        const bindings = response.data.answer;
        console.log (bindings)

        if (bindings) {
          this.setState({ loading: false, result: bindings });
        } else {
          this.setState({ loading: false, result: 'Not found.' });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.setState({ loading: false, result: 'Error fetching data.' });
      });
  }


  render() {
    const {  loading, result } = this.state;

    return (

      <div className="dbpedia"> {loading ? <Loading /> : result } </div>

    );
  }
}


DBPedia.propTypes = {
  steps: PropTypes.object,
};
DBPedia.defaultProps = {
  steps: undefined,
};


const PersonalTraining = () => {
    const player = useRef(null);
    const index = useRef(0);

    const [videoList, setVideoList] = useState(null);
    const [dailyProgram, setDailyProgram] = useState(null);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(`${gConst.API_BASE_URL}:5000/exercise`, { "user_id": localStorage.getItem("userId") });
            setVideoList(response.data.videoList);
            setDailyProgram(response.data.daily_program);
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
            localStorage.setItem("current_unit_name", dailyProgram[index.current]);
        }
    }, [videoList]);

    const onPlayerStateChange = (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          if (index.current < videoList.length -1 ) {
            index.current += 1;
            player.current.loadVideoById(videoList[index.current]);
            setProgress ( (index.current) / (videoList.length -1) * 100 );
            localStorage.setItem("current_unit_name", dailyProgram[index.current]);
          } else {
            axios.post(`${gConst.API_BASE_URL}:5000/exercise_done`, {"user_id":localStorage.getItem("userId")});
          }
        }
    };

    const handleSkipClick = () => {
      if (index.current < videoList.length - 1) {
        index.current += 1;
        player.current.loadVideoById(videoList[index.current]);
        setProgress((index.current) / (videoList.length - 1) * 100);
        localStorage.setItem("current_unit_name", dailyProgram[index.current]);
      }
    };

    const steps = [
        {
          id: 'hi',
          message: "안녕하세요.",
          trigger: 'question',
        },
        {
          id: 'question',
          user: true,
          trigger: 'answer',
        },
        {
          id: 'answer',
          component: <DBPedia />,
          asMessage: true,
          trigger: 'question',
        },
    ];

    const theme = {
        background: '#f8f9fa',
        botBubbleColor: '#344767',
        botFontColor: '#FFFFFF',
        userBubbleColor: '#5974a2',
        userFontColor: '#FFFFFF',
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
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} hideHeader={true} placeholder={'질문'} />
        </ThemeProvider>
    </SoftBox>
  );
};

export default PersonalTraining;