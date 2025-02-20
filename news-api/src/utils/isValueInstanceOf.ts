export type Constructor = new (...args: unknown[]) => unknown;

export function isValueInstanceOf<T extends Constructor>(elem: unknown, constructor: T): elem is InstanceType<T> {
    return elem instanceof constructor;
}
