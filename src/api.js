import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const getChatResponse = async (message) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching the response from OpenAI:', error);
    return 'Sorry, something went wrong. Please try again later.';
  }
};
