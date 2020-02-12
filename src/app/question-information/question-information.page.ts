import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-question-information',
  templateUrl: './question-information.page.html',
  styleUrls: ['./question-information.page.scss'],
})
export class QuestionInformationPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, private common: Common, private globalVar: globalVar) { }


  baseUrl: any;
  questionInformation: any;
  title: any;
  isFollow = false;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.getQuestionInformationById(data.id)
      this.isFollowed(data.id)
    });
  }
  getQuestionInformationById(id: any) {
    let path = globalVar.baseUrl + "/questionList/getQuestionInformationById"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("id", id)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit(globalVar.loginTimeOutAlert);
        // this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          console.log(data["data"])
          this.title = data["data"].title
          this.questionInformation = []
          this.questionInformation.push(data["data"])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
  isFollowed(id:any){
    let path = globalVar.baseUrl + "/followList/isFollowed"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("id", id)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit(globalVar.loginTimeOutAlert);
        // this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.isFollow = data["data"];
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
  followOptions(id:any){
    if(this.isFollow){
      this.disFollowQuestion(id);
    }
    else{
      this.followQuestion(id);
    }
  }
  disFollowQuestion(id: any) {
    let path = globalVar.baseUrl + "/followList/disFollowQuestion"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("id", id)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit(globalVar.loginTimeOutAlert);
        // this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          // this.common.presentAlert(data["respMsg"])
          this.isFollow = false;
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
  followQuestion(id: any) {
    let path = globalVar.baseUrl + "/followList/followQuestion"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("id", id)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit(globalVar.loginTimeOutAlert);
        // this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          // this.common.presentAlert(data["respMsg"])
          this.isFollow = true;
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
}
