/* =========================================================
   AGRIVISION KARNATAKA
   CORE JAVASCRIPT
   SHARED BY DASHBOARD + ALL CORE SYSTEMS
   ========================================================= */

"use strict";


const AgriVisionCore = {

    /* =====================================================
       CONFIGURATION
       ===================================================== */

    version: "2.0.0",

    storageKey: "AgriVisionData",

    userKey: "AgriVisionUser",


    roles: {

        farmer: {
            name: "Farmer",
            page: "farmer-portal.html"
        },

        buyer: {
            name: "Buyer",
            page: "buyer-portal.html"
        },

        labour: {
            name: "Labour",
            page: "labour-portal.html"
        },

        logistics: {
            name: "Logistics",
            page: "logistics-portal.html"
        },

        driver: {
            name: "Driver",
            page: "driver-portal.html"
        },

        equipment: {
            name: "Equipment",
            page: "equipment-portal.html"
        },

        operator: {
            name: "Machine Operator",
            page: "machine-operator-portal.html"
        }

    },


    /* =====================================================
       DATA LAYER
       ===================================================== */

    getData() {

        try {

            const raw =
                localStorage.getItem(
                    this.storageKey
                );

            if (!raw) {

                return {

                    users: [],
                    crops: [],
                    orders: [],
                    labourRequests: [],
                    equipmentRequests: [],
                    operatorRequests: [],
                    logisticsRequests: [],
                    deliveries: [],
                    payments: [],
                    ratings: [],
                    events: [],
                    notifications: [],
                    messages: []

                };

            }

            const data =
                JSON.parse(raw);

            return {

                users:
                    Array.isArray(data.users)
                        ? data.users
                        : [],

                crops:
                    Array.isArray(data.crops)
                        ? data.crops
                        : [],

                orders:
                    Array.isArray(data.orders)
                        ? data.orders
                        : [],

                labourRequests:
                    Array.isArray(data.labourRequests)
                        ? data.labourRequests
                        : [],

                equipmentRequests:
                    Array.isArray(data.equipmentRequests)
                        ? data.equipmentRequests
                        : [],

                operatorRequests:
                    Array.isArray(data.operatorRequests)
                        ? data.operatorRequests
                        : [],

                logisticsRequests:
                    Array.isArray(data.logisticsRequests)
                        ? data.logisticsRequests
                        : [],

                deliveries:
                    Array.isArray(data.deliveries)
                        ? data.deliveries
                        : [],

                payments:
                    Array.isArray(data.payments)
                        ? data.payments
                        : [],

                ratings:
                    Array.isArray(data.ratings)
                        ? data.ratings
                        : [],

                events:
                    Array.isArray(data.events)
                        ? data.events
                        : [],

                notifications:
                    Array.isArray(data.notifications)
                        ? data.notifications
                        : [],

                messages:
                    Array.isArray(data.messages)
                        ? data.messages
                        : []

            };

        } catch (error) {

            console.error(
                "AgriVision data error:",
                error
            );

            return {

                users: [],
                crops: [],
                orders: [],
                labourRequests: [],
                equipmentRequests: [],
                operatorRequests: [],
                logisticsRequests: [],
                deliveries: [],
                payments: [],
                ratings: [],
                events: [],
                notifications: [],
                messages: []

            };

        }

    },


    saveData(data) {

        try {

            localStorage.setItem(
                this.storageKey,
                JSON.stringify(data)
            );

            return true;

        } catch (error) {

            console.error(
                "AgriVision save error:",
                error
            );

            return false;

        }

    },


    /* =====================================================
       USER
       ===================================================== */

    getUser() {

        try {

            const raw =
                localStorage.getItem(
                    this.userKey
                );

            return raw
                ? JSON.parse(raw)
                : null;

        } catch {

            return null;

        }

    },


    setUser(user) {

        localStorage.setItem(
            this.userKey,
            JSON.stringify(user)
        );

    },


    /* =====================================================
       ROLE NAVIGATION
       ===================================================== */

    switchRole(role) {

        const roleData =
            this.roles[role];

        if (!roleData) {

            this.showToast(
                "This system is not configured.",
                "info"
            );

            return;

        }

        const user =
            this.getUser();

        if (user) {

            user.activeRole =
                role;

            user.lastSystem =
                role;

            this.setUser(user);

        }

        /*
         * IMPORTANT:
         * Dashboard buttons go to PORTALS,
         * not the ecosystem information pages.
         */

        window.location.href =
            roleData.page;

    },


    initializeRoleButtons() {

        document
            .querySelectorAll(
                "[data-role]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        this.switchRole(
                            button.dataset.role
                        );

                    }
                );

            });

    },


    /* =====================================================
       USER INFORMATION
       ===================================================== */

    populateUser() {

        const user =
            this.getUser();

        if (!user) {
            return;
        }


        document
            .querySelectorAll(
                "[data-user-name]"
            )
            .forEach(element => {

                element.textContent =
                    user.name ||
                    user.fullName ||
                    "AgriVision Member";

            });


        document
            .querySelectorAll(
                "[data-user-email]"
            )
            .forEach(element => {

                element.textContent =
                    user.email ||
                    "—";

            });


        document
            .querySelectorAll(
                "[data-user-role]"
            )
            .forEach(element => {

                element.textContent =
                    this.roles[
                        user.activeRole
                    ]?.name ||
                    "No active role";

            });

    },


    /* =====================================================
       MODALS
       ===================================================== */

    initializeModals() {

        document
            .querySelectorAll(
                "[data-modal-open]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.openModal(
                            button.dataset.modalOpen
                        );

                    }
                );

            });


        document
            .querySelectorAll(
                "[data-modal-close]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        this.closeModal(
                            button.closest(
                                ".av-modal-backdrop"
                            )
                        );

                    }
                );

            });


        document
            .querySelectorAll(
                ".av-modal-backdrop"
            )
            .forEach(backdrop => {

                backdrop.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target === backdrop
                        ) {

                            this.closeModal(
                                backdrop
                            );

                        }

                    }
                );

            });


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Escape"
                ) {
                    return;
                }

                const modal =
                    document.querySelector(
                        ".av-modal-backdrop.av-modal-open"
                    );

                if (modal) {

                    this.closeModal(
                        modal
                    );

                }

            }
        );

    },


    openModal(id) {

        const modal =
            document.getElementById(id);

        if (!modal) {
            return;
        }

        modal.classList.add(
            "av-modal-open"
        );

        document.body.style.overflow =
            "hidden";

    },


    closeModal(modal) {

        if (!modal) {
            return;
        }

        modal.classList.remove(
            "av-modal-open"
        );

        document.body.style.overflow =
            "";

    },


    /* =====================================================
       SEARCH
       ===================================================== */

    initializeSearch() {

        document
            .querySelectorAll(
                "[data-global-search]"
            )
            .forEach(input => {

                input.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key !== "Enter"
                        ) {
                            return;
                        }

                        const query =
                            input.value.trim();

                        if (!query) {
                            return;
                        }

                        this.performSearch(
                            query
                        );

                    }
                );

            });

    },


    performSearch(query) {

        const data =
            this.getData();

        const search =
            query.toLowerCase();


        const collections = [
            "crops",
            "orders",
            "labourRequests",
            "equipmentRequests",
            "operatorRequests",
            "logisticsRequests",
            "deliveries",
            "payments",
            "events"
        ];


        let count = 0;


        collections.forEach(
            collection => {

                if (
                    !Array.isArray(
                        data[collection]
                    )
                ) {
                    return;
                }

                count +=
                    data[collection]
                        .filter(item =>
                            JSON.stringify(item)
                                .toLowerCase()
                                .includes(search)
                        )
                        .length;

            }
        );


        this.showToast(

            count > 0
                ? `${count} ecosystem result(s) found.`
                : `No ecosystem results found for "${query}".`,

            "info"

        );

    },


    /* =====================================================
       EVENTS
       ===================================================== */

    createId(prefix = "AGR") {

        return (

            prefix +
            "-" +
            Date.now()
                .toString(36)
                .toUpperCase() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 7)
                .toUpperCase()

        );

    },


    addEvent(event) {

        const data =
            this.getData();


        const newEvent = {

            id:
                this.createId("EVT"),

            timestamp:
                new Date().toISOString(),

            title:
                event.title ||
                "Ecosystem event",

            description:
                event.description ||
                "",

            type:
                event.type ||
                "general",

            role:
                event.role ||
                null,

            entityId:
                event.entityId ||
                null

        };


        data.events.unshift(
            newEvent
        );


        this.saveData(
            data
        );


        document.dispatchEvent(
            new CustomEvent(
                "agrivision:event",
                {
                    detail:
                        newEvent
                }
            )
        );


        return newEvent;

    },


    loadActivity() {

        const container =
            document.getElementById(
                "ecosystemActivity"
            );

        if (!container) {
            return;
        }


        const data =
            this.getData();


        if (
            !data.events ||
            !data.events.length
        ) {
            return;
        }


        container.innerHTML = "";


        data.events
            .slice(0, 12)
            .forEach(event => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "av-timeline-item";


                const dot =
                    document.createElement(
                        "div"
                    );

                dot.className =
                    "av-timeline-dot";


                const content =
                    document.createElement(
                        "div"
                    );


                const time =
                    document.createElement(
                        "div"
                    );

                time.className =
                    "av-timeline-time";

                time.textContent =
                    this.formatDate(
                        event.timestamp
                    );


                const title =
                    document.createElement(
                        "div"
                    );

                title.className =
                    "av-timeline-title";

                title.textContent =
                    event.title;


                content.appendChild(
                    time
                );

                content.appendChild(
                    title
                );


                if (
                    event.description
                ) {

                    const description =
                        document.createElement(
                            "div"
                        );

                    description.style.color =
                        "var(--av-muted)";

                    description.style.fontSize =
                        ".82rem";

                    description.textContent =
                        event.description;

                    content.appendChild(
                        description
                    );

                }


                item.appendChild(
                    dot
                );

                item.appendChild(
                    content
                );

                container.appendChild(
                    item
                );

            });

    },


    formatDate(value) {

        if (!value) {
            return "Unknown";
        }

        const date =
            new Date(value);

        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return "Unknown";
        }

        return date.toLocaleString(
            undefined,
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );

    },


    /* =====================================================
       REVEAL
       ===================================================== */

    initializeReveal() {

        const elements =
            document.querySelectorAll(
                ".av-reveal"
            );


        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(
                element =>
                    element.classList.add(
                        "av-visible"
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
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "av-visible"
                                    );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .08
                }
            );


        elements.forEach(
            element =>
                observer.observe(
                    element
                )
        );

    },


    /* =====================================================
       PREMIUM 3D CARDS
       ===================================================== */

    initialize3D() {

        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }


        document
            .querySelectorAll(
                ".av-3d"
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


                        const rotateX =
                            (y - rect.height / 2)
                            / 28;


                        const rotateY =
                            (rect.width / 2 - x)
                            / 28;


                        card.style.transform =
                            `
                            perspective(1100px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            translateY(-5px)
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

    },


    /* =====================================================
       BUTTON RIPPLE
       ===================================================== */

    initializeRipple() {

        document
            .querySelectorAll(
                ".av-button"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function(event) {

                        const rect =
                            this.getBoundingClientRect();


                        const size =
                            Math.max(
                                this.clientWidth,
                                this.clientHeight
                            );


                        const ripple =
                            document.createElement(
                                "span"
                            );


                        ripple.className =
                            "av-ripple";


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


                        this.appendChild(
                            ripple
                        );


                        setTimeout(
                            () =>
                                ripple.remove(),
                            700
                        );

                    }
                );

            });

    },


    /* =====================================================
       CURSOR GLOW
       ===================================================== */

    initializeMouseGlow() {

        const glow =
            document.querySelector(
                ".mouse-glow"
            );

        if (!glow) {
            return;
        }


        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {

            glow.style.display =
                "none";

            return;

        }


        let frame = null;


        window.addEventListener(
            "mousemove",
            event => {

                if (frame) {
                    cancelAnimationFrame(frame);
                }


                frame =
                    requestAnimationFrame(
                        () => {

                            glow.style.left =
                                `${event.clientX}px`;

                            glow.style.top =
                                `${event.clientY}px`;

                        }
                    );

            }
        );

    },


    /* =====================================================
       CURSOR STAR TRAIL
       ===================================================== */

    initializeCursorStars() {

        const container =
            document.querySelector(
                ".cursor-stars"
            );

        if (!container) {
            return;
        }


        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }


        let lastX = 0;
        let lastY = 0;
        let lastTime = 0;


        window.addEventListener(
            "mousemove",
            event => {

                const now =
                    performance.now();


                if (
                    now - lastTime < 35
                ) {
                    return;
                }


                const distance =
                    Math.hypot(
                        event.clientX - lastX,
                        event.clientY - lastY
                    );


                if (
                    distance < 8
                ) {
                    return;
                }


                lastX =
                    event.clientX;

                lastY =
                    event.clientY;

                lastTime =
                    now;


                const star =
                    document.createElement(
                        "span"
                    );


                star.className =
                    "cursor-star";


                star.style.left =
                    `${event.clientX}px`;

                star.style.top =
                    `${event.clientY}px`;


                const scale =
                    .6 +
                    Math.random() * .8;


                star.style.transform =
                    `
                    translate(-50%, -50%)
                    rotate(45deg)
                    scale(${scale})
                    `;


                container.appendChild(
                    star
                );


                setTimeout(
                    () =>
                        star.remove(),
                    720
                );

            }
        );

    },


    /* =====================================================
       FIREFLIES
       ===================================================== */

    createFireflies() {

        const container =
            document.querySelector(
                ".fireflies"
            );

        if (!container) {
            return;
        }


        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }


        const count =
            window.innerWidth < 700
                ? 14
                : 30;


        for (
            let i = 0;
            i < count;
            i++
        ) {

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
                `${4 + Math.random() * 8}s`;


            firefly.style.animationDelay =
                `${Math.random() * 6}s`;


            container.appendChild(
                firefly
            );

        }

    },


    /* =====================================================
       FLOATING LEAVES
       ===================================================== */

    createLeaves() {

        const container =
            document.querySelector(
                ".floating-leaves"
            );

        if (!container) {
            return;
        }


        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }


        const count =
            window.innerWidth < 700
                ? 8
                : 15;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const leaf =
                document.createElement(
                    "span"
                );


            leaf.className =
                "leaf";


            leaf.style.left =
                `${Math.random() * 100}%`;


            leaf.style.animationDuration =
                `${10 + Math.random() * 14}s`;


            leaf.style.animationDelay =
                `${-Math.random() * 18}s`;


            const scale =
                .55 +
                Math.random() * .9;


            leaf.style.transform =
                `scale(${scale})`;


            leaf.style.opacity =
                .25 +
                Math.random() * .45;


            container.appendChild(
                leaf
            );

        }

    },


    /* =====================================================
       PARTICLES
       ===================================================== */

    createParticles() {

        const container =
            document.querySelector(
                ".particle-field"
            );

        if (!container) {
            return;
        }


        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }


        const count =
            window.innerWidth < 700
                ? 18
                : 40;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "particle";


            particle.style.left =
                `${Math.random() * 100}%`;


            particle.style.top =
                `${Math.random() * 100}%`;


            particle.style.animationDuration =
                `${8 + Math.random() * 14}s`;


            particle.style.animationDelay =
                `${-Math.random() * 15}s`;


            container.appendChild(
                particle
            );

        }

    },


    /* =====================================================
       BACKGROUND PARALLAX
       ===================================================== */

    initializeParallax() {

        const background =
            document.querySelector(
                ".background-image"
            );


        if (!background) {
            return;
        }


        if (
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {
            return;
        }


        let frame = null;


        window.addEventListener(
            "mousemove",
            event => {

                if (frame) {
                    cancelAnimationFrame(frame);
                }


                frame =
                    requestAnimationFrame(
                        () => {

                            const x =
                                (
                                    event.clientX /
                                    window.innerWidth -
                                    .5
                                ) * 7;


                            const y =
                                (
                                    event.clientY /
                                    window.innerHeight -
                                    .5
                                ) * 7;


                            background.style.transform =
                                `
                                translate3d(
                                    ${x}px,
                                    ${y}px,
                                    0
                                )
                                scale(1.035)
                                `;

                        }
                    );

            }
        );

    },


    /* =====================================================
       NOTIFICATIONS
       ===================================================== */

    initializeNotifications() {

        document
            .querySelectorAll(
                "[data-notification]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const data =
                            this.getData();


                        const count =
                            data.notifications
                                ?.length || 0;


                        this.showToast(

                            count
                                ? `${count} notification(s) in your ecosystem.`
                                : "No new ecosystem notifications.",

                            "info"

                        );

                    }
                );

            });

    },


    /* =====================================================
       TOAST
       ===================================================== */

    showToast(
        message,
        type = "info"
    ) {

        let container =
            document.querySelector(
                ".av-toast-container"
            );


        if (!container) {

            container =
                document.createElement(
                    "div"
                );

            container.className =
                "av-toast-container";


            Object.assign(
                container.style,
                {
                    position: "fixed",
                    right: "22px",
                    bottom: "22px",
                    zIndex: "9000",
                    display: "grid",
                    gap: "10px"
                }
            );


            document.body.appendChild(
                container
            );

        }


        const toast =
            document.createElement(
                "div"
            );


        Object.assign(
            toast.style,
            {
                minWidth: "280px",
                maxWidth: "420px",
                padding: "14px 17px",
                border:
                    "1px solid rgba(175,255,210,.2)",
                borderRadius: "15px",
                background:
                    "rgba(3,22,12,.92)",
                color: "#f4fff8",
                boxShadow:
                    "0 20px 55px rgba(0,0,0,.4)",
                backdropFilter:
                    "blur(18px)",
                opacity: "0",
                transform:
                    "translateY(10px)",
                transition:
                    "opacity .25s ease, transform .25s ease"
            }
        );


        toast.textContent =
            message;


        container.appendChild(
            toast
        );


        requestAnimationFrame(
            () => {

                toast.style.opacity =
                    "1";

                toast.style.transform =
                    "translateY(0)";

            }
        );


        setTimeout(
            () => {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateY(10px)";


                setTimeout(
                    () =>
                        toast.remove(),
                    300
                );

            },
            3500
        );

    },


    /* =====================================================
       YEAR
       ===================================================== */

    initializeYear() {

        document
            .querySelectorAll(
                "[data-year]"
            )
            .forEach(element => {

                element.textContent =
                    new Date()
                        .getFullYear();

            });

    },


    /* =====================================================
       DASHBOARD INITIALIZATION
       ===================================================== */

    initializeDashboard() {

        this.populateUser();

        this.initializeRoleButtons();

        this.initializeModals();

        this.initializeNotifications();

        this.initializeSearch();

        this.initializeReveal();

        this.initialize3D();

        this.initializeRipple();

        this.initializeMouseGlow();

        this.initializeCursorStars();

        this.initializeParallax();

        this.createFireflies();

        this.createLeaves();

        this.createParticles();

        this.initializeYear();

        this.loadActivity();

    },


    /* =====================================================
       GLOBAL INITIALIZATION
       ===================================================== */

    init() {

        this.initializeModals();

        this.initializeNotifications();

        this.initializeSearch();

        this.initializeReveal();

        this.initialize3D();

        this.initializeRipple();

        this.initializeMouseGlow();

        this.initializeCursorStars();

        this.initializeParallax();

        this.createFireflies();

        this.createLeaves();

        this.createParticles();

        this.initializeYear();

    }

};


/* =========================================================
   GLOBAL ACCESS
   ========================================================= */

window.AgriVisionCore =
    AgriVisionCore;


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        AgriVisionCore.init();

    }
);
/* ============================================================
   AGRIVISION KARNATAKA
   FARMER PORTAL EFFECT + DATA ENGINE
   APPEND TO CORE.JS
   ============================================================ */

(function(){

    "use strict";


    /* ========================================================
       STORAGE
       ======================================================== */

    const FARMER_STORAGE_KEY =
        "AgriVisionData";


    /* ========================================================
       HELPERS
       ======================================================== */

    const farmerQuery =
        selector =>
            document.querySelector(
                selector
            );


    const farmerQueryAll =
        selector =>
            [
                ...document.querySelectorAll(
                    selector
                )
            ];


    const farmerEscape =
        value =>
            String(
                value ?? ""
            )
            .replace(/&/g,"&amp;")
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;")
            .replace(/'/g,"&#039;");


    /* ========================================================
       LOAD USER
       ======================================================== */

    function farmerLoadUser(){

        try{

            const raw =
                localStorage.getItem(
                    FARMER_STORAGE_KEY
                );


            if(!raw){

                return {};

            }


            const data =
                JSON.parse(
                    raw
                );


            return data.user || {};

        }catch(error){

            console.warn(
                "AgriVision Farmer user data unavailable:",
                error
            );

            return {};

        }

    }


    /* ========================================================
       RENDER USER
       ======================================================== */

    function farmerRenderUser(){

        const user =
            farmerLoadUser();


        const name =
            user.name ||
            "Farmer";


        const id =
            user.id ||
            "—";


        const location =
            user.location ||
            user.village ||
            "Karnataka";


        farmerQueryAll(
            "[data-farmer-name]"
        )
        .forEach(
            element => {

                element.textContent =
                    name;

            }
        );


        farmerQueryAll(
            "[data-farmer-id]"
        )
        .forEach(
            element => {

                element.textContent =
                    id;

            }
        );


        farmerQueryAll(
            "[data-farmer-location]"
        )
        .forEach(
            element => {

                element.textContent =
                    location;

            }
        );


        farmerQueryAll(
            "[data-farmer-avatar]"
        )
        .forEach(
            element => {

                element.textContent =
                    name
                    .trim()
                    .charAt(0)
                    .toUpperCase()
                    ||
                    "F";

            }
        );

    }


    /* ========================================================
       YEAR
       ======================================================== */

    function farmerYear(){

        const year =
            new Date()
            .getFullYear();


        farmerQueryAll(
            "[data-farmer-year]"
        )
        .forEach(
            element => {

                element.textContent =
                    year;

            }
        );

    }


    /* ========================================================
       MOUSE GLOW
       ======================================================== */

    function farmerMouseGlow(){

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
                                "--farmer-mouse-x",
                                `${event.clientX}px`
                            );


                        document.documentElement
                            .style
                            .setProperty(
                                "--farmer-mouse-y",
                                `${event.clientY}px`
                            );


                        scheduled =
                            false;

                    }
                );

            },
            {
                passive:true
            }
        );

    }


    /* ========================================================
       STAR CURSOR
       ======================================================== */

    function farmerStarCursor(){

        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.className =
            "farmer-star-canvas";


        Object.assign(
            canvas.style,
            {

                position:"fixed",

                inset:"0",

                width:"100%",

                height:"100%",

                pointerEvents:"none",

                zIndex:"9999"

            }
        );


        document.body.appendChild(
            canvas
        );


        const ctx =
            canvas.getContext(
                "2d"
            );


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


        function addStar(
            x,
            y
        ){

            stars.push({

                x:x,

                y:y,

                vx:
                    (Math.random()-.5)
                    *1.4,

                vy:
                    (Math.random()-.5)
                    *1.4,

                size:
                    Math.random()
                    *2.4
                    +.8,

                life:1,

                decay:
                    Math.random()
                    *.022
                    +.014,

                colour:
                    colours[
                        Math.floor(
                            Math.random()
                            *
                            colours.length
                        )
                    ]

            });


            if(
                stars.length > 180
            ){

                stars.splice(
                    0,
                    stars.length-180
                );

            }

        }


        window.addEventListener(
            "mousemove",
            event => {

                const distance =
                    Math.hypot(
                        event.clientX-lastX,
                        event.clientY-lastY
                    );


                if(
                    distance > 5
                ){

                    addStar(
                        event.clientX,
                        event.clientY
                    );


                    if(
                        Math.random()>.45
                    ){

                        addStar(
                            event.clientX+
                            (Math.random()-.5)*15,

                            event.clientY+
                            (Math.random()-.5)*15
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
                Math.PI/4
            );


            ctx.fillStyle =
                star.colour;


            ctx.shadowColor =
                star.colour;


            ctx.shadowBlur =
                14;


            const size =
                star.size;


            ctx.fillRect(
                -size/2,
                -size/2,
                size,
                size
            );


            ctx.restore();

        }


        function animate(){

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            for(
                let i=stars.length-1;
                i>=0;
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


                drawStar(
                    star
                );


                if(
                    star.life<=0
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
       FLOATING LEAVES
       ======================================================== */

    function farmerLeaves(){

        const leaves = [

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
                "farmer-leaf";


            leaf.textContent =
                leaves[
                    Math.floor(
                        Math.random()
                        *
                        leaves.length
                    )
                ];


            leaf.style.left =
                `${Math.random()*100}%`;


            leaf.style.fontSize =
                `${14+Math.random()*18}px`;


            leaf.style.animationDuration =
                `${9+Math.random()*9}s`;


            leaf.style.animationDelay =
                `${Math.random()*2}s`;


            document.body.appendChild(
                leaf
            );


            setTimeout(
                () => {

                    leaf.remove();

                },
                19000
            );

        }


        setInterval(
            createLeaf,
            1700
        );

    }


    /* ========================================================
       FIREFLIES
       ======================================================== */

    function farmerFireflies(){

        const container =
            farmerQuery(
                ".farmer-fireflies"
            );


        if(!container){

            return;

        }


        function createFirefly(){

            const firefly =
                document.createElement(
                    "span"
                );


            firefly.className =
                "farmer-firefly";


            firefly.style.left =
                `${Math.random()*100}%`;


            firefly.style.top =
                `${25+Math.random()*75}%`;


            firefly.style.animationDuration =
                `${6+Math.random()*8}s`;


            firefly.style.animationDelay =
                `${Math.random()*4}s`;


            container.appendChild(
                firefly
            );


            setTimeout(
                () => {

                    firefly.remove();

                },
                15000
            );

        }


        for(
            let i=0;
            i<16;
            i++
        ){

            createFirefly();

        }


        setInterval(
            createFirefly,
            1300
        );

    }


    /* ========================================================
       REVEAL
       ======================================================== */

    function farmerReveal(){

        const elements =
            farmerQueryAll(
                "[data-farmer-reveal]"
            );


        if(
            !elements.length
        ){

            return;

        }


        if(
            !(
                "IntersectionObserver"
                in
                window
            )
        ){

            elements.forEach(
                element => {

                    element.classList.add(
                        "farmer-revealed"
                    );

                }
            );

            return;

        }


        elements.forEach(
            element => {

                element.classList.add(
                    "farmer-before-reveal"
                );

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


                            entry.target.classList.remove(
                                "farmer-before-reveal"
                            );


                            entry.target.classList.add(
                                "farmer-revealed"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold:.12
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
       CARD TILT
       ======================================================== */

    function farmerCardMotion(){

        const cards =
            farmerQueryAll(
                ".farmer-system-card"
            );


        if(
            window.matchMedia(
                "(prefers-reduced-motion:reduce)"
            ).matches
        ){

            return;

        }


        cards.forEach(
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
                            )
                            /
                            rect.width;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            )
                            /
                            rect.height;


                        const rotateX =
                            (
                                .5-y
                            )*2.5;


                        const rotateY =
                            (
                                x-.5
                            )*2.5;


                        card.style.transform =
                            `
                            translateY(-9px)
                            perspective(1000px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
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

            }
        );

    }


    /* ========================================================
       NOTIFICATIONS
       ======================================================== */

    function farmerNotifications(){

        const button =
            farmerQuery(
                "[data-farmer-notification]"
            );


        if(!button){

            return;

        }


        button.addEventListener(
            "click",
            () => {

                let message =
                    "Your crop, market, order, logistics and finance updates will appear here.";


                try{

                    const raw =
                        localStorage.getItem(
                            FARMER_STORAGE_KEY
                        );


                    if(raw){

                        const data =
                            JSON.parse(
                                raw
                            );


                        if(
                            Array.isArray(
                                data.notifications
                            )
                            &&
                            data.notifications.length
                        ){

                            const notification =
                                data.notifications[0];


                            message =
                                notification.message
                                ||
                                message;

                        }

                    }

                }catch(error){

                    console.warn(error);

                }


                farmerToast(
                    "AgriVision Updates",
                    message
                );

            }
        );

    }


    /* ========================================================
       TOAST
       ======================================================== */

    function farmerToast(
        title,
        message
    ){

        const old =
            farmerQuery(
                ".farmer-portal-toast"
            );


        if(old){

            old.remove();

        }


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "farmer-portal-toast";


        toast.innerHTML = `

            <strong>
                ${farmerEscape(title)}
            </strong>

            <p>
                ${farmerEscape(message)}
            </p>

        `;


        Object.assign(
            toast.style,
            {

                position:"fixed",

                right:"25px",

                bottom:"25px",

                zIndex:"10050",

                width:"min(380px,calc(100vw - 35px))",

                padding:"20px",

                border:"1px solid rgba(22,243,154,.3)",

                borderRadius:"18px",

                background:"rgba(2,20,13,.90)",

                backdropFilter:"blur(22px)",

                boxShadow:"0 25px 80px rgba(0,0,0,.35)",

                color:"#fff",

                transform:"translateY(20px)",

                opacity:"0",

                transition:"all .35s ease"

            }
        );


        const paragraph =
            toast.querySelector(
                "p"
            );


        paragraph.style.margin =
            "8px 0 0";


        paragraph.style.fontSize =
            "12px";


        paragraph.style.lineHeight =
            "1.6";


        paragraph.style.color =
            "rgba(255,255,255,.6)";


        document.body.appendChild(
            toast
        );


        requestAnimationFrame(
            () => {

                toast.style.opacity =
                    "1";

                toast.style.transform =
                    "translateY(0)";

            }
        );


        setTimeout(
            () => {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateY(20px)";


                setTimeout(
                    () => toast.remove(),
                    350
                );

            },
            4200
        );

    }


    /* ========================================================
       INITIALISE
       ======================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            if(
                document.body.dataset.corePage
                !==
                "farmer-portal"
            ){

                return;

            }


            farmerRenderUser();

            farmerYear();

            farmerMouseGlow();

            farmerStarCursor();

            farmerLeaves();

            farmerFireflies();

            farmerReveal();

            farmerCardMotion();

            farmerNotifications();

        }
    );

})();
/* ============================================================
   AGRIVISION KARNATAKA
   CORE OPERATION ENGINE
   FILE: assets/js/core.js

   Shared by:
   - Dashboard
   - Farmer module
   - Buyer module
   - Logistics module
   - Services
   - Finance
   - Driver
   - All operational sub-pages

   CORE FEATURES
   ------------------------------------------------------------
   - Unique user data
   - Shared local data store
   - Farms
   - Crops
   - Marketplace listings
   - Buyer requests
   - Negotiations
   - Orders
   - Logistics
   - Services
   - Finance
   - Activities
   - Notifications
   - Form validation
   - Success celebrations
   - Toast notifications
   - Navigation helpers
   - Dashboard synchronization
   ============================================================ */

