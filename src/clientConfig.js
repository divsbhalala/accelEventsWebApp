module.exports = {
  apiUrl: process.env.API_URL || 'http://api.stagingaccel.com:8080/AccelEventsWebApp/rest/',
	serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
};
