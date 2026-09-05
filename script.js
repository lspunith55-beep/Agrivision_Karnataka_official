// ======================================
// AGRIVISION KARNATAKA
// PREMIUM SCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", () => {

const header = document.getElementById("header");
const scrollTop = document.querySelector(".scroll-top");
const year = document.getElementById("year");

// ===============================
// HEADER EFFECT
// ===============================

window.addEventListener("scroll", () => {

if(window.scrollY > 80){

header.style.background="rgba(8,20,12,0.45)";
header.style.backdropFilter="blur(20px)";
header.style.boxShadow="0 10px 30px rgba(0,0,0,.3)";

}else{

header.style.background="rgba(8,20,12,.18)";
header.style.boxShadow="none";

}

});

// ===============================
// SCROLL TOP
// ===============================

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

scrollTop.classList.add("show");

}else{

scrollTop.classList.remove("show");

}

});

scrollTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

// ===============================
// FOOTER YEAR
// ===============================

if(year){

year.textContent=new Date().getFullYear();

}

// ===============================
// COUNTER ANIMATION
// ===============================

const counters=document.querySelectorAll("[data-count]");

const startCounter=(counter)=>{

const target=+counter.dataset.count;

let count=0;

const speed=target/150;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count).toLocaleString();

requestAnimationFrame(update);

}else{

counter.innerText=target.toLocaleString();

}

};

update();

};

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

startCounter(entry.target);

observer.unobserve(entry.target);

}

});

});

counters.forEach(counter=>observer.observe(counter));

// ===============================
// SCROLL REVEAL
// ===============================

const reveals=document.querySelectorAll(

".about-card,.support-card,.vision-item,.stat-box"

);

const revealObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{threshold:.2});

reveals.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(60px)";
card.style.transition=".8s";

revealObserver.observe(card);

});

});// ======================================
// MOUSE GLOW
// ======================================

const mouseGlow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove",(e)=>{

if(mouseGlow){

mouseGlow.style.left=e.clientX+"px";

mouseGlow.style.top=e.clientY+"px";

}

});

// ======================================
// MULTICOLOR CURSOR STARS
// ======================================

const starColors=[

"#ffffff",
"#00ff88",
"#00d4ff",
"#ffd54f",
"#b26bff"

];

document.addEventListener("mousemove",(e)=>{

const star=document.createElement("div");

star.className="cursor-star";

const size=Math.random()*6+3;

star.style.width=size+"px";

star.style.height=size+"px";

star.style.left=e.clientX+"px";

star.style.top=e.clientY+"px";

const color=starColors[Math.floor(Math.random()*starColors.length)];

star.style.background=color;

star.style.color=color;

document.body.appendChild(star);

setTimeout(()=>{

star.remove();

},900);

});

// ======================================
// FLOATING LEAVES
// ======================================

const leafContainer=document.querySelector(".floating-leaves");

const leafIcons=[

"🍃",
"🌿",
"🍂"

];

function createLeaf(){

if(!leafContainer) return;

const leaf=document.createElement("div");

leaf.className="leaf";

leaf.innerHTML=leafIcons[Math.floor(Math.random()*leafIcons.length)];

leaf.style.left=Math.random()*100+"vw";

leaf.style.fontSize=(18+Math.random()*28)+"px";

leaf.style.animationDuration=(8+Math.random()*8)+"s";

leaf.style.animationDelay=Math.random()*2+"s";

leafContainer.appendChild(leaf);

setTimeout(()=>{

leaf.remove();

},17000);

}

setInterval(createLeaf,700);

// ======================================
// FIREFLIES
// ======================================

const fireflyContainer=document.querySelector(".fireflies");

function createFirefly(){

if(!fireflyContainer) return;

const firefly=document.createElement("div");

firefly.className="firefly";

firefly.style.left=Math.random()*100+"vw";

firefly.style.top=Math.random()*100+"vh";

firefly.style.animationDuration=(3+Math.random()*5)+"s";

fireflyContainer.appendChild(firefly);

setTimeout(()=>{

firefly.remove();

},8000);

}

setInterval(createFirefly,300);

// ======================================
// LIGHT TRAILS
// ======================================

const lightContainer=document.querySelector(".light-trails");

function createTrail(){

if(!lightContainer) return;

const trail=document.createElement("div");

trail.style.left=Math.random()*100+"vw";

trail.style.top="-120px";

trail.style.width="2px";

trail.style.height=(120+Math.random()*120)+"px";

trail.style.opacity=".45";

trail.style.transform="rotate(25deg)";

trail.animate(

[
{transform:"translateY(0) rotate(25deg)",opacity:.6},
{transform:"translateY(120vh) rotate(25deg)",opacity:0}
],

{

duration:2500+Math.random()*2000,

iterations:1

}

);

lightContainer.appendChild(trail);

setTimeout(()=>{

trail.remove();

},5000);

}

setInterval(createTrail,1000);// ======================================
// MOBILE MENU
// ======================================

const mobileMenu=document.querySelector(".mobile-menu");
const nav=document.querySelector("nav");

if(mobileMenu){

mobileMenu.addEventListener("click",()=>{

nav.classList.toggle("active");

});

}

// ======================================
// SMOOTH ACTIVE NAVIGATION
// ======================================

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-150;

const sectionHeight=section.offsetHeight;

if(window.scrollY>=sectionTop){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

// ======================================
// 3D CARD EFFECT
// ======================================

document.querySelectorAll(
".support-card,.about-card,.vision-item,.stat-box"
).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=((y-rect.height/2)/18);

const rotateY=((rect.width/2-x)/18);

card.style.transform=
`perspective(900px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="perspective(900px) rotateX(0) rotateY(0)";

});

});

// ======================================
// BUTTON RIPPLE
// ======================================

document.querySelectorAll(".primary-btn").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(this.clientWidth,this.clientHeight);

const rect=this.getBoundingClientRect();

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=(e.clientX-rect.left-size/2)+"px";

ripple.style.top=(e.clientY-rect.top-size/2)+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

// ======================================
// HERO FADE-IN
// ======================================

const hero=document.querySelector(".hero-content");

if(hero){

hero.animate(

[
{
opacity:0,
transform:"translateY(60px)"
},
{
opacity:1,
transform:"translateY(0)"
}
],

{
duration:1500,
fill:"forwards",
easing:"ease-out"
}

);

}

// ======================================
// PARALLAX BACKGROUND
// ======================================

window.addEventListener("mousemove",(e)=>{

const bg=document.querySelector(".background-image");

if(!bg) return;

const x=(e.clientX/window.innerWidth-0.5)*10;

const y=(e.clientY/window.innerHeight-0.5)*10;

bg.style.transform=`translate(${x}px,${y}px) scale(1.03)`;

});

// ======================================
// PERFORMANCE
// ======================================

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});

// ======================================
// END
// ======================================
/*=========================================================
AGRIVISION KARNATAKA
REGISTER PAGE
script.js
PART 1
=========================================================*/

/*=========================================================
GLOBAL VARIABLES
=========================================================*/

let currentStep = 1;

const totalSteps = 7;

/*=========================================================
INITIALIZE PAGE
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

showStep(currentStep);

updateProgress();

initializePasswordToggle();

initializePasswordStrength();

initializeScrollReveal();

initializeCounterAnimation();

initializeCursorGlow();

initializeMouseSpotlight();

initializeLeaves();

initializeFireflies();

initializeRippleButtons();

initializeTiltCards();

});

/*=========================================================
SHOW STEP
=========================================================*/

function showStep(step){

document
.querySelectorAll(".form-step")
.forEach(section=>{

section.classList.remove("active");

});

const activeStep=document.getElementById("step"+step);

if(activeStep){

activeStep.classList.add("active");

}

document.getElementById("currentStepNumber").textContent=step;

updateProgress();

window.scrollTo({

top:document
.getElementById("registration")
.offsetTop-80,

behavior:"smooth"

});

}

/*=========================================================
NEXT STEP
=========================================================*/

function nextStep(){

if(!validateCurrentStep()){

return;

}

if(currentStep<totalSteps){

currentStep++;

showStep(currentStep);

if(currentStep===4){

showRoleForm();

}

if(currentStep===6){

generateReview();

}

}

}

/*=========================================================
PREVIOUS STEP
=========================================================*/

function previousStep(){

if(currentStep>1){

currentStep--;

showStep(currentStep);

}

}

/*=========================================================
PROGRESS BAR
=========================================================*/

function updateProgress(){

const progress=document.querySelector(".progress-fill");

const percentage=(currentStep/totalSteps)*100;

progress.style.width=percentage+"%";

}

/*=========================================================
SCROLL TO FORM
=========================================================*/

function scrollToRegistration(){

document
.getElementById("registration")
.scrollIntoView({

behavior:"smooth"

});

}

/*=========================================================
PASSWORD SHOW/HIDE
=========================================================*/

function initializePasswordToggle(){

document
.querySelectorAll(".toggle-password")
.forEach(button=>{

button.addEventListener("click",()=>{

const input=
button.parentElement.querySelector("input");

if(input.type==="password"){

input.type="text";

button.textContent="🙈";

}

else{

input.type="password";

button.textContent="👁";

}

});

});

}

/*=========================================================
PASSWORD STRENGTH
=========================================================*/

function initializePasswordStrength(){

const password=document.getElementById("password");

const bar=document.querySelector(".password-strength-fill");

if(!password||!bar)return;

password.addEventListener("input",()=>{

const value=password.value;

let strength=0;

if(value.length>=8)strength++;

if(/[A-Z]/.test(value))strength++;

if(/[a-z]/.test(value))strength++;

if(/[0-9]/.test(value))strength++;

if(/[^A-Za-z0-9]/.test(value))strength++;

const width=(strength/5)*100;

bar.style.width=width+"%";

if(width<40){

bar.style.background="#ff5252";

}

else if(width<80){

bar.style.background="#ffd54f";

}

else{

bar.style.background="#00e676";

}

});

}/*=========================================================
VALIDATION
script.js
PART 2
=========================================================*/

/*=========================================================
VALIDATE CURRENT STEP
=========================================================*/

function validateCurrentStep(){

switch(currentStep){

case 1:

return validateStep1();

case 2:

return validateStep2();

case 3:

return validateStep3();

case 4:

return validateStep4();

case 5:

return validateStep5();

case 6:

return validateStep6();

default:

return true;

}

}

/*=========================================================
STEP 1
=========================================================*/

function validateStep1(){

const fullName=document.getElementById("fullName").value.trim();

const email=document.getElementById("email").value.trim();

const mobile=document.getElementById("mobile").value.trim();

const username=document.getElementById("username").value.trim();

const password=document.getElementById("password").value;

const confirm=document.getElementById("confirmPassword").value;

const dob=document.getElementById("dob").value;

const gender=document.getElementById("gender").value;

if(fullName===""){

alert("Enter your Full Name");

return false;

}

const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){

alert("Enter a valid Email Address");

return false;

}

if(!/^[6-9]\d{9}$/.test(mobile)){

alert("Enter a valid Mobile Number");

return false;

}

if(username.length<4){

alert("Username must contain at least 4 characters");

return false;

}

if(password.length<8){

alert("Password must contain at least 8 characters");

return false;

}

if(password!==confirm){

alert("Passwords do not match");

return false;

}

if(dob===""){

alert("Select Date of Birth");

return false;

}

if(gender===""){

alert("Select Gender");

return false;

}

return true;

}

/*=========================================================
STEP 2
=========================================================*/

function validateStep2(){

if(document.getElementById("district").value===""){

alert("Select District");

return false;

}

if(document.getElementById("taluk").value.trim()===""){

alert("Enter Taluk");

return false;

}

if(document.getElementById("village").value.trim()===""){

alert("Enter Village / Town");

return false;

}

if(!/^[0-9]{6}$/.test(document.getElementById("pincode").value.trim())){

alert("Enter a valid PIN Code");

return false;

}

if(document.getElementById("address").value.trim()===""){

alert("Enter Complete Address");

return false;

}

return true;

}

/*=========================================================
STEP 3
=========================================================*/

function validateStep3(){

const role=document.querySelector('input[name="userRole"]:checked');

if(!role){

alert("Please select a role");

return false;

}

return true;

}

/*=========================================================
SHOW ROLE FORM
=========================================================*/

function showRoleForm(){

document.querySelectorAll(".role-form")

.forEach(form=>{

form.classList.remove("active");

});

const role=document.querySelector('input[name="userRole"]:checked');

if(!role) return;

switch(role.value){

case "farmer":

document.getElementById("farmerRoleForm").classList.add("active");

break;

case "buyer":

document.getElementById("buyerRoleForm").classList.add("active");

break;

case "logistics":

document.getElementById("logisticsRoleForm").classList.add("active");

break;

case "driver":

document.getElementById("driverRoleForm").classList.add("active");

break;

case "labour":

document.getElementById("labourRoleForm").classList.add("active");

break;

case "equipment":

document.getElementById("equipmentRoleForm").classList.add("active");

break;

case "operator":

document.getElementById("operatorRoleForm").classList.add("active");

break;

}

}

/*=========================================================
STEP 4
=========================================================*/

function validateStep4(){

const role=document.querySelector('input[name="userRole"]:checked').value;

switch(role){

case "farmer":

if(document.getElementById("farmName").value.trim()===""){

alert("Enter Farm Name");

return false;

}

break;

case "buyer":

if(document.getElementById("businessName").value.trim()===""){

alert("Enter Business Name");

return false;

}

break;

case "logistics":

if(document.getElementById("companyName").value.trim()===""){

alert("Enter Company Name");

return false;

}

break;

case "driver":

if(document.getElementById("drivingLicenceNumber").value.trim()===""){

alert("Enter Driving Licence Number");

return false;

}

break;

case "labour":

if(document.getElementById("labourSkills").value.trim()===""){

alert("Enter Skills");

return false;

}

break;

case "equipment":

if(document.getElementById("equipmentCategories").value.trim()===""){

alert("Enter Equipment Categories");

return false;

}

break;

case "operator":

if(document.getElementById("machinesOperated").value.trim()===""){

alert("Enter Machines Operated");

return false;

}

break;

}

return true;

}/*=========================================================
DOCUMENT VALIDATION
REVIEW
SUBMIT
script.js
PART 3
=========================================================*/

/*=========================================================
STEP 5 VALIDATION
=========================================================*/

function validateStep5(){

const aadhaar=document.getElementById("aadhaarCard");

const photo=document.getElementById("profilePhoto");

if(aadhaar && aadhaar.files.length===0){

alert("Please upload your Aadhaar Card.");

return false;

}

if(photo && photo.files.length===0){

alert("Please upload your Profile Photo.");

return false;

}

return true;

}

/*=========================================================
STEP 6 VALIDATION
=========================================================*/

function validateStep6(){

const terms=document.getElementById("agreeTerms");

const privacy=document.getElementById("agreePrivacy");

if(!terms.checked){

alert("Please accept the Terms & Conditions.");

return false;

}

if(!privacy.checked){

alert("Please accept the Privacy Policy.");

return false;

}

return true;

}

/*=========================================================
GENERATE REVIEW
=========================================================*/

function generateReview(){

const review=document.getElementById("reviewContainer");

if(!review) return;

const role=document.querySelector('input[name="userRole"]:checked');

review.innerHTML=`

<div class="review-summary">

<div class="review-card">

<h3>👤 Personal Information</h3>

<p><strong>Name:</strong> ${document.getElementById("fullName").value}</p>

<p><strong>Email:</strong> ${document.getElementById("email").value}</p>

<p><strong>Mobile:</strong> ${document.getElementById("mobile").value}</p>

<p><strong>Username:</strong> ${document.getElementById("username").value}</p>

</div>

<div class="review-card">

<h3>📍 Address</h3>

<p><strong>District:</strong> ${document.getElementById("district").value}</p>

<p><strong>Taluk:</strong> ${document.getElementById("taluk").value}</p>

<p><strong>Village:</strong> ${document.getElementById("village").value}</p>

<p><strong>PIN:</strong> ${document.getElementById("pincode").value}</p>

</div>

<div class="review-card">

<h3>🌾 Selected Role</h3>

<p>${role ? role.value.toUpperCase() : "-"}</p>

</div>

<div class="review-card">

<h3>📄 Uploaded Documents</h3>

<p>✅ Aadhaar Card</p>

<p>✅ Profile Photo</p>

</div>

</div>

`;

}

/*=========================================================
SUBMIT REGISTRATION
=========================================================*/

const registerForm=document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit",function(e){

e.preventDefault();

submitRegistration();

});

}

function submitRegistration(){

if(!validateStep6()) return;

const form=document.getElementById("registerForm");

const success=document.getElementById("successScreen");

if(form){

form.style.display="none";

}

if(success){

success.style.display="block";

success.scrollIntoView({

behavior:"smooth"

});

}

}

/*=========================================================
LOGIN REDIRECT
=========================================================*/

function goToLogin(){

window.location.href="login.html";

}

/*=========================================================
SAVE FORM DATA
=========================================================*/

function saveDraft(){

const data={};

document.querySelectorAll("input,select,textarea").forEach(field=>{

if(field.type==="checkbox"){

data[field.id]=field.checked;

}else{

data[field.id]=field.value;

}

});

localStorage.setItem(

"agrivision_registration",

JSON.stringify(data)

);

}

/*=========================================================
LOAD SAVED DATA
=========================================================*/

function loadDraft(){

const saved=

localStorage.getItem(

"agrivision_registration"

);

if(!saved) return;

const data=JSON.parse(saved);

Object.keys(data).forEach(id=>{

const field=document.getElementById(id);

if(field){

if(field.type==="checkbox"){

field.checked=data[id];

}else{

field.value=data[id];

}

}

});

}

window.addEventListener(

"beforeunload",

saveDraft

);

window.addEventListener(

"DOMContentLoaded",

loadDraft

);/*=========================================================
PREMIUM EFFECTS
script.js
PART 4
=========================================================*/

/*=========================================================
CURSOR GLOW
=========================================================*/

function initializeCursorGlow(){

const glow=document.querySelector(".cursor-glow");

if(!glow) return;

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});

}

/*=========================================================
MOUSE SPOTLIGHT
=========================================================*/

function initializeMouseSpotlight(){

const spotlight=document.querySelector(".mouse-spotlight");

if(!spotlight) return;

document.addEventListener("mousemove",(e)=>{

spotlight.style.left=e.clientX+"px";

spotlight.style.top=e.clientY+"px";

});

}

/*=========================================================
FLOATING LEAVES
=========================================================*/

function initializeLeaves(){

const container=document.querySelector(".floating-leaves");

if(!container) return;

const icons=["🍃","🌿","🍂"];

for(let i=0;i<25;i++){

const leaf=document.createElement("div");

leaf.className="leaf";

leaf.innerHTML=icons[Math.floor(Math.random()*icons.length)];

leaf.style.left=Math.random()*100+"%";

leaf.style.animationDuration=(10+Math.random()*12)+"s";

leaf.style.animationDelay=Math.random()*10+"s";

leaf.style.fontSize=(18+Math.random()*20)+"px";

container.appendChild(leaf);

}

}

/*=========================================================
FIREFLIES
=========================================================*/

function initializeFireflies(){

const container=document.querySelector(".fireflies");

if(!container) return;

for(let i=0;i<35;i++){

const fly=document.createElement("div");

fly.className="firefly";

fly.style.left=Math.random()*100+"%";

fly.style.top=Math.random()*100+"%";

fly.style.animationDuration=(6+Math.random()*8)+"s";

fly.style.animationDelay=Math.random()*6+"s";

container.appendChild(fly);

}

}

/*=========================================================
SCROLL REVEAL
=========================================================*/

function initializeScrollReveal(){

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},

{

threshold:.15

});

document.querySelectorAll(

"section,.feature-card,.stat-card,.role-card,.review-card,.upload-card"

).forEach(item=>{

item.classList.add("reveal");

observer.observe(item);

});

}

/*=========================================================
COUNTER ANIMATION
=========================================================*/

function initializeCounterAnimation(){

const counters=document.querySelectorAll(".counter");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

animateCounter(entry.target);

observer.unobserve(entry.target);

}

});

},

{

threshold:.5

});

counters.forEach(counter=>{

observer.observe(counter);

});

}

function animateCounter(counter){

const target=parseInt(counter.textContent.replace(/\D/g,""));

const suffix=counter.textContent.replace(/[0-9]/g,"");

let value=0;

const speed=Math.max(10,target/120);

const timer=setInterval(()=>{

value+=speed;

if(value>=target){

counter.textContent=target+suffix;

clearInterval(timer);

}else{

counter.textContent=Math.floor(value)+suffix;

}

},20);

}

/*=========================================================
BUTTON RIPPLE EFFECT
=========================================================*/

function initializeRippleButtons(){

document.querySelectorAll(

".primary-button,.secondary-button,.next-button,.back-button,.submit-button"

).forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(

this.clientWidth,

this.clientHeight

);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=(

e.offsetX-size/2

)+"px";

ripple.style.top=(

e.offsetY-size/2

)+"px";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

}

/*=========================================================
3D CARD HOVER
=========================================================*/

function initializeTiltCards(){

document.querySelectorAll(

".feature-card,.role-card-content,.stat-card,.review-card"

).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*12;

const rotateX=((y/rect.height)-0.5)*-12;

card.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"perspective(1000px) rotateX(0deg) rotateY(0deg)";

});

});

}

/*=========================================================
END OF SCRIPT.JS
=========================================================*/

"use strict";

/* ============================================================
   AGRIVISION KARNATAKA
   AUTH.JS
   Shared JavaScript — Register + Login
   ============================================================ */

const AV = {
    page: document.body?.dataset?.page || "auth",
    mode: document.body?.dataset?.authMode || "login",

    state: {
        currentStep: 1,
        totalSteps: 4,
        selectedRole: "",
        submitting: false,
        mouseX: -100,
        mouseY: -100,
        trailX: -100,
        trailY: -100
    },

    storage: {
        account: "agrivision_auth",
        draft: "agrivision_registration_draft"
    }
};


/* ============================================================
   HELPERS
   ============================================================ */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    Array.from(document.querySelectorAll(selector));

const create = (tag, className = "") => {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    return element;
};

const wait = ms =>
    new Promise(resolve => setTimeout(resolve, ms));


/* ============================================================
   SAFE STORAGE
   ============================================================ */

const Store = {

    get(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch {
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );
        } catch {}
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch {}
    }

};


/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    document.documentElement.classList.add(
        "auth-js-loaded"
    );

    initializeEffects();
    initializeCursor();
    initializeButtons();
    initializePasswordToggle();
    initializeInputs();
    initializeNavigation();
    initializeLinks();
    initializeRipple();
    initialize3D();

    if (AV.mode === "register") {
        initializeRegister();
    }

    if (AV.mode === "login") {
        initializeLogin();
    }

});


/* ============================================================
   AMBIENT EFFECTS
   ============================================================ */

function initializeEffects() {

    createLeaves();
    createParticles();
    createDust();

}


/* ============================================================
   LEAVES
   ============================================================ */

function createLeaves() {

    const container =
        $(".auth-leaf-field");

    if (!container) return;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < 18; i++) {

        const leaf =
            create(
                "span",
                "auth-falling-leaf"
            );

        leaf.style.setProperty(
            "--leaf-left",
            `${Math.random() * 100}%`
        );

        leaf.style.setProperty(
            "--leaf-width",
            `${8 + Math.random() * 13}px`
        );

        leaf.style.setProperty(
            "--leaf-height",
            `${5 + Math.random() * 6}px`
        );

        leaf.style.setProperty(
            "--leaf-duration",
            `${9 + Math.random() * 10}s`
        );

        leaf.style.setProperty(
            "--leaf-delay",
            `${Math.random() * -18}s`
        );

        leaf.style.setProperty(
            "--leaf-drift",
            `${-130 + Math.random() * 260}px`
        );

        leaf.style.setProperty(
            "--leaf-drift-end",
            `${-150 + Math.random() * 300}px`
        );

        leaf.style.setProperty(
            "--leaf-rotation",
            `${Math.random() * 360}deg`
        );

        leaf.style.setProperty(
            "--leaf-opacity",
            `${0.10 + Math.random() * 0.25}`
        );

        fragment.appendChild(leaf);
    }

    container.appendChild(fragment);
}


/* ============================================================
   PARTICLES
   ============================================================ */

function createParticles() {

    const container =
        $(".auth-particles");

    if (!container) return;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < 32; i++) {

        const particle =
            create(
                "span",
                "auth-particle"
            );

        particle.style.setProperty(
            "--particle-left",
            `${Math.random() * 100}%`
        );

        particle.style.setProperty(
            "--particle-size",
            `${1 + Math.random() * 3}px`
        );

        particle.style.setProperty(
            "--particle-duration",
            `${7 + Math.random() * 9}s`
        );

        particle.style.setProperty(
            "--particle-delay",
            `${Math.random() * -14}s`
        );

        particle.style.setProperty(
            "--particle-drift-a",
            `${-80 + Math.random() * 160}px`
        );

        particle.style.setProperty(
            "--particle-drift-b",
            `${-100 + Math.random() * 200}px`
        );

        fragment.appendChild(particle);
    }

    container.appendChild(fragment);
}


/* ============================================================
   DUST
   ============================================================ */

function createDust() {

    const container =
        $(".auth-dust-field");

    if (!container) return;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < 24; i++) {

        const dust =
            create(
                "span",
                "auth-dust"
            );

        dust.style.setProperty(
            "--dust-left",
            `${Math.random() * 100}%`
        );

        dust.style.setProperty(
            "--dust-top",
            `${Math.random() * 100}%`
        );

        dust.style.setProperty(
            "--dust-size",
            `${1 + Math.random() * 2}px`
        );

        dust.style.setProperty(
            "--dust-duration",
            `${5 + Math.random() * 7}s`
        );

        dust.style.setProperty(
            "--dust-delay",
            `${Math.random() * -10}s`
        );

        dust.style.setProperty(
            "--dust-x",
            `${-30 + Math.random() * 60}px`
        );

        dust.style.setProperty(
            "--dust-y",
            `${-20 - Math.random() * 50}px`
        );

        fragment.appendChild(dust);
    }

    container.appendChild(fragment);
}


/* ============================================================
   PREMIUM CURSOR
   ============================================================ */

function initializeCursor() {

    if (
        window.matchMedia("(pointer: coarse)").matches
    ) {
        return;
    }

    if (!$(".auth-cursor")) return;

    document.body.classList.add(
        "cursor-active"
    );

    document.addEventListener(
        "mousemove",
        event => {

            AV.state.mouseX =
                event.clientX;

            AV.state.mouseY =
                event.clientY;

            document.documentElement.style.setProperty(
                "--cursor-x",
                `${event.clientX}px`
            );

            document.documentElement.style.setProperty(
                "--cursor-y",
                `${event.clientY}px`
            );
        }
    );

    function animateTrail() {

        AV.state.trailX +=
            (
                AV.state.mouseX -
                AV.state.trailX
            ) * 0.13;

        AV.state.trailY +=
            (
                AV.state.mouseY -
                AV.state.trailY
            ) * 0.13;

        document.documentElement.style.setProperty(
            "--trail-x",
            `${AV.state.trailX}px`
        );

        document.documentElement.style.setProperty(
            "--trail-y",
            `${AV.state.trailY}px`
        );

        requestAnimationFrame(
            animateTrail
        );
    }

    animateTrail();

    const selectors = [
        "button",
        "a",
        "input",
        "select",
        "textarea",
        ".auth-role-card"
    ];

    document.addEventListener(
        "mouseover",
        event => {

            if (
                selectors.some(
                    selector =>
                        event.target.closest(selector)
                )
            ) {
                document.body.classList.add(
                    "cursor-hover"
                );
            }
        }
    );

    document.addEventListener(
        "mouseout",
        event => {

            if (
                selectors.some(
                    selector =>
                        event.target.closest(selector)
                )
            ) {
                document.body.classList.remove(
                    "cursor-hover"
                );
            }
        }
    );
}


/* ============================================================
   BUTTONS
   ============================================================ */

function initializeButtons() {

    $$(".auth-button").forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {
                button.style.filter =
                    "brightness(1.05)";
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {
                button.style.filter = "";
            }
        );

    });
}


/* ============================================================
   RIPPLE EFFECT
   ============================================================ */

function initializeRipple() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".auth-button"
                );

            if (!button) return;

            const rect =
                button.getBoundingClientRect();

            const ripple =
                create(
                    "span",
                    "auth-ripple"
                );

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            button.appendChild(ripple);

            ripple.addEventListener(
                "animationend",
                () => ripple.remove()
            );
        }
    );
}


/* ============================================================
   3D CARD EFFECT
   ============================================================ */

function initialize3D() {

    if (
        window.matchMedia("(pointer: coarse)").matches
    ) {
        return;
    }

    $$(".auth-3d-card").forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateY =
                    ((x - rect.width / 2) /
                        (rect.width / 2)) * 3;

                const rotateX =
                    -((y - rect.height / 2) /
                        (rect.height / 2)) * 3;

                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-2px)
                    scale(1.008)
                    `;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.transform = "";
            }
        );

    });
}


