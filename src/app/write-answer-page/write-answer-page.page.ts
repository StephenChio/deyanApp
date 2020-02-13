import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { globalVar } from 'src/globalVar';
import { Common } from '../Common/common';

@Component({
  selector: 'app-write-answer-page',
  templateUrl: './write-answer-page.page.html',
  styleUrls: ['./write-answer-page.page.scss'],
})
export class WriteAnswerPagePage implements OnInit {

  constructor(private router:Router,private common:Common ,private http:HttpClient,private globalVar:globalVar,private activatedRoute:ActivatedRoute ) { }
  title:any
  answerText:any
  questionId:any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.title = data.title;
      this.questionId = data.id;
  });
  }
  answerPublish(){
    let path = globalVar.baseUrl + "/answerList/answerPublish"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
      .set("id", this.questionId)
      .set("answerText",this.answerText)
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
          this.router.navigate(['/question-information'],
          {
            queryParams: { id: this.questionId}
          })

        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
}
