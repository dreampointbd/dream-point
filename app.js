// Dream Point - পেজ দেখানো, ফিল্টার আর WhatsApp অর্ডারের কোড। সাধারণত এই ফাইল বদলাতে হবে না।
const app = document.getElementById("app");
const slug = n => n.toLowerCase().replace(/[^a-z0-9]/g, "");
const WA_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="vertical-align:-4px;margin-right:8px"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
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
    <a class="btn wa" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello Dream Point!")}" target="_blank" rel="noopener">${WA_ICON}Chat on WhatsApp</a></div></section>`;
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
      <a id="order" class="btn wa" target="_blank" rel="noopener" aria-disabled="${!P.stock}">${P.stock ? WA_ICON + "Order on WhatsApp" : "Out of stock"}</a>
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
