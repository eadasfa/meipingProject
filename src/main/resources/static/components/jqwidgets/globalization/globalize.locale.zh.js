;(function($){
    $.jqx._jqxGrid = $.jqx._jqxGrid || {};
    $.extend($.jqx._jqxGrid.prototype, {
        gridlocalization: {
            "/": "/",
            ":": ":",
            firstDay: 1,
            days: {
                names: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                namesAbbr: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                namesShort: ["日", "一", "二", "三", "四", "五", "六"]
            },
            months: {
                names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],
                namesAbbr: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""]
            },
            AM: ["上午", "上午", "上午"],
            PM: ["下午", "下午", "下午"],
            eras: [{"name": "公元", "start": null, "offset": 0}],
            twoDigitYearMax: 2099,
            patterns: {
                d: "yyyy/M/d",
                D: "yyyy'年'M'月'd'日'",
                t: "H:mm",
                T: "H:mm:ss",
                f: "yyyy'年'M'月'd'日' H:mm",
                F: "yyyy'年'M'月'd'日' H:mm:ss",
                M: "M'月'd'日'",
                Y: "yyyy'年'M'月'",
                S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
                ISO: "yyyy-MM-dd hh:mm:ss",
                ISO2: "yyyy-MM-dd HH:mm:ss",
                d1: "dd.MM.yyyy",
                d2: "dd-MM-yyyy",
                d3: "dd-MMMM-yyyy",
                d4: "dd-MM-yy",
                d5: "H:mm",
                d6: "HH:mm",
                d7: "HH:mm tt",
                d8: "dd/MMMM/yyyy",
                d9: "MMMM-dd",
                d10: "MM-dd",
                d11: "MM-dd-yyyy"
            },
            percentsymbol: "%",
            currencysymbol: "¥",
            currencysymbolposition: "before",
            decimalseparator: ".",
            thousandsseparator: ",",
            pagergotopagestring: "前往:",
            pagershowrowsstring: "每页:",
            pagerrangestring: " 共 ",
            pagerpreviousbuttonstring: "上页",
            pagernextbuttonstring: "下页",
            pagerfirstbuttonstring: "首页",
            pagerlastbuttonstring: "末页",
            groupsheaderstring: "拖动一列并将其放在此处按该列分组", //"Drag a column and drop it here to group by that column",
            sortascendingstring: "升序排序",
            sortdescendingstring: "降序排序",
            sortremovestring: "删除排序",
            groupbystring: "按此列分组",//"Group By this column",
            groupremovestring: "移除分组",//"Remove from groups",
            filterclearstring: "清除",//"Clear",
            filterstring: "过滤",//"Filter",
            filtershowrowstring: "显示行:",//"Show rows where:",
            filtershowrowdatestring: "显示日期行",//"Show rows where date:",
            filterorconditionstring: "或",//"Or",
            filterandconditionstring: "与",//"And",
            filterselectallstring: "(全选)",//"(Select All)",
            filterchoosestring: "请选择",//"Please Choose:",
            filterstringcomparisonoperators: ["空", "非空", "包含", "包含(匹配)", "不含", "不含(匹配)", "以...开始", "以...开始(匹配)", "以...结束", "以...结束(匹配)", "等于", "等于(匹配)", "空值", "非空值"],
            filternumericcomparisonoperators: ["等于", "不等", "小于", "小于等于", "大于", "大于等于", "空值", "非空值"],
            filterdatecomparisonoperators: ["等于", "不等", "小于", "小于等于", "大于", "大于等于", "空值", "非空值"],
            filterbooleancomparisonoperators: ["等于", "不等于"],// ["equal", "not equal"],
            validationstring: "输入的值无效",//"Entered value is not valid",
            emptydatastring: "无数据显示",//"No data to display",
            filterselectstring: "选择过滤",//"Select Filter",
            loadtext: "读取中...",//"Loading...",
            clearstring: "清除",//"Clear",
            todaystring: "今日",//"Today",
            addrowstring: "添加",//"Add",
            udpaterowstring: "更新",//"Update",
            deleterowstring: "删除",//"Delete",
            resetrowstring: "重置",//"Reset",
            everpresentrowplaceholder: "输入"//"Enter "
        },
        _getaggregatename: function (obj) {
            var name = obj;
            switch (obj) {
                case 'min': name = '最小值'; break;
                case 'max': name = '最大值'; break;
                case 'count': name = '统计'; break;
                case 'avg': name = '平均值'; break;
                case 'product': name = '乘积'; break;
                case 'var': name = 'Var'; break;
                case 'stdevp': name = 'StDevP'; break;
                case 'stdev': name = 'StDev'; break;
                case 'varp': name = '总体方差'; break;
                case 'sum': name = '合计'; break;
            }
            if (obj === name && typeof(name) != 'string') {
                for (var myObj in obj) {
                    name = myObj;
                    break;
                }
            }
            return name;
        },
        localizestrings: function(){

        }
    });
})(jqxBaseFramework);
