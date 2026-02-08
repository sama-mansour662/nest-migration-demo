export abstract class AbstractFilters<TItem, TQuery> {
    abstract apply(items: TItem[], query: TQuery): TItem[];
  }
  