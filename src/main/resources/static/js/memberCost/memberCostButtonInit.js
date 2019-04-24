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
        popWindows("renewalMember","续费会员")
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
    return {};
}
function popWindows(popWindow,title) {
    var tempPopWindow = popWindow=="updateMember"?"addMember":popWindow;
    var row={};
    var ii = layer.open({
        async:false,
        title:title,
        content: $('.'+tempPopWindow).html(),
        area: ['400', '300px'],//自定义文本域宽高,
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
            if(flag)
                layer.close(index);
        },
        btn2: function() {
            //按钮【取消】的回调
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
    {alert("失败");return false}

    var trainer = getTrainer(row.trainerId);
    $("#trainerName").text(trainer.trainerName)
    trainer.status=1;
    trainer.memberName=row.memberId;
    var member = getMember(row.memberId)
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

        alert("租用失败");return;
    }
    row.status="已租"
    var member = getMember(row.memberId);
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

        alert("租用失败");return;
    }
    $("#wardrobeId").text(row.id);
    var member = getMember(row.memberId);
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