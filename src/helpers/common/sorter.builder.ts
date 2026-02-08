export abstract class AbstractSorter<TItem, TQuery> {
    abstract sort(items: TItem[], query: TQuery): TItem[];
  }
  