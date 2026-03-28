import config from './config.main.json';
import localConfig from './config.json';

const appConfig = Object.assign(config, localConfig);

export default appConfig;
