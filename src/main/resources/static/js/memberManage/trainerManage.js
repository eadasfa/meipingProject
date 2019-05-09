$(document).ready(function () {
    var url = "/memberManage/trainer/operate";
    var sourceUrl = "/memberManage/getTrainersByMemberId";
    var grid2Rows = [];//jqxGrid2的数据
    var width =window.document.body.offsetWidth*0.805/2;
    var height = window.document.body.offsetHeight*0.805
    if(members.length==0)
        members = LoadAjax({},"/memberManage/getMembers",false)
    if(trainers.length==0)
        trainers = LoadAjax({},"/memberManage/getTrainers",false);
    var columns1=[
        { text: '会员卡号', datafield: 'memberId', width: 100 },
        { text: '会员姓名', datafield: 'memberName', width: 180 },
        { text: '教练名称', datafield: 'trainerName', width: 160 },
        { text: '购买天数', datafield: 'dayNumber', width: 100 }
    ];
    setWidth(width,columns1)
    var columns2=[
        { text: '租用日期', datafield: 'startTime', width: 100 },
        { text: '结束日期', datafield: 'endTime', width: 100 },
        { text: '总金额', datafield: 'totalAmount', width: 100 },
        { text: '教练名称', datafield: 'trainerName', width: 100 },
        { text: '操作员编号', datafield: 'operaterId', width: 50 },
        { text: '操作员姓名', datafield: 'operaterName', width: 100 }
    ];
    setWidth(width,columns2)
    function initGrid() {
        var source =
            {
                datatype: "json",
                datafields:
                    [
                        { name: 'memberId' },
                        { name: 'memberName' },
                        { name: 'trainerName' },
                        { name: 'dayNumber' }
                    ],
                localdata:[],
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
        $("#jqxGrid").jqxGrid({
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
                //得到jqxGrid的数据,并进行处理
                // grid2Rows = initGrid2Rows(dataAdapter.recordids);
                // trainers = dataAdapter.recordids;
            },
            rendertoolbar: function (toolbar) {
                $('#jqxGrid').jqxGrid({ toolbarheight: 40});
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('购买私教：<input id="buy-trainer" type="button" value="购买私教"/>' );
                container.append('会员卡号：<input type="text" id="member-id" list="member-id-list" placeholder="会员编号" style="width: 100px;">' +
                    '<datalist id="member-id-list"></datalist>');
                container.append('教练编号：<select id="trainer-id" ><option selected value="">所有教练</option>></select>');
                container.append('<input id="search"  style="margin-left: 10px" type="button" value="搜索" />');
                $("#search").jqxButton();
                $("#buy-trainer").jqxButton();
                //初始化搜索选择框
                for(var i=0;i<members.length;i++){
                    $("#member-id-list").append('<option>'+members[i].id+'</option>')
                }
                for(var i=0;i<trainers.length;i++){
                    $("#trainer-id").append('<option value='+trainers[i].trainerId+'>'+trainers[i].trainerName+'</option>')
                }
                $("#search").on('click', function () {
                    var memberId = $("#member-id").val();
                    var trainerId = $("#trainer-id").val();
                    search(memberId,trainerId);
                });
                $("#search").click();
                $("#buy-trainer").on('click', function () {
                    Operate();
                });
            },
            columns: columns1
        });
        $('#jqxGrid').jqxGrid('sortby', "buyingTime", 'asc');
        $('#jqxGrid').on('rowdoubleclick', function (event) {
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            var data = $('#jqxGrid').jqxGrid('getrowdata', boundIndex);
            var id = $('#jqxGrid').jqxGrid('getrowid', boundIndex);
            var memberId = data.memberId;
            var result = LoadAjaxJson({"memberId":memberId},SEARCH_TRAINER_LOG,url);
            $("#jqxGrid2").jqxGrid('clear');
            console.log(JSON.stringify(result))
            showNoSortByGrid(result.data,"jqxGrid2");
        });
    }
    function initGrid2() {
        var source =
            {
                datatype: "json",
                datafields:
                    [
                        { name: 'startTime' },
                        { name: 'endTime' },
                        { name: 'totalAmount' },
                        { name: 'trainerName'},
                        { name: 'operaterId' },
                        { name: 'operaterName' }

                    ],
                localdata: grid2Rows,
                addrow: function (rowid, rowdata, position, commit) {commit(true);},
                deleterow: function (rowid, commit) {commit(true);},
                updaterow: function (rowid, newdata, commit) {commit(true);}
            };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // initialize jqxGrid
        $("#jqxGrid2").jqxGrid({
            // width: getWidth('jqxGrid'),
            height: height,
            // autoheight: true,
            width:width,
            altrows: true,//行间底色区分
            columnsresize: true,//列可适应调整
            clipboard: false,//屏蔽jqx的复制功能
            enablebrowserselection: true,//允许使用浏览器选择内容功能
            source: dataAdapter,
            showtoolbar: true,
            rendertoolbar: function (toolbar) {
            },
            columns: columns2
        });

    }
    initGrid();
    initGrid2();

//根据不同operateId弹出不同的窗口
    function Operate() {
        var title="租用私教";
        var ii = layer.open({
            async:false,
            title:title,
            content: $('.popUpWindow').html(),
            area: ['400', '300px'],//自定义文本域宽高,
            btn: ['确定', '取消'],
            yes: function(index){
                //操作成功的标志
                var flag = rendTrainer();
                if(flag)
                    layer.close(index);
            },
            btn2: function() {
                //按钮【取消】的回调
                return 0;
            },
            success: function(layero, index){
                initChildWindowBeforeOpen();
            }
        });
    }
    function initChildWindowBeforeOpen() {

        for(var i=0;i<members.length;i++){
            $("#member-id-list-html").append('<option>'+members[i].id+'</option>')
        }
        for(var i=0;i<trainers.length;i++){
            if(trainers[i].status==0)
            $("#trainer-id-html").append('<option value='+trainers[i].trainerId+'>'+trainers[i].trainerName+'</option>')
        }
        var price = getTrainer($("#trainer-id-html").val()).price
        $("#price-html").val(price);
        $("#rend-time-html").val(1);
        $("#total-amount-html").val(parseInt($("#rend-time-html").val())*price);
        $("#end-time-html").val(addDate(formatTime(new Date(),1)));
        $("#total-amount-html").val(parseInt($("#rend-time-html").val())*parseInt( $("#price-html").val()))
        $("#trainer-id-html").change(function () {
            $("#price-html").val(getTrainer($(this).val()).price);
            $("#total-amount-html").val(parseInt($("#rend-time-html").val())*parseInt( $("#price-html").val()))
        });
        $("#rend-time-html").on("input",function () {
            $("#total-amount-html").val(parseInt($("#rend-time-html").val())*parseInt( $("#price-html").val()))
            $("#end-time-html").val(addDate(formatTime(new Date(),parseInt($("#rend-time-html").val()))))
        });
    }
    function rendTrainer() {
        var row = {};
        row.endTime =  $("#end-time-html").val();
        row.memberId = $("#member-id-html").val();
        row.trainerId = $("#trainer-id-html").val();
        row.startTime = formatTime(new Date());
        row.totalAmount = $("#total-amount-html").val();
        row.operaterId = operater.id;
        console.log(JSON.stringify(row))
        var result = LoadAjaxJson(row,REND_TRAINER,url);
        //查询全部
        if(result.success != true)
        {
            alert("失败:"+result.context);
            return false
        }
        search("","");
        return true;
    }
    function getTrainer(trainerId) {
        var t = {};
        for(var i=0;i<trainers.length;i++){
            if(trainerId==trainers[i].trainerId){
                t= trainers[i];break;
            }
        }
        return t;
    }

    function search(memberId,trainerId) {
        var row = {};
        row.trainerId = trainerId+"";
        row.memberId = memberId+"";
        var result = LoadAjaxJson(row,SEARCH,url);
        // console.log(result.data)
        $('#jqxGrid').jqxGrid('clear');
        //  传入json数组[{},{}]
        if(row.trainerId==""&&row.memberId==""){
            show(result.data,"trainer")
        }else{
            show(result.data);
        }
    }
});