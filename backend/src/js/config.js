const debugMode = window.DEBUG_MODE || false;

const config = {
  debugMode,
  logLevel: debugMode ? 'trace' : 'silent',
  rootUrl: debugMode ? (window.DEBUG_ROOT_URL || 'http://localhost:8080/') : '/',
  apiUrl: debugMode ? (window.DEBUG_API_URL || 'http://localhost:8080/api/') : '/api',
};

export default config;
