import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './modules/hotel/hotel.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpUtilModule } from './common/services/http/http.module';
import { OmsModule } from './common/repositories/oms.module';
import { FlightModule } from './modules/flight/flight.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpUtilModule,
    OmsModule,
    HotelModule,
    AuthModule,
    FlightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
