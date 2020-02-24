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
  isLike = false;
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
  judgeIsLike(answerId:any){
    let path = globalVar.baseUrl + "/answerLikeList/judgeIsLike"
    const body = new HttpParams()
      .set("wechatId",localStorage.getItem("wechatId"))
      .set("answerId", answerId)
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
          this.isLike = data["data"];
          // this.common.presentAlert(this.isLike)
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
      })
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
          // console.log(this.isFriendFlag)
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
          this.answerId = data["data"].id
          this.isFriend(data["data"].wechatId)
          this.judgeIsLike(this.answerId)
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
      })
  }

  clickLike(){
    let path = globalVar.baseUrl + "/answerLikeList/clickLike"
    const body = new HttpParams()
      .set("wechatId",localStorage.getItem("wechatId"))
      .set("answerId", this.answerId)
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
          this.isLike = true;
          this.likeNum = Number(this.likeNum) + 1
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
      })
  }
  clickDisLike(){
    let path = globalVar.baseUrl + "/answerLikeList/clickDisLike"
    const body = new HttpParams()
      .set("wechatId",localStorage.getItem("wechatId"))
      .set("answerId", this.answerId)
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
          this.isLike = false;
          this.likeNum = Number(this.likeNum) - 1
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
  getQuestionInformation(){
    this.router.navigate(['/question-information'],
    {
      queryParams: { id: this.questionId }
    })
  }
}
