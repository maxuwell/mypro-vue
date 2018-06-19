import ExportJsonExcel from 'js-export-excel'
import XLSX from 'xlsx'
import outputxlsx from './outputxlsx.js'
import qs from 'querystring'
export const outputProjectInfo = {
  data() {
    return {
      memberHeaderList:[
        {
          'key': 'project_number',
          'name': '项目编号'
        },{
          'key': 'project_name',
          'name': '项目名称'
        },{
          'key': 'project_manager',
          'name': '项目经理'
        },{
          'key': 'pmo',
          'name': 'PMO'
        },{
          'key': 'dept_name',
          'name': '业务室'
        },{
          'key': 'region_charge',
          'name': '区域经理'
        },{
          'key': 'project_schedule',
          'name': '项目周期'
        },{
          'key': 'name',
          'name': '姓名'
        },{
          'key': 'work_role',
          'name': '角色'
        },{
          'key': 'position_in',
          'name': '模块'
        },{
          'key': 'position_lvl',
          'name': '等级'
        },{
          'key': 'actual_price',
          'name': '牌价'
        },{
          'key': 'property',
          'name': '用工性质'
        },{
          'key': 'company',
          'name': '所属公司'
        },{
          'key': 'plain_in_out_time',
          'name': '计划进出场日期'
        },{
          'key': 'actual_in_out_time',
          'name': '实际进出场日期'
        }
      ],
      costFirstList:[
        {
          key: 'project_number',
          name: '项目编号'
        },{
          key: 'project_name',
          name: '项目名称'
        },{
          key: 'project_manager',
          name: '项目经理'
        },{
          key: 'pmo',
          name: 'PMO'
        },{
          key: 'dept_name',
          name: '业务室'
        },{
          key: 'region_charge',
          name: '区域经理'
        },{
          key: 'project_schedule',
          name: '项目周期'
        },{
          key: 'expect_contract_amount',
          name: '预计合同签订金额'
        },{
          key: 'expect_invoice_amount',
          name: '预计本年开票金额'
        }
      ],
      costHeaderList:[
        {
          key: 'project_number',
          name: '项目编号'
        },{
          key: 'project_name',
          name: '项目名称'
        },{
          key: 'project_manager',
          name: '项目经理'
        },{
          key: 'pmo',
          name: 'PMO'
        },{
          key: 'dept_name',
          name: '业务室'
        },{
          key: 'region_charge',
          name: '区域经理'
        },{
          key: 'project_schedule',
          name: '项目周期'
        },{
          key: 'expect_contract_amount',
          name: '预计合同签订金额'
        },{
          key: 'expect_invoice_amount',
          name: '预计本年开票金额'
        },{
          key: 'expect_labor_inside_fee',
          name: '内部人工成本'
        },{
          key: 'expect_labor_outsource_fee',
          name: '项目人力外包费'
        },{
          key: 'expect_labor_consultant_fee',
          name: '外聘顾问费'
        },{
          key: 'expect_business_subcontract_fee',
          name: '项目业务分包费'
        },{
          key: 'expect_visiting_fee',
          name: '探亲费'
        },{
          key: 'expect_travle_fee',
          name: '差旅费'
        },{
          key: 'expect_other_fee',
          name: '项目其他费用'
        },{
          key: 'expect_attendance_award',
          name: '项目出勤奖'
        },{
          key: 'expect_comprehensive_cost',
          name: '综合费用'
        },{
          key: 'expect_meeting_fee',
          name: '会务费'
        },{
          key: 'expect_test_fee',
          name: '测试费'
        },{
          key: 'expect_project_check_fee',
          name: '项目验收费'
        },{
          key: 'expect_product_cost',
          name: '产品成本'
        },{
          key: 'expect_pre_transfer_money',
          name: '结转成本'
        },{
          key: 'labor_inside_fee',
          name: '内部人工成本'
        },{
          key: 'labor_outsource_fee2',
          name: '项目人力外包费'
        },{
          key: 'labor_consultant_fee',
          name: '外聘顾问费'
        },{
          key: 'business_subcontract_fee',
          name: '项目业务分包费'
        },{
          key: 'visiting_fee',
          name: '探亲费'
        },{
          key: 'travle_fee',
          name: '差旅费'
        },{
          key: 'attendance_award2',
          name: '项目出勤奖'
        },{
          key: 'other_fee',
          name: '项目其他费用'
        },{
          key: 'comprehensive_cost',
          name: '综合费用'
        },{
          key: 'meeting_fee',
          name: '会务费'
        },{
          key: 'test_fee',
          name: '测试费'
        },{
          key: 'project_check_fee',
          name: '项目验收费'
        },{
          key: 'product_cost',
          name: '产品成本'
        },{
          key: 'pre_transfer_money',
          name: '结转成本'
        }
      ]
    }
  },
  computed:{

  },
  methods:{
    outputProjectMember(){
      var params = {};
      for (var key in this.dic) {
        let val = this.dic[key];
        if (val) {
          params[key] = val;
        }
      }
      this.outLoading = true
      this.$http.post(this.$api.getMemberByProject(), qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(res => {
        this.outLoading = false
        if (res.data.success === 'true') {
          this.memberToExcal(res.data.data)
        }
      }).catch(err => {
        this.outLoading = false
        this.$Notice.error({
          title: '获取项目成员数据失败',
          desc: err
        });
      });
    },
    outputProjectCost(){
      var params = {};
      for (var key in this.dic) {
        let val = this.dic[key];
        if (val) {
          params[key] = val;
        }
      }
      this.outLoading = true
      this.$http.post(this.$api.getCostByProject(), qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }).then(res => {
        this.outLoading = false
        if (res.data.success === 'true') {
          this.costToExcal(res.data.data)
        }
      }).catch(err => {
        this.outLoading = false
        this.$Notice.error({
          title: '获取项目成本数据失败',
          desc: err
        });
      });
    },
    memberToExcal(memberData){
      let dic = []
      
      let defData = memberData.map(unit => {
        // let keys = _.keys(this.content)
        let dic = {}
        this.memberHeaderList.map((e, i) => {
          let name = e.name
          let value = unit[e.key] ? unit[e.key] : ''
          let d = ''
          // if (name === '申请天数') {
          //   value = Number(value)
          //   d = `{"${name}":${value}}`
          // } else {
            d = `{"${name}":"${value?value:''}"}`
          // }
          dic = Object.assign(dic, JSON.parse(d))
        })
        return dic
      })
      dic = defData
      
      var option = {};
      // let sheetName
      // if (this.selectMonth.length !== 7) {
      //   sheetName = this.$moment(this.selectMonth).format('YYYY-MM')
      // }else{
      //   sheetName = this.selectMonth
      // }

      option.fileName = '项目成员报表'
      option.datas = [{
        sheetData: dic,
        // sheetName: sheetName,
        sheetHeader: Object.keys(dic[0])
      }];
      var toExcel = new ExportJsonExcel(option);
      toExcel.saveExcel();
    },
    costToExcal(costData){
      // let keys = _.keys(this.headerKey)
      var headerData = [
        {
          'project_number':'项目编号',
          'project_name': '项目名称',
          'project_manager':'项目经理',
          'pmo': 'PMO',
          'dept_name':'业务室',
          'region_charge': '区域经理',
          'project_schedule': '项目周期',
          'expect_contract_amount':'预计合同签订金额',
          'expect_invoice_amount': '预计本年开票金额',
          'expect_labor_inside_fee': '内部人工成本',
          'expect_labor_outsource_fee': '项目人力外包费',
          'expect_labor_consultant_fee': '外聘顾问费',
          'expect_business_subcontract_fee': '项目业务分包费',
          'expect_visiting_fee': '探亲费',
          'expect_travle_fee': '差旅费',
          'expect_other_fee': '项目出勤奖',
          'expect_attendance_award': '项目其他费用',
          'expect_comprehensive_cost': '综合费用',
          'expect_meeting_fee': '会务费',
          'expect_test_fee': '测试费',
          'expect_project_check_fee': '项目验收费',
          'expect_product_cost': '产品成本',
          'expect_pre_transfer_money': '结转成本',
          'labor_inside_fee': '内部人工成本',
          'labor_outsource_fee2': '项目人力外包费',
          'labor_consultant_fee': '外聘顾问费',
          'business_subcontract_fee':'项目业务分包费',
          'visiting_fee':'探亲费',
          'travle_fee':'差旅费', 
          'attendance_award2':'项目出勤奖',
          'other_fee':'项目其他费用',
          'comprehensive_cost':'综合费用',
          'meeting_fee':'会务费',
          'test_fee':'测试费',
          'project_check_fee':'项目验收费',
          'product_cost':'产品成本',
          'pre_transfer_money':'结转成本'
        }
      ]
      let info = costData.map((e,index) =>{
        let dic = {}
        this.costHeaderList.map((b, i) =>{
          let d = ''
          // if(b === 'num'){
          //   d = `{"${b}":${Number(index+1)}}`
          // }else if(b.split('_')[1]>='0'&&b.split('_')[1]<='9'){
          //   let name = b.split('_')[0]
          //   let value = b.split('_')[1]
          //   d = `{"${b}":${+e[name+'ScoreMap'][""+this.scoreDetails.scoreItems[value-1].value]}}`
          // }else{
            d = `{"${b.key}":"${e[b.key]?e[b.key]:''}"}`
          // }
          dic = Object.assign(dic, JSON.parse(d))
        })
        return dic
      })
      var data = [...headerData,...info]
      console.log(data)
      // let mergeLength = this.scoreDetails.scoreItems.length +5

      data = XLSX.utils.json_to_sheet(data);
      // let title = this.$moment(this.date).format('YYYY-MM') + '月度考核表（'+this.headerDetail[0].name+'）'
      // data["A1"] = { t: "s", v: title };//2018-XX月度考核表（区域经理考核）
      // data['A1'].s = {fill: { bgColor: { rgb: "FF0000"  }}}
      this.costFirstList.map((e,i) =>{
        data[String.fromCharCode("A".charCodeAt(0) + i) + "1"] = { t: "s", v: e.name };
      })		
      data["J1"] = { t: "s", v: "预算成本" };
      data["X1"] = { t: "s", v: "实际成本" };
      let arr = []
      for(let i = 0; i < 9; i++){
        arr.push({
          s: {//s为开始
            c: i,//开始列
            r: 0//开始取值范围
          },
          e: {//e结束
            c: i,  //结束列 9+14+14
            r: 1//结束范围
          }
        })
      }
      arr.push({//预算成本
        s: {
          c: 9,
          r: 0
        },
        e: {
          c: 22,//9+14-1
          r: 0
        }
      })
      arr.push({//实际成本
        s: {
          c: 23,
          r: 0
        },
        e: {
          c: 36,
          r: 0
        }
      })
      data["!merges"] = arr
      console.log(data)
      outputxlsx.downloadExl(data)
    },
  }
}