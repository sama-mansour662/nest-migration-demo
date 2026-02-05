import { Global, Module } from '@nestjs/common';
import { HttpUtilService } from './http.service';

@Global()
@Module({
  providers: [HttpUtilService],
  exports: [HttpUtilService],
})
export class HttpUtilModule {}
