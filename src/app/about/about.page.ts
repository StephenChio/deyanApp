import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private common:Common,private globalVar:globalVar,private activatedRoute:ActivatedRoute) { }
  version:any;
  company:any;
  companyMsg:any;
  ngOnInit() {
    this.company = globalVar.company;
    this.companyMsg = globalVar.companyMsg;
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.version = data.version;
    })
  }
  comment() {
    this.common.presentAlert(globalVar.comingSoon)
  }
}
