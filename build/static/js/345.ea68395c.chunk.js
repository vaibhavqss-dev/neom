"use strict";(self.webpackChunkneomcity_vaibhav=self.webpackChunkneomcity_vaibhav||[]).push([[345],{5478:(e,t,a)=>{a.d(t,{A:()=>s});a(5043);const s=a.p+"static/media/anger.1935ee5ca9b842fa5278767cb61ec07e.svg"},4116:(e,t,a)=>{a.d(t,{A:()=>s});a(5043);const s=a.p+"static/media/appreciation.c2eb8ab73cf2417cf977f10a680356c5.svg"},5013:(e,t,a)=>{a.d(t,{A:()=>s});a(5043);const s=a.p+"static/media/boredom.2274adf1fef91340c35a293c40c45b27.svg"},4185:(e,t,a)=>{a.d(t,{A:()=>s});a(5043);const s=a.p+"static/media/joy.6f42530be3fcd524f2f3edc78444c02d.svg"},6345:(e,t,a)=>{a.r(t),a.d(t,{default:()=>f});var s=a(5043),i=a(7815),c=a(3801),n=a(5478),r=a(4116),d=a(5013),l=a(4185),o=a(3605),m=a(579);const v=e=>{let{rating:t}=e;const a=[{id:1,name:"Joy",image:l.A},{id:2,name:"Appreciation",image:r.A},{id:3,name:"Boredom",image:d.A},{id:4,name:"Overwhelm",image:c.A},{id:5,name:"Disappointment",image:o.A},{id:6,name:"Anger",image:n.A}];return(0,m.jsx)("div",{className:"emotion-rating",children:a.map((e=>(0,m.jsx)("div",{className:"emotion-icon ",title:e.name,children:(0,m.jsx)("img",{src:e.image,alt:e.name,className:t===e.id?"blinking":"grayscale"})},e.id)))})};var h=a(6727);const g=e=>{let{date:t,city:a,review:s,avg_star:i,eventId:c,name:n,event_date:r,image:d,reviews:l,avg_rating:o,addReview:g=!1}=e;const f=(0,h.Zp)();return(0,m.jsxs)("div",{className:"review_card",children:[(0,m.jsxs)("div",{className:"feedback",children:[(0,m.jsxs)("div",{onClick:()=>f("/event-details?eventId=".concat(c)),className:"feedback_image",children:[(0,m.jsxs)("div",{className:"feedback_image_overlay",children:[(0,m.jsx)("p",{className:"feedback_image_overlay_text",children:n}),(0,m.jsx)("p",{className:"feedback_image_overlay_date",children:r}),(0,m.jsxs)("p",{className:"feedback_image_overlay_reviews",children:[l," reviews"]})]}),(0,m.jsx)("img",{src:d,alt:"profile"})]}),(0,m.jsxs)("div",{className:"feedback_text",children:[(0,m.jsx)("p",{className:"feedback_text_date",children:t}),g?(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("p",{children:["Hey ",localStorage.getItem("fullname"),", you haven't added you feedback yet. Please share your experience with us to serve you better next time."]}),(0,m.jsxs)("button",{id:"addreviewButton",onClick:()=>f("/add-review?eventId=".concat(c)),children:["Add Review"," "]})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("p",{className:"feedback_text_subheading",children:s}),(0,m.jsx)("div",{className:"feedback_text_rating",children:(0,m.jsx)(v,{rating:o})})]})]})]}),(0,m.jsx)("hr",{})]})};document.title="My Feedback";const f=()=>{const[e,t]=(0,s.useState)([]);return(0,s.useEffect)((()=>{!async function(){try{const e=await fetch("http://localhost:3001/api/user/review",{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("token"))}}),a=await e.json();if(a.error)return void console.error("API error:",a.error);t(a.event),console.log("Reviews",a.event)}catch(e){console.error("Fetch error:",e)}}()}),[]),(0,m.jsxs)("div",{className:"myFeedback",children:[(0,m.jsxs)("div",{className:"myFeedback_firstSection",children:[(0,m.jsxs)("div",{className:"myFeedback_firstSection_left",children:[(0,m.jsx)("img",{src:c.A,alt:"profile"}),(0,m.jsx)("p",{className:"myFeedback_firstSection_left_category",children:"Overwhelmed experience"}),(0,m.jsx)("p",{className:"myFeedback_firstSection_left_text",children:"Your Vibe-O-Meter reading excite us too"}),(0,m.jsx)("p",{className:"myFeedback_firstSection_left_subtext",children:"We are happy too because we successfully keep you happy during this visit to Sindalah City."})]}),(0,m.jsx)("div",{className:"myFeedback_firstSection_right",children:(0,m.jsx)(i.A,{})})]}),(0,m.jsx)("div",{className:"myFeedback_secondSectionAlign",children:(0,m.jsxs)("div",{className:"myFeedback_secondSection",children:[(0,m.jsxs)("p",{className:"myFeedback_secondSection_heading",children:["Hi ",localStorage.getItem("fullname"),","]}),(0,m.jsx)("p",{className:"myFeedback_secondSection_text",children:"here are the glimpse of your feedback shared with us."}),(0,m.jsx)("div",{className:"myFeedback_secondSection_feedbackContainer",children:e.map(((e,t)=>{const a=e.event.reviews.length>0,s=a?e.event.reviews[0]:null;return(0,m.jsx)(g,{addReview:!a,date:a&&(null===s||void 0===s?void 0:s.date.split("T")[0])||"",city:e.event.location,review:a&&(null===s||void 0===s?void 0:s.comment)||"",avg_star:a&&(null===s||void 0===s?void 0:s.avg_rating)||0,eventId:e.event.event_id.toString(),name:e.event.title,event_date:e.date_from.split("T")[0]||"",image:e.event.image_urls[0],reviews:e.event.no_reviews,avg_rating:a?parseInt(e.event.reviews[0].avg_rating):0},t)}))})]})})]})}},7815:(e,t,a)=>{a.d(t,{A:()=>m});var s=a(5043),i=a(5478),c=a(4116),n=a(5013),r=a(4185),d=a(3801),l=a(3605),o=a(579);const m=()=>((0,s.useEffect)((()=>{const e=document.querySelector(".gauge");if(!e)return;const t=["#55BF3B","#9ACC0D","#ACE50D","#D8D90F","#FFB03A","#FF385C"];for(let i=0;i<30;i++){const a=document.createElement("div");a.style.transform=i<15?"rotate("+(6*i-90+1)+"deg)":"rotate("+(6*i-90+4)+"deg)",a.className="brick";const s=t[Math.floor(i/5)];a.style.background=s;const c=180,n=(180-i*(180/29))*Math.PI/180,r=100+c*Math.cos(n)-10,d=100-c*Math.sin(n)-10;a.style.left=r+"px",a.style.top=d+"px",e.appendChild(a)}for(let o=0;o<6;o++){const t=document.createElement("img"),a=document.createElement("p");t.className="emoji",t.src=[d.A,r.A,c.A,n.A,l.A,i.A][o];const s=(180-(5*o+2)*(180/29))*Math.PI/180,m=230,v=100+m*Math.cos(s),h=100-m*Math.sin(s);a.innerHTML="x: ".concat(Math.floor(v)," y: ").concat(Math.floor(h)),a.style.color="black",a.style.fontSize="10px",a.style.position="absolute",a.style.bottom="10px",a.style.width="100px",t.style.position="absolute",t.style.left=v+"px",t.style.top=h+"px",t.style.transform="translate(-50%, -50%)",t.appendChild(a),e.appendChild(t)}const a=document.getElementById("needle");if(!a)return;a.style.transition="transform 2s ease";let s=1;setInterval((()=>{if(!a)return;const e=6*(s-1)-90;a.style.transform="rotate("+e+"deg)",s++,32===s&&(s=1)}),100)}),[]),(0,o.jsx)("div",{className:"vibometer_img",children:(0,o.jsxs)("div",{className:"gauge",children:[(0,o.jsx)("div",{className:"arc"}),(0,o.jsxs)("div",{className:"needle-container",id:"needle",children:[(0,o.jsx)("div",{className:"needle"}),(0,o.jsx)("div",{className:"circle"})]})]})}))}}]);
//# sourceMappingURL=345.ea68395c.chunk.js.map