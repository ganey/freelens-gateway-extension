/**
 * Creates a lazy proxy for an object that is only instantiated upon first property access.
 * This is crucial for KubeApi and KubeObjectStore instances, which can only be constructed
 * within a cluster page frame context and not at module evaluation time in the root frame.
 */
export function lazy<T extends object>(factory: () => T): T {
  let instance: T | undefined;

  function getInstance(): T {
    if (!instance) {
      instance = factory();
    }
    return instance;
  }

  return new Proxy({} as T, {
    get(_target, prop) {
      return (getInstance() as any)[prop];
    },
    set(_target, prop, value) {
      (getInstance() as any)[prop] = value;
      return true;
    },
    has(_target, prop) {
      return prop in getInstance();
    },
  });
}

