window.addEventListener("resize", function() {
    chinaMapChart.resize();
});

document.write("<script language=javascript src=’SEIR.js’></script>");

var chinaMapChart = echarts.init(document.getElementById('map'));

optionChinaMap = {
   tooltip : {
       trigger: 'item'
   },
   /*
   legend: {
       orient: 'horizontal',//图例的排列方向
       textStyle: {color:'#fff'},
       x:'left',//图例的位置
       y:'20',

       data:['全国数据']
   },
   */

   visualMap: {//颜色的设置  dataRange
       textStyle: {color:'#fff'},
       x: 'left',
       y: 'bottom',
       splitList: [
           {start: 50000},{start: 30000, end: 50000},
           {start: 10000, end: 30000},{start: 3000, end: 10000},
           {start: 500, end: 3000},{start: 100, end: 500},
           {start: 20, end: 100},{start: 1, end: 20},
           {start:0 , end: 1}
       ],
       // text:['高','低'],// 文本，默认为数值文本
       // color: ['#65A2D9', '#E09107', '#A3E00B']
       color: ['#200000', '#4D0000', '#750000','#AE0000', '#EA0000', '#FF2D2D' , '#FF7575' , '#FFB5B5','#FFECEC']  
   },
   // roamController: {//控制地图的上下左右放大缩小
   //     show: true,
   //     x: 'right',
   //     mapTypeControl: {
   //         'china': true
   //     }
   // },
   series : [
       {
           name: '全国数据',
           type: 'map',
           mapType: 'china',
           zoom: 1.1,
           roam: false,//是否开启鼠标缩放和平移漫游
           itemStyle:{//地图区域的多边形 图形样式
               normal:{//是图形在默认状态下的样式
                   label:{
                       show: true,
                       textStyle: {color: "rgb(249, 249, 249)"}
                   }
               },
               emphasis:{//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                   label:{show:true},
               }
           },
           top:"100",//组件距离容器的距离
           data: data1
       }
   ]
};
chinaMapChart.setOption(optionChinaMap, true);

//折线图
var lineChart_hubei = echarts.init(document.getElementById('line_hubei'));

lineOption_hubei = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['当前感染人数', '当前潜伏人数', '当前住院人数', '当前康复人数'],
        textStyle:{
            color:'white'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: 'white',
                width: 1
            }
        },
        data: data_date
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: 'white',
                width: 1
            }
        },
    },
    color:['yellow','green','red','blue'],
    series: [
        {
            name: '当前感染人数',
            type: 'line', 
            data: data_I_hubei
        },
        {
            name: '当前潜伏人数',
            type: 'line',
            data: data_E_hubei
        },
        {
            name: '当前住院人数',
            type: 'line',
            data: data_H_hubei
        },
        {
            name: '当前康复人数',
            type: 'line',
            data: data_R_hubei
        }
    ]
};
lineChart_hubei.setOption(lineOption_hubei, true);

var lineChart_zhejiang = echarts.init(document.getElementById('line_zhejiang'));

lineOption_zhejiang = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['当前感染人数', '当前潜伏人数', '当前住院人数', '当前康复人数'],
        textStyle:{
            color:'white'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: 'white',
                width: 1
            }
        },
        data: data_date
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: 'white',
                width: 1
            }
        },
    },
    color:['yellow','green','red','blue'],
    series: [
        {
            name: '当前感染人数',
            type: 'line', 
            data: data_I_zhejiang
        },
        {
            name: '当前潜伏人数',
            type: 'line',
            data: data_E_zhejiang
        },
        {
            name: '当前住院人数',
            type: 'line',
            data: data_H_zhejiang
        },
        {
            name: '当前康复人数',
            type: 'line',
            data: data_R_zhejiang
        }
    ]
};
lineChart_zhejiang.setOption(lineOption_zhejiang, true);