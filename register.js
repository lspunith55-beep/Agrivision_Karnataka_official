/* ============================================================
   AGRIVISION KARNATAKA
   REGISTRATION ENGINE
   ============================================================ */

"use strict";


/* ============================================================
   CONFIG
   ============================================================ */

const REGISTER_STORAGE =
    "AgriVisionAccounts";

const ACTIVE_USER_STORAGE =
    "AgriVisionCurrentUser";


/* ============================================================
   DOM HELPERS
   ============================================================ */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    [...document.querySelectorAll(selector)];


/* ============================================================
   STATE
   ============================================================ */

let currentStep = 1;

const totalSteps = 6;


/* ============================================================
   STEP TITLES
   ============================================================ */

const stepTitles = {

    1: "Account & Role",
    2: "Personal Information",
    3: "Ecosystem Information",
    4: "Role Information",
    5: "Preferences & Security",
    6: "Review & Create"

};


/* ============================================================
   SAFE STORAGE
   ============================================================ */

function getAccounts(){

    try{

        const raw =
            localStorage.getItem(
                REGISTER_STORAGE
            );

        if(!raw){

            return [];

        }

        const accounts =
            JSON.parse(raw);

        return Array.isArray(accounts)
            ? accounts
            : [];

    }catch(error){

        console.error(
            "Unable to read accounts:",
            error
        );

        return [];

    }

}


function saveAccounts(accounts){

    localStorage.setItem(
        REGISTER_STORAGE,
        JSON.stringify(accounts)
    );

}


/* ============================================================
   UNIQUE ID
   ============================================================ */

function generateAgriVisionID(role){

    const prefixes = {

        "Farmer":
            "FAR",

        "Buyer":
            "BUY",

        "Logistics":
            "LOG",

        "Labour":
            "LAB",

        "Equipment Owner":
            "EQU",

        "Machine Operator":
            "OPR"

    };


    const prefix =
        prefixes[role] ||
        "USR";


    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


    let code = "";


    for(
        let i = 0;
        i < 8;
        i++
    ){

        code +=
            characters[
                Math.floor(
                    Math.random()
                    * characters.length
                )
            ];

    }


    return `AGV-${prefix}-${code}`;

}


/* ============================================================
   GUARANTEE UNIQUE ID
   ============================================================ */

function createUniqueID(role){

    const accounts =
        getAccounts();


    let id;


    do{

        id =
            generateAgriVisionID(
                role
            );

    }while(
        accounts.some(
            account =>
                account.agrivisionId === id
        )
    );


    return id;

}


/* ============================================================
   FORM DATA
   ============================================================ */

function getFormData(){

    const form =
        $("#registrationForm");

    const formData =
        new FormData(form);

    const data = {};


    formData.forEach(
        (value,key) => {

            if(
                key === "roles"
            ){

                return;

            }

            data[key] =
                String(value).trim();

        }
    );


    data.roles =
        $$(
            'input[name="roles"]:checked'
        )
        .map(
            input =>
                input.value
        );


    return data;

}


/* ============================================================
   ESCAPE HTML
   ============================================================ */

