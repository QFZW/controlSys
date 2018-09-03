<template>
    <div>
           <div id="demo" style="margin:5px;float:left"></div>
<form class="myForm" id="propertyForm">
<div class="form_title">属性设置</div>
<div class="form_content">
  <table>
    <tr><td class="th">Id：</td><td><input type="text" style="width:120px" id="ele_id"/></td></tr>
    <tr><td class="th">Name：</td><td><input type="text" style="width:120px" id="ele_name"/></td></tr>
    <tr><td class="th">Type：</td><td><input type="text" style="width:120px" id="ele_type"/></td></tr>
    <tr><td class="th">Model：</td><td><input type="text" style="width:120px" id="ele_model"/></td></tr>
    <tr><td class="th">Left-r：</td><td><input type="text" style="width:120px" id="ele_left"/></td></tr>
    <tr><td class="th">Top-r：</td><td><input type="text" style="width:120px" id="ele_top"/></td></tr>
    <tr><td class="th">Width：</td><td><input type="text" style="width:120px" id="ele_width"/></td></tr>
    <tr><td class="th">Height：</td><td><input type="text" style="width:120px" id="ele_height"/></td></tr>
    <tr><td class="th">From：</td><td><input type="text" style="width:120px" id="ele_from"/></td></tr>
    <tr><td class="th">To：</td><td><input type="text" style="width:120px" id="ele_to"/></td></tr>
  </table>
</div>
<div class="form_btn_div">
  <input type="reset" value="重置"/>
  <input type="button" value="确定" onclick="alert(demo.$focus)"/>
</div>
</form>
    </div> 
</template>

<script>
// import './static/css/defailt.css'
import './../../../../static/css/default.css'
import './../../../../static/css/GooFlow2.css'
import './../../../../static/js/child.js'
import './../../../../static/js/GooFunc.js'
import './../../../../static/js/GooFlow.js'

