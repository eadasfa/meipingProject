$(document).ready(function () {
    var url = "/systemSetting/wardrobe/operate";
    var ADD = 'add';
    var UPDATE = 'update';
    var DELETE = 'delete';
    var ADDMANY = 'addMany';
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id' },
                    { name: 'name' },
                    { name: 'status' },
                ],
            url: "/systemSetting/getWardrobes",
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
    $("#jqxGrid").jqxGrid(
        {
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
            //这里的返回值需要根绝实际情况作调整。
            // 如果params.data获取不到。可以用dataadapter来获取
            // 如dataadapter.recordids[0].*等
            ready:function(){//将0，1，2 映射
                var map = {'0':"空闲",'1':"已租",'2':"损坏"}
                var data = dataAdapter.recordids;
                for(var i=0;i<data.length;i++){
                     var commit = $("#jqxGrid").jqxGrid('updaterow', i, changeData(data[i]));
                }
            },
            rendertoolbar: function (toolbar) {
                //console.log(dataAdapter.recordids[0].name)
                //   var data = dataAdapter.recordids;
                //   console.log(data[0].name)
                //   var me = this;
                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('<input id="addrowbutton" type="button" value="增加" />');
                container.append('<input id="addrowmanybutton" type="button" value="批量添加" />');
                container.append('<input style="margin-left: 10px;" id="updaterowbutton" type="button" value="修改" />');
                container.append('<input style="margin-left: 10px;" id="deleterowbutton" type="button" value="删除" />');
                $("#addrowbutton").jqxButton();
                $("#addrowmanybutton").jqxButton();
                $("#deleterowbutton").jqxButton();
                $("#updaterowbutton").jqxButton();
                // update row.
                $("#updaterowbutton").on('click', function () {
                    cardOperate(UPDATE);
                });
                // create new row.
                $("#addrowbutton").on('click', function () {
                    cardOperate(ADD);
                });
                $("#addrowmanybutton").on('click', function () {
                    cardOperate(ADDMANY);
                });
                // delete row.
                $("#deleterowbutton").on('click', function () {
                    cardOperate(DELETE);
                });
            },
            columns: [
                { text: '衣柜编号', datafield: 'id', width: 200 },
                { text: '衣柜名称', datafield: 'name', width: 200 },
                { text: '衣柜状态', datafield: 'status', width: 180 }
            ]
        });

    //根据不同operateId弹出不同的窗口
    function cardOperate(operateId) {
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
        if(operateId==UPDATE){
            var row = getSelectRow().rowdata;
            console.log(row)
            //初始化弹出表单
            $("#id").val(row['id']);
            $("#name").val(row['name']);
            $("#status").val(row['status']);
            $("#id").attr("disabled","disabled");
        }else if(operateId == ADD){
            $("#status").val("空闲");
        }else if(operateId == ADDMANY){
            $("#name1").text("起始编号");
            $("#id").attr("placeholder","起始编号")
            $("#name2").text("结束编号");
            $("#name").attr("placeholder","结束编号")
            $("#status").val("空闲");
        }
    }
    function addItem(){
        var row= getInputRow();
        if(row == false) return false;
        return addItemCommon(row,url);
    }

    function addManyItem() {
        var row={};
        row['from'] = $("#id").val();//起始编号
        row['to'] = $("#name").val();//结束编号
        row['status'] = $("#status").val();
        row['status'] = row['status']=="空闲"?0:(row['status']=="已租"?1:2);
        var result = LoadAjaxJson(row,"addMany",url);
        if(result['success']==false+""){
            alert("添加失败:"+result['context']);
            return false;
        }
        alert(result['context']);
        show(result.data);
        return true;
    }
    function show(data) {
       for(var i=0;i<data.length;i++) {
           var row = changeData(data[i]);
           var commit = $("#jqxGrid").jqxGrid('addrow', id, row);
       }
        sordLikeFormer();
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
        var attributs = ['id','name','status'];
        var numCells=[{'name':'id','type':1,'label':'衣柜编号'}];
        return getInputRowCommon(attributs,numCells)
    }

});