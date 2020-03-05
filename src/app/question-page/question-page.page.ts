import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.page.html',
  styleUrls: ['./question-page.page.scss'],
})
export class QuestionPagePage implements OnInit {

  constructor(private router: Router, private http: HttpClient, private common: Common, private globalVar: globalVar) { }
  languageList = ['中文', 'English', '日本语']
  title: any;
  explainText: any;
  language: any;
  ngOnInit() {
  }
  questionPublish() {
    // this.common.presentAlert(this.titleText)
    if (this.title == null || this.title == "") {
      this.common.presentAlert("请输入问题")
      return
    }
    else {
      if (this.title[this.title.length - 1] != "？" && this.title[this.title.length - 1] != "?") {
        this.common.presentAlert("问题请以问号结尾")
        return
      }
    }
    if (this.language == null || this.language == "") {
      this.common.presentAlert("请选择一个语种提问")
      return
    }
    if(this.common.isEmpty(this.explainText)){
      this.explainText = ""
    }
    let path = globalVar.baseUrl + "/questionList/questionPublish"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("title",this.title)
      .set("explainText",this.explainText)
      .set("languageType",this.language)
      .set("token", localStorage.getItem("token"))
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if (data == null) this.common.quit(globalVar.loginTimeOutAlert);
        this.common.presentAlert(data["respMsg"])
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.router.navigate(['/my-question'])
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
}
