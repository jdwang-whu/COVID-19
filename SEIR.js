var S,E,I,R,Sq,Eq,H;
var Hubei = new city(59170000,0,0,0,0,0,0,0,100000,0,0);
var Zhejiang = new city(57370000,0,0,0,0,0,0,0,0,100000,0);
var data_date=[1]
var data_I_hubei=[]
var data_E_hubei=[]
var data_H_hubei=[]
var data_R_hubei=[]
var data_I_zhejiang=[0]
var data_E_zhejiang=[0]
var data_H_zhejiang=[0]
var data_R_zhejiang=[0]
function save(){
    S=parseInt(document.getElementById("S").value),
    E=parseInt(document.getElementById("E").value),
    I=parseInt(document.getElementById("I").value),
    R=parseInt(document.getElementById("R").value),
    Sq=parseInt(document.getElementById("Sq").value),
    Eq=parseInt(document.getElementById("Eq").value),
    H=parseInt(document.getElementById("H").value);
    document.getElementById("S").disabled='disabled';
    document.getElementById("E").disabled='disabled';
    document.getElementById("I").disabled='disabled';
    document.getElementById("R").disabled='disabled';
    document.getElementById("Sq").disabled='disabled';
    document.getElementById("Eq").disabled='disabled';
    document.getElementById("H").disabled='disabled';
    Hubei.S=S;
    Hubei.E=E;
    Hubei.I=I;
    Hubei.R=R;
    Hubei.Eq=Eq;
    Hubei.Sq=Sq;
    Hubei.H=H;
    data_I_hubei.push(Hubei.I);
    data_E_hubei.push(Hubei.E);
    data_H_hubei.push(Hubei.H);
    data_R_hubei.push(Hubei.R);

} 

//q为易感者隔离比例
var q=1.0e-6;
//Ir为感染者的传染概率
var Ir,Ir_2019Cov=2.05e-9,Ir_SARS=2.05e-10;
//c为接触率
var c=2.0;
//release_rate为解除隔离速率，一般为一个潜伏期长短
var release_rate=1.0/14;
//Er为潜伏者相对于感染者的传染概率比值
var Er=1.0;
//E_To_I_Rate为潜伏者向感染者的转化比例
var E_To_I_Rate=1.0/7;
//death_rate为病死率
var death_rate=0.00027;
//q_I为感染者的隔离速率
var q_I=0.13;
//r_I为感染者的恢复率
var r_I=0.007;
//Eq_to_H为隔离潜伏者向隔离感染者的转化速率
var Eq_to_H=0.13;
//r_H为住院患者的恢复率
var r_H=0.014;

function SEIR(S,E,I,R,Sq,Eq,H,q,Ir,c,c_effective,release_rate,Er,E_To_I_Rate,death_rate,q_I,r_I,Eq_to_H,r_H){
    let S_temp,E_temp,I_temp,Sq_temp,Eq_temp,H_temp,R_temp;
    S_temp=S-(c*c_effective*Ir+c*c_effective*q*(1-Ir))*S*(I+Er*E)+release_rate*Sq;
    E_temp=E+c*c_effective*Ir*(1-q)*S*(I+Er*E)-E_To_I_Rate*E;
    I_temp=I+E_To_I_Rate*E-(q_I+death_rate+r_I)*I;
    Sq_temp=Sq+c*c_effective*q*(1-Ir)*S*(I+Er*E)-release_rate*Sq;
    Eq_temp=Eq+c*c_effective*Ir*q*S*(I+Er*E)-Eq_to_H*Eq;
    H_temp=H+q_I*I+Eq_to_H*Eq-(death_rate+r_H)*H;
    R_temp=R+r_I*I+r_H*H;
    return [S_temp,E_temp,I_temp,R_temp,Sq_temp,Eq_temp,H_temp];
}