"use strict";


/* ============================================================
   GLOBAL AGRIVISION OBJECT
   ============================================================ */

window.AgriVision =
    window.AgriVision || {};


/* ============================================================
   CONFIGURATION
   ============================================================ */

const AG_CORE_STORAGE =
    "AgriVisionData";

const AG_CORE_VERSION =
    "7.0";


/* ============================================================
   BASIC HELPERS
   ============================================================ */

function agCoreQuery(
    selector,
    parent = document
){

    return parent.querySelector(
        selector
    );

}


function agCoreQueryAll(
    selector,
    parent = document
){

    return [
        ...parent.querySelectorAll(
            selector
        )
    ];

}


function agCoreNumber(
    value
){

    const number =
        Number(value);

    return Number.isFinite(number)
        ? number
        : 0;

}


function agCoreId(
    prefix
){

    const time =
        Date.now()
        .toString(36)
        .toUpperCase();

    const random =
        Math.random()
        .toString(36)
        .substring(
            2,
            8
        )
        .toUpperCase();

    return (
        prefix +
        "-" +
        time +
        "-" +
        random
    );

}


function agCoreNow(){

    return new Date()
        .toISOString();

}


function agCoreMoney(
    value
){

    return new Intl.NumberFormat(
        "en-IN",
        {
            style:"currency",
            currency:"INR",
            maximumFractionDigits:0
        }
    ).format(
        agCoreNumber(value)
    );

}


