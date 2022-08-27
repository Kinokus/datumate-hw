import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CsvArrayService {

  constructor() {
  }

  async fetchGcpArray() {
    const gcpRawResponse = await fetch('assets/test.gcp.csv');
    const gcpRaw = await gcpRawResponse.text()
    return this.gcpParse(gcpRaw)
  }

  gcpParse(gcpRaw: string) {
    const workers: any = {name: String, n: parseFloat, e: parseFloat, h: parseFloat}
    const gcpLines = gcpRaw.split(/\r?\n/);
    const gcpArray = []
    const headerTitles = [...gcpLines[0].split(',')]

    for (let gcpIdx = 1; gcpIdx < gcpLines.length; gcpIdx++) {
      const gcpObj: any = {}
      const gcpStringValues = gcpLines[gcpIdx].split(',')

      const errorArray: any = []
      gcpObj.idx = gcpIdx
      if (gcpStringValues.length !== headerTitles.length) {
        const errorObj: any = {}
        if (gcpStringValues.length < headerTitles.length) {
          errorObj.description = 'Not enough data!'
        }
        if (gcpStringValues.length > headerTitles.length) {
          errorObj.description = 'Too many data!'
        }
        errorObj.raw = gcpLines[gcpIdx]
        errorArray.push(errorObj)

      } else {
        headerTitles.forEach((ht: string, htIdx: number) => {

          const errorObj: any = {}
          const result = workers[ht]?.(gcpStringValues[htIdx])
          gcpObj[ht] = result || gcpStringValues[htIdx]
          switch (String(result)) {
            case 'NaN': {
              errorObj.field = ht
              errorObj.initValue = gcpStringValues[htIdx]
              errorObj.description = 'Must be number and not empty'
              errorArray.push(errorObj)
              break
            }
            case '': {
              errorObj.field = ht
              errorObj.initValue = gcpStringValues[htIdx]
              errorObj.description = 'Must be not empty'
              errorArray.push(errorObj)
              break
            }
            default: {
              break
            }
          }
        })
      }
      gcpObj.error = errorArray.length ? JSON.stringify(errorArray, null, 1) : null
      gcpArray.push(gcpObj)
    }
    return {headerTitles: ['idx', ...headerTitles, 'error'], gcpArray}
  }


}
