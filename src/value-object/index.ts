import './index.d';

function data<T>(target: new () => T): DataDecoratorReturn<T> {
  // store 'source' to __data
  return source => {
    const instance = <DataClass<T>>new target();
    instance.data = source;
    return instance;
  };
}

/**
 * ! 반드시 DataClassDecorator 와 함께 사용해주세요.
 * Store preprocessed date from original data's sourcePropertyName value
 */
function field<T, Result>(
  sourcePropertyName: string | number,
  preprocess: PreprocessFunction
): PropertyDecorator {
  return () => ({
    set: function () {
      throw Error("You can't write Data Class's Property");
    },
    get: function () {
      /**
       * 만약 preprocess function 이 있는 경우 전처리 과정이 수행됨.
       */
      return preprocess
        ? preprocess(this.data[sourcePropertyName])
        : this.data[sourcePropertyName];
    },
    enumerable: true,
    configurable: true,
  });
}

function select(transform: TransformFunction) {
  return function (
    a,
    b,
    {
      value: fn,
      configurable,
      enumerable,
    }: TypedPropertyDescriptor<Parameters<typeof transform>['0']>
  ) {
    // Function
    if (typeof fn !== 'function') {
      throw Error('Value must be a function');
    }
    return {
      configurable,
      enumerable,
      get() {
        return async (...args: any) => {
          const result = await fn.call(this, args);
          return transform(result) as ReturnType<typeof transform>;
        };
      },
    };
  };
}

export {data, field, select};