function SEIR_prediction(){
    if (document.getElementById('S').disabled){
        let c_effective=1.0-parseFloat(document.getElementById("mask").value);//c_effective为有效接触系数
        let q_I=parseFloat(document.getElementById("isolation").value);//q_I为感染者隔离速率
        let radio=document.getElementsByName("infect");
        for(i=0;i<radio.length;i++){
            if(radio[i].checked){
                var Ir_type=radio[i].value
            }
        }
        switch(Ir_type){
            case '2019-nCoV':
                Ir=Ir_2019Cov;
                break;
            case 'SARS':
                Ir=Ir_SARS;
                break;
            default:
                alert("传染力输入获取有误");
        }
        let hubei_temp=SEIR(Hubei.S,Hubei.E,Hubei.I,Hubei.R,Hubei.Sq,Hubei.Eq,Hubei.H,q,Ir,c,c_effective,release_rate,Er,E_To_I_Rate,death_rate,q_I,r_I,Eq_to_H,r_H);
        let zhejiang_temp=SEIR(Zhejiang.S,Zhejiang.E,Zhejiang.I,Zhejiang.R,Zhejiang.Sq,Zhejiang.Eq,Zhejiang.H,q,Ir,c,c_effective,release_rate,Er,E_To_I_Rate,death_rate,q_I,r_I,Eq_to_H,r_H);
        let hubei_S_rate=Hubei.S/(Hubei.S+Hubei.I+Hubei.E);//确定武汉流动人口种的安全率
        let hubei_E_rate=Hubei.E/(Hubei.S+Hubei.I+Hubei.E);//确定武汉流动人口种的潜伏率
        let hubei_I_rate=Hubei.I/(Hubei.S+Hubei.I+Hubei.E);//确定武汉流动人口种的患病率
        let zhejiang_S_rate=Zhejiang.S/(Zhejiang.S+Zhejiang.I+Zhejiang.E);//确定武汉流动人口种的安全率
        let zhejiang_E_rate=Zhejiang.E/(Zhejiang.S+Zhejiang.I+Zhejiang.E);//确定武汉流动人口种的潜伏率
        let zhejiang_I_rate=Zhejiang.I/(Zhejiang.S+Zhejiang.I+Zhejiang.E);//确定武汉流动人口种的患病率
        Hubei.S=hubei_temp[0]+Hubei.fromZheJ*zhejiang_S_rate-Hubei.toZheJ*hubei_S_rate;
        Hubei.E=hubei_temp[1]+Hubei.fromZheJ*zhejiang_E_rate-Hubei.toZheJ*hubei_E_rate;
        Hubei.I=hubei_temp[2]+Hubei.fromZheJ*zhejiang_I_rate-Hubei.toZheJ*hubei_I_rate;
        Hubei.R=hubei_temp[3];
        Hubei.Sq=hubei_temp[4];
        Hubei.Eq=hubei_temp[5];
        Hubei.H=hubei_temp[6];
        Zhejiang.S=zhejiang_temp[0]+Zhejiang.fromHuB*hubei_S_rate-Zhejiang.toHuB*zhejiang_S_rate;
        Zhejiang.E=zhejiang_temp[1]+Zhejiang.fromHuB*hubei_E_rate-Zhejiang.toHuB*zhejiang_E_rate;
        Zhejiang.I=zhejiang_temp[2]+Zhejiang.fromHuB*hubei_E_rate-Zhejiang.toHuB*zhejiang_E_rate;
        Zhejiang.R=zhejiang_temp[3];
        Zhejiang.Sq=zhejiang_temp[4];
        Zhejiang.Eq=zhejiang_temp[5];
        Zhejiang.H=zhejiang_temp[6];
        data1[16].value=Math.floor(Hubei.I+Hubei.H);
        data1[14].value=Math.floor(Zhejiang.I+Zhejiang.H);
        chinaMapChart.setOption(optionChinaMap, true);
        /*
        document.getElementById("result_hubei").innerHTML="湖北当前感染人数为："+Math.floor(Hubei.I)+"</br>"+"湖北当前潜伏人数为："+Math.floor(Hubei.E)+"</br>"
        +"湖北当前住院人数为："+Math.floor(Hubei.H)+"</br>"+"湖北当前康复人数为："+Math.floor(Hubei.R);
        document.getElementById("result_zhejiang").innerHTML="浙江当前感染人数为："+Math.floor(Zhejiang.I)+"</br>"+"浙江当前潜伏人数为："+Math.floor(Zhejiang.E)+"</br>"
        +"浙江当前住院人数为："+Math.floor(Zhejiang.H)+"</br>"+"浙江当前康复人数为："+Math.floor(Zhejiang.R);
        */
        data_date.push(data_date.length+1);
        data_I_hubei.push(Math.floor(Hubei.I));
        data_E_hubei.push(Math.floor(Hubei.E));
        data_H_hubei.push(Math.floor(Hubei.H));
        data_R_hubei.push(Math.floor(Hubei.R));
        lineChart_hubei.setOption(lineOption_hubei, true);
        data_I_zhejiang.push(Math.floor(Zhejiang.I));
        data_E_zhejiang.push(Math.floor(Zhejiang.E));
        data_H_zhejiang.push(Math.floor(Zhejiang.H));
        data_R_zhejiang.push(Math.floor(Zhejiang.R));
        lineChart_zhejiang.setOption(lineOption_zhejiang, true);
    }
    else {
        alert("请保存初始值后再进行计算");
    }
}
//构造城市传染病SEIR参数对象
function city(S,E,I,R,Sq,Eq,H,fromZheJ,toZheJ,fromHuB,toHuB){
    this.S=S;
    this.E=E;
    this.I=I;
    this.R=R;
    this.Sq=Sq;
    this.Eq=Eq;
    this.H=H;
    this.fromHuB=fromHuB;
    this.toHuB=toHuB;
    this.fromZheJ=fromZheJ;
    this.toZheJ=toZheJ;
}



var data1=
[{name: '北京',value: '0' },{name: '天津',value: '0' },  
{name: '上海',value: '0' },{name: '重庆',value: '0' },  
{name: '河北',value: '0' },{name: '河南',value: '0' },  
{name: '云南',value: '0' },{name: '辽宁',value: '0' },  
{name: '黑龙江',value: '0' },{name: '湖南',value: '0' },  
{name: '安徽',value: '0' },{name: '山东',value: '0' },  
{name: '新疆',value: '0' },{name: '江苏',value: '0' },  
{name: '浙江',value: '0' },{name: '江西',value: '0' },  
{name: '湖北',value: '0' },{name: '广西',value: '0' },  
{name: '甘肃',value: '0' },{name: '山西',value: '0' },  
{name: '内蒙古',value: '0' },{name: '陕西',value: '0' },  
{name: '吉林',value: '0' },{name: '福建',value: '0' },  
{name: '贵州',value: '0' },{name: '广东',value: '0' },  
{name: '青海',value: '0' },{name: '西藏',value: '0' },  
{name: '四川',value: '0' },{name: '宁夏',value: '0' },  
{name: '海南',value: '0' },{name: '台湾',value: '0' },  
{name: '香港',value: '0' },{name: '澳门',value: '0' }];
