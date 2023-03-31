// source: https://dev.to/svehla/typescript-object-fromentries-389c
// passing invalid types
type Cast<X, Y> = X extends Y ? X : Y
// extacting data outside of an Array<T> wrapper
type ArrayElement<A> = A extends readonly (infer T) []
    ? T
    : never
type DeepWritable<T> = {-readonly [P in keyof T]:DeepWritable<T[P]>}
// defining a new object FromEntries
// note the value should be the second element in the array
export type FromEntries<T> = T extends [infer Key, any][]
        ? {[K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, any]>[1]}
        : {[key in string]: any}
// in case of readonly
export type FromEntriesWithReadOnly<T> = FromEntries<DeepWritable<T>>
