
    function getSelectRow() {
        var selectedrowindex = $("#jqxGrid").jqxGrid('getselectedrowindex');
        var rowscount = $("#jqxGrid").jqxGrid('getdatainformation').rowscount;
        if (!(selectedrowindex >= 0 && selectedrowindex < rowscount))
            return false;
        // var rowdata = $('#jqxGrid').jqxGrid('getrowdata', selectedrowindex);
        //getrowdata 参数为boundindex
        var id = $("#jqxGrid").jqxGrid('getrowid', selectedrowindex);
        // console.log("selectedrowindex:"+selectedrowindex)
        // console.log("id:"+id);
        var rowdata = $('#jqxGrid').jqxGrid('getrowdatabyid', id);
        return {"rowdata":rowdata,'id':id};
    }
    function sordLikeFormer() {
        var sortcolumn = $('#jqxGrid').jqxGrid('getsortcolumn');
        // console.log(sortcolumn)
        if(sortcolumn==null)
            sortcolumn = 'id';
        $('#jqxGrid').jqxGrid('sortby', sortcolumn, 'asc');
    }
    function insertId(id) {
        var rows = $('#jqxGrid').jqxGrid('getrows');
        var i=0;
        for(;i<rows.length;i++){
            if(rows[i].id>=id){
                break;
            }
        }
        // console.log("i="+i)
        return i+"";
    }
    function isAllNumber(s,type) {

        //1为必须纯数字,2为可以是小数
        if(type==1&&/^[0-9]+$/.test(s)){//这是用正则表达是检查
            return true;
        }else if(type==2&&/^[0-9]+(\.[0-9]+)?$/ .test(s))
        {
            return true;
        }
        return false;
    }
    function isSelectedAItem() {
        var selectedrowindex = $("#jqxGrid").jqxGrid('getselectedrowindex');
        var rowscount = $("#jqxGrid").jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            return true;
        }
        return false;
    }
    function addItemCommon(row,url){
        if(row == false) return false;
        var rowscount = $("#jqxGrid").jqxGrid('getdatainformation').rowscount;
        for(var i=0;i<rowscount;i++){
            var rowdata = $('#jqxGrid').jqxGrid('getrowdata', i);
            if(rowdata['id']==row['id']) {
                alert("您输入的编号已存在，请重新输入");
                return false;
            }
        }
        var result = LoadAjaxJson(row,"add",url);
        console.log(JSON.stringify(result));
        if(result['success']==false){
            alert("添加失败:"+result['context']);
            return false;
        }
        // var id = insertId(row['id'])
        if(row.status!=undefined)
            row = changeData(result['data'][0]);
        var commit = $("#jqxGrid").jqxGrid('addrow', id, row);
        // var rowboundindex = $('#jqxGrid').jqxGrid('getrowboundindexbyid', id);
        //滚动到这一行
        // $("#jqxGrid").jqxGrid('ensurerowvisible', rowboundindex);
        // $('#jqxGrid').jqxGrid('refresh');
        sordLikeFormer();
        return true;
    }
    function deleteItemCommon(url) {
        var row = getSelectRow();
        var rowdata = row.rowdata;
        // console.log("DELETE:"+JSON.stringify(rowdata));
        var r=confirm("您确定要删除该记录吗?");
        if(r!=true)
            return false;
        var result=LoadAjaxJson({'id':rowdata['id']},'delete',url);
        if(result['success']==false){
            alert("删除失败:"+result['context']);
            return false;
        }
        var commit = $("#jqxGrid").jqxGrid('deleterow', row.id);
        return true;
    }
    function updateItemCommon(row,url){
        if(row == false) return false;
        var result = LoadAjaxJson(row,"update",url);
        // console.log(JSON.stringify(result));
        if(result['success']==false+""){
            alert("修改失败:"+result['context']);
            return false;
        }
        var selectedrowindex = $("#jqxGrid").jqxGrid('getselectedrowindex');
        var id = $("#jqxGrid").jqxGrid('getrowid', selectedrowindex);
        if(row.status!=undefined)
            row = changeData(result['data'][0]);
        var commit = $("#jqxGrid").jqxGrid('updaterow', id, row);
        // $("#jqxGrid").jqxGrid('ensurerowvisible', selectedrowindex);

        return true;
    }
    //operaterId{1:增加，2：修改，3：删除，4：查询}
    //默认同步
    function LoadAjaxJson(row,operateId,url,async){
        row['operateId'] = operateId;
        if(async==undefined)
            async = false;
        return LoadAjax(row,url,async);
    }
    function LoadAjax(row,url,async){
        var result=[];
        $.ajax({
            type: 'post',
            async: async,
            cache: false,
            url: url,
            data: row,
            dataType: "json",
            success:function (data) {
                result = data;
                // console.log(JSON.stringify(result)+":ajax");
            }
        });
        //返回为json数据,success,context,data
        return result[0];
    }
    function isValidCommon(data,numCells) {
        // console.log("valid")
        for(var i=0;i<numCells.length;i++){
            var name = numCells[i]['name'];
            var type = numCells[i]['type']
            if(data[name]==null){
                alert("'"+numCells[i]['label']+"'不能为空");
                return false;
            }
            else if(!isAllNumber(data[name],type)){
                alert("'"+numCells[i]['label']+"'无效,请重新输入");
                return false;
            }
        }
        return true;
    }
    function getInputRowCommon(attributes,numCells){
        var row={};

        for(var i=0;i<attributes.length;i++){
            row[attributes[i]] = $("#"+attributes[i]).val();
        }
        // console.log(attributes[0])
        if(!isValidCommon(row,numCells)) return false;
        if(row['status']!=undefined)
            row['status'] = row['status']=="空闲"?0:(row['status']=="已租"?1:2);
        // console.log("getInputRow:"+row)
        return row;
    }
    //主要是将0，1，2转换为文字
    function changeData(data){
        var row = data;
        row['status'] = row.status==0?"空闲":(row.status==1?"已租":"损坏");
        return row;
    }
