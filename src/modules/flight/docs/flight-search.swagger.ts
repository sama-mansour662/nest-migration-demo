import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

export function FlightSearchDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Search flights',
      description: 'Search available flights based on route and passenger data',
    }),

    ApiQuery({ name: 'origin', type: String, required: true, example: 'AMM' }),
    ApiQuery({
      name: 'destination',
      type: String,
      required: false,
      example: 'DXB',
    }),
    ApiQuery({
      name: 'departureDate',
      type: String,
      required: true,
      example: '2025-03-20',
    }),
    ApiQuery({
      name: 'returnDate',
      type: String,
      required: false,
      example: '2025-03-25',
    }),

    ApiQuery({ name: 'adults', type: Number, example: 1 }),
    ApiQuery({ name: 'children', type: Number, example: 0 }),
    ApiQuery({ name: 'infants', type: Number, example: 0 }),

    ApiQuery({
      name: 'cabinClass',
      type: String,
      example: 'ECONOMY',
    }),

    ApiQuery({
      name: 'airlineCode',
      type: String,
      required: false,
      example: 'EK',
    }),

    ApiQuery({
      name: 'fareFamily',
      type: String,
      required: false,
      example: 'Flex',
    }),

    ApiQuery({
      name: 'sortBy',
      type: String,
      required: false,
      example: 'price',
    }),

    ApiQuery({
      name: 'sortOrder',
      type: String,
      required: false,
      example: 'asc',
    }),

    ApiQuery({
      name: 'limit',
      type: Number,
      required: false,
      example: 20,
    }),

    ApiOkResponse({
      description: 'Flights fetched successfully',
    }),

    ApiBadRequestResponse({
      description: 'Invalid query parameters',
    }),
  );
}