function escapeHTML(value){

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


/* ============================================================
   TOAST
   ============================================================ */

let toastTimer;


function showToast(
    title,
    message,
    type = "normal"
){

    const toast =
        $("#registerToast");

    $("#toastTitle")
        .textContent =
        title;

    $("#toastMessage")
        .textContent =
        message;


    toast.classList.remove(
        "show",
        "error"
    );


    if(
        type === "error"
    ){

        toast.classList.add(
            "error"
        );

    }


    requestAnimationFrame(
        () => {

            toast.classList.add(
                "show"
            );

        }
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            4000
        );

}


/* ============================================================
   FIELD ERROR
   ============================================================ */

function markInvalid(field){

    const wrapper =
        field.closest(".field");


    if(wrapper){

        wrapper.classList.add(
            "invalid"
        );

    }


    field.addEventListener(
        "input",
        () => {

            if(
                field.value.trim()
            ){

                wrapper?.classList.remove(
                    "invalid"
                );

            }

        },
        {
            once:true
        }
    );

}


/* ============================================================
   STEP VALIDATION
   ============================================================ */

function validateStep(step){

    const section =
        document.querySelector(
            `.form-step[data-step="${step}"]`
        );


    if(!section){

        return true;

    }


    let valid = true;


    const requiredFields =
        $$(
            "input[required], select[required], textarea[required]",
        ).filter(
            field =>
                section.contains(field)
        );


    requiredFields.forEach(
        field => {

            const value =
                field.value.trim();


            if(!value){

                valid = false;

                markInvalid(
                    field
                );

            }

        }
    );


    /* ROLE VALIDATION */

    if(step === 1){

        const roles =
            $$(
                'input[name="roles"]:checked'
            );


        if(!roles.length){

            valid = false;

            showToast(
                "Select a role",
                "Choose at least one role to continue.",
                "error"
            );

            return false;

        }

    }


    /* EMAIL */

    if(
        step === 1
    ){

        const email =
            $("#email");


        if(
            email.value &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(
                    email.value
                )
        ){

            valid = false;

            markInvalid(
                email
            );

            showToast(
                "Check your email",
                "Enter a valid email address.",
                "error"
            );

            return false;

        }

    }


    /* PASSWORD */

    if(
        step === 1
    ){

        const password =
            $("#password");

        const confirm =
            $("#confirmPassword");


        if(
            password.value.length < 8
        ){

            valid = false;

            markInvalid(
                password
            );

            showToast(
                "Password too short",
                "Your password must contain at least 8 characters.",
                "error"
            );

            return false;

        }


        if(
            password.value !==
            confirm.value
        ){

            valid = false;

            markInvalid(
                confirm
            );

            showToast(
                "Passwords do not match",
                "Please enter the same password in both fields.",
                "error"
            );

            return false;

        }

    }


    /* TERMS */

    if(
        step === 5
    ){

        const terms =
            $("#terms");


        if(
            !terms.checked
        ){

            valid = false;

            showToast(
                "Confirmation required",
                "Please confirm the account information before continuing.",
                "error"
            );

            return false;

        }

    }


    if(!valid){

        showToast(
            "Information required",
            "Please complete the highlighted fields before continuing.",
            "error"
        );

        return false;

    }


    return true;

}


/* ============================================================
   ROLE SPECIFIC DISPLAY
   ============================================================ */

function updateRoleSections(){

    const roles =
        $$(
            'input[name="roles"]:checked'
        )
        .map(
            input =>
                input.value
        );


    $$(".role-specific")
        .forEach(
            section => {

                const role =
                    section.dataset.roleSection;


                section.classList.toggle(
                    "visible",
                    roles.includes(role)
                );

            }
        );

}


/* ============================================================
   UPDATE PROGRESS
   ============================================================ */

function updateProgress(){

    const percentage =
        (
            currentStep /
            totalSteps
        ) * 100;


    $("#progressBar")
        .style.width =
        `${percentage}%`;


    $("#stepTitle")
        .textContent =
        stepTitles[currentStep];


    $("#stepCount")
        .textContent =
        `${currentStep} / ${totalSteps}`;


    $$(".step-indicator")
        .forEach(
            indicator => {

                const number =
                    Number(
                        indicator.dataset.indicator
                    );


                indicator.classList.toggle(
                    "active",
                    number === currentStep
                );


                indicator.classList.toggle(
                    "completed",
                    number < currentStep
                );

            }
        );


    $("#backButton")
        .style.visibility =
        currentStep === 1
            ? "hidden"
            : "visible";


    $("#nextButton")
        .style.display =
        currentStep === totalSteps
            ? "none"
            : "inline-flex";


    $("#createButton")
        .style.display =
        currentStep === totalSteps
            ? "inline-flex"
            : "none";


    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


/* ============================================================
   SHOW STEP
   ============================================================ */

function showStep(step){

    currentStep =
        Math.max(
            1,
            Math.min(
                totalSteps,
                step
            )
        );


    $$(".form-step")
        .forEach(
            section => {

                section.classList.toggle(
                    "active",
                    Number(
                        section.dataset.step
                    ) === currentStep
                );

            }
        );


    updateProgress();


    if(
        currentStep === 4
    ){

        updateRoleSections();

    }


    if(
        currentStep === 6
    ){

        buildReview();

    }

}


/* ============================================================
   PASSWORD VISIBILITY
   ============================================================ */

function setupPasswordToggles(){

    $$(
        "[data-password-target]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.passwordTarget;

                    const input =
                        document.getElementById(
                            id
                        );


                    if(!input){

                        return;

                    }


                    const visible =
                        input.type === "text";


                    input.type =
                        visible
                            ? "password"
                            : "text";


                    button.textContent =
                        visible
                            ? "SHOW"
                            : "HIDE";

                }
            );

        }
    );

}


