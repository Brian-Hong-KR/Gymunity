import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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

    axios.post('http://192.168.0.60:5000/question',{ user_id:1, unit_name:"push-ups", question: questionText }) // Use axios.get to fetch data
      .then(response => {
        const bindings = response.data.answer;
        console.log (bindings)

        if (bindings && bindings.length > 0) {
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
      <div className="dbpedia"> {loading ? <Loading /> : result} </div>

    );
  }
}


DBPedia.propTypes = {
  steps: PropTypes.object,
};

DBPedia.defaultProps = {
  steps: undefined,
};

const PTChatbot = () => {

  const steps = [
    {
      id: 'hi',
      message: "안녕하세요. 무엇이든 물어보세요.",
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
    <ThemeProvider theme={theme}>
        <ChatBot steps={steps} hideHeader={true} placeholder={'질문'} />
    </ThemeProvider>
  );
};

export default PTChatbot;