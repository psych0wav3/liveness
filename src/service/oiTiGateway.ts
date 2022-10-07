import axios from 'axios';
import {Config} from '../../env';
import base64 from 'react-native-base64';

const auth = `Basic ${base64.encode(
  `${Config.CLIENT_ID}:${Config.CLIENT_SECRET}`,
)}`;

export const oiTiGateway = axios.create({
  baseURL: 'https://uat.dotznext.com/orchestration-liveness/api/default/v1',
  headers: {
    Authorization: auth,
  },
});