/* ============================================================
   PASSWORD STRENGTH
   ============================================================ */

function setupPasswordStrength(){

    const password =
        $("#password");

    const meter =
        $("#passwordStrength");

    const hint =
        $("#passwordHint");


    password.addEventListener(
        "input",
        () => {

            const value =
                password.value;


            let score = 0;


            if(
                value.length >= 8
            ){

                score++;

            }


            if(
                /[A-Z]/.test(value)
            ){

                score++;

            }


            if(
                /[0-9]/.test(value)
            ){

                score++;

            }


            if(
                /[^A-Za-z0-9]/.test(value)
            ){

                score++;

            }


            meter.className =
                "password-strength";


            if(!value){

                hint.textContent =
                    "Use at least 8 characters.";

                return;

            }


            if(score === 1){

                meter.classList.add(
                    "weak"
                );

                hint.textContent =
                    "Weak password.";

            }else if(score === 2){

                meter.classList.add(
                    "medium"
                );

                hint.textContent =
                    "Moderate password.";

            }else if(score === 3){

                meter.classList.add(
                    "good"
                );

                hint.textContent =
                    "Good password.";

            }else{

                meter.classList.add(
                    "strong"
                );

                hint.textContent =
                    "Strong password.";

            }

        }
    );

}


/* ============================================================
   REVIEW
   ============================================================ */

function buildReview(){

    const data =
        getFormData();


    const review =
        $("#reviewGrid");


    const rows = [

        [
            "FULL NAME",
            data.fullName
        ],

        [
            "EMAIL",
            data.email
        ],

        [
            "PHONE",
            data.phone
        ],

        [
            "ROLE(S)",
            data.roles.join(
                " · "
            )
        ],

        [
            "LOCATION",
            [
                data.village,
                data.taluk,
                data.district,
                data.state
            ]
            .filter(Boolean)
            .join(
                ", "
            )
        ],

        [
            "LANGUAGE",
            data.language
        ],

        [
            "EXPERIENCE",
            data.experience ||
            "Not specified"
        ],

        [
            "FARM / BUSINESS",
            data.farmName ||
            data.buyerBusiness ||
            data.logisticsName ||
            data.equipmentBusiness ||
            "Not specified"
        ],

        [
            "MAIN CROPS / PRODUCTS",
            data.mainCrops ||
            data.buyerProducts ||
            "Not specified"
        ],

        [
            "PREFERENCES",
            data.notifications ||
            "Default"
        ]

    ];


    review.innerHTML =
        rows
        .map(
            ([label,value]) => `

                <div class="review-item">

                    <span>
                        ${escapeHTML(label)}
                    </span>

                    <strong>
                        ${escapeHTML(
                            value ||
                            "Not specified"
                        )}
                    </strong>

                </div>

            `
        )
        .join("");

}


/* ============================================================
   ACCOUNT CREATION
   ============================================================ */

