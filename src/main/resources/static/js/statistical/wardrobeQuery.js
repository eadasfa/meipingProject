$(document).ready(function () {
    var url = "/systemSetting/wardrobe/operate";
    var sourceUrl = "/systemSetting/getWardrobes";
    var grid2Rows = [];//jqxGrid2的数据
    var width =window.document.body.offsetWidth*0.805;
    var height = window.document.body.offsetHeight*0.75
    if(members.length==0)
        members = LoadAjax({},"/memberManage/getMembers",false)
    if(operaters.length==0)
        operaters = LoadAjax({},"/systemSetting/getOperaters",false)
    var columns1=[
        { text: '衣柜编号', datafield: 'id', width: 100 },
        { text: '衣柜名称', datafield: 'name', width: 100 },
        { text: '衣柜状态', datafield: 'status', width: 100 },
        { text: '会员卡号', datafield: 'memberId', width: 100 },
        { text: '会员姓名', datafield: 'memberName', width: 180 },
        { text: '到期时间', datafield: 'endTime', width: 180 }
    ];
    var columns2=[
        { text: '操作时间', datafield: 'operateTime', width: 100 },
        { text: '会员卡号', datafield: 'memberId', width: 80 },
        { text: '会员姓名', datafield: 'memberName', width: 100 },
        { text: '衣柜编号', datafield: 'wardrobeId', width: 80 },
        { text: '开始时间', datafield: 'startTime', width: 100 },
        { text: '到期时间', datafield: 'endTime', width: 100 },
        { text: '总金额', datafield: 'totalAmount', width: 80 },
        { text: '操作员编号', datafield: 'operaterId', width: 100 },
        { text: '操作员姓名', datafield: 'operaterName', width: 100 },
        { text: '备注', datafield: 'context', width: 180 }
    ];
    function initGrid() {
        var jqxGrid="jqxGrid"
        var source =
            {
                datatype: "json",
                datafields:
                    [
                        { name: 'id' },
                        { name: 'name' },
                        { name: 'status' },
                        { name: 'memberId' },
                        { name: 'memberName' },
                        { name: 'endTime' },
                    ],
                url: sourceUrl,
                async: false,
                addrow: function (rowid, rowdata, position, commit) {commit(true);},
                deleterow: function (rowid, commit) {commit(true);},
                updaterow: function (rowid, newdata, commit) {commit(true);}
            };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // initialize jqxGrid
        $("#"+jqxGrid).jqxGrid({
            // width: getWidth('jqxGrid'),
            height: window.document.body.offsetHeight*0.805,
            // autoheight: true,
            width:window.document.body.offsetWidth*0.805,
            pageable: true,//设置可分页
            pagesize: 12,//设置默认页数
            pagesizeoptions: ['12', '24', '36'],//设置分页数
            altrows: true,//行间底色区分
            columnsresize: true,//列可适应调整
            sortable: true,//设置可排序
            showsortcolumnbackground: false,
            clipboard: false,//屏蔽jqx的复制功能
            enablebrowserselection: true,//允许使用浏览器选择内容功能
            source: dataAdapter,
            showtoolbar: true,
            ready:function(){
                wardrobes = dataAdapter.recordids;
            },
            ready:function(){//将0，1，2 映射
                isWardrobe = true;
                var map = {'0':"空闲",'1':"已租",'2':"损坏"}
                var data = dataAdapter.recordids;
                for(var i=0;i<data.length;i++){
                    var commit = $("#jqxGrid").jqxGrid('updaterow', i, changeData(data[i]));
                }
                isWardrobe = false;
            },
            rendertoolbar: function (toolbar) {
                setToolBar();
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('<input id="rendwardrobe" type="button" value="出租/续费" />');
                container.append('<input id="returnwardrobe" style="margin-left: 10px;" type="button" value="退柜" />');
                container.append('<select style="margin-left: 15px;" id="searchkey"></select>');
                container.append('<input style="margin-left: 10px; width: 80px" id="searchvalue" list="none"/>' +
                    '<datalist id="inputlist"><option>空闲</option><option>已租</option><option>损坏</option></datalist>');
                container.append('<span><img style="margin-left:5px;" id = "search" alt="search" width="16" height="16" src="img/search.png" /></span>');
                $("#rendwardrobe").jqxButton();
                $("#returnwardrobe").jqxButton();
                for(var i=0;i<columns1.length;i++){
                    var temp = columns1[i];
                    $("#searchkey").append('<option value='+temp.datafield+'>'+temp.text+'</option>')
                }
                // update row.
                $("#rendwardrobe").on('click', function () {
                    Operate();
                });
                $("#returnwardrobe").on('click', function () {
                    Operate(RETURN_WARDROBE);
                });

                $("#search").on('click', function () {
                    var key = $("#searchkey").val();
                    var value = $("#searchvalue").val();
                    search(key,value);
                });
                $("#searchkey").change(function () {
                    if($(this).val()=="status")
                        $("#searchvalue").attr("list","inputlist");
                    else $("#searchvalue").attr("list","none");
                });
            },
            columns: columns1
        });
        $('#'+jqxGrid).on('rowdoubleclick', function (event) {
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            var data = $('#jqxGrid').jqxGrid('getrowdata', boundIndex);
            var id = $('#jqxGrid').jqxGrid('getrowid', boundIndex);
            var status = data.status;
            Operate();
        });
    }
    function initGrid2() {
        var jqxGrid = "jqxGrid2"
        var source =
            {
                datatype: "json",
                datafields:
                    [
                        { name: 'operateTime' },
                        { name: 'memberId' },
                        { name: 'memberName' },
                        { name: 'wardrobeId' },
                        { name: 'startTime' },
                        { name: 'endTime' },
                        { name: 'totalAmount'},
                        { name: 'operaterId' },
                        { name: 'operaterName' },
                        { name: 'context' }
                    ],
                url: "/systemSetting/getRendWardrobeLogs",
                async: false,
                addrow: function (rowid, rowdata, position, commit) {
                    commit(true);
                },
                deleterow: function (rowid, commit) {
                    commit(true);
                },
                updaterow: function (rowid, newdata, commit) {
                    commit(true);
                }
            };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // initialize jqxGrid
        $("#"+jqxGrid).jqxGrid({
            // width: getWidth('jqxGrid'),
            height: height,
            // autoheight: true,
            width:width,
            pageable: true,//设置可分页
            pagesize: 12,//设置默认页数
            pagesizeoptions: ['12', '24', '36'],//设置分页数
            altrows: true,//行间底色区分
            columnsresize: true,//列可适应调整
            sortable: true,//设置可排序
            showsortcolumnbackground: false,
            clipboard: false,//屏蔽jqx的复制功能
            enablebrowserselection: true,//允许使用浏览器选择内容功能
            source: dataAdapter,
            showtoolbar: true,
            ready:function(){
                // console.log(JSON.stringify(dataAdapter.recordids))
            },
            rendertoolbar: function (toolbar) {
                $('#'+jqxGrid).jqxGrid({ toolbarheight: 40});
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('开始时间<input type="text" id="from" placeholder="yyyy-MM-dd" style="width: 100px;">');
                container.append('结束时间<input type="text" id="to" placeholder="yyyy-MM-dd" style="width: 100px;">');
                container.append('会员卡号<input type="text" id="member-id" list="member-id-list" placeholder="会员卡号" style="width: 100px;">' +
                    '<datalist id="member-id-list"></datalist>');
                container.append('操作员编号<input type="text" id="operater-id" list="operater-id-list" placeholder="操作员编号" style="width: 100px;">' +
                    '<datalist id="operater-id-list"></datalist>');
                container.append('<span><img style="margin-left:5px;" id = "search2" alt="search" width="16" height="16" src="img/search.png" /></span>');
                layui.laydate.render({elem: '#from'}); //指定元素
                layui.laydate.render({elem: '#to'}); //指定元素
                //初始化搜索选择框
                for(var i=0;i<members.length;i++){
                    $("#member-id-list").append('<option>'+members[i].id+'</option>')
                }
                for(var i=0;i<operaters.length;i++){
                    $("#operater-id-list").append('<option>'+operaters[i].id+'</option>')
                }
                $("#search2").on('click', function () {
                    var from = $("#from").val();
                    var to = $("#to").val();
                    var memberId = $("#member-id").val();
                    var operaterId = $("#operater-id").val();
                    search2(from,to,memberId,operaterId);
                });
            },
            columns: columns2
        });
        $('#'+jqxGrid).jqxGrid('sortby', "operateTime", 'des');
    }
    var initWidgets = function (tab) {
        switch (tab) {
            case 0:
                initGrid();
                break;
            case 1:
                initGrid2();
                break;
        }
    }//width: getWidth('Tabs')
    $('#tabs').jqxTabs({
        width: width,
        height: height+100,
        initTabContent: initWidgets });
    //根据不同operateId弹出不同的窗口
    function Operate(operateId) {
        var data = getSelectRow();
        if(!data) {
            alert("请选中记录");return;
        }
        var popUpWindow = "popUpWindow";
        if(operateId==undefined){
            var status = data.rowdata.status;
            if(status=="损坏"){
                alert("当前衣柜已损坏");return;
            }
            else if(status=="空闲") operateId = REND_WARDROBE;
            else if(status=="已租") {
                popUpWindow = "popUpWindow2";
                operateId = REND_WARDROBE_MORE;
            }
        }
        else if(operateId==RETURN_WARDROBE){
            if(data.rowdata.status!="已租") return;
            var r = confirm("您将要退还该衣柜?");
            if(!r) return;
            return returnWardrobe(data);
        }
        var title = "租用衣柜";
        var ii = layer.open({
            async:false,
            title: title,
            content: $('.'+popUpWindow).html(),
            area: ['400', '300px'],//自定义文本域宽高,
            btn: ['确定', '取消'],
            yes: function(index){
                //操作成功的标志
                var flag=true;
                if(operateId==REND_WARDROBE)
                    flag = rendWardrobe(data);
                else if(operateId == REND_WARDROBE_MORE)
                    flag = rendWardrobeMore(data);
                //最后关闭弹出层
                if(flag)
                    layer.close(index);
            },
            btn2: function() {
                //按钮【取消】的回调
                return 0;
            },
            success: function(layero, index){
                //初始化页面
                initChildWindowBeforeOpen(operateId,data.rowdata);
            }
        });
    }
    function returnWardrobe(data) {

        var row = data.rowdata;
        row.operaterId = operater.id;
        row.startTime = formatTime(new Date());
        var days = DateMinus(row.startTime,row.endTime)
        // if(days<0) {
        //     alert("该衣柜已到期");return ;
        // }
        row.totalAmount = parseFloat(row.price)*days;
        row.context = "退柜";
        var result = LoadAjaxJson(row,RETURN_WARDROBE,url);
        if(result.success==false){

            alert("退还失败");return;
        }
        var member = getMember(row.memberId);
        member.wardrobeId = null;
        console.log(JSON.stringify(changeData(result.data[0])))
        var commit = $("#jqxGrid").jqxGrid('updaterow', data.id, changeData(result.data[0]));
        //更新jqxGrid2
        var commit = $("#jqxGrid2").jqxGrid('addrow', null, generateGrid2Row(row));

        return true;

    }
    function rendWardrobe(data) {

        var row = data.rowdata;
        var id = data.id;
        row.status = 1;//修改为已租
        row.memberId = $("#member-id").val();
        if(row.memberId==undefined||row.memberId.length==0){
            alert("请输入会员卡号");return;
        }
        var member = getMember(row.memberId);
        // console.log(member)
        if(member.wardrobeId!=0&&member.wardrobeId!=undefined&&member.wardrobeId!=null){
            alert("当前用户已经租用了衣柜");return;
        }
        row.context = "出租";
        row.startTime = $("#from").val();
        row.endTime = $("#to").val();
        row.operaterId = operater.id;
        row.totalAmount = $("#total-amount").val();
        row.status=1;
        var result = LoadAjaxJson(row,REND_WARDROBE,url);
        if(result.success==false){
            alert("租用失败:"+result.context);return false;
        }
        member.wardrobeId = row.id;
        // console.log(JSON.stringify(changeData(result.data[0])))
        var commit = $("#jqxGrid").jqxGrid('updaterow', data.id, changeData(result.data[0]));
        //更新jqxGrid2
        var commit = $("#jqxGrid2").jqxGrid('addrow', null, generateGrid2Row(row));

        return true;
    }
    function rendWardrobeMore(data) {

        var id = $("#rendWardrobe-wardrobe-id").val();
        var row = getWardrobe(id);
        row.startTime = addDate(row.endTime,1)
        row.endTime = $("#to2").val();
        row.totalAmount = $("#total-amount2").val();
        row.status=1;
        row.context = "续费";
        row.operaterId = operater.id;
        var result = LoadAjaxJson(row,REND_WARDROBE_MORE,url);
        if(result.success==false){

            alert("租用失败:"+result.context);return;
        }
        var commit = $("#jqxGrid").jqxGrid('updaterow', data.id, changeData(result.data[0]));
        var commit = $("#jqxGrid2").jqxGrid('addrow', null, generateGrid2Row(row));

        return true;
    }
    function initChildWindowBeforeOpen(operateId,row){
        if(operateId==REND_WARDROBE){
            //初始化弹出表单
            for(var i=0;i<members.length;i++){
                if(members[i].wardrobeId==undefined||members[i].wardrobeId==null||members[i].wardrobeId==0)
                    $("#member-id-list").append('<option>'+members[i].id+'</option>')
            }
            $("#wardrobe-id").val(row['id']);
            $("#wardrobe-name").val(row['name']);
            $("#wardrobe-price").val(row['price']);
            $("#total-amount").val(row['price']);
            var now= formatTime(new Date());
            $("#member-id").on("change",function () {
                var member = getMember($(this).val());
                if(member==null) return;
                $("#member-name").val(member.name);
                $("#card-type").val(member.cardTypeName);
            });
            $("#from,#to").on("change",function () {changeStartOrEnd();});
            $("#wardrobe-price").on("input",function () {
                $("#total-amount").val(
                    (DateMinus($("#from").val(),$("#to").val())+1)*parseInt($(this).val()));
            });
            layui.laydate.render({elem: '#from', value: now,
                done:function(value, date, endDate){changeStartOrEnd(value,"from")}
            }); //指定元素
            layui.laydate.render({
                elem: '#to',
                value: now,
                done: function (value, date, endDate) {changeStartOrEnd(value, "to")}
            });
        }
        if(operateId==REND_WARDROBE_MORE){
            $("#member-id2").val(row.memberId);
            $("#member-name2").val(row.memberName);
            var member = getMember(row.memberId);
            if(member!=null)
                $("#card-type2").val(member.cardTypeName);
            $("#end-time2").val(row.endTime);
            $("#wardrobe-id2").val(row.id);
            $("#wardrobe-name2").val(row.name);
            $("#total-amount2").val(row.price);
            layui.laydate.render({
                elem: '#to2',
                value: addDate(row.endTime,1),
                done: function (value, date, endDate) {changeStartOrEnd(value, null,row)}
            });
        }
    }
    function changeStartOrEnd(value,lable,row) {
        if(row==undefined){
            var to = $("#to").val();
            var from = $("#from").val();
            if(lable=="from") from =value;
            else if (lable=="to") to=value;
            if(!/^\d{4}-\d{2}-\d{2}$/.test(from)) return;
            if(!/^\d{4}-\d{2}-\d{2}$/.test(to)) return;
            $("#total-amount").val((DateMinus(from,to)+1)*parseInt($("#wardrobe-price").val()));
        }else{
            var from = $("#end-time2").val();
            var to = value;
            if(!/^\d{4}-\d{2}-\d{2}$/.test(to)) return;
            $("#total-amount2").val((DateMinus(from,to))*parseInt(row.price));
        }
    }
    function getMember(id) {
        for(var i=0;i<members.length;i++){
           if(members[i].id==id){
               return members[i];
           }
        }
        return null;
    }
    function search2(from,to,memberId,operaterId) {
        var row={};
        if(from==undefined||from==""){
            from ="1970-01-01";
        }
        if(to==undefined||to==""){
            var myDate = new Date();//获取系统当前时间
            var day = myDate.getDate();
            day = day<10?("0"+day):day;
            var month = myDate.getMonth()+1;
            month = month<10?("0"+month):month;
            to = myDate.getFullYear()+"-"+month+"-"+day;
            // console.log(to)
        }
        row['from'] = from;
        row['to'] = to
        if(memberId!=undefined&&memberId!=""){
            if(!isInteger(memberId)) {
                alert("商品编号需要整数");return
            }
            row['memberId'] = memberId;
        }
        if(operaterId!=undefined&&operaterId!=""){
            if(!isInteger(operaterId)) {
                alert("操作员编号需要整数");return
            }
            row['operaterId'] = operaterId;
        }
        console.log(row)
        var result = LoadAjaxJson(row,SEARCH_WARDROBE_LOG,url);
        // console.log(result.data)
        $('#jqxGrid2').jqxGrid('clear');
        //  传入json数组[{},{}]
        showNoSortByGrid(result.data,"jqxGrid2")
        var sortcolumn = $('#jqxGrid2').jqxGrid('getsortcolumn');
        // console.log(sortcolumn)
        if(sortcolumn==null)
            sortcolumn = 'operateTime';
        $('#jqxGrid2').jqxGrid('sortby', sortcolumn, 'des');
    }
    function getInputRow(){
        var numCells=[{'name':'id','type':1,'label':'衣柜编号'},
            {'name':'price','type':2,'label':'衣柜租金'}];
        return getInputRowCommon(columns1,numCells)
    }
    function search(key,value) {
        if(key=="status"&&(value!=null||value!=undefined||value!=""))
            value = value=="空闲"?0:(value=="已租"?1:2);
        if(key=="id"&&(value!=null&&value!=undefined&&value!="")&&
            !(/^[0-9]+$/.test(value))) {
            alert("会员编号无效！请重新输入")
            return false;
        }
        var row={};
        row['key'] = key;
        row['value'] = value;
        // console.log("row:"+row['key']+","+row['value'])
        var result = LoadAjaxJson(row,SEARCH,url);
        // console.log(result.data)
        $('#jqxGrid').jqxGrid('clear');
        //  传入json数组[{},{}]
        isWardrobe = true;
        show(result.data)
        isWardrobe = false;
    }
    function generateGrid2Row(data) {
        var row={};
        row.memberId = data.memberId;
        row.wardrobeId = data.id;
        row.memberName = data.memberName;
        row.startTime = data.startTime;
        row.endTime = data.endTime;
        row.totalAmount = data.totalAmount;
        row.operateId = operater.id;
        row.context = data.context;
        row.operateName = operater.name;
        row.operateTime = new Date()//.Format("yyyy-MM-dd HH:mm:ss");
        return row;
    }
});