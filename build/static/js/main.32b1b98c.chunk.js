(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(14),c=t.n(a),r=t(3),o=t(1),u=t(0),i=function(e){var n=e.display,t=e.confirmDelete;return n.map((function(e){return Object(u.jsxs)("ul",{children:[e.name,": ",e.number," ",Object(u.jsx)("button",{onClick:function(){return t(e)},children:"Delete"})]},e.name)}))},s=function(e){var n=e.searchParam,t=e.handleSearch;return Object(u.jsxs)("form",{children:["filter shown with ",Object(u.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,c=e.newNum,r=e.handleNumChange;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:t,onChange:a})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:c,onChange:r})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},h=t(4),l=t.n(h),b="/api/persons",j={getAll:function(){return l.a.get(b).then((function(e){return e.data}))},create:function(e){return l.a.post(b,e).then((function(e){return e.data}))},update:function(e,n){return l.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},remove:function(e){return l.a.delete("".concat(b,"/").concat(e))}},m=function(e){var n=e.message,t=e.setNotification;return null===n?null:(setTimeout((function(){t(null)}),5e3),Object(u.jsx)("div",{className:"error",children:n}))},f=function(){var e=Object(o.useState)([]),n=Object(r.a)(e,2),t=n[0],a=n[1],c=Object(o.useState)(""),h=Object(r.a)(c,2),l=h[0],b=h[1],f=Object(o.useState)(""),O=Object(r.a)(f,2),p=O[0],v=O[1],x=Object(o.useState)(""),w=Object(r.a)(x,2),g=w[0],k=w[1],N=Object(o.useState)(!0),C=Object(r.a)(N,2),y=C[0],S=C[1],D=Object(o.useState)(null),P=Object(r.a)(D,2),A=P[0],E=P[1];Object(o.useEffect)((function(){j.getAll().then((function(e){a(e)}))}),[]);var J=y?t:t.filter((function(e){return e.name.toLowerCase().includes(g)}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(m,{message:A,setNotification:E}),Object(u.jsx)(s,{searchParam:g,handleSearch:function(e){k(e.target.value.toLowerCase()),""!==e.target.value?S(!1):S(!0)}}),Object(u.jsx)("h2",{children:"Add a new"}),Object(u.jsx)(d,{addPerson:function(e){e.preventDefault();var n={name:l,number:p,id:l},c=t.map((function(e){return e.name})).includes(n.name),r=t.map((function(e){return e.number})).includes(n.number);switch(!0){case c&&!r:!function(e){window.confirm("".concat(l," is already added to phonebook, \n    replace the old number with a new one?"))&&(j.update(e.id,e).then(E("".concat(e.name,"'s number has been updated"))).catch((function(n){return E("".concat(e.name," has already been deleted from phonebook"))})),a(t.map((function(n){return n.id===e.id?e:n}))))}(n);break;case c:E("".concat(l," is already in the phonebook"));break;case r:E("".concat(p," is already in the phonebook"));break;default:j.create(n).then((function(e){a(t.concat(e)),E("".concat(n.name," has been added to the phonebook"))}))}b(""),v("")},newName:l,handleNameChange:function(e){return b(e.target.value)},newNum:p,handleNumChange:function(e){return v(e.target.value)}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(i,{display:J,confirmDelete:function(e){window.confirm("Delete ".concat(e.name,"?"))&&(j.remove(e.id).then(E("".concat(e.name," has been deleted from phonebook"))).catch((function(n){return E("".concat(e.name," has already been deleted from phonebook"))})),a(t.filter((function(n){return n.id!==e.id}))))}})]})};t(38);c.a.render(Object(u.jsx)(f,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.32b1b98c.chunk.js.map