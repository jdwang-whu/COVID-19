import math
# S代表易感者，一般为某地区人口总数
S=[]
S.append(59170000)
# E代表潜伏者
E=[]
E.append(4007)
# I代表感染者
I=[]
I.append(786)
# R代表康复者
R=[]
R.append(31)
# Sq代表隔离中的易感者
Sq=[]
Sq.append(2776)
# Eq代表隔离中的潜伏者
Eq=[]
Eq.append(400)
# H代表住院患者
H=[]
H.append(1186)

# q为隔离比例
q=0.000006
# Ir为感染者的传染概率
Ir=0.00000000205
# c为接触率
c=2.0
# c_effective为有效接触系数
c_effective=1.0
# release_rate为解除隔离速率，一般为一个潜伏期长短
release_rate=0.07
# Er为潜伏者相对于感染者的传染概率比值
Er=1.0
# E_To_I_Rate为潜伏者向感染者的转化比例
E_To_I_Rate=0.14
# death_rate为病死率
death_rate=0.00027
# q_I为感染者的隔离速率
q_I=0.13
# r_I为感染者的恢复率
r_I=0.007
# Eq_to_H为隔离潜伏者向隔离感染者的转化速率
Eq_to_H=0.13
# r_H为住院患者的恢复率
r_H=0.014

for i in range(0,90):
    S.append((int(S[i])-(c*c_effective*Ir+c*c_effective*q*(1.0-Ir))*int(S[i])*(int(I[i])+(Er*int(E[i])))+int(Sq[i])*release_rate))
    E.append(int(E[i])+c*c_effective*Ir*(1.0-q)*int(S[i])*(int(I[i])+Er*int(E[i]))-int(E_To_I_Rate*int(E[i])))
    I.append(I[i]+E_To_I_Rate*E[i]-(death_rate+q_I+r_I)*I[i])
    Sq.append(Sq[i]+c*c_effective*q*(1-Ir)*S[i]*(I[i]+Er*E[i])-Sq[i]*release_rate)
    Eq.append(int(Eq[i])+c*c_effective*Ir*q*int(S[i])*(int(I[i])+Er*int(E[i]))-Eq_to_H*int(Eq[i]))
    H.append(H[i]+I[i]*q_I+Eq[i]*Eq_to_H-H[i]*(death_rate+r_H))
    R.append(R[i]+I[i]*r_I+H[i]*r_H)
    print(I[i+1]+E[i+1])