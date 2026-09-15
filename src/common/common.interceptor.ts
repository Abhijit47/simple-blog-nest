import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

export interface DataResponse<T> {
  data: T; // generic type for the data returned by the API
}

@Injectable()
export class CommonInterceptor<T> implements NestInterceptor<
  T,
  DataResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<DataResponse<T>> {
    // make a shape of the response data, so that the front end can receive a unified data format
    // {
    //   statusCode: number;
    //   message: string;
    //   data:{}|[{}] | null;
    // }

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: 'Request successful',
        data: data,
      })),
    );
  }
}
