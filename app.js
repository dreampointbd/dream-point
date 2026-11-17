// Dream Point - পেজ দেখানো, ফিল্টার আর WhatsApp অর্ডারের কোড। সাধারণত এই ফাইল বদলাতে হবে না।
const app = document.getElementById("app");
const slug = n => n.toLowerCase().replace(/[^a-z0-9]/g, "");
const tk = n => "৳" + Number(n).toLocaleString("en-US");
const unit = p => p.discountPrice || p.price;
const shown = () => PRODUCTS.filter(p => p.active !== false);

function priceHtml(p){
  return p.discountPrice
    ? `<span class="now">${tk(p.discountPrice)}</span> <s>${tk(p.price)}</s>`
    : `<span class="now">${tk(p.price)}</span>`;
}
function pic(p, i = 0){
  const src = (p.images && p.images[i]) || (i === 0 && p.image);
  return src ? `<img src="${src}" alt="${p.name} - ${p.category} by Dream Point" loading="lazy">` : `<div class="ph">${p.category}</div>`;
}
function card(p){
  const off = p.discountPrice ? Math.round((1 - p.discountPrice / p.price) * 100) : 0;
  return `<article class="card">
    <a class="pic" href="#product-${p.id}">${pic(p)}
      ${p.demo ? '<span class="badge">DEMO</span>' : ""}
      ${!p.stock ? '<span class="badge b2">Sold out</span>' : off ? `<span class="badge b2">-${off}%</span>` : ""}
    </a>
    <div class="info"><small>${p.category}</small><h3>${p.name}</h3><div>${priceHtml(p)}</div>
      <div class="acts"><a href="#product-${p.id}">View Details</a><a class="o" href="#product-${p.id}">Order Now</a></div>
    </div></article>`;
}
const cardsOrEmpty = list => list.length ? `<div class="grid">${list.map(card).join("")}</div>` : '<p class="empty">No products found here yet.</p>';

/* ---------- Home ---------- */
function home(){
  const L = shown();
  app.innerHTML = `
  <section class="hero"><div class="wrap">
    <h1>Style That Defines You.</h1>
    <p>Discover your everyday style with Dream Point. Explore fashion collections designed for your lifestyle.</p>
    <a class="btn" href="#shop">Shop Now</a>
  </div></section>
  <section><div class="wrap"><h2>Shop by category</h2><div class="cats">
    ${CATEGORIES.map(c => `<a class="cat" href="#shop-${slug(c.name)}">${c.image ? `<img src="${c.image}" alt="${c.name}" loading="lazy">` : ""}<span>${c.name}</span></a>`).join("")}
  </div></div></section>
  <section><div class="wrap"><h2>New arrivals</h2>${cardsOrEmpty(L.filter(p => p.newArrival).slice(0, 4))}</div></section>
  <section><div class="wrap"><h2>Featured</h2>${cardsOrEmpty(L.filter(p => p.featured).slice(0, 4))}</div></section>
  <section class="why"><div class="wrap"><h2>Why shop with Dream Point?</h2><div class="grid">
    <div><h3>Easy WhatsApp ordering</h3><p>Pick your size and colour, then send your order in one tap.</p></div>
    <div><h3>Fashion collections</h3><p>Panjabi, sweater, t-shirt, hoodie, jacket, shirt and combos.</p></div>
    <div><h3>Direct communication</h3><p>Talk to us directly about availability and details.</p></div>
    <div><h3>Simple shopping</h3><p>No account, no long forms.</p></div>
  </div></div></section>
  ${contactBlock()}`;
}
function contactBlock(){
  return `<section class="wasec"><div class="wrap"><h2>Questions? Message us</h2>
    <p>Chat with Dream Point on WhatsApp about products, sizes and availability.</p>
    <a class="btn wa" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello Dream Point!")}" target="_blank" rel="noopener">Chat on WhatsApp</a></div></section>`;
}

