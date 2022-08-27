import {Injectable} from '@angular/core';

const {readFileSync, promises: fsPromises} = require('fs');

@Injectable({
  providedIn: 'root'
})
export class CsvArrayService {

  constructor() {
  }

  fetchGcpArray() {
    const gcpRaw = readFileSync('./test.gcp.csv', 'utf-8');
    const gcpLines = gcpRaw.split(/\r?\n/);
    const gcpArray = []
    const headerTitles = gcpLines[0].splt(',')
    for (let gcpIdx = 1; gcpIdx < gcpLines.length; gcpIdx++) {
      const gcpObj:any = {}
      headerTitles.forEach((ht:string, htIdx:number) => {
        gcpObj[ht] = gcpLines[gcpIdx][htIdx]
      })
      gcpArray.push(gcpObj)
    }
    console.log(gcpArray)

  }

}