function createAccount(){

    const data =
        getFormData();


    const accounts =
        getAccounts();


    /* Check email */

    const emailExists =
        accounts.some(
            account =>
                account.email.toLowerCase() ===
                data.email.toLowerCase()
        );


    if(emailExists){

        showToast(
            "Account already exists",
            "An account with this email already exists.",
            "error"
        );

        showStep(1);

        return;

    }


    const primaryRole =
        data.roles[0] ||
        "User";


    const agrivisionId =
        createUniqueID(
            primaryRole
        );


    const account = {

        agrivisionId,

        name:
            data.fullName,

        email:
            data.email,

        phone:
            data.phone,

        password:
            data.password,

        roles:
            data.roles,

        profile:{

            dateOfBirth:
                data.dateOfBirth || "",

            gender:
                data.gender || "",

            address:
                data.address || "",

            state:
                data.state || "",

            district:
                data.district || "",

            taluk:
                data.taluk || "",

            village:
                data.village || "",

            language:
                data.language || "",

            communication:
                data.communication || "",

            about:
                data.about || "",

            experience:
                data.experience || "",

            contactTime:
                data.contactTime || ""

        },

        roleInformation:{

            farmer:{

                farmName:
                    data.farmName || "",

                farmArea:
                    data.farmArea || "",

                farmAreaUnit:
                    data.farmAreaUnit || "",

                farmingType:
                    data.farmingType || "",

                mainCrops:
                    data.mainCrops || ""

            },

            buyer:{

                business:
                    data.buyerBusiness || "",

                buyerType:
                    data.buyerType || "",

                products:
                    data.buyerProducts || ""

            },

            logistics:{

                name:
                    data.logisticsName || "",

                area:
                    data.logisticsArea || "",

                fleetSize:
                    data.fleetSize || "",

                vehicleTypes:
                    data.vehicleTypes || ""

            },

            labour:{

                workType:
                    data.labourWorkType || "",

                experience:
                    data.labourExperience || "",

                area:
                    data.labourArea || ""

            },

            equipment:{

                business:
                    data.equipmentBusiness || "",

                types:
                    data.equipmentTypes || "",

                area:
                    data.equipmentArea || ""

            },

            operator:{

                machines:
                    data.operatorMachines || "",

                experience:
                    data.operatorExperience || "",

                area:
                    data.operatorArea || ""

            }

        },

        preferences:{

            notifications:
                data.notifications || "All",

            dashboardDensity:
                data.dashboardDensity ||
                "Comfortable"

        },

        createdAt:
            new Date().toISOString(),

        accountStatus:
            "ACTIVE"

    };


    accounts.push(
        account
    );


    saveAccounts(
        accounts
    );


    localStorage.setItem(
        ACTIVE_USER_STORAGE,
        JSON.stringify({
            agrivisionId:
                account.agrivisionId,

            roles:
                account.roles
        })
    );


    showSuccess(
        account
    );

}


/* ============================================================
   SUCCESS SCREEN
   ============================================================ */

function showSuccess(account){

    $("#generatedId")
        .textContent =
        account.agrivisionId;


    $("#successName")
        .textContent =
        account.name;


    $("#successRoles")
        .textContent =
        account.roles.join(
            " · "
        );


    const overlay =
        $("#successOverlay");


    overlay
        .setAttribute(
            "aria-hidden",
            "false"
        );


    overlay.classList.add(
        "show"
    );


    createCelebration();

}


/* ============================================================
   COPY ID
   ============================================================ */

function setupCopyButton(){

    $("#copyIdButton")
        .addEventListener(
            "click",
            async () => {

                const id =
                    $("#generatedId")
                    .textContent;


                try{

                    await navigator.clipboard.writeText(
                        id
                    );


                    $("#copyIdButton")
                        .classList.add(
                            "copied"
                        );


                    $("#copyIdButton")
                        .innerHTML =
                        "✓ COPIED";


                    setTimeout(
                        () => {

                            $("#copyIdButton")
                                .classList.remove(
                                    "copied"
                                );

                            $("#copyIdButton")
                                .innerHTML =
                                "<span>▣</span> COPY ID";

                        },
                        2200
                    );


                }catch(error){

                    showToast(
                        "Copy unavailable",
                        "Please manually copy your AgriVision ID.",
                        "error"
                    );

                }

            }
        );

}


/* ============================================================
   CELEBRATION PARTICLES
   ============================================================ */

function createCelebration(){

    const container =
        $("#successParticles");


    container.innerHTML = "";


    const colors = [

        "#16f39a",
        "#00eaff",
        "#48a9ff",
        "#ad8cff",
        "#ff6fb5",
        "#ffd85c",
        "#ffffff"

    ];


    for(
        let i = 0;
        i < 110;
        i++
    ){

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "success-particle";


        particle.style.background =
            colors[
                Math.floor(
                    Math.random()
                    * colors.length
                )
            ];


        particle.style.color =
            particle.style.background;


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const distance =
            140
            +
            Math.random()
            * 480;


        particle.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );


        particle.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );


        particle.style.setProperty(
            "--rotation",
            `${Math.random() * 1000 - 500}deg`
        );


        particle.style.width =
            `${3 + Math.random() * 6}px`;


        particle.style.height =
            particle.style.width;


        container.appendChild(
            particle
        );

    }

}