/* ============================================================
   PASSWORD VISIBILITY
   ============================================================ */

function initializePasswordToggle() {

    $$("[data-password-toggle]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.passwordToggle;

                    const input =
                        document.getElementById(id);

                    if (!input) return;

                    const hidden =
                        input.type === "password";

                    input.type =
                        hidden
                            ? "text"
                            : "password";

                    button.textContent =
                        hidden
                            ? "🙈"
                            : "👁";

                    button.setAttribute(
                        "aria-label",
                        hidden
                            ? "Hide password"
                            : "Show password"
                    );

                    input.focus();
                }
            );

        });
}


/* ============================================================
   INPUTS
   ============================================================ */

function initializeInputs() {

    $$(".auth-input, .auth-select, .auth-textarea")
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    const group =
                        input.closest(
                            ".auth-form-group"
                        );

                    group?.classList.remove(
                        "error"
                    );
                }
            );

        });


    const password =
        $("#password");

    const confirmPassword =
        $("#confirmPassword");

    if (password) {

        password.addEventListener(
            "input",
            () => {

                updatePasswordStrength(
                    password.value
                );

                if (confirmPassword) {

                    updatePasswordMatch(
                        password.value,
                        confirmPassword.value
                    );
                }
            }
        );
    }


    if (confirmPassword) {

        confirmPassword.addEventListener(
            "input",
            () => {

                updatePasswordMatch(
                    password?.value || "",
                    confirmPassword.value
                );
            }
        );
    }
}


/* ============================================================
   PASSWORD STRENGTH
   ============================================================ */

function updatePasswordStrength(password) {

    const rules = {

        length:
            password.length >= 8,

        uppercase:
            /[A-Z]/.test(password),

        lowercase:
            /[a-z]/.test(password),

        number:
            /\d/.test(password),

        special:
            /[^A-Za-z0-9]/.test(password)

    };

    Object.entries(rules).forEach(
        ([rule, valid]) => {

            const element =
                document.querySelector(
                    `[data-rule="${rule}"]`
                );

            element?.classList.toggle(
                "met",
                valid
            );
        }
    );
}


/* ============================================================
   PASSWORD MATCH
   ============================================================ */

function updatePasswordMatch(
    password,
    confirmation
) {

    const message =
        $("#passwordMatchMessage");

    if (!message) return;

    if (!confirmation) {

        message.className =
            "auth-match-message";

        message.textContent = "";

        return;
    }

    message.classList.add(
        "visible"
    );

    if (password === confirmation) {

        message.classList.add(
            "match"
        );

        message.classList.remove(
            "no-match"
        );

        message.textContent =
            "✓ Passwords match.";

    } else {

        message.classList.add(
            "no-match"
        );

        message.classList.remove(
            "match"
        );

        message.textContent =
            "Passwords do not match.";
    }
}


/* ============================================================
   REGISTER
   ============================================================ */

function initializeRegister() {

    initializeRoleSelection();
    initializeRegisterForm();
    restoreDraft();

}


/* ============================================================
   ROLE SELECTION
   ============================================================ */

function initializeRoleSelection() {

    $$(".auth-role-card").forEach(card => {

        card.setAttribute(
            "tabindex",
            "0"
        );

        const input =
            card.querySelector(
                "input[type='radio']"
            );

        if (!input) return;

        function selectRole() {

            $$(".auth-role-card")
                .forEach(item =>
                    item.classList.remove(
                        "selected"
                    )
                );

            card.classList.add(
                "selected"
            );

            input.checked = true;

            AV.state.selectedRole =
                input.value;

            saveDraft();
        }

        card.addEventListener(
            "click",
            selectRole
        );

        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    selectRole();
                }
            }
        );

    });
}


/* ============================================================
   REGISTER FORM
   ============================================================ */

function initializeRegisterForm() {

    const form =
        $("#registerForm");

    if (!form) return;

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            submitRegistration();
        }
    );

}


/* ============================================================
   STEP NAVIGATION
   ============================================================ */

function initializeNavigation() {

    $$("[data-next-step]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        validateStep(
                            AV.state.currentStep
                        )
                    ) {

                        goToStep(
                            AV.state.currentStep + 1
                        );
                    }
                }
            );

        });


    $$("[data-prev-step]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    goToStep(
                        AV.state.currentStep - 1
                    );
                }
            );

        });
}


function goToStep(step) {

    if (
        step < 1 ||
        step > AV.state.totalSteps
    ) {
        return;
    }

    $$("[data-step-panel]")
        .forEach(panel => {

            const number =
                Number(
                    panel.dataset.stepPanel
                );

            panel.hidden =
                number !== step;
        });


    $$(".auth-step")
        .forEach(stepElement => {

            const number =
                Number(
                    stepElement.dataset.step
                );

            stepElement.classList.toggle(
                "active",
                number === step
            );

            stepElement.classList.toggle(
                "completed",
                number < step
            );
        });


    $$(".auth-step-line")
        .forEach((line, index) => {

            line.classList.toggle(
                "completed",
                index + 1 < step
            );
        });


    AV.state.currentStep =
        step;

    saveDraft();

    if (step === 4) {
        updateReview();
    }

}


/* ============================================================
   STEP VALIDATION
   ============================================================ */

function validateStep(step) {

    if (step === 1)
        return validateRole();

    if (step === 2)
        return validateProfile();

    if (step === 3)
        return validateAccount();

    if (step === 4)
        return validateTerms();

    return true;
}


/* ============================================================
   ROLE VALIDATION
   ============================================================ */

function validateRole() {

    const role =
        $("input[name='role']:checked");

    if (!role) {

        showToast(
            "Please select your role before continuing.",
            "warning",
            "Choose your role"
        );

        return false;
    }

    AV.state.selectedRole =
        role.value;

    return true;
}


/* ============================================================
   PROFILE VALIDATION
   ============================================================ */

function validateProfile() {

    let valid = true;

    const name =
        $("#fullName");

    const phone =
        $("#phone");

    const state =
        $("#state");

    const district =
        $("#district");


    if (
        !name ||
        name.value.trim().length < 2
    ) {

        fieldError(
            name,
            "Please enter your full name."
        );

        valid = false;

    } else {
        fieldSuccess(name);
    }


    if (
        !phone ||
        !/^[6-9]\d{9}$/.test(
            phone.value.trim()
        )
    ) {

        fieldError(
            phone,
            "Enter a valid 10-digit Indian mobile number."
        );

        valid = false;

    } else {
        fieldSuccess(phone);
    }


    if (
        !state ||
        !state.value
    ) {

        fieldError(
            state,
            "Please select your state."
        );

        valid = false;

    } else {
        fieldSuccess(state);
    }


    if (
        !district ||
        !district.value
    ) {

        fieldError(
            district,
            "Please select your district."
        );

        valid = false;

    } else {
        fieldSuccess(district);
    }


    if (!valid) {

        showToast(
            "Please correct the highlighted information.",
            "warning",
            "Check your details"
        );
    }

    return valid;
}


/* ============================================================
   ACCOUNT VALIDATION
   ============================================================ */

