import { Component, Input, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { single } from './data';
import { FilmYear } from '../../models/filmYear';

@Component({
  selector: 'app-release-chart',
  templateUrl: './release-chart.component.html',
  styleUrls: ['./release-chart.component.css'],
})
export class ReleaseChartComponent implements OnInit {
  
  @Input()
  view: any[] = [0, 0];
  single: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Release year';
  showYAxisLabel = true;
  yAxisLabel = 'Number of films';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(private apollo: Apollo) {
    this.initializeData();
    Object.assign(this, { single });
  }

  initializeData() {

    this.apollo.watchQuery({
      query: gql `
      {
        getFilmsPerYear{
          year
          number
        }
      }`
    }).valueChanges.subscribe((result: any) => {
      let data = result.data["getFilmsPerYear"];
      let aux = [];
      for (let i=0; i<data.length; i++) {
        aux.push({name: data[i].year, value: data[i].number});
      }
      this.single = aux;
    });
    
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {}
}
