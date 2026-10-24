// Regenerate committed social covers: node scripts/generate-share-images.mjs
// Uses existing Next.js OG renderer; font downloads happen only during regeneration.
import { ImageResponse } from "next/og.js";
import { createElement as h } from "react";
import { mkdir, writeFile } from "node:fs/promises";

const cards = {
  home: { en: ["Portfolio", "Practical tools.", "Thoughtful systems."], zh: ["个人网站", "内部工具", "与流程自动化"] },
  works: { en: ["Selected work", "From constraints", "to working products."], zh: ["项目作品", "从真实约束", "到可用的产品"] },
  resume: { en: ["Resume", "Engineering.", "With a product mindset."], zh: ["简历", "工程实现", "与产品思维"] },
  about: { en: ["About", "Curiosity, evidence", "and careful execution."], zh: ["关于", "好奇心与证据", "认真地把事情做好"] },
  afgang: { en: ["Project / Afgang", "Copenhagen,", "within reach."], zh: ["项目 / Afgang", "哥本哈根", "触手可及"] },
};
const zhText = [...new Set(Object.values(cards).flatMap(c=>c.zh).join("") + "哥本哈根产品工程师内部工具与流程自动化")].join("");
async function download(url) {
  const res=await fetch(url); if(!res.ok) throw new Error(`${res.status}: ${url}`); return res;
}
const serif=await (await download("https://fonts.gstatic.com/s/crimsonpro/v28/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZzm18OA.ttf")).arrayBuffer();
const css=await (await download("https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400&text="+encodeURIComponent(zhText))).text();
const fontURL=css.match(/url\(([^)]+)\)/)?.[1]; if(!fontURL) throw new Error("CJK font unavailable");
const cjk=await (await download(fontURL)).arrayBuffer();
const sans=await (await import("node:fs/promises")).readFile(new URL("../node_modules/next/dist/compiled/@vercel/og/noto-sans-v27-latin-regular.ttf",import.meta.url));
const dir=new URL("../public/og/",import.meta.url); await mkdir(dir,{recursive:true});
const div=(style,...children)=>h("div",{style:{display:"flex",...style}},...children.map(child=>typeof child==="string"?h("span",null,child):child));
for(const [page,locales] of Object.entries(cards)) for(const [lang,[label,line1,line2]] of Object.entries(locales)) {
 const grid=[];for(let x=0;x<1200;x+=24)grid.push(div({position:"absolute",left:x,top:0,width:1,height:630,background:x%120===0?"#dfddd9":"#eae9e6"}));
 for(let y=0;y<630;y+=24)grid.push(div({position:"absolute",left:0,top:y,width:1200,height:1,background:y%120===0?"#dfddd9":"#eae9e6"}));
 const tree=div({width:"100%",height:"100%",background:"#fafaf9",position:"relative",fontFamily:"Sans, Noto",color:"#44403c"},...grid,
  div({position:"absolute",left:64,top:48,width:1072,height:534,background:"#fff",border:"1px solid #e7e5e4",boxShadow:"0 12px 40px #0000000c",flexDirection:"column",padding:"44px 58px"},
   div({justifyContent:"space-between",alignItems:"center",fontSize:20,color:"#78716c"},label,"me.isjia.page"),
   div({marginTop:27,fontFamily:"Crimson",fontSize:46,letterSpacing:-1},"Jiajia Zhang"),
   div({marginTop:20,flexDirection:"column",fontFamily:lang==="zh"?"Noto":"Crimson",fontSize:lang==="zh"?62:65,lineHeight:1.08,letterSpacing:-1.5},line1,h("span",{style:{color:"#be123c"}},line2)),
   div({marginTop:"auto",borderTop:"1px dashed #d6d3d1",paddingTop:20,justifyContent:"space-between",fontSize:18,color:"#78716c"},lang==="zh"?"哥本哈根 · 产品工程师":"Copenhagen · Product-minded engineer",page==="afgang"?"Transit · Data · Maps":"Tools · Workflows · Decision support")
  )
 );
 const image=new ImageResponse(tree,{width:1200,height:630,fonts:[{name:"Sans",data:sans,weight:400,style:"normal"},{name:"Crimson",data:serif,weight:400,style:"normal"},{name:"Noto",data:cjk,weight:400,style:"normal"}]});
 await writeFile(new URL(`${page}-${lang}-v1.png`,dir),Buffer.from(await image.arrayBuffer()));
 console.log(`${page}-${lang}-v1.png`);
}
