$(document).ready(function () {
    var url = "/systemSetting/operater/operate";
    var sourceUrl = "/systemSetting/getOperaters";
    var columns=[
        { text: '员工编号', datafield: 'id', width: 200 },
        { text: '员工姓名', datafield: 'name', width: 200 },
        { text: '员工权限', datafield: 'permission', width: 180 },
        { text: '员工职位', datafield: 'position', width: 180 }
    ];
    var employees = LoadAjax({},"/systemSetting/getEmployees",false)
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id' },
                    { name: 'name' },
                    { name: 'permission' },
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
        rendertoolbar: function (toolbar) {
            setToolBar();
            operaters = dataAdapter.recordids;
            var container = $("<div style='margin: 5px;'></div>");
            toolbar.append(container);
            container.append('<input id="addrowbutton" type="button" value="增加" />');
            container.append('<input style="margin-left: 10px;" id="updaterowbutton" type="button" value="修改" />');
            container.append('<input style="margin-left: 10px;" id="deleterowbutton" type="button" value="删除" />');
            $("#addrowbutton").jqxButton();
            $("#deleterowbutton").jqxButton();
            $("#updaterowbutton").jqxButton();

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
        }
        var ii = layer.open({
            async:false,
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
        function changeText(athis) {
            if($(athis).val().length==0){
                $(athis).attr("type","text");
            }
        }
        if(operateId==UPDATE){
            var row = getSelectRow().rowdata;
            console.log(row)
            //初始化弹出表单
            $("#id").val(row['id']);
            $("#name").val(row['name']);
            $("#permission").val(row['permission']);
            $("#position").val(row['position']);
            $("#id").attr("disabled","disabled");
            $("#position").attr("disabled","disabled");
            $("#name").attr("disabled","disabled");
        }if(operateId==ADD){
            $("#id").change(function () {
                for(var i=0;i<employees.length;i++){
                    if($(this).val()==employees[i].id){
                        $("#name").val(employees[i].name);
                        $("#position").val(employees[i].position);
                        $("#position").attr("disabled","disabled");
                        $("#name").attr("disabled","disabled");
                    }
                }
            });
            for(var i=0;i<employees.length;i++){
                $("#id-list").append('<option>'+employees[i].id+'</option>');
            }
        }
    }
    function addItem(){

        var row= getInputRow();
        // console.log("getInputRow:"+JSON.stringify(row))
        if(row == false) return false;

        for(var i=0;i<employees.length&&row['id']!=employees[i].id;i++);
        if(i==employees.length) {
            alert("您输入的员工编号不存在");
            return false;
        }

        return addItemCommon(row,url);
    }
    function updateItem(){
        var row= getInputRow();
        if(row == false) return false;
        return updateItemCommon(row,url);
    }
    function deleteItem() {
        return deleteItemCommon(url);
    }
    function getInputRow(){
        var numCells=[{'name':'id','type':1,'label':'员工编号'},
            {'name':'permission','type':1,'label':'员工权限'}];
        row =  getInputRowCommon(columns,numCells)
        if(row == false) return false;
        var pw = $("#password").val();
        if(pw==null||pw==undefined) {alert("请输入密码");return false;}
        else if(pw!=$("#check_password").val()) {alert("密码输入不一致");return false;}
        row["password"] = pw;
        return row;
    }
});