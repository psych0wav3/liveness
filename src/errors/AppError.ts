import {DharmaApiError} from '../types/DharmaApiResponse.';

export class AppError {
  public code!: string | undefined;
  public message!: string | undefined;

  constructor(errors: DharmaApiError[] | undefined) {
    this.code = errors && errors[0].code;
    this.message = errors && errors[0].message;
  }
}
