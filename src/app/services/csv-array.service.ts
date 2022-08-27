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

    const gcpLines = gcpRaw.split(/\r?\n/);
    const gcpArray = []
    const headerTitles = [...gcpLines[0].split(',')]
    
    for (let gcpIdx = 1; gcpIdx < gcpLines.length; gcpIdx++) {
      const gcpObj: any = {}
      headerTitles.forEach((ht: string, htIdx: number) => {
        gcpObj.idx = gcpIdx
        const gcpStringValues = gcpLines[gcpIdx].split(',')
        if (gcpStringValues.length !== headerTitles.length) {
          if (gcpStringValues.length < headerTitles.length) {
            gcpObj.error = 'Not enough data!'
          }
          if (gcpStringValues.length > headerTitles.length) {
            gcpObj.error = 'Too many data!'
          }
          gcpObj.raw = gcpLines[gcpIdx]
        } else {
          gcpObj[ht] = gcpStringValues[htIdx]
        }
      })


      gcpArray.push(gcpObj)

    }
    return {headerTitles:['idx', ...headerTitles, 'error'], gcpArray}

  }

}
