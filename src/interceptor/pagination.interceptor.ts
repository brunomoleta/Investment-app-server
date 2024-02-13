import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpArgumentsHost = context.switchToHttp();
    const request = httpArgumentsHost.getRequest();
    let { perPage, page } = request.query;

    perPage = Number(perPage);
    page = Number(page);
    if (perPage > 8 || perPage < 1 || isNaN(perPage)) {
      perPage = 8;
    }
    if (page < 1 || isNaN(page)) {
      page = 1;
    }

    const skip = page ? (Number(page) - 1) * perPage : 0;
    const take = perPage ? perPage : undefined;
    request.paginationOptions = { skip, take };

    return next.handle();
  }
}