function agCoreEscape(
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
   DEFAULT DATA STRUCTURE
   ============================================================ */

function agCoreEmptyStore(){

    return {

        version:
            AG_CORE_VERSION,

        user:{
            id:"",
            name:"",
            role:"",
            roles:[],
            email:"",
            phone:"",
            state:"Karnataka",
            district:"",
            taluk:"",
            village:"",
            address:"",
            pincode:"",
            createdAt:""
        },

        farms:[],

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


/* ============================================================
   LOAD DATA
   ============================================================ */

function agCoreLoad(){

    try{

        const raw =
            localStorage.getItem(
                AG_CORE_STORAGE
            );


        if(!raw){

            return agCoreEmptyStore();

        }


        const saved =
            JSON.parse(
                raw
            );


        const base =
            agCoreEmptyStore();


        return {

            ...base,

            ...saved,

            user:{
                ...base.user,
                ...(saved.user || {})
            },

            farms:
                Array.isArray(
                    saved.farms
                )
                    ? saved.farms
                    : [],

            crops:
                Array.isArray(
                    saved.crops
                )
                    ? saved.crops
                    : [],

            listings:
                Array.isArray(
                    saved.listings
                )
                    ? saved.listings
                    : [],

            buyerRequests:
                Array.isArray(
                    saved.buyerRequests
                )
                    ? saved.buyerRequests
                    : [],

            negotiations:
                Array.isArray(
                    saved.negotiations
                )
                    ? saved.negotiations
                    : [],

            orders:
                Array.isArray(
                    saved.orders
                )
                    ? saved.orders
                    : [],

            logistics:
                Array.isArray(
                    saved.logistics
                )
                    ? saved.logistics
                    : [],

            services:
                Array.isArray(
                    saved.services
                )
                    ? saved.services
                    : [],

            finance:
                Array.isArray(
                    saved.finance
                )
                    ? saved.finance
                    : [],

            activities:
                Array.isArray(
                    saved.activities
                )
                    ? saved.activities
                    : [],

            notifications:
                Array.isArray(
                    saved.notifications
                )
                    ? saved.notifications
                    : []

        };

    }catch(error){

        console.error(
            "AgriVision data loading error:",
            error
        );

        return agCoreEmptyStore();

    }

}


/* ============================================================
   GLOBAL STORE
   ============================================================ */

let agCoreStore =
    agCoreLoad();


/* ============================================================
   SAVE DATA
   ============================================================ */

function agCoreSave(){

    try{

        localStorage.setItem(
            AG_CORE_STORAGE,
            JSON.stringify(
                agCoreStore
            )
        );

        return true;

    }catch(error){

        console.error(
            "AgriVision data save error:",
            error
        );

        return false;

    }

}


/* ============================================================
   PUBLIC STORE ACCESS
   ============================================================ */

AgriVision.store =
    function(){

        return agCoreStore;

    };


AgriVision.save =
    agCoreSave;


/* ============================================================
   USER
   ============================================================ */

AgriVision.getUser =
    function(){

        return agCoreStore.user;

    };


AgriVision.setUser =
    function(
        userData
    ){

        agCoreStore.user = {

            ...agCoreStore.user,

            ...(userData || {})

        };


        agCoreSave();


        return agCoreStore.user;

    };


/* ============================================================
   ACTIVITY SYSTEM
   ============================================================ */

function agCoreActivity(
    type,
    title,
    description,
    reference = "",
    module = "farmer"
){

    const activity = {

        id:
            agCoreId("ACT"),

        userId:
            agCoreStore.user.id,

        type,

        title,

        description,

        reference,

        module,

        status:
            "SUCCESS",

        timestamp:
            agCoreNow()

    };


    agCoreStore.activities.unshift(
        activity
    );


    if(
        agCoreStore.activities.length >
        250
    ){

        agCoreStore.activities =
            agCoreStore.activities.slice(
                0,
                250
            );

    }


    agCoreSave();


    return activity;

}


AgriVision.activity =
    agCoreActivity;


/* ============================================================
   NOTIFICATION SYSTEM
   ============================================================ */

function agCoreNotification(
    title,
    message,
    type = "info",
    reference = ""
){

    const notification = {

        id:
            agCoreId("NTF"),

        userId:
            agCoreStore.user.id,

        title,

        message,

        type,

        reference,

        read:false,

        timestamp:
            agCoreNow()

    };


    agCoreStore.notifications.unshift(
        notification
    );


    agCoreStore.notifications =
        agCoreStore.notifications.slice(
            0,
            100
        );


    agCoreSave();


    return notification;

}


AgriVision.notification =
    agCoreNotification;


/* ============================================================
   TOAST
   ============================================================ */

function agCoreToast(
    title,
    message,
    type = "success"
){

    const existing =
        document.querySelector(
            ".ag-core-toast"
        );


    if(existing){

        existing.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `ag-core-toast ${type}`;


    toast.innerHTML = `

        <div class="ag-core-toast-icon">

            ${
                type === "success"
                    ? "✓"
                    : type === "warning"
                        ? "!"
                        : type === "error"
                            ? "×"
                            : "i"
            }

        </div>

        <div>

            <div class="ag-core-toast-title">

                ${agCoreEscape(title)}

            </div>

            <div class="ag-core-toast-message">

                ${agCoreEscape(message)}

            </div>

        </div>

    `;


    document.body.appendChild(
        toast
    );


    requestAnimationFrame(
        () => {

            toast.classList.add(
                "show"
            );

        }
    );


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );


            setTimeout(
                () => {

                    toast.remove();

                },
                350
            );

        },
        4200
    );

}


AgriVision.toast =
    agCoreToast;


/* ============================================================
   SUCCESS CELEBRATION
   ============================================================ */

function agCoreSuccess(
    options = {}
){

    const {

        title =
            "Operation Successful",

        message =
            "Your information has been saved successfully.",

        reference = "",

        nextHref = "",

        nextText =
            "CONTINUE",

        activityType =
            "operation",

        activityDescription =
            message,

        module =
            "farmer"

    } = options;


    /* --------------------------------------------------------
       Activity is created before celebration
       -------------------------------------------------------- */

    agCoreActivity(
        activityType,
        title,
        activityDescription,
        reference,
        module
    );


    /* --------------------------------------------------------
       Notification
       -------------------------------------------------------- */

    agCoreNotification(
        title,
        message,
        "success",
        reference
    );


    /* --------------------------------------------------------
       Remove existing celebration
       -------------------------------------------------------- */

    const old =
        document.querySelector(
            ".ag-core-success-overlay"
        );


    if(old){

        old.remove();

    }


    /* --------------------------------------------------------
       Overlay
       -------------------------------------------------------- */

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "ag-core-success-overlay";


    overlay.innerHTML = `

        <div class="ag-core-success-backdrop"></div>

        <div class="ag-core-success-box">

            <div class="ag-core-success-glow"></div>

            <div class="ag-core-success-particles">

                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>

            </div>

            <div class="ag-core-success-symbol">

                <span>✓</span>

            </div>

            <div class="ag-core-success-kicker">

                AGRIVISION OPERATION COMPLETE

            </div>

            <h2 class="ag-core-success-title">

                ${agCoreEscape(title)}

            </h2>

            <p class="ag-core-success-message">

                ${agCoreEscape(message)}

            </p>

            ${
                reference
                ?
                `
                    <div class="ag-core-success-reference">

                        <span>REFERENCE</span>

                        <strong>
                            ${agCoreEscape(reference)}
                        </strong>

                    </div>
                `
                :
                ""
            }

            <div class="ag-core-success-actions">

                <button
                    type="button"
                    class="ag-core-success-button primary"
                    data-ag-core-close
                >

                    ${agCoreEscape(nextText)}

                </button>

                ${
                    nextHref
                    ?
                    `
                        <a
                            href="${agCoreEscape(nextHref)}"
                            class="ag-core-success-button secondary"
                        >

                            NEXT STEP
                            <span>→</span>

                        </a>
                    `
                    :
                    ""
                }

            </div>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    requestAnimationFrame(
        () => {

            overlay.classList.add(
                "show"
            );

        }
    );


    const close =
        () => {

            overlay.classList.remove(
                "show"
            );


            setTimeout(
                () => {

                    overlay.remove();

                },
                350
            );

        };


    const closeButton =
        overlay.querySelector(
            "[data-ag-core-close]"
        );


    if(closeButton){

        closeButton.addEventListener(
            "click",
            close
        );

    }


    const backdrop =
        overlay.querySelector(
            ".ag-core-success-backdrop"
        );


    if(backdrop){

        backdrop.addEventListener(
            "click",
            close
        );

    }


    agCoreCelebrationParticles();

}


AgriVision.success =
    agCoreSuccess;


/* ============================================================
   CELEBRATION PARTICLES
   ============================================================ */

function agCoreCelebrationParticles(){

    const symbols = [
        "✦",
        "✧",
        "✹",
        "🍃",
        "🌱"
    ];


    for(
        let i = 0;
        i < 55;
        i++
    ){

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "ag-core-particle";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            "50%";


        particle.style.top =
            "50%";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            90 +
            Math.random() *
            320;


        particle.style.setProperty(
            "--particle-x",
            `${Math.cos(angle) * distance}px`
        );


        particle.style.setProperty(
            "--particle-y",
            `${Math.sin(angle) * distance}px`
        );


        particle.style.setProperty(
            "--particle-r",
            `${Math.random() * 720 - 360}deg`
        );


        particle.style.animationDelay =
            `${Math.random() * .35}s`;


        document.body.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            1800
        );

    }

}


/* ============================================================
   FORM OBJECT
   ============================================================ */

function agCoreFormData(
    form
){

    const data = {};


    new FormData(
        form
    ).forEach(
        (
            value,
            key
        ) => {

            data[key] =
                typeof value === "string"
                    ? value.trim()
                    : value;

        }
    );


    return data;

}


AgriVision.formData =
    agCoreFormData;


/* ============================================================
   FORM VALIDATION
   ============================================================ */

function agCoreValidate(
    form
){

    const fields =
        agCoreQueryAll(
            "[required]",
            form
        );


    let firstInvalid =
        null;


    fields.forEach(
        field => {

            const value =
                String(
                    field.value ?? ""
                ).trim();


            const invalid =
                !value;


            field.classList.toggle(
                "ag-core-invalid",
                invalid
            );


            if(
                invalid &&
                !firstInvalid
            ){

                firstInvalid =
                    field;

            }

        }
    );


    if(firstInvalid){

        firstInvalid.focus();


        agCoreToast(
            "Information Required",
            "Please complete the highlighted fields.",
            "warning"
        );


        return false;

    }


    return true;

}


AgriVision.validate =
    agCoreValidate;


/* ============================================================
   FARM
   ============================================================ */

function agCoreAddFarm(
    data
){

    const farm = {

        id:
            agCoreId("FARM"),

        farmerId:
            agCoreStore.user.id,

        name:
            data.farmName ||
            data.name ||
            "Farm",

        area:
            agCoreNumber(
                data.area
            ),

        areaUnit:
            data.areaUnit ||
            "acres",

        district:
            data.district ||
            agCoreStore.user.district,

        taluk:
            data.taluk ||
            agCoreStore.user.taluk,

        village:
            data.village ||
            agCoreStore.user.village,

        location:
            data.location ||
            "",

        soil:
            data.soil ||
            "",

        irrigation:
            data.irrigation ||
            "",

        status:
            "ACTIVE",

        createdAt:
            agCoreNow(),

        updatedAt:
            agCoreNow()

    };


    agCoreStore.farms.push(
        farm
    );


    agCoreSave();


    return farm;

}


AgriVision.addFarm =
    agCoreAddFarm;


/* ============================================================
   CROP
   ============================================================ */

function agCoreAddCrop(
    data
){

    const crop = {

        id:
            agCoreId("CROP"),

        farmerId:
            agCoreStore.user.id,

        farmId:
            data.farmId ||
            "",

        name:
            data.cropName ||
            data.name ||
            "",

        category:
            data.category ||
            "",

        variety:
            data.variety ||
            "",

        season:
            data.season ||
            "",

        area:
            agCoreNumber(
                data.area
            ),

        areaUnit:
            data.areaUnit ||
            "acres",

        quantity:
            agCoreNumber(
                data.quantity
            ),

        unit:
            data.unit ||
            "kg",

        expectedHarvest:
            data.expectedHarvest ||
            "",

        expectedPrice:
            agCoreNumber(
                data.expectedPrice
            ),

        quality:
            data.quality ||
            "",

        irrigation:
            data.irrigation ||
            "",

        notes:
            data.notes ||
            "",

        status:
            "ACTIVE",

        createdAt:
            agCoreNow(),

        updatedAt:
            agCoreNow()

    };


    agCoreStore.crops.push(
        crop
    );


    agCoreSave();


    return crop;

}


AgriVision.addCrop =
    agCoreAddCrop;


/* ============================================================
   UPDATE CROP
   ============================================================ */

function agCoreUpdateCrop(
    cropId,
    updates
){

    const crop =
        agCoreStore.crops.find(
            item =>
                item.id ===
                cropId
        );


    if(!crop){

        return null;

    }


    Object.assign(
        crop,
        updates || {},
        {
            updatedAt:
                agCoreNow()
        }
    );


    agCoreSave();


    return crop;

}


AgriVision.updateCrop =
    agCoreUpdateCrop;


/* ============================================================
   MARKET LISTING
   ============================================================ */

function agCoreCreateListing(
    data
){

    const crop =
        agCoreStore.crops.find(
            item =>
                item.id ===
                data.cropId
        );


    if(!crop){

        return null;

    }


    const existing =
        agCoreStore.listings.find(
            item =>
                item.cropId ===
                crop.id &&
                item.status ===
                "ACTIVE"
        );


    if(existing){

        return existing;

    }


    crop.status =
        "LISTED";


    crop.updatedAt =
        agCoreNow();


    const listing = {

        id:
            agCoreId("LIST"),

        farmerId:
            agCoreStore.user.id,

        cropId:
            crop.id,

        crop:
            crop.name,

        variety:
            crop.variety,

        quantity:
            crop.quantity,

        unit:
            crop.unit,

        price:
            agCoreNumber(
                data.price ||
                crop.expectedPrice
            ),

        quality:
            data.quality ||
            crop.quality,

        district:
            crop.district ||
            agCoreStore.user.district,

        taluk:
            crop.taluk ||
            agCoreStore.user.taluk,

        village:
            crop.village ||
            agCoreStore.user.village,

        availability:
            data.availability ||
            crop.expectedHarvest,

        description:
            data.description ||
            "",

        status:
            "ACTIVE",

        createdAt:
            agCoreNow(),

        updatedAt:
            agCoreNow()

    };


    agCoreStore.listings.push(
        listing
    );


    agCoreSave();


    return listing;

}


AgriVision.createListing =
    agCoreCreateListing;


/* ============================================================
   BUYER REQUEST
   ============================================================ */

function agCoreCreateBuyerRequest(
    data
){

    const request = {

        id:
            agCoreId("REQ"),

        buyerId:
            data.buyerId ||
            "",

        buyerName:
            data.buyerName ||
            "Buyer",

        cropId:
            data.cropId ||
            "",

        listingId:
            data.listingId ||
            "",

        crop:
            data.crop ||
            "",

        quantity:
            agCoreNumber(
                data.quantity
            ),

        unit:
            data.unit ||
            "kg",

        proposedPrice:
            agCoreNumber(
                data.proposedPrice ||
                data.price
            ),

        requestedDate:
            data.requestedDate ||
            "",

        destination:
            data.destination ||
            "",

        message:
            data.message ||
            "",

        status:
            "PENDING",

        createdAt:
            agCoreNow(),

        updatedAt:
            agCoreNow()

    };


    agCoreStore.buyerRequests.push(
        request
    );


    agCoreSave();


    return request;

}


AgriVision.createBuyerRequest =
    agCoreCreateBuyerRequest;


/* ============================================================
   NEGOTIATION
   ============================================================ */

function agCoreCreateNegotiation(
    data
){

    const negotiation = {

        id:
            agCoreId("NEG"),

        requestId:
            data.requestId ||
            "",

        listingId:
            data.listingId ||
            "",

        cropId:
            data.cropId ||
            "",

        buyerId:
            data.buyerId ||
            "",

        farmerId:
            agCoreStore.user.id,

        quantity:
            agCoreNumber(
                data.quantity
            ),

        price:
            agCoreNumber(
                data.price
            ),

        deliveryDate:
            data.deliveryDate ||
            "",

        message:
            data.message ||
            "",

        side:
            data.side ||
            "FARMER",

        status:
            "OPEN",

        createdAt:
            agCoreNow(),

        updatedAt:
            agCoreNow()

    };


    const request =
        agCoreStore.buyerRequests.find(
            item =>
                item.id ===
                negotiation.requestId
        );


    if(request){

        request.status =
            "NEGOTIATING";

        request.updatedAt =
            agCoreNow();

    }


    agCoreStore.negotiations.push(
        negotiation
    );


    agCoreSave();


    return negotiation;

}


AgriVision.createNegotiation =
    agCoreCreateNegotiation;


/* ============================================================
   ACCEPT OFFER -> ORDER
   ============================================================ */

function agCoreAcceptOffer(
    data
){

    const order = {

        id:
            agCoreId("ORD"),

        negotiationId:
            data.negotiationId ||
            "",

        requestId:
            data.requestId ||
            "",

        listingId:
            data.listingId ||
            "",

        farmerId:
            agCoreStore.user.id,

        farmerName:
            agCoreStore.user.name,

        buyerId:
            data.buyerId ||
            "",

        buyerName:
            data.buyerName ||
            "Buyer",

        cropId:
            data.cropId ||
            "",

        crop:
            data.crop ||
            "",

        quantity:
            agCoreNumber(
                data.quantity
            ),

        unit:
            data.unit ||
            "kg",

        finalPrice:
            agCoreNumber(
                data.finalPrice ||
                data.price
            ),

        deliveryDate:
            data.deliveryDate ||
            "",

        pickupLocation:
            data.pickupLocation ||
            "",

        destination:
            data.destination ||
            "",

        deliveryRequirement:
            data.deliveryRequirement ||
            "",

        status:
            "CONFIRMED",

        logisticsRequired:
            true,

        createdAt:
            agCoreNow(),

        updatedAt:
            agCoreNow()

    };


    const negotiation =
        agCoreStore.negotiations.find(
            item =>
                item.id ===
                order.negotiationId
        );


    if(negotiation){

        negotiation.status =
            "ACCEPTED";

        negotiation.updatedAt =
            agCoreNow();

    }


    const request =
        agCoreStore.buyerRequests.find(
            item =>
                item.id ===
                order.requestId
        );


    if(request){

        request.status =
            "ORDER_CONFIRMED";

        request.updatedAt =
            agCoreNow();

    }


    agCoreStore.orders.push(
        order
    );


    agCoreSave();


    return order;

}


AgriVision.acceptOffer =
    agCoreAcceptOffer;


/* ============================================================
   SERVICE REQUEST
   ============================================================ */

function agCoreCreateService(
    data
){

    const service = {

        id:
            agCoreId("SRV"),

        farmerId:
            agCoreStore.user.id,

        service:
            data.service ||
            data.serviceType ||
            "",

        farmId:
            data.farmId ||
            "",

        cropId:
            data.cropId ||
            "",

        requiredDate:
            data.requiredDate ||
            data.serviceDate ||
            "",

        priority:
            data.priority ||
            "Normal",

        location:
            data.location ||
            "",

        description:
            data.description ||
            "",

        contact:
            data.contact ||
            agCoreStore.user.phone,

        status:
            "REQUESTED",

        createdAt:
            agCoreNow(),

        updatedAt:
            agCoreNow()

    };


    agCoreStore.services.push(
        service
    );


    agCoreSave();


    return service;

}


AgriVision.createService =
    agCoreCreateService;


/* ============================================================
   LOGISTICS REQUEST
   ============================================================ */

function agCoreCreateLogistics(
    data
){

    const order =
        agCoreStore.orders.find(
            item =>
                item.id ===
                data.orderId
        );


    const logistics = {

        id:
            agCoreId("LOG"),

        orderId:
            data.orderId ||
            "",

        farmerId:
            agCoreStore.user.id,

        crop:
            data.crop ||
            order?.crop ||
            "",

        cropId:
            data.cropId ||
            order?.cropId ||
            "",

        quantity:
            agCoreNumber(
                data.quantity ||
                order?.quantity
            ),

        unit:
            data.unit ||
            order?.unit ||
            "kg",

        pickupLocation:
            data.pickupLocation ||
            order?.pickupLocation ||
            "",

        destination:
            data.destination ||
            order?.destination ||
            "",

        pickupDate:
            data.pickupDate ||
            "",

        deliveryDate:
            data.deliveryDate ||
            order?.deliveryDate ||
            "",

        vehicle:
            data.vehicle ||
            "",

        handling:
            data.handling ||
            "",

        contact:
            data.contact ||
            "",

        status:
            "REQUESTED",

        createdAt:
            agCoreNow(),

        updatedAt:
            agCoreNow()

    };


    agCoreStore.logistics.push(
        logistics
    );


    agCoreSave();


    return logistics;

}


AgriVision.createLogistics =
    agCoreCreateLogistics;


/* ============================================================
   LOGISTICS STATUS
   ============================================================ */

function agCoreUpdateLogistics(
    logisticsId,
    status
){

    const allowed = [

        "REQUESTED",
        "ASSIGNED",
        "PICKUP",
        "IN_TRANSIT",
        "DELIVERED",
        "COMPLETED",
        "CANCELLED"

    ];


    if(
        !allowed.includes(
            status
        )
    ){

        return null;

    }


    const logistics =
        agCoreStore.logistics.find(
            item =>
                item.id ===
                logisticsId
        );


    if(!logistics){

        return null;

    }


    logistics.status =
        status;

    logistics.updatedAt =
        agCoreNow();


    const order =
        agCoreStore.orders.find(
            item =>
                item.id ===
                logistics.orderId
        );


    if(
        order &&
        status ===
        "COMPLETED"
    ){

        order.status =
            "COMPLETED";

        order.updatedAt =
            agCoreNow();

    }


    agCoreSave();


    return logistics;

}


AgriVision.updateLogistics =
    agCoreUpdateLogistics;


/* ============================================================
   FINANCE
   ============================================================ */

function agCoreCreateFinance(
    data
){

    const type =
        data.type ||
        "income";


    const amount =
        agCoreNumber(
            data.amount
        );


    if(
        amount <= 0
    ){

        return null;

    }


    const record = {

        id:
            agCoreId(
                type === "income"
                    ? "INC"
                    : "EXP"
            ),

        farmerId:
            agCoreStore.user.id,

        type,

        category:
            data.category ||
            "",

        source:
            data.source ||
            "",

        amount,

        date:
            data.date ||
            new Date()
            .toISOString()
            .slice(
                0,
                10
            ),

        cropId:
            data.cropId ||
            "",

        crop:
            data.crop ||
            "",

        orderId:
            data.orderId ||
            "",

        farmId:
            data.farmId ||
            "",

        description:
            data.description ||
            "",

        paymentStatus:
            data.paymentStatus ||
            (
                type === "income"
                    ? "RECEIVED"
                    : "RECORDED"
            ),

        createdAt:
            agCoreNow()

    };


    agCoreStore.finance.push(
        record
    );


    agCoreSave();


    return record;

}


AgriVision.createFinance =
    agCoreCreateFinance;


/* ============================================================
   FINANCE SUMMARY
   ============================================================ */

AgriVision.financeSummary =
    function(){

        const income =
            agCoreStore.finance
            .filter(
                item =>
                    item.type ===
                    "income"
            )
            .reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    agCoreNumber(
                        item.amount
                    ),
                0
            );


        const expenses =
            agCoreStore.finance
            .filter(
                item =>
                    item.type ===
                    "expense"
            )
            .reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    agCoreNumber(
                        item.amount
                    ),
                0
            );


        const profit =
            income -
            expenses;


        const margin =
            income > 0
                ?
                (
                    profit /
                    income
                ) *
                100
                :
                0;


        return {

            income,

            expenses,

            profit,

            margin

        };

    };


/* ============================================================
   UNIVERSAL OPERATION COMPLETION
   ============================================================ */

AgriVision.complete =
    function(options = {}){

        agCoreSave();


        agCoreSuccess(
            options
        );


        if(
            typeof window.refreshAgriVisionUI ===
            "function"
        ){

            window.refreshAgriVisionUI();

        }

    };


/* ============================================================
   OPERATION FORM ROUTER
   ============================================================ */

function agCoreBindOperationForms(){

    agCoreQueryAll(
        "[data-ag-operation-form]"
    )
    .forEach(
        form => {

            if(
                form.dataset.coreBound ===
                "true"
            ){

                return;

            }


            form.dataset.coreBound =
                "true";


            form.addEventListener(
                "submit",
                event => {

                    event.preventDefault();


                    if(
                        !agCoreValidate(
                            form
                        )
                    ){

                        return;

                    }


                    const operation =
                        form.dataset.operation;


                    const data =
                        agCoreFormData(
                            form
                        );


                    let result =
                        null;


                    switch(
                        operation
                    ){

                        /* ------------------------------------
                           FARM
                           ------------------------------------ */

                        case "add-farm":

                            result =
                                agCoreAddFarm(
                                    data
                                );


                            form.reset();


                            AgriVision.complete({

                                title:
                                    "Farm Added Successfully",

                                message:
                                    `${result.name} has been added to your farm records.`,

                                reference:
                                    result.id,

                                nextHref:
                                    "farmer-crops.html",

                                nextText:
                                    "VIEW FARM",

                                activityType:
                                    "farm_created",

                                activityDescription:
                                    `Added farm ${result.name}.`,

                                module:
                                    "farmer"

                            });

                            break;


                        /* ------------------------------------
                           CROP
                           ------------------------------------ */

                        case "add-crop":

                            result =
                                agCoreAddCrop(
                                    data
                                );


                            form.reset();


                            AgriVision.complete({

                                title:
                                    "Crop Added Successfully",

                                message:
                                    `${result.name} has been added to your farm records.`,

                                reference:
                                    result.id,

                                nextHref:
                                    "farmer-crops.html",

                                nextText:
                                    "VIEW CROP",

                                activityType:
                                    "crop_created",

                                activityDescription:
                                    `Added ${result.name} to the farm crop records.`,

                                module:
                                    "farmer"

                            });

                            break;


                        /* ------------------------------------
                           LIST CROP
                           ------------------------------------ */

                        case "list-crop":

                            result =
                                agCoreCreateListing(
                                    data
                                );


                            if(!result){

                                agCoreToast(
                                    "Crop Not Found",
                                    "The selected crop could not be found.",
                                    "error"
                                );

                                return;

                            }


                            form.reset();


                            AgriVision.complete({

                                title:
                                    "Crop Listed Successfully",

                                message:
                                    `${result.crop} is now available through the AgriVision marketplace.`,

                                reference:
                                    result.id,

                                nextHref:
                                    "farmer-market.html",

                                nextText:
                                    "VIEW MARKET",

                                activityType:
                                    "crop_listed",

                                activityDescription:
                                    `Published ${result.crop} to the marketplace.`,

                                module:
                                    "market"

                            });

                            break;


                        /* ------------------------------------
                           NEGOTIATION
                           ------------------------------------ */

                        case "negotiation":

                            result =
                                agCoreCreateNegotiation(
                                    data
                                );


                            form.reset();


                            AgriVision.complete({

                                title:
                                    "Offer Submitted Successfully",

                                message:
                                    "Your negotiation offer has been recorded against the transaction.",

                                reference:
                                    result.id,

                                nextHref:
                                    "farmer-market.html",

                                nextText:
                                    "VIEW REQUEST",

                                activityType:
                                    "negotiation_created",

                                activityDescription:
                                    "A negotiation offer was submitted.",

                                module:
                                    "market"

                            });

                            break;


                        /* ------------------------------------
                           ACCEPT OFFER
                           ------------------------------------ */

                        case "accept-offer":

                            result =
                                agCoreAcceptOffer(
                                    data
                                );


                            form.reset();


                            AgriVision.complete({

                                title:
                                    "Order Confirmed Successfully",

                                message:
                                    "The buyer agreement has been finalized and the order is ready for logistics.",

                                reference:
                                    result.id,

                                nextHref:
                                    "farmer-logistics.html",

                                nextText:
                                    "CONTINUE TO LOGISTICS",

                                activityType:
                                    "order_confirmed",

                                activityDescription:
                                    `Order ${result.id} was confirmed for ${result.crop}.`,

                                module:
                                    "market"

                            });

                            break;


                        /* ------------------------------------
                           SERVICE
                           ------------------------------------ */

                        case "service":

                            result =
                                agCoreCreateService(
                                    data
                                );


                            form.reset();


                            AgriVision.complete({

                                title:
                                    "Service Request Submitted",

                                message:
                                    `${result.service} has entered the agricultural service workflow.`,

                                reference:
                                    result.id,

                                nextHref:
                                    "farmer-services.html",

                                nextText:
                                    "VIEW SERVICES",

                                activityType:
                                    "service_requested",

                                activityDescription:
                                    `${result.service} service was requested.`,

                                module:
                                    "services"

                            });

                            break;


                        /* ------------------------------------
                           LOGISTICS
                           ------------------------------------ */

                        case "logistics":

                            result =
                                agCoreCreateLogistics(
                                    data
                                );


                            form.reset();


                            AgriVision.complete({

                                title:
                                    "Transport Request Submitted",

                                message:
                                    "Your order has been connected to the logistics workflow.",

                                reference:
                                    result.id,

                                nextHref:
                                    "farmer-logistics.html",

                                nextText:
                                    "VIEW LOGISTICS",

                                activityType:
                                    "logistics_requested",

                                activityDescription:
                                    `Transport was requested for ${result.crop}.`,

                                module:
                                    "logistics"

                            });

                            break;


                        /* ------------------------------------
                           INCOME
                           ------------------------------------ */

                        case "finance-income":

                            result =
                                agCoreCreateFinance({

                                    ...data,

                                    type:
                                        "income"

                                });


                            if(!result){

                                agCoreToast(
                                    "Invalid Amount",
                                    "Please enter a valid income amount.",
                                    "warning"
                                );

                                return;

                            }


                            form.reset();


                            AgriVision.complete({

                                title:
                                    "Income Recorded Successfully",

                                message:
                                    `${agCoreMoney(result.amount)} has been added to your financial records.`,

                                reference:
                                    result.id,

                                nextHref:
                                    "farmer-finance.html",

                                nextText:
                                    "VIEW FINANCE",

                                activityType:
                                    "income_recorded",

                                activityDescription:
                                    `${agCoreMoney(result.amount)} income was recorded.`,

                                module:
                                    "finance"

                            });

                            break;


                        /* ------------------------------------
                           EXPENSE
                           ------------------------------------ */

                        case "finance-expense":

                            result =
                                agCoreCreateFinance({

                                    ...data,

                                    type:
                                        "expense"

                                });


                            if(!result){

                                agCoreToast(
                                    "Invalid Amount",
                                    "Please enter a valid expense amount.",
                                    "warning"
                                );

                                return;

                            }


                            form.reset();


                            AgriVision.complete({

                                title:
                                    "Expense Recorded Successfully",

                                message:
                                    `${agCoreMoney(result.amount)} has been added to your financial records.`,

                                reference:
                                    result.id,

                                nextHref:
                                    "farmer-finance.html",

                                nextText:
                                    "VIEW FINANCE",

                                activityType:
                                    "expense_recorded",

                                activityDescription:
                                    `${agCoreMoney(result.amount)} expense was recorded.`,

                                module:
                                    "finance"

                            });

                            break;


                        default:

                            agCoreToast(
                                "Operation Not Configured",
                                "This operation has not yet been connected to the shared core engine.",
                                "error"
                            );

                    }

                }
            );

        }
    );

}


/* ============================================================
   ACTIVITY RENDERER
   ============================================================ */

function agCoreRenderActivities(){

    agCoreQueryAll(
        "[data-ag-activity]"
    )
    .forEach(
        container => {

            const activities =
                agCoreStore.activities
                .slice(
                    0,
                    20
                );


            if(
                !activities.length
            ){

                container.innerHTML = `

                    <div class="ag-core-empty">

                        <div class="ag-core-empty-icon">
                            ✦
                        </div>

                        <h3>
                            No activity yet
                        </h3>

                        <p>
                            Your AgriVision activities
                            will appear here as you
                            perform operations.
                        </p>

                    </div>

                `;

                return;

            }


            container.innerHTML = `

                <div class="ag-core-timeline">

                    ${
                        activities
                        .map(
                            activity => {

                                const date =
                                    new Date(
                                        activity.timestamp
                                    );


                                return `

                                    <div class="ag-core-timeline-item">

                                        <div class="ag-core-timeline-dot">
                                            ✓
                                        </div>

                                        <div class="ag-core-timeline-content">

                                            <div class="ag-core-timeline-title">

                                                ${agCoreEscape(
                                                    activity.title
                                                )}

                                            </div>

                                            <div class="ag-core-timeline-description">

                                                ${agCoreEscape(
                                                    activity.description
                                                )}

                                            </div>

                                            <div class="ag-core-timeline-time">

                                                ${date.toLocaleString(
                                                    "en-IN"
                                                )}

                                                ${
                                                    activity.reference
                                                        ?
                                                        ` · ${agCoreEscape(
                                                            activity.reference
                                                        )}`
                                                        :
                                                        ""
                                                }

                                            </div>

                                        </div>

                                    </div>

                                `;

                            }
                        )
                        .join("")
                    }

                </div>

            `;

        }
    );

}


AgriVision.renderActivities =
    agCoreRenderActivities;


/* ============================================================
   NOTIFICATION RENDERER
   ============================================================ */

function agCoreRenderNotifications(){

    agCoreQueryAll(
        "[data-ag-notifications]"
    )
    .forEach(
        container => {

            const notifications =
                agCoreStore.notifications
                .slice(
                    0,
                    15
                );


            if(
                !notifications.length
            ){

                container.innerHTML = `

                    <div class="ag-core-empty">

                        <div class="ag-core-empty-icon">
                            🔔
                        </div>

                        <h3>
                            No notifications
                        </h3>

                        <p>
                            Important ecosystem events
                            will appear here.
                        </p>

                    </div>

                `;

                return;

            }


            container.innerHTML =
                notifications
                .map(
                    notification => `

                        <div class="ag-core-notification">

                            <div class="ag-core-notification-icon">

                                ${
                                    notification.type ===
                                    "success"
                                        ? "✓"
                                        : notification.type ===
                                          "warning"
                                            ? "!"
                                            : "•"
                                }

                            </div>

                            <div>

                                <strong>

                                    ${agCoreEscape(
                                        notification.title
                                    )}

                                </strong>

                                <p>

                                    ${agCoreEscape(
                                        notification.message
                                    )}

                                </p>

                            </div>

                        </div>

                    `
                )
                .join("");

        }
    );

}


AgriVision.renderNotifications =
    agCoreRenderNotifications;


/* ============================================================
   REFRESH UI
   ============================================================ */

function agCoreRefresh(){

    agCoreRenderActivities();

    agCoreRenderNotifications();


    if(
        typeof window.refreshFarmerPage ===
        "function"
    ){

        window.refreshFarmerPage();

    }


    if(
        typeof window.refreshDashboard ===
        "function"
    ){

        window.refreshDashboard();

    }

}


window.refreshAgriVisionUI =
    agCoreRefresh;


/* ============================================================
   INITIALISE
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        agCoreBindOperationForms();

        agCoreRefresh();

    }
);


/* ============================================================
   STORAGE SYNCHRONISATION
   ============================================================ */

window.addEventListener(
    "storage",
    event => {

        if(
            event.key !==
            AG_CORE_STORAGE
        ){

            return;

        }


        agCoreStore =
            agCoreLoad();


        agCoreRefresh();

    }
);


/* ============================================================
   GLOBAL EXPORT
   ============================================================ */

AgriVision.core = {

    getStore:
        () => agCoreStore,

    save:
        agCoreSave,

    getUser:
        () =>
            agCoreStore.user,

    addFarm:
        agCoreAddFarm,

    addCrop:
        agCoreAddCrop,

    updateCrop:
        agCoreUpdateCrop,

    createListing:
        agCoreCreateListing,

    createBuyerRequest:
        agCoreCreateBuyerRequest,

    createNegotiation:
        agCoreCreateNegotiation,

    acceptOffer:
        agCoreAcceptOffer,

    createService:
        agCoreCreateService,

    createLogistics:
        agCoreCreateLogistics,

    updateLogistics:
        agCoreUpdateLogistics,

    createFinance:
        agCoreCreateFinance,

    financeSummary:
        AgriVision.financeSummary,

    activity:
        agCoreActivity,

    notification:
        agCoreNotification,

    success:
        agCoreSuccess,

    toast:
        agCoreToast,

    validate:
        agCoreValidate,

    refresh:
        agCoreRefresh

};


/* ============================================================
   END OF AGRIVISION CORE ENGINE
   ============================================================ */