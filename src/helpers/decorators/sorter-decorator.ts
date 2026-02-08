import { AbstractSorter } from '../common/sorter.builder';

/**
 * Applies `this[sorterProp].sort(items, query)` before calling the method.
 *
 * Expects the decorated method signature to be: (items, query, ...rest)
 */
export function ApplySorter<TItem, TQuery>(
  sorterProp: string = 'sorter',
): MethodDecorator {
  return (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const original = descriptor.value;

    descriptor.value = function (items: TItem[], query: TQuery, ...args: any[]) {
      const sorter = (this as any)?.[sorterProp] as
        | AbstractSorter<TItem, TQuery>
        | undefined;

      if (!sorter) {
        throw new Error(`Sorter not found on class at property "${sorterProp}"`);
      }

      const sorted = sorter.sort(items, query);
      return original.call(this, sorted, query, ...args);
    };

    return descriptor;
  };
}

