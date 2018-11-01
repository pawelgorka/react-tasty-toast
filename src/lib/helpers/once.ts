export const once = (func: (...args: any[]) => any) => {
  let ran = false
  let memo: any

  return function(...args: any[]) {
    if (ran) {
      return memo
    }

    ran = true
    memo = func(...args)
    func = null as any

    return memo
  }
}
