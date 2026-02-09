export function ApplySorter(sorterProp = 'sorter'): MethodDecorator {
  return (_t, _k, d: PropertyDescriptor) => {
    const original = d.value;

    d.value = function (this: any, items: any[], query: any, ...rest: any[]) {
      const sorter = this?.[sorterProp];
      if (!sorter?.sort) throw new Error(`Missing "${sorterProp}.sort()"`);
      return original.call(this, sorter.sort(items, query), query, ...rest);
    };

    return d;
  };
}
