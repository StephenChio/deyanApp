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
  collectNum:any
  likeNum:any
  commentsNum:any
  nextAnswerId:any;
  preAnswerId:any;
  isFriendFlag = false;
  isLike = false;
  isCollect = false;
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
  judgeIsCollect(answerId:any){
    let path = globalVar.baseUrl + "/collectAnswerList/judgeIsCollect"
    const body = new HttpParams()
      .set("wechatId",localStorage.getItem("wechatId"))
      .set("questionId",this.questionId)
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
          this.isCollect = data["data"];
          // this.common.presentAlert(this.isLike)
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
      })
  }
  comment() {
    this.common.presentAlert(globalVar.comingSoon)
  }
  isFriend(fWechatId:any){
    if(fWechatId == localStorage.getItem("wechatId")){
      this.isFriendFlag = true
      return;
    }
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
        this.common.log(data["data"])
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.answer = []
          this.answer.push(data["data"])
          this.collectNum = data["data"].collectNum
          this.commentsNum = data["data"].commentsNum
          this.likeNum = data["data"].likeNum
          this.nextAnswerId = data["data"].nextAnswerId
          this.preAnswerId = data["data"].preAnswerId
          this.answerId = data["data"].id
          this.isFriend(data["data"].wechatId)
          this.judgeIsLike(this.answerId)
          this.judgeIsCollect(this.answerId)
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
  searchFriend(wechatId:any) {
    let path = globalVar.baseUrl + "/userInfo/searchFriend"

    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("searchContext", wechatId)
      .set("token", localStorage.getItem("token"))
    // console.log(body);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          if (data["data"].length > 0) {
            this.router.navigate(['/friend-card'],
              {
                queryParams: { wechatId: data["data"][0].wechatId, userName: data["data"][0].userName, imgPath: data["data"][0].imgPath }
              })
          }
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        });
  }
  collectAnswer(){
    let path = globalVar.baseUrl + "/collectAnswerList/collectAnswer"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("questionId",this.questionId)
      .set("answerId", this.answerId)
      .set("token", localStorage.getItem("token"))
    // console.log(body);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.isCollect = true;
          this.collectNum = Number(this.collectNum) + 1
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
      });
  }
  disCollectAnswer(){
    let path = globalVar.baseUrl + "/collectAnswerList/disCollectAnswer"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("questionId",this.questionId)
      .set("answerId", this.answerId)
      .set("token", localStorage.getItem("token"))
    // console.log(body);
    let httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    this.http.post(path, body, httpOptions)
      .subscribe(data => {
        if(data==null)this.common.quit(globalVar.loginTimeOutAlert);
        localStorage.setItem("token", data["token"]);
        if (data["respCode"] == "00") {
          this.isCollect = false;
          this.collectNum = Number(this.collectNum) - 1
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
      });
  }
}
