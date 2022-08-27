import {Component, OnInit} from '@angular/core';
import {CsvArrayService} from "../../services/csv-array.service";

@Component({
  selector: 'app-gcp-list',
  templateUrl: './gcp-list.component.html',
  styleUrls: ['./gcp-list.component.css']
})
export class GcpListComponent implements OnInit {
  gcpData: { headerTitles: string[]; gcpArray: any[] } = {headerTitles: [], gcpArray: []};
  JSON = JSON;
  Object = Object;


  constructor(private csvArrayService: CsvArrayService) {
  }

  async ngOnInit(): Promise<void> {
    // this.gcpData = await this.csvArrayService.fetchGcpArray()
  }

  fileChanged($event: Event) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // console.log(fileReader.result);
      const rawResult = fileReader.result
      // console.log(typeof rawResult, rawResult)
      if (typeof rawResult === "string") {
        const parsed = this.csvArrayService.gcpParse(rawResult)
        console.log(parsed)
        if (this.gcpData.headerTitles.length) {
          parsed.gcpArray = parsed.gcpArray.map(pa => {
            return {...pa, idx: pa.idx + this.gcpData.gcpArray.length}
          })

          const helperNames:any = {}
          this.gcpData.gcpArray = [...this.gcpData.gcpArray, ...parsed.gcpArray].filter((gcp)=>{
            if(helperNames[gcp.name]){ return false}
            else{helperNames[gcp.name] = true; return true}
          })
        } else {

          this.gcpData = parsed
        }

        this.gcpData = {...this.gcpData}

      }


    }

    // @ts-ignore
    [...($event?.target?.files || [])].forEach(fl => {
      fileReader.readAsText(fl);
    })


    // this.files = $event?.target?.files || []
    // target.files
  }
}
