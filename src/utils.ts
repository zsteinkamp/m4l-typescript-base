export function debugFactory({ actuallyLog = true } = {}) {
  function debug(_: any) {
    post(Array.prototype.slice.call(arguments).join(' '), '\n')
  }
  if (!actuallyLog) {
    return () => {}
  }
  return debug
}
