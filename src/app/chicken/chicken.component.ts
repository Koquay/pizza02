import { Component, OnInit } from '@angular/core';
import { ChickenService } from './chicken.service';

@Component({
  selector: 'app-chicken',
  templateUrl: './chicken.component.html',
  styleUrls: ['./chicken.component.scss']
})
export class ChickenComponent implements OnInit {
  private chicken;

  constructor(
    private chickenService:ChickenService
  ) { }

  ngOnInit() {
    this.getChicken();
  }

  private getChicken() {
    this.chickenService.getChicken().subscribe(chicken => {
      console.log('chicken', chicken)
      this.chicken = chicken;
    })
  }

  private addToOrder(chick) {
    
  }

}
