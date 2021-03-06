import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../websocket/websocket';
import { PopoverController, AlertController } from '@ionic/angular';
import { globalVar } from 'src/globalVar';
import { Common } from '../Common/common';
import { Popover } from '../Common/popover';
import { PopComponentComponent } from '../pop-component/pop-component.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private popor: Popover, private alertController: AlertController, private common: Common, private globalVar: globalVar, private router: Router, private ws: WebSocketService) { }
  wechatId: any;
  chatsGroup: any;
  websocket = null;
  baseUrl: string;
  currentPopover = null;
  searchChatList = [];
  searchText: any;
  removeMsg = "删除"
  isMark = true;
  resourceUrl:string
  ngOnInit() {
    var _this = this
    this.resourceUrl = globalVar.resourceUrl;
    this.baseUrl = globalVar.baseUrl;
    this.chatsGroup = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "chats"))
    var remarkList = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "remarkList"))
    for (var p in this.chatsGroup) {
      for(var k in remarkList){
        if(remarkList[k].wechatId == this.chatsGroup[p].wechatId){
          this.chatsGroup[p].fUserName = remarkList[k].remarkName
        }
      }
    }
    localStorage.setItem(localStorage.getItem("wechatId") + "chats", JSON.stringify(this.chatsGroup))
    const url = "/websocket/socketServer?WS_NAME=tab1" +"and"+ localStorage.getItem("wechatId")
    console.log(this.websocket)
    if (this.websocket == null) {
      this.websocket = this.ws.createObservableSocket(url)
      this.websocket.onmessage = function (event: any) {
        var resBody = JSON.parse(event.data)
        console.log(resBody);
        if (resBody == "1001") {
          _this.common.quit("该账号在别地登陆,如非本人操作,请检查账号或咨询客服");
        } else {
          var remarkList = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "remarkList"))
          for(var p in remarkList){
            if(remarkList[p].wechatId == resBody.wechatId){
              resBody.userName = remarkList[p].remarkName
            }
          }
          var chats = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + resBody.wechatId))
          var body = { wechatId: resBody.wechatId, imgPath: resBody.imgPath, msg: resBody.msg }
          _this.chatsGroup = JSON.parse(localStorage.getItem(resBody.fWechatId + "chats"))
          if (chats == null) {
            chats = []
            if (_this.chatsGroup == null) {
              _this.chatsGroup = []
            }
            _this.chatsGroup.push({ wechatId: resBody.wechatId, fUserName: resBody.userName, lastMsg: resBody.msg, msgNum: 1, imgPath: resBody.imgPath })
            chats.push(body);
            localStorage.setItem(localStorage.getItem("wechatId") + resBody.wechatId, JSON.stringify(chats))
          }
          else {
            // console.log(resBody.wechatId)
            chats.push(body);
            localStorage.setItem(localStorage.getItem("wechatId") + resBody.wechatId, JSON.stringify(chats))
            var flag = false
            for (var p in _this.chatsGroup) {
              if (_this.chatsGroup[p].wechatId == resBody.wechatId) {
                _this.chatsGroup[p].lastMsg = resBody.msg
                _this.chatsGroup[p].fUserName = resBody.userName
                if (_this.chatsGroup[p].msgNum == null) {
                  _this.chatsGroup[p].msgNum = 1
                }
                else {
                  _this.chatsGroup[p].msgNum = _this.chatsGroup[p].msgNum + 1
                }
                flag = true
              }
            }
            if (!flag) {
              _this.chatsGroup.push({ wechatId: resBody.wechatId, fUserName: resBody.userName, lastMsg: resBody.msg, msgNum: 1, imgPath: resBody.imgPath })
            }
          }
          localStorage.setItem(resBody.fWechatId + "chats", JSON.stringify(_this.chatsGroup))
        }
      }
    }
  }

  /**
   * 隐藏界面
   */
  hide() {
    var title = document.getElementById("tab1Title");
    var chatList = document.getElementById("chatList");
    var searchChatList = document.getElementById("searchChatList");
    title.style.display = "none";
    chatList.style.display = "none";
    searchChatList.style.removeProperty("display");
    // console.log("hide")
  }
  /**
   * 展示界面
   */
  show() {
    var title = document.getElementById("tab1Title");
    var chatList = document.getElementById("chatList");
    var searchChatList = document.getElementById("searchChatList");
    title.style.removeProperty("display");
    chatList.style.removeProperty("display");
    searchChatList.style.display = "none";
    this.searchChatList = [];
    // console.log("show")
  }
  /**
   * 进入聊天室
   * @param fUserName 
   * @param fWechatId 
   * @param imgPath 
   */
  showChat(fUserName: any, fWechatId: any, imgPath: any) {
    localStorage.setItem('fUserName', fUserName);
    localStorage.setItem('fWechatId', fWechatId);
    var wechatId = localStorage.getItem("wechatId");
    this.chatsGroup = JSON.parse(localStorage.getItem(wechatId + "chats"))
    for (var p in this.chatsGroup) {
      if (this.chatsGroup[p].wechatId == fWechatId) {
        this.chatsGroup[p].msgNum = null
      }
    }
    localStorage.setItem(wechatId + "chats", JSON.stringify(this.chatsGroup))
    this.router.navigate(['/chat-page'],
      {
        queryParams: { imgPath: imgPath ,name:fUserName}
      });
  }
  /**
   * 弹出选项卡
   */
  presentPopover() {
    this.popor.presentPopover(PopComponentComponent);
  }
  /**
   * 离开页面时
   */
  ionViewDidLeave() {
    // console.log("ionViewDidLeave")
    this.show();
  }
  /**
   * 将要进入页面时
   */
  ionViewWillEnter() {
    this.chatsGroup = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "chats"))
  }
  /**
   * 
   * @param event 刷新
   */
  doRefresh(event) {
    this.ngOnInit()
    setTimeout(() => {
      // console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
  initStatus(){
    this.removeMsg="删除"
    this.isMark = true
  }
  removeConfirm(wechatId){
    if(this.removeMsg=="删除"){
      this.removeMsg = "确认删除"
      this.isMark = false
    }
    else{
      this.removeChat(wechatId)
    }
  }
  /**
   * 
   * @param wechatId 移除聊天
   */
  removeChat(wechatId:any) {
    var i = -1
    for (var p in this.searchChatList) {
      i = i + 1;
      if(this.searchChatList[p].wechatId==wechatId){
        this.searchChatList.splice(i,1)
      }
    }
    this.chatsGroup = JSON.parse(localStorage.getItem(localStorage.getItem("wechatId") + "chats"));
    for (var p in this.chatsGroup) {
      if (this.chatsGroup[p].wechatId == wechatId) {
        this.chatsGroup.splice(p, 1);
        // delete this.chatsGroup[p];
        localStorage.setItem(localStorage.getItem("wechatId") + "chats", JSON.stringify(this.chatsGroup))
        localStorage.removeItem(localStorage.getItem("wechatId") + wechatId);
      }
    }
  }
  /**
   * 搜索聊天
   */
  searchChat() {
    if (this.searchText == "") {
      return;
    }
    this.searchChatList = [];
    // console.log(this.searchText);
    for (var p in this.chatsGroup) {
      if ((this.chatsGroup[p].fUserName!=null && this.chatsGroup[p].fUserName.match(this.searchText)) 
       || (this.chatsGroup[p].lastMsg!=null &&this.chatsGroup[p].lastMsg.match(this.searchText))
       || (this.chatsGroup[p].wechatId!=null &&this.chatsGroup[p].wechatId.match(this.searchText))) {
        this.searchChatList.push(this.chatsGroup[p]);
      }
    }
    // console.log(this.searchChatList)
  }
}