function validateAccount() {

    let valid = true;

    const email =
        $("#email");

    const password =
        $("#password");

    const confirm =
        $("#confirmPassword");


    if (
        !email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email.value.trim())
    ) {

        fieldError(
            email,
            "Please enter a valid email address."
        );

        valid = false;

    } else {
        fieldSuccess(email);
    }


    const value =
        password?.value || "";

    const strong =
        value.length >= 8 &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        /[^A-Za-z0-9]/.test(value);


    if (!strong) {

        fieldError(
            password,
            "Use 8+ characters with uppercase, lowercase, number and special character."
        );

        valid = false;

    } else {
        fieldSuccess(password);
    }


    if (
        !confirm ||
        confirm.value !== value
    ) {

        fieldError(
            confirm,
            "Passwords do not match."
        );

        valid = false;

    } else {
        fieldSuccess(confirm);
    }


    return valid;
}


/* ============================================================
   TERMS
   ============================================================ */

function validateTerms() {

    const terms =
        $("#terms");

    if (
        !terms ||
        !terms.checked
    ) {

        showToast(
            "Please accept the Terms of Use and Privacy Policy.",
            "warning",
            "One final step"
        );

        return false;
    }

    return true;
}


/* ============================================================
   FIELD STATES
   ============================================================ */

function fieldError(
    field,
    message
) {

    if (!field) return;

    const group =
        field.closest(
            ".auth-form-group"
        );

    if (!group) return;

    group.classList.remove(
        "success"
    );

    group.classList.add(
        "error",
        "shake"
    );

    const error =
        group.querySelector(
            ".auth-error"
        );

    if (error) {
        error.textContent =
            message;
    }

    setTimeout(
        () =>
            group.classList.remove(
                "shake"
            ),
        400
    );
}


function fieldSuccess(field) {

    if (!field) return;

    field.closest(
        ".auth-form-group"
    )?.classList.add(
        "success"
    );
}


/* ============================================================
   DRAFT SAVE
   ============================================================ */

function saveDraft() {

    if (AV.mode !== "register") return;

    const form =
        $("#registerForm");

    if (!form) return;

    const data = {};

    Array.from(
        form.querySelectorAll(
            "input,select,textarea"
        )
    ).forEach(field => {

        if (!field.name) return;

        if (field.type === "password")
            return;

        if (field.type === "radio") {

            if (field.checked) {
                data[field.name] =
                    field.value;
            }

        } else if (
            field.type === "checkbox"
        ) {

            data[field.name] =
                field.checked;

        } else {

            data[field.name] =
                field.value;
        }

    });

    Store.set(
        AV.storage.draft,
        {
            data,
            step:
                AV.state.currentStep
        }
    );
}


/* ============================================================
   RESTORE DRAFT
   ============================================================ */

function restoreDraft() {

    const draft =
        Store.get(
            AV.storage.draft
        );

    if (!draft?.data) return;

    Object.entries(
        draft.data
    ).forEach(
        ([name, value]) => {

            const fields =
                document.querySelectorAll(
                    `[name="${CSS.escape(name)}"]`
                );

            fields.forEach(field => {

                if (
                    field.type === "radio"
                ) {

                    field.checked =
                        field.value === value;

                    if (field.checked) {

                        field.closest(
                            ".auth-role-card"
                        )?.classList.add(
                            "selected"
                        );

                        AV.state.selectedRole =
                            value;
                    }

                } else if (
                    field.type === "checkbox"
                ) {

                    field.checked =
                        Boolean(value);

                } else {

                    field.value =
                        value ?? "";
                }

            });
        }
    );

}


/* ============================================================
   REVIEW
   ============================================================ */

function updateReview() {

    const values = {

        role:
            AV.state.selectedRole ||
            $("input[name='role']:checked")
                ?.value ||
            "—",

        fullName:
            $("#fullName")?.value ||
            "—",

        phone:
            $("#phone")?.value ||
            "—",

        email:
            $("#email")?.value ||
            "—",

        location:
            [
                $("#location")?.value,
                $("#district")?.value,
                $("#state")?.value
            ]
            .filter(Boolean)
            .join(", ") ||
            "—"
    };


    Object.entries(values)
        .forEach(
            ([key, value]) => {

                const element =
                    $(
                        `[data-review="${key}"]`
                    );

                if (element) {
                    element.textContent =
                        value;
                }
            }
        );
}


/* ============================================================
   REGISTRATION SUBMIT
   ============================================================ */

async function submitRegistration() {

    if (AV.state.submitting)
        return;

    if (!validateTerms())
        return;

    AV.state.submitting =
        true;

    const button =
        $("#registerSubmit");

    if (button) {

        button.disabled = true;

        button.innerHTML =
            `
            <span
                class="auth-loading-spinner"
                style="
                    width:15px;
                    height:15px;
                    border-width:1.5px;
                    margin:0;
                "
            ></span>
            Creating...
            `;
    }


    showLoading(
        "Creating your account",
        "Preparing your AgriVision ecosystem identity..."
    );


    /*
       FRONT-END ONLY

       No fake backend authentication is claimed here.
       The real database/API will be connected later.
    */

    await wait(1200);


    const reference =
        generateReference();


    Store.set(
        AV.storage.account,
        {
            registered: true,

            reference,

            role:
                AV.state.selectedRole,

            name:
                $("#fullName")?.value || "",

            email:
                $("#email")?.value || "",

            registeredAt:
                new Date().toISOString()
        }
    );


    Store.remove(
        AV.storage.draft
    );


    hideLoading();


    AV.state.submitting =
        false;


    if (button)
        button.disabled = false;


    showRegistrationSuccess(
        reference
    );
}


/* ============================================================
   REGISTRATION SUCCESS
   ============================================================ */

function showRegistrationSuccess(
    reference
) {

    $$("[data-step-panel]")
        .forEach(
            panel =>
                panel.hidden = true
        );


    const success =
        $("#registrationSuccess");

    if (success) {

        success.classList.add(
            "active"
        );
    }


    const referenceElement =
        $("#registrationReference");

    if (referenceElement) {

        referenceElement.innerHTML =
            `
            Reference:
            <strong>
                ${escapeHTML(reference)}
            </strong>
            `;
    }


    $("#registerStepIndicator")
        ?.style
        ?.setProperty(
            "display",
            "none"
        );


    showToast(
        "Your registration interface is complete.",
        "success",
        "Welcome to AgriVision"
    );
}


/* ============================================================
   LOGIN
   ============================================================ */

function initializeLogin() {

    const form =
        $("#loginForm");

    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            submitLogin();
        }
    );


    $("#forgotPassword")
        ?.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showToast(
                    "Password recovery will be connected to the secure backend.",
                    "success",
                    "Password recovery"
                );
            }
        );
}


/* ============================================================
   LOGIN SUBMIT
   ============================================================ */

async function submitLogin() {

    if (AV.state.submitting)
        return;


    const email =
        $("#loginEmail");

    const password =
        $("#loginPassword");

    let valid = true;


    if (
        !email ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email.value.trim())
    ) {

        fieldError(
            email,
            "Please enter a valid email address."
        );

        valid = false;

    } else {

        fieldSuccess(email);
    }


    if (
        !password ||
        !password.value
    ) {

        fieldError(
            password,
            "Please enter your password."
        );

        valid = false;

    } else {

        fieldSuccess(password);
    }


    if (!valid) {

        showToast(
            "Please enter your login details.",
            "warning",
            "Check your information"
        );

        return;
    }


    AV.state.submitting =
        true;


    const button =
        $("#loginSubmit");


    if (button) {

        button.disabled = true;

        button.innerHTML =
            `
            <span
                class="auth-loading-spinner"
                style="
                    width:15px;
                    height:15px;
                    border-width:1.5px;
                    margin:0;
                "
            ></span>
            Signing in...
            `;
    }


    showLoading(
        "Signing you in",
        "Connecting to your AgriVision ecosystem..."
    );


    await wait(900);


    hideLoading();


    AV.state.submitting =
        false;


    if (button) {

        button.disabled = false;

        button.innerHTML =
            `
            Sign In
            <span class="auth-button-icon">
                →
            </span>
            `;
    }


    showToast(
        "The login interface is ready. Real authentication will be connected to the backend.",
        "success",
        "AgriVision authentication"
    );
}


/* ============================================================
   LOADING
   ============================================================ */

function showLoading(
    title,
    message
) {

    const overlay =
        $(".auth-loading-overlay");

    if (!overlay) return;

    $(".auth-loading-title")
        ?.replaceChildren(
            document.createTextNode(title)
        );

    $(".auth-loading-message")
        ?.replaceChildren(
            document.createTextNode(message)
        );

    overlay.classList.add(
        "active"
    );

    overlay.setAttribute(
        "aria-hidden",
        "false"
    );
}


function hideLoading() {

    const overlay =
        $(".auth-loading-overlay");

    if (!overlay) return;

    overlay.classList.remove(
        "active"
    );

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );
}


/* ============================================================
   TOAST
   ============================================================ */

function showToast(
    message,
    type = "success",
    title = "AgriVision"
) {

    const container =
        $(".auth-toast-container");

    if (!container) return;


    const toast =
        create(
            "div",
            `auth-toast ${type}`
        );


    const icon =
        create(
            "div",
            "auth-toast-icon"
        );

    icon.textContent =
        type === "error"
            ? "!"
            : type === "warning"
                ? "!"
                : "✓";


    const content =
        create(
            "div",
            "auth-toast-content"
        );


    const heading =
        create(
            "div",
            "auth-toast-title"
        );

    heading.textContent =
        title;


    const text =
        create(
            "div",
            "auth-toast-message"
        );

    text.textContent =
        message;


    const close =
        create(
            "button",
            "auth-toast-close"
        );

    close.type = "button";
    close.textContent = "×";


    content.append(
        heading,
        text
    );

    toast.append(
        icon,
        content,
        close
    );

    container.appendChild(
        toast
    );


    const remove = () => {

        toast.classList.add(
            "removing"
        );

        setTimeout(
            () => toast.remove(),
            260
        );
    };


    close.addEventListener(
        "click",
        remove
    );

    setTimeout(
        remove,
        4200
    );
}


/* ============================================================
   LINKS + PAGE TRANSITION
   ============================================================ */

function initializeLinks() {

    $$("a[href]").forEach(link => {

        const href =
            link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("javascript:")
        ) {
            return;
        }

        link.addEventListener(
            "click",
            event => {

                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey ||
                    link.target === "_blank"
                ) {
                    return;
                }

                event.preventDefault();

                const transition =
                    $(".auth-page-transition");

                if (!transition) {

                    location.href =
                        href;

                    return;
                }

                transition.classList.add(
                    "active"
                );

                setTimeout(
                    () => {
                        location.href =
                            href;
                    },
                    280
                );
            }
        );

    });
}


/* ============================================================
   REFERENCE NUMBER
   ============================================================ */

function generateReference() {

    const time =
        Date.now()
            .toString(36)
            .toUpperCase();

    const random =
        Math.random()
            .toString(36)
            .substring(2,7)
            .toUpperCase();

    return `AVK-${time}-${random}`;
}


/* ============================================================
   ESCAPE HTML
   ============================================================ */

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* ============================================================
   ONLINE / OFFLINE
   ============================================================ */

window.addEventListener(
    "offline",
    () => {

        showToast(
            "Your internet connection appears to be offline.",
            "warning",
            "Connection lost"
        );
    }
);


window.addEventListener(
    "online",
    () => {

        showToast(
            "Your internet connection has been restored.",
            "success",
            "Back online"
        );
    }
);


/* ============================================================
   KEYBOARD
   ============================================================ */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape")
            return;

        $$(".auth-toast")
            .forEach(toast => {

                toast.classList.add(
                    "removing"
                );

                setTimeout(
                    () => toast.remove(),
                    260
                );
            });
    }
);


/* ============================================================
   BEFORE LEAVING
   ============================================================ */

window.addEventListener(
    "beforeunload",
    () => {

        if (
            AV.mode === "register"
        ) {
            saveDraft();
        }
    }
);

/* ============================================================
   GLOBAL API
   ============================================================ */

window.AgriVisionAuth = {

    state: AV.state,

    showToast,

    showLoading,

    hideLoading,

    goToStep,

    validateStep,

    saveDraft,

    updateReview

};


/* ============================================================
   END
   ============================================================ */
   /* ============================================================
   AGRIVISION FARMER MODULE — JS EXTENSIONS
   APPEND ONLY — DO NOT REPLACE CORE SCRIPT
   ============================================================ */

