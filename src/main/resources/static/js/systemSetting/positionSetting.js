$(document).ready(function () {
    var url = "/systemSetting/position/operate";
    var sourceUrl = "/systemSetting/getPositions";
    var columns=[
        { text: '职位编号', datafield: 'id', width: 200 },
        { text: '职位名称', datafield: 'name', width: 200 }
    ];
    setWidth(width,columns)
    var source =
        {
            datatype: "json",
            datafields:
                [
                    { name: 'id' },
                    { name: 'name' }
                ],
            url: sourceUrl,
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
    $("#jqxGrid").jqxGrid({
        // width: getWidth('jqxGrid'),
        height: window.document.body.offsetHeight*0.805,
        // autoheight: true,
        width:window.document.body.offsetWidth*0.805,
        altrows: true,//行间底色区分
        columnsresize: true,//列可适应调整
        sortable: true,//设置可排序
        showsortcolumnbackground: false,
        source: dataAdapter,
        showtoolbar: true,
        //这里的返回值需要根绝实际情况作调整。
        // 如果params.data获取不到。可以用dataadapter来获取
        // 如dataadapter.recordids[0].*等
        rendertoolbar: function (toolbar) {
            setToolBar();
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
        var title = "添加职位";
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
            title = "修改职位";
        }
        var ii = layer.open({
            async:false,
            title: title,
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
        if(operateId==UPDATE){
            var row = getSelectRow().rowdata;
            console.log(row)
            //初始化弹出表单
            $("#id").val(row['id']);
            $("#name").val(row['name']);
            $("#id").attr("disabled","disabled");
        }else if(operateId == ADD){

        }
    }
    function addItem(){
        var row= getInputRow();
        if(row == false) return false;
        var flag = addItemCommon(row,url);
        return flag;
    }
    function updateItem(){
        var row= getInputRow();
        if(row == false) return false;
        var flag = updateItemCommon(row,url);
        return flag
    }
    function deleteItem() {
        var row = getSelectRow();
        return deleteItemCommon(url,row);
    }
    function getInputRow(){
        var numCells=[{'name':'id','type':1,'beNull':true,'label':'职位编号'}];
        return getInputRowCommon(columns,numCells)
    }
});