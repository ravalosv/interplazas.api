export interface ApiReturnPayload {
  success: boolean;
  error?: string;
  data?: any;
}

export class ApiReturn {
  static success(data: any, message: string = "Success"): ApiReturnPayload {
    return { success: true, data };
  }

  static error(error: string): ApiReturnPayload {
    return { success: false, error };
  }
}
