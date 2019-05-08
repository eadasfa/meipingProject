$(document).ready(function () {
    var url = '/systemSetting/backupandrestore/operate';
    var isAutoBackupBefore = false;
    var gapHoursBefore = 1;

    init();
    function init() {
        var ii = layer.open({
            type:1,
            async:false,
            title: '备份和恢复',
            content: $('.popUpWindow').html(),
            area: ['400px', '300px'],//自定义文本域宽高,

            btn: ['取消'],
            yes: function(index){

                layer.close(index);
            },
            success: function(layero, index){
                //初始化页面
                var result = LoadAjaxJson({},"isAutoBackup",url);
                console.log(result)
                isAutoBackupBefore = result.success
                if(isAutoBackupBefore == true){
                    $("#auto-backup").attr("checked","checked")
                    $("#number").val(result.context);
                    gapHoursBefore = result.context;
                }
                // $("#jqxLoader").jqxLoader({ html: "<div class='jqx-loader-text'>Show only text in loader...</div>", width: 100, height:35 });
            }
        });

        $("#start-backup").click(function () {
            // var t = layer.load();

            var result = LoadAjaxJson({},BACKUP,url);
            // layer.close(t);
            if(result.success == true){
                alert("备份成功")
            }else {
                alert("备份失败")
            }
        });
        $("#auto-backup-button").click(function () {
            //时间条
            var isAutoBackup = $("#auto-backup").prop("checked");
            var gapHours = $("#number").val()
            if(isAutoBackup&&(gapHours==null||gapHours==0)){
                alert("请输入备份间隔时间");return;
            }
            var r;
            //如果未选中自动备份之后点击确定
            if(!isAutoBackup){
                if(isAutoBackupBefore){
                    if(confirm("是否停止自动备份")) {
                        // var ii = layer.load(1);
                        LoadAjaxJson({}, STOP_AUTO_BACKUP, url, true);
                        // layer.close(ii);
                    }
                } else{
                    alert("请选中自动备份");
                }
                return;
            }
            else if(isAutoBackupBefore&&gapHours==gapHoursBefore) {
                alert("系统已经处于自动备份状态,若要修改，请重新输入时间间隔");return;
            }else if(isAutoBackupBefore&&gapHours!=gapHoursBefore){
                r = confirm("您将会把自动备份时间从"+gapHoursBefore+"hours变为"+gapHours+"hours\n" +
                    "是否确定");
            } else if(!isAutoBackupBefore){
                r = confirm("系统将会启动自动备份,且间隔时间为"+gapHours+"hours\n" +
                    "是否确定?");
            }
            if(r){
                var result;
                var row={};
                row['gapHours'] = gapHours;
                // layer.close(ii);
                result = LoadAjaxJson(row,AUTO_BACKUP,url);
                // layer.close(ii);
                if(result.success = true){
                    isAutoBackupBefore = isAutoBackup;
                    gapHoursBefore = gapHours;
                    alert("自动备份启动成功")
                }else {
                    alert("自动备份启动失败")
                }
            }
        });
        $("#start-restore").click(function () {
            //时间条
            // var ii = layer.load();
            var result = LoadAjaxJson({},RESTORE_DB,url);
            // layer.close(ii);
            if(result.success==true){
                alert("数据库恢复成功")
            }
            else{
                alert(result.context);
            }
        });
    }

});