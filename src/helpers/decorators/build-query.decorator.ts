import { AbstractQueryBuilder } from '../common/query.builder';

export function BuildQuery<TQuery>(
  builderProp: string = 'queryBuilder',
): MethodDecorator {
  return (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const original = descriptor.value;

    descriptor.value = function (query: TQuery, ...args: any[]) {
      const builder = (this as any)?.[builderProp] as
        | AbstractQueryBuilder<TQuery>
        | undefined;

      if (!builder) {
        throw new Error(
          `QueryBuilder not found on class at property "${builderProp}"`,
        );
      }

      const queryString = builder.build(query);
      return original.call(this, queryString, query, ...args);
    };

    return descriptor;
  };
}