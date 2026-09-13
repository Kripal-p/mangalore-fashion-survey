/*
  Mangalore Fashion Survey
  Frontend only. Set APPS_SCRIPT_URL below after deploying Code.gs.
*/
const APPS_SCRIPT_URL = ""; // Example: https://script.google.com/macros/s/XXXXXXXX/exec

const PRODUCT_DATA = {
  men: {
    label: "Men's fashion",
    products: [
      ["men_tshirt","T-shirts"],["men_shirt","Shirts"],["men_jeans","Jeans"],["men_trousers","Trousers / chinos"],
      ["men_shorts","Shorts"],["men_ethnic","Ethnic wear"],["men_overshirt","Overshirts / jackets"]
    ]
  },
  women: {
    label: "Women's fashion",
    products: [
      ["women_top","Tops"],["women_dress","Dresses"],["women_jeans","Jeans"],["women_trousers","Trousers"],
      ["women_kurti","Kurtis"],["women_ethnic","Ethnic sets"],["women_saree","Sarees"],["women_coords","Co-ords"]
    ]
  },
  children: {
    label: "Children's fashion",
    products: [
      ["kids_boys","Boys casual"],["kids_girls","Girls casual"],["kids_ethnic","Kids ethnic"]
    ]
  },
  accessories: {
    label: "Accessories",
    products: [
      ["acc_jewellery","Jewellery"],["acc_bags","Bags"],["acc_belts","Belts"],["acc_caps","Caps"]
    ]
  }
};

const STYLE_DATA = {
  men_tshirt:{styles:["Regular fit","Oversized","Relaxed","Polo"],looks:["Minimal","Plain","Printed","Graphic"],sizes:["S", "M", "L", "XL", "XXL"]},
  men_shirt:{styles:["Regular fit","Relaxed","Slim fit","Overshirt"],looks:["Solid","Checks","Stripes","Printed"],sizes:["S", "M", "L", "XL", "XXL"]},
  men_jeans:{styles:["Straight","Slim","Relaxed","Tapered"],looks:["Clean","Washed","Distressed","Dark"],sizes:["28", "30", "32", "34", "36", "38"]},
  men_trousers:{styles:["Straight","Slim","Relaxed","Cargo"],looks:["Formal","Smart casual","Casual","Utility"],sizes:["28", "30", "32", "34", "36", "38"]},
  men_shorts:{styles:["Regular","Relaxed","Cargo"],looks:["Plain","Printed","Utility"],sizes:["S", "M", "L", "XL", "XXL"]},
  men_ethnic:{styles:["Kurta","Kurta set","Casual ethnic shirt","Other"],looks:["Minimal","Traditional","Festive","Contemporary"],sizes:["S", "M", "L", "XL", "XXL"]},
  men_overshirt:{styles:["Overshirt","Light jacket","Bomber","Denim jacket"],looks:["Plain","Utility","Minimal","Printed"],sizes:["S", "M", "L", "XL", "XXL"]},
  women_top:{styles:["Regular","Relaxed","Fitted","Cropped"],looks:["Minimal","Printed","Textured","Embroidered"],sizes:["XS", "S", "M", "L", "XL", "XXL"]},
  women_dress:{styles:["Midi","Maxi","Mini","Shirt dress"],looks:["Minimal","Floral","Printed","Solid"],sizes:["XS", "S", "M", "L", "XL", "XXL"]},
  women_jeans:{styles:["Straight","Wide leg","Slim","Relaxed"],looks:["Clean","Washed","Distressed","Dark"],sizes:["26", "28", "30", "32", "34", "36"]},
  women_trousers:{styles:["Straight","Wide leg","Slim","Cargo"],looks:["Formal","Smart casual","Casual","Utility"],sizes:["26", "28", "30", "32", "34", "36"]},
  women_kurti:{styles:["Straight","A-line","Anarkali","Short kurti"],looks:["Minimal","Printed","Embroidered","Traditional"],sizes:["S", "M", "L", "XL", "XXL", "3XL"]},
  women_ethnic:{styles:["Kurta set","Anarkali set","Co-ord ethnic","Festive set"],looks:["Minimal","Printed","Embroidered","Festive"],sizes:["S", "M", "L", "XL", "XXL", "3XL"]},
  women_saree:{styles:["Everyday","Festive","Office","Occasion"],looks:["Minimal","Printed","Woven","Embroidered"],sizes:["Free size"]},
  women_coords:{styles:["Casual","Smart casual","Relaxed","Statement"],looks:["Minimal","Printed","Solid","Textured"],sizes:["XS", "S", "M", "L", "XL", "XXL"]},
  kids_boys:{styles:["T-shirt + shorts","Shirt + shorts","T-shirt + jeans","Set"],looks:["Minimal","Graphic","Printed","Character"],sizes:["2–3Y", "4–5Y", "6–7Y", "8–9Y", "10–11Y", "12–13Y"]},
  kids_girls:{styles:["Dress","Top + bottom","Set","Ethnic"],looks:["Minimal","Floral","Printed","Character"],sizes:["2–3Y", "4–5Y", "6–7Y", "8–9Y", "10–11Y", "12–13Y"]},
  kids_ethnic:{styles:["Kurta set","Lehenga","Festive set","Traditional"],looks:["Minimal","Festive","Embroidered","Printed"],sizes:["2–3Y", "4–5Y", "6–7Y", "8–9Y", "10–11Y", "12–13Y"]},
  acc_jewellery:{styles:["Earrings","Necklace","Bracelet","Ring"],looks:["Minimal","Statement","Everyday","Occasion"],sizes:["Free size"]},
  acc_bags:{styles:["Tote","Sling","Shoulder","Backpack"],looks:["Minimal","Structured","Casual","Statement"],sizes:["One size"]},
  acc_belts:{styles:["Leather-look","Canvas","Braided","Minimal"],looks:["Minimal","Classic","Casual","Statement"],sizes:["S", "M", "L", "XL"]},
  acc_caps:{styles:["Baseball","Dad cap","Bucket","Structured"],looks:["Plain","Logo","Graphic","Minimal"],sizes:["One size"]}
};

