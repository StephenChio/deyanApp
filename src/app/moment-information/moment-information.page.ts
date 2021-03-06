import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Common } from '../Common/common';
import { AlertController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-moment-information',
  templateUrl: './moment-information.page.html',
  styleUrls: ['./moment-information.page.scss'],
})
export class MomentInformationPage implements OnInit {

  constructor(private actionSheetController: ActionSheetController, private alertController: AlertController, private router: Router, private http: HttpClient, private common: Common, private globalVar: globalVar, private activatedRoute: ActivatedRoute) { }
  Moments: any
  baseUrl: any
  wechatId: any
  fWechatId: any
  resourceUrl:string;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.resourceUrl = globalVar.resourceUrl;
    this.wechatId = localStorage.getItem("wechatId");
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.getMomentById(data.id)
    });
  }
  /**
  * 展示信息
  * @param wechatId 
  * @param userName 
  * @param imgPath 
  * @param remarkName 
  */
  showInfo(wechatId: any, userName: any, imgPath: any, remarkName: any) {
    this.router.navigate(['/friend-card'], {
      queryParams: {
        wechatId: wechatId,
        userName: userName,
        imgPath: imgPath,
        remarkName: remarkName,
        type: "sendMsg"
      }
    })
  }
  getMomentById(id: any) {
    let path = globalVar.baseUrl + "/moments/getMomentById"
    const body = new HttpParams().set("id", id)
      .set("wechatId", this.wechatId)
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
          this.fWechatId = this.Moments[0].wechatId
        } else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        });
  }
  clickLike(momentId: any, wechatId: any) {
    let path = globalVar.baseUrl + "/comments/clickLike"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("momentId", momentId)
      .set("fWechatId", wechatId)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        
        if (data["respCode"] == globalVar.successCode) {
          localStorage.setItem("token", data["token"]);
          // this.common.presentAlert(data["respMsg"])
          this.getMomentById(momentId)
        } else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        });
  }
  /**
   * 删除确认窗口
   */
  async deleteConfirm(id: any) {
    const alert = await this.alertController.create({
      message: "确认删除吗?",
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: '删除',
          handler: () => {
            this.deleteMomentsById(id)
          }
        }
      ]
    });
    await alert.present();
  }
  deleteMomentsById(id: any) {
    let path = globalVar.baseUrl + "/moments/deleteMomentsById"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("id", id)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        if (data["respCode"] == globalVar.successCode) {
          localStorage.setItem("token", data["token"]);
          this.router.navigate(['/friend-moments'], {
            queryParams: {
              wechatId: this.wechatId
            }
          })
        } else {
          this.common.presentAlert(data["respMsg"])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        });
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: [{
        text: '设为私密照片',
        // icon: 'share',
        handler: () => {

        }
      }, {
        text: '取消',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    })
    await actionSheet.present();
  }
  comment() {
    this.common.presentAlert(globalVar.comingSoon)
  }
}
