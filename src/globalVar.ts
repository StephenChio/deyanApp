import { Injectable } from '@angular/core';

@Injectable()
export class globalVar {
// public static baseUrl = "http://182.92.129.204:8235"
public static successCode = "200";
public static baseUrl = "http://localhost:8235"
// public static resourceUrl = "http://182.92.129.204:8080"
public static resourceUrl = "http://localhost:8080"
public static version = "1.0"
public static busyAlert = "服务器繁忙,请重试"
public static loginTimeOutAlert = "登陆超时,请重新登陆"
public static comingSoon = "敬请期待"
public static loginWithPass = "用密码登陆"
public static loginWithCode = "用验证码登陆"
public static company = "腾一科技公司 版权所有"
public static companyMsg = "Copyright ©️2020 OneTech.All Rights Reserved"
}