const PRICE_DATA = {
  men_tshirt:["₹399–599","₹600–799","₹800–999","₹1,000+"],
  men_shirt:["₹599–699","₹800–999","₹1,200–1,499","₹1,500+"],
  men_jeans:["₹799–999","₹1,000–1,499","₹1,500–1,999","₹2,000+"],
  men_trousers:["₹799–999","₹1,000–1,399","₹1,400–1,599","₹1,600+"],
  men_shorts:["₹499–699","₹700–899","₹900–1,199","₹1,200+"],
  men_ethnic:["₹699–999","₹1,000–1,499","₹1,500–1,999","₹2,000+"],
  men_overshirt:["₹799–999","₹1,000–1,499","₹1,500–1,999","₹2,000+"],
  women_top:["₹499–599","₹700–899","₹900–1,299","₹1,300+"],
  women_dress:["₹799–999","₹1,000–1,499","₹1,500–1,699","₹1,700+"],
  women_jeans:["₹799–999","₹1,000–1,499","₹1,500–1,999","₹2,000+"],
  women_trousers:["₹699–999","₹1,000–1,399","₹1,400–1,699","₹1,700+"],
  women_kurti:["₹599–799","₹900–1,199","₹1,200–1,499","₹1,500+"],
  women_ethnic:["₹799–999","₹1,000–1,499","₹1,500–1,999","₹2,000+"],
  women_saree:["₹699–999","₹1,000–1,499","₹1,500–2,499","₹2,500+"],
  women_coords:["₹799–999","₹1,000–1,499","₹1,500–1,999","₹2,000+"],
  kids_boys:["₹399–599","₹600–899","₹900–1,199","₹1,200+"],
  kids_girls:["₹399–599","₹600–899","₹900–1,199","₹1,200+"],
  kids_ethnic:["₹499–699","₹700–999","₹1,000–1,499","₹1,500+"],
  acc_jewellery:["₹199–399","₹400–699","₹700–999","₹1,000+"],
  acc_bags:["₹399–699","₹700–999","₹1,000–1,499","₹1,500+"],
  acc_belts:["₹199–399","₹400–699","₹700–999","₹1,000+"],
  acc_caps:["₹199–399","₹400–599","₹600–799","₹800+"]
};

const state = {
  step: 1,
  responseId: makeResponseId(),
  answers: {},
  products: [],
  styles: {},
  prices: {}
};

const screens = [...document.querySelectorAll(".survey-screen")];
const $ = id => document.getElementById(id);

function makeResponseId(){
  const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s="";
  for(let i=0;i<6;i++) s += chars[Math.floor(Math.random()*chars.length)];
  const d=new Date(), y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,"0"), day=String(d.getDate()).padStart(2,"0");
  return `MGF-${y}${m}${day}-${s}`;
}
function selected(field){
  return state.answers[field] ?? [];
}
function setValue(field,value){
  state.answers[field]=value;
}
function setMulti(field,value){
  const arr=Array.isArray(state.answers[field]) ? [...state.answers[field]] : [];
  const i=arr.indexOf(value);
  if(i>=0) arr.splice(i,1); else arr.push(value);
  state.answers[field]=arr;
}
function optionText(btn){ return btn.textContent.trim(); }

