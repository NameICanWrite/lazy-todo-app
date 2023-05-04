export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
type DeepWriteable<T> = {-readonly [P in keyof T]: DeepWriteable<T[P]> };
type Cast<X, Y> = X extends Y ? X : Y
type FromEntries<T> = T extends [infer Key, any][]
    ? { [K in Cast<Key, string>]: Extract<ArrayElement<T>, [K, any]>[1]}
    : { [key in string]: any }

export type FromEntriesWithReadOnly<T> = FromEntries<DeepWriteable<T>>

export const createFromEntries = <ArrT extends ReadonlyArray<readonly[PropertyKey, any]>>(arr: ArrT) => {
    return Object.fromEntries(arr) as FromEntriesWithReadOnly<ArrT>
}

export const getEntries = <ObjT extends object>(obj: ObjT) => {
    return Object.entries(obj) as { [KeyT in keyof ObjT]: [KeyT, ObjT[KeyT]] }[keyof ObjT][]
}

export const getValues = <ObjT extends object>(obj: ObjT) => {
    return Object.values(obj) as (ObjT[keyof ObjT])[]
}

export const getKeys = <ObjT extends object>(obj: ObjT) => {
    return Object.keys(obj) as (keyof ObjT) []
}

