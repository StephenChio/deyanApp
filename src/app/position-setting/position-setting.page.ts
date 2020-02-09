import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Common } from '../Common/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-position-setting',
  templateUrl: './position-setting.page.html',
  styleUrls: ['./position-setting.page.scss'],
})
export class PositionSettingPage implements OnInit {

  constructor(private router:Router,private geolocation: Geolocation,private http: HttpClient, private globalVar: globalVar, private common: Common) { }
  position:any;
  ngOnInit() {
    this.position = localStorage.getItem("position")
    this.getLocation()
  }
  getLocation() {
    console.log("开始定位")
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
      let x = resp.coords.longitude;
      let y = resp.coords.latitude;
      // this.transBd(x, y);//获取数据，并将Google坐标转成百度坐标使用。
    }).catch(e => {
      console.log("获取定位失败" + e);
    });
  }
  updatePosition(){
    let path = globalVar.baseUrl + "/userInfo/updatePosition"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))
      .set("position", this.position);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit(globalVar.loginTimeOutAlert);
        this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
        if(data["respCode"]=="00"){
          localStorage.setItem("position", this.position);
          this.router.navigate(['/more-setting'])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
}
