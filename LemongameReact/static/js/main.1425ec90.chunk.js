(this["webpackJsonptesting-react"]=this["webpackJsonptesting-react"]||[]).push([[0],[,,,function(e,a,t){},,function(e,a,t){e.exports=t(12)},,,,,function(e,a,t){},function(e,a,t){},function(e,a,t){"use strict";t.r(a);var c=t(0),l=t.n(c),n=t(4),s=t.n(n),o=(t(0),t(1));t(11),t(3);var r=function(e){function a(e){var a=Math.floor(Math.log10(e)/(3*Math.log10(0)));return e<=999&&e>0&&(a=0),e<=0?0:Math.floor(e/Math.pow(1e3,a),3).toString()+["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","Ud","Dd","Td","Qad","Qid","Sxd","Spd","Od","Nd","V","Uv","Dv","Tv","Qav","Qiv","Sxv","Spv","Ov","Nv","Tg","Utg","Dtg","Ttg","Qatg","Qitg","Sxtg","Sptg","Otg","Ntg","Qaa","Uqa","Dqa","Tqa","Qaqa","Qiqa","Sxqa","Spqa","Oqa","Nqa","Qia","Uqi","Dqi","Tqi","Qaqi","Qiqi","Sxqi","Spqi","Oqi","Nqi","Sxa","Usx","Dsx","Tsx","Qasx","Qisx","Sxsx","Spsx","Osx","Nsx","Spa","Usp","Dsp","Tsp","Qasp","Qisp","Sxsp","Spsp","Osp","Nsp","Og","Uog","Dog","Tog","Qaog","Qiog","Sxog","Spog","Oog","Nog","Na","Un","Dn","Tn","Qan","Qin","Sxn","Spn","On","Nn","Ct","Uc"][a]}function t(){e.setLemons(e.lemons+1)}function c(){e.lemons>=2&&(e.setLemons(e.lemons-2),e.setJuice(e.juice+1))}function n(){e.juice>=4&&(e.setJuice(e.juice-4),e.setLemonade(e.lemonade+1))}function s(){e.lemonade>=1&&(e.setLemonade(e.lemonade-1),e.setMoney(e.money+2))}return l.a.createElement("div",{id:"middlebar"},l.a.createElement("h2",null,"Resources:"),l.a.createElement("div",{id:"ressource",className:"table"},l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{className:"legend"}),l.a.createElement("th",{className:"clickable lemons",onClick:t},"Lemons"),l.a.createElement("th",{className:"clickable juice",onClick:c},"Juice"),l.a.createElement("th",{className:"clickable lemonade",onClick:n},"Lemonade"),l.a.createElement("th",{className:"clickable dollar",onClick:s},"Dollar"),l.a.createElement("th",{className:"electricity"},"Electircity"),l.a.createElement("th",{className:"science"},"Science"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{className:"legend"},"Amout:"),l.a.createElement("td",{className:"clickable lemons",onClick:t},a(e.lemons)),l.a.createElement("td",{className:"clickable juice",onClick:c},a(e.juice)),l.a.createElement("td",{className:"clickable lemonade",onClick:n},a(e.lemonade)),l.a.createElement("td",{className:"clickable dollar",onClick:s},a(e.money)),l.a.createElement("td",{className:"electricity"},a(e.electricity)),l.a.createElement("td",{className:"science"},a(e.science))),l.a.createElement("tr",null,l.a.createElement("td",{className:"legend"},"Services per Click:"),l.a.createElement("td",{className:"clickable lemons",onClick:t},"One Free Lemon"),l.a.createElement("td",{className:"clickable juice",onClick:c},"Two Lemons for One Juice"),l.a.createElement("td",{className:"clickable lemonade",onClick:n},"Four Juice for One Lemonade"),l.a.createElement("td",{className:"clickable dollar",onClick:s},"One Lemonade for Two Dollar"),l.a.createElement("td",{className:"electricity"},"Impossible to make"),l.a.createElement("td",{className:"science"},"Impossible to make"))))))};var i=function(e){var a=Object(c.useState)(0),t=Object(o.a)(a,2),n=t[0],s=t[1],r=function(){return s(n-1)};function i(){e.money>=20&&(e.setMoney(e.money-20),e.setLemontree(e.lemontree+1))}function m(){e.money>=100&&(e.setMoney(e.money-100),e.setSqueezer(e.squeezer+1))}function d(){e.money>=250&&(e.setMoney(e.money-250),e.setMixer(e.mixer+1))}function u(){e.money>=500&&(e.setMoney(e.money-500),e.setBooth(e.booth+1))}function b(){e.money>=1200&&(e.setMoney(e.money-1200),e.setAcid(e.acid+1))}function E(){e.money>=2600&&(e.setMoney(e.money-2600),e.setResearch(e.research+1))}return Object(c.useEffect)((function(){n<=0&&function(){var a=e.lemons,t=e.juice,c=e.lemonade,l=e.money,n=e.electricity,s=e.science;e.research>=1&&n>=5*e.research&&(n-=5*e.research,s+=1*e.research),e.acid>=1&&t>=12*e.acid&&(t-=12*e.acid,n+=1*e.acid),e.booth>=1&&c>=1*e.booth&&(c-=1*e.booth,l+=2*e.booth),e.mixer>=1&&t>=4*e.mixer&&(t-=4*e.mixer,c+=1*e.mixer),e.squeezer>=1&&a>=2*e.squeezer&&(a-=2*e.squeezer,t+=1*e.squeezer),e.lemontree>=1&&(a+=1*e.lemontree),e.setLemons(a),e.setJuice(t),e.setLemonade(c),e.setMoney(l),e.setElectricity(n),e.setScience(s)}();var a=setInterval(r,1e3);return function(){return clearInterval(a)}}),[n]),l.a.createElement("div",{id:"middlebar",className:"machinery"},l.a.createElement("h2",null,"Machinery:"),l.a.createElement("div",{id:"machinery",className:"table"},l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",{className:"legend"}),l.a.createElement("th",{className:"clickable clickable lemontree",onClick:i},"Lemontree"),l.a.createElement("th",{className:"clickable squeezer",onClick:m},"Squeezer"),l.a.createElement("th",{className:"clickable mixer",onClick:d},"Mixer"),l.a.createElement("th",{className:"clickable booth",onClick:u},"Sales booth"),l.a.createElement("th",{className:"clickable acidgen",onClick:b},"Acid Generator"),l.a.createElement("th",{className:"clickable research",onClick:E},"Research Center"))),l.a.createElement("tbody",null,l.a.createElement("tr",null,l.a.createElement("td",{className:"legend"},"Amout:"),l.a.createElement("td",{className:"clickable lemontree",onClick:i},e.lemontree),l.a.createElement("td",{className:"clickable squeezer",onClick:m},e.squeezer),l.a.createElement("td",{className:"clickable mixer",onClick:d},e.mixer),l.a.createElement("td",{className:"clickable booth",onClick:u},e.booth),l.a.createElement("td",{className:"clickable acidgen",onClick:b},e.acid),l.a.createElement("td",{className:"clickable research",onClick:E},e.research)),l.a.createElement("tr",null,l.a.createElement("td",{className:"legend"},"Costs:"),l.a.createElement("td",{className:"clickable lemontree",onClick:i},"20 Dollar"),l.a.createElement("td",{className:"clickable squeezer",onClick:m},"100 Dollar"),l.a.createElement("td",{className:"clickable mixer",onClick:d},"250 Dollar"),l.a.createElement("td",{className:"clickable booth",onClick:u},"500 Dollar"),l.a.createElement("td",{className:"clickable acidgen",onClick:b},"1200 Dollar"),l.a.createElement("td",{className:"clickable research",onClick:E},"2600 Dollar")),l.a.createElement("tr",null,l.a.createElement("td",{className:"legend"},"Services per Second:"),l.a.createElement("td",{className:"clickable lemontree",onClick:i},"One Free Lemon"),l.a.createElement("td",{className:"clickable squeezer",onClick:m},"Two Lemons for One Juice"),l.a.createElement("td",{className:"clickable mixer",onClick:d},"Four Juice for One Lemonade"),l.a.createElement("td",{className:"clickable booth",onClick:u},"One Lemonade for Two Dollar"),l.a.createElement("td",{className:"clickable acidgen",onClick:b},"Twelve Juice for 1 Electricity"),l.a.createElement("td",{className:"clickable research",onClick:E},"5 Electricity for 1 Science"))))))};var m=function(){var e=Object(c.useState)(0),a=Object(o.a)(e,2),t=a[0],n=a[1],s=Object(c.useState)(0),m=Object(o.a)(s,2),d=m[0],u=m[1],b=Object(c.useState)(0),E=Object(o.a)(b,2),k=E[0],h=E[1],N=Object(c.useState)(0),S=Object(o.a)(N,2),y=S[0],O=S[1],g=Object(c.useState)(0),C=Object(o.a)(g,2),f=C[0],j=C[1],x=Object(c.useState)(0),q=Object(o.a)(x,2),p=q[0],v=q[1],L=Object(c.useState)(80),Q=Object(o.a)(L,2),M=Q[0],D=Q[1],T=Object(c.useState)(40),w=Object(o.a)(T,2),z=w[0],J=w[1],U=Object(c.useState)(0),A=Object(o.a)(U,2),B=A[0],F=A[1],I=Object(c.useState)(0),R=Object(o.a)(I,2),W=R[0],G=R[1],K=Object(c.useState)(0),V=Object(o.a)(K,2),$=V[0],H=V[1],P=Object(c.useState)(0),X=Object(o.a)(P,2),Y=X[0],Z=X[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement(r,{lemons:t,setLemons:n,juice:d,setJuice:u,lemonade:k,setLemonade:h,money:y,setMoney:O,electricity:f,setElectricity:j,science:p,setScience:v}),l.a.createElement(i,{money:y,setMoney:O,research:Y,setResearch:Z,acid:$,setAcid:H,booth:W,setBooth:G,mixer:B,setMixer:F,squeezer:z,setSqueezer:J,lemontree:M,setLemontree:D,lemons:t,setLemons:n,juice:d,setJuice:u,lemonade:k,setLemonade:h,electricity:f,setElectricity:j,science:p,setScience:v}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(m,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[5,1,2]]]);
//# sourceMappingURL=main.1425ec90.chunk.js.map
