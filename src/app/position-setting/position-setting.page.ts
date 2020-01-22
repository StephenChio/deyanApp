import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Common } from '../Common/common';

@Component({
  selector: 'app-position-setting',
  templateUrl: './position-setting.page.html',
  styleUrls: ['./position-setting.page.scss'],
})
export class PositionSettingPage implements OnInit {

  constructor(private http: HttpClient, private globalVar: globalVar, private common: Common) { }
  position:any;
  ngOnInit() {
    this.position = localStorage.getItem("position")
  }

}
