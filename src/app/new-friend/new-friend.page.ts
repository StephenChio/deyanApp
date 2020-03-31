import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-new-friend',
  templateUrl: './new-friend.page.html',
  styleUrls: ['./new-friend.page.scss'],
})
export class NewFriendPage implements OnInit {

  constructor(private globalVar: globalVar, private http: HttpClient, private common: Common) { }
  newFriend = []
  baseUrl: string;
  resourceUrl:string;
  ngOnInit() {
    this.resourceUrl = globalVar.resourceUrl;
    this.baseUrl = globalVar.baseUrl;
    this.getNewFriend()
  }
  /**
   * 获取好友申请
   */
  getNewFriend() {
    let path = globalVar.baseUrl + "/addressList/getNewFriend"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        
        if (data["respCode"] == globalVar.successCode) {
          localStorage.setItem("token", data["token"]);
          this.newFriend = data["data"];
        } else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert);
        })
  }
}
