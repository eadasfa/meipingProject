$(document).ready(function () {
    var url = "/systemSetting/employee/operate";
    var sourceUrl = "/systemSetting/getEmployees";

    var columns=[
        { text: '员工编号', datafield: 'id', width: 200 },
        { text: '员工姓名', datafield: 'name', width: 200 },
        { text: '员工电话', datafield: 'teleNumber', width: 180 },
        { text: '员工职位', datafield: 'position', width: 180 }
    ];
    setWidth(width,columns)
    var positions = LoadAjaxJson({},"",
        "/systemSetting/getPosition").data;
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id' },
                    { name: 'name' },
                    { name: 'teleNumber' },
                    { name: 'position' }
                ],
            url: sourceUrl,
            async: false,
            addrow: function (rowid, rowdata, position, commit) {
                // synchronize with the server - send insert command
                // call commit with parameter true if the synchronization with the server is successful
                //and with parameter false if the synchronization failed.
                // you can pass additional argument to the commit callback which represents the new ID if it is generated from a DB.
                commit(true);
            },
            deleterow: function (rowid, commit) {
                // synchronize with the server - send delete command
                // call commit with parameter true if the synchronization with the server is successful
                //and with parameter false if the synchronization failed.
                commit(true);
            },
            updaterow: function (rowid, newdata, commit) {
                // synchronize with the server - send update command
                // call commit with parameter true if the synchronization with the server is successful
                // and with parameter false if the synchronization failed.
                commit(true);
            }
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
            employees = dataAdapter.recordids;
        },
        rendertoolbar: function (toolbar) {
            setToolBar();
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<input id="addrowbutton" type="button" value="增加" />');
            container.append('<input style="margin-left: 10px;" id="updaterowbutton" type="button" value="修改" />');
            container.append('<input style="margin-left: 10px;" id="deleterowbutton" type="button" value="删除" />');
            container.append('<select style="margin-left: 15px;" id="searchkey"></select>');
            container.append('<input style="margin-left: 10px; width: 80px" id="searchvalue" list="none"/>' +
                                '<datalist id="inputlist"></datalist>');
            container.append('<span><img style="margin-left:5px;" id = "search" alt="search" width="16" height="16" src="img/search.png" /></span>');
            $("#addrowbutton").jqxButton();
            $("#deleterowbutton").jqxButton();
            $("#updaterowbutton").jqxButton();
            //初始化搜索选择框
            for(var i=0;i<columns.length;i++){
                var temp = columns[i];
                $("#searchkey").append('<option value='+temp.datafield+'>'+temp.text+'</option>')
            }
            //初始化position选择框
            for(var i=0;i<positions.length;i++){
                var temp = positions[i];
                $("#inputlist").append('<option>'+temp.name+'</option>')
            }
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
                search(key,value);
            });
            $("#searchkey").change(function () {
                if($(this).val()=="position")
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
        if(operateId==DELETE){
            if(isSelectedAItem()) deleteItem(url);
            else alert("请先选中要删除的记录！")
            return;
        }
        if(operateId==UPDATE){
            if(!isSelectedAItem()){
                alert("请先选中要更新的记录！")
                return;
            }
            title = "修改员工信息";
        }
        var ii = layer.open({
            async:false,
            title:title,
            content: $('.popUpWindow').html(),
            area: ['400', '300px'],//自定义文本域宽高,
            btn: ['确定', '取消'],
            yes: function(index){
                //操作成功的标志
                var flag=true;
                if(operateId==ADD)
                    flag = addItem();
                else if(operateId == UPDATE)
                    flag = updateItem();
                else if(operateId == ADDMANY)
                    flag = addManyItem();
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

    function initChildWindowBeforeOpen(operateId){
        for(var i=0;i<positions.length;i++){
            var temp = positions[i];
            $("#position").append('<option value='+temp.name+'>'+temp.name+'</option>')
        }
        $("#position").change(function () {
            var position = $(this).val();
            if(position=="私教")
                $("#price").attr("disabled",false);
            else $("#price").attr("disabled","disabled");
        });
        if(operateId==UPDATE){
            var row = getSelectRow().rowdata;
            // console.log(row)
            //初始化弹出表单
            $("#id").val(row['id']);
            $("#name").val(row['name']);
            $("#teleNumber").val(row['teleNumber']);
            $("#position").val(row['position']);
            $("#id").attr("disabled","disabled");
            if($("#position").val()=="私教"){
                $("#price").attr("disabled",false);
                var trainer = getTrainer(row['id']);
                // console.log(JSON.stringify(trainer))
                if(trainer!=false)
                    $("#price").val(trainer.price);
            }
        }
    }
    function getTrainer(id) {
        var result = LoadAjaxJson({"trainerId":id},SEARCH_TRAINER_BY_ID,url);
        if(result.success==false)
            return false;
        return (result.data)[0];
    }
    function addItem(){
        var row= getInputRow();
        // console.log("getInputRow:"+JSON.stringify(row))
        if(row == false) return false;
        employees.push(row)
        return addItemCommon(row,url);
    }
    function updateItem(){
        var row= getInputRow();
        if(row == false) return false;
        for(var i=0;i<employees.length;i++){
            if(row.id==employees[i].id){
                employees[i] = row;
            }
        }
        return updateItemCommon(row,url);
    }
    function deleteItem(url) {
        var row = getSelectRow();
        for(var i=0;i<employees.length;i++){
            if(employees[i].id==row.id)
                employees.splice(i,1);
                break;
        }
        return deleteItemCommon(url,row);
    }
    function getInputRow(){
        var numCells=[{'name':'id','type':1,'beNull':true,'label':'员工编号'},
        {'name':'teleNumber','type':1,'label':'员工电话'}];
        var row = getInputRowCommon(columns,numCells);
        row['price'] = $("#price").val();
        if($("#price").attr("disabled")!='disabled'&&!isInteger(row.price)){
            alert("价格必须是整数:"+row.price+" "+isInteger(row.price))
            return false;
        }
        return row;
    }
    function search(key,value) {

        if((key=="id"||key=="teleNumber")&&(value!=null&&value!=undefined&&value!="")&&
            !(/^[0-9]+$/.test(value))) {
            alert("员工"+(key=="id"?"编号":"电话")+"无效！请重新输入")
            return false;
        }
        var row={};
        row['key'] = key;
        row['value'] = value
        // console.log("row:"+row['key']+","+row['value'])
        var result = LoadAjaxJson(row,SEARCH,url);
        console.log(result.data)
        $('#jqxGrid').jqxGrid('clear');
        //  传入json数组[{},{}]
        show(result.data)
    }
});