/* ============================================================
   LEAVES
   ============================================================ */

function createLeaf(){

    const container =
        $("#leaves");


    const leaf =
        document.createElement(
            "span"
        );


    leaf.className =
        "floating-leaf";


    const characters = [

        "🍃",
        "🌿",
        "🍂",
        "🌱"

    ];


    leaf.textContent =
        characters[
            Math.floor(
                Math.random()
                * characters.length
            )
        ];


    leaf.style.left =
        `${Math.random() * 100}%`;


    leaf.style.fontSize =
        `${14 + Math.random() * 18}px`;


    const duration =
        9 +
        Math.random() * 9;


    leaf.style.animationDuration =
        `${duration}s`;


    container.appendChild(
        leaf
    );


    setTimeout(
        () => {

            leaf.remove();

        },
        duration * 1000 + 500
    );

}


/* ============================================================
   FIREFLIES
   ============================================================ */

function createFireflies(){

    const container =
        $("#fireflies");


    for(
        let i = 0;
        i < 35;
        i++
    ){

        const firefly =
            document.createElement(
                "span"
            );


        firefly.className =
            "firefly";


        firefly.style.left =
            `${Math.random() * 100}%`;


        firefly.style.top =
            `${Math.random() * 100}%`;


        const size =
            2 +
            Math.random() * 4;


        firefly.style.width =
            `${size}px`;

        firefly.style.height =
            `${size}px`;


        firefly.style.animationDuration =
            `${2 + Math.random() * 5}s`;


        firefly.style.animationDelay =
            `${Math.random() * 5}s`;


        container.appendChild(
            firefly
        );

    }

}


/* ============================================================
   MOUSE GLOW
   ============================================================ */

function setupMouseGlow(){

    let frame = false;


    window.addEventListener(
        "mousemove",
        event => {

            if(frame){

                return;

            }


            frame = true;


            requestAnimationFrame(
                () => {

                    document.documentElement
                        .style
                        .setProperty(
                            "--mouse-x",
                            `${event.clientX}px`
                        );


                    document.documentElement
                        .style
                        .setProperty(
                            "--mouse-y",
                            `${event.clientY}px`
                        );


                    frame = false;

                }
            );

        },
        {
            passive:true
        }
    );

}


/* ============================================================
   ROLE LISTENERS
   ============================================================ */

function setupRoles(){

    $$(
        'input[name="roles"]'
    )
    .forEach(
        checkbox => {

            checkbox.addEventListener(
                "change",
                () => {

                    updateRoleSections();

                }
            );

        }
    );

}


/* ============================================================
   NAVIGATION
   ============================================================ */

function setupNavigation(){

    $("#nextButton")
        .addEventListener(
            "click",
            () => {

                if(
                    !validateStep(
                        currentStep
                    )
                ){

                    return;

                }


                showStep(
                    currentStep + 1
                );

            }
        );


    $("#backButton")
        .addEventListener(
            "click",
            () => {

                showStep(
                    currentStep - 1
                );

            }
        );

}


/* ============================================================
   SUBMIT
   ============================================================ */

function setupSubmit(){

    $("#registrationForm")
        .addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if(
                    currentStep !==
                    totalSteps
                ){

                    return;

                }


                if(
                    !validateStep(
                        5
                    )
                ){

                    showStep(5);

                    return;

                }


                createAccount();

            }
        );

}


/* ============================================================
   INITIALIZE
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupNavigation();

        setupSubmit();

        setupRoles();

        setupPasswordToggles();

        setupPasswordStrength();

        setupCopyButton();

        setupMouseGlow();

        createFireflies();

        setInterval(
            createLeaf,
            1500
        );


        for(
            let i = 0;
            i < 5;
            i++
        ){

            setTimeout(
                createLeaf,
                i * 450
            );

        }


        showStep(1);

    }
);