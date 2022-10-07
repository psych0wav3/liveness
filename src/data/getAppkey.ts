import {AxiosResponse} from 'axios';
import {OiTiGateway} from '../enums/oiTiGateway';
import {AppError} from '../errors/AppError';
import {oiTiGateway} from '../service/oiTiGateway';
import {DharmaApiResponse} from '../types/DharmaApaResponse';
import {GetAppkey} from '../types/GetAppkey';

export const getAppkey = async (
  document: string,
): Promise<string | undefined> => {
  try {
    const {
      data: {success, data, errors},
    }: AxiosResponse<DharmaApiResponse<GetAppkey>, any> = await oiTiGateway.get(
      `${OiTiGateway.AppKey}/${document}`,
      {},
    );
    if (!success) {
      throw new AppError(errors);
    }
    return data?.appkey;
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
