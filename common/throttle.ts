
export function throttle(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout | null
  let needCall = true

  return (...args: any[]) => {
    if (needCall) {
      func(...args)
      needCall = false

      timeout = setTimeout(() => {
        needCall = true
      }, wait)
    }
  }
}
