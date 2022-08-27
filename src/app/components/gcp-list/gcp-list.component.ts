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
  Object= Object;

  constructor(private csvArrayService: CsvArrayService) {
  }

  async ngOnInit(): Promise<void> {
    this.gcpData = await this.csvArrayService.fetchGcpArray()
  }

}
