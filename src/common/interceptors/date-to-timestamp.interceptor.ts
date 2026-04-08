import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

function transformDates(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Date) return obj.getTime();
  if (Array.isArray(obj)) return obj.map(transformDates);
  if (typeof obj === "object") {
    const out: any = {};
    for (const key of Object.keys(obj)) {
      try {
        out[key] = transformDates(obj[key]);
      } catch (e) {
        out[key] = obj[key];
      }
    }
    return out;
  }
  return obj;
}

@Injectable()
export class DateToTimestampInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => transformDates(data)));
  }
}
