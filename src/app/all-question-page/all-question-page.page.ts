import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Common } from '../Common/common';
import { globalVar } from 'src/globalVar';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-all-question-page',
  templateUrl: './all-question-page.page.html',
  styleUrls: ['./all-question-page.page.scss'],
})
export class AllQuestionPagePage implements OnInit {
  @ViewChild('slides',null) slides: IonSlides;

  constructor(private router: Router, private http: HttpClient, private common: Common, private globalVar: globalVar) { }
  questionList = []
  allQuestionList = []
  baseUrl:any;
  segmentChange = "page1";
  slidesChange = "page1"
  sliderOptions = {
    'initialSlide': 0, // <-- Update your locked page index here!
  }
  

  ngOnInit() {
    this.baseUrl = globalVar.baseUrl;
    this.getAllQuestionListByLanguageOption();
  }
  segmentChanged(event){

  }
  doRefresh(event) {
    if(this.segmentChange=='page1'){
      this.getAllQuestionListByLanguageOption();
    }else{
      this.getAllQuestionList();
    }
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
   /**
   * 
   * @param i 下一张图片
   */
  ionSlideNextEnd() {
    this.segmentChange = 'page2'
    this.getAllQuestionList();
  }
  /**
   * 
   * @param i 上一张图片
   */
  ionSlidePrevEnd() {
    this.segmentChange = 'page1'
    this.getAllQuestionListByLanguageOption();
  }
  choosePage1(){
    // this.sliderOptions.initialSlide = 0
    // this.getAllQuestionListByLanguageOption();
    this.slides.slidePrev();
  }
  choosePage2(){
    // this.sliderOptions.initialSlide = 1
    // this.getAllQuestionList();
    this.slides.slideNext();
  }
  getAllQuestionList(){
    let path = globalVar.baseUrl + "/questionList/getAllQuestionList"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
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
          // console.log(data["data"])
          this.allQuestionList = data["data"]
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
  getAllQuestionListByLanguageOption() {
    let path = globalVar.baseUrl + "/questionList/getAllQuestionListByLanguageOption"
    const body = new HttpParams()
      .set("wechatId", localStorage.getItem("wechatId"))
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
          // console.log(data["data"])
          this.questionList = data["data"]
        }
      },
        error => {
          this.common.presentAlert(globalVar.busyAlert)
        })
  }
  getQuestionInformation(id:any){
    this.router.navigate(['/question-information'],
              {
                queryParams: { id: id }
              })
  }
}
