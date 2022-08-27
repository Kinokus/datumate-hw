import {Component, OnInit} from '@angular/core';
import {CsvArrayService} from "../../services/csv-array.service";

@Component({
  selector: 'app-gcp-list',
  templateUrl: './gcp-list.component.html',
  styleUrls: ['./gcp-list.component.css']
})
export class GcpListComponent implements OnInit {
  gcpArray: { headerTitles: string[]; gcpArray: any[] } = {headerTitles: [], gcpArray: []};
  JSON = JSON;

  constructor(private csvArrayService: CsvArrayService) {
  }

  async ngOnInit(): Promise<void> {
    this.gcpArray = await this.csvArrayService.fetchGcpArray()
  }

}
