$(document).ready(function () {
    var url = "/memberManage/member/operate";
    var sourceUrl = "/memberManage/getMembers";

    var columns=[
        { text: '会员卡号', datafield: 'id', width: 50 },
        { text: '会员姓名', datafield: 'name', width: 80 },
        { text: '会员类型', datafield: 'cardTypeName', width: 80 },
        { text: '会员状态', datafield: 'status', width: 80 },
        { text: '会员性别', datafield: 'agenda', width: 80 },
        { text: '加入时间', datafield: 'registerDate', width: 100 },
        { text: '开卡日期', datafield: 'startDate', width: 100 },
        { text: '到期日期', datafield: 'endDate', width: 100 },
        { text: '有效次数', datafield: 'youxiaoCishu', width: 80 },
        { text: '有效天数', datafield: 'youxiaoTianshu', width: 80 },
        { text: '消费总额', datafield: 'totalConsumption', width: 50 },
        { text: '卡内余额', datafield: 'balance', width: 50 },
        { text: '会员积分', datafield: 'credit', width: 50 },
        { text: '会员生日', datafield: 'birthday', width: 100 },
        { text: '会员电话', datafield: 'teleNumber', width: 80 },
        { text: '教练名称', datafield: 'trainerName', width: 80 },
        { text: '衣柜编号', datafield: 'wardrobeId', width: 80 }
    ];
    if(cardTypes.length==0)
        cardTypes = LoadAjax({},"/systemSetting/getCards",false);
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id' },
                    { name: 'name' },
                    { name: 'cardTypeName' },
                    { name: 'status' },
                    { name: 'agenda' },
                    { name: 'registerDate' },
                    { name: 'startDate' },
                    { name: 'endDate' },
                    { name: 'youxiaoCishu' },
                    { name: 'youxiaoTianshu' },
                    { name: 'totalConsumption' },
                    { name: 'balance' },
                    { name: 'credit' },
                    { name: 'birthday' },
                    { name: 'teleNumber' },
                    { name: 'trainerName' },
                    { name: 'wardrobeId' }
                ],
            url: sourceUrl,
            async: false,
            addrow: function (rowid, rowdata, position, commit) {commit(true);},
            deleterow: function (rowid, commit) {commit(true);},
            updaterow: function (rowid, newdata, commit) {commit(true);}
        };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#jqxGrid").jqxGrid({
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
            members = dataAdapter.recordids;
        },
        rendertoolbar: function (toolbar) {
            setToolBar();
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<input id="addrowbutton" type="button" value="增加会员" />');
            container.append('<input id="updaterowbutton" value="修改会员" type="button"  style="margin-left: 10px;"/>');
            container.append('<input id="deleterowbutton" value="删除会员" type="button"  style="margin-left: 10px;"/>');
            container.append('<input id="payfee" value="会员交费" type="button"  style="margin-left: 10px;"/>');
            container.append('<select style="margin-left: 15px;" id="searchkey"></select>');
            container.append('<input style="margin-left: 10px; width: 80px" id="searchvalue" list="none"/>' +
                '<datalist id="inputlist"></datalist>');
            container.append('<select style="margin-left: 15px;" id="memberstatus"><option value = "所有">所有</option><option value = "可用">可用</option> <option value = "停用">停用</option></select>');
            container.append('<span><img style="margin-left:5px;" id = "search" alt="search" width="16" height="16" src="img/search.png" /></span>');
            $("#addrowbutton").jqxButton();
            $("#deleterowbutton").jqxButton();
            $("#updaterowbutton").jqxButton();
            $("#payfee").jqxButton();
            //初始化搜索选择框
            for(var i=0;i<columns.length;i++){
                var temp = columns[i];
                if(temp.datafield!='status')
                    $("#searchkey").append('<option value='+temp.datafield+'>'+temp.text+'</option>')
            }
            //初始化会员卡类型选择框
            for(var i=0;i<cardTypes.length;i++){
                $("#inputlist").append('<option>'+cardTypes[i].name+'</option>')
            }
            $("#payfee").on('click',function(){
                Operate(MEMBER_PAY);
            });
            // update row.
            $("#updaterowbutton").on('click', function () {
                Operate(UPDATE);
            });
            // create new row.
            $("#addrowbutton").on('click', function () {
                Operate(ADD);
            });
            // delete row.
            $("#deleterowbutton").on('click', function () {
                Operate(DELETE);
            });
            $("#search").on('click', function () {
                var key = $("#searchkey").val();
                var value = $("#searchvalue").val();
                var status = $("#memberstatus").val();
                search(key,value.trim(),status);
            });
            $("#searchkey").change(function () {
                if($(this).val()=="cardTypeName")
                     $("#searchvalue").attr("list","inputlist");
                else $("#searchvalue").attr("list","none");
            });
        },
        columns: columns
    });
    $('#jqxGrid').on('rowdoubleclick', function (event) {
        var args = event.args;
        // row's bound index.
        var boundIndex = args.rowindex;
        var data = $('#jqxGrid').jqxGrid('getrowdata', boundIndex);
        var id = $('#jqxGrid').jqxGrid('getrowid', boundIndex);
        Operate(UPDATE);
    });
    //根据不同operateId弹出不同的窗口
    function Operate(operateId) {
        var title="添加员工";
        var popUpWindow = "popUpWindow";
        if(operateId==DELETE){
            if(isSelectedAItem()) deleteItem(url);
            else alert("请先选中要删除的记录！")
            return;
        }
        else if(operateId==UPDATE){
            if(!isSelectedAItem()){
                alert("请先选中要更新的记录！")
                return;
            }
            title = "修改员工信息";
        }
        else if(operateId==MEMBER_PAY){
            if(!isSelectedAItem()){
                alert("请先选中要更新的记录！")
                return;
            }
            popUpWindow = "payFeeWindow";
        }
        var ii = layer.open({
            async:false,
            title:title,
            content: $('.'+popUpWindow).html(),
            area: ['400', '300px'],//自定义文本域宽高,
            btn: ['确定', '取消'],
            yes: function(index){
                //操作成功的标志
                var flag=true;
                if(operateId==ADD)
                    flag = addItem();
                else if(operateId == UPDATE)
                    flag = updateItem();
                else if(operateId==MEMBER_PAY)
                    flag = memberPay();
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
                initChildWindowBeforeOpen(operateId);
            }
        });
    }
    function addItem(){
        var row= getInputRow();
        // console.log("getInputRow:"+JSON.stringify(row))
        if(row == false) return false;
        row["operaterId"] = operater.id;
        row.account=1;
        members.push(row)
        return addItemCommon(row,url);
    }
    function updateItem(){
        var row2= getInputRow();
        if(row2 == false) return false;
        var row = getSelectRow().rowdata;
        console.log(JSON.stringify(row2))
        row['name'] = row2['name'];
        row['teleNumber'] = row2['teleNumber'];
        row['agenda'] = row2['agenda'];
        row['birthday'] = row2['birthday'];
        row['startDate'] = row2['startDate'];
        row['endDate'] = row2['endDate'];
        for(var i=0;i<members.length;i++){
            if(row.id==members[i].id){
                members[i] = row;
            }
        }
        return updateItemCommon(row,url);
    }
    function memberPay() {
        var r = confirm("当前操作为续费操作，是否继续?");
        if(!r) return false;
        var data= getSelectRow();
        var row = data.rowdata;
        if(row == false) return false;
        row["operaterId"] = operater.id;
        row["cardTypeName"] = $("#cardTypeName3").val();
        var card = getCardByCardName(row["cardTypeName"])
        row['youxiaoCishu'] = card.youxiaoCishu;
        row['youxiaoTianshu'] = card.youxiaoTianshu;
        row['startDate'] = formatTime(new Date());
        row['endDate'] = $("#endDate3").val();
        row['status'] = "可用";
        // console.log(JSON.stringify(row))
        return updateItemCommon(row,url);
    }
    function deleteItem(url) {
        var r = confirm("此操作将删除该会员的所有信息，包括私教、衣柜等等，包括消费记录，是否删除？")
        if(r) {
            var row = getSelectRow();

            for(var i=0;i<members.length;i++){
                if(row.id==members[i].id){
                    members.slice(i,1);
                    break;
                }
            }
            return deleteItemCommon(url,row);
        }
    }
    function getInputRow(){
        var numCells=[{'name':'id','type':1,'beNull':true,'label':'会员卡号'},
            {'name':'teleNumber','type':1,'beNull':true,'label':'会员电话'}];
        return getInputRowCommon(columns,numCells)
    }
    function search(key,value,status) {
        console.log("key:"+key+" value:"+value + " status:"+status)
        // console.log(JSON.stringify(members))
        if(key == 'id'&&value!=null&&value!=undefined&&value!=""&&!isInteger(value)){
            alert("会员卡号需要整数");return;
        }
        var data = [];
        for(var i=0;i<members.length;i++){
            var row = members[i];
            if(value==null||value==undefined||value==""){
                if(status=="所有")data.push(row);
                else if(status==row.status) data.push(row);
            }else{
                if((status=="所有"||status==row.status)&&value == row[key])
                    data.push(row);
            }
        }
        // console.log(data)
        $('#jqxGrid').jqxGrid('clear');
        //  传入json数组[{},{}]
        show(data)
    }
    function initChildWindowBeforeOpen(operateId){
        //初始化会员卡选项框
        if(operateId==ADD||operateId==UPDATE){
            for(var i=0;i<cardTypes.length;i++){
                var temp = cardTypes[i];
                $("#cardTypeName").append('<option value='+temp.name+'>'+temp.name+'</option>')
            }
            layui.laydate.render({elem: '#birthday'}); //指定元素
            layui.laydate.render({elem: '#registerDate'}); //指定元素
            layui.laydate.render({elem: '#startDate'}); //指定元素
            $("#cardTypeName").change(function () {
                cartTypeNameChangeEvent();
            });
            $("#startDate").on("change", function () {
                startDateChangeEvent();
            });
        }
        if(operateId==ADD){
            var card = getCardByCardName($("#cardTypeName").val());
            $("#youxiaoCishu").val(card.youxiaoCishu);
            $("#youxiaoTianshu").val(card.youxiaoTianshu);
            $("#registerDate").val(formatTime(new Date()));
            $("#startDate").val($("#registerDate").val());
            $("#endDate").val(addDate($("#startDate").val(),card.youxiaoTianshu));
            $("#selling-price").text("售价:"+card.price+" 实收:");
            $("#price").val(card.price);
        }
        else if(operateId==UPDATE){
            var data = getSelectRow();
            var row = data.rowdata;
            var id = data.id;
            $("#id").val(row.id);$("#id").attr("disabled","disabled")
            $("#name").val(row.name);
            $("#cardTypeName").val(row.cardTypeName);$("#cardTypeName").attr("disabled","disabled")
            $("#teleNumber").val(row.teleNumber);
            $("#agenda").val(row.agenda);
            $("#birthday").val(addDate(row.birthday,0));
            $("#registerDate").val(addDate(row.registerDate,0));$("#registerDate").attr("disabled","disabled")
            $("#startDate").val(addDate(row.startDate,0));
            $("#endDate").val(addDate(row.endDate,0));
            $("#youxiaoCishu").val(row.youxiaoCishu);
            $("#youxiaoTianshu").val(row.youxiaoTianshu);
            $("#selling-price,#price").attr("display","none");
        }
        else if(operateId==MEMBER_PAY){
            var data = getSelectRow();
            var row = data.rowdata;
            var id = data.id;
            $("#id2").val(row.id);
            $("#name2").val(row.name);
            $("#cardTypeName2").val(row.cardTypeName);
            $("#balance2").val(row.balance);
            $("#leftCishu2").val(row.youxiaoCishu);
            $("#endDate2").val(formatTime(new Date(row.endDate)));
            for(var i=0;i<cardTypes.length;i++){
                var temp = cardTypes[i];
                $("#cardTypeName3").append('<option value='+temp.name+'>'+temp.name+'</option>')
            }
            $("#cardTypeName3").val(row.cardTypeName);
            var card = getCardByCardName($("#cardTypeName3").val());
            $("#top-up-price3").val(card.price);
            $("#endDate3").val(addDate(formatTime(new Date()),card.youxiaoTianshu));
            $("#youxiaoCishu3").val(card.youxiaoCishu);
            $("#cardTypeName3").change(function () {
                var card = getCardByCardName($(this).val());
                $("#youxiaoCishu3").val(card.youxiaoCishu);
                $("#endDate3").val(addDate(formatTime(new Date()),card.youxiaoTianshu));
                $("#top-up-price3").val(card.price);
            });
            $("#top-up").click(function () {
                payFee(data);
            });
        }
    }
    function payFee(data) {
        var row={};
        row.id = $("#id2").val()
        row.balance =(parseFloat($("#top-up-price").val())+parseFloat($("#balance2").val()))+"";
        row.operaterId = operater.id;
        var temp = data.rowdata;
        console.log(JSON.stringify(row))
        temp.balance = row.balance;
        var result = LoadAjaxJson(row,TOP_UP,url);
        if(result.success==false){
            alert("充值失败");return;
        } else {
            alert("充值成功");
            var commit = $("#jqxGrid").jqxGrid('updaterow', data.id, temp);
        }
    }
    function startDateChangeEvent() {
        var card = getCardByCardName($("#cardTypeName").val());
        $("#endDate").val(addDate($("#startDate").val(),card.youxiaoTianshu));
    }
    function cartTypeNameChangeEvent() {
        var card = getCardByCardName($("#cardTypeName").val());
        $("#youxiaoCishu").val(card.youxiaoCishu);
        $("#youxiaoTianshu").val(card.youxiaoTianshu);
        $("#endDate").val(addDate($("#startDate").val(),card.youxiaoTianshu));
        $("#selling-price").text("售价:"+card.price+" 实收:");
    }
});