(() => {

    "use strict";


    /* ========================================================
       PAGE CHECK
       ======================================================== */

    const farmerPage =
        document.body &&
        document.body.classList.contains(
            "farmer-module-page"
        );


    if (!farmerPage) {

        return;

    }



    /* ========================================================
       CURRENT YEAR
       ======================================================== */

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }



    /* ========================================================
       INTERNAL SMOOTH SCROLL
       ======================================================== */

    document
        .querySelectorAll(
            '.farmer-module-page a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const selector =
                        link.getAttribute("href");


                    if (
                        !selector ||
                        selector === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            selector
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }
            );

        });



    /* ========================================================
       FARMER CARD REVEAL
       ======================================================== */

    const revealItems =
        document.querySelectorAll(
            ".farmer-module-page " +
            ".about-card, " +
            ".farmer-module-page " +
            ".feature-card, " +
            ".farmer-module-page " +
            ".support-card, " +
            ".farmer-module-page " +
            ".vision-item, " +
            ".farmer-module-page " +
            ".workflow-step, " +
            ".farmer-module-page " +
            ".timeline-item"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold:
                        0.12,

                    rootMargin:
                        "0px 0px -30px 0px"

                }

            );


        revealItems.forEach(
            item => {

                revealObserver.observe(
                    item
                );

            }
        );

    } else {

        revealItems.forEach(
            item => {

                item.classList.add(
                    "visible"
                );

            }
        );

    }



    /* ========================================================
       DATA BAR ANIMATION
       ======================================================== */

    const dataBars =
        document.querySelectorAll(
            ".farmer-module-page .data-fill"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const barObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const bar =
                                entry.target;


                            const targetWidth =
                                bar.dataset.width ||
                                "0";


                            requestAnimationFrame(
                                () => {

                                    bar.style.width =
                                        `${targetWidth}%`;

                                }
                            );


                            barObserver.unobserve(
                                bar
                            );

                        }
                    );

                },

                {
                    threshold:
                        0.25

                }

            );


        dataBars.forEach(
            bar => {

                barObserver.observe(
                    bar
                );

            }
        );

    }



    /* ========================================================
       MAGNETIC HOVER FOR HERO STATS
       ======================================================== */

    document
        .querySelectorAll(
            ".farmer-module-page .hero-stat"
        )
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (
                            y -
                            centerY
                        ) /
                        18;


                    const rotateY =
                        (
                            centerX -
                            x
                        ) /
                        18;


                    card.style.transform =
                        `
                        perspective(700px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-8px)
                        scale(1.015)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });



    /* ========================================================
       CARD POINTER LIGHT
       ======================================================== */

    const interactiveCards =
        document.querySelectorAll(
            ".farmer-module-page " +
            ".about-card, " +
            ".farmer-module-page " +
            ".feature-card, " +
            ".farmer-module-page " +
            ".support-card"
        );


    interactiveCards.forEach(
        card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--pointer-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--pointer-y",
                        `${y}px`
                    );

                }
            );

        }
    );



    /* ========================================================
       RIPPLE EFFECT
       ======================================================== */

    document
        .querySelectorAll(
            ".farmer-module-page " +
            ".primary-button, " +
            ".farmer-module-page " +
            ".secondary-button, " +
            ".farmer-module-page " +
            ".primary-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "ripple";


                    const rect =
                        button.getBoundingClientRect();


                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );


                    ripple.style.width =
                        `${size}px`;


                    ripple.style.height =
                        `${size}px`;


                    ripple.style.left =
                        `${
                            event.clientX -
                            rect.left -
                            size / 2
                        }px`;


                    ripple.style.top =
                        `${
                            event.clientY -
                            rect.top -
                            size / 2
                        }px`;


                    button.appendChild(
                        ripple
                    );


                    window.setTimeout(
                        () => {

                            ripple.remove();

                        },
                        700
                    );

                }
            );

        });



    /* ========================================================
       SCROLL PROGRESS
       ======================================================== */

    const progress =
        document.createElement(
            "div"
        );


    progress.className =
        "farmer-scroll-progress";


    progress.style.position =
        "fixed";


    progress.style.top =
        "0";


    progress.style.left =
        "0";


    progress.style.height =
        "3px";


    progress.style.width =
        "0%";


    progress.style.zIndex =
        "99999";


    progress.style.pointerEvents =
        "none";


    progress.style.background =
        "linear-gradient(90deg,#19d47b,#28d9e8,#f3c65d)";


    progress.style.boxShadow =
        "0 0 15px rgba(25,212,123,.45)";


    document.body.appendChild(
        progress
    );


    const updateProgress =
        () => {

            const scrollTop =
                window.scrollY;


            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            const percentage =
                documentHeight > 0
                    ? (
                        scrollTop /
                        documentHeight
                    ) * 100
                    : 0;


            progress.style.width =
                `${Math.min(
                    100,
                    Math.max(
                        0,
                        percentage
                    )
                )}%`;

        };


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive:
                true
        }
    );


    updateProgress();



    /* ========================================================
       SECTION ACTIVE DETECTION
       ======================================================== */

    const sections =
        document.querySelectorAll(
            ".farmer-module-page main > section"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const sectionObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "section-active"
                                );

                            }

                        }
                    );

                },

                {
                    threshold:
                        0.18

                }

            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }



    /* ========================================================
       ESCAPE KEY — REMOVE RIPPLE / FOCUS
       ======================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                document
                    .querySelectorAll(
                        ".ripple"
                    )
                    .forEach(
                        ripple => {
                            ripple.remove();
                        }
                    );

            }

        }
    );



    /* ========================================================
       REDUCED MOTION
       ======================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document
            .querySelectorAll(
                ".farmer-module-page .about-card, " +
                ".farmer-module-page .feature-card, " +
                ".farmer-module-page .support-card, " +
                ".farmer-module-page .vision-item, " +
                ".farmer-module-page .workflow-step, " +
                ".farmer-module-page .timeline-item"
            )
            .forEach(
                element => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

    }


})();
/* ============================================================
   FARMER MODULE — ELITE ANIMATION EXTENSION
   APPEND ONLY
   ============================================================ */

(() => {

    "use strict";


    if (
        !document.body.classList.contains(
            "farmer-module-page"
        )
    ) {

        return;

    }


    /* ========================================================
       GOLDEN FLOATING LEAVES
       ======================================================== */

    const createGoldenLeaf = () => {

        const leaf =
            document.createElement("div");

        leaf.className =
            "gold-leaf";

        leaf.innerHTML =
            '<i class="fa-solid fa-leaf"></i>';

        leaf.style.left =
            `${Math.random() * 100}%`;

        leaf.style.fontSize =
            `${10 + Math.random() * 18}px`;

        leaf.style.animationDuration =
            `${12 + Math.random() * 14}s`;

        leaf.style.animationDelay =
            `${Math.random() * 8}s`;

        document.body.appendChild(
            leaf
        );


        setTimeout(
            () => {

                leaf.remove();

            },
            28000
        );

    };


    for (
        let i = 0;
        i < 14;
        i++
    ) {

        createGoldenLeaf();

    }


    setInterval(
        createGoldenLeaf,
        3500
    );



    /* ========================================================
       SVG GRAPH ANIMATION
       ======================================================== */

    const graphs =
        document.querySelectorAll(
            ".farmer-module-page .graph-svg"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const graphObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "drawn"
                            );


                            graphObserver.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {
                    threshold:
                        .3

                }

            );


        graphs.forEach(
            graph => {

                graphObserver.observe(
                    graph
                );

            }
        );

    }



    /* ========================================================
       GOLD CARD POINTER EFFECT
       ======================================================== */

    const cards =
        document.querySelectorAll(
            ".farmer-module-page " +
            ".about-card, " +
            ".farmer-module-page " +
            ".feature-card, " +
            ".farmer-module-page " +
            ".support-card, " +
            ".farmer-module-page " +
            ".vision-item"
        );


    cards.forEach(
        card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    card.style.setProperty(
                        "--pointer-x",
                        `${x}px`
                    );


                    card.style.setProperty(
                        "--pointer-y",
                        `${y}px`
                    );


                    card.style.background =
                        `
                        radial-gradient(
                            260px circle at
                            ${x}px ${y}px,
                            rgba(243,207,99,.075),
                            transparent 55%
                        ),
                        linear-gradient(
                            145deg,
                            rgba(255,255,255,.075),
                            rgba(255,255,255,.025)
                        )
                        `;

                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.background =
                        "";

                }
            );

        }
    );



    /* ========================================================
       GOLDEN SCROLL REVEAL
       ======================================================== */

    const reveal =
        document.querySelectorAll(
            ".farmer-module-page " +
            ".about-card, " +
            ".farmer-module-page " +
            ".feature-card, " +
            ".farmer-module-page " +
            ".support-card, " +
            ".farmer-module-page " +
            ".vision-item, " +
            ".farmer-module-page " +
            ".workflow-step, " +
            ".farmer-module-page " +
            ".timeline-item"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                            }

                        }
                    );

                },

                {
                    threshold:
                        .12

                }

            );


        reveal.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }



    /* ========================================================
       GRAPH POINT PARALLAX
       ======================================================== */

    document
        .querySelectorAll(
            ".farmer-module-page .graph-point"
        )
        .forEach(
            point => {

                point.addEventListener(
                    "mouseenter",
                    () => {

                        point.style.transform =
                            "scale(1.6)";

                    }
                );


                point.addEventListener(
                    "mouseleave",
                    () => {

                        point.style.transform =
                            "";

                    }
                );

            }
        );



    /* ========================================================
       WORKFLOW STEP FOCUS
       ======================================================== */

    document
        .querySelectorAll(
            ".farmer-module-page .workflow-step"
        )
        .forEach(
            step => {

                step.addEventListener(
                    "mouseenter",
                    () => {

                        document
                            .querySelectorAll(
                                ".farmer-module-page .workflow-step"
                            )
                            .forEach(
                                other => {

                                    if (
                                        other !== step
                                    ) {

                                        other.style.opacity =
                                            ".55";

                                    }

                                }
                            );

                    }
                );


                step.addEventListener(
                    "mouseleave",
                    () => {

                        document
                            .querySelectorAll(
                                ".farmer-module-page .workflow-step"
                            )
                            .forEach(
                                other => {

                                    other.style.opacity =
                                        "";

                                }
                            );

                    }
                );

            }
        );



    /* ========================================================
       GOLD SCROLL PROGRESS
       ======================================================== */

    let progress =
        document.querySelector(
            ".farmer-scroll-progress"
        );


    if (!progress) {

        progress =
            document.createElement(
                "div"
            );

        progress.className =
            "farmer-scroll-progress";

        Object.assign(
            progress.style,
            {

                position:
                    "fixed",

                top:
                    "0",

                left:
                    "0",

                width:
                    "0%",

                height:
                    "3px",

                zIndex:
                    "99999",

                pointerEvents:
                    "none",

                background:
                    "linear-gradient(90deg,#19d47b,#f3cf63,#28d9e8,#f3cf63)",

                boxShadow:
                    "0 0 18px rgba(243,207,99,.55)",

                transition:
                    "width .08s linear"

            }
        );


        document.body.appendChild(
            progress
        );

    }


    const updateProgress =
        () => {

            const scroll =
                window.scrollY;


            const total =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            const value =
                total > 0
                    ? (scroll / total) * 100
                    : 0;


            progress.style.width =
                `${value}%`;

        };


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive:
                true
        }
    );


    updateProgress();



    /* ========================================================
       GOLDEN TEXT SHIMMER ON HOVER
       ======================================================== */

    document
        .querySelectorAll(
            ".farmer-module-page " +
            ".gradient-heading, " +
            ".farmer-module-page " +
            ".farmer-quote p"
        )
        .forEach(
            element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        element.style.animationDuration =
                            "2.2s";

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        element.style.animationDuration =
                            "7s";

                    }
                );

            }
        );



    /* ========================================================
       GOLDEN PARTICLE BURST
       ======================================================== */

    const createBurst =
        (x, y) => {

            for (
                let i = 0;
                i < 8;
                i++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );


                Object.assign(
                    particle.style,
                    {

                        position:
                            "fixed",

                        left:
                            `${x}px`,

                        top:
                            `${y}px`,

                        width:
                            "4px",

                        height:
                            "4px",

                        borderRadius:
                            "50%",

                        background:
                            "#f3cf63",

                        boxShadow:
                            "0 0 10px rgba(243,207,99,.8)",

                        pointerEvents:
                            "none",

                        zIndex:
                            "99999"

                    }
                );


                const angle =
                    Math.random() *
                    Math.PI *
                    2;


                const distance =
                    25 +
                    Math.random() * 45;


                document.body.appendChild(
                    particle
                );


                particle.animate(
                    [

                        {
                            transform:
                                "translate(-50%,-50%) scale(1)",
                            opacity:
                                1

                        },

                        {
                            transform:
                                `
                                translate(
                                    ${Math.cos(angle) * distance}px,
                                    ${Math.sin(angle) * distance}px
                                )
                                scale(0)
                                `,
                            opacity:
                                0

                        }

                    ],
                    {

                        duration:
                            650,

                        easing:
                            "cubic-bezier(.2,.8,.2,1)"

                    }
                ).onfinish =
                    () => {

                        particle.remove();

                    };

            }

        };


    document
        .querySelectorAll(
            ".farmer-module-page .hero-badge"
        )
        .forEach(
            badge => {

                badge.addEventListener(
                    "click",
                    event => {

                        createBurst(
                            event.clientX,
                            event.clientY
                        );

                    }
                );

            }
        );



    /* ========================================================
       CURRENT YEAR
       ======================================================== */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


})();
/* ============================================================
   AGRIVISION KARNATAKA
   FARMER MODULE — ELITE JS EXTENSION
   APPEND TO assets/js/script.js
   ============================================================ */

(() => {

    "use strict";


    document.addEventListener(
        "DOMContentLoaded",
        () => {


            const page =
                document.querySelector(
                    ".farmer-module-page"
                );


            if (!page) {
                return;
            }



            /* =================================================
               YEAR
               ================================================= */

            const year =
                document.getElementById(
                    "farmerYear"
                );

            if (year) {

                year.textContent =
                    new Date().getFullYear();

            }



            /* =================================================
               SCROLL PROGRESS
               ================================================= */

            const progress =
                document.querySelector(
                    ".farmer-progress span"
                );


            const updateProgress =
                () => {

                    if (!progress) {
                        return;
                    }

                    const scrollTop =
                        window.scrollY;

                    const documentHeight =
                        document.documentElement
                            .scrollHeight;

                    const viewport =
                        window.innerHeight;

                    const total =
                        documentHeight -
                        viewport;

                    const percentage =
                        total > 0
                            ? (scrollTop / total) * 100
                            : 0;

                    progress.style.width =
                        `${Math.min(
                            100,
                            Math.max(
                                0,
                                percentage
                            )
                        )}%`;

                };


            window.addEventListener(
                "scroll",
                updateProgress,
                {
                    passive:true
                }
            );

            updateProgress();



            /* =================================================
               INTERNAL NAVIGATION
               ================================================= */

            document
                .querySelectorAll(
                    '.farmer-module-page a[href^="#"]'
                )
                .forEach(
                    link => {

                        link.addEventListener(
                            "click",
                            event => {

                                const targetId =
                                    link.getAttribute(
                                        "href"
                                    );

                                if (
                                    !targetId ||
                                    targetId === "#"
                                ) {
                                    return;
                                }


                                const target =
                                    document.querySelector(
                                        targetId
                                    );

                                if (!target) {
                                    return;
                                }


                                event.preventDefault();


                                target.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",
                                        block:
                                            "start"
                                    }
                                );

                            }
                        );

                    }
                );



            /* =================================================
               SECTION REVEALS
               ================================================= */

            const revealItems =
                document.querySelectorAll(
                    [
                        ".farmer-section-heading",
                        ".farmer-problem-card",
                        ".farmer-capability-card",
                        ".farmer-stat-card",
                        ".resource-card",
                        ".trust-card",
                        ".alert-item",
                        ".cooperative-card",
                        ".advantage-card",
                        ".journey-step",
                        ".intelligence-feature",
                        ".network-card"
                    ].join(",")
                );


            if (
                "IntersectionObserver"
                in window
            ) {

                const revealObserver =
                    new IntersectionObserver(
                        entries => {

                            entries.forEach(
                                entry => {

                                    if (
                                        !entry.isIntersecting
                                    ) {
                                        return;
                                    }


                                    entry.target
                                        .classList
                                        .add(
                                            "farmer-visible"
                                        );


                                    revealObserver
                                        .unobserve(
                                            entry.target
                                        );

                                }
                            );

                        },
                        {
                            threshold:
                                .10
                        }
                    );


                revealItems.forEach(
                    (item, index) => {

                        item.style.transitionDelay =
                            `${Math.min(
                                index % 5,
                                4
                            ) * 70}ms`;

                        revealObserver.observe(
                            item
                        );

                    }
                );

            }
            else {

                revealItems.forEach(
                    item => {

                        item.classList.add(
                            "farmer-visible"
                        );

                    }
                );

            }



            /* =================================================
               GRAPH DRAW
               ================================================= */

            const chart =
                document.querySelector(
                    ".farmer-chart-card"
                );


            if (
                chart &&
                "IntersectionObserver"
                in window
            ) {

                const chartObserver =
                    new IntersectionObserver(
                        entries => {

                            entries.forEach(
                                entry => {

                                    if (
                                        !entry.isIntersecting
                                    ) {
                                        return;
                                    }


                                    chart.classList.add(
                                        "chart-visible"
                                    );


                                    chartObserver
                                        .unobserve(
                                            chart
                                        );

                                }
                            );

                        },
                        {
                            threshold:
                                .25
                        }
                    );


                chartObserver.observe(
                    chart
                );

            }



            /* =================================================
               GOLDEN FLOATING LEAVES
               ================================================= */

            const leafContainer =
                document.querySelector(
                    ".farmer-leaves"
                );


            if (leafContainer) {


                const leafSymbols = [
                    "🍃",
                    "🌿",
                    "🌱",
                    "🍂"
                ];


                const createLeaf =
                    () => {

                        const leaf =
                            document.createElement(
                                "span"
                            );


                        leaf.className =
                            "farmer-floating-leaf";


                        leaf.textContent =
                            leafSymbols[
                                Math.floor(
                                    Math.random() *
                                    leafSymbols.length
                                )
                            ];


                        leaf.style.left =
                            `${Math.random() * 100}%`;


                        leaf.style.fontSize =
                            `${10 +
                                Math.random() * 15
                            }px`;


                        leaf.style.opacity =
                            `${.15 +
                                Math.random() * .4
                            }`;


                        leaf.style.animationDuration =
                            `${12 +
                                Math.random() * 15
                            }s`;


                        leaf.style.animationDelay =
                            `${Math.random() * 8}s`;


                        leafContainer.appendChild(
                            leaf
                        );


                        setTimeout(
                            () => {
                                leaf.remove();
                            },
                            30000
                        );

                    };


                for (
                    let i = 0;
                    i < 16;
                    i++
                ) {

                    createLeaf();

                }


                setInterval(
                    createLeaf,
                    2500
                );


            }



            /* =================================================
               LEAF STYLES
               ================================================= */

            const leafStyle =
                document.createElement(
                    "style"
                );


            leafStyle.textContent = `

                .farmer-leaves {
                    position:fixed;
                    inset:0;
                    pointer-events:none;
                    z-index:-4;
                    overflow:hidden;
                }

                .farmer-floating-leaf {
                    position:absolute;
                    top:-50px;
                    color:rgba(243,207,99,.38);
                    filter:drop-shadow(
                        0 0 8px
                        rgba(243,207,99,.15)
                    );
                    animation:
                        farmerLeafFall
                        linear
                        infinite;
                }

                @keyframes farmerLeafFall {

                    0% {
                        transform:
                            translate3d(0,-10vh,0)
                            rotate(0deg);
                    }

                    25% {
                        transform:
                            translate3d(
                                55px,
                                25vh,
                                0
                            )
                            rotate(80deg);
                    }

                    50% {
                        transform:
                            translate3d(
                                -35px,
                                50vh,
                                0
                            )
                            rotate(170deg);
                    }

                    75% {
                        transform:
                            translate3d(
                                70px,
                                75vh,
                                0
                            )
                            rotate(260deg);
                    }

                    100% {
                        transform:
                            translate3d(
                                -30px,
                                115vh,
                                0
                            )
                            rotate(360deg);
                    }

                }

            `;


            document.head.appendChild(
                leafStyle
            );



            /* =================================================
               PARTICLES
               ================================================= */

            const particleContainer =
                document.querySelector(
                    ".farmer-particles"
                );


            if (particleContainer) {

                for (
                    let i = 0;
                    i < 45;
                    i++
                ) {

                    const particle =
                        document.createElement(
                            "span"
                        );


                    particle.className =
                        "farmer-particle";


                    particle.style.left =
                        `${Math.random() * 100}%`;

                    particle.style.top =
                        `${Math.random() * 100}%`;

                    particle.style.animationDelay =
                        `${Math.random() * 8}s`;

                    particle.style.animationDuration =
                        `${6 +
                            Math.random() * 8
                        }s`;


                    particleContainer.appendChild(
                        particle
                    );

                }


                const particleStyle =
                    document.createElement(
                        "style"
                    );


                particleStyle.textContent = `

                    .farmer-particles {
                        position:fixed;
                        inset:0;
                        pointer-events:none;
                        z-index:-6;
                    }

                    .farmer-particle {
                        position:absolute;
                        width:2px;
                        height:2px;
                        border-radius:50%;
                        background:#f3cf63;
                        box-shadow:
                            0 0 8px
                            rgba(243,207,99,.55);
                        opacity:.25;
                        animation:
                            farmerParticleFloat
                            ease-in-out
                            infinite;
                    }

                    @keyframes farmerParticleFloat {

                        0%,100% {
                            transform:
                                translate3d(0,0,0);
                            opacity:.1;
                        }

                        50% {
                            transform:
                                translate3d(
                                    20px,
                                    -35px,
                                    0
                                );
                            opacity:.7;
                        }

                    }

                `;


                document.head.appendChild(
                    particleStyle
                );

            }



            /* =================================================
               FIREFLIES
               ================================================= */

            const fireflyContainer =
                document.querySelector(
                    ".farmer-fireflies"
                );


            if (fireflyContainer) {

                for (
                    let i = 0;
                    i < 22;
                    i++
                ) {

                    const firefly =
                        document.createElement(
                            "span"
                        );


                    firefly.className =
                        "farmer-firefly";


                    firefly.style.left =
                        `${Math.random() * 100}%`;

                    firefly.style.top =
                        `${Math.random() * 100}%`;

                    firefly.style.animationDelay =
                        `${Math.random() * 7}s`;

                    firefly.style.animationDuration =
                        `${4 +
                            Math.random() * 6
                        }s`;


                    fireflyContainer.appendChild(
                        firefly
                    );

                }


                const fireflyStyle =
                    document.createElement(
                        "style"
                    );


                fireflyStyle.textContent = `

                    .farmer-fireflies {
                        position:fixed;
                        inset:0;
                        pointer-events:none;
                        z-index:-5;
                    }

                    .farmer-firefly {
                        position:absolute;
                        width:4px;
                        height:4px;
                        border-radius:50%;
                        background:#f3cf63;
                        box-shadow:
                            0 0 12px
                            rgba(243,207,99,.9);
                        animation:
                            farmerFirefly
                            ease-in-out
                            infinite;
                    }

                    @keyframes farmerFirefly {

                        0%,100% {
                            transform:
                                translate3d(0,0,0)
                                scale(.5);
                            opacity:.1;
                        }

                        50% {
                            transform:
                                translate3d(
                                    20px,
                                    -25px,
                                    0
                                )
                                scale(1.3);
                            opacity:.85;
                        }

                    }

                `;


                document.head.appendChild(
                    fireflyStyle
                );

            }



            /* =================================================
               CURSOR GOLD GLOW
               ================================================= */

            const cursorGlow =
                document.querySelector(
                    ".farmer-cursor-glow"
                );


            if (
                cursorGlow &&
                window.matchMedia(
                    "(pointer:fine)"
                ).matches
            ) {

                let mouseX =
                    window.innerWidth / 2;

                let mouseY =
                    window.innerHeight / 2;

                let currentX =
                    mouseX;

                let currentY =
                    mouseY;


                window.addEventListener(
                    "pointermove",
                    event => {

                        mouseX =
                            event.clientX;

                        mouseY =
                            event.clientY;

                    },
                    {
                        passive:true
                    }
                );


                const animateGlow =
                    () => {

                        currentX +=
                            (mouseX -
                                currentX) *
                            .12;

                        currentY +=
                            (mouseY -
                                currentY) *
                            .12;


                        cursorGlow.style.left =
                            `${currentX}px`;

                        cursorGlow.style.top =
                            `${currentY}px`;


                        requestAnimationFrame(
                            animateGlow
                        );

                    };


                animateGlow();

            }



            /* =================================================
               CARD POINTER LIGHT
               ================================================= */

            const interactiveCards =
                document.querySelectorAll(
                    [
                        ".farmer-capability-card",
                        ".farmer-problem-card",
                        ".farmer-stat-card",
                        ".resource-card",
                        ".trust-card",
                        ".cooperative-card",
                        ".advantage-card",
                        ".intelligence-feature"
                    ].join(",")
                );


            interactiveCards.forEach(
                card => {

                    card.addEventListener(
                        "pointermove",
                        event => {

                            const rect =
                                card.getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left;


                            const y =
                                event.clientY -
                                rect.top;


                            card.style.setProperty(
                                "--card-x",
                                `${x}px`
                            );


                            card.style.setProperty(
                                "--card-y",
                                `${y}px`
                            );

                        }
                    );

                }
            );



            /* =================================================
               MOBILE MENU
               ================================================= */

            const menuButton =
                document.querySelector(
                    ".farmer-menu-toggle"
                );

            const nav =
                document.querySelector(
                    ".farmer-nav"
                );


            if (
                menuButton &&
                nav
            ) {

                menuButton.addEventListener(
                    "click",
                    () => {

                        nav.classList.toggle(
                            "farmer-mobile-open"
                        );

                    }
                );


                nav.querySelectorAll("a")
                    .forEach(
                        link => {

                            link.addEventListener(
                                "click",
                                () => {

                                    nav.classList.remove(
                                        "farmer-mobile-open"
                                    );

                                }
                            );

                        }
                    );


                const mobileNavStyle =
                    document.createElement(
                        "style"
                    );


                mobileNavStyle.textContent = `

                    @media (max-width:1000px) {

                        .farmer-nav.farmer-mobile-open {
                            position:absolute;
                            top:calc(100% + 10px);
                            left:0;
                            right:0;
                            display:flex;
                            flex-direction:column;
                            align-items:stretch;
                            padding:12px;
                            border:1px solid
                                rgba(255,255,255,.10);
                            border-radius:20px;
                            background:
                                rgba(4,20,11,.92);
                            backdrop-filter:blur(25px);
                            box-shadow:
                                0 25px 70px
                                rgba(0,0,0,.35);
                        }

                        .farmer-nav.farmer-mobile-open a {
                            padding:13px;
                        }

                    }

                `;


                document.head.appendChild(
                    mobileNavStyle
                );

            }



            /* =================================================
               ACTIVE NAVIGATION
               ================================================= */

            const sections =
                document.querySelectorAll(
                    "main section[id]"
                );

            const navLinks =
                document.querySelectorAll(
                    ".farmer-nav a"
                );


            if (
                sections.length &&
                navLinks.length &&
                "IntersectionObserver"
                in window
            ) {

                const sectionObserver =
                    new IntersectionObserver(
                        entries => {

                            entries.forEach(
                                entry => {

                                    if (
                                        !entry.isIntersecting
                                    ) {
                                        return;
                                    }


                                    navLinks.forEach(
                                        link => {

                                            link.classList.remove(
                                                "active"
                                            );

                                        }
                                    );


                                    const active =
                                        document.querySelector(
                                            `.farmer-nav a[href="#${entry.target.id}"]`
                                        );


                                    if (active) {

                                        active.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        },
                        {
                            rootMargin:
                                "-35% 0px -55% 0px"
                        }
                    );


                sections.forEach(
                    section => {

                        sectionObserver.observe(
                            section
                        );

                    }
                );

            }



            /* =================================================
               HERO PARALLAX
               ================================================= */

            const heroVisual =
                document.querySelector(
                    ".farmer-hero-visual"
                );


            if (
                heroVisual &&
                window.matchMedia(
                    "(pointer:fine)"
                ).matches
            ) {

                heroVisual.addEventListener(
                    "pointermove",
                    event => {

                        const rect =
                            heroVisual.getBoundingClientRect();


                        const x =
                            (event.clientX -
                                rect.left) /
                            rect.width -
                            .5;


                        const y =
                            (event.clientY -
                                rect.top) /
                            rect.height -
                            .5;


                        heroVisual.style.transform =
                            `
                            perspective(900px)
                            rotateY(${x * 4}deg)
                            rotateX(${y * -4}deg)
                            translateZ(0)
                            `;

                    }
                );


                heroVisual.addEventListener(
                    "pointerleave",
                    () => {

                        heroVisual.style.transform =
                            "";

                    }
                );

            }



            /* =================================================
               ESCAPE HATCH FOR HASH
               ================================================= */

            if (
                window.location.hash
            ) {

                setTimeout(
                    () => {

                        const target =
                            document.querySelector(
                                window.location.hash
                            );

                        if (target) {

                            target.scrollIntoView(
                                {
                                    behavior:
                                        "smooth"
                                }
                            );

                        }

                    },
                    250
                );

            }

        }
    );

})();
/* =========================================================
   AGRIVISION KARNATAKA
   FARMER MODULE — PREMIUM INTERACTION EXTENSION
   APPEND TO: assets/js/script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (!document.body.classList.contains("farmer-module-page")) {
        return;
    }

    /* =====================================================
       CORE REFERENCES
    ===================================================== */

    const body = document.body;
    const header = document.getElementById("header");
    const scrollTop = document.querySelector(".fm-scroll-top");
    const progress = document.querySelector(".fm-scroll-progress span");
    const cursorOrb = document.querySelector(".fm-cursor-orb");
    const background = document.querySelector(".fm-background-image");
    const mobileMenu = document.querySelector(".fm-mobile-menu");
    const nav = document.querySelector(".fm-nav");


    /* =====================================================
       YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (mobileMenu && nav) {

        mobileMenu.addEventListener("click", () => {

            nav.classList.toggle("open");

            const icon = mobileMenu.querySelector("i");

            if (nav.classList.contains("open")) {
                if (icon) icon.className = "fa-solid fa-xmark";
            } else {
                if (icon) icon.className = "fa-solid fa-bars";
            }

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                const icon = mobileMenu.querySelector("i");

                if (icon) {
                    icon.className = "fa-solid fa-bars";
                }

            });

        });

    }


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.getBoundingClientRect().height
                : 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                12;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 45) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const updateProgress = () => {

        if (!progress) return;

        const scrollable =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (scrollable <= 0) {
            progress.style.width = "0%";
            return;
        }

        const percentage =
            (window.scrollY / scrollable) * 100;

        progress.style.width =
            Math.min(100, Math.max(0, percentage)) + "%";

    };


    /* =====================================================
       SCROLL TOP
    ===================================================== */

    const updateScrollTop = () => {

        if (!scrollTop) return;

        if (window.scrollY > 650) {
            scrollTop.classList.add("show");
        } else {
            scrollTop.classList.remove("show");
        }

    };


    if (scrollTop) {

        scrollTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       ACTIVE SECTION NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".fm-nav a[href^='#']");

    const navSections = [];

    navLinks.forEach(link => {

        const id = link.getAttribute("href");

        if (!id || id === "#") return;

        const section = document.querySelector(id);

        if (section) {
            navSections.push({
                section,
                link
            });
        }

    });


    const updateActiveNavigation = () => {

        if (!navSections.length) return;

        const marker =
            window.scrollY +
            (header ? header.offsetHeight : 80) +
            180;

        let active = navSections[0];

        navSections.forEach(item => {

            if (item.section.offsetTop <= marker) {
                active = item;
            }

        });

        navSections.forEach(item => {

            item.link.classList.toggle(
                "active",
                item === active
            );

        });

    };


    /* =====================================================
       MASTER SCROLL EVENT
    ===================================================== */

    let scrollTicking = false;

    window.addEventListener("scroll", () => {

        if (scrollTicking) return;

        scrollTicking = true;

        requestAnimationFrame(() => {

            updateHeader();
            updateProgress();
            updateScrollTop();
            updateActiveNavigation();

            scrollTicking = false;

        });

    }, { passive: true });


    updateHeader();
    updateProgress();
    updateScrollTop();
    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems =
        document.querySelectorAll(".fm-reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("fm-visible");

                        revealObserver.unobserve(entry.target);

                    });

                },
                {
                    threshold:0.10,
                    rootMargin:"0px 0px -60px 0px"
                }
            );

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("fm-visible");
        });

    }


    /* =====================================================
       3D PREMIUM CARD SYSTEM
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(".fm-tilt");

    const canTilt =
        window.matchMedia &&
        window.matchMedia("(hover:hover)").matches;

    if (canTilt) {

        tiltCards.forEach(card => {

            let raf = null;

            card.addEventListener("mousemove", event => {

                if (raf) cancelAnimationFrame(raf);

                raf = requestAnimationFrame(() => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const rotateY =
                        ((x / rect.width) - .5) * 8;

                    const rotateX =
                        ((y / rect.height) - .5) * -8;

                    const px =
                        (x / rect.width) * 100;

                    const py =
                        (y / rect.height) * 100;

                    card.style.transform =
                        `perspective(1100px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-7px)`;

                    card.style.setProperty(
                        "--fm-mx",
                        px + "%"
                    );

                    card.style.setProperty(
                        "--fm-my",
                        py + "%"
                    );

                });

            });


            card.addEventListener("mouseleave", () => {

                if (raf) cancelAnimationFrame(raf);

                card.style.transform =
                    "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)";

            });

        });

    }


    /* =====================================================
       CARD SHINE LAYER
    ===================================================== */

    const shineStyle = document.createElement("style");

    shineStyle.textContent = `

        .fm-tilt::before{
            transition:opacity .3s ease;
        }

        .fm-tilt:hover::before{
            opacity:1;
            background:
                radial-gradient(
                    240px circle at var(--fm-mx,50%) var(--fm-my,50%),
                    rgba(255,255,255,.09),
                    transparent 65%
                );
        }

    `;

    document.head.appendChild(shineStyle);


    /* =====================================================
       CURSOR ORB
    ===================================================== */

    if (cursorOrb && canTilt) {

        let cursorX = 0;
        let cursorY = 0;
        let orbX = 0;
        let orbY = 0;

        document.addEventListener("mousemove", event => {

            cursorX = event.clientX;
            cursorY = event.clientY;

        }, { passive:true });


        const animateCursor = () => {

            orbX += (cursorX - orbX) * .16;
            orbY += (cursorY - orbY) * .16;

            cursorOrb.style.left =
                orbX + "px";

            cursorOrb.style.top =
                orbY + "px";

            requestAnimationFrame(animateCursor);

        };

        animateCursor();

    }


    /* =====================================================
       MOUSE GLOW
    ===================================================== */

    const mouseGlow =
        document.querySelector(".mouse-glow");

    if (mouseGlow && canTilt) {

        document.addEventListener("mousemove", event => {

            mouseGlow.style.left =
                event.clientX + "px";

            mouseGlow.style.top =
                event.clientY + "px";

        }, { passive:true });

    }


    /* =====================================================
       BACKGROUND PARALLAX
    ===================================================== */

    if (background && canTilt) {

        let bgFrame = null;

        document.addEventListener("mousemove", event => {

            if (bgFrame) return;

            bgFrame = requestAnimationFrame(() => {

                const x =
                    (event.clientX / window.innerWidth - .5) * 12;

                const y =
                    (event.clientY / window.innerHeight - .5) * 8;

                background.style.transform =
                    `translate3d(${x}px,${y}px,0) scale(1.045)`;

                bgFrame = null;

            });

        }, { passive:true });

    }


    /* =====================================================
       MULTICOLOR CURSOR STARS
    ===================================================== */

    if (canTilt) {

        const starColors = [
            "#ffffff",
            "#00ff87",
            "#00e5ff",
            "#ffd84d",
            "#b86bff",
            "#ff5fcf"
        ];

        let lastStar = 0;

        document.addEventListener("mousemove", event => {

            const now = performance.now();

            if (now - lastStar < 42) return;

            lastStar = now;

            const star =
                document.createElement("span");

            star.className = "fm-cursor-star";

            const size =
                Math.random() * 4 + 2;

            const color =
                starColors[
                    Math.floor(
                        Math.random() *
                        starColors.length
                    )
                ];

            star.style.width = size + "px";
            star.style.height = size + "px";
            star.style.left = event.clientX + "px";
            star.style.top = event.clientY + "px";
            star.style.background = color;
            star.style.boxShadow =
                `0 0 8px ${color},
                 0 0 18px ${color}`;

            star.style.setProperty(
                "--sx",
                (Math.random() * 34 - 17).toFixed(2)
            );

            star.style.setProperty(
                "--sy",
                (Math.random() * 34 - 17).toFixed(2)
            );

            document.body.appendChild(star);

            setTimeout(() => {
                star.remove();
            }, 900);

        }, { passive:true });

    }


    /* =====================================================
       FLOATING LEAVES
    ===================================================== */

    const leafContainer =
        document.querySelector(".floating-leaves");

    if (leafContainer) {

        const leafIcons = [
            "🍃",
            "🌿",
            "🍂",
            "🌱"
        ];

        const createLeaf = () => {

            const leaf =
                document.createElement("div");

            leaf.className = "leaf";

            leaf.textContent =
                leafIcons[
                    Math.floor(
                        Math.random() *
                        leafIcons.length
                    )
                ];

            leaf.style.left =
                Math.random() * 100 + "%";

            leaf.style.fontSize =
                (16 + Math.random() * 24) + "px";

            leaf.style.setProperty(
                "--leaf-duration",
                (10 + Math.random() * 10) + "s"
            );

            leaf.style.animationDelay =
                Math.random() * 2 + "s";

            leafContainer.appendChild(leaf);

            setTimeout(() => {
                leaf.remove();
            }, 22000);

        };


        for (let i = 0; i < 18; i++) {
            setTimeout(
                createLeaf,
                i * 250
            );
        }

        setInterval(
            createLeaf,
            900
        );

    }


    /* =====================================================
       FIREFLIES
    ===================================================== */

    const fireflyContainer =
        document.querySelector(".fireflies");

    if (fireflyContainer) {

        const createFirefly = () => {

            const fly =
                document.createElement("div");

            fly.className = "firefly";

            fly.style.left =
                Math.random() * 100 + "%";

            fly.style.top =
                Math.random() * 100 + "%";

            fly.style.setProperty(
                "--fly-duration",
                (5 + Math.random() * 7) + "s"
            );

            fly.style.animationDelay =
                Math.random() * 6 + "s";

            fireflyContainer.appendChild(fly);

            setTimeout(() => {
                fly.remove();
            }, 15000);

        };


        for (let i = 0; i < 32; i++) {
            createFirefly();
        }

        setInterval(
            createFirefly,
            500
        );

    }


    /* =====================================================
       LIGHT TRAILS
    ===================================================== */

    const lightContainer =
        document.querySelector(".light-trails");

    if (lightContainer) {

        const createTrail = () => {

            const trail =
                document.createElement("div");

            trail.className =
                "fm-light-trail";

            trail.style.left =
                Math.random() * 100 + "vw";

            trail.style.top =
                "-200px";

            trail.style.height =
                (120 + Math.random() * 190) + "px";

            trail.style.opacity =
                (.2 + Math.random() * .5).toFixed(2);

            lightContainer.appendChild(trail);

            setTimeout(() => {
                trail.remove();
            }, 5000);

        };


        setInterval(
            createTrail,
            1300
        );

    }


    /* =====================================================
       PARTICLE FIELD
    ===================================================== */

    const particleContainer =
        document.querySelector(".fm-particles");

    if (particleContainer) {

        const particleColors = [
            "#00ff87",
            "#00e5ff",
            "#ffd84d",
            "#b86bff"
        ];

        const particleCount =
            window.innerWidth < 700
                ? 35
                : 70;

        for (let i = 0; i < particleCount; i++) {

            const particle =
                document.createElement("span");

            particle.style.position = "absolute";
            particle.style.left =
                Math.random() * 100 + "%";
            particle.style.top =
                Math.random() * 100 + "%";

            const size =
                Math.random() * 2.5 + 1;

            particle.style.width =
                size + "px";

            particle.style.height =
                size + "px";

            particle.style.borderRadius =
                "50%";

            const color =
                particleColors[
                    Math.floor(
                        Math.random() *
                        particleColors.length
                    )
                ];

            particle.style.background =
                color;

            particle.style.boxShadow =
                `0 0 8px ${color}`;

            particle.style.opacity =
                (.18 + Math.random() * .55)
                .toFixed(2);

            particle.style.animation =
                `fmParticleFloat ${8 + Math.random() * 12}s ease-in-out ${Math.random() * -10}s infinite`;

            particleContainer.appendChild(particle);

        }

    }


    const particleAnimation =
        document.createElement("style");

    particleAnimation.textContent = `

        @keyframes fmParticleFloat{

            0%,100%{
                transform:translate3d(0,0,0) scale(.8);
            }

            25%{
                transform:translate3d(
                    20px,
                    -30px,
                    0
                ) scale(1.15);
            }

            50%{
                transform:translate3d(
                    -25px,
                    -65px,
                    0
                ) scale(.9);
            }

            75%{
                transform:translate3d(
                    35px,
                    -35px,
                    0
                ) scale(1.25);
            }

        }

    `;

    document.head.appendChild(
        particleAnimation
    );


    /* =====================================================
       GRAPH REVEAL
    ===================================================== */

    const graphShell =
        document.querySelector(".fm-graph-shell");

    if (graphShell) {

        const graphObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            graphShell.classList.add(
                                "graph-visible"
                            );

                            graphObserver.unobserve(
                                graphShell
                            );

                        }

                    });

                },
                {
                    threshold:.25
                }
            );

        graphObserver.observe(graphShell);

    }


    /* =====================================================
       GRAPH POINT INTERACTION
    ===================================================== */

    document
        .querySelectorAll(".fm-graph-points circle")
        .forEach((point, index) => {

            point.style.cursor = "pointer";

            point.addEventListener("mouseenter", () => {

                point.setAttribute(
                    "r",
                    "11"
                );

                point.style.filter =
                    "drop-shadow(0 0 12px #00ff87) drop-shadow(0 0 28px #00e5ff)";

            });

            point.addEventListener("mouseleave", () => {

                point.setAttribute(
                    "r",
                    "7"
                );

            });

        });


    /* =====================================================
       BUTTON RIPPLE
    ===================================================== */

    document
        .querySelectorAll(".fm-ripple")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const size =
                        Math.max(
                            button.offsetWidth,
                            button.offsetHeight
                        );

                    const ripple =
                        document.createElement("span");

                    ripple.className =
                        "fm-ripple-wave";

                    ripple.style.width =
                        size + "px";

                    ripple.style.height =
                        size + "px";

                    ripple.style.left =
                        (event.clientX -
                            rect.left -
                            size / 2) + "px";

                    ripple.style.top =
                        (event.clientY -
                            rect.top -
                            size / 2) + "px";

                    button.appendChild(
                        ripple
                    );

                    setTimeout(() => {
                        ripple.remove();
                    }, 700);

                }
            );

        });


    /* =====================================================
       MAGNETIC BUTTON EFFECT
    ===================================================== */

    if (canTilt) {

        document
            .querySelectorAll(
                ".fm-button,.fm-back-top"
            )
            .forEach(button => {

                button.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            button.getBoundingClientRect();

                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;

                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;

                        button.style.transform =
                            `translate(${x * .08}px,${y * .08}px) translateY(-3px)`;

                    }
                );

                button.addEventListener(
                    "mouseleave",
                    () => {

                        button.style.transform =
                            "";

                    }
                );

            });

    }


    /* =====================================================
       HOVER SECTION LIGHT
    ===================================================== */

    const premiumSections =
        document.querySelectorAll(
            ".fm-section"
        );

    premiumSections.forEach(section => {

        section.addEventListener(
            "mouseenter",
            () => {
                section.classList.add(
                    "fm-section-active"
                );
            }
        );

        section.addEventListener(
            "mouseleave",
            () => {
                section.classList.remove(
                    "fm-section-active"
                );
            }
        );

    });


    /* =====================================================
       WORKFLOW STEP ACTIVE FOCUS
    ===================================================== */

    const workflowSteps =
        document.querySelectorAll(
            ".fm-workflow-step"
        );

    workflowSteps.forEach((step, index) => {

        step.addEventListener(
            "mouseenter",
            () => {

                workflowSteps.forEach(
                    item =>
                        item.style.opacity =
                            ".42"
                );

                step.style.opacity =
                    "1";

            }
        );

        step.addEventListener(
            "mouseleave",
            () => {

                workflowSteps.forEach(
                    item =>
                        item.style.opacity =
                            "1"
                );

            }
        );

    });


    /* =====================================================
       MARKET CARDS — GLOW TRACKING
    ===================================================== */

    document
        .querySelectorAll(".fm-market-stat")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    card.style.background =
                        `radial-gradient(
                            170px circle at ${x}px ${y}px,
                            rgba(255,216,77,.075),
                            rgba(2,27,17,.58) 70%
                        )`;

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.background =
                        "";

                }
            );

        });


    /* =====================================================
       RANDOM SPARK BURSTS
    ===================================================== */

    const sparkField =
        document.querySelector(
            ".fm-spark-field"
        );

    if (sparkField) {

        const createSparkBurst = () => {

            const burst =
                document.createElement("div");

            burst.style.position =
                "absolute";

            burst.style.left =
                Math.random() * 100 + "%";

            burst.style.top =
                Math.random() * 100 + "%";

            burst.style.width =
                "3px";

            burst.style.height =
                "3px";

            burst.style.borderRadius =
                "50%";

            burst.style.background =
                Math.random() > .5
                    ? "#00ff87"
                    : "#ffd84d";

            burst.style.boxShadow =
                "0 0 12px currentColor";

            burst.style.animation =
                "fmSparkBurst 1.3s ease-out forwards";

            sparkField.appendChild(
                burst
            );

            setTimeout(
                () => burst.remove(),
                1500
            );

        };

        setInterval(
            createSparkBurst,
            850
        );

    }


    const sparkStyle =
        document.createElement("style");

    sparkStyle.textContent = `

        @keyframes fmSparkBurst{

            0%{
                transform:scale(.2);
                opacity:0;
            }

            30%{
                transform:scale(1.8);
                opacity:1;
            }

            100%{
                transform:
                    scale(0)
                    translateY(-35px);
                opacity:0;
            }

        }

    `;

    document.head.appendChild(
        sparkStyle
    );


    /* =====================================================
       HERO ENTRANCE
    ===================================================== */

    const heroContent =
        document.querySelector(
            ".fm-hero-content"
        );

    const heroVisual =
        document.querySelector(
            ".fm-hero-visual"
        );

    if (heroContent) {

        heroContent.animate(
            [
                {
                    opacity:0,
                    transform:"translateY(45px)"
                },
                {
                    opacity:1,
                    transform:"translateY(0)"
                }
            ],
            {
                duration:1100,
                easing:"cubic-bezier(.2,.75,.2,1)",
                fill:"forwards"
            }
        );

    }

    if (heroVisual) {

        heroVisual.animate(
            [
                {
                    opacity:0,
                    transform:"scale(.88) translateY(30px)"
                },
                {
                    opacity:1,
                    transform:"scale(1) translateY(0)"
                }
            ],
            {
                duration:1300,
                delay:180,
                easing:"cubic-bezier(.2,.75,.2,1)",
                fill:"forwards"
            }
        );

    }


    /* =====================================================
       SECTION HEADING SHIMMER
    ===================================================== */

    const headings =
        document.querySelectorAll(
            ".fm-section-heading h2,.fm-final-card h2"
        );

    headings.forEach(heading => {

        heading.addEventListener(
            "mouseenter",
            () => {
                heading.classList.add(
                    "fm-heading-active"
                );
            }
        );

        heading.addEventListener(
            "mouseleave",
            () => {
                heading.classList.remove(
                    "fm-heading-active"
                );
            }
        );

    });


    const headingStyle =
        document.createElement("style");

    headingStyle.textContent = `

        .fm-heading-active .fm-gradient-text{
            animation-duration:2.2s;
            filter:
                drop-shadow(0 0 12px rgba(0,255,135,.32))
                drop-shadow(0 0 24px rgba(184,107,255,.18));
        }

    `;

    document.head.appendChild(
        headingStyle
    );


    /* =====================================================
       VISIBILITY PERFORMANCE
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                body.classList.add(
                    "fm-page-hidden"
                );

            } else {

                body.classList.remove(
                    "fm-page-hidden"
                );

            }

        }
    );


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const reducedMotion =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reducedMotion) {

        document
            .querySelectorAll(".fm-reveal")
            .forEach(item => {

                item.classList.add(
                    "fm-visible"
                );

            });

    }


    /* =====================================================
       FINAL INITIALIZATION
    ===================================================== */

    body.classList.add(
        "fm-page-ready"
    );

});
/* ================================================================
   AGRIVISION KARNATAKA
   FARMER MODULE — PREMIUM EFFECTS
   ================================================================ */

(() => {

    "use strict";

    const page = document.body;

    if (!page || !page.classList.contains("farmer-module-page")) {
        return;
    }


    /* ============================================================
       YEAR
    ============================================================ */

    const year = document.getElementById("fmYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ============================================================
       REDUCED MOTION
    ============================================================ */

    const reducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* ============================================================
       FIRELIES
    ============================================================ */

    const fireflies =
        document.getElementById("fmFireflies");

    if (fireflies && !reducedMotion) {

        const count =
            window.innerWidth < 700 ? 18 : 35;

        for (let i = 0; i < count; i++) {

            const item =
                document.createElement("span");

            item.className =
                "fm-firefly";

            item.style.left =
                `${Math.random() * 100}%`;

            item.style.top =
                `${Math.random() * 100}%`;

            item.style.setProperty(
                "--x",
                `${(Math.random() - .5) * 260}px`
            );

            item.style.setProperty(
                "--y",
                `${(Math.random() - .5) * 260}px`
            );

            item.style.setProperty(
                "--duration",
                `${5 + Math.random() * 9}s`
            );

            item.style.animationDelay =
                `${Math.random() * -10}s`;

            fireflies.appendChild(item);
        }
    }


    /* ============================================================
       FLOATING LEAVES
    ============================================================ */

    const leaves =
        document.getElementById("fmLeaves");

    if (leaves && !reducedMotion) {

        const count =
            window.innerWidth < 700 ? 7 : 15;

        for (let i = 0; i < count; i++) {

            const leaf =
                document.createElement("span");

            leaf.className =
                "fm-leaf";

            leaf.style.left =
                `${Math.random() * 100}%`;

            leaf.style.setProperty(
                "--size",
                `${10 + Math.random() * 20}px`
            );

            leaf.style.setProperty(
                "--rotation",
                `${Math.random() * 360}deg`
            );

            leaf.style.setProperty(
                "--duration",
                `${14 + Math.random() * 18}s`
            );

            leaf.style.animationDelay =
                `${Math.random() * -25}s`;

            leaves.appendChild(leaf);
        }
    }


    /* ============================================================
       GOLD PARTICLES
    ============================================================ */

    const particles =
        document.getElementById("fmParticles");

    if (particles && !reducedMotion) {

        const count =
            window.innerWidth < 700 ? 25 : 65;

        for (let i = 0; i < count; i++) {

            const particle =
                document.createElement("span");

            particle.className =
                "fm-particle";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.setProperty(
                "--drift",
                `${(Math.random() - .5) * 220}px`
            );

            particle.style.setProperty(
                "--duration",
                `${8 + Math.random() * 15}s`
            );

            particle.style.animationDelay =
                `${Math.random() * -20}s`;

            particles.appendChild(particle);
        }
    }


    /* ============================================================
       LIGHT TRAILS
    ============================================================ */

    const lightTrails =
        document.getElementById("fmLightTrails");

    if (lightTrails && !reducedMotion) {

        const count =
            window.innerWidth < 700 ? 3 : 7;

        for (let i = 0; i < count; i++) {

            const trail =
                document.createElement("span");

            trail.className =
                "fm-light-trail";

            const top =
                8 + Math.random() * 85;

            trail.style.setProperty(
                "--top",
                `${top}vh`
            );

            trail.style.setProperty(
                "--duration",
                `${10 + Math.random() * 13}s`
            );

            trail.style.animationDelay =
                `${Math.random() * -15}s`;

            lightTrails.appendChild(trail);
        }
    }


    /* ============================================================
       CURSOR GLOW
    ============================================================ */

    const cursorGlow =
        document.getElementById("fmCursorGlow");

    if (
        cursorGlow &&
        !reducedMotion &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let currentX = mouseX;
        let currentY = mouseY;

        window.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

            },
            { passive: true }
        );

        const animateCursor = () => {

            currentX +=
                (mouseX - currentX) * .12;

            currentY +=
                (mouseY - currentY) * .12;

            cursorGlow.style.left =
                `${currentX}px`;

            cursorGlow.style.top =
                `${currentY}px`;

            requestAnimationFrame(
                animateCursor
            );
        };

        animateCursor();
    }


    /* ============================================================
       SCROLL REVEAL
    ============================================================ */

    const revealItems =
        document.querySelectorAll(".fm-reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "fm-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: .12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealItems.forEach(item => {
            observer.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("fm-visible");
        });
    }


    /* ============================================================
       GRAPH ANIMATION
    ============================================================ */

    const graphLine =
        document.querySelector(".fm-graph-line");

    if (
        graphLine &&
        "IntersectionObserver" in window
    ) {

        const graphObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            graphLine.classList.add(
                                "fm-drawn"
                            );

                            graphObserver.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: .4
                }
            );

        graphObserver.observe(graphLine);
    }


    /* ============================================================
       CARD 3D TILT
    ============================================================ */

    if (
        !reducedMotion &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        const cards =
            document.querySelectorAll(
                ".fm-feature-card, " +
                ".fm-large-card, " +
                ".fm-market-card, " +
                ".fm-resource-card, " +
                ".fm-advantage"
            );

        cards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const rotateY =
                        ((x / rect.width) - .5) * 5;

                    const rotateX =
                        ((y / rect.height) - .5) * -5;

                    card.style.transform =
                        `perspective(800px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;
                }
            );

            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform = "";
                }
            );
        });
    }


    /* ============================================================
       BUTTON MAGNETIC EFFECT
    ============================================================ */

    if (
        !reducedMotion &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        const buttons =
            document.querySelectorAll(
                ".fm-button, .fm-header-button"
            );

        buttons.forEach(button => {

            button.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY - rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * .08}px,
                                   ${y * .08}px)
                         translateY(-2px)`;
                }
            );

            button.addEventListener(
                "pointerleave",
                () => {

                    button.style.transform = "";
                }
            );
        });
    }


    /* ============================================================
       SCROLL PROGRESS
    ============================================================ */

    const progress =
        document.getElementById(
            "fmScrollProgress"
        );

    if (progress) {

        const updateProgress = () => {

            const scrollTop =
                window.scrollY;

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const percentage =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;

            progress.style.width =
                `${percentage}%`;
        };

        window.addEventListener(
            "scroll",
            updateProgress,
            { passive: true }
        );

        updateProgress();
    }


    /* ============================================================
       ACTIVE SECTION NAVIGATION
    ============================================================ */

    const navLinks =
        document.querySelectorAll(
            ".fm-navigation a"
        );

    const sections =
        [
            "overview",
            "intelligence",
            "market",
            "resources",
            "advantages",
            "uniqueness"
        ]
        .map(id => document.getElementById(id))
        .filter(Boolean);

    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        navLinks.forEach(link => {
                            link.classList.remove(
                                "fm-active"
                            );
                        });

                        const active =
                            document.querySelector(
                                `.fm-navigation a[href="#${entry.target.id}"]`
                            );

                        if (active) {
                            active.classList.add(
                                "fm-active"
                            );
                        }

                    });

                },
                {
                    threshold: .25,
                    rootMargin:
                        "-20% 0px -60% 0px"
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    /* ============================================================
       SMOOTH INTERNAL LINKS
       ============================================================ */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth",
                    block: "start"
                });
            }
        );
    });


    /* ============================================================
       SMALL GOLD SPARKLE BURST
       ============================================================ */

    const createSparkle =
        (x, y) => {

            if (reducedMotion) {
                return;
            }

            const sparkle =
                document.createElement("span");

            sparkle.style.position =
                "fixed";

            sparkle.style.left =
                `${x}px`;

            sparkle.style.top =
                `${y}px`;

            sparkle.style.width =
                "4px";

            sparkle.style.height =
                "4px";

            sparkle.style.borderRadius =
                "50%";

            sparkle.style.pointerEvents =
                "none";

            sparkle.style.zIndex =
                "9998";

            sparkle.style.background =
                "#e5bd4f";

            sparkle.style.boxShadow =
                "0 0 12px #ffe58b";

            sparkle.style.transform =
                "translate(-50%,-50%)";

            sparkle.style.transition =
                "all .7s ease";

            document.body.appendChild(
                sparkle
            );

            requestAnimationFrame(() => {

                sparkle.style.opacity =
                    "0";

                sparkle.style.transform =
                    `translate(
                        ${-20 + Math.random() * 40}px,
                        ${-25 + Math.random() * 50}px
                    ) scale(2)`;
            });

            setTimeout(() => {
                sparkle.remove();
            }, 800);
        };


    /* ============================================================
       SPARKLE ON GOLD BUTTON HOVER
    ============================================================ */

    document.querySelectorAll(
        ".fm-button-gold"
    ).forEach(button => {

        button.addEventListener(
            "pointerenter",
            event => {

                const rect =
                    button.getBoundingClientRect();

                for (let i = 0; i < 6; i++) {

                    createSparkle(
                        rect.left +
                        Math.random() *
                        rect.width,

                        rect.top +
                        Math.random() *
                        rect.height
                    );
                }
            }
        );
    });


    /* ============================================================
       PARALLAX LIGHT
    ============================================================ */

    if (
        !reducedMotion &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        const orb1 =
            document.querySelector(
                ".fm-light-orb-1"
            );

        const orb2 =
            document.querySelector(
                ".fm-light-orb-2"
            );

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        .5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        .5);

                if (orb1) {

                    orb1.style.transform =
                        `translate(
                            ${x * 35}px,
                            ${y * 25}px
                        )`;
                }

                if (orb2) {

                    orb2.style.transform =
                        `translate(
                            ${x * -30}px,
                            ${y * -20}px
                        )`;
                }
            },
            { passive: true }
        );
    }


    /* ============================================================
       FINAL INITIALIZATION
    ============================================================ */

    page.classList.add(
        "fm-page-ready"
    );

})();
/* ============================================================
   AGRIVISION KARNATAKA
   IMPACT MODULE — INTERACTION ENGINE
   APPEND TO assets/js/script.js
   ============================================================ */

(() => {

    "use strict";


    /* ========================================================
       BASIC HELPERS
    ======================================================== */

    const Impact = {

        reduced:
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches,

        qs(selector, root = document) {
            return root.querySelector(selector);
        },

        qsa(selector, root = document) {
            return [
                ...root.querySelectorAll(selector)
            ];
        },

        random(min, max) {
            return Math.random() *
                (max - min) + min;
        },


        /* ====================================================
           INITIALISE
        ==================================================== */

        init() {

            if (
                !document.body.classList.contains(
                    "impact-page"
                )
            ) {
                return;
            }

            this.header();

            this.mobileMenu();

            this.atmosphere();

            this.cursorGlow();

            this.reveal();

            this.network();

            this.counters();

            this.transactionModel();

            this.backToTop();

            this.parallax();

            this.anchors();

            this.year();

        },


        /* ====================================================
           HEADER
        ==================================================== */

        header() {

            const header =
                this.qs(".impact-header");

            if (!header) {
                return;
            }

            const update = () => {

                header.classList.toggle(
                    "scrolled",
                    window.scrollY > 20
                );

            };

            update();

            window.addEventListener(
                "scroll",
                update,
                { passive: true }
            );

        },


        /* ====================================================
           MOBILE MENU
        ==================================================== */

        mobileMenu() {

            const button =
                this.qs("#impactMenu");

            const navigation =
                this.qs(".impact-navigation");

            if (!button || !navigation) {
                return;
            }

            button.addEventListener(
                "click",
                () => {

                    navigation.classList.toggle(
                        "open"
                    );

                }
            );

            this.qsa(
                ".impact-navigation a"
            ).forEach(link => {

                link.addEventListener(
                    "click",
                    () => {
                        navigation.classList.remove(
                            "open"
                        );
                    }
                );

            });

        },


        /* ====================================================
           ATMOSPHERE
        ==================================================== */

        atmosphere() {

            if (this.reduced) {
                return;
            }


            const particles =
                this.qs(".impact-particles");

            const fireflies =
                this.qs(".impact-fireflies");

            const leaves =
                this.qs(".impact-leaves");


            /* PARTICLES */

            if (particles) {

                for (
                    let i = 0;
                    i < 42;
                    i++
                ) {

                    const particle =
                        document.createElement("i");

                    particle.className =
                        "impact-particle";

                    particle.style.cssText = `
                        left:${this.random(0,100)}%;
                        top:${this.random(0,100)}%;
                        --impact-x:${this.random(-140,140)}px;
                        --impact-duration:${this.random(8,18)}s;
                        --impact-delay:${this.random(-18,0)}s;
                    `;

                    particles.appendChild(
                        particle
                    );

                }

            }


            /* FIREFLIES */

            if (fireflies) {

                for (
                    let i = 0;
                    i < 34;
                    i++
                ) {

                    const firefly =
                        document.createElement("i");

                    firefly.className =
                        "impact-firefly";

                    firefly.style.cssText = `
                        left:${this.random(2,98)}%;
                        top:${this.random(10,96)}%;
                        --impact-size:${this.random(2,5)}px;
                        --impact-x:${this.random(-100,100)}px;
                        --impact-y:${this.random(-150,-40)}px;
                        --impact-duration:${this.random(5,12)}s;
                        --impact-delay:${this.random(-12,0)}s;
                    `;

                    fireflies.appendChild(
                        firefly
                    );

                }

            }


            /* LEAVES */

            if (leaves) {

                for (
                    let i = 0;
                    i < 18;
                    i++
                ) {

                    const leaf =
                        document.createElement("i");

                    leaf.className =
                        "impact-leaf";

                    leaf.style.cssText = `
                        left:${this.random(-5,105)}%;
                        --impact-width:${this.random(12,28)}px;
                        --impact-height:${this.random(7,17)}px;
                        --impact-x:${this.random(-180,180)}px;
                        --impact-duration:${this.random(11,23)}s;
                        --impact-delay:${this.random(-22,0)}s;
                    `;

                    leaves.appendChild(
                        leaf
                    );

                }

            }

        },


        /* ====================================================
           CURSOR LIGHT
        ==================================================== */

        cursorGlow() {

            const orb =
                this.qs(".impact-light-orb");

            if (
                !orb ||
                this.reduced ||
                !window.matchMedia(
                    "(pointer:fine)"
                ).matches
            ) {
                return;
            }

            let frame = 0;

            window.addEventListener(
                "pointermove",
                event => {

                    if (frame) {
                        return;
                    }

                    frame =
                        requestAnimationFrame(
                            () => {

                                orb.style.left =
                                    event.clientX +
                                    "px";

                                orb.style.top =
                                    event.clientY +
                                    "px";

                                frame = 0;

                            }
                        );

                },
                { passive: true }
            );

        },


        /* ====================================================
           SCROLL REVEAL
        ==================================================== */

        reveal() {

            const elements =
                this.qsa(
                    ".impact-reveal"
                );

            if (!elements.length) {
                return;
            }

            if (
                this.reduced ||
                !("IntersectionObserver" in window)
            ) {

                elements.forEach(
                    element =>
                        element.classList.add(
                            "visible"
                        )
                );

                return;
            }


            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold: .12,
                        rootMargin:
                            "0px 0px -7% 0px"
                    }
                );


            elements.forEach(
                element =>
                    observer.observe(element)
            );

        },


        /* ====================================================
           NETWORK INTERACTION
        ==================================================== */

        network() {

            const nodes =
                this.qsa(
                    ".impact-network-node"
                );

            const info =
                this.qs(
                    "#impactNetworkInfo"
                );

            if (!nodes.length || !info) {
                return;
            }


            nodes.forEach(node => {

                const activate = () => {

                    nodes.forEach(
                        n =>
                            n.classList.remove(
                                "active"
                            )
                    );

                    node.classList.add(
                        "active"
                    );


                    const role =
                        node.dataset.role ||
                        "Role";

                    const description =
                        node.dataset.description ||
                        "";


                    info.innerHTML = `
                        <span>
                            ACTIVE ECOSYSTEM ROLE
                        </span>

                        <strong>
                            ${role}
                        </strong>

                        <p>
                            ${description}
                        </p>
                    `;

                };


                node.addEventListener(
                    "mouseenter",
                    activate
                );

                node.addEventListener(
                    "focus",
                    activate
                );

                node.addEventListener(
                    "click",
                    activate
                );

            });

        },


        /* ====================================================
           COUNTERS
        ==================================================== */

        counters() {

            const counters =
                this.qsa(
                    "[data-impact-counter]"
                );

            if (!counters.length) {
                return;
            }


            const animate =
                element => {

                    const target =
                        Number(
                            element.dataset
                                .impactCounter
                        ) || 0;

                    const duration =
                        1400;

                    const start =
                        performance.now();


                    const tick =
                        currentTime => {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        start
                                    ) /
                                    duration,
                                    1
                                );

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );

                            const value =
                                Math.round(
                                    target *
                                    eased
                                );

                            element.textContent =
                                value.toLocaleString(
                                    "en-IN"
                                );

                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    tick
                                );

                            }

                        };


                    requestAnimationFrame(
                        tick
                    );

                };


            if (
                this.reduced ||
                !("IntersectionObserver" in window)
            ) {

                counters.forEach(
                    element => {

                        element.textContent =
                            Number(
                                element.dataset
                                    .impactCounter
                            ).toLocaleString(
                                "en-IN"
                            );

                    }
                );

                return;
            }


            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }

                                animate(
                                    entry.target
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold: .7
                    }
                );


            counters.forEach(
                counter =>
                    observer.observe(counter)
            );

        },


        /* ====================================================
           ₹1 TRANSACTION MODEL
        ==================================================== */

        transactionModel() {

            const count =
                this.qs(
                    "#impactTransactionCount"
                );

            const value =
                this.qs(
                    "#impactTransactionValue"
                );

            if (!count || !value) {
                return;
            }


            /*
             * Conceptual example:
             *
             * ₹1 × 1,00,00,000 transactions
             * = ₹1,00,00,000
             *
             * This is deliberately a visual model,
             * not a prediction.
             */

            const transactions =
                10000000;

            const contribution =
                transactions * 1;


            count.textContent =
                transactions.toLocaleString(
                    "en-IN"
                );

            value.textContent =
                "₹" +
                contribution.toLocaleString(
                    "en-IN"
                );

        },


        /* ====================================================
           BACK TO TOP
        ==================================================== */

        backToTop() {

            const button =
                this.qs("#impactTop");

            if (!button) {
                return;
            }


            const update =
                () => {

                    button.classList.toggle(
                        "show",
                        window.scrollY > 650
                    );

                };


            window.addEventListener(
                "scroll",
                update,
                { passive: true }
            );


            button.addEventListener(
                "click",
                () => {

                    window.scrollTo({
                        top: 0,
                        behavior:
                            this.reduced
                                ? "auto"
                                : "smooth"
                    });

                }
            );

        },


        /* ====================================================
           BACKGROUND PARALLAX
        ==================================================== */

        parallax() {

            if (this.reduced) {
                return;
            }

            const background =
                this.qs(
                    ".impact-background"
                );

            if (!background) {
                return;
            }

            let frame = 0;


            window.addEventListener(
                "pointermove",
                event => {

                    if (frame) {
                        return;
                    }

                    frame =
                        requestAnimationFrame(
                            () => {

                                const x =
                                    (
                                        event.clientX /
                                        window.innerWidth
                                    ) - .5;

                                const y =
                                    (
                                        event.clientY /
                                        window.innerHeight
                                    ) - .5;


                                background.style.transform =
                                    `
                                    scale(1.035)
                                    translate(
                                        ${x * 7}px,
                                        ${y * 5}px
                                    )
                                    `;


                                frame = 0;

                            }
                        );

                },
                { passive: true }
            );

        },


        /* ====================================================
           INTERNAL ANCHORS
        ==================================================== */

        anchors() {

            this.qsa(
                'a[href^="#"]'
            ).forEach(anchor => {

                anchor.addEventListener(
                    "click",
                    event => {

                        const selector =
                            anchor.getAttribute(
                                "href"
                            );

                        const target =
                            this.qs(selector);

                        if (!target) {
                            return;
                        }

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior:
                                this.reduced
                                    ? "auto"
                                    : "smooth"
                        });

                    }
                );

            });

        },


        /* ====================================================
           YEAR
        ==================================================== */

        year() {

            const year =
                this.qs("#impactYear");

            if (year) {
                year.textContent =
                    new Date().getFullYear();
            }

        }

    };


    /* ========================================================
       START
    ======================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            () => Impact.init()
        );

    } else {

        Impact.init();

    }


    window.AgriVisionImpact =
        Impact;

})();
/* ============================================================
   AGRIVISION KARNATAKA
   IMPACT MODULE — INTERACTION ENGINE
   ============================================================ */

(() => {

    "use strict";


    const Impact = {

        reduced:
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches,


        qs(selector, root = document) {
            return root.querySelector(selector);
        },


        qsa(selector, root = document) {
            return [
                ...root.querySelectorAll(selector)
            ];
        },


        random(min, max) {
            return Math.random() *
                (max - min) + min;
        },


        init() {

            if (
                !document.body.classList.contains(
                    "impact-page"
                )
            ) {
                return;
            }


            this.header();

            this.mobileMenu();

            this.atmosphere();

            this.cursorGlow();

            this.reveal();

            this.network();

            this.scaleSelector();

            this.transactionCalculator();

            this.backToTop();

            this.parallax();

            this.anchors();

            this.year();

        },


        /* ====================================================
           HEADER
        ==================================================== */

        header() {

            const header =
                this.qs(
                    ".impact-header"
                );

            if (!header) return;


            const update = () => {

                header.classList.toggle(
                    "scrolled",
                    window.scrollY > 20
                );

            };


            update();


            window.addEventListener(
                "scroll",
                update,
                {
                    passive:true
                }
            );

        },


        /* ====================================================
           MOBILE NAVIGATION
        ==================================================== */

        mobileMenu() {

            const button =
                this.qs(
                    "#impactMenu"
                );

            const navigation =
                this.qs(
                    ".impact-navigation"
                );


            if (
                !button ||
                !navigation
            ) {
                return;
            }


            button.addEventListener(
                "click",
                () => {

                    navigation.classList.toggle(
                        "open"
                    );

                }
            );


            this.qsa(
                ".impact-navigation a"
            ).forEach(
                link => {

                    link.addEventListener(
                        "click",
                        () => {

                            navigation.classList.remove(
                                "open"
                            );

                        }
                    );

                }
            );

        },


        /* ====================================================
           ATMOSPHERE
        ==================================================== */

        atmosphere() {

            if (this.reduced) {
                return;
            }


            const particles =
                this.qs(
                    ".impact-particles"
                );

            const fireflies =
                this.qs(
                    ".impact-fireflies"
                );

            const leaves =
                this.qs(
                    ".impact-leaves"
                );


            /* PARTICLES */

            if (particles) {

                for (
                    let i = 0;
                    i < 48;
                    i++
                ) {

                    const element =
                        document.createElement(
                            "i"
                        );


                    element.className =
                        "impact-particle";


                    element.style.cssText = `

                        left:${this.random(0,100)}%;

                        top:${this.random(0,100)}%;

                        --impact-x:
                            ${this.random(-160,160)}px;

                        --impact-duration:
                            ${this.random(8,18)}s;

                        --impact-delay:
                            ${this.random(-18,0)}s;

                    `;


                    particles.appendChild(
                        element
                    );

                }

            }


            /* FIREFLIES */

            if (fireflies) {

                for (
                    let i = 0;
                    i < 38;
                    i++
                ) {

                    const element =
                        document.createElement(
                            "i"
                        );


                    element.className =
                        "impact-firefly";


                    element.style.cssText = `

                        left:${this.random(2,98)}%;

                        top:${this.random(10,96)}%;

                        --impact-size:
                            ${this.random(2,5)}px;

                        --impact-x:
                            ${this.random(-100,100)}px;

                        --impact-y:
                            ${this.random(-150,-40)}px;

                        --impact-duration:
                            ${this.random(5,12)}s;

                        --impact-delay:
                            ${this.random(-12,0)}s;

                    `;


                    fireflies.appendChild(
                        element
                    );

                }

            }


            /* LEAVES */

            if (leaves) {

                for (
                    let i = 0;
                    i < 20;
                    i++
                ) {

                    const element =
                        document.createElement(
                            "i"
                        );


                    element.className =
                        "impact-leaf";


                    element.style.cssText = `

                        left:${this.random(-5,105)}%;

                        --impact-width:
                            ${this.random(12,28)}px;

                        --impact-height:
                            ${this.random(7,17)}px;

                        --impact-x:
                            ${this.random(-180,180)}px;

                        --impact-duration:
                            ${this.random(11,23)}s;

                        --impact-delay:
                            ${this.random(-22,0)}s;

                    `;


                    leaves.appendChild(
                        element
                    );

                }

            }

        },


        /* ====================================================
           CURSOR LIGHT
        ==================================================== */

        cursorGlow() {

            const orb =
                this.qs(
                    ".impact-light-orb"
                );


            if (
                !orb ||
                this.reduced ||
                !window.matchMedia(
                    "(pointer:fine)"
                ).matches
            ) {
                return;
            }


            let frame =
                0;


            window.addEventListener(
                "pointermove",
                event => {

                    if (frame) {
                        return;
                    }


                    frame =
                        requestAnimationFrame(
                            () => {

                                orb.style.left =
                                    event.clientX +
                                    "px";

                                orb.style.top =
                                    event.clientY +
                                    "px";

                                frame =
                                    0;

                            }
                        );

                },
                {
                    passive:true
                }
            );

        },


        /* ====================================================
           SCROLL REVEAL
        ==================================================== */

        reveal() {

            const elements =
                this.qsa(
                    ".impact-reveal"
                );


            if (!elements.length) {
                return;
            }


            if (
                this.reduced ||
                !(
                    "IntersectionObserver"
                    in window
                )
            ) {

                elements.forEach(
                    element =>
                        element.classList.add(
                            "visible"
                        )
                );

                return;
            }


            const observer =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold:.12,
                        rootMargin:
                            "0px 0px -7% 0px"
                    }
                );


            elements.forEach(
                element =>
                    observer.observe(
                        element
                    )
            );

        },


        /* ====================================================
           NETWORK
        ==================================================== */

        network() {

            const nodes =
                this.qsa(
                    ".impact-network-node"
                );


            const info =
                this.qs(
                    "#impactNetworkInfo"
                );


            if (
                !nodes.length ||
                !info
            ) {
                return;
            }


            nodes.forEach(
                node => {

                    const activate =
                        () => {

                            nodes.forEach(
                                current =>
                                    current.classList.remove(
                                        "active"
                                    )
                            );


                            node.classList.add(
                                "active"
                            );


                            const role =
                                node.dataset.role ||
                                "Role";


                            const description =
                                node.dataset.description ||
                                "";


                            info.innerHTML = `

                                <span>
                                    ACTIVE ECOSYSTEM ROLE
                                </span>

                                <strong>
                                    ${role}
                                </strong>

                                <p>
                                    ${description}
                                </p>

                            `;

                        };


                    node.addEventListener(
                        "mouseenter",
                        activate
                    );


                    node.addEventListener(
                        "focus",
                        activate
                    );


                    node.addEventListener(
                        "click",
                        activate
                    );

                }
            );

        },


        /* ====================================================
           SCALE SELECTOR
        ==================================================== */

        scaleSelector() {

            const buttons =
                this.qsa(
                    ".impact-scale-button"
                );


            const number =
                this.qs(
                    "#impactScaleNumber"
                );


            const description =
                this.qs(
                    "#impactScaleDescription"
                );


            if (
                !buttons.length ||
                !number
            ) {
                return;
            }


            const descriptions = {

                "1000":
                    "A small connected network.",

                "10000":
                    "A growing regional network.",

                "100000":
                    "A large agricultural participation scenario.",

                "1000000":
                    "A million-participant scale scenario.",

                "10000000":
                    "A one-crore participation scale scenario."

            };


            buttons.forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            buttons.forEach(
                                item =>
                                    item.classList.remove(
                                        "active"
                                    )
                            );


                            button.classList.add(
                                "active"
                            );


                            const value =
                                Number(
                                    button.dataset.scale
                                );


                            number.textContent =
                                value.toLocaleString(
                                    "en-IN"
                                );


                            if (
                                description
                            ) {

                                description.textContent =
                                    descriptions[
                                        String(value)
                                    ] ||
                                    "Illustrative participation scale.";

                            }

                        }
                    );

                }
            );

        },


        /* ====================================================
           TRANSACTION CALCULATOR
        ==================================================== */

        transactionCalculator() {

            const slider =
                this.qs(
                    "#impactTransactionSlider"
                );


            const count =
                this.qs(
                    "#impactTransactionCount"
                );


            const value =
                this.qs(
                    "#impactTransactionValue"
                );


            if (
                !slider ||
                !count ||
                !value
            ) {
                return;
            }


            const update =
                () => {

                    const transactions =
                        Number(
                            slider.value
                        );


                    const collection =
                        transactions;


                    count.textContent =
                        transactions.toLocaleString(
                            "en-IN"
                        );


                    value.textContent =
                        "₹" +
                        collection.toLocaleString(
                            "en-IN"
                        );

                };


            slider.addEventListener(
                "input",
                update
            );


            update();

        },


        /* ====================================================
           BACK TO TOP
        ==================================================== */

        backToTop() {

            const button =
                this.qs(
                    "#impactTop"
                );


            if (!button) {
                return;
            }


            const update =
                () => {

                    button.classList.toggle(
                        "show",
                        window.scrollY > 650
                    );

                };


            window.addEventListener(
                "scroll",
                update,
                {
                    passive:true
                }
            );


            button.addEventListener(
                "click",
                () => {

                    window.scrollTo({

                        top:0,

                        behavior:
                            this.reduced
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        },


        /* ====================================================
           PARALLAX
        ==================================================== */

        parallax() {

            if (this.reduced) {
                return;
            }


            const background =
                this.qs(
                    ".impact-background"
                );


            if (!background) {
                return;
            }


            let frame =
                0;


            window.addEventListener(
                "pointermove",
                event => {

                    if (frame) {
                        return;
                    }


                    frame =
                        requestAnimationFrame(
                            () => {

                                const x =
                                    (
                                        event.clientX /
                                        window.innerWidth
                                    ) - .5;


                                const y =
                                    (
                                        event.clientY /
                                        window.innerHeight
                                    ) - .5;


                                background.style.transform =
                                    `

                                    scale(1.035)

                                    translate(
                                        ${x * 7}px,
                                        ${y * 5}px
                                    )

                                    `;


                                frame =
                                    0;

                            }
                        );

                },
                {
                    passive:true
                }
            );

        },


        /* ====================================================
           ANCHORS
        ==================================================== */

        anchors() {

            this.qsa(
                'a[href^="#"]'
            ).forEach(
                anchor => {

                    anchor.addEventListener(
                        "click",
                        event => {

                            const selector =
                                anchor.getAttribute(
                                    "href"
                                );


                            const target =
                                this.qs(
                                    selector
                                );


                            if (!target) {
                                return;
                            }


                            event.preventDefault();


                            target.scrollIntoView({

                                behavior:
                                    this.reduced
                                        ? "auto"
                                        : "smooth"

                            });

                        }
                    );

                }
            );

        },


        /* ====================================================
           YEAR
        ==================================================== */

        year() {

            const year =
                this.qs(
                    "#impactYear"
                );


            if (year) {

                year.textContent =
                    new Date()
                        .getFullYear();

            }

        }

    };


    /* ========================================================
       START
    ======================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            () => Impact.init()
        );

    } else {

        Impact.init();

    }


    window.AgriVisionImpact =
        Impact;

})();
/* ============================================================
   AGRIVISION KARNATAKA
   RESEARCH MODULE
   APPEND TO EXISTING script.js

   Research-specific interaction layer.
   Safe, scoped and independent from existing modules.
============================================================ */

(function(){

    "use strict";


    /* ========================================================
       PAGE GUARD
    ======================================================== */

    const page =
        document.body?.classList.contains(
            "research-page"
        );

    if(!page){
        return;
    }


    /* ========================================================
       HELPERS
    ======================================================== */

    const $ = selector =>
        document.querySelector(selector);

    const $$ = selector =>
        Array.from(
            document.querySelectorAll(selector)
        );


    /* ========================================================
       YEAR
    ======================================================== */

    function initializeYear(){

        const year =
            $("#research-year");

        if(!year){
            return;
        }

        year.textContent =
            new Date().getFullYear();
    }


    /* ========================================================
       SCROLL PROGRESS
    ======================================================== */

    function initializeProgress(){

        const bar =
            $(".research-progress span");

        if(!bar){
            return;
        }

        const update = () => {

            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            if(documentHeight <= 0){

                bar.style.width = "0%";

                return;
            }

            const progress =
                (window.scrollY / documentHeight) * 100;

            bar.style.width =
                `${Math.min(100, Math.max(0, progress))}%`;
        };

        window.addEventListener(
            "scroll",
            update,
            {passive:true}
        );

        window.addEventListener(
            "resize",
            update
        );

        update();
    }


    /* ========================================================
       SMOOTH SECTION NAVIGATION
    ======================================================== */

    function initializeScrollButtons(){

        $$("[data-scroll-to]")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        const selector =
                            button.dataset.scrollTo;

                        const target =
                            document.querySelector(
                                selector
                            );

                        if(!target){
                            return;
                        }

                        target.scrollIntoView({
                            behavior:"smooth",
                            block:"start"
                        });

                    }
                );

            });
    }


    /* ========================================================
       REVEAL SYSTEM
    ======================================================== */

    function initializeReveal(){

        const sections =
            $$(".research-section");

        if(!sections.length){
            return;
        }

        sections.forEach(section => {

            const children =
                section.querySelectorAll(
                    ".research-section-heading > *, " +
                    ".research-story-main > *, " +
                    ".research-question-card, " +
                    ".research-human-step, " +
                    ".research-transform-step, " +
                    ".research-journey-stage, " +
                    ".research-future-layer, " +
                    ".research-difference-points > div"
                );

            children.forEach(
                (element,index) => {

                    element.classList.add(
                        "research-reveal"
                    );

                    element.style.transitionDelay =
                        `${Math.min(index * 70, 420)}ms`;
                }
            );

        });


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if(
                            !entry.isIntersecting
                        ){
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold:.12,
                    rootMargin:"0px 0px -8% 0px"
                }
            );


        $$(".research-reveal")
            .forEach(
                element =>
                    observer.observe(element)
            );
    }


    /* ========================================================
       ACTIVE NAVIGATION
    ======================================================== */

    function initializeNavigation(){

        const links =
            $$(".research-navigation a");

        if(!links.length){
            return;
        }

        const sections = [
            "research-start",
            "research-story",
            "research-observation",
            "research-questions",
            "research-system",
            "research-journey",
            "research-next"
        ]
        .map(id =>
            document.getElementById(id)
        )
        .filter(Boolean);


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if(!entry.isIntersecting){
                            return;
                        }

                        const id =
                            entry.target.id;

                        links.forEach(link => {

                            const href =
                                link.getAttribute("href");

                            const isCurrent =
                                href ===
                                `#${id}`;

                            link.classList.toggle(
                                "active",
                                isCurrent
                            );

                        });

                    });

                },
                {
                    threshold:.35
                }
            );


        sections.forEach(
            section =>
                observer.observe(section)
        );
    }


    /* ========================================================
       TOP BUTTON
    ======================================================== */

    function initializeTopButton(){

        const button =
            $(".research-top");

        if(!button){
            return;
        }


        const update =
            () => {

                button.classList.toggle(
                    "visible",
                    window.scrollY > 700
                );
            };


        window.addEventListener(
            "scroll",
            update,
            {passive:true}
        );


        button.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                });

            }
        );


        update();
    }


    /* ========================================================
       SUBTLE POINTER LIGHT
    ======================================================== */

    function initializePointerLight(){

        if(
            window.matchMedia(
                "(pointer:coarse)"
            ).matches
        ){
            return;
        }


        const light =
            document.createElement("div");

        light.className =
            "research-pointer-light";

        document.body.appendChild(light);


        const style =
            document.createElement("style");

        style.textContent = `

            .research-pointer-light{

                position:fixed;

                width:240px;
                height:240px;

                left:0;
                top:0;

                border-radius:50%;

                pointer-events:none;

                z-index:1;

                transform:
                    translate(-50%,-50%);

                background:
                    radial-gradient(
                        circle,
                        rgba(214,180,90,.07),
                        rgba(24,183,160,.035) 28%,
                        transparent 70%
                    );

                filter:blur(4px);

                mix-blend-mode:screen;

                opacity:.65;

                transition:
                    opacity .3s ease;
            }

        `;

        document.head.appendChild(style);


        let x = -300;
        let y = -300;

        let targetX = x;
        let targetY = y;


        window.addEventListener(
            "pointermove",
            event => {

                targetX =
                    event.clientX;

                targetY =
                    event.clientY;

            },
            {passive:true}
        );


        function animate(){

            x +=
                (targetX - x) * .12;

            y +=
                (targetY - y) * .12;

            light.style.left =
                `${x}px`;

            light.style.top =
                `${y}px`;

            requestAnimationFrame(
                animate
            );
        }


        animate();
    }


    /* ========================================================
       RESEARCH SYSTEM NODE INTERACTION
    ======================================================== */

    function initializeRoleNodes(){

        const roles =
            $$(".research-role");

        if(!roles.length){
            return;
        }


        roles.forEach(role => {

            role.addEventListener(
                "mouseenter",
                () => {

                    roles.forEach(
                        item =>
                            item.classList.remove(
                                "research-role-focus"
                            )
                    );

                    role.classList.add(
                        "research-role-focus"
                    );

                }
            );


            role.addEventListener(
                "mouseleave",
                () => {

                    role.classList.remove(
                        "research-role-focus"
                    );

                }
            );

        });


        const style =
            document.createElement("style");

        style.textContent = `

            .research-page
            .research-role-focus{

                box-shadow:
                    0 0 28px
                    rgba(245,215,122,.14),
                    inset 0 0 18px
                    rgba(214,180,90,.04);

            }

        `;

        document.head.appendChild(style);
    }


    /* ========================================================
       ITERATION ORBIT
    ======================================================== */

    function initializeIteration(){

        const layout =
            $(".research-iteration-layout");

        if(!layout){
            return;
        }


        const center =
            $(".research-iteration-center");

        const items =
            $$(".research-iteration-item");


        layout.addEventListener(
            "pointermove",
            event => {

                if(
                    window.matchMedia(
                        "(pointer:coarse)"
                    ).matches
                ){
                    return;
                }

                const rect =
                    layout.getBoundingClientRect();

                const x =
                    (
                        event.clientX -
                        rect.left -
                        rect.width / 2
                    ) /
                    rect.width;

                const y =
                    (
                        event.clientY -
                        rect.top -
                        rect.height / 2
                    ) /
                    rect.height;


                if(center){

                    center.style.transform =
                        `translate(
                            calc(-50% + ${x * 8}px),
                            calc(-50% + ${y * 8}px)
                        )`;
                }


                items.forEach(
                    (item,index) => {

                        const multiplier =
                            (index + 1) * 4;

                        item.style.marginLeft =
                            `${x * multiplier}px`;

                        item.style.marginTop =
                            `${y * multiplier}px`;

                    }
                );

            }
        );


        layout.addEventListener(
            "pointerleave",
            () => {

                if(center){

                    center.style.transform =
                        "translate(-50%,-50%)";
                }

                items.forEach(
                    item => {

                        item.style.marginLeft =
                            "0";

                        item.style.marginTop =
                            "0";

                    }
                );

            }
        );
    }


    /* ========================================================
       PARALLAX ORBITS
    ======================================================== */

    function initializeParallax(){

        if(
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ){
            return;
        }


        const openingOrbit =
            $(".research-opening-orbit");

        const finalOrbit =
            $(".research-final-orbit");


        if(
            !openingOrbit &&
            !finalOrbit
        ){
            return;
        }


        let ticking = false;


        function update(){

            const scroll =
                window.scrollY;


            if(openingOrbit){

                openingOrbit.style.transform =
                    `translate(
                        -50%,
                        calc(-50% + ${scroll * .035}px)
                    )`;
            }


            if(finalOrbit){

                finalOrbit.style.transform =
                    `translate(
                        -50%,
                        calc(-50% + ${scroll * -.018}px)
                    )`;
            }


            ticking = false;
        }


        window.addEventListener(
            "scroll",
            () => {

                if(!ticking){

                    requestAnimationFrame(
                        update
                    );

                    ticking = true;
                }

            },
            {passive:true}
        );
    }


    /* ========================================================
       GOLD BORDER SHIMMER
    ======================================================== */

    function initializeBorderShimmer(){

        const targets = [
            ".research-question-card",
            ".research-future-layer",
            ".research-human-step",
            ".research-transform-step"
        ];


        targets.forEach(selector => {

            $$(selector)
                .forEach(element => {

                    element.addEventListener(
                        "mouseenter",
                        () => {

                            element.style.boxShadow =
                                "0 0 35px rgba(214,180,90,.08)";

                        }
                    );


                    element.addEventListener(
                        "mouseleave",
                        () => {

                            element.style.boxShadow =
                                "";

                        }
                    );

                });

        });
    }


    /* ========================================================
       INITIALIZE
    ======================================================== */

    function initialize(){

        initializeYear();

        initializeProgress();

        initializeScrollButtons();

        initializeReveal();

        initializeNavigation();

        initializeTopButton();

        initializePointerLight();

        initializeRoleNodes();

        initializeIteration();

        initializeParallax();

        initializeBorderShimmer();

    }


    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            {once:true}
        );

    }else{

        initialize();

    }


})();
/* ============================================================
   AGRIVISION SUSTAINABILITY — PREMIUM INTERACTION LAYER
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const sustainabilityPage =
        document.querySelector(
            ".sustainability-page"
        );

    if (!sustainabilityPage) {
        return;
    }


    /* ========================================================
       1. MOUSE ATMOSPHERE
       ======================================================== */

    let mouseX = 50;
    let mouseY = 50;

    let mouseFrame = null;


    document.addEventListener(
        "pointermove",
        event => {

            mouseX =
                (event.clientX /
                    window.innerWidth) *
                100;

            mouseY =
                (event.clientY /
                    window.innerHeight) *
                100;


            if (mouseFrame) {
                return;
            }


            mouseFrame =
                requestAnimationFrame(() => {

                    sustainabilityPage.style
                        .setProperty(
                            "--mouse-x",
                            `${mouseX}%`
                        );

                    sustainabilityPage.style
                        .setProperty(
                            "--mouse-y",
                            `${mouseY}%`
                        );

                    mouseFrame = null;

                });

        },
        {
            passive: true
        }
    );


    /* ========================================================
       2. CARD POINTER GLOW
       ======================================================== */

    const interactiveCards =
        sustainabilityPage.querySelectorAll(
            `
            .sus-conservation-card,
            .sus-practice,
            .sus-data-box,
            .sus-data-stage,
            .sus-dimension,
            .sus-status,
            .sus-soil-layer,
            .sus-residue-step,
            .sus-architecture-node
            `
        );


    interactiveCards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                card.style.setProperty(
                    "--pointer-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--pointer-y",
                    `${y}px`
                );


                card.style.background =
                    `
                    radial-gradient(
                        circle at
                        ${x}px ${y}px,
                        rgba(105,255,209,.055),
                        transparent 32%
                    ),
                    ${card.classList.contains(
                        "sus-conservation-card"
                    )
                        ? "linear-gradient(145deg,rgba(7,39,31,.72),rgba(3,24,19,.7))"
                        : "rgba(5,29,24,.68)"
                    }
                    `;

            },
            {
                passive: true
            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.background = "";

            }
        );

    });


    /* ========================================================
       3. PARALLAX FOR HERO ORBIT
       ======================================================== */

    const heroOrbit =
        sustainabilityPage.querySelector(
            ".sus-hero-orbit"
        );


    if (heroOrbit) {

        document.addEventListener(
            "pointermove",
            event => {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const centerX =
                    window.innerWidth / 2;

                const centerY =
                    window.innerHeight / 2;


                const moveX =
                    (event.clientX - centerX)
                    / centerX;


                const moveY =
                    (event.clientY - centerY)
                    / centerY;


                heroOrbit.style.transform =
                    `
                    translate3d(
                        ${moveX * 10}px,
                        ${moveY * 10}px,
                        0
                    )
                    `;

            },
            {
                passive: true
            }
        );

    }


    /* ========================================================
       4. ACTIVE JOURNEY STEP
       ======================================================== */

    const journey =
        sustainabilityPage.querySelector(
            ".sus-journey"
        );


    if (journey) {

        const steps =
            journey.querySelectorAll(
                ".sus-journey-step"
            );


        steps.forEach(
            (step, index) => {

                step.addEventListener(
                    "mouseenter",
                    () => {

                        steps.forEach(
                            item =>
                                item.classList.remove(
                                    "journey-active"
                                )
                        );


                        step.classList.add(
                            "journey-active"
                        );

                    }
                );

            }
        );

    }


    /* ========================================================
       5. COUNTER HIGHLIGHT
       ======================================================== */

    const dataNumbers =
        sustainabilityPage.querySelectorAll(
            ".sus-energy-number, .sus-section-number"
        );


    const numberObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.animate(
                            [
                                {
                                    opacity: .2,
                                    transform:
                                        "translateY(12px)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "translateY(0)"
                                }
                            ],
                            {
                                duration: 850,
                                easing:
                                    "cubic-bezier(.2,.8,.2,1)",
                                fill: "both"
                            }
                        );


                        numberObserver.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: .3
            }
        );


    dataNumbers.forEach(
        number =>
            numberObserver.observe(number)
    );


    /* ========================================================
       6. SCROLL PROGRESS
       ======================================================== */

    const progressBar =
        document.createElement("div");


    progressBar.className =
        "sus-scroll-progress";


    progressBar.innerHTML =
        `
        <span></span>
        `;


    sustainabilityPage.appendChild(
        progressBar
    );


    const progressFill =
        progressBar.querySelector(
            "span"
        );


    function updateScrollProgress() {

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {
            return;
        }


        const progress =
            Math.min(
                Math.max(
                    window.scrollY /
                    documentHeight,
                    0
                ),
                1
            );


        progressFill.style.transform =
            `scaleX(${progress})`;

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );


    updateScrollProgress();


    /* ========================================================
       7. SECTION COLOR STATE
       ======================================================== */

    const sections =
        sustainabilityPage.querySelectorAll(
            ".sus-section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            sustainabilityPage
                                .dataset.activeSection =
                                entry.target.id;

                        }

                    }
                );

            },
            {
                threshold: .45
            }
        );


    sections.forEach(
        section =>
            sectionObserver.observe(section)
    );


    /* ========================================================
       8. MOBILE TOUCH FEEDBACK
       ======================================================== */

    interactiveCards.forEach(
        card => {

            card.addEventListener(
                "touchstart",
                () => {

                    card.classList.add(
                        "sus-touch-active"
                    );

                },
                {
                    passive: true
                }
            );


            card.addEventListener(
                "touchend",
                () => {

                    setTimeout(
                        () => {

                            card.classList.remove(
                                "sus-touch-active"
                            );

                        },
                        180
                    );

                },
                {
                    passive: true
                }
            );

        }
    );

});