  // 正则
  // 常见正则表达式
/* 一、校验数字的表达式

1 数字：^[0-9]*$
2 n位的数字：^\d{n}$
3 至少n位的数字：^\d{n,}$
4 m-n位的数字：^\d{m,n}$
5 零和非零开头的数字：^(0|[1-9][0-9]*)$
6 非零开头的最多带两位小数的数字：^([1-9][0-9]*)+(.[0-9]{1,2})?$
7 带1-2位小数的正数或负数：^(\-)?\d+(\.\d{1,2})?$
8 正数、负数、和小数：^(\-|\+)?\d+(\.\d+)?$
9 有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
10 有1~3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
11 非零的正整数：^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$ 或 ^\+?[1-9][0-9]*$
12 非零的负整数：^\-[1-9][]0-9"*$ 或 ^-[1-9]\d*$
13 非负整数：^\d+$ 或 ^[1-9]\d*|0$
14 非正整数：^-[1-9]\d*|0$ 或 ^((-\d+)|(0+))$
15 非负浮点数：^\d+(\.\d+)?$ 或 ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$
16 非正浮点数：^((-\d+(\.\d+)?)|(0+(\.0+)?))$ 或 ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$
17 正浮点数：^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ 或 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
18 负浮点数：^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ 或 ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
19 浮点数：^(-?\d+)(\.\d+)?$ 或 ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$

二、校验字符的表达式
1 汉字：^[\u4e00-\u9fa5]{0,}$
2 英文和数字：^[A-Za-z0-9]+$ 或 ^[A-Za-z0-9]{4,40}$
3 长度为3-20的所有字符：^.{3,20}$
4 由26个英文字母组成的字符串：^[A-Za-z]+$
5 由26个大写英文字母组成的字符串：^[A-Z]+$
6 由26个小写英文字母组成的字符串：^[a-z]+$
7 由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
8 由数字、26个英文字母或者下划线组成的字符串：^\w+$ 或 ^\w{3,20}$
9 中文、英文、数字包括下划线：^[\u4E00-\u9FA5A-Za-z0-9_]+$
10 中文、英文、数字但不包括下划线等符号：^[\u4E00-\u9FA5A-Za-z0-9]+$ 或 ^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$
11 可以输入含有^%&',;=?$\"等字符：[^%&',;=?$\x22]+
12 禁止输入含有~的字符：[^~\x22]+

三、特殊需求表达式

1 Email地址：^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
2 域名和ip：/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
3 InternetURL：[a-zA-z]+://[^\s]* 或 ^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$
4 手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
5 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$
6 国内电话号码(0511-4405222、021-87888822)：\d{3}-\d{8}|\d{4}-\d{7}
7 身份证号(15位、18位数字)：^\d{15}|\d{18}$
8 短身份证号码(数字、字母x结尾)：^([0-9]){7,18}(x|X)?$ 或 ^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$
9 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：^[a-zA-Z][a-zA-Z0-9_]{4,15}$
10 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
11 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
12 日期格式：^\d{4}-\d{1,2}-\d{1,2}
 */
const numberReg = /^[1-9]\d*$/
const noneZeroNum = /^[0-9]\d*$/
const underlineZnEnReg = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
const stringReg = /^\w+$/
const chineseReg = /^[\u4e00-\u9fa5]{0,}$/
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ // 邮箱
const mobileReg = /^1[0-9]{10}$/ // 手机号码
const phoneReg = /^([0-9]{3,4}-)?[0-9]{7,8}$/ // 电话号码
const portReg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/ // 端口
const domainReg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
const domainPortReg = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])+$/ // 域名+端口号的校验
const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ // ip校验
const ipPortReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/ // ip+域名的校验
const urlReg = /^http[s]?:\/\/.*/ // URL地址
const cardIdReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/ // 身份证 15位、18位数字
const strongPasswordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/ // 必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-20之间
// 节点名称校验
const targetNameRule = (rule, value, callback) => {
    if (!underlineZnEnReg.test(value) || noneZeroNum.test(value.slice(0,1)) || value.length<3 || value.length>64) {
        callback(new Error('支持汉字，英文，数字，下划线，且只能以英文和汉字开头，3-64字符!'))
    } else {
        callback()
    }
}
// 按钮以及菜单名称校验
const buttonNameRule = (rule, value, callback) => {
    let reg = /^[\u4E00-\u9FA5A-Za-z]{1}[\u4E00-\u9FA5A-Za-z0-9_]{1,63}$/
    if (!reg.test(value)) {
        callback(new Error('支持汉字，英文，数字，下划线，且只能以英文和汉字开头，2-64字符!'))
    } else {
        callback()
    }
}
// 昵称校验
const nickNameRule = (rule, value, callback) => {
  let length = value.trim().length
  if (length < 2 || length > 64) {
      callback(new Error('支持汉字，英文，数字，允许出现特殊字符，长度为2-64字符!'))
  } else {
      callback()
  }
}
// 域名或者IP地址
const domainRule = (rule, value, callback) => {
    let reg1 = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    let reg2 =/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
    let reg3 = /^(\d+\.)*\d+$/
    if (reg1.test(value) || (reg2.test(value) && !reg3.test(value))) {
        callback()
    } else {
        callback(new Error('请输入合法的域名或者IP地址!'))
    }
}
// 可带端口号的域名或者IP地址
const domainPortRule = (rule, value, callback) => {
    let reg1 = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))?$/
    let reg2 =/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))?$/
    let reg3 = /^(\d+\.)*\d+(\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))?$/
    if (reg1.test(value) || (reg2.test(value) && !reg3.test(value))) {
        callback()
    } else {
        callback(new Error('请输入合法的域名或者IP地址,可带端口号！'))
    }
}
// 路径前缀
const pathRule = (rule, value, callback) => {
    // let reg = /^(\/[a-zA-Z0-9\-_]+)*\/?$/
	let reg = /^(\/[a-zA-Z0-9\-_,=\+\.\u4e00-\u9fa5]+)*\/?(#[^\/\\\?\#]+)?(\?[^\/\\\?\#]+)?$/
    if (!reg.test(value)) {
        callback(new Error('路径必须以/开头,并且不能出现//,支持英文、数字、-、_'))
    } else {
        callback()
    }
}
export {
    numberReg,
    noneZeroNum,
    underlineZnEnReg,
    stringReg,
    chineseReg,
    emailReg,
    mobileReg,
    phoneReg,
    portReg,
    ipReg,
    domainReg,
    domainPortReg,
    ipPortReg,
    urlReg,
    cardIdReg,
    strongPasswordReg,
    targetNameRule,
    buttonNameRule,
    nickNameRule,
    domainRule,
    domainPortRule,
    pathRule
}