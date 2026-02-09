import { Injectable } from '@nestjs/common';
import { HttpUtilService } from 'src/common/services/http/http.service';
import { CommonConfig } from 'src/common/config/common';
@Injectable()
export class FlightRepository {
    constructor(private readonly httpUtilService: HttpUtilService) { }
    async searchFlights(queryString: string): Promise<any> {
        try {
            return this.httpUtilService.get(
                `${process.env.FLIGHT_SERVICE_API_URL}/flight/search/fares?query=${queryString}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: process.env.FLIGHT_SERVICE_API_KEY,
                        'x-authorization': 'Bearer ' +  process.env.FLIGHT_SERVICE_API_VALUE,
                    },
                },
            );

        } catch (error: any) {
            throw new Error(
                `Failed to get flight search results [queryString=${queryString}]: ${error?.message || error}`,
            );
        }


    }
}
