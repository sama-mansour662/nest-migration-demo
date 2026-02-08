import { AbstractFilters } from '../common/filter.builder';

/**
 * Applies `this[filtersProp].apply(items, query)` before calling the method.
 *
 * Expects the decorated method signature to be: (items, query, ...rest)
 */
export function ApplyFilters<TItem, TQuery>(
  filtersProp: string = 'filters',
): MethodDecorator {
  return (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const original = descriptor.value;

    descriptor.value = function (items: TItem[], query: TQuery, ...args: any[]) {
      const filters = (this as any)?.[filtersProp] as
        | AbstractFilters<TItem, TQuery>
        | undefined;

      if (!filters) {
        throw new Error(`Filters not found on class at property "${filtersProp}"`);
      }

      const filtered = filters.apply(items, query);
      return original.call(this, filtered, query, ...args);
    };

    return descriptor;
  };
}