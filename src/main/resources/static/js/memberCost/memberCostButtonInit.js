function init() {
    initConstValue();
    initInformationPanel()
    $("#clear-member").click(function () {
        clearMember();
    });
    $("#add-member").click(function () {
        popWindows("addMember","添加会员")
    });
    $("#update-member").click(function () {
        if($("#id").text()==null||$("#id").text()==undefined||$("#id").text()=="")
            return;
        popWindows("updateMember","修改会员")
    });
    $("#renewal-member").click(function () {
        if($("#id").text()==null||$("#id").text()==undefined||$("#id").text()=="")
            return;
        popWindows("renewalMember","续费会员",['800px','430px'])
    });
    $("#rend-wardrobe").click(function () {
        if($("#id").text()==null||$("#id").text()==undefined||$("#id").text()=="")
            return;
        if($("#wardrobeId").text()==null||$("#wardrobeId").text()==undefined||$("#wardrobeId").text()=="") {
            popWindows("rendWardrobe","租用衣柜")
        }else{
            popWindows("rendWardrobe2","租用衣柜")
        }
    });
    $("#rend-trainer").click(function () {
        if($("#id").text()==null||$("#id").text()==undefined||$("#id").text()=="")
            return;
        if($("#trainerName").text()==null||$("#trainerName").text()==undefined||$("#trainerName").text()=="") {
            popWindows("rendTrainer","租用私教")
        }
    });
    $("#buy-goods").click(function () {
        if($("#id").text()==null||$("#id").text()==undefined||$("#id").text()=="")
            return;
        popWindows("buyGoods","商品购买")

    });
    initGrid();
}
function initChildWindowBeforeOpen(popWindow) {
    if(popWindow=="addMember"||popWindow=="updateMember"){
        for(var i=0;i<cardTypes.length;i++){
            $("#addMember-cardTypeName").append('<option value='+cardTypes[i].name+'>'+cardTypes[i].name+'</option>')
        }
        layui.laydate.render({elem: '#addMember-birthday'}); //指定元素
        layui.laydate.render({elem: '#addMember-registerDate'}); //指定元素
        layui.laydate.render({elem: '#addMember-startDate'}); //指定元素
        $("#addMember-startDate").on("change", function () {
            var card = getCardByCardName($("#addMember-cardTypeName").val());
            $("#addMember-endDate").val(addDate($("#addMember-startDate").val(),card.youxiaoTianshu));
        });
    }
    if(popWindow=="addMember"){
        $("#addMember-cardTypeName").change(function () {
            cartTypeNameChangeEvent("addMember");
        });
        var card = getCardByCardName($("#addMember-cardTypeName").val());
        $("#addMember-youxiaoCishu").val(card.youxiaoCishu);
        $("#addMember-youxiaoTianshu").val(card.youxiaoTianshu);
        $("#addMember-registerDate").val(formatTime(new Date()));
        $("#addMember-startDate").val($("#addMember-registerDate").val());
        $("#addMember-endDate").val(addDate($("#addMember-startDate").val(),card.youxiaoTianshu));
        $("#addMember-selling-price").text("售价:"+card.price+" 实收:");
        $("#addMember-price").val(card.price);
    }
    else if(popWindow=="updateMember"){
        var member = getMember($("#id").text());
        $("#addMember-id").val(member.id);$("#addMember-id").attr("disabled","disabled")
        $("#addMember-name").val(member.name);
        $("#addMember-cardTypeName").val(member.cardTypeName);$("#addMember-cardTypeName").attr("disabled","disabled")
        $("#addMember-teleNumber").val(member.teleNumber);
        $("#addMember-agenda").val(member.agenda);
        $("#addMember-registerDate").val(addDate(member.registerDate,0));
        $("#addMember-registerDate").attr("disabled","disabled")
        $("#addMember-startDate").val(addDate(member.startDate,0));
        $("#addMember-endDate").val(addDate(member.endDate,0));
        $("#addMember-youxiaoCishu").val(member.youxiaoCishu);
        $("#addMember-youxiaoTianshu").val(member.youxiaoTianshu);
        $("#addMember-selling-price,#addMember-price").attr("display","none");
    }
    else if(popWindow=="renewalMember"){
        var row = getMember($("#id").text());
        $("#renewal-id").val(row.id);
        $("#renewal-name").val(row.name);
        $("#renewal-cardTypeName").val(row.cardTypeName);
        $("#renewal-balance").val(row.balance);
        $("#renewal-leftCishu").val(row.youxiaoCishu);
        $("#renewal-endDate").val(formatTime(new Date(row.endDate)));
        for(var i=0;i<cardTypes.length;i++){
            $("#renewal-cardTypeName3").append('<option value='+cardTypes[i].name+'>'+cardTypes[i].name+'</option>')
        }
        $("#renewal-cardTypeName3").val(row.cardTypeName);
        var card = getCardByCardName($("#renewal-cardTypeName3").val());
        $("#renewal-top-up-price3").val(card.price);
        $("#renewal-endDate3").val(addDate(formatTime(new Date()),card.youxiaoTianshu));
        $("#renewal-youxiaoCishu3").val(card.youxiaoCishu);
        $("#renewal-cardTypeName3").change(function () {
            var card = getCardByCardName($(this).val());
            $("#renewal-youxiaoCishu3").val(card.youxiaoCishu);
            $("#renewal-endDate3").val(addDate(formatTime(new Date()),card.youxiaoTianshu));
            $("#renewal-top-up-price3").val(card.price);
        });
        $("#renewal-top-up").click(function () {
            payFee(row);
        });
        return row;
    }
    else if(popWindow=="rendWardrobe"){
        var row = getMember($("#id").text());
        //初始化弹出表单
        $("#rendWardrobe-member-id").val(row['id']);
        $("#rendWardrobe-member-name").val(row['name']);
        $("#rendWardrobe-card-type").val(row['cardTypeName']);
        $("#rendWardrobe-wardrobe-price").val(0);
        for(var i=0;i<wardrobes.length;i++){
            if(wardrobes[i].status==0||wardrobes[0]=="空闲")
                $("#rendWardrobe-id-list").append('<option>'+wardrobes[i].id+'</option>')
        }
        var now= formatTime(new Date());
        $("#rendWardrobe-from,#rendWardrobe-to").on("change",function () {
            changeStartOrEnd();
        });
        $("#rendWardrobe-wardrobe-price").on("input",function () {
            var days = DateMinus($("#rendWardrobe-from").val(), $("#rendWardrobe-to").val())+1;
            $("#rendWardrobe-total-amount").val(days*parseInt($("#rendWardrobe-wardrobe-price").val()));
        });
        layui.laydate.render({elem: '#rendWardrobe-from', value: now,
            done:function(value, date, endDate){changeStartOrEnd(value,"from")}
        }); //指定元素
        layui.laydate.render({
            elem: '#rendWardrobe-to',
            value: now,
            done: function (value, date, endDate) {changeStartOrEnd(value, "to")}
        });
        $("#rendWardrobe-wardrobe-id").on("change",function () {
            var wardrobe = getWardrobe($(this).val())
            if(wardrobe==null) return;
            $("#rendWardrobe-wardrobe-name").val(wardrobe.name);
            $("#rendWardrobe-wardrobe-price").val(wardrobe.price);
            $("#rendWardrobe-total-amount").val(
                (DateMinus($("#rendWardrobe-from").val(),
                    $("#rendWardrobe-to").val())+1)*parseInt(wardrobe.price));
        });

    }
    else if(popWindow=="rendWardrobe2"){
        var row = getWardrobe($("#wardrobeId").text());
        $("#rendWardrobe2-member-id2").val(row.memberId);
        $("#rendWardrobe2-member-name2").val(row.memberName);
        $("#rendWardrobe2-card-type2").val($("#cardTypeName").text());
        $("#rendWardrobe2-end-time2").val(row.endTime);
        $("#rendWardrobe2-wardrobe-id2").val(row.id);
        $("#rendWardrobe2-wardrobe-name2").val(row.name);
        $("#rendWardrobe2-total-amount2").val(row.price);
        layui.laydate.render({
            elem: '#rendWardrobe2-to2',
            value: addDate(row.endTime,1),
            done: function (value, date, endDate) {changeStartOrEnd(value, null,row)}
        });
        $("#returnWardrobe").click(function () {

            var row = getWardrobe($("#rendWardrobe2-wardrobe-id2").val());
            row.operaterId = operater.id;
            row.startTime = formatTime(new Date());
            var days = DateMinus(row.startTime,row.endTime)
            row.totalAmount = parseFloat(row.price)*days;
            row.context = "退柜";
            row.status=0;
            // console.log(row)
            var r = confirm("退费"+row.totalAmount+"元，请确认");
            if(!r) {
                return;
            }
            var result = LoadAjaxJson(row,RETURN_WARDROBE,"/systemSetting/wardrobe/operate");
            if(result.success==false){

                alert("退还失败");return;
            }
            row.status="空闲"
            $("#wardrobeId").text("");

            return true;

        });

    }
    else if(popWindow=="rendTrainer"){
        $("#rendTrainer-member-id").val($("#id").text())
        for(var i=0;i<trainers.length;i++){
            if(trainers[i].status==0)
                $("#rendTrainer-trainer-id").append('<option value='+trainers[i].trainerId+'>'+trainers[i].trainerName+'</option>')
        }
        var price = getTrainer($("#rendTrainer-trainer-id").val()).price
        $("#rendTrainer-price").val(price);
        $("#rendTrainer-rend-time").val(1);
        $("#rendTrainer-total-amount").val(
            parseInt($("#rendTrainer-rend-time").val())*price);
        $("#rendTrainer-end-time").val(addDate(formatTime(new Date(),1)));
        $("#rendTrainer-total-amount").val(parseInt($("#rendTrainer-rend-time").val())*parseInt(price))
        $("#rendTrainer-trainer-id").change(function () {
            $("#rendTrainer-price").val(getTrainer($(this).val()).price);
            $("#rendTrainer-total-amount").val(parseInt($("#rendTrainer-rend-time").val())*parseInt( $("#rendTrainer-price").val()))
        });
        $("#rendTrainer-rend-time").on("input",function () {
            $("#rendTrainer-total-amount").val(parseInt($("#rendTrainer-rend-time").val())*parseInt( $("#rendTrainer-price").val()))
            $("#rendTrainer-end-time").val(addDate(formatTime(new Date(),parseInt($("#rendTrainer-rend-time").val()))))
        });
    }
    else if(popWindow=="buyGoods"){
        initBuyGoodsPanel();
    }
    return {};
}
function popWindows(popWindow,title,areaUp) {
    var tempPopWindow = popWindow=="updateMember"?"addMember":popWindow;
    var row={};
    var area= ['400', '300px'];
    if(areaUp!=undefined)
        area = areaUp;
    if(popWindow=="buyGoods") area = ['400', '560px'];
    var ii = layer.open({
        type:1,
        async:false,
        title:title,
        content: $('.'+tempPopWindow).html(),
        area: area,//自定义文本域宽高,
        btn: ['确定', '取消'],
        yes: function(index){
            var flag=true;
            if(popWindow=="addMember")
                flag = addMember();
            else if(popWindow=="updateMember")
                flag = updateMember();
            else if(popWindow=="renewalMember")
                flag = renewalMember(row);
            else if(popWindow=="rendWardrobe")
                flag = rendWardrobe();
            else if(popWindow=="rendWardrobe2")
                flag = rendWardrobe2();
            else if(popWindow=="rendTrainer")
                flag = rendTrainer();
            else if(popWindow=="buyGoods")
                flag = buyGoods();

            if(flag)
                layer.close(index);
        },

        btn2: function() {
            if(popWindow == "buyGoods"){
                goodLeft={};
            }
            return 0;
        },
        success: function(layero, index){
            //初始化页面
            row=initChildWindowBeforeOpen(popWindow);
        }
    });
}
function cartTypeNameChangeEvent(classname) {
    var card = getCardByCardName($("#"+classname+"-cardTypeName").val());
    $("#"+classname+"-youxiaoCishu").val(card.youxiaoCishu);
    $("#"+classname+"-youxiaoTianshu").val(card.youxiaoTianshu);
    $("#"+classname+"-endDate").val(
        addDate($("#"+classname+"-startDate").val(),card.youxiaoTianshu));
    $("#"+classname+"-selling-price").text("售价:"+card.price+" 实收:");
}
function rendTrainer() {
    var row = {};
    row.endTime =  $("#rendTrainer-end-time").val();
    row.memberId = $("#rendTrainer-member-id").val();
    row.trainerId = $("#rendTrainer-trainer-id").val();
    row.startTime = formatTime(new Date());
    row.totalAmount = $("#rendTrainer-total-amount").val();
    row.operaterId = operater.id;
    var result = LoadAjaxJson(row,REND_TRAINER,"/memberManage/trainer/operate");
    //查询全部
    if(result.success != true)
    {alert("租用失败:"+result.context);return false;}
    var member = getMember(row.memberId)

    var trainer = getTrainer(row.trainerId);
    $("#trainerName").text(trainer.trainerName)
    member.balance = member.balance-row.totalAmount;
    $("#balance").text(member.balance);
    trainer.status=1;
    trainer.memberName=row.memberId;
    member.trainerName = trainer.trainerName;
    row.operaterName = operater.name;
    row.trainerName = trainer.trainerName;
    console.log(JSON.stringify(row))
    showOneRow(row,"jqxGrid3");
    return true;
}
function clearMember() {
    var id = $("#id").text();
    if(id==""||id==undefined||id==null) return;
    var member = members[0];
    for(var key in member){
        $("#"+key).text("");
    }
    for(var i=1;i<=5;i++){
        $("#jqxGrid"+i).jqxGrid('clear');
    }
}
//衣柜续费
function rendWardrobe2() {

    var id = $("#rendWardrobe2-wardrobe-id2").val();
    var row = getWardrobe(id);
    row.startTime = addDate(row.endTime,1)
    row.endTime = $("#rendWardrobe2-to2").val();
    row.totalAmount = $("#rendWardrobe2-total-amount2").val();
    row.status=1;
    row.context = "续费";
    row.operaterId = operater.id;
    var result = LoadAjaxJson(row,REND_WARDROBE_MORE,"/systemSetting/wardrobe/operate");
    if(result.success==false){
        alert("租用失败:"+result.context);return;
    }
    row.status="已租"
    var member = getMember(row.memberId);
    member.balance = member.balance-row.totalAmount;
    $("#balance").text(member.balance);
    row.operateTime = row.startTime;
    row.memberName = member.name;
    row.wardrobeId = row.id;
    row.operaterName = operater.name;
    showOneRow(row,"jqxGrid5");
    return true;
}
function rendWardrobe() {

    var id = $("#rendWardrobe-wardrobe-id").val();
    var row = getWardrobe(id);
    row.status = 1;//修改为已租
    row.memberId = $("#id").text();
    if(row.memberId==undefined||row.memberId.length==0){

        alert("请输入会员卡号");return;
    }
    var ward = $("#wardrobeId").text();
    // console.log(member)
    if(ward!=0&&ward!=undefined&&ward!=null&&ward!=""){

        alert("当前用户已经租用了衣柜");return;
    }
    row.context = "出租";
    row.startTime = $("#rendWardrobe-from").val();
    row.endTime = $("#rendWardrobe-to").val();
    row.operaterId = operater.id;
    row.totalAmount = $("#rendWardrobe-total-amount").val();
    var result = LoadAjaxJson(row,REND_WARDROBE,"/systemSetting/wardrobe/operate");
    if(result.success==false){
        alert("租用失败:"+result.context);return;
    }
    $("#wardrobeId").text(row.id);
    var member = getMember(row.memberId);
    member.balance = member.balance-row.totalAmount;
    $("#balance").text(member.balance);
    member.wardrobeId = row.id;
    ward.status="已租";
    ward.memberName=member.id;
    row.operateTime = row.startTime;
    row.memberName = member.name;
    row.wardrobeId = row.id;
    row.operaterName = operater.name;
    showOneRow(row,"jqxGrid5");
    return true;
}
function renewalMember(row) {
    var r = confirm("当前操作为续费操作，是否继续?");
    if(!r) return false;
    row["operaterId"] = operater.id;
    row["cardTypeName"] = $("#renewal-cardTypeName3").val();
    var card = getCardByCardName(row["cardTypeName"])
    row['youxiaoCishu'] = card.youxiaoCishu;
    row['youxiaoTianshu'] = card.youxiaoTianshu;
    row['startDate'] = formatTime(new Date());
    row['endDate'] = $("#renewal-endDate3").val();
    row['status'] = "可用";
    row['account'] = $("#renewal-top-up-price3").val();
    var result = LoadAjaxJson(row,UPDATE,"/memberManage/member/operate");
    if(result.success==false){
        alert(result.context);return false;
    }

    initMemberImformation(result.data[0]);
    var log = {};
    log.startTime = row['startDate'];
    log.memberId = row.id;
    log.memberName = row.name;
    log.cardTypeName = row.cardTypeName;
    log.operaterId = row.operaterId;
    log.operaterName = operater.name;
    log.account = row.account;
    showOneRow(log,"jqxGrid4");
    return true;
}
function updateMember() {
    var row2 = genRowForAddAndUpdate();
    if(row2 == false) return false;
    var row = getMember(row2.id);
    row['name'] = row2['name'];
    row['teleNumber'] = row2['teleNumber'];
    row['agenda'] = row2['agenda'];
    row['birthday'] = row2['birthday'];
    row['startDate'] = row2['startDate'];
    row['endDate'] = row2['endDate'];
    var result = LoadAjaxJson(row,UPDATE,"/memberManage/member/operate");
    if(result.success==false){
        alert(result.context);return false;
    }
    $("#name").text(row.name);
    $("#teleNumber").text(row.teleNumber);
    $("#birthday").text(row.birthday);
    $("#startDate").text(row.startDate);
    $("#endDate").text(row.endDate);
    return true;
}
function addMember(){
    var row = genRowForAddAndUpdate();
    if(!row) return;
    if(row.id==null||row.id==""){
        if(getMember(row.id)!=null){
            alert("当前id已经存在");return false;
        }
    }
    row.account = $("#addMember-price").val();
    var result = LoadAjaxJson(row,ADD,"/memberManage/member/operate");
    if(result.success==false){
        alert(result.context);return false;
    }
    members.push(result.data[0]);
    $("#member-id-list").append('<option>'+result.data[0].id+'</option>')
    $("#input-member-id").val(result.data[0].id);
    $("#query").click();
    return true;
}
function genRowForAddAndUpdate() {
    var row= {};
    row.id=$("#addMember-id").val();
    row.name=$("#addMember-name").val();
    if(row.name==null||row.name==""){
        alert("会员姓名不能为空");return false;
    }
    row.cardTypeName=$("#addMember-cardTypeName").val();
    row.teleNumber=$("#addMember-teleNumber").val();
    row.teleNumber= row.teleNumber==null?"": row.teleNumber;
    row.agenda=$("#addMember-agenda").val();
    row.birthday=$("#addMember-birthday").val();
    row.registerDate=$("#addMember-registerDate").val();
    row.startDate=$("#addMember-startDate").val();
    row.endDate=$("#addMember-endDate").val();
    row.youxiaoCishu=$("#addMember-youxiaoCishu").val();
    row.youxiaoTianshu=$("#addMember-youxiaoTianshu").val();
    row.price=$("#addMember-price").val();
    row.operaterId= operater.id;
    var numCells=[{'name':'id','type':1,'beNull':true,'label':'会员卡号'},
        {'name':'teleNumber','type':1,'beNull':true,'label':'会员电话'}];
    if(!isValidCommon(row,numCells)) return false;
    return row;
}
function payFee(data) {
    var row= data;
    row.balance =parseFloat($("#renewal-top-up-price").val())+
        parseFloat(row.balance)+"";
    row.operaterId = operater.id;

    var result = LoadAjaxJson(row,TOP_UP,"/memberManage/member/operate");
    if(result.success==false){
        alert("充值失败");return false;
    } else {
        alert("充值成功") ;
    }
    $("#balance").text(row.balance);
    return true;
}
function changeStartOrEnd(value,lable,row) {
    if(row==undefined){
        var to = $("#rendWardrobe-to").val();
        var from = $("#rendWardrobe-from").val();
        if(lable=="from") from =value;
        else if (lable=="to") to=value;
        if(!/^\d{4}-\d{2}-\d{2}$/.test(from)) return;
        if(!/^\d{4}-\d{2}-\d{2}$/.test(to)) return;
        $("#rendWardrobe-total-amount").val((DateMinus(from,to)+1)*parseInt($("#rendWardrobe-wardrobe-price").val()));
    }else{
        var from = $("#rendWardrobe2-end-time2").val();
        var to = value;
        if(!/^\d{4}-\d{2}-\d{2}$/.test(to)) return;
        $("#rendWardrobe2-total-amount2").val((DateMinus(from,to))*parseInt(row.price));
    }
}
function initInformationPanel(){
    for(var i=0;i<members.length;i++){
        $("#member-id-list").append('<option>'+members[i].id+'</option>')
    }
    $("#input-member-id").on('change',function () {
        $("#query").click();
    });
    $("#query").click(function () {
        var member = getMember($("#input-member-id").val());
        // console.log(member)
        if(member==null) return;
        initMemberImformation(member)
        setAllJqxGridRow(member.id);
    });
}
function initMemberImformation(member) {
    for(var key in member){
        $("#"+key).text(member[key]);
    }
    if(member.wardrobeId==0)
        $("#wardrobeId").text("")
    if(member.teleNumber==0)
        $("#teleNumber").text("")
}
function initConstValue() {
    if(members.length==0)
        members = LoadAjax({},"/memberManage/getMembers",false)
    if(cardTypes.length==0)
        cardTypes = LoadAjax({},"/systemSetting/getCards",false);
    //初始化输入面板
    if(wardrobes.length==0)
        wardrobes = LoadAjax({},"/systemSetting/getWardrobes",false);
    if(trainers.length==0)
        trainers = LoadAjax({},"/memberManage/getTrainers",false);
}
function initBuyGoodsPanel() {

    var member = getMember($("#id").text());
    $("#buyGoods-member-id").text(member.id);
    $("#buyGoods-member-name").text(member.name);
    $("#buyGoods-card-type").text(member.cardTypeName);
    $("#buyGoods-credit").text(member.credit);
    $("#buyGoods-balance").text(member.balance);
    $("#buyGoods-total-consumption").text(member.totalConsumption);
    $("#plusAmount").text(0);
    $("#plusCredit").text(0);
    if(goods.length==0)
        goods = LoadAjax({},"/goodsSetting/getGoods",false);
    var height=200;
    var width=550;
    var initGoodTabs = function (tab) {
        switch (tab) {
            case 0:
                initBuyGoodsGrid(height,width);
                break;
            case 1:
                initGoodsGrid(height,width);
                break;
        }
    }//width: getWidth('Tabs')
    $('#goodTabs').jqxTabs({
        width: width+20,
        height: height+20,
        initTabContent: initGoodTabs
    });
}
function initGoodsGrid(height,width) {
    var jqxGrid = "goodsGrid";
    var columns=[
        { text: '商品编号', datafield: 'id', width: 80 },
        { text: '商品名称', datafield: 'name', width: 100 },
        { text: '商品库存', datafield: 'leftNumber', width: 100 },
        { text: '商品售价', datafield: 'sellingPrice', width: 80 },
        { text: '积分兑换', datafield: 'credit', width: 80 }
    ];
    setWidth(520,columns)
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id' },
                    { name: 'name' },
                    { name: 'leftNumber' },
                    { name: 'sellingPrice' },
                    { name: 'credit' }
                ],
            localdata:goods,
            addrow: function (rowid, rowdata, position, commit) {commit(true);},
            deleterow: function (rowid, commit) {commit(true);},
            updaterow: function (rowid, newdata, commit) {commit(true);}
        };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#"+jqxGrid).jqxGrid({
        height: height,
        width:width,
        altrows: true,//行间底色区分
        columnsresize: true,//列可适应调整
        sortable: true,//设置可排序
        showsortcolumnbackground: false,
        clipboard: false,//屏蔽jqx的复制功能
        enablebrowserselection: true,//允许使用浏览器选择内容功能
        source: dataAdapter,
        showtoolbar: true,
        rendertoolbar: function (toolbar) {
            $('#'+jqxGrid).jqxGrid({ toolbarheight: 30});
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<select style="margin-left: 15px;" id="searchkey"></select>');
            container.append('<input  id="searchvalue" />')
            container.append('<span><img style="margin-left:5px;" id = "search" alt="search" width="16" height="16" src="img/search.png" /></span>');
            //初始化搜索选择框
            for(var i=0;i<columns.length;i++){
                var temp = columns[i];
                $("#searchkey").append('<option value='+temp.datafield+'>'+temp.text+'</option>')
            }
            $("#search").on('click', function () {
                var key = $("#searchkey").val();
                var value = $("#searchvalue").val();
                // search(key,value);
                var row={};
                row['key'] = key;
                row['value'] = value
                // console.log("row:"+row['key']+","+row['value'])
                var result = LoadAjaxJson(row,SEARCH,"/goodsSetting/good/operate");
                console.log(result.data)
                $('#'+jqxGrid).jqxGrid('clear');
                //  传入json数组[{},{}]
                showNoSortByGrid(result.data,jqxGrid);
            });
        },
        columns: columns
    });
    $('#'+jqxGrid).on('rowdoubleclick', function (event) {
        var args = event.args;
        // row's bound index.
        var boundIndex = args.rowindex;
        var data = $('#'+jqxGrid).jqxGrid('getrowdata', boundIndex);
        var id = $('#'+jqxGrid).jqxGrid('getrowid', boundIndex);
        data.number = 1;
        if(goodLeft[data.id]==undefined)
            goodLeft[data.id]={"leftNumber":data.leftNumber,"buyNumber":0};
        initBuyGoodPopWindow(2,{"data":data,"id":id});
    });
}
function initBuyGoodsGrid(height,width) {
    var jqxGrid = "buyGoodsGrid";
    var columns1=[
        { text: '商品编号', datafield: 'id', width: 80 },
        { text: '商品名称', datafield: 'name', width: 100 },
        { text: '售价', datafield: 'sellingPrice', width: 80 },
        { text: '积分', datafield: 'credit', width: 80 },
        { text: '数量', datafield: 'number', width: 80 },
        { text: '总金额', datafield: 'totalAmount', width: 80 },
        { text: '总积分', datafield: 'totalCredit', width: 80 },
    ];
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id'},
                    { name: 'name' },
                    { name: 'sellingPrice' },
                    { name: 'credit' },
                    { name: 'number' },
                    { name: 'totalAmount' },
                    { name: 'totalCredit' },
                ],
            localdata:[],
            addrow: function (rowid, rowdata, position, commit) {
                commit(true);
            },
            deleterow: function (rowid, commit) {
                commit(true);
            },
            updaterow: function (rowid, newdata, commit) {
                // and with parameter false if the synchronization failed.
                commit(true);
            }
        };
    var dataAdapter = new $.jqx.dataAdapter(source);
    // initialize jqxGrid
    $("#"+jqxGrid).jqxGrid({
        height: height,
        width:width,
        altrows: true,//行间底色区分
        columnsresize: true,//列可适应调整
        sortable: true,//设置可排序
        showsortcolumnbackground: false,
        source: dataAdapter,
        showtoolbar: true,
        rendertoolbar: function (toolbar) {
            $('#'+jqxGrid).jqxGrid({ toolbarheight: 30});
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<input style="margin-left:10px;" type="button" id="delete" value="删除"/>')
            $("#delete").jqxButton();
            $("#delete").on('click',function () {
                var row = getSelectRowByGrid(jqxGrid);
                var data = row.rowdata;
                var commit = $("#"+jqxGrid).jqxGrid('deleterow', row.id);
                console.log(row)
                $("#plusCredit").text(parseInt($("#plusCredit").text())-data.totalCredit);
                $("#plusAmount").text(parseFloat($("#plusAmount").text())-data.totalAmount);
                return true;
            });
        },
        columns: columns1
    });
    $('#'+jqxGrid).on('rowdoubleclick', function (event) {
        var args = event.args;
        // row's bound index.
        var boundIndex = args.rowindex;
        var data = $('#'+jqxGrid).jqxGrid('getrowdata', boundIndex);
        var id = $('#'+jqxGrid).jqxGrid('getrowid', boundIndex);
        initBuyGoodPopWindow(1,{"data":data,"id":id});
    });
}
function buyGoods() {
    var rows = $('#buyGoodsGrid').jqxGrid('getrows');
    var member = getMember($("#id").text());
    var type = $("input[name='type']:checked").val()=="money"?0:1;
    var balance = parseFloat($("#balance").text());
    var credit = parseInt($("#credit").text());
    if((type==0&&balance<parseFloat($("#plusAmount").text()))||
        (type==1&&credit<parseInt($("#plusCredit").text()))){
        alert("余额或者积分不足");return;
    }
    var jqxGrid = "jqxGrid"+(type+1);
    for(var i=0;i<rows.length;i++){
        var row = rows[i];
        row.goodId=row.id;
        row.memberId = $("#id").text();
        row.sellingType = type;
        row.sellingPrice= type==0?row.sellingPrice:row.credit;
        row.totalAmount=type==0?row.totalAmount:row.totalCredit;
        row.balance = type==0?(member.balance-row.totalAmount):(member.credit-row.totalCredit);
        if(type==0) {
            member.balance=member.balance-row.totalAmount;
            member.credit = member.credit+
                parseInt((parseFloat(row.totalAmount)+member.totalConsumption%CREDIT_DIVISOR)/CREDIT_DIVISOR);
            member.totalConsumption = member.totalConsumption+parseFloat(row.totalAmount);
        }
        else member.credit = member.credit-row.totalCredit;
        row.account=1;
        row.operaterId = operater.id;
        row.leftNumber = goodLeft[row.id].leftNumber-row.number;
        goodLeft[row.id].leftNumber=row.leftNumber;
        var result = LoadAjaxJson(row,BUY_GOODS,'/goodsSetting/selling_log/operate');
        if(result.success==true){
            showOneRow(result.data[0],jqxGrid);
            var good = getGood(row.id);
            good.leftNumber = row.leftNumber;
        }else{
            alert(row.goodId+"购买失败");
        }
    }
    $("#balance").text(member.balance);
    $("#credit").text(member.credit);
    goods = LoadAjax({},"/goodsSetting/getGoods",false);
    goodLeft={};
    return true;
}
function initBuyGoodPopWindow(tabId,datarow) {
    var data = datarow.data;
    var id = datarow.id;
    var maxNumber = 0;
    if(tabId==2){
        maxNumber = goodLeft[data.id].leftNumber-goodLeft[data.id].buyNumber;
    }else{
        maxNumber = goodLeft[data.id].leftNumber-goodLeft[data.id].buyNumber+data.number;
    }
    if(maxNumber<=0){
        alert("当前商品库存为0,请选择其他商品");return;
    }
    var ii = layer.open({
        async: false,
        title: "商品信息",
        content: $('.buyGoodPopWindow').html(),
        area: ['400', '400apx'],//自定义文本域宽高,
        btn: ['确定', '取消'],
        yes: function (index) {
            var row = {};
            row.number = parseInt($("#sellingNumber").val())
            if(row.number>maxNumber){
                alert("数量过大，请重新输入");return;
            }
            row.id = data.id;
            row.name = data.name;
            row.sellingPrice = $("#sellingPrice").val();
            row.credit = $("#sellingCredit").val()
            row.totalAmount = $("#totalAmount").text();
            row.totalCredit = $("#totalCredit").text();
            if (tabId == 2) {
                var commit = $("#" + "buyGoodsGrid").jqxGrid('addrow', null, row);
                $("#plusAmount").text(parseFloat($("#plusAmount").text())+parseFloat(row.totalAmount));
                $("#plusCredit").text(parseInt($("#plusCredit").text())+parseInt(row.totalCredit));
                goodLeft[row.id].buyNumber=row.number+goodLeft[row.id].buyNumber;
            }
            else {
                var commit = $("#" + "buyGoodsGrid").jqxGrid('updaterow', id, row);
                $("#plusAmount").text(parseFloat($("#plusAmount").text())+parseFloat(row.totalAmount)-data.totalAmount);
                $("#plusCredit").text(parseInt($("#plusCredit").text())+parseInt(row.totalCredit)-data.totalCredit);
                goodLeft[row.id].buyNumber= row.number+goodLeft[row.id].buyNumber-data.number;
            }
            console.log(goodLeft[row.id])
            layer.close(index);
        },
        btn2: function () {
            //按钮【取消】的回调
            return 0;
        },
        zIndex: layer.zIndex ,//重点1
        success: function (layero, index) {
            layer.setTop(layero); //重点2
            $("#goodId").text(data.id);
            $("#goodName").text(data.name);
            $("#goodPrice").text(data.sellingPrice);
            $("#goodCredit").text(data.credit);
            $("#sellingPrice").val(data.sellingPrice);
            $("#sellingCredit").val(data.credit);
            $("#sellingNumber").val(data.number);
            $("#maxNumber").text(maxNumber);
            $("#totalAmount").text(parseFloat($("#sellingPrice").val()) * parseInt($("#sellingNumber").val()));
            $("#totalCredit").text(parseInt($("#sellingCredit").val()) * parseInt($("#sellingNumber").val()));
            $("#sellingPrice,#sellingCredit,#sellingNumber").on("input", function () {
                $("#totalAmount").text(parseFloat($("#sellingPrice").val()) * parseInt($("#sellingNumber").val()));
                $("#totalCredit").text(parseFloat($("#sellingCredit").val()) * parseInt($("#sellingNumber").val()));
            });
        }
    });
}
// function search(key,value) {
//     var row={};
//     row['key'] = key;
//     row['value'] = value
//     // console.log("row:"+row['key']+","+row['value'])
//     var result = LoadAjaxJson(row,SEARCH,url);
//     console.log(result.data)
//     $('#jqxGrid').jqxGrid('clear');
//     //  传入json数组[{},{}]
//     show(result.data)
// }