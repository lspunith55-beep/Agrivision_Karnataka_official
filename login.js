"use strict";


/* ============================================================
   STORAGE
   ============================================================ */

const ACCOUNTS_STORAGE =
    "AgriVisionAccounts";

const CURRENT_USER_STORAGE =
    "AgriVisionCurrentUser";


/* ============================================================
   HELPERS
   ============================================================ */

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    [...document.querySelectorAll(selector)];


/* ============================================================
   ROLE INFORMATION
   ============================================================ */

const ROLE_CONFIG = {

    "Farmer": {

        icon: "🌾",

        description:
            "Farming, crops, produce and agricultural activity."

    },


    "Buyer": {

        icon: "🛒",

        description:
            "Procurement, produce discovery and purchases."

    },


    "Logistics": {

        icon: "🚚",

        description:
            "Transportation, shipment and delivery operations."

    },


    "Labour": {

        icon: "👷",

        description:
            "Agricultural labour and work opportunities."

    },


    "Equipment Owner": {

        icon: "🚜",

        description:
            "Agricultural equipment and machinery services."

    },


    "Machine Operator": {

        icon: "⚙️",

        description:
            "Machine operation and field assignments."

    }

};


/* ============================================================
   STATE
   ============================================================ */

let authenticatedAccount = null;

let toastTimer = null;


/* ============================================================
   GET ACCOUNTS
   ============================================================ */

function getAccounts(){

    try{

        const raw =
            localStorage.getItem(
                ACCOUNTS_STORAGE
            );


        if(!raw){

            return [];

        }


        const accounts =
            JSON.parse(raw);


        return Array.isArray(accounts)
            ? accounts
            : [];

    }
    catch(error){

        console.error(
            "AgriVision account loading error:",
            error
        );

        return [];

    }

}


/* ============================================================
   NORMALIZE ID
   ============================================================ */

function normalizeID(
    value
){

    return String(
        value || ""
    )
    .trim()
    .toUpperCase()
    .replace(
        /\s+/g,
        ""
    );

}


/* ============================================================
   SAVE SESSION
   ============================================================ */

function saveCurrentUser(
    account,
    activeRole
){

    const session = {

        agrivisionId:
            account.agrivisionId,

        name:
            account.name || "",

        email:
            account.email || "",

        phone:
            account.phone || "",

        roles:
            Array.isArray(account.roles)
                ? account.roles
                : [],

        activeRole:
            activeRole || null,

        loginTime:
            new Date().toISOString()

    };


    localStorage.setItem(
        CURRENT_USER_STORAGE,
        JSON.stringify(
            session
        )
    );

}


/* ============================================================
   TOAST
   ============================================================ */

function showToast(
    title,
    message,
    type = "normal"
){

    const toast =
        $("#loginToast");


    if(!toast){

        return;

    }


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
            4200
        );

}


/* ============================================================
   VALIDATION
   ============================================================ */

function validateLogin(){

    const id =
        $("#agrivisionId");

    const password =
        $("#loginPassword");


    if(
        !id.value.trim()
    ){

        showToast(
            "AgriVision ID required",
            "Enter the unique ID generated during registration.",
            "error"
        );

        id.focus();

        return false;

    }


    if(
        !password.value
    ){

        showToast(
            "Password required",
            "Enter your account password.",
            "error"
        );

        password.focus();

        return false;

    }


    return true;

}


/* ============================================================
   AUTHENTICATION
   ============================================================ */

