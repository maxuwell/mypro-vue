 // xlsx 导出插件
 import XLSX from 'xlsx'
 import XLSX_SAVE from  'file-saver'

const saveAs = (obj, fileName) => {//当然可以自定义简单的下载文件实现方式 
  var tmpa = document.createElement("a");
  tmpa.download = fileName || "下载";
  tmpa.href = URL.createObjectURL(obj); //绑定a标签
  tmpa.click(); //模拟点击实现下载
  setTimeout(function () { //延时释放
    URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
  }, 100);
}

const wopts = { bookType: 'xlsx', bookSST: true, type: 'binary' };//这里的数据是用来定义导出的格式类型 

const s2ab = (s) => {
  if (typeof ArrayBuffer !== 'undefined') {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  } else {
    var buf = new Array(s.length);
    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
}

const downloadExl = (data, type) => {
  var wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
  //wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
  // data = XLSX.utils.json_to_sheet(data);
  // data["A1"] = { t: "s", v: "个人信息" };
  // data["F1"] = { t: "s", v: "项目经理考核" };
  // data["G1"] = { t: "s", v: "业务1经理考核" };
  // data["H1"] = { t: "s", v: "业务2经理考核" };
  // data["!merges"] = [{//合并第一行数据[B1,C1,D1,E1]
  //   s: {//s为开始
  //     c: 0,//开始列
  //     r: 0//开始取值范围
  //   },
  //   e: {//e结束
  //     c: 4,//结束列
  //     r: 0//结束范围
  //   }
  // }, {//合并第一行数据[F1,G1]
  //   s: {//s为开始
  //     c: 5,//开始列
  //     r: 0//开始取值范围
  //   },
  //   e: {//e结束
  //     c: 8,//结束列
  //     r: 0//结束范围
  //   }
  // }];
  // console.log(data)
  // console.log(JSON.stringify(data))
  wb.Sheets['Sheet1'] = data;
  // saveAs(new Blob([s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), "这里是下载的文件名" + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
  const wbout = XLSX.write(wb, {type: "binary", bookType: "xlsx"})
  XLSX_SAVE.saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "exampleExcel.xlsx");
}
export default {
  downloadExl
}