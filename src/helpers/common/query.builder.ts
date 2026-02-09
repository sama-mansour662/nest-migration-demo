export abstract class AbstractQueryBuilder<TQuery> {
    abstract build(query: TQuery): string;
  
    protected encode(v: string | number) {
      return encodeURIComponent(String(v));
    }
  }
  