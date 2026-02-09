export function ApplyFilters(filtersProp = 'filters'): MethodDecorator {
  return (_t, _k, d: PropertyDescriptor) => {
    const original = d.value;

    d.value = function (this: any, items: any[], query: any, ...rest: any[]) {
      const filters = this?.[filtersProp];
      if (!filters?.apply) throw new Error(`Missing "${filtersProp}.apply()"`);
      return original.call(this, filters.apply(items, query), query, ...rest);
    };

    return d;
  };
}