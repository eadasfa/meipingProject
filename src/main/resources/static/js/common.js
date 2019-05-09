
    function getSelectRow() {return getSelectRowByGrid("jqxGrid")}
    function getSelectRowByGrid(jqxGrid) {
        var selectedrowindex = $("#"+jqxGrid).jqxGrid('getselectedrowindex');
        var rowscount = $("#"+jqxGrid).jqxGrid('getdatainformation').rowscount;
        if (!(selectedrowindex >= 0 && selectedrowindex < rowscount))
            return false;
        var id = $("#"+jqxGrid).jqxGrid('getrowid', selectedrowindex);
        var rowdata = $("#"+jqxGrid).jqxGrid('getrowdatabyid', id);
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
        if(type==1){//这是用正则表达是检查
            return isInteger(s);
        }else if(type==2)
        {
            return isDecimal(s);
        }
        return false;
    }
    function isInteger(s) {
        return /^[0-9]+$/.test(s)
    }
    function isDecimal(s) {//小数
        return /^[0-9]+(\.[0-9]+)?$/.test(s)
    }
    function isSelectedAItem() {
        return isSelectedAItemByGrid("jqxGrid");
    }
    function isSelectedAItemByGrid(jqxGrid) {
        var selectedrowindex = $("#"+jqxGrid).jqxGrid('getselectedrowindex');
        var rowscount = $("#"+jqxGrid).jqxGrid('getdatainformation').rowscount;
        if (selectedrowindex >= 0 && selectedrowindex < rowscount) {
            return true;
        }
        return false;
    }
    function addItemWithResult(row,url) {
        if(row == false) return false;
        var rowscount = $("#jqxGrid").jqxGrid('getdatainformation').rowscount;
        var id = 'id';
        for(var i=0;i<rowscount;i++){
            var rowdata = $('#jqxGrid').jqxGrid('getrowdata', i);
            if(rowdata[id]==row[id]) {
                alert("您输入的编号已存在，请重新输入");
                return false;
            }
        }
        var result = LoadAjaxJson(row,ADD,url);
        if(result==null||result['success']==false){
            alert("添加失败:"+result['context']);
            return false;
        }
        row = changeData(result['data'][0]);
        var commit = $("#jqxGrid").jqxGrid('addrow', null, row);
        sordLikeFormer();
        return result['data'][0];
    }
    function addItemCommon(row,url){
       var flag = addItemWithResult(row,url);
       return !flag?flag:true;
    }
    function deleteItemCommon(url,row) {
        if(row==undefined)
            row = getSelectRow();
        var rowdata = row.rowdata;
        // console.log("DELETE:"+JSON.stringify(rowdata));
        var r=confirm("您确定要删除该记录吗?");
        if(r!=true)
            return false;
        var result=LoadAjaxJson({'id':rowdata['id']},DELETE,url);
        if(result==null||result['success']==false){
            alert("删除失败:"+result['context']);
            return false;
        }
        var commit = $("#jqxGrid").jqxGrid('deleterow', row.id);
        return true;
    }
    function updateItemCommon(row,url){
        if(row == false) return false;
        var result = LoadAjaxJson(row,UPDATE,url);
        // console.log(JSON.stringify(result));
        if(result==null||result['success']==false){
            alert("修改失败:"+result['context']);
            return false;
        }
        var selectedrowindex = $("#jqxGrid").jqxGrid('getselectedrowindex');
        var id = $("#jqxGrid").jqxGrid('getrowid', selectedrowindex);
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
        var result = LoadAjax(row,url,async);
        return result[0];
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
        return result;
    }
    function isValidCommon(data,numCells) {
        // console.log(JSON.stringify(numCells))
        for(var i=0;i<numCells.length;i++){
            var name = numCells[i]['name'];
            var type = numCells[i]['type']

            if(data[name]==null||data[name]==""){
                if(numCells[i]['beNull']==true) continue;
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
    function getInputRowCommon(columns,numCells){
        var row={};
        for(var i=0;i<columns.length;i++){
            row[columns[i].datafield] = $("#"+columns[i].datafield).val();
        }
        // console.log(attributes[0])
        if(!isValidCommon(row,numCells)) return false;
        row = changeData(row,2)
        // console.log("getInputRow:"+row)
        return row;
    }
    //主要是将0，1，2转换为文字
    function changeData(data,type){
        if(!isWardrobe) return data;
        if(type==undefined) type=1;
        var row = data;
        if(type==1&&row.status!=undefined&&(row.status==0||row.status==1||row.status==2))
            row['status'] = row.status==0?"空闲":(row.status==1?"已租":"损坏");
        if(type==2){
            if(row.status=="空闲") row.status=0;
            else if(row.status=="已租") row.status=1;
            else if(row.status=="损坏") row.status=2;
        }
        return row;
    }
    function show(data,table) {
        showNoSort(data,table)
        sordLikeFormer();
    }
    function showNoSort(data,table) {
        showNoSortByGrid(data,"jqxGrid",table)
    }
    function showNoSortByGrid(data,grid,table) {
        var row={};
        for(var i=0;i<data.length;i++) {
            if(table == "trainer"&&data[i].status==0) continue;
            else
                row = changeData(data[i]);
            var commit = $("#"+grid).jqxGrid('addrow', null, row);
        }
    }
    function showOneRow(row,grid,id) {
        if(id==undefined) id=null;
        if(grid==undefined) grid="jqxGrid";
        var commit = $("#"+grid).jqxGrid('addrow', id, row);
    }
    function setToolBar() {
        $('#jqxGrid').jqxGrid({ toolbarheight: 40});
    }
    function formatTime(date) {
        var year = date.getFullYear();
        var month = date.getMonth()+1, month = month < 10 ? '0' + month : month;
        var day = date.getDate(), day =day < 10 ? '0' + day : day;
        return year + '-' + month + '-' + day;
    }
    function addDate(date, days) {
        if(days == undefined || days == '') {
            days = 1;
        }
        var date = new Date(date);
        date.setDate(date.getDate() + days);
        return formatTime(date);
    }
    function DateMinus(start,end){
        var startDay = new Date(start);
        var endDay = new Date(end);
        var days = endDay.getTime() - startDay.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));
        return day;
    }
    function getCardByCardName(name) {
        for(i=0;i<cardTypes.length;i++){
            if(cardTypes[i].name==name)
                return cardTypes[i];
        }
        return {};
    }
    function getMember(id) {
        for(var i=0;i<members.length;i++){
            if(members[i].id==id)
                return members[i];
        }
        return null;
    }
    function getWardrobe(id) {
        for(var i=0;i<wardrobes.length;i++){
            if(wardrobes[i].id==id)
                return wardrobes[i];
        }
        return null;
    }
    function getTrainer(trainerId) {
        for(var i=0;i<trainers.length;i++){
            if(trainerId==trainers[i].trainerId){
                return trainers[i];
            }
        }
        return null;
    }
    function getOperater(id) {
        for(var i=0;i<operaters.length;i++){
            if(id==operaters[i].id){
                return operaters[i];
            }
        }
        return null;
    }
    function getEmployee(id) {
        for(var i=0;i<employees.length;i++){
            if(id==employees[i].id){
                return employees[i];
            }
        }
        return null;
    }
    function getGood(id) {
        for(var i=0;i<goods.length;i++){
            if(id==goods[i].id){
                return goods[i];
            }
        }
        return null;
    }
    layer.config({
        // extend: 'orange/layer.css', //加载您的扩展样式,它自动从theme目录下加载这个文件
        skin: 'layui-layer-molv'  //layui-layer-orange这个就是上面我们定义css 的class
    });
    function setWidth(width,columns,localSplitWidth) {
        if(localSplitWidth==undefined)
            localSplitWidth = splitWidth;
        if(!localSplitWidth)//不平分Width
            return;
        var width2 = width/columns.length;
        for(var i=0;i<columns.length;i++){
            columns[i].width = width2;
        }
    }
