export function BuildQuery(builderProp = 'queryBuilder'): MethodDecorator {
  return (_t, _k, d: PropertyDescriptor) => {
    const original = d.value;

    d.value = function (this: any, query: any, ...rest: any[]) {
      const builder = this?.[builderProp];
      if (!builder?.build) throw new Error(`Missing "${builderProp}.build()"`);
      return original.call(this, builder.build(query), query, ...rest);
    };

    return d;
  };
}