import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  numberOfFilms: number = 0;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
        {
          getFilms{
            id
          }
        }
      `,
    }).valueChanges.subscribe((result: any) => {
      this.numberOfFilms = result.data.getFilms.length;
    });
  }

}
