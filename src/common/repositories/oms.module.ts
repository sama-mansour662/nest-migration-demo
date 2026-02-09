import { Global, Module } from '@nestjs/common';
import { OmsRepository } from './oms.repository';
import { HttpUtilModule } from '../services/http/http.module';

@Global()
@Module({
  imports: [HttpUtilModule],
  providers: [OmsRepository],
  exports: [OmsRepository],
})
export class OmsModule {}
