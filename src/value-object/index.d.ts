/**
 * Preprocess Function
 */
type PreprocessFunction = <T, Result>(value: T) => Result;

/**
 *
 */
type DataClass<T> = T & {data: object};

type DataDecoratorReturn<T> = (source: object) => DataClass<T>;

type TransformFunction = <T, Result>(value: T) => Result;
