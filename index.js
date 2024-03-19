const axios = require('axios');

/**
 * Checks the HTTP status code of a given URL.
 * @param {string} url The URL to check.
 * @returns {Promise<object>} A promise that resolves with an object containing the URL, status code, and status text.
 */
async function checkHtmlStatus(url) {
    try {
        const response = await axios.get(url);
        // Return the URL and the status code for a successful response
        return { url, status: response.status, statusText: response.statusText };
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return { url, status: error.response.status, statusText: error.response.statusText };
        } else if (error.request) {
            // The request was made but no response was received
            return { url, status: 'No Response', statusText: 'The server did not respond.' };
        } else {
            // Something happened in setting up the request that triggered an Error
            return { url, status: 'Error', statusText: error.message };
        }
    }
}

module.exports = checkHtmlStatus;