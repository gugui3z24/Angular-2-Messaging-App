const setEnvironment = () => {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }
  switch (process.env.NODE_ENV) {
    case 'development':
      setDevelopmentVariables();
      break;

    case 'production':
      setProductionVariables();
      break;

    default:
      setDevelopmentVariables();
      break;
  }
};


const setProductionVariables = () => {
  process.env.corsConfigOrigin = 'http://localhost:8080';
  process.env.corsConfigMethods = 'GET, POST, PUT, DELETE, PATCH, HEAD';
  process.env.databaseName = 'messageapp_production';
};

const setDevelopmentVariables = () => {
  process.env.corsConfigOrigin = '*';
  process.env.corsConfigMethods = 'GET, POST, PUT, DELETE, PATCH, HEAD';
  process.env.databaseName = 'messageapp_development';
};

module.exports = {
  setEnvironment: setEnvironment
};
