import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globalVar } from 'src/globalVar';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Common } from '../Common/common';

@Component({
  selector: 'app-friend-moments',
  templateUrl: './friend-moments.page.html',
  styleUrls: ['./friend-moments.page.scss'],
})
export class FriendMomentsPage implements OnInit {

  constructor(private router: Router, private common: Common, private http: HttpClient, private globalVar: globalVar, private activatedRoute: ActivatedRoute) { }
  wechatId: string;
  Moments: any;
  userName: string;
  imgPath: string;
  backgroundImg: string;
  baseUrl: string;
  resourceUrl:string;
  sign:any;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.resourceUrl = globalVar.resourceUrl;
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.wechatId = data.wechatId;  //上个页面传过来的值  
      this.getFriendMoments(this.wechatId);
    })
  }
  /**
   * 得到用户动态内容
   * @param wechatId 
   */
  getFriendMoments(wechatId: any) {
    let path = globalVar.baseUrl + "/moments/getMomentsByWechatId"

    const body = new HttpParams()
      .set("fWechatId", wechatId)
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
          this.Moments = data["data"];
          // console.log(this.Moments)
          this.imgPath = globalVar.resourceUrl + "/" + data["data"][0].imgPath;
          this.userName = data["data"][0].userName;
          this.sign = data["data"][0].sign;
          this.backgroundImg = globalVar.resourceUrl + "/" + data["data"][0].backgroundImg;
        } else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        });
  }
  /**
   * 查看图片
   * @param pictureId 
   * @param pictures 
   * @param picture 
   * @param text 
   * @param time 
   */
  showPicInfo(moment: any) {
    // console.log(moment.id)
    // console.log(moment.wechatId)
    // console.log(moment.pictureId)
    // console.log(moment.pictureImgPath)
    // console.log(moment.text)
    // console.log(moment.createTime)
    if (moment.pictureId == null) {
      this.router.navigate(['/moment-information'], {
        queryParams: {
          id: moment.id
        }
      })
    }
    else {
      this.router.navigate(['/picture-information'], {
        queryParams: {
          wechatId: moment.wechatId,
          pictures: moment.pictureImgPath,
          index: 0,
          time: moment.createTime,
          pictureId: moment.pictureId,
          text: moment.text,
          momentId: moment.id,
        }
      })
    }
  }
}
