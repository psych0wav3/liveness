import {AxiosResponse} from 'axios';
import {OiTiGateway} from '../enums/oiTiGateway';
import {AppError} from '../errors/AppError';
import {oiTiGateway} from '../service/oiTiGateway';
import {DharmaApiResponse} from '../types/DharmaApaResponse';

interface Props {
  appkey: string;
  document: string;
}
export const postAppKey = async ({appkey, document}: Props): Promise<void> => {
  try {
    const payload = {appkey, document};
    const {
      data: {success, errors},
    }: AxiosResponse<DharmaApiResponse<{}>, any> = await oiTiGateway.post(
      `${OiTiGateway.Result}`,
      {payload},
    );
    if (!success) {
      throw new AppError(errors);
    }
  } catch (err: any) {
    if (err.response.data.errors) {
      const [error] = err.response.data.errors;
      throw new AppError([{code: error?.code, message: error.message}]);
    }
    throw new AppError([
      {code: '500', message: 'Não foi possivel recuperar a appkey no momento'},
    ]);
  }
};