function bindOptions(){
  document.querySelectorAll(".options[data-field],.ratings[data-field]").forEach(group=>{
    group.querySelectorAll("button").forEach(btn=>{
      btn.addEventListener("click",()=>{
        const field=group.dataset.field, value=btn.dataset.value;
        if(group.classList.contains("multi")){
          const current=Array.isArray(state.answers[field])?state.answers[field]:[];
          if(btn.classList.contains("selected")){ setMulti(field,value); btn.classList.remove("selected"); if(field==="firstVisitTriggers") renderTopTrigger(); }
          else {
            const max=group.classList.contains("max3")?3:Infinity;
            if(current.length>=max){ showError(`Please select up to ${max}.`); return; }
            setMulti(field,value); btn.classList.add("selected"); if(field==="firstVisitTriggers") renderTopTrigger();
          }
        } else {
          group.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));
          btn.classList.add("selected"); setValue(field,value);
          if(field==="firstVisitTriggers") renderTopTrigger();
        }
        clearError();
      });
    });
  });
  document.querySelectorAll("[data-field]:is(input,textarea,select)").forEach(el=>{
    el.addEventListener("input",()=>{setValue(el.dataset.field,el.value);clearError()});
    el.addEventListener("change",()=>{setValue(el.dataset.field,el.value);clearError()});
  });
}

function renderProducts(){
  const shopFor=state.answers.shopFor||[];
  const sections=[];
  const showMen=shopFor.some(x=>["myself","partner","parents","whole_family"].includes(x));
  const showWomen=showMen;
  const showKids=shopFor.some(x=>["children","whole_family"].includes(x));
  const showAcc=true;
  if(showMen) sections.push(PRODUCT_DATA.men);
  if(showWomen) sections.push(PRODUCT_DATA.women);
  if(showKids) sections.push(PRODUCT_DATA.children);
  if(showAcc) sections.push(PRODUCT_DATA.accessories);
  $("products").innerHTML=sections.map(sec=>`
    <div class="q"><label>${sec.label}</label><span class="hint">Select up to 5 in total.</span>
      <div class="options product-options multi">${sec.products.map(([id,label])=>`<button data-product="${id}">${label}</button>`).join("")}</div>
    </div>`).join("");
  $("products").querySelectorAll("button").forEach(btn=>{
    if(state.products.includes(btn.dataset.product)) btn.classList.add("selected");
    btn.onclick=()=>{
      const id=btn.dataset.product, i=state.products.indexOf(id);
      if(i>=0){state.products.splice(i,1);btn.classList.remove("selected")}
      else {if(state.products.length>=5){showError("Please select up to 5 products.");return} state.products.push(id);btn.classList.add("selected")}
      clearError();
    };
  });
}

function renderTopTrigger(){
  const chosen=state.answers.firstVisitTriggers||[];
  $("topTrigger").innerHTML=chosen.length
    ? chosen.map(v=>{
        const btn=[...document.querySelectorAll('[data-field="firstVisitTriggers"] button')].find(b=>b.dataset.value===v);
        return `<button data-value="${v}">${btn?optionText(btn):v}</button>`;
      }).join("")
    : `<span class="hint">Choose one of the reasons you selected above.</span>`;

  $("topTrigger").querySelectorAll("button").forEach(btn=>{
    btn.classList.toggle("selected",state.answers.topVisitTrigger===btn.dataset.value);
    btn.onclick=()=>{
      setValue("topVisitTrigger",btn.dataset.value);
      $("topTrigger").querySelectorAll("button").forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
      clearError();
    };
  });
}

