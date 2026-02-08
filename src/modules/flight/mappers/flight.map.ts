import { Injectable } from '@nestjs/common';
import { ApplyFilters } from 'src/helpers/decorators/apply-filters.decorator';
import { BuildQuery } from 'src/helpers/decorators/build-query.decorator';
import { ApplySorter } from 'src/helpers/decorators/sorter-decorator';
import { FlightSearchQuery } from '../dto/flight.query';
import { FlightLegFilters } from '../helpers/flight.filters';
import { FlightQueryBuilder } from '../helpers/flight.query-builder';
import { FlightLegSorter } from '../helpers/flight.sorter';
import { FlightLegView } from '../types/flight.types';
import { buildFlightLegViews } from '../helpers/flight.view-builder';

@Injectable()
export class FlightMapper {
  readonly queryBuilder = new FlightQueryBuilder();
  readonly filters = new FlightLegFilters();
  readonly sorter = new FlightLegSorter();

  buildQueryString(query: FlightSearchQuery): string;
  buildQueryString(queryString: string, _query?: FlightSearchQuery): string;
  @BuildQuery<FlightSearchQuery>()
  buildQueryString(
    queryOrString: FlightSearchQuery | string,
    _query?: FlightSearchQuery,
  ): string {
    if (typeof queryOrString === 'string') return queryOrString;
    return this.queryBuilder.build(queryOrString);
  }

  mapFlights(response: any, query: FlightSearchQuery): FlightLegView[] {
    const candidates = buildFlightLegViews(response);
    return candidates.length ? this.applyQuery(candidates, query) : [];
  }

  @ApplyFilters<FlightLegView, FlightSearchQuery>()
  @ApplySorter<FlightLegView, FlightSearchQuery>()
  private applyQuery(items: FlightLegView[], _query: FlightSearchQuery): FlightLegView[] {
    return items;
  }
}
