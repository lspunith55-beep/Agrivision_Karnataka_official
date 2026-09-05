/* ============================================================
   AGRIVISION KARNATAKA
   ECOSYSTEM PAGE ENGINE

   APPEND TO:
   assets/js/agriculture.js

   Does NOT replace the existing Farmer / Buyer engine.
   ============================================================ */

(function(){

    "use strict";


    /* ========================================================
       PAGE CHECK
       ======================================================== */

    const ecosystemPage =
        document.querySelector(
            ".ecosystem-page"
        );


    if(!ecosystemPage){

        return;

    }


    /* ========================================================
       HELPERS
       ======================================================== */

    const $ =
        selector =>
            document.querySelector(
                selector
            );


    const $$ =
        selector =>
            [
                ...document.querySelectorAll(
                    selector
                )
            ];


    /* ========================================================
       YEAR
       ======================================================== */

    function setYear(){

        const year =
            new Date()
            .getFullYear();


        $$(
            "[data-eco-year]"
        ).forEach(
            element => {

                element.textContent =
                    year;

            }
        );

    }


    /* ========================================================
       SCROLL REVEAL
       ======================================================== */

    function reveal(){

        const elements =
            $$(".eco-reveal");


        if(!elements.length){

            return;

        }


        if(
            !(
                "IntersectionObserver"
                in window
            )
        ){

            elements.forEach(
                element => {

                    element.classList.add(
                        "eco-visible"
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

                            if(
                                !entry.isIntersecting
                            ){

                                return;

                            }


                            entry.target
                                .classList
                                .add(
                                    "eco-visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold:.08,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        elements.forEach(
            element =>
                observer.observe(
                    element
                )
        );

    }


    /* ========================================================
       SMOOTH SCROLL
       ======================================================== */

    function smoothScroll(){

        $$(
            'a[href^="#"]'
        ).forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if(
                            !targetId ||
                            targetId === "#"
                        ){

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if(!target){

                            return;

                        }


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:"smooth",
                            block:"start"
                        });


                    }
                );

            }
        );

    }


    /* ========================================================
       CARD NAVIGATION
       ======================================================== */

    function cardNavigation(){

        $$(
            "[data-eco-link]"
        ).forEach(
            card => {

                card.addEventListener(
                    "click",
                    event => {

                        const clickedLink =
                            event.target.closest(
                                "a"
                            );


                        if(clickedLink){

                            return;

                        }


                        const destination =
                            card.dataset.ecoLink;


                        if(
                            destination
                        ){

                            window.location.href =
                                destination;

                        }

                    }
                );

            }
        );

    }


    /* ========================================================
       PREMIUM CARD TILT
       ======================================================== */

    function cardTilt(){

        if(
            window.matchMedia(
                "(max-width:700px)"
            ).matches
        ){

            return;

        }


        $$(
            ".eco-core-card, .eco-support-card"
        ).forEach(
            card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height;


                        const rotateY =
                            (
                                x -
                                .5
                            ) * 4;


                        const rotateX =
                            (
                                .5 -
                                y
                            ) * 4;


                        card.style.transform =
                            `
                            translateY(-8px)
                            perspective(900px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            `;

                    },
                    {
                        passive:true
                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* ========================================================
       NETWORK INTERACTION
       ======================================================== */

    function networkInteraction(){

        const nodes =
            $$(".eco-network-node");


        if(!nodes.length){

            return;

        }


        nodes.forEach(
            node => {

                node.addEventListener(
                    "mouseenter",
                    () => {

                        node.classList.add(
                            "active"
                        );


                        nodes.forEach(
                            other => {

                                if(
                                    other !== node
                                ){

                                    other.classList.add(
                                        "muted"
                                    );

                                }

                            }
                        );

                    }
                );


                node.addEventListener(
                    "mouseleave",
                    () => {

                        node.classList.remove(
                            "active"
                        );


                        nodes.forEach(
                            other => {

                                other.classList.remove(
                                    "muted"
                                );

                            }
                        );

                    }
                );


                node.addEventListener(
                    "focus",
                    () => {

                        node.classList.add(
                            "active"
                        );

                    }
                );


                node.addEventListener(
                    "blur",
                    () => {

                        node.classList.remove(
                            "active"
                        );

                    }
                );


                node.setAttribute(
                    "tabindex",
                    "0"
                );

            }
        );

    }


    /* ========================================================
       CURSOR GLOW
       ======================================================== */

    function cursorGlow(){

        if(
            window.matchMedia(
                "(pointer:coarse)"
            ).matches
        ){

            return;

        }


        const glow =
            document.createElement(
                "div"
            );


        glow.className =
            "eco-cursor-glow";


        document.body.appendChild(
            glow
        );


        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                glow.classList.add(
                    "active"
                );

            },
            {
                passive:true
            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                glow.classList.remove(
                    "active"
                );

            }
        );


        function animate(){

            currentX +=
                (
                    mouseX -
                    currentX
                ) * .12;


            currentY +=
                (
                    mouseY -
                    currentY
                ) * .12;


            glow.style.transform =
                `
                translate3d(
                    ${currentX}px,
                    ${currentY}px,
                    0
                )
                `;


            requestAnimationFrame(
                animate
            );

        }


        animate();

    }


    /* ========================================================
       HEADER SCROLL
       ======================================================== */

    function headerScroll(){

        const header =
            $(
                ".agriculture-header"
            );


        if(!header){

            return;

        }


        let lastScroll =
            window.scrollY;


        window.addEventListener(
            "scroll",
            () => {

                const current =
                    window.scrollY;


                if(
                    current > 40
                ){

                    header.classList.add(
                        "eco-header-scrolled"
                    );

                }else{

                    header.classList.remove(
                        "eco-header-scrolled"
                    );

                }


                if(
                    current >
                    lastScroll
                    &&
                    current > 180
                ){

                    header.classList.add(
                        "eco-header-hidden"
                    );

                }else{

                    header.classList.remove(
                        "eco-header-hidden"
                    );

                }


                lastScroll =
                    current;

            },
            {
                passive:true
            }
        );

    }


    /* ========================================================
       NETWORK PARALLAX
       ======================================================== */

    function networkParallax(){

        const network =
            $(
                ".eco-network"
            );


        if(!network){

            return;

        }


        if(
            window.matchMedia(
                "(pointer:coarse)"
            ).matches
        ){

            return;

        }


        network.addEventListener(
            "mousemove",
            event => {

                const rect =
                    network
                    .getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    .5;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    .5;


                network.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${y * -2}deg)
                    rotateY(${x * 3}deg)
                    `;

            },
            {
                passive:true
            }
        );


        network.addEventListener(
            "mouseleave",
            () => {

                network.style.transform =
                    "";

            }
        );

    }


    /* ========================================================
       BUTTON RIPPLE
       ======================================================== */

    function ripple(){

        document.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".eco-button"
                    );


                if(!button){

                    return;

                }


                const circle =
                    document.createElement(
                        "span"
                    );


                const rect =
                    button.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                circle.style.position =
                    "absolute";


                circle.style.width =
                    `${size}px`;


                circle.style.height =
                    `${size}px`;


                circle.style.left =
                    `
                    ${
                        event.clientX -
                        rect.left -
                        size / 2
                    }px
                    `;


                circle.style.top =
                    `
                    ${
                        event.clientY -
                        rect.top -
                        size / 2
                    }px
                    `;


                circle.style.borderRadius =
                    "50%";


                circle.style.background =
                    "rgba(255,255,255,.20)";


                circle.style.transform =
                    "scale(0)";


                circle.style.pointerEvents =
                    "none";


                circle.style.transition =
                    `
                    transform .55s ease,
                    opacity .55s ease
                    `;


                button.appendChild(
                    circle
                );


                requestAnimationFrame(
                    () => {

                        circle.style.transform =
                            "scale(1)";

                        circle.style.opacity =
                            "0";

                    }
                );


                setTimeout(
                    () => {

                        circle.remove();

                    },
                    600
                );

            }
        );

    }


    /* ========================================================
       INITIALIZE
       ======================================================== */

    function init(){

        setYear();

        reveal();

        smoothScroll();

        cardNavigation();

        cardTilt();

        networkInteraction();

        cursorGlow();

        headerScroll();

        networkParallax();

        ripple();

    }


    /* ========================================================
       START
       ======================================================== */

    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    }else{

        init();

    }


})();
/* ============================================================
   AGRIVISION KARNATAKA
   DASHBOARD ENGINE
   APPEND TO assets/js/agriculture.js

   Provides:
   - personalized dashboard
   - multi-role handling
   - seven core portal navigation
   - profile rendering
   - profile completion
   - activity rendering
   - notifications
   - ecosystem pulse
   - active activity summary
   - fireflies
   - leaves
   - profile modal
   - login/session awareness
   ============================================================ */

(function(){

    "use strict";


    /* ========================================================
       DASHBOARD CONFIG
       ======================================================== */

    const DASHBOARD_ROLES = {

        farmer:{

            key:"farmer",

            name:"Farmer",

            icon:"🌾",

            description:
                "Manage farms, crops, marketplace connections, orders, services, logistics and agricultural activity.",

            page:
                "farmer-portal.html",

            colour:
                "#16f39a"

        },


        buyer:{

            key:"buyer",

            name:"Buyer",

            icon:"🛒",

            description:
                "Discover agricultural produce, manage requirements, connect with farmers and manage procurement.",

            page:
                "buyer-portal.html",

            colour:
                "#00eaff"

        },


        labour:{

            key:"labour",

            name:"Labour Worker",

            icon:"👷",

            description:
                "Find suitable agricultural work, manage assignments, schedules, work activity and worker information.",

            page:
                "labour-portal.html",

            colour:
                "#ffd85c"

        },


        logistics:{

            key:"logistics",

            name:"Logistics Provider",

            icon:"🚚",

            description:
                "Coordinate agricultural transportation, fleet activity, shipments, assignments and delivery movement.",

            page:
                "logistics-portal.html",

            colour:
                "#48a9ff"

        },


        driver:{

            key:"driver",

            name:"Driver",

            icon:"🚛",

            description:
                "Manage transport assignments, pickup journeys, deliveries, routes and transportation activity.",

            page:
                "driver-portal.html",

            colour:
                "#ff9d5c"

        },


        equipment:{

            key:"equipment",

            name:"Equipment Owner",

            icon:"🚜",

            description:
                "Manage agricultural machinery, availability, equipment requests, rentals, maintenance and services.",

            page:
                "equipment-portal.html",

            colour:
                "#ff6fb5"

        },


        "machine-operator":{

            key:"machine-operator",

            name:"Machine Operator",

            icon:"⚙️",

            description:
                "Manage machine-operation work, assignments, availability and agricultural field-service activities.",

            page:
                "machine-operator-portal.html",

            colour:
                "#ad8cff"

        }

    };


    /* ========================================================
       STORAGE KEYS
       ======================================================== */

    const DASHBOARD_USER_KEYS = [

        "AgriVisionUser",

        "agrivisionUser",

        "currentUser",

        "registeredUser",

        "user"

    ];


    const DASHBOARD_ROLE_KEYS = [

        "roles",

        "selectedRoles",

        "userRoles"

    ];


    const DASHBOARD_SESSION_KEYS = [

        "AgriVisionSession",

        "agrivisionSession",

        "currentSession"

    ];


    /* ========================================================
       HELPERS
       ======================================================== */

    function dashboardQuery(
        selector
    ){

        return document.querySelector(
            selector
        );

    }


    function dashboardQueryAll(
        selector
    ){

        return [
            ...document.querySelectorAll(
                selector
            )
        ];

    }


    function dashboardSafeJSON(
        value
    ){

        try{

            return JSON.parse(
                value
            );

        }catch{

            return null;

        }

    }


    function dashboardEscape(
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


    function dashboardFirst(
        object,
        keys,
        fallback = ""
    ){

        if(!object){

            return fallback;

        }


        for(
            const key of keys
        ){

            const value =
                object[key];


            if(
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ""
            ){

                return value;

            }

        }


        return fallback;

    }


    /* ========================================================
       USER LOADING
       ======================================================== */

    function dashboardGetUser(){

        const candidates = [];


        DASHBOARD_SESSION_KEYS.forEach(
            key => {

                const raw =
                    localStorage.getItem(
                        key
                    );

                if(raw){

                    const parsed =
                        dashboardSafeJSON(
                            raw
                        );

                    if(parsed){

                        candidates.push(
                            parsed.user ||
                            parsed.account ||
                            parsed
                        );

                    }

                }

            }
        );


        DASHBOARD_USER_KEYS.forEach(
            key => {

                const raw =
                    localStorage.getItem(
                        key
                    );

                if(raw){

                    const parsed =
                        dashboardSafeJSON(
                            raw
                        );

                    if(parsed){

                        candidates.push(
                            parsed.user ||
                            parsed.account ||
                            parsed
                        );

                    }

                }

            }
        );


        /*
         * Existing shared Farmer store.
         */

        try{

            if(
                typeof store !==
                "undefined"
                &&
                store.user
            ){

                candidates.push(
                    store.user
                );

            }

        }catch{

            /* shared store may not exist */

        }


        const user =
            candidates.find(
                item =>
                    item &&
                    (
                        item.name ||
                        item.fullName ||
                        item.email ||
                        item.id ||
                        item.agrivisionId
                    )
            );


        if(user){

            return user;

        }


        return {

            name:
                "AgriVision Member",

            id:
                "",

            role:
                "",

            roles:
                [],

            state:
                "Karnataka",

            district:
                "",

            taluk:
                "",

            village:
                "",

            location:
                "",

            email:
                "",

            phone:
                "",

            createdAt:
                ""

        };

    }


    /* ========================================================
       ROLE NORMALIZATION
       ======================================================== */

    function dashboardNormalizeRole(
        role
    ){

        if(!role){

            return "";

        }


        const value =
            String(
                role
            )
            .trim()
            .toLowerCase()
            .replace(
                /_/g,
                "-"
            )
            .replace(
                /\s+/g,
                "-"
            );


        const aliases = {

            farmer:
                "farmer",

            buyer:
                "buyer",

            labour:
                "labour",

            "labour-worker":
                "labour",

            worker:
                "labour",

            logistics:
                "logistics",

            "logistics-provider":
                "logistics",

            driver:
                "driver",

            equipment:
                "equipment",

            "equipment-owner":
                "equipment",

            operator:
                "machine-operator",

            "machine-operator":
                "machine-operator",

            "machineoperator":
                "machine-operator"

        };


        return (
            aliases[value] ||
            value
        );

    }


    function dashboardGetRoles(
        user
    ){

        let roles = [];


        if(
            Array.isArray(
                user?.roles
            )
        ){

            roles =
                user.roles;

        }


        else if(
            Array.isArray(
                user?.selectedRoles
            )
        ){

            roles =
                user.selectedRoles;

        }


        else if(
            typeof user?.roles ===
            "string"
        ){

            roles =
                user.roles.split(
                    ","
                );

        }


        else if(
            user?.role
        ){

            roles = [

                user.role

            ];

        }


        /*
         * If registration stored roles separately.
         */

        if(!roles.length){

            for(
                const key of DASHBOARD_ROLE_KEYS
            ){

                const raw =
                    localStorage.getItem(
                        key
                    );


                if(!raw){

                    continue;

                }


                const parsed =
                    dashboardSafeJSON(
                        raw
                    );


                if(
                    Array.isArray(parsed)
                ){

                    roles =
                        parsed;

                    break;

                }

            }

        }


        const normalized =
            roles
            .map(
                dashboardNormalizeRole
            )
            .filter(
                role =>
                    DASHBOARD_ROLES[role]
            );


        /*
         * Remove duplicates.
         */

        return [
            ...new Set(
                normalized
            )
        ];

    }


    /* ========================================================
       PERSONALIZED USER DATA
       ======================================================== */

    function dashboardRenderUser(
        user,
        roles
    ){

        const name =
            dashboardFirst(
                user,
                [
                    "name",
                    "fullName",
                    "displayName"
                ],
                "AgriVision Member"
            );


        const id =
            dashboardFirst(
                user,
                [
                    "id",
                    "agrivisionId",
                    "agriVisionId",
                    "userId"
                ],
                "—"
            );


        const email =
            dashboardFirst(
                user,
                [
                    "email",
                    "emailAddress"
                ],
                "—"
            );


        const phone =
            dashboardFirst(
                user,
                [
                    "phone",
                    "mobile",
                    "mobileNumber"
                ],
                "—"
            );


        const state =
            dashboardFirst(
                user,
                [
                    "state"
                ],
                "Karnataka"
            );


        const district =
            dashboardFirst(
                user,
                [
                    "district"
                ],
                "—"
            );


        const taluk =
            dashboardFirst(
                user,
                [
                    "taluk"
                ],
                "—"
            );


        const village =
            dashboardFirst(
                user,
                [
                    "village",
                    "locality"
                ],
                "—"
            );


        const location =
            dashboardFirst(
                user,
                [
                    "location",
                    "address"
                ],
                district !== "—"
                    ? district
                    : state
            );


        const activeRole =
            roles.length
                ? DASHBOARD_ROLES[
                    roles[0]
                ].name
                : dashboardFirst(
                    user,
                    [
                        "role"
                    ],
                    "No active role"
                );


        dashboardQueryAll(
            "[data-dashboard-user-name]"
        )
        .forEach(
            element => {

                element.textContent =
                    name;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-user-id]"
        )
        .forEach(
            element => {

                element.textContent =
                    id;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-email]"
        )
        .forEach(
            element => {

                element.textContent =
                    email;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-phone]"
        )
        .forEach(
            element => {

                element.textContent =
                    phone;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-state]"
        )
        .forEach(
            element => {

                element.textContent =
                    state;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-district]"
        )
        .forEach(
            element => {

                element.textContent =
                    district;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-taluk]"
        )
        .forEach(
            element => {

                element.textContent =
                    taluk;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-village]"
        )
        .forEach(
            element => {

                element.textContent =
                    village;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-location]"
        )
        .forEach(
            element => {

                element.textContent =
                    location;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-modal-location]"
        )
        .forEach(
            element => {

                element.textContent =
                    location;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-active-role]"
        )
        .forEach(
            element => {

                element.textContent =
                    activeRole;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-roles]"
        )
        .forEach(
            element => {

                element.textContent =
                    roles.length
                        ?
                        roles
                        .map(
                            role =>
                                DASHBOARD_ROLES[
                                    role
                                ].name
                        )
                        .join(
                            " · "
                        )
                        :
                        "No active role";

            }
        );


        const initial =
            name
            .trim()
            .charAt(0)
            .toUpperCase()
            ||
            "U";


        dashboardQueryAll(
            "[data-dashboard-user-initial]"
        )
        .forEach(
            element => {

                element.textContent =
                    initial;

            }
        );


        dashboardRenderDates(
            user
        );

    }


    /* ========================================================
       DATES
       ======================================================== */

    function dashboardRenderDates(
        user
    ){

        const created =
            dashboardFirst(
                user,
                [
                    "createdAt",
                    "registeredAt",
                    "registrationDate",
                    "joinedAt"
                ],
                ""
            );


        dashboardQueryAll(
            "[data-dashboard-created]"
        )
        .forEach(
            element => {

                if(!created){

                    element.textContent =
                        "—";

                    return;

                }


                const date =
                    new Date(
                        created
                    );


                element.textContent =
                    Number.isNaN(
                        date.getTime()
                    )
                    ?
                    String(created)
                    :
                    date.toLocaleDateString(
                        "en-IN",
                        {
                            day:"numeric",
                            month:"short",
                            year:"numeric"
                        }
                    );

            }
        );


        let lastLogin =
            "";


        for(
            const key of [
                "AgriVisionSession",
                "agrivisionSession",
                "lastLogin",
                "lastLoginAt"
            ]
        ){

            const raw =
                localStorage.getItem(
                    key
                );


            if(!raw){

                continue;

            }


            const parsed =
                dashboardSafeJSON(
                    raw
                );


            if(
                parsed?.lastLogin
            ){

                lastLogin =
                    parsed.lastLogin;

                break;

            }


            if(
                parsed?.lastLoginAt
            ){

                lastLogin =
                    parsed.lastLoginAt;

                break;

            }


            if(
                key ===
                "lastLogin"
                ||
                key ===
                "lastLoginAt"
            ){

                lastLogin =
                    raw;

                break;

            }

        }


        dashboardQueryAll(
            "[data-dashboard-last-login]"
        )
        .forEach(
            element => {

                if(!lastLogin){

                    element.textContent =
                        "Current session";

                    return;

                }


                const date =
                    new Date(
                        lastLogin
                    );


                element.textContent =
                    Number.isNaN(
                        date.getTime()
                    )
                    ?
                    "Current session"
                    :
                    date.toLocaleString(
                        "en-IN",
                        {
                            day:"numeric",
                            month:"short",
                            hour:"2-digit",
                            minute:"2-digit"
                        }
                    );

            }
        );

    }


    /* ========================================================
       PROFILE COMPLETION
       ======================================================== */

    function dashboardProfileCompletion(
        user,
        roles
    ){

        const fields = [

            [
                "name",
                "fullName"
            ],

            [
                "email"
            ],

            [
                "phone",
                "mobile",
                "mobileNumber"
            ],

            [
                "state"
            ],

            [
                "district"
            ],

            [
                "taluk"
            ],

            [
                "village",
                "locality"
            ],

            [
                "roles",
                "selectedRoles",
                "role"
            ]

        ];


        let completed =
            0;


        fields.forEach(
            keys => {

                let value = "";


                if(
                    keys.some(
                        key =>
                            Array.isArray(
                                user?.[key]
                            )
                            &&
                            user[key].length
                    )
                ){

                    value =
                        "role";

                }


                else{

                    value =
                        dashboardFirst(
                            user,
                            keys,
                            ""
                        );

                }


                if(
                    String(
                        value
                    ).trim()
                ){

                    completed++;

                }

            }
        );


        if(
            roles.length
        ){

            /*
             * Roles are definitely complete.
             */

            completed =
                Math.max(
                    completed,
                    1
                );

        }


        const percentage =
            Math.round(
                (
                    completed /
                    fields.length
                ) *
                100
            );


        dashboardQueryAll(
            "[data-dashboard-profile-percent]"
        )
        .forEach(
            element => {

                element.textContent =
                    `${percentage}%`;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-profile-progress]"
        )
        .forEach(
            element => {

                element.style.width =
                    `${percentage}%`;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-completion-ring]"
        )
        .forEach(
            element => {

                const degrees =
                    percentage *
                    3.6;


                element.style.background =
                    `
                    conic-gradient(
                        #16f39a 0deg,
                        #00eaff ${degrees * .55}deg,
                        #ad8cff ${degrees}deg,
                        rgba(255,255,255,.09) ${degrees}deg
                    )
                    `;

            }
        );


        dashboardQueryAll(
            "[data-dashboard-profile-message]"
        )
        .forEach(
            element => {

                if(
                    percentage >= 100
                ){

                    element.textContent =
                        "Your AgriVision profile is fully populated.";

                }

                else if(
                    percentage >= 75
                ){

                    element.textContent =
                        "Your profile is almost complete. Complete the remaining information when needed.";

                }

                else{

                    element.textContent =
                        "Your registered information will continue to build your personalized ecosystem identity.";

                }

            }
        );


        dashboardQueryAll(
            "[data-dashboard-verification]"
        )
        .forEach(
            element => {

                element.textContent =
                    percentage >= 100
                        ?
                        "PROFILE COMPLETE"
                        :
                        "PROFILE";

            }
        );

    }


    /* ========================================================
       RENDER SEVEN CORE SYSTEMS
       ======================================================== */

    function dashboardRenderRoles(
        roles
    ){

        const container =
            dashboardQuery(
                "[data-dashboard-role-grid]"
            );


        if(!container){

            return;

        }


        container.innerHTML = "";


        const roleList =
            Object.values(
                DASHBOARD_ROLES
            );


        roleList.forEach(
            (
                role,
                index
            ) => {


                const selected =
                    roles.includes(
                        role.key
                    );


                const article =
                    document.createElement(
                        "article"
                    );


                article.className =
                    "dashboard-role-card";


                article.style.setProperty(
                    "--role-color",
                    role.colour
                );


                article.innerHTML = `

                    <div
                        class="dashboard-role-number"
                    >
                        ${String(
                            index + 1
                        ).padStart(
                            2,
                            "0"
                        )}
                    </div>


                    <div
                        class="dashboard-role-icon"
                        aria-hidden="true"
                    >
                        ${role.icon}
                    </div>


                    <div
                        class="dashboard-role-content"
                    >

                        <span>
                            CORE SYSTEM
                        </span>

                        <h3>
                            ${dashboardEscape(
                                role.name
                            )}
                        </h3>

                        <p>
                            ${dashboardEscape(
                                role.description
                            )}
                        </p>

                        <div
                            class="dashboard-role-status"
                        >

                            <span
                                class="dashboard-role-status-dot"
                            ></span>

                            ${
                                selected
                                    ?
                                    "YOUR ACTIVE ROLE"
                                    :
                                    "ECOSYSTEM SYSTEM"
                            }

                        </div>

                    </div>


                    <a
                        href="${role.page}"
                        class="dashboard-role-button"
                        data-dashboard-role-link
                        data-role="${role.key}"
                    >

                        <span>
                            ${
                                selected
                                    ?
                                    "ENTER YOUR PORTAL"
                                    :
                                    "OPEN SYSTEM"
                            }
                        </span>

                        <span>
                            →
                        </span>

                    </a>

                `;


                container.appendChild(
                    article
                );

            }
        );


        dashboardBindRoleLinks();

    }


    /* ========================================================
       ROLE NAVIGATION
       ======================================================== */

    function dashboardBindRoleLinks(){

        dashboardQueryAll(
            "[data-dashboard-role-link]"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const role =
                            link.dataset.role;


                        /*
                         * Store the selected workspace.
                         * This is not a new account.
                         */

                        try{

                            localStorage.setItem(
                                "AgriVisionActiveRole",
                                role
                            );

                        }catch{

                            /* ignore */

                        }

                    }
                );

            }
        );

    }


    /* ========================================================
       SHARED STORE ACCESS
       ======================================================== */

    function dashboardGetStore(){

        try{

            if(
                typeof store !==
                "undefined"
            ){

                return store;

            }

        }catch{

            /* ignored */

        }


        const raw =
            localStorage.getItem(
                "AgriVisionData"
            );


        if(!raw){

            return {

                crops:[],
                listings:[],
                buyerRequests:[],
                negotiations:[],
                orders:[],
                logistics:[],
                services:[],
                finance:[],
                activities:[],
                notifications:[]

            };

        }


        const parsed =
            dashboardSafeJSON(
                raw
            );


        return parsed || {

            crops:[],
            listings:[],
            buyerRequests:[],
            negotiations:[],
            orders:[],
            logistics:[],
            services:[],
            finance:[],
            activities:[],
            notifications:[]

        };

    }


    /* ========================================================
       ECOSYSTEM PULSE
       ======================================================== */

    function dashboardRenderPulse(){

        const container =
            dashboardQuery(
                "[data-dashboard-pulse]"
            );


        if(!container){

            return;

        }


        const data =
            dashboardGetStore();


        const values = [

            {
                icon:"🌱",
                value:
                    Array.isArray(
                        data.crops
                    )
                    ?
                    data.crops.length
                    :
                    0,
                label:"ACTIVE CROPS"
            },

            {
                icon:"🛒",
                value:
                    (
                        Array.isArray(
                            data.listings
                        )
                        ?
                        data.listings.length
                        :
                        0
                    )
                    +
                    (
                        Array.isArray(
                            data.buyerRequests
                        )
                        ?
                        data.buyerRequests.length
                        :
                        0
                    ),
                label:"MARKET ACTIVITY"
            },

            {
                icon:"🚚",
                value:
                    Array.isArray(
                        data.logistics
                    )
                    ?
                    data.logistics.filter(
                        item =>
                            item.status !==
                            "COMPLETED"
                    ).length
                    :
                    0,
                label:"ACTIVE DELIVERIES"
            },

            {
                icon:"⚡",
                value:
                    (
                        Array.isArray(
                            data.activities
                        )
                        ?
                        data.activities.length
                        :
                        0
                    ),
                label:"ECOSYSTEM ACTIVITY"
            }

        ];


        container.innerHTML =
            values
            .map(
                item => `

                    <div
                        class="dashboard-pulse-item"
                    >

                        <span
                            class="dashboard-pulse-icon"
                        >
                            ${item.icon}
                        </span>

                        <strong
                            class="dashboard-pulse-value"
                        >
                            ${item.value}
                        </strong>

                        <span
                            class="dashboard-pulse-label"
                        >
                            ${item.label}
                        </span>

                    </div>

                `
            )
            .join("");

    }


    /* ========================================================
       ACTIVITY TIMELINE
       ======================================================== */

    function dashboardRenderActivity(){

        const container =
            dashboardQuery(
                "[data-dashboard-activity]"
            );


        if(!container){

            return;

        }


        const data =
            dashboardGetStore();


        const activities =
            Array.isArray(
                data.activities
            )
            ?
            data.activities
                .slice(
                    0,
                    12
                )
            :
            [];


        if(
            !activities.length
        ){

            return;

        }


        container.innerHTML =
            activities
            .map(
                activity => {

                    const date =
                        new Date(
                            activity.timestamp ||
                            activity.createdAt ||
                            Date.now()
                        );


                    return `

                        <div
                            class="dashboard-timeline-item"
                        >

                            <div
                                class="dashboard-timeline-dot"
                            >

                            </div>

                            <div
                                class="dashboard-timeline-line"
                            ></div>


                            <div
                                class="dashboard-timeline-content"
                            >

                                <strong>
                                    ${dashboardEscape(
                                        activity.title ||
                                        "Ecosystem activity"
                                    )}
                                </strong>

                                <p>
                                    ${dashboardEscape(
                                        activity.detail ||
                                        activity.description ||
                                        ""
                                    )}
                                </p>

                                <span
                                    class="dashboard-timeline-time"
                                >
                                    ${
                                        Number.isNaN(
                                            date.getTime()
                                        )
                                        ?
                                        ""
                                        :
                                        date.toLocaleString(
                                            "en-IN"
                                        )
                                    }

                                    ${
                                        activity.reference
                                        ?
                                        " · " +
                                        dashboardEscape(
                                            activity.reference
                                        )
                                        :
                                        ""
                                    }

                                </span>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

    }


    /* ========================================================
       NOTIFICATIONS
       ======================================================== */

    function dashboardRenderNotifications(){

        const container =
            dashboardQuery(
                "[data-dashboard-notifications]"
            );


        if(!container){

            return;

        }


        const data =
            dashboardGetStore();


        const notifications =
            Array.isArray(
                data.notifications
            )
            ?
            data.notifications
                .slice(
                    0,
                    10
                )
            :
            [];


        const unread =
            notifications.filter(
                notification =>
                    !notification.read
            ).length;


        dashboardQueryAll(
            "[data-dashboard-notification-count]"
        )
        .forEach(
            element => {

                element.textContent =
                    unread;

                element.style.display =
                    unread
                        ?
                        "grid"
                        :
                        "none";

            }
        );


        if(
            !notifications.length
        ){

            return;

        }


        container.innerHTML =
            notifications
            .map(
                notification => {

                    const date =
                        new Date(
                            notification.timestamp ||
                            Date.now()
                        );


                    return `

                        <div
                            class="dashboard-notification-item"
                        >

                            <div
                                class="dashboard-notification-icon"
                            >
                                ${
                                    notification.type ===
                                    "warning"
                                        ?
                                        "⚠"
                                        :
                                    notification.type ===
                                    "success"
                                        ?
                                        "✓"
                                        :
                                        "🔔"
                                }
                            </div>


                            <div>

                                <strong>
                                    ${dashboardEscape(
                                        notification.title ||
                                        "AgriVision Update"
                                    )}
                                </strong>

                                <p>
                                    ${dashboardEscape(
                                        notification.message ||
                                        ""
                                    )}
                                </p>

                                <span
                                    class="dashboard-notification-time"
                                >
                                    ${
                                        Number.isNaN(
                                            date.getTime()
                                        )
                                        ?
                                        ""
                                        :
                                        date.toLocaleString(
                                            "en-IN"
                                        )
                                    }
                                </span>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

    }


    /* ========================================================
       ACTIVE ACTIVITIES
       ======================================================== */

    function dashboardRenderActive(){

        const container =
            dashboardQuery(
                "[data-dashboard-active]"
            );


        if(!container){

            return;

        }


        const data =
            dashboardGetStore();


        const records = [];


        /*
         * Active orders
         */

        if(
            Array.isArray(
                data.orders
            )
        ){

            data.orders
            .filter(
                order =>
                    order.status !==
                    "COMPLETED"
            )
            .slice(
                0,
                3
            )
            .forEach(
                order => {

                    records.push({

                        icon:"📦",

                        title:
                            `${order.crop || "Agricultural"} order`,

                        description:
                            `Order ${order.id || ""} · ${
                                order.status ||
                                "ACTIVE"
                            }`,

                        status:
                            order.status ||
                            "ACTIVE",

                        page:
                            "farmer-portal.html"

                    });

                }
            );

        }


        /*
         * Active logistics
         */

        if(
            Array.isArray(
                data.logistics
            )
        ){

            data.logistics
            .filter(
                item =>
                    item.status !==
                    "COMPLETED"
            )
            .slice(
                0,
                3
            )
            .forEach(
                item => {

                    records.push({

                        icon:"🚚",

                        title:
                            `${item.crop || "Shipment"} transport`,

                        description:
                            `${
                                item.pickupLocation ||
                                "Pickup"
                            } → ${
                                item.destination ||
                                "Destination"
                            }`,

                        status:
                            item.status ||
                            "REQUESTED",

                        page:
                            "logistics-portal.html"

                    });

                }
            );

        }


        /*
         * Services
         */

        if(
            Array.isArray(
                data.services
            )
        ){

            data.services
            .filter(
                item =>
                    item.status !==
                    "COMPLETED"
            )
            .slice(
                0,
                2
            )
            .forEach(
                item => {

                    records.push({

                        icon:"⚙️",

                        title:
                            item.service ||
                            "Agricultural service",

                        description:
                            item.description ||
                            "Service activity in progress.",

                        status:
                            item.status ||
                            "REQUESTED",

                        page:
                            "farmer-portal.html"

                    });

                }
            );

        }


        const visible =
            records.slice(
                0,
                6
            );


        if(
            !visible.length
        ){

            return;

        }


        container.innerHTML =
            visible
            .map(
                record => `

                    <article
                        class="dashboard-active-card"
                    >

                        <div
                            class="dashboard-active-top"
                        >

                            <span
                                class="dashboard-active-icon"
                            >
                                ${record.icon}
                            </span>

                            <span
                                class="dashboard-active-state"
                            >
                                ${dashboardEscape(
                                    record.status
                                )}
                            </span>

                        </div>


                        <h3>
                            ${dashboardEscape(
                                record.title
                            )}
                        </h3>


                        <p>
                            ${dashboardEscape(
                                record.description
                            )}
                        </p>


                        <a
                            href="${dashboardEscape(
                                record.page
                            )}"
                            class="dashboard-active-link"
                        >
                            OPEN SYSTEM →
                        </a>

                    </article>

                `
            )
            .join("");

    }


    /* ========================================================
       FIRELIES
       ======================================================== */

    function dashboardFireflies(){

        const container =
            dashboardQuery(
                "[data-dashboard-fireflies]"
            );


        if(!container){

            return;

        }


        const colours = [

            "#16f39a",
            "#00eaff",
            "#48a9ff",
            "#ad8cff",
            "#ffd85c"

        ];


        for(
            let i = 0;
            i < 34;
            i++
        ){

            const firefly =
                document.createElement(
                    "span"
                );


            firefly.className =
                "dashboard-firefly";


            firefly.style.left =
                `${Math.random() * 100}%`;


            firefly.style.top =
                `${55 + Math.random() * 55}%`;


            firefly.style.setProperty(
                "--firefly-duration",
                `${6 + Math.random() * 8}s`
            );


            firefly.style.setProperty(
                "--firefly-delay",
                `${Math.random() * 8}s`
            );


            const colour =
                colours[
                    Math.floor(
                        Math.random()
                        * colours.length
                    )
                ];


            firefly.style.background =
                colour;


            firefly.style.boxShadow =
                `
                0 0 8px ${colour},
                0 0 22px ${colour}
                `;


            container.appendChild(
                firefly
            );

        }

    }


    /* ========================================================
       LEAVES
       ======================================================== */

    function dashboardLeaves(){

        const container =
            dashboardQuery(
                "[data-dashboard-leaves]"
            );


        if(!container){

            return;

        }


        const leafCharacters = [

            "🍃",
            "🌿",
            "🌱",
            "🍂"

        ];


        function createLeaf(){

            const leaf =
                document.createElement(
                    "span"
                );


            leaf.className =
                "dashboard-leaf";


            leaf.textContent =
                leafCharacters[
                    Math.floor(
                        Math.random()
                        * leafCharacters.length
                    )
                ];


            leaf.style.left =
                `${Math.random() * 100}%`;


            leaf.style.fontSize =
                `${13 + Math.random() * 17}px`;


            leaf.style.setProperty(
                "--leaf-duration",
                `${10 + Math.random() * 9}s`
            );


            container.appendChild(
                leaf
            );


            setTimeout(
                () => {

                    leaf.remove();

                },
                20000
            );

        }


        /*
         * Initial leaves.
         */

        for(
            let i = 0;
            i < 5;
            i++
        ){

            setTimeout(
                createLeaf,
                i * 700
            );

        }


        setInterval(
            createLeaf,
            2200
        );

    }


    /* ========================================================
       PROFILE MODAL
       ======================================================== */

    function dashboardProfileModal(){

        const modal =
            dashboardQuery(
                "[data-dashboard-profile-modal]"
            );


        if(!modal){

            return;

        }


        const openers =
            dashboardQueryAll(
                "[data-dashboard-profile]"
            );


        const closers =
            dashboardQueryAll(
                "[data-dashboard-profile-close]"
            );


        function open(){

            modal.classList.add(
                "show"
            );


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }


        function close(){

            modal.classList.remove(
                "show"
            );


            modal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }


        openers.forEach(
            button => {

                button.addEventListener(
                    "click",
                    open
                );

            }
        );


        closers.forEach(
            button => {

                button.addEventListener(
                    "click",
                    close
                );

            }
        );


        modal.addEventListener(
            "click",
            event => {

                if(
                    event.target ===
                    modal
                ){

                    close();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if(
                    event.key ===
                    "Escape"
                ){

                    close();

                }

            }
        );

    }


    /* ========================================================
       NOTIFICATION BUTTON
       ======================================================== */

    function dashboardNotificationButton(){

        const button =
            dashboardQuery(
                "[data-dashboard-notification-button]"
            );


        const target =
            dashboardQuery(
                "#notifications"
            );


        if(
            !button ||
            !target
        ){

            return;

        }


        button.addEventListener(
            "click",
            () => {

                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });

            }
        );

    }


    /* ========================================================
       SCROLL REVEAL
       ======================================================== */

    function dashboardReveal(){

        const elements =
            dashboardQueryAll(
                `
                .dashboard-role-card,
                .dashboard-pulse-item,
                .dashboard-active-card,
                .dashboard-connection-card,
                .dashboard-support-card,
                .dashboard-profile-information,
                .dashboard-completion-card,
                .dashboard-large-panel
                `
            );


        if(
            !("IntersectionObserver" in window)
        ){

            return;

        }


        elements.forEach(
            element => {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(18px)";

                element.style.transition =
                    "opacity .65s ease, transform .65s ease";

            }
        );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if(
                                !entry.isIntersecting
                            ){

                                return;

                            }


                            entry.target.style.opacity =
                                "1";


                            entry.target.style.transform =
                                "translateY(0)";


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold:.08
                }
            );


        elements.forEach(
            element =>
                observer.observe(
                    element
                )
        );

    }


    /* ========================================================
       ACTIVE ROLE
       ======================================================== */

    function dashboardSetActiveRole(
        user,
        roles
    ){

        let active =
            "";


        try{

            active =
                localStorage.getItem(
                    "AgriVisionActiveRole"
                ) || "";

        }catch{

            /* ignored */

        }


        active =
            dashboardNormalizeRole(
                active
            );


        if(
            !roles.includes(
                active
            )
        ){

            active =
                roles[0] ||
                dashboardNormalizeRole(
                    user?.role
                ) ||
                "";

        }


        if(active){

            try{

                localStorage.setItem(
                    "AgriVisionActiveRole",
                    active
                );

            }catch{

                /* ignored */

            }

        }


        return active;

    }


    /* ========================================================
       LOGOUT
       ======================================================== */

    function dashboardLogout(){

        dashboardQueryAll(
            "[data-dashboard-signout]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        /*
                         * Clear session-specific values,
                         * but do not erase the user's
                         * underlying ecosystem records.
                         */

                        [
                            "AgriVisionSession",
                            "agrivisionSession",
                            "currentSession",
                            "AgriVisionActiveRole"
                        ]
                        .forEach(
                            key => {

                                try{

                                    localStorage.removeItem(
                                        key
                                    );

                                }catch{

                                    /* ignored */

                                }

                            }
                        );

                    }
                );

            }
        );

    }


    /* ========================================================
       DASHBOARD INITIALIZATION
       ======================================================== */

    function dashboardInit(){

        if(
            !document.body.classList.contains(
                "dashboard-page"
            )
        ){

            return;

        }


        const user =
            dashboardGetUser();


        const roles =
            dashboardGetRoles(
                user
            );


        dashboardSetActiveRole(
            user,
            roles
        );


        dashboardRenderUser(
            user,
            roles
        );


        dashboardProfileCompletion(
            user,
            roles
        );


        dashboardRenderRoles(
            roles
        );


        dashboardRenderPulse();

        dashboardRenderActivity();

        dashboardRenderNotifications();

        dashboardRenderActive();

        dashboardFireflies();

        dashboardLeaves();

        dashboardProfileModal();

        dashboardNotificationButton();

        dashboardLogout();


        /*
         * Delay reveal slightly so dynamically
         * generated cards are already present.
         */

        requestAnimationFrame(
            () => {

                dashboardReveal();

            }
        );

    }


    /* ========================================================
       START
       ======================================================== */

    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            dashboardInit,
            {
                once:true
            }
        );

    }else{

        dashboardInit();

    }


})();
/* ============================================================
   AGRIVISION — PREMIUM COLOURFUL STAR CURSOR
   ============================================================ */

(function(){

    "use strict";

    function startAgriStarCursor(){

        /* Prevent duplicate canvas */
        if(
            document.getElementById(
                "agri-star-cursor"
            )
        ){
            return;
        }


        const canvas =
            document.createElement("canvas");

        canvas.id =
            "agri-star-cursor";


        canvas.style.position =
            "fixed";

        canvas.style.inset =
            "0";

        canvas.style.width =
            "100%";

        canvas.style.height =
            "100%";

        canvas.style.pointerEvents =
            "none";

        canvas.style.zIndex =
            "99999";


        document.body.appendChild(
            canvas
        );


        const ctx =
            canvas.getContext("2d");


        let width =
            window.innerWidth;

        let height =
            window.innerHeight;


        function resize(){

            width =
                canvas.width =
                window.innerWidth;

            height =
                canvas.height =
                window.innerHeight;

        }


        resize();


        window.addEventListener(
            "resize",
            resize
        );


        /* =====================================================
           COLOUR PALETTE
           ===================================================== */

        const colours = [

            "#16f39a",
            "#00eaff",
            "#48a9ff",
            "#ad8cff",
            "#ff6fb5",
            "#ffd85c",
            "#ffffff"

        ];


        const stars = [];


        let lastX = 0;
        let lastY = 0;


        /* =====================================================
           CREATE STAR
           ===================================================== */

        function addStar(
            x,
            y
        ){

            stars.push({

                x:x,

                y:y,

                vx:
                    (Math.random() - .5)
                    * 1.35,

                vy:
                    (Math.random() - .5)
                    * 1.35,

                size:
                    Math.random()
                    * 2.4
                    + .8,

                life:1,

                decay:
                    Math.random()
                    * .018
                    + .014,

                rotation:
                    Math.random()
                    * Math.PI,

                rotationSpeed:
                    (Math.random() - .5)
                    * .08,

                colour:
                    colours[
                        Math.floor(
                            Math.random()
                            * colours.length
                        )
                    ]

            });


            /*
             * Keep the effect lightweight.
             */

            if(
                stars.length > 180
            ){

                stars.splice(
                    0,
                    stars.length - 180
                );

            }

        }


        /* =====================================================
           MOUSE TRACKING
           ===================================================== */

        window.addEventListener(
            "mousemove",
            event => {

                const distance =
                    Math.hypot(
                        event.clientX - lastX,
                        event.clientY - lastY
                    );


                if(
                    distance > 4
                ){

                    addStar(
                        event.clientX,
                        event.clientY
                    );


                    /*
                     * Occasionally create a
                     * second smaller particle.
                     */

                    if(
                        Math.random() > .48
                    ){

                        addStar(

                            event.clientX
                            +
                            (
                                Math.random()
                                - .5
                            )
                            * 15,

                            event.clientY
                            +
                            (
                                Math.random()
                                - .5
                            )
                            * 15

                        );

                    }


                    lastX =
                        event.clientX;

                    lastY =
                        event.clientY;

                }

            },
            {
                passive:true
            }
        );


        /* =====================================================
           STAR DRAWING
           ===================================================== */

        function drawStar(
            star
        ){

            ctx.save();


            ctx.globalAlpha =
                Math.max(
                    0,
                    star.life
                );


            ctx.translate(
                star.x,
                star.y
            );


            ctx.rotate(
                star.rotation
            );


            ctx.fillStyle =
                star.colour;


            ctx.shadowColor =
                star.colour;


            ctx.shadowBlur =
                14;


            const size =
                star.size;


            /*
             * Four-point diamond star
             */

            ctx.beginPath();

            ctx.moveTo(
                0,
                -size * 2
            );

            ctx.lineTo(
                size * .55,
                -size * .55
            );

            ctx.lineTo(
                size * 2,
                0
            );

            ctx.lineTo(
                size * .55,
                size * .55
            );

            ctx.lineTo(
                0,
                size * 2
            );

            ctx.lineTo(
                -size * .55,
                size * .55
            );

            ctx.lineTo(
                -size * 2,
                0
            );

            ctx.lineTo(
                -size * .55,
                -size * .55
            );

            ctx.closePath();


            ctx.fill();


            ctx.restore();

        }


        /* =====================================================
           ANIMATION
           ===================================================== */

        function animate(){

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            for(
                let i =
                    stars.length - 1;

                i >= 0;

                i--
            ){

                const star =
                    stars[i];


                star.x +=
                    star.vx;


                star.y +=
                    star.vy;


                star.life -=
                    star.decay;


                star.rotation +=
                    star.rotationSpeed;


                drawStar(
                    star
                );


                if(
                    star.life <= 0
                ){

                    stars.splice(
                        i,
                        1
                    );

                }

            }


            requestAnimationFrame(
                animate
            );

        }


        animate();

    }


    /* ========================================================
       START AFTER DOM LOAD
       ======================================================== */

    if(
        document.readyState ===
        "loading"
    ){

        document.addEventListener(
            "DOMContentLoaded",
            startAgriStarCursor
        );

    }else{

        startAgriStarCursor();

    }

})();