function authenticate(){

    const id =
        normalizeID(
            $("#agrivisionId").value
        );


    const password =
        $("#loginPassword").value;


    const accounts =
        getAccounts();


    const account =
        accounts.find(
            item =>
                normalizeID(
                    item.agrivisionId
                ) === id
        );


    if(!account){

        showToast(
            "Account not found",
            "No AgriVision account with this ID was found on this device.",
            "error"
        );

        return;

    }


    if(
        account.password !==
        password
    ){

        showToast(
            "Incorrect password",
            "The password entered does not match your account.",
            "error"
        );

        return;

    }


    if(
        account.accountStatus &&
        account.accountStatus !==
        "ACTIVE"
    ){

        showToast(
            "Account unavailable",
            "This AgriVision account is not currently active.",
            "error"
        );

        return;

    }


    authenticatedAccount =
        account;


    const roles =
        Array.isArray(
            account.roles
        )
        ? account.roles
        : [];


    if(
        !roles.length
    ){

        /*
         * Even if older registration data does not
         * contain roles, dashboard.html can still open.
         */

        saveCurrentUser(
            account,
            null
        );

        redirectToDashboard();

        return;

    }


    /*
     * ONE ROLE
     * --------------------------------------------------------
     * Go directly to the central dashboard.
     */

    if(
        roles.length === 1
    ){

        saveCurrentUser(
            account,
            roles[0]
        );

        redirectToDashboard();

        return;

    }


    /*
     * MULTIPLE ROLES
     * --------------------------------------------------------
     * Let the user select the currently active role.
     * The destination is STILL dashboard.html.
     */

    showRoleSelector(
        account
    );

}


/* ============================================================
   CENTRAL DASHBOARD REDIRECT
   ============================================================ */

function redirectToDashboard(){

    const button =
        $("#loginButton");


    if(button){

        button.classList.add(
            "loading"
        );

        button.disabled =
            true;

    }


    showToast(
        "Access granted",
        "Opening your personalized AgriVision dashboard..."
    );


    setTimeout(
        () => {

            window.location.href =
                "dashboard.html";

        },
        700
    );

}


/* ============================================================
   MULTIPLE ROLE SELECTOR
   ============================================================ */

