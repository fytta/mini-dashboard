import { Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Film } from 'src/app/models/film';
import { Apollo, gql } from 'apollo-angular';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0px'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'title', 'releaseYear', 'stock'];
  dataSource: MatTableDataSource<Film>;
  expandedElement: string | null;
  films: Film[];
  windowH: number = window.innerHeight;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
        {
          getFilms{
            id
            title
            description
            release_year
            stock
          }
        }
      `,
    }).valueChanges.subscribe((result: any) => {
      this.films = result.data["getFilms"];
      this.dataSource = new MatTableDataSource(this.films);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}