function dynamicCard(id,label,data){
  const old=state.styles[id]||{};
  return `<div class="dynamic-card"><div class="dynamic-title">${label}</div>
    <div class="mini-q"><span class="hint">Fit / format</span><div class="chips">${data.styles.map(x=>`<button data-sid="${id}" data-kind="styles" data-value="${x}" class="${old.styles===x?"selected":""}">${x}</button>`).join("")}</div></div>
    <div class="mini-q"><span class="hint">Look</span><div class="chips">${data.looks.map(x=>`<button data-sid="${id}" data-kind="looks" data-value="${x}" class="${old.looks===x?"selected":""}">${x}</button>`).join("")}</div></div>
    <div class="mini-q"><span class="hint">Preferred size</span><div class="chips">${(data.sizes||["One size"]).map(x=>`<button data-sid="${id}" data-kind="size" data-value="${x}" class="${old.size===x?"selected":""}">${x}</button>`).join("")}</div></div>
  </div>`;
}
function colour(x){
  return ({Black:"#111",White:"#fff",Navy:"#1d2b45",Grey:"#aaa","Dark blue":"#18395e","Mid blue":"#47749c","Light blue":"#91b9d6",Beige:"#d9c6a2",Cream:"#eee1c7",Olive:"#697052",Brown:"#68442e",Tan:"#b98554",Red:"#a33",Blue:"#4774a5",Pink:"#e7a9b8",Purple:"#8763a3",Pastels:"#d9c9d4","Earth tones":"#9b7a58","Bright colours":"#e85d5d","Pastel":"#d9c9d4",Gold:"#c9a44b",Silver:"#aaa","Rose gold":"#d6a19b",Mixed:"linear-gradient(135deg,#c9a44b 50%,#aaa 50%)",Other:"#ddd"})[x]||"#ddd";
}
function renderStyles(){
  $("styles").innerHTML=state.products.map(id=>{
    const label=findProductLabel(id), data=STYLE_DATA[id];
    return dynamicCard(id,label,data);
  }).join("") + `<div class="q"><label>How easy is it to find your preferred size locally?</label><div class="options" data-field="sizeAvailability"><button data-value="very_easy">Very easy</button><button data-value="usually_easy">Usually easy</button><button data-value="sometimes">Sometimes difficult</button><button data-value="often">Often difficult</button><button data-value="very_difficult">Very difficult</button></div></div>`;
  $("styles").querySelectorAll(".chips button").forEach(btn=>btn.onclick=()=>{
    const {sid,kind,value}=btn.dataset; state.styles[sid] ||= {}; state.styles[sid][kind]=value;
    btn.parentElement.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");clearError();
  });
  const sizeGroup=$('styles').querySelector('[data-field="sizeAvailability"]');
  sizeGroup.querySelectorAll("button").forEach(btn=>{if(state.answers.sizeAvailability===btn.dataset.value)btn.classList.add("selected");btn.onclick=()=>{sizeGroup.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");setValue("sizeAvailability",btn.dataset.value);clearError()}});
}
function renderPrices(){
  $("prices").innerHTML=state.products.map(id=>{
    const label=findProductLabel(id), values=PRICE_DATA[id]||["₹499–699","₹700–999","₹1,000–1,499","₹1,500+"];
    const old=state.prices[id];
    return `<div class="dynamic-card"><div class="dynamic-title">${label}</div><div class="price-grid">${values.map(v=>`<button data-pid="${id}" data-value="${v}" class="${old===v?"selected":""}">${v}</button>`).join("")}</div></div>`;
  }).join("");
  $("prices").querySelectorAll("button").forEach(btn=>btn.onclick=()=>{
    state.prices[btn.dataset.pid]=btn.dataset.value;
    btn.parentElement.querySelectorAll("button").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");clearError();
  });
}
function findProductLabel(id){
  for(const sec of Object.values(PRODUCT_DATA)){const p=sec.products.find(x=>x[0]===id);if(p)return p[1]}
  return id;
}

function validateStep(){
  // Free navigation: unanswered questions never block moving forward.
  clearError();
  return true;
}
function showError(msg){$("error").textContent=msg}
function clearError(){$("error").textContent=""}

function showStep(n){
  state.step=n;
  screens.forEach(s=>s.hidden=Number(s.dataset.step)!==n);
  $("screenNo").textContent=n;
  $("progress").style.width=`${n*10}%`;
  $("backBtn").style.visibility=n===1?"hidden":"visible";
  $("nextBtn").textContent="";
  $("nextBtn").innerHTML=n===10?"Submit survey <b>✓</b>":`Continue <b>→</b>`;
  if(n===5)renderTopTrigger();
  if(n===7)renderProducts();
  if(n===8)renderStyles();
  if(n===9)renderPrices();
  window.scrollTo({top:0,behavior:"smooth"});
}
function collectPayload(){
  return {
    responseId:state.responseId,timestamp:new Date().toISOString(),
    ...state.answers,
    selectedProducts:state.products.map(id=>({id,label:findProductLabel(id),preferences:state.styles[id]||{},price:state.prices[id]||""})),
    source:"mangalore-fashion-survey"
  };
}
async function submit(){
  const payload=collectPayload();
  localStorage.setItem("mangaloreFashionSurveySubmitted",state.responseId);

  if(APPS_SCRIPT_URL){
    try{
      await fetch(APPS_SCRIPT_URL,{
        method:"POST",
        mode:"no-cors",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify(payload)
      });
    }catch(e){
      console.warn("Submission request failed",e);
    }
  }

  document.querySelectorAll(".survey-screen").forEach(s=>s.hidden=true);
  $("thanks").hidden=false;
  $("footer").hidden=true;
  $("responseId").textContent=state.responseId;
  $("backBtn").style.visibility="hidden";
  $("screenNo").textContent="✓";
  $("progress").style.width="100%";
}
$("startBtn").onclick=()=>{
  // Remove the landing screen completely so its headline can never
  // remain visible or reappear during the survey.
  const intro = $("intro");
  if (intro) intro.remove();

  $("survey").hidden=false;
  $("survey").classList.add("survey-only");
  showStep(1);
};
$("backBtn").onclick=()=>{if(state.step>1)showStep(state.step-1)};
$("nextBtn").onclick=()=>{if(!validateStep())return;if(state.step<10)showStep(state.step+1);else submit()};
bindOptions();
