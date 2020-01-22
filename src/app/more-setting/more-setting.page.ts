import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Common } from '../Common/common';

@Component({
  selector: 'app-more-setting',
  templateUrl: './more-setting.page.html',
  styleUrls: ['./more-setting.page.scss'],
})
export class MoreSettingPage implements OnInit {

  constructor() { }
  sex:any;
  position:any;
  sign:any;
  public form = [
    { text:'男', val: 'male', isChecked: true },
    { text:'女', val: 'female', isChecked: false },
    { text:'其他',val: 'other', isChecked: false }
  ];
  ngOnInit() {
    for (var i = 0; i < this.form.length; i++) {
      if (this.form[i].val == localStorage.getItem("sex")) {
        this.sex =this.form[i].text;
      }
    }
    this.position = localStorage.getItem("position");
    this.sign = localStorage.getItem("sign")
    
  }
  ionViewWillEnter(){
    for (var i = 0; i < this.form.length; i++) {
      if (this.form[i].val == localStorage.getItem("sex")) {
        this.sex =this.form[i].text;
      }
    }
    this.position = localStorage.getItem("position");
    this.sign = localStorage.getItem("sign")
  }
}
