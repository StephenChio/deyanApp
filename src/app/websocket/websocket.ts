import { Injectable } from '@angular/core';
/**
 * websocket服务
 */

@Injectable()
export class WebSocketService {
 
  ws:WebSocket

  websocketUrl = "ws://localhost:8235"
  // websocketUrl = "ws://106.13.211.195:8235"
 
  constructor(){
 
  }
  createObservableSocket(url:string):WebSocket{
    this.ws = new WebSocket(this.websocketUrl+url);
    console.log(this.websocketUrl+url+"连接成功")
    return this.ws;
  }
}