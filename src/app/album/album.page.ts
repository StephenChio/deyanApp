import { Component, OnInit } from '@angular/core';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  constructor(private router: Router, private common: Common, private http: HttpClient, private globalVar: globalVar, private activatedRoute: ActivatedRoute) { }
  wechatId: string;
  Moments: any;
  userName: string;
  imgPath: string;
  backgroundImg: string;
  baseUrl: string;
  resourceUrl:string;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl
    this.resourceUrl = globalVar.resourceUrl
    this.wechatId = localStorage.getItem("wechatId")
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.getMomentsPictureByWechatId(this.wechatId)
    })
    this.getMomentsPictureByWechatId(this.wechatId)
  }
  getMomentsPictureByWechatId(wechatId: any) {
    let path = globalVar.baseUrl + "/moments/getMomentsPictureByWechatId"

    const body = new HttpParams()
      .set("fWechatId", wechatId)
      .set("wechatId",localStorage.getItem("wechatId"))
      .set("token", localStorage.getItem("token"))

    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        if (data["respCode"] == globalVar.successCode) {
          localStorage.setItem("token", data["token"]);
          this.Moments = data["data"];
          this.imgPath = globalVar.baseUrl + "/" + data["data"][0].imgPath;
          this.userName = data["data"][0].userName;
          this.backgroundImg = globalVar.baseUrl + "/" + data["data"][0].backgroundImg;
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        });
  }
  showPicInfo(momentId: any, wechatId: any, pictureId: any, pictures: any, index: any, text: any, time: any) {
    // console.log(pictures)
    // console.log(momentId)
    this.router.navigate(['/picture-information'], {
      queryParams: {
        wechatId: wechatId,
        pictures: pictures,
        index: index,
        time: time,
        pictureId: pictureId,
        text: text,
        momentId: momentId
      }
    })
  }
}
