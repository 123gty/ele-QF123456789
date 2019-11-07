//
export function format (datetime) {
  return formatWithSeperator(datetime, ":", ":");
}

//时间个位时加0
function getDb(num){
    return num < 10 ? 0 + "" + num : num;
}


export function formatWithSeperator (datetime, dateSeprator, timeSeprator) {
  if (datetime != null) {
    const dateMat = new Date(datetime);
    const year = dateMat.getFullYear();
    const month = dateMat.getMonth() + 1;
    const day = dateMat.getDate();
    const hh = dateMat.getHours();
    const mm = dateMat.getMinutes();
    const ss = dateMat.getSeconds();
    const timeFormat = year + dateSeprator + getDb(month) + dateSeprator + getDb(day) + " " + getDb(hh) + timeSeprator + getDb(mm) + timeSeprator + getDb(ss);
    return timeFormat;
  }
}

/*
function dateToString(date){

    var weekArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];

    var str = "";
    var y = date.getFullYear();
    var m = date.getMonth()+1; //y/m/d hh:MM:ss
    var d = date.getDate();
    var h = date.getHours();
    var M = date.getMinutes();
    var s = date.getSeconds();
    var w = date.getDay();//0-6

    str += y + "年" + getDb(m) + "月" + getDb(d) + "日 "+" "+ getDb(h) + ":" + getDb(M) + ":" + getDb(s) + " ";
    //str += weekArr[w];
    return str;//2019年03月28日 15:37:02 星期四
}
 */
