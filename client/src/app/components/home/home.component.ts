import { AfterViewInit, Component, HostListener, OnInit } from "@angular/core";

export interface WindowSize {
  height: number;
  width: number;
}

/**
 * @title Dynamic grid-list
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  windowSize: WindowSize = {
    height: 0, width: 0
  };
  offsetHeight: number = 100;

  viewRelease: any[] = [0, 0];
  viewStock: any[] = [0, 0];

  dataSource: any;

  constructor() { 
    this.getScreenSize();
  }
  ngAfterViewInit(): void {
    this.getScreenSize(null);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.windowSize.height = window.innerHeight - this.offsetHeight;
    this.windowSize.width = window.innerWidth - this.offsetHeight;
    this.viewRelease = this.getReleaseChartTileSize();
    this.viewStock = this.getStockChartTileSize();
  }

  getReleaseChartTileSize() {
    let size = [400, 0];
    let chartTile = document.getElementById("chart-tile");
    if (chartTile) {
      size[0] = chartTile.offsetWidth;
      size[1] = chartTile.offsetHeight;
    } 
    return size;
  }

  getStockChartTileSize() {
    let size = [400, 0];
    let stockTile = document.getElementById("stock-tile");
    if (stockTile) {
      size[0] = stockTile.offsetWidth;
      size[1] = stockTile.offsetHeight;
    } 
    return size;
  }

}
