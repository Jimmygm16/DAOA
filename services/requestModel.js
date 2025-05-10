// Create a servico to post a LM Studio endpoint that contains a model

import axios from 'axios';
import { prompt, assistantInformation } from '../utils/prompt';

const requestModel = async (userRequest) => {
    const url = '/api/v1/chat/completions';

    try {
        const response = await axios.post(url, {
            model: 'mathstral-7b-v0.1',
            messages: [
                { role: 'system', content: assistantInformation },
                { role: 'user', content: prompt(userRequest) }
            ],
            temperature: 0.7,
            max_tokens: 1000,
        })

        console.log('Model response:', response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error in requestModel:', error);
        throw new Error('Error in requestModel');
    }
}

export default requestModel;
