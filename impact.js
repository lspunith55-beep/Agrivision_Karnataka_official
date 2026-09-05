/* =========================================================
   AGRIVISION KARNATAKA
   IMPACT MODULE ENGINE

   FILE:
   assets/js/impact.js

   IMPORTANT:
   This script only runs on:
   .impact-module-page

   It intentionally avoids generic global function names
   to prevent collisions with the existing script.js.
========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", () => {

    if (
        !document.body.classList.contains(
            "impact-module-page"
        )
    ) {
        return;
    }


    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = selector =>
        document.querySelector(selector);

    const $$ = selector =>
        Array.from(
            document.querySelectorAll(selector)
        );


    /* =====================================================
       YEAR
    ===================================================== */

    const year = $("#impactYear");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       HEADER
    ===================================================== */

    const header =
        $("#impactHeader");

    const nav =
        $("#impactNav");

    const menu =
        $("#impactMenu");


    const updateHeader =
        () => {

            if (!header) {
                return;
            }

            if (
                window.scrollY > 40
            ) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );
            }
        };


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /* =====================================================
       MOBILE NAV
    ===================================================== */

    if (menu && nav) {

        menu.addEventListener(
            "click",
            () => {

                const open =
                    nav.classList.toggle(
                        "open"
                    );

                menu.setAttribute(
                    "aria-expanded",
                    String(open)
                );

                const icon =
                    menu.querySelector("i");

                if (icon) {

                    icon.className =
                        open
                            ? "fa-solid fa-xmark"
                            : "fa-solid fa-bars";
                }
            }
        );


        nav.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        nav.classList.remove(
                            "open"
                        );

                        menu.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        const icon =
                            menu.querySelector("i");

                        if (icon) {

                            icon.className =
                                "fa-solid fa-bars";
                        }
                    }
                );
            });
    }


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(
            '.impact-module-page a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            id
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight + 25
                            : 95;

                    const targetTop =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top: targetTop,
                        behavior: "smooth"
                    });
                }
            );
        });


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progress =
        document.querySelector(
            ".impact-scroll-progress span"
        );


    const updateProgress =
        () => {

            if (!progress) {
                return;
            }

            const documentHeight =
                document.documentElement
                    .scrollHeight;

            const viewport =
                window.innerHeight;

            const max =
                documentHeight -
                viewport;

            if (max <= 0) {
                progress.style.width =
                    "0%";

                return;
            }

            const percentage =
                (
                    window.scrollY /
                    max
                ) * 100;

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
            passive: true
        }
    );


    updateProgress();


    /* =====================================================
       CURSOR LIGHT
    ===================================================== */

    const cursorLight =
        $(".impact-cursor-light");


    if (
        cursorLight &&
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
                passive: true
            }
        );


        const animateCursor =
            () => {

                currentX +=
                    (mouseX - currentX) *
                    0.12;

                currentY +=
                    (mouseY - currentY) *
                    0.12;

                cursorLight.style.left =
                    `${currentX}px`;

                cursorLight.style.top =
                    `${currentY}px`;

                requestAnimationFrame(
                    animateCursor
                );
            };


        animateCursor();
    }


    /* =====================================================
       ATMOSPHERIC PARTICLES
    ===================================================== */

    const particleContainer =
        $(".impact-particles");


    const createParticles =
        () => {

            if (!particleContainer) {
                return;
            }

            const fragment =
                document.createDocumentFragment();

            const count =
                window.innerWidth < 700
                    ? 28
                    : 55;


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
                    "impact-particle";

                particle.style.left =
                    `${Math.random() * 100}%`;

                particle.style.top =
                    `${60 + Math.random() * 45}%`;

                particle.style.setProperty(
                    "--duration",
                    `${8 + Math.random() * 12}s`
                );

                particle.style.setProperty(
                    "--delay",
                    `${Math.random() * -15}s`
                );

                particle.style.setProperty(
                    "--drift",
                    `${-80 + Math.random() * 160}px`
                );

                fragment.appendChild(
                    particle
                );
            }

            particleContainer.appendChild(
                fragment
            );
        };


    createParticles();


    /* =====================================================
       FIREFLIES
    ===================================================== */

    const fireflyContainer =
        $(".impact-fireflies");


    const createFireflies =
        () => {

            if (!fireflyContainer) {
                return;
            }

            const fragment =
                document.createDocumentFragment();

            const count =
                window.innerWidth < 700
                    ? 18
                    : 35;


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
                    "impact-firefly";

                firefly.style.left =
                    `${Math.random() * 100}%`;

                firefly.style.top =
                    `${Math.random() * 100}%`;

                firefly.style.setProperty(
                    "--duration",
                    `${4 + Math.random() * 6}s`
                );

                firefly.style.setProperty(
                    "--delay",
                    `${Math.random() * -8}s`
                );

                firefly.style.setProperty(
                    "--x",
                    `${-100 + Math.random() * 200}px`
                );

                firefly.style.setProperty(
                    "--y",
                    `${-100 + Math.random() * 200}px`
                );

                fragment.appendChild(
                    firefly
                );
            }

            fireflyContainer.appendChild(
                fragment
            );
        };


    createFireflies();


    /* =====================================================
       FALLING LEAVES
    ===================================================== */

    const leafContainer =
        $(".impact-leaves");


    const createLeaves =
        () => {

            if (!leafContainer) {
                return;
            }

            const symbols = [
                "✦",
                "·",
                "✧",
                "❋"
            ];

            const fragment =
                document.createDocumentFragment();


            const count =
                window.innerWidth < 700
                    ? 10
                    : 18;


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
                    "impact-leaf";

                leaf.textContent =
                    symbols[
                        Math.floor(
                            Math.random() *
                            symbols.length
                        )
                    ];

                leaf.style.left =
                    `${Math.random() * 100}%`;

                leaf.style.top =
                    `${-10 - Math.random() * 20}%`;

                leaf.style.setProperty(
                    "--duration",
                    `${12 + Math.random() * 12}s`
                );

                leaf.style.setProperty(
                    "--delay",
                    `${Math.random() * -18}s`
                );

                leaf.style.setProperty(
                    "--x",
                    `${-150 + Math.random() * 300}px`
                );

                fragment.appendChild(
                    leaf
                );
            }

            leafContainer.appendChild(
                fragment
            );
        };


    createLeaves();


    /* =====================================================
       REVEAL ENGINE
    ===================================================== */

    const revealElements =
        $$(".reveal-impact");


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

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );

                },
                {
                    threshold: .16
                }
            );


        revealElements.forEach(
            element =>
                observer.observe(
                    element
                )
        );

    } else {

        revealElements.forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );
    }


    /* =====================================================
       NUMBER FORMAT
    ===================================================== */

    const formatIndianNumber =
        value => {

            return new Intl.NumberFormat(
                "en-IN"
            ).format(
                Math.round(value)
            );
        };


    const formatCrore =
        value => {

            const crore =
                value / 10000000;

            if (
                crore >= 10 &&
                Number.isInteger(crore)
            ) {

                return `${formatIndianNumber(crore)} crore`;
            }

            return `${crore.toFixed(2)} crore`;
        };


    /* =====================================================
       NATIONAL COUNTERS
    ===================================================== */

    const counters =
        $$(".impact-counter");


    const animateCounter =
        element => {

            const target =
                Number(
                    element.dataset.target
                );

            const format =
                element.dataset.format;


            if (
                !Number.isFinite(
                    target
                )
            ) {
                return;
            }


            const duration =
                1800;

            const start =
                performance.now();


            const frame =
                now => {

                    const elapsed =
                        now - start;

                    const progress =
                        Math.min(
                            elapsed /
                            duration,
                            1
                        );

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );

                    const current =
                        target *
                        eased;


                    if (
                        format ===
                        "crore"
                    ) {

                        element.textContent =
                            formatCrore(
                                current
                            );

                    } else {

                        element.textContent =
                            formatIndianNumber(
                                current
                            );
                    }


                    if (
                        progress < 1
                    ) {

                        requestAnimationFrame(
                            frame
                        );

                    } else {

                        if (
                            format ===
                            "crore"
                        ) {

                            element.textContent =
                                formatCrore(
                                    target
                                );
                        }
                    }
                };


            requestAnimationFrame(
                frame
            );
        };


    if (
        "IntersectionObserver"
        in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target
                                );

                                counterObserver
                                    .unobserve(
                                        entry.target
                                    );
                            }
                        }
                    );

                },
                {
                    threshold: .4
                }
            );


        counters.forEach(
            counter =>
                counterObserver.observe(
                    counter
                )
        );

    } else {

        counters.forEach(
            animateCounter
        );
    }


    /* =====================================================
       ₹1 SCALE SELECTOR
    ===================================================== */

    const scaleSteps =
        $$(".impact-scale-step");

    const rupeeValue =
        $("#impactRupeeValue");


    const rupeeParticles =
        $("#impactRupeeParticles");


    const formatScenarioMoney =
        transactions => {

            if (
                transactions >=
                10000000000
            ) {

                return `₹${(
                    transactions /
                    1000000000
                ).toLocaleString(
                    "en-IN"
                )} crore`;

            }


            if (
                transactions >=
                10000000
            ) {

                return `₹${(
                    transactions /
                    10000000
                ).toLocaleString(
                    "en-IN"
                )} crore`;

            }


            if (
                transactions >=
                100000
            ) {

                return `₹${(
                    transactions /
                    100000
                ).toLocaleString(
                    "en-IN"
                )} lakh`;
            }


            return `₹${transactions}`;
        };


    const rebuildRupeeParticles =
        count => {

            if (!rupeeParticles) {
                return;
            }

            rupeeParticles.innerHTML =
                "";


            const visibleCount =
                Math.min(
                    80,
                    Math.max(
                        8,
                        Math.round(
                            Math.log10(
                                count + 1
                            ) * 12
                        )
                    )
                );


            const fragment =
                document.createDocumentFragment();


            for (
                let i = 0;
                i < visibleCount;
                i++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );

                particle.className =
                    "impact-rupee-particle";

                particle.style.setProperty(
                    "--duration",
                    `${2 + Math.random() * 3}s`
                );

                particle.style.setProperty(
                    "--delay",
                    `${Math.random() * -4}s`
                );

                particle.style.setProperty(
                    "--radius",
                    `${130 + Math.random() * 140}px`
                );

                fragment.appendChild(
                    particle
                );
            }


            rupeeParticles.appendChild(
                fragment
            );
        };


    scaleSteps.forEach(
        step => {

            step.addEventListener(
                "click",
                () => {

                    scaleSteps.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );

                    step.classList.add(
                        "active"
                    );


                    const transactions =
                        Number(
                            step.dataset
                                .transactions
                        );


                    if (rupeeValue) {

                        rupeeValue.textContent =
                            transactions === 1
                                ? "1"
                                : formatScenarioMoney(
                                    transactions
                                )
                                .replace(
                                    /^₹/,
                                    ""
                                );
                    }


                    rebuildRupeeParticles(
                        transactions
                    );
                }
            );
        }
    );


    rebuildRupeeParticles(1);


    /* =====================================================
       ROLE NETWORK EXPLANATION
    ===================================================== */

    const roleNodes =
        $$(".impact-map-node");


    const roleLabel =
        $("#impactRoleLabel");

    const roleTitle =
        $("#impactRoleTitle");

    const roleText =
        $("#impactRoleText");


    const roleDescriptions = {

        Farmer: {
            title:
                "Farmer",

            text:
                "The central agricultural participant connecting production with labour, resources, services, logistics and buyers."
        },

        Labour: {
            title:
                "Labour",

            text:
                "Workers contribute human capability to agricultural tasks and can be connected with farms that require relevant work."
        },

        Equipment: {
            title:
                "Equipment",

            text:
                "Agricultural machinery can become more useful when availability, requirements and scheduling are easier to coordinate."
        },

        Operator: {
            title:
                "Machine Operator",

            text:
                "Operators connect machinery with practical field activity through assignments, schedules and operational work."
        },

        Logistics: {
            title:
                "Logistics Provider",

            text:
                "Logistics connects agricultural activity with the physical movement of produce, equipment and consignments."
        },

        Driver: {
            title:
                "Driver",

            text:
                "Drivers execute transport assignments and provide the physical link between origin, route and destination."
        },

        Buyer: {
            title:
                "Buyer",

            text:
                "Buyers connect demand with available agricultural produce through discovery, communication, orders and delivery."
        }
    };


    const activateRole =
        node => {

            const role =
                node.dataset.role;

            const data =
                roleDescriptions[
                    role
                ];


            roleNodes.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );

            node.classList.add(
                "active"
            );


            if (
                !data
            ) {
                return;
            }


            if (roleLabel) {
                roleLabel.textContent =
                    "AGRICULTURAL ROLE";
            }

            if (roleTitle) {
                roleTitle.textContent =
                    data.title;
            }

            if (roleText) {
                roleText.textContent =
                    data.text;
            }
        };


    roleNodes.forEach(
        node => {

            node.addEventListener(
                "mouseenter",
                () =>
                    activateRole(node)
            );

            node.addEventListener(
                "focus",
                () =>
                    activateRole(node)
            );

            node.addEventListener(
                "click",
                () =>
                    activateRole(node)
            );
        }
    );


    /* =====================================================
       RIPPLE ANIMATION
    ===================================================== */

    const rippleButton =
        $("#impactRippleButton");


    const rippleNodes =
        $$(".impact-ripple-node");


    const rippleConnectors =
        $$(".impact-ripple-connector");


    let rippleRunning =
        false;


    const runRipple =
        async () => {

            if (rippleRunning) {
                return;
            }

            rippleRunning =
                true;


            rippleNodes.forEach(
                node =>
                    node.classList.remove(
                        "ripple-active"
                    )
            );


            rippleConnectors.forEach(
                connector =>
                    connector.classList.remove(
                        "flowing"
                    )
            );


            for (
                let i = 0;
                i < rippleNodes.length;
                i++
            ) {

                rippleNodes[i]
                    .classList
                    .add(
                        "ripple-active"
                    );


                if (
                    i >
                    0
                ) {

                    rippleConnectors[
                        i - 1
                    ]
                        ?.classList
                        .add(
                            "flowing"
                        );
                }


                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            450
                        )
                );
            }


            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        900
                    )
            );


            rippleRunning =
                false;
        };


    if (rippleButton) {

        rippleButton.addEventListener(
            "click",
            runRipple
        );
    }


    /* =====================================================
       SIMULATOR
    ===================================================== */

    const participants =
        $("#impactParticipants");

    const transactions =
        $("#impactTransactions");

    const fee =
        $("#impactFee");


    const participantsValue =
        $("#impactParticipantsValue");

    const transactionsValue =
        $("#impactTransactionsValue");

    const feeValue =
        $("#impactFeeValue");

    const scenarioAmount =
        $("#impactScenarioAmount");

    const scenarioTransactions =
        $("#impactScenarioTransactions");


    const participantOptions = [
        100000,
        1000000,
        10000000,
        100000000
    ];


    const transactionOptions = [
        1,
        5,
        10,
        50,
        100
    ];


    const feeOptions = [
        .5,
        1,
        2,
        5,
        10
    ];


    const formatCompactIndian =
        number => {

            if (
                number >=
                10000000000
            ) {

                return `${(
                    number /
                    10000000000
                ).toFixed(2)} thousand crore`;
            }


            if (
                number >=
                10000000
            ) {

                return `${(
                    number /
                    10000000
                ).toFixed(2)} crore`;
            }


            if (
                number >=
                100000
            ) {

                return `${(
                    number /
                    100000
                ).toFixed(2)} lakh`;
            }


            return formatIndianNumber(
                number
            );
        };


    const formatRupees =
        amount => {

            if (
                amount >=
                10000000000
            ) {

                return `₹${(
                    amount /
                    10000000000
                ).toFixed(2)} thousand crore`;
            }


            if (
                amount >=
                10000000
            ) {

                return `₹${(
                    amount /
                    10000000
                ).toFixed(2)} crore`;
            }


            if (
                amount >=
                100000
            ) {

                return `₹${(
                    amount /
                    100000
                ).toFixed(2)} lakh`;
            }


            return `₹${formatIndianNumber(
                amount
            )}`;
        };


    const updateSimulator =
        () => {

            if (
                !participants ||
                !transactions ||
                !fee
            ) {
                return;
            }


            const participantIndex =
                Number(
                    participants.value
                ) - 1;


            const transactionIndex =
                Number(
                    transactions.value
                ) - 1;


            const feeIndex =
                Number(
                    fee.value
                ) - 1;


            const participantCount =
                participantOptions[
                    participantIndex
                ];


            const transactionCount =
                transactionOptions[
                    transactionIndex
                ];


            const feeAmount =
                feeOptions[
                    feeIndex
                ];


            const totalTransactions =
                participantCount *
                transactionCount;


            const totalFee =
                totalTransactions *
                feeAmount;


            if (participantsValue) {

                participantsValue.textContent =
                    formatCompactIndian(
                        participantCount
                    );
            }


            if (transactionsValue) {

                transactionsValue.textContent =
                    transactionCount;
            }


            if (feeValue) {

                feeValue.textContent =
                    `₹${feeAmount}`;
            }


            if (scenarioAmount) {

                scenarioAmount.textContent =
                    formatRupees(
                        totalFee
                    );
            }


            if (scenarioTransactions) {

                scenarioTransactions.textContent =
                    `${formatCompactIndian(
                        totalTransactions
                    )} transactions`;
            }
        };


    [
        participants,
        transactions,
        fee
    ]
        .filter(Boolean)
        .forEach(
            control => {

                control.addEventListener(
                    "input",
                    updateSimulator
                );
            }
        );


    updateSimulator();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTop =
        $("#impactBackTop");


    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY >
                    window.innerHeight
                ) {

                    backTop.classList.add(
                        "visible"
                    );

                } else {

                    backTop.classList.remove(
                        "visible"
                    );
                }
            },
            {
                passive: true
            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }


    /* =====================================================
       PARALLAX
    ===================================================== */

    const parallaxElements =
        $$(".impact-network-orbit");


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                parallaxElements.forEach(
                    element => {

                        const rect =
                            element.getBoundingClientRect();

                        const center =
                            rect.top +
                            rect.height / 2;

                        const distance =
                            (
                                center -
                                window.innerHeight / 2
                            ) * .035;


                        element.style.transform =
                            `translate3d(
                                0,
                                ${distance}px,
                                0
                            )`;
                    }
                );
            },
            {
                passive: true
            }
        );
    }


    /* =====================================================
       HOVER LIGHT FOR CARDS
    ===================================================== */

    const interactiveCards =
        $$(
            [
                ".impact-big-stat",
                ".impact-social-card",
                ".impact-level",
                ".impact-control"
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


                    card.style.background =
                        `
                        radial-gradient(
                            350px circle at
                            ${x}px ${y}px,
                            rgba(214,180,90,.10),
                            rgba(3,24,18,.48) 55%
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


    /* =====================================================
       VISIBILITY-BASED RIPPLE AUTO HINT
    ===================================================== */

    const rippleSection =
        $(".impact-ripple-section");


    if (
        rippleSection &&
        "IntersectionObserver"
        in window
    ) {

        const rippleObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting &&
                                !rippleRunning
                            ) {

                                setTimeout(
                                    () => {

                                        if (
                                            !rippleRunning
                                        ) {
                                            runRipple();
                                        }

                                    },
                                    700
                                );

                                rippleObserver
                                    .unobserve(
                                        rippleSection
                                    );
                            }
                        }
                    );

                },
                {
                    threshold: .45
                }
            );


        rippleObserver.observe(
            rippleSection
        );
    }


    /* =====================================================
       INITIAL READY STATE
    ===================================================== */

    document.documentElement.classList.add(
        "impact-js-ready"
    );

});