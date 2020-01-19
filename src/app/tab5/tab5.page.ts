import { Component, OnInit } from '@angular/core';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private globalVar:globalVar) { }
  imgPath:any;
  baseUrl:any;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.imgPath = localStorage.getItem("imgPath");
  }
}
