import { Component, OnInit } from '@angular/core';
import { Popover } from '../Common/popover';
import { Common } from '../Common/common';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-comment-component',
  templateUrl: './comment-component.component.html',
  styleUrls: ['./comment-component.component.scss'],
})
export class CommentComponentComponent implements OnInit {

  constructor(private globalVar: globalVar, private http: HttpClient, private common: Common, private popover: Popover) { }

  ngOnInit() { }
  comment() {
    this.popover.dismiss();
  }
  clickLike() {
    let path = globalVar.baseUrl + "/comments/clickLike"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("momentId", localStorage.getItem("momentId"))
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        if (data["respCode"] == globalVar.successCode) {
          localStorage.setItem("token", data["token"]);
          this.common.presentAlert(data["respMsg"])
        }
        else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        });
    this.popover.dismiss();
  }
}
