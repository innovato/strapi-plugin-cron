export const captureConsoleOutput = async (callback: Function) => {
  let consoleData: any[] = []
  const consoleLog = console.log

  console.log = function (...args: any[]) {
    consoleData.push(args)
    consoleLog(...args)
  }

  try {
    callback()
  } catch (e) {
    console.log('* Callback error\n', e)
  }

  console.log = consoleLog

  try {
    const data = JSON.parse(JSON.stringify(consoleData))
    return data
  } catch (e) {
    console.log('* Console data parsing error', e)
  }
}
