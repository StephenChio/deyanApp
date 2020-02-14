import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { globalVar } from 'src/globalVar';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Common } from '../Common/common';

@Component({
  selector: 'app-answer-information',
  templateUrl: './answer-information.page.html',
  styleUrls: ['./answer-information.page.scss'],
})
export class AnswerInformationPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, private common: Common, private globalVar: globalVar) { }
  title:any;
  answerNum:any;
  answerId:any;
  questionId:any;
  baseUrl:any;
  answer = []
  agreeNum:any
  likeNum:any
  commentsNum:any
  nextAnswerId:any;
  preAnswerId:any;
  isFriendFlag = false;
  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.answerId=data.answerId
      this.title = data.title
      this.questionId = data.questionId
      this.answerNum = data.answerNum
      // console.log(this.answerId)
      this.getAnswerById(this.answerId)
    });
  }
  isFriend(fWechatId:any){
    let path = globalVar.baseUrl + "/addressList/isFriend"
    const body = new HttpParams()
      .set("wechatId",localStorage.getItem("wechatId"))
      .set("fWechatId", fWechatId)
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
          this.isFriendFlag = data["data"];
          console.log(this.isFriendFlag)
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
      })
  }
  nextAnswer(){

    if(this.common.isEmpty(this.nextAnswerId)){
      this.common.presentAlert("已经是最后一个答案了")
    }
    else{
      this.getAnswerById(this.nextAnswerId)
    }
  }
  preAnswer(){
    if(this.common.isEmpty(this.preAnswerId)){
      this.common.presentAlert("已经是第一个答案了")
    }
    else{
      this.getAnswerById(this.preAnswerId)
    }
  }
  getAnswerById(id:any){
    let path = globalVar.baseUrl + "/answerList/getAnswerById"
    const body = new HttpParams()
      .set("questionId",this.questionId)
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
          this.answer = []
          this.answer.push(data["data"])
          this.agreeNum = data["data"].agreeNum
          this.commentsNum = data["data"].commentsNum
          this.likeNum = data["data"].likeNum
          this.nextAnswerId = data["data"].nextAnswerId
          this.preAnswerId = data["data"].preAnswerId
          this.isFriend(data["data"].wechatId)
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
      })
  }
  toWriteAnswerPage(){
    this.router.navigate(['/write-answer-page'],
    {
      queryParams: { id: this.questionId, title: this.title }
    })
  }
}