export default {
    name:'',
    data(){
        return{

        }
    },
    created(){
        var property={
	width:1200,
	height:600,
	toolBtns:["start round","end round","task round","node","chat","state","plug","join","fork","complex mix"],
	haveHead:true,
	headBtns:["new","open","save","undo","redo","reload"],//如果haveHead=true，则定义HEAD区的按钮
	haveTool:true,
	haveGroup:true,
	useOperStack:true
};
var remark={
	cursor:"选择指针",
	direct:"结点连线",
	start:"入口结点",
	"end":"结束结点",
	"task":"任务结点",
	node:"自动结点",
	chat:"决策结点",
	state:"状态结点",
	plug:"附加插件",
	fork:"分支结点",
	"join":"联合结点",
	"complex mix":"复合结点",
	group:"组织划分框编辑开关"
};
var demo;


var jsondata = {
	"title": "10086网状流程",
	"nodes": {
		"demo_node_9": {
			"name": "桂中区",
			"left": 10,
			"top": 10,
			"type": "start round",
			"width": 24,
			"height": 24,
			"alt": true
		},
		//alt表示在编辑模式下是否被用户变更过,默认都是undefined未变更//exportAlter
		"demo_node_10": {
			"name": "桂北区",
			"left": 10,
			"top": 81,
			"type": "start round",
			"width": 24,
			"height": 24,
			"alt": true
		},
		"demo_node_11": {
			"name": "桂西区",
			"left": 9,
			"top": 143,
			"type": "start round",
			"width": 24,
			"height": 24,
			"alt": true
		},
		"demo_node_12": {
			"name": "桂北区",
			"left": 11,
			"top": 290,
			"type": "start round",
			"width": 24,
			"height": 24,
			"alt": true
		},
		"demo_node_14": {
			"name": "桂东区",
			"left": 7,
			"top": 339,
			"type": "start round",
			"width": 24,
			"height": 24,
			"alt": true
		},
		"demo_node_2": {
			"name": "问候语2",
			"left": 232,
			"top": 104,
			"type": "chat",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_3": {
			"name": "问候语3",
			"left": 220,
			"top": 260,
			"type": "chat",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_4": {
			"name": "问候语4",
			"left": 222,
			"top": 327,
			"type": "chat",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_5": {
			"name": "停机判断",
			"left": 107,
			"top": 47,
			"type": "fork",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_13": {
			"name": "停机判断2",
			"left": 103,
			"top": 289,
			"type": "fork",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_20": {
			"name": "停机菜单",
			"left": 355,
			"top": 12,
			"type": "join",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_21": {
			"name": "正常菜单",
			"left": 368,
			"top": 362,
			"type": "join",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_27": {
			"name": "延时停机",
			"left": 492,
			"top": 13,
			"type": "node",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_28": {
			"name": "开机",
			"left": 491,
			"top": 62,
			"type": "node",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_29": {
			"name": "缴费",
			"left": 466,
			"top": 162,
			"type": "node",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_30": {
			"name": "历史话费查询",
			"left": 591,
			"top": 116,
			"type": "node",
			"width": 111,
			"height": 24,
			"alt": true
		},
		"demo_node_1": {
			"name": "问候语1",
			"left": 228,
			"top": 42,
			"type": "chat",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_38": {
			"name": "积分查询",
			"left": 506,
			"top": 261,
			"type": "recombination",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_39": {
			"name": "剩余资源查询",
			"left": 499,
			"top": 312,
			"type": "recombination",
			"width": 107,
			"height": 24,
			"alt": true
		},
		"demo_node_40": {
			"name": "常用业务办理",
			"left": 491,
			"top": 356,
			"type": "recombination",
			"width": 110,
			"height": 24,
			"alt": true
		},
		"demo_node_42": {
			"name": "网络服务",
			"left": 492,
			"top": 397,
			"type": "recombination",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_43": {
			"name": "转人工服务",
			"left": 479,
			"top": 457,
			"type": "state",
			"width": 91,
			"height": 24,
			"alt": true
		},
		"demo_node_44": {
			"name": "话费查询",
			"left": 477,
			"top": 213,
			"type": "state",
			"width": 86,
			"height": 24,
			"alt": true
		},
		"demo_node_52": {
			"name": "实时话费查询",
			"left": 609,
			"top": 212,
			"type": "node",
			"width": 107,
			"height": 24,
			"alt": true
		},
		"demo_node_54": {
			"name": "网络专区投诉",
			"left": 639,
			"top": 399,
			"type": "task",
			"width": 106,
			"height": 24,
			"alt": true
		},
		"demo_node_55": {
			"name": "普通转人工",
			"left": 641,
			"top": 456,
			"type": "task",
			"width": 109,
			"height": 24,
			"alt": true
		},
		"demo_node_59": {
			"name": "10088",
			"left": 500,
			"top": 514,
			"type": "task",
			"width": 86,
			"height": 24,
			"alt": true
		}
	},
	"lines": {
		"demo_line_6": {
			"type": "lr",
			"M": 81.5,
			"from": "demo_node_9",
			"to": "demo_node_5",
			"name": ""
		},
		"demo_line_7": {
			"type": "lr",
			"M": 81.5,
			"from": "demo_node_10",
			"to": "demo_node_5",
			"name": ""
		},
		"demo_line_9": {
			"type": "lr",
			"M": 81.5,
			"from": "demo_node_11",
			"to": "demo_node_5",
			"name": ""
		},
		"demo_line_14": {
			"type": "sl",
			"from": "demo_node_12",
			"to": "demo_node_13",
			"name": ""
		},
		"demo_line_15": {
			"type": "lr",
			"M": 78.5,
			"from": "demo_node_14",
			"to": "demo_node_13",
			"name": ""
		},
		"demo_line_17": {
			"type": "tb",
			"M": 152,
			"from": "demo_node_5",
			"to": "demo_node_2",
			"name": "F"
		},
		"demo_line_18": {
			"type": "tb",
			"M": 239,
			"from": "demo_node_13",
			"to": "demo_node_3",
			"name": "T"
		},
		"demo_line_19": {
			"type": "tb",
			"M": 383.5,
			"from": "demo_node_13",
			"to": "demo_node_4",
			"name": "F"
		},
		"demo_line_22": {
			"type": "lr",
			"M": 339,
			"from": "demo_node_4",
			"to": "demo_node_21",
			"name": ""
		},
		"demo_line_23": {
			"type": "lr",
			"M": 337.5,
			"from": "demo_node_2",
			"to": "demo_node_21",
			"name": ""
		},
		"demo_line_26": {
			"type": "lr",
			"M": 366.5,
			"from": "demo_node_3",
			"to": "demo_node_20",
			"name": ""
		},
		"demo_line_31": {
			"type": "tb",
			"M": 176.5,
			"from": "demo_node_20",
			"to": "demo_node_29",
			"name": "4"
		},
		"demo_line_32": {
			"type": "tb",
			"M": 25.5,
			"from": "demo_node_20",
			"to": "demo_node_27",
			"name": "1"
		},
		"demo_line_33": {
			"type": "tb",
			"M": 128,
			"from": "demo_node_20",
			"to": "demo_node_30",
			"name": "3"
		},
		"demo_line_34": {
			"type": "tb",
			"M": 74.5,
			"from": "demo_node_20",
			"to": "demo_node_28",
			"name": "2"
		},
		"demo_line_36": {
			"type": "tb",
			"M": 21.5,
			"from": "demo_node_5",
			"to": "demo_node_1",
			"name": "T"
		},
		"demo_line_37": {
			"type": "lr",
			"M": 367,
			"from": "demo_node_1",
			"to": "demo_node_20",
			"name": ""
		},
		"demo_line_45": {
			"type": "tb",
			"M": 225,
			"from": "demo_node_21",
			"to": "demo_node_44",
			"name": "1"
		},
		"demo_line_46": {
			"type": "tb",
			"M": 274.5,
			"from": "demo_node_21",
			"to": "demo_node_38",
			"name": "2"
		},
		"demo_line_47": {
			"type": "tb",
			"M": 325.5,
			"from": "demo_node_21",
			"to": "demo_node_39",
			"name": "3"
		},
		"demo_line_48": {
			"type": "sl",
			"from": "demo_node_21",
			"to": "demo_node_40",
			"name": "4"
		},
		"demo_line_49": {
			"type": "tb",
			"M": 411.5,
			"from": "demo_node_21",
			"to": "demo_node_42",
			"name": "5"
		},
		"demo_line_50": {
			"type": "tb",
			"M": 470.5,
			"from": "demo_node_21",
			"to": "demo_node_43",
			"name": "0"
		},
		"demo_line_51": {
			"type": "sl",
			"from": "demo_node_44",
			"to": "demo_node_30",
			"name": "2"
		},
		"demo_line_53": {
			"type": "sl",
			"from": "demo_node_44",
			"to": "demo_node_52",
			"name": "1"
		},
		"demo_line_56": {
			"type": "sl",
			"from": "demo_node_43",
			"to": "demo_node_55",
			"name": "0"
		},
		"demo_line_57": {
			"type": "sl",
			"from": "demo_node_43",
			"to": "demo_node_54",
			"name": "1"
		},
		"demo_line_58": {
			"type": "sl",
			"from": "demo_node_42",
			"to": "demo_node_54",
			"name": "0"
		},
		"demo_line_60": {
			"type": "sl",
			"from": "demo_node_43",
			"to": "demo_node_59",
			"name": "2",
			"alt": true
		}
	},
	"areas": {
		"goolflow_area_61": {
			"alt": true,
			"color": "yellow",
			"height": 553,
			"left": 0,
			"name": "area_61",
			"top": 0,
			"width": 788
		}
	},
	"initNum": 61
};
$(document).ready(function(){
	demo=$.createGooFlow($("#demo"),property);
	demo.setNodeRemarks(remark);
	demo.onItemDel=function(id,type){
		if(confirm("确定要删除该单元吗?")){
      this.blurItem();
      return true;
		}else{
      return false;
		}
	}
	demo.loadData(jsondata);
	demo.onItemFocus=function(id,model){
      var obj;
      $("#ele_model").val(model);
      $("#ele_id").val(id);
      if(model=="line"){
        obj=this.$lineData[id];
        $("#ele_type").val(obj.M);
        $("#ele_left").val("");
        $("#ele_top").val("");
        $("#ele_width").val("");
        $("#ele_height").val("");
        $("#ele_from").val(obj.from);
        $("#ele_to").val(obj.to);
      }else if(model=="node"){
        obj=this.$nodeData[id];
        $("#ele_type").val(obj.type);
        $("#ele_left").val(obj.left);
        $("#ele_top").val(obj.top);
        $("#ele_width").val(obj.width);
        $("#ele_height").val(obj.height);
        $("#ele_from").val("");
        $("#ele_to").val("");
      }
      $("#ele_name").val(obj.name);
      return true;
	};
	demo.onItemBlur=function(id,model){
    document.getElementById("propertyForm").reset();
    return true;
	};
});
var out;
function Export(){
    document.getElementById("result").value=JSON.stringify(demo.exportData());
}
    }
}

</script>

<style scoped>
.myForm{display:block;margin:0px;padding:0px;line-height:1.5;border:#ccc 1px solid;font: 12px Arial, Helvetica, sans-serif;margin:5px 5px 0px 0px;border-radius:4px;}
.myForm .form_title{background:#428bca;padding:4px;color:#fff;border-radius:3px 3px 0px 0px;}
.myForm .form_content{padding:4px;background:#fff;}
.myForm .form_content table{border:0px}
.myForm .form_content table td{border:0px}
.myForm .form_content table .th{text-align:right;font-weight:bold}
.myForm .form_btn_div{text-align:center;border-top:#ccc 1px solid;background:#f5f5f5;padding:4px;border-radius:0px 0px 3px 3px;} 
#propertyForm{float:right;width:260px}
</style>
