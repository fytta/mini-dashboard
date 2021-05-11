import { Component, Input } from '@angular/core';
import { single } from './data';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css'],
})
export class StockChartComponent {
  @Input()
  view: any[] = [50, 0];
  single: any[];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'right';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C'],
  };

  constructor(private apollo: Apollo) {
    this.initializeData();
    Object.assign(this, {single});
  }

  initializeData() {
    let values = [];
    this.getFilmsByStock(0,3)
    .then(result => {
      values.push(result);
      this.getFilmsByStock(4,6)
      .then(result => {
        values.push(result);
        this.getFilmsByStock(7,10)
        .then(result => {
          values.push(result);
          this.single = values;
        });
      });
    });
  }

  getFilmsByStock(min, max) {
    return new Promise((resolve, reject) => {
      this.apollo.watchQuery({
        query: gql `
          {
            getFilmsByStock(min:${min}, max:${max}){
              id
              title
              description
              release_year
              stock
            }
          }
        `
      }).valueChanges.subscribe((result: any) => {
        let data = result.data["getFilmsByStock"];
        resolve({name: `${min}-${max}`, value: data.length});
      });
    })

  }

  onSelect(data): void {
    console.log(data)
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }

}
