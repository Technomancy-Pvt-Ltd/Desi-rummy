const path = require('path');

module.exports = {
  // Your webpack configuration options go here...

  resolve: {
    fallback: {
      "crypto": false,
      // You can add other fallbacks here if needed, but for 'crypto', set it to false.
    }
  },

  // Other webpack configuration settings...
};