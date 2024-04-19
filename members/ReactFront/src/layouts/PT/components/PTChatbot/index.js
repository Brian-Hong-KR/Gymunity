import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chatbot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const PTChatbot = () => {
  const [previousValue, setPreviousValue] = useState('');


  const triggerNextStep = (userInput) => {
    setPreviousValue(userInput);
    // Potentially update steps or trigger based on userInput
    return '2'; // Or adjust based on logic
  };

  const ServerInteraction = ({ message }) => {
    const [responseData, setResponseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post(
            'http://localhost:5000/question',
            { question: message }
          );
          setResponseData(response.data); // Assuming data is in response.data
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [message]);

    if (isLoading) {
      return <div>처리 중입니다...</div>;
    }

    if (error) {
      return <div>오류가 발생했습니다: {error.message}</div>;
    }

    // Handle successful response data here (e.g., display feedback)
    return <div>운동 완료 여부를 서버에 전송했습니다 (데이터: {JSON.stringify(responseData)})</div>;
  };

  const steps = [
    {
      id: '0',
      message: "안녕하세요. 무엇이든 물어보세요.",
      trigger: '1',
    },
    {
      id: '1',
      user: true,
      trigger: (userInput) => triggerNextStep(userInput),
    },
    {
      id: '2',
      // Handle server interaction here
      component: <ServerInteraction message={previousValue} />,
      trigger: '1', // Update trigger based on server response or logic
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
    <ThemeProvider theme={theme}>
        <Chatbot steps={steps} hideHeader={true} placeholder={'질문'} />
    </ThemeProvider>
  );
};

export default PTChatbot;
