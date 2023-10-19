import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'jaCpE_JjlZpf9W0aPh7OgDqSAT0suARpujuYwO9RTQI';
const UNSPLASH_SECRET_KEY = 'xfawvSdOHAdqmkyX0mB5De4jz5J7A35voCRjl-xwbXo';

export async function getAccessToken() {
  try {
    const response = await axios.post('https://unsplash.com/oauth/token', {
      client_id: UNSPLASH_ACCESS_KEY,
      client_secret: UNSPLASH_SECRET_KEY,
      grant_type: 'client_credentials',
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error('Failed to obtain an access token');
  }
}
