const Twitter = require('twitter');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  const { status, imageUrl } = JSON.parse(event.body);

  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  try {
    // Download the image from the provided URL
    const response = await axios({
      url: imageUrl,
      responseType: 'arraybuffer'
    });

    // Upload the image to Twitter
    const mediaData = Buffer.from(response.data, 'binary').toString('base64');
    const media = await client.post('media/upload', { media: mediaData });

    // Post the tweet with the uploaded image
    const statusData = {
      status,
      media_ids: media.media_id_string
    };

    await client.post('statuses/update', statusData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Tweet posted successfully' })
    };
  } catch (error) {
    console.error('Error processing image', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error posting tweet' })
    };
  }
};
