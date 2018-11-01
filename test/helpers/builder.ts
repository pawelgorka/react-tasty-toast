export interface BuilderInterface<T> {
  with<K extends keyof T>(key: K, value: T[K]): BuilderInterface<T>
  build(): T
}

const deepCopy = <T>(object: T): T => {
  try {
    return JSON.parse(JSON.stringify(object))
  } catch (error) {
    throw new Error('invalid argument could not preform deep copy on' + object)
  }
}

abstract class Builder<T> implements BuilderInterface<T> {
  private properties: T = {} as T

  public with = <K extends keyof T>(key: K, value: T[K]): BuilderInterface<T> => {
    this.properties[key] = value

    return this
  }

  public build(): T {
    return deepCopy(this.properties)
  }
}

export default Builder
