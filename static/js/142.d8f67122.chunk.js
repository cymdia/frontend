"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[142],{7142:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Z});var a=n(2791),s=n(177),i=n(8569),d=n(6921),r=n(3069),l=n(586),c=n(7533),o=n(2499),x=n(7892),m=n.n(x),h=n(4520),p=n(2641);var u=n(7689),y=n(184);const k=e=>{const t=(0,u.s0)();return(0,y.jsx)(y.Fragment,{children:(0,y.jsx)(h.Z,{justify:"flex-end",children:(0,y.jsx)(p.ZP,{type:"primary",className:"create-new-btn",size:"large",onClick:()=>{t("edit")},children:"+ \u0414\u043e\u0434\u0430\u0442\u0438 \u043d\u043e\u0432\u0438\u043d\u0443"})})})};var g=n(6557);const j=e=>{const[t,n,a]=e.split("-"),[s,i]=a.split(" "),[d,r]=i.split(":");return new Date(parseInt(s),parseInt(n)-1,parseInt(t),parseInt(d),parseInt(r))},f=[];for(let b=0;b<100;b++)f.push({key:b.toString(),name:"\u041d\u043e\u0432\u0438\u043d\u0430 ".concat(b),date:b%2===0?m()(new Date).format(g._.v).toString():m()(new Date((new Date).setDate(21))).format(g._.v).toString()});const I=e=>{let{editing:t,dataIndex:n,title:a,inputType:d,record:r,index:l,children:c,...o}=e;const x=(0,y.jsx)(s.Z,{});return(0,y.jsx)("td",{...o,children:t?(0,y.jsx)(i.Z.Item,{name:n,style:{margin:0},rules:[{required:!0,message:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c ".concat(a,"!")}],children:x}):c})},Z=e=>{const[t]=i.Z.useForm(),[n,s]=(0,a.useState)(f),[x,m]=(0,a.useState)(""),h=e=>e.key===x,p=()=>{m("")},u=[{title:"\u041d\u043e\u0432\u0438\u043d\u0430",dataIndex:"name",width:"45%",editable:!0},{title:"\u0414\u0430\u0442\u0430",dataIndex:"date",width:"20%",editable:!1,sorter:(e,t)=>((e,t)=>{const n=j(e),a=j(t);return n.getTime()-a.getTime()})(e.date,t.date)},{title:"\u0414\u0456\u0457",dataIndex:"operation",render:(e,a)=>{const i=h(a);return(0,y.jsxs)(y.Fragment,{children:[i?(0,y.jsxs)("span",{children:[(0,y.jsx)(d.Z.Link,{onClick:()=>(async e=>{try{const a=await t.validateFields(),i=[...n],d=i.findIndex((t=>e===t.key));if(d>-1){const e=i[d];i.splice(d,1,{...e,...a}),s(i),m("")}else i.push(a),s(i),m("")}catch(a){console.log("Validate Failed:",a)}})(a.key),style:{marginRight:8},children:"\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438"}),(0,y.jsx)(r.Z,{title:"\u0412\u0438 \u0432\u043f\u0435\u0432\u043d\u0435\u043d\u0456, \u0449\u043e \u0445\u043e\u0447\u0435\u0442\u0435 \u0441\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438?",onConfirm:p,children:(0,y.jsx)(d.Z.Link,{style:{marginRight:8},children:"\u0421\u043a\u0430\u0441\u0443\u0432\u0430\u0442\u0438"})})]}):(0,y.jsx)(d.Z.Link,{disabled:""!==x,onClick:()=>(e=>{t.setFieldsValue({name:"",date:"",...e}),m(e.key)})(a),className:"edit-btn",children:"\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438"}),(0,y.jsx)(d.Z.Link,{disabled:""!==x,onClick:()=>(e=>{const t=[...n],a=n.findIndex((t=>e.key===t.key));t.splice(a,1),s(t)})(a),className:"delete-btn",children:"\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438"})]})}}].map((e=>e.editable?{...e,onCell:t=>({record:t,inputType:"date"===e.dataIndex?"date":"text",dataIndex:e.dataIndex,title:e.title,editing:h(t)})}:e));return(0,y.jsxs)(l.Z,{className:"news-layout layout",children:[(0,y.jsx)(o.Z,{children:"\u041d\u043e\u0432\u0438\u043d\u0438"}),(0,y.jsx)(k,{}),(0,y.jsx)(i.Z,{form:t,component:!1,children:(0,y.jsx)(c.Z,{components:{body:{cell:I}},bordered:!0,dataSource:n,columns:u,rowClassName:"editable-row",pagination:{onChange:p},sticky:!0})})]})}}}]);
//# sourceMappingURL=142.d8f67122.chunk.js.map