function showRoleSelector(
    account
){

    const overlay =
        $("#roleSelectorOverlay");

    const list =
        $("#dashboardRoleList");


    list.innerHTML = "";


    account.roles.forEach(
        role => {

            const config =
                ROLE_CONFIG[role];


            if(!config){

                return;

            }


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "dashboard-role-button";


            button.innerHTML = `

                <span
                    class="dashboard-role-icon"
                >
                    ${config.icon}
                </span>

                <span
                    class="dashboard-role-info"
                >

                    <strong>
                        ${escapeHTML(role)}
                    </strong>

                    <span>
                        ${escapeHTML(
                            config.description
                        )}
                    </span>

                </span>

                <span
                    class="dashboard-role-arrow"
                >
                    →
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    selectActiveRole(
                        role
                    );

                }
            );


            list.appendChild(
                button
            );

        }
    );


    overlay.classList.add(
        "show"
    );


    overlay.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* ============================================================
   SELECT ACTIVE ROLE
   ============================================================ */

function selectActiveRole(
    role
){

    if(
        !authenticatedAccount
    ){

        return;

    }


    saveCurrentUser(
        authenticatedAccount,
        role
    );


    closeRoleSelector();


    redirectToDashboard();

}


/* ============================================================
   CLOSE ROLE SELECTOR
   ============================================================ */

function closeRoleSelector(){

    const overlay =
        $("#roleSelectorOverlay");


    overlay.classList.remove(
        "show"
    );


    overlay.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* ============================================================
   PASSWORD VISIBILITY
   ============================================================ */

function setupPasswordToggle(){

    const button =
        $("#showPassword");

    const password =
        $("#loginPassword");


    button.addEventListener(
        "click",
        () => {

            const visible =
                password.type ===
                "text";


            password.type =
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


/* ============================================================
   ID INPUT
   ============================================================ */

function setupIDInput(){

    const input =
        $("#agrivisionId");


    input.addEventListener(
        "input",
        () => {

            input.value =
                input.value
                .toUpperCase()
                .replace(
                    /\s+/g,
                    ""
                );

        }
    );

}


/* ============================================================
   REMEMBER DEVICE
   ============================================================ */

function setupRemember(){

    const checkbox =
        $("#rememberMe");

    const input =
        $("#agrivisionId");


    const remembered =
        localStorage.getItem(
            "AgriVisionRememberedID"
        );


    if(remembered){

        input.value =
            remembered;

        checkbox.checked =
            true;

    }


    checkbox.addEventListener(
        "change",
        () => {

            if(
                checkbox.checked
            ){

                const id =
                    normalizeID(
                        input.value
                    );


                if(id){

                    localStorage.setItem(
                        "AgriVisionRememberedID",
                        id
                    );

                }

            }
            else{

                localStorage.removeItem(
                    "AgriVisionRememberedID"
                );

            }

        }
    );

}


/* ============================================================
   FORGOT PASSWORD
   ============================================================ */

function openForgot(){

    const overlay =
        $("#forgotOverlay");


    overlay.classList.add(
        "show"
    );


    overlay.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeForgot(){

    const overlay =
        $("#forgotOverlay");


    overlay.classList.remove(
        "show"
    );


    overlay.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* ============================================================
   MOUSE GLOW
   ============================================================ */

function setupMouseGlow(){

    let scheduled =
        false;


    window.addEventListener(
        "mousemove",
        event => {

            if(scheduled){

                return;

            }


            scheduled =
                true;


            requestAnimationFrame(
                () => {

                    document.documentElement
                        .style
                        .setProperty(
                            "--login-mouse-x",
                            `${event.clientX}px`
                        );


                    document.documentElement
                        .style
                        .setProperty(
                            "--login-mouse-y",
                            `${event.clientY}px`
                        );


                    scheduled =
                        false;

                }
            );

        },
        {
            passive:
                true
        }
    );

}


/* ============================================================
   FIREFLIES
   ============================================================ */

function createFireflies(){

    const container =
        $("#loginFireflies");


    if(!container){

        return;

    }


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
            "login-firefly";


        const size =
            2 +
            Math.random() * 4;


        firefly.style.width =
            `${size}px`;


        firefly.style.height =
            `${size}px`;


        firefly.style.left =
            `${Math.random() * 100}%`;


        firefly.style.top =
            `${Math.random() * 100}%`;


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
   FALLING LEAVES
   ============================================================ */

function createLeaf(){

    const container =
        $("#loginLeaves");


    if(!container){

        return;

    }


    const leaf =
        document.createElement(
            "span"
        );


    leaf.className =
        "login-leaf";


    const leafTypes = [

        "🍃",
        "🌿",
        "🌱",
        "🍂"

    ];


    leaf.textContent =
        leafTypes[
            Math.floor(
                Math.random()
                *
                leafTypes.length
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
   HTML ESCAPE
   ============================================================ */

function escapeHTML(
    value
){

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
   FORM
   ============================================================ */

function setupLoginForm(){

    const form =
        $("#loginForm");


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if(
                !validateLogin()
            ){

                return;

            }


            authenticate();

        }
    );

}


/* ============================================================
   MODAL CLICKS
   ============================================================ */

function setupModalClicks(){

    $("#selectorCancel")
        .addEventListener(
            "click",
            closeRoleSelector
        );


    $("#forgotButton")
        .addEventListener(
            "click",
            openForgot
        );


    $("#forgotClose")
        .addEventListener(
            "click",
            closeForgot
        );


    $("#forgotDone")
        .addEventListener(
            "click",
            closeForgot
        );


    $("#roleSelectorOverlay")
        .addEventListener(
            "click",
            event => {

                if(
                    event.target ===
                    $("#roleSelectorOverlay")
                ){

                    closeRoleSelector();

                }

            }
        );


    $("#forgotOverlay")
        .addEventListener(
            "click",
            event => {

                if(
                    event.target ===
                    $("#forgotOverlay")
                ){

                    closeForgot();

                }

            }
        );

}


/* ============================================================
   ESC KEY
   ============================================================ */

function setupEscape(){

    document.addEventListener(
        "keydown",
        event => {

            if(
                event.key !==
                "Escape"
            ){

                return;

            }


            closeRoleSelector();

            closeForgot();

        }
    );

}


/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupLoginForm();

        setupPasswordToggle();

        setupIDInput();

        setupRemember();

        setupMouseGlow();

        setupModalClicks();

        setupEscape();

        createFireflies();


        /*
         * Initial leaves
         */

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


        /*
         * Continuous leaves
         */

        setInterval(
            createLeaf,
            1500
        );

    }
);