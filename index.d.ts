declare function clean<T>(object: T, options?: CleanOptions): Partial<T>;

export default clean;

export type CleanOptions = {
    cleanKeys?: string[];
    cleanValues?: string[];
    emptyArrays?: boolean;
    emptyObjects?: boolean;
    emptyStrings?: boolean;
    NaNValues?: boolean;
    fns: boolean,
    nullValues?: boolean;
    undefinedValues?: boolean;
};
