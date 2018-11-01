const deepCopyObject = <T extends {}>(obj: T) => {
  let dist: any = {}

  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue
    }

    const type = typeof obj[key]

    switch (type) {
      case 'function':
        dist[key] = obj[key]
        break
      case 'boolean':
        dist[key] = obj[key]
        break
      case 'number':
        dist[key] = obj[key]
        break
      case 'string':
        dist[key] = obj[key]
        break
      case 'symbol':
        dist[key] = obj[key]
        break
      case 'undefined':
        dist[key] = obj[key]
        break
      case 'object':
        dist[key] = deepCopyObject(obj[key])
        break
    }
  }

  return dist as T
}

export interface BuilderInterface<T> {
  with: <K extends keyof T>(key: K, value: T[K]) => BuilderInterface<T>
  build: () => T
}

class Builder<T> implements BuilderInterface<T> {
  properties: T = {} as T

  public with = <K extends keyof T>(key: K, value: T[K]): BuilderInterface<T> => {
    this.properties[key] = value

    return this
  }

  public build = (): T => {
    let toastOptions: Partial<T> = {}

    toastOptions = deepCopyObject(this.properties)

    return toastOptions as T
  }
}

export default Builder