/* ---------- Shop ---------- */
let S = { cat: "All", q: "", sort: "new" };
function shop(cat){
  S.cat = cat || "All";
  app.innerHTML = `<section><div class="wrap"><h2>Shop</h2>
    <div class="ctl">
      <input id="q" type="search" placeholder="Search by product name" value="${S.q}" aria-label="Search">
      <div class="chips" id="chips">${["All", ...CATEGORIES.map(c => c.name)].map(n => `<button data-c="${n}" class="${n === S.cat ? "on" : ""}">${n}</button>`).join("")}</div>
      <select id="sort" aria-label="Sort"><option value="new">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
    </div><div id="list"></div></div></section>`;
  document.getElementById("sort").value = S.sort;
  document.getElementById("q").oninput = e => { S.q = e.target.value; list(); };
  document.getElementById("sort").onchange = e => { S.sort = e.target.value; list(); };
  document.getElementById("chips").onclick = e => {
    if (!e.target.dataset.c) return;
    S.cat = e.target.dataset.c;
    document.querySelectorAll("#chips button").forEach(b => b.classList.toggle("on", b === e.target));
    list();
  };
  list();
}
function list(){
  let L = shown().filter(p => (S.cat === "All" || p.category === S.cat) && p.name.toLowerCase().includes(S.q.trim().toLowerCase()));
  if (S.sort === "low") L.sort((a, b) => unit(a) - unit(b));
  else if (S.sort === "high") L.sort((a, b) => unit(b) - unit(a));
  else L.sort((a, b) => b.id - a.id);
  document.getElementById("list").innerHTML = cardsOrEmpty(L);
  reveal(document.getElementById("list"));
}

/* ---------- Product ---------- */
let P, sel;
function product(id){
  P = shown().find(p => p.id === Number(id));
  if (!P) { app.innerHTML = '<section><div class="wrap"><p class="empty">Product not found. <a href="#shop"><u>Back to shop</u></a></p></div></section>'; return; }
  sel = { size: P.sizes[0], color: P.colors[0], qty: 1, img: 0 };
  const imgs = P.images && P.images.length ? P.images : [P.image];
  const rel = shown().filter(p => p.category === P.category && p.id !== P.id).slice(0, 4);
  document.title = `${P.name} | Dream Point`;
  app.innerHTML = `<section><div class="wrap"><div class="pd">
    <div><div class="pic" id="main">${pic(P, 0)}</div>
      ${imgs.length > 1 ? `<div class="thumbs">${imgs.map((_, i) => `<button onclick="swapImg(${i})" aria-label="Photo ${i + 1}">${pic(P, i)}</button>`).join("")}</div>` : ""}</div>
    <div>
      <small>${P.category}</small><h1 style="font-size:1.8rem;font-weight:500">${P.name}</h1>
      <div class="big">${priceHtml(P)}</div>
      ${P.demo ? '<p class="note">Demo product, to be replaced with real stock.</p>' : ""}
      <p style="margin:12px 0">${P.description}</p>
      <p><b>Size</b></p><div class="opts" id="sizes">${P.sizes.map((s, i) => `<button class="${i ? "" : "on"}" onclick="pick('size','${s}',this)">${s}</button>`).join("")}</div>
      <p><b>Colour</b></p><div class="opts" id="colors">${P.colors.map((c, i) => `<button class="${i ? "" : "on"}" onclick="pick('color','${c}',this)">${c}</button>`).join("")}</div>
      <p><b>Quantity</b></p><div class="qty"><button onclick="setQty(-1)" aria-label="Less">−</button><span id="q">1</span><button onclick="setQty(1)" aria-label="More">+</button></div>
      <p class="big">Total: <span id="tot"></span></p>
      <p style="margin-bottom:10px">${P.stock ? "In stock" : "Currently out of stock"}</p>
      <a id="order" class="btn wa" target="_blank" rel="noopener" aria-disabled="${!P.stock}">${P.stock ? "Order on WhatsApp" : "Out of stock"}</a>
      <p class="note">Your order is not confirmed until you send the WhatsApp message and we reply.</p>
    </div></div>
    ${rel.length ? `<h2 style="margin-top:40px">Related products</h2>${cardsOrEmpty(rel)}` : ""}
  </div></section>`;
  refresh();
}
function swapImg(i){ document.getElementById("main").innerHTML = pic(P, i); }
function pick(k, v, el){ sel[k] = v; el.parentNode.querySelectorAll("button").forEach(b => b.classList.toggle("on", b === el)); refresh(); }
function setQty(d){ sel.qty = Math.max(1, Math.min(20, sel.qty + d)); refresh(); }
function refresh(){
  const total = unit(P) * sel.qty;
  document.getElementById("q").textContent = sel.qty;
  document.getElementById("tot").textContent = tk(total);
  if (!P.stock) return;
  const msg = `Hello Dream Point!\n\nI would like to order the following product:\n\nProduct Name: ${P.name}\nPrice: ${tk(unit(P))}\nSize: ${sel.size}\nColor: ${sel.color}\nQuantity: ${sel.qty}\nTotal: ${tk(total)}\nLink: ${location.href}\n\nPlease confirm availability and provide the ordering details.\n\nThank you!`;
  document.getElementById("order").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

/* ---------- Other pages ---------- */
const text = (t, body) => { app.innerHTML = `<section><div class="wrap" style="max-width:700px"><h2>${t}</h2>${body}</div></section>`; };
function contact(){ app.innerHTML = contactBlock(); }

/* ---------- Animations ---------- */
const calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }) : null;
function reveal(root){
  if (calm) return;
  root.querySelectorAll(".cat,.card,section h2,.why .grid > div,.wasec .wrap,.pd > div,.ctl").forEach(el => {
    const i = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty("--d", Math.min(i, 5) * 0.09 + "s");
    el.classList.add("rv");
    io ? io.observe(el) : el.classList.add("in");
  });
}

