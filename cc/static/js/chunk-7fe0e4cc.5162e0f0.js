(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fe0e4cc"],{"01da":function(e,t,a){e.exports={menuText:"#bfcbd9",menuActiveText:"#4b77be",subMenuActiveText:"#f4f4f5",menuBg:"#304156",menuHover:"#e4efff",subMenuBg:"#c7ddfd",subMenuHover:"#e4efff",sideBarWidth:"190px",borderColor:"#ddd"}},"1bf3":function(e,t,a){"use strict";var l=a("5811"),o=a.n(l);o.a},"2f15":function(e,t,a){"use strict";var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"promptOperate-box"},[a("el-dialog",{attrs:{title:"提示",visible:e.dialogOperate},on:{"update:visible":function(t){e.dialogOperate=t}}},[a("div",{staticClass:"content-box"},[a("div",{staticClass:"cancel-box",on:{click:e.closeOperate}},[a("i",{staticClass:"el-dialog__close el-icon el-icon-close"})]),a("div",{staticClass:"message-box"},[a("div",{staticClass:"message"},[e._v(e._s(e.message))])])]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.determine}},[e._v("确 定")]),a("el-button",{attrs:{type:"primary"},on:{click:e.closeOperate}},[e._v("取 消")])],1)])],1)},o=[],s={props:["dialogOperate","operateType","message"],methods:{closeOperate:function(){var e=!1;this.$emit("closeOperate",e)},determine:function(){var e={flag:!1,type:this.operateType};this.$emit("determine",e)}}},i=s,n=(a("1bf3"),a("2877")),c=Object(n["a"])(i,l,o,!1,null,null,null);t["a"]=c.exports},4605:function(e,t,a){},5811:function(e,t,a){},"88df":function(e,t,a){"use strict";var l=a("01da"),o=a.n(l);o.a},"9c9f":function(e,t,a){"use strict";var l=a("4605"),o=a.n(l);o.a},b6b1:function(e,t,a){},f5e4:function(e,t,a){"use strict";var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"choosePeople-box dialog-box button-box"},[a("el-dialog",{attrs:{title:"选择人员",visible:e.dialogCharge,"before-close":e.closeChoosePeople}},[a("div",{staticClass:"content-box"},[a("div",{staticClass:"content_box"},[a("div",{staticClass:"content-left"},[a("div",{staticClass:"select_box"},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.getType},model:{value:e.typeSelectValue,callback:function(t){e.typeSelectValue=t},expression:"typeSelectValue"}},e._l(e.selectData,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),a("div",{staticClass:"select-content-box"},[1==e.typeSelectValue?a("div",{staticClass:"organization-box"},[a("layer-tree",{attrs:{treedata:e.organizationData,labelname:"orgName",childrenname:"roleItems"},on:{nodeClick:e.nodeClick}})],1):e._e(),2==e.typeSelectValue?a("div",{staticClass:"role-box"},[a("layer-tree",{attrs:{treedata:e.roleData,labelname:"roleName",childrenname:"roleItems"},on:{nodeClick:e.getRoleNode}})],1):e._e(),3==e.typeSelectValue?a("div",{staticClass:"people-box"},[a("div",{staticClass:"peoele-title"},[e._v("按人员排序")]),a("ul",e._l(e.pinData,(function(t,l){return a("li",{key:l,staticClass:"item-li"},[e._v(" "+e._s(t)+" ")])})),0)]):e._e()])]),a("div",{staticClass:"content-right"},[a("div",{staticClass:"content-right-top"},[a("div",{staticClass:"search-box"},[a("el-input",{attrs:{placeholder:"请输入内容","prefix-icon":"el-icon-search"},model:{value:e.searchWords,callback:function(t){e.searchWords=t},expression:"searchWords"}}),a("el-button",{staticClass:"search-button",attrs:{type:"primary"},on:{click:e.searchPeople}},[e._v(" 查询 ")])],1),a("div",{staticClass:"selected-person-box"},[a("div",{staticClass:"selected-button"},[a("el-button",{attrs:{type:"primary"},on:{click:e.changeShowBox}},[e._v(" 已选人员 "),a("i",{class:1==e.showSelectBox?"el-icon-arrow-up":"el-icon-arrow-down"})])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showSelectBox,expression:"showSelectBox"}],staticClass:"selected-person"},[0!=e.selectedData.length?a("ul",e._l(e.selectedData,(function(t,l){return a("li",{key:l,staticClass:"selected-item"},[e._v(" "+e._s(t.nickName)+" ")])})),0):e._e()])])]),a("div",{staticClass:"table-box"},["single"==e.selectType?a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.personList,stripe:!0,"tooltip-effect":"dark",height:"400","highlight-current-row":!0},on:{"row-click":e.clickRow}},[a("el-table-column",{attrs:{prop:"loginAccount",label:"账号"}}),a("el-table-column",{attrs:{prop:"nickName",label:"姓名"}}),a("el-table-column",{attrs:{prop:"orgName",label:"部门"}}),a("el-table-column",{attrs:{prop:"mobile",label:"联系方式"}})],1):e._e(),"multiple"==e.selectType?a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.personList,stripe:!0,"tooltip-effect":"dark",height:"400","highlight-current-row":!0},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"50"}}),a("el-table-column",{attrs:{prop:"loginAccount",label:"账号"}}),a("el-table-column",{attrs:{prop:"nickName",label:"姓名"}}),a("el-table-column",{attrs:{prop:"orgName",label:"部门"}}),a("el-table-column",{attrs:{prop:"mobile",label:"联系方式"}})],1):e._e()],1),0!=e.personList.length?a("div",{staticClass:"page-box"},[a("page",{attrs:{"page-data":[30,40,50,100],total:e.persontotalCount},on:{changePageSize:e.changePageSize,changeCurrentPage:e.changeCurrentPage}})],1):e._e()])])]),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.closeChoosePeople}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.determine}},[e._v("确 定")])],1)])],1)},o=[],s=a("5530"),i=a("7a3b"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tree-box"},[e.title?a("div",{staticClass:"tree-title"},[e._v(e._s(e.title))]):e._e(),a("el-tree",{ref:"tree",attrs:{data:e.treedata,"show-checkbox":e.showcheckbox,"node-key":e.keyname,props:e.defaultProps,"highlight-current":"","expand-on-click-node":e.expandClickStatus,"check-on-click-node":e.checkClickStatus},on:{"node-click":e.nodeClick},scopedSlots:e._u([{key:"default",fn:function(t){var l=t.data;return a("span",{class:l.disabled?"not-active":"ke-active"},[l.icon&&l.icon.startsWith("icon-")?a("span",{class:["iconfont","icon-box",l.icon]}):l.icon?a("img",{attrs:{src:"data.icon"}}):e._e(),a("span",[e._v(e._s(l[e.labelname]))])])}}])})],1)},c=[],r=(a("b6b1"),{props:{treedata:{type:Array,default:function(){}},title:{type:String,default:""},keyname:{type:String,default:"type"},labelname:{type:String,default:"label"},childrenname:{type:String,default:"children"},showcheckbox:{type:Boolean,default:!1}},data:function(){return{expandClickStatus:!1,checkClickStatus:!0,defaultProps:{children:this.childrenname,label:this.labelname}}},methods:{getCheckedList:function(){return this.$refs.tree.getCheckedKeys()},nodeClick:function(e,t,a){this.$emit("nodeClick",{nodeData:e,node:t,comp:a})}}}),d=r,p=(a("88df"),a("2877")),u=Object(p["a"])(d,n,c,!1,null,null,null),h=u.exports,g=a("2f62"),b=Object(g["a"])("xunjianPublic"),f=b.mapState,m=b.mapActions,v={name:"ChoosePeople",props:["dialogCharge","selectType"],components:{Page:i["a"],LayerTree:h},data:function(){return{searchWords:"",personInfo:"",typeSelectValue:1,selectData:[{value:1,label:"按组织选择"},{value:2,label:"按角色选择"},{value:3,label:"按人员选择"}],total:100,selectedData:[],multipleSelection:[],orgData:[],defaultOrgProps:{children:"items",label:"orgName"},showSelectBox:!1,currentPage:1,pageSize:30,dialogShow:!1,typeId:0}},computed:Object(s["a"])({},f(["personList","organizationData","pinData","roleData","persontotalCount","loading"])),methods:Object(s["a"])(Object(s["a"])({},m(["getPeopleList","getOrganizationData"])),{},{closeChoosePeople:function(){var e={dialogCharge:!1};this.$emit("closeChoosePeople",e)},clickRow:function(e){this.selectedData=[],this.selectedData.push(e)},handleSelectionChange:function(e){this.multipleSelection=e,this.selectedData=this.multipleSelection},determine:function(){if(0!=this.selectedData.length){var e={type:this.selectType,personinfo:this.selectedData,dialogCharge:!1};this.$emit("checkedPerson",e)}else alert("请选择负责人！")},changePageSize:function(e){console.log(e)},changeCurrentPage:function(e){console.log(e)},handleNodeClick:function(e){console.log(e)},changeShowBox:function(){this.showSelectBox=!this.showSelectBox},getType:function(e){this.typeSelectValue=e},nodeClick:function(e){console.log(e.nodeData),this.typeId=e.nodeData.id;var t={SelectType:this.typeSelectValue,TypeId:e.nodeData.id,PageIndex:this.currentPage,MaxResultCount:this.pageSize,IsContainSublevel:!1};this.getPeopleList(t)},getRoleNode:function(e){if(e.nodeData.disabled)this.typeId=0;else{this.typeId=e.nodeData.id;var t={SelectType:this.typeSelectValue,TypeId:e.nodeData.roleId,PageIndex:this.currentPage,MaxResultCount:this.pageSize,IsContainSublevel:!1};this.getPeopleList(t)}},searchPeople:function(){if(""!=this.searchWords){var e={SelectType:this.typeSelectValue,TypeId:this.typeId,PageIndex:this.currentPage,MaxResultCount:this.pageSize,IsContainSublevel:!1};this.getPeopleList(e)}else alert("请输入选择关键字")}})},C=v,y=(a("9c9f"),Object(p["a"])(C,l,o,!1,null,"43d25406",null));t["a"]=y.exports}}]);
//# sourceMappingURL=chunk-7fe0e4cc.5162e0f0.js.map