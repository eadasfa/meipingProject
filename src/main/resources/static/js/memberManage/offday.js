$(document).ready(function () {
    var url = "/memberManage/off_day/operate";
    var sourceUrl = "/memberManage/getOffDays";
    if(members.length==0)
        members = LoadAjax({},"/memberManage/getMembers",false)
    var columns=[
        { text: '记录Id', datafield: 'id', width: 80 },
        { text: '请假时间', datafield: 'operateTime', width: 150 },
        { text: '会员编号', datafield: 'memberId', width: 150 },
        { text: '会员姓名', datafield: 'memberName', width: 150 },
        { text: '开始时间', datafield: 'startTime', width: 150 },
        { text: '结束时间', datafield: 'endTime', width: 150 },
        { text: '备注', datafield: 'context', width: 150 }
    ];
    setWidth(width,columns)
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id' },
                    { name: 'operateTime' },
                    { name: 'memberId' },
                    { name: 'memberName' },
                    { name: 'startTime'},
                    { name: 'endTime'},
                    { name:'context'}
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

        rendertoolbar: function (toolbar) {
            setToolBar();
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<input id="addrowbutton" type="button" value="请假" />');
            container.append('<input id="deleterowbutton" value="销假" type="button"  style="margin-left: 10px;"/>');
            container.append('<input style="margin-left: 10px; width: 80px" placeholder="开始时间" id="from" list="none"/>')
            container.append('<input style="margin-left: 10px; width: 80px" placeholder="结束时间" id="to" list="none"/>')
            container.append('<input style="margin-left: 10px; width: 80px" id="searchvalue" list="none"/>' +
                '<datalist id="inputlist"></datalist>');
            container.append('<span><img style="margin-left:5px;" id = "search" alt="search" width="16" height="16" src="img/search.png" /></span>');
            $("#addrowbutton").jqxButton();
            $("#deleterowbutton").jqxButton();
            layui.laydate.render({elem: '#from'}); //指定元素
            layui.laydate.render({elem: '#to'}); //指定元素
            //初始化会员卡类型选择框
            for(var i=0;i<members.length;i++){
                $("#inputlist").append('<option>'+members[i].id+'</option>')
            }
            // create new row.
            $("#addrowbutton").on('click', function () {
                Operate(ADD);
            });
            // delete row.
            $("#deleterowbutton").on('click', function () {
                Operate(DELETE);
            });
            $("#search").on('click', function () {
                var from = $("#from").val();
                var to = $("#to").val();
                var memberId = $("#searchvalue").val();
                search(from,to,memberId);
            });
        },
        columns: columns
    });
    // $('#jqxGrid').on('rowdoubleclick', function (event) {
    //     var args = event.args;
    //     // row's bound index.
    //     var boundIndex = args.rowindex;
    //     var data = $('#jqxGrid').jqxGrid('getrowdata', boundIndex);
    //     var id = $('#jqxGrid').jqxGrid('getrowid', boundIndex);
    //     Operate(UPDATE);
    // });
    //根据不同operateId弹出不同的窗口
    function Operate(operateId) {
        var title="请假";
        var popUpWindow = "popUpWindow";
        if(operateId==DELETE){
            if(isSelectedAItem()) deleteItem(url);
            else alert("请先选中要删除的记录！")
            return;
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
        console.log("getInputRow:"+JSON.stringify(row))
        if(row == false) return false;
        row["operaterId"] = operater.id;
        return addItemCommon(row,url);
    }

    function deleteItem(url) {
        var r = confirm("销假？")
        if(r) {
            var row = getSelectRow();
            return deleteItemCommon(url,row);
        }
    }
    function getInputRow(){
        var numCells=[{'name':'memberId','type':1,'beNull':false,'label':'会员卡号'}];
        return getInputRowCommon(columns,numCells)
    }
    function search(from,to,memberId) {
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
        var row={};
        row['id'] = $("#id").val();
        row['from'] = from;
        row['to'] = to
        row['memberId'] = memberId;
        var result = LoadAjaxJson(row,SEARCH,url,false);
        // console.log(data)
        $('#jqxGrid').jqxGrid('clear');
        //  传入json数组[{},{}]
        show(result.data)
    }
    function initChildWindowBeforeOpen(operateId){
        layui.laydate.render({elem: '#startTime'}); //指定元素
        layui.laydate.render({elem: '#endTime'}); //指定元素
        for (var i=0;i<members.length;i++){
            $("#memberId-list").append('<option>'+members[i].id+'</option>')
        }
        $("#memberId").on('change',function () {
            var member = getMember($("#memberId").val())
            $("#memberName").val(member.name);
        });
    }

});