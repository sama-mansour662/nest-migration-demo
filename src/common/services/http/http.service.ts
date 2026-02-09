import { Injectable, Logger } from '@nestjs/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  Method,
} from 'axios';

@Injectable()
export class HttpUtilService {
  private readonly logger = new Logger(HttpUtilService.name);
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('GET', url, config);
  }

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('POST', url, { ...config, data });
  }

  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PUT', url, { ...config, data });
  }

  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>('PATCH', url, { ...config, data });
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, config);
  }

  private async request<T>(
    method: Method,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const start = Date.now();

    try {
      const { data } = await this.client.request<T>({
        method,
        url,
        ...config,
      });

      this.logger.debug(
        `[HTTP] ${method} ${url} (${Date.now() - start}ms)`,
      );

      return data;
    } catch (error) {
      this.logError(method, url, error, start);
      throw error;
    }
  }

  private logError(
    method: Method,
    url: string,
    error: unknown,
    start: number,
  ): void {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;

      this.logger.error(
        `[HTTP] ${method} ${url} → ${err.response?.status ?? 'ERR'} (${
          Date.now() - start
        }ms)`,
        err.response?.data,
      );
      return;
    }

    this.logger.error(
      `[HTTP] ${method} ${url} → UNKNOWN (${Date.now() - start}ms)`,
      error as Error,
    );
  }
}