/* ---------- Router and footer ---------- */
function route(){
  const [page, ...r] = location.hash.replace(/^#/, "").split("-");
  const arg = r.join("-");
  document.title = "Dream Point | Online Clothing Shop Bangladesh";
  if (page === "shop") shop((CATEGORIES.find(c => slug(c.name) === arg) || { name: "All" }).name);
  else if (page === "product") product(arg);
  else if (page === "contact") contact();
  else if (page === "privacy") text("Privacy Policy", "<p>Dream Point does not collect accounts or payments on this website. When you order, the details you send through WhatsApp are used only to reply to and process your order.</p>");
  else if (page === "terms") text("Terms and Conditions", "<p>Orders are placed through WhatsApp. An order is confirmed only after Dream Point replies and agrees on availability, price and delivery details.</p>");
  else home();
  window.scrollTo(0, 0);
  app.classList.remove("page"); void app.offsetWidth; app.classList.add("page");
  reveal(app);
  document.getElementById("nav").classList.remove("open");
}
document.getElementById("burger").onclick = e => {
  const o = document.getElementById("nav").classList.toggle("open");
  e.target.setAttribute("aria-expanded", o);
};
document.getElementById("foot").innerHTML = `<div class="cols">
  <div><h4>DREAM POINT</h4><p>Premium style. Simple shopping. Direct connection.</p></div>
  <div><h4>Categories</h4>${CATEGORIES.map(c => `<a href="#shop-${slug(c.name)}">${c.name}</a>`).join("")}</div>
  <div><h4>Contact</h4><a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener">WhatsApp: +${WHATSAPP}</a>
    <a href="#privacy">Privacy Policy</a><a href="#terms">Terms and Conditions</a></div>
  </div><div class="c">© Dream Point</div>`;
window.addEventListener("hashchange", route);
route();
