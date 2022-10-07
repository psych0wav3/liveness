import {DharmaApiError} from './DharmaApiResponse.';

export interface DharmaApiResponse<T> {
  data?: T | null;
  success: true;
  errors?: DharmaApiError[];
}
