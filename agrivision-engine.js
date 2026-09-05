/* ============================================================
   AGRIVISION KARNATAKA
   AGRIVISION ENGINE
   ============================================================

   CENTRAL APPLICATION ENGINE

   Includes:
   ------------------------------------------------------------
   • Application state
   • Local persistence
   • Users / roles
   • Farmer
   • Equipment Owner
   • Operator
   • Driver
   • Equipment
   • Orders
   • Shipments
   • Logistics
   • Route matching
   • Shared-load optimization
   • Cost allocation
   • Workflow
   • Payments
   • Finance
   • Settlements
   • Invoices
   • Maintenance
   • Notifications
   • Documents
   • Disputes
   • Ratings
   • Audit history
   • Dashboards
   • Operator workflow
   • Driver workflow
   • Equipment-owner workflow
   • Farmer workflow

   Five-page architecture:
   ------------------------------------------------------------
   1. Portal
   2. Farmer
   3. Logistics
   4. Equipment Owner
   5. Operator

   Driver operations are handled through Logistics and
   Equipment Owner workflows rather than another page.

   IMPORTANT:
   ------------------------------------------------------------
   This is the FRONTEND APPLICATION ENGINE.

   localStorage is used during development.

   A production backend/database/API should eventually replace
   the persistence layer without changing the page architecture.
   ============================================================ */

(function (window) {

    "use strict";


    /* =========================================================
       ROOT
       ========================================================= */

    const AgriVision =
        window.AgriVision =
        window.AgriVision || {};


    const VERSION = "2.0.0";

    const STORAGE_KEY =
        "agrivision_karnataka_engine";


    /* =========================================================
       ROLES
       ========================================================= */

    const ROLES = {

        FARMER:
            "farmer",

        LOGISTICS:
            "logistics",

        EQUIPMENT_OWNER:
            "equipment-owner",

        OPERATOR:
            "operator",

        DRIVER:
            "driver",

        ADMIN:
            "admin"

    };


    /* =========================================================
       ORDER STATES
       ========================================================= */

    const STATES = {

        REQUESTED:
            "requested",

        QUOTED:
            "quoted",

        FARMER_ACCEPTED:
            "farmer-accepted",

        OWNER_ACCEPTED:
            "owner-accepted",

        EQUIPMENT_ASSIGNED:
            "equipment-assigned",

        OPERATOR_ASSIGNED:
            "operator-assigned",

        OPERATOR_ACCEPTED:
            "operator-accepted",

        DRIVER_ASSIGNED:
            "driver-assigned",

        SHIPMENT_CREATED:
            "shipment-created",

        ROUTE_MATCHING:
            "route-matching",

        ROUTE_OPTIMIZED:
            "route-optimized",

        SHARED_COST_PENDING:
            "shared-cost-pending",

        SHARED_COST_ACCEPTED:
            "shared-cost-accepted",

        READY_FOR_PICKUP:
            "ready-for-pickup",

        PICKUP_STARTED:
            "pickup-started",

        PICKUP_COMPLETED:
            "pickup-completed",

        IN_TRANSIT:
            "in-transit",

        DELIVERY_STARTED:
            "delivery-started",

        DELIVERED:
            "delivered",

        OPERATION_READY:
            "operation-ready",

        OPERATION_STARTED:
            "operation-started",

        OPERATION_PAUSED:
            "operation-paused",

        OPERATION_ISSUE:
            "operation-issue",

        OPERATION_COMPLETED:
            "operation-completed",

        CONFIRMATION_PENDING:
            "confirmation-pending",

        INSPECTION_PENDING:
            "inspection-pending",

        INSPECTION_COMPLETED:
            "inspection-completed",

        PAYMENT_PENDING:
            "payment-pending",

        PAYMENT_PROCESSING:
            "payment-processing",

        PAYMENT_COMPLETED:
            "payment-completed",

        SETTLEMENT_PENDING:
            "settlement-pending",

        SETTLEMENT_PROCESSING:
            "settlement-processing",

        SETTLED:
            "settled",

        RATING_PENDING:
            "rating-pending",

        COMPLETED:
            "completed",

        DISPUTED:
            "disputed",

        ON_HOLD:
            "on-hold",

        CANCELLED:
            "cancelled"

    };


    /* =========================================================
       STATUS LABELS
       ========================================================= */

    const STATE_LABELS = {

        requested:
            "Request Submitted",

        quoted:
            "Quote Available",

        "farmer-accepted":
            "Farmer Accepted",

        "owner-accepted":
            "Equipment Owner Accepted",

        "equipment-assigned":
            "Equipment Assigned",

        "operator-assigned":
            "Operator Assigned",

        "operator-accepted":
            "Operator Accepted",

        "driver-assigned":
            "Driver Assigned",

        "shipment-created":
            "Shipment Created",

        "route-matching":
            "Finding Compatible Routes",

        "route-optimized":
            "Route Optimized",

        "shared-cost-pending":
            "Shared Cost Awaiting Acceptance",

        "shared-cost-accepted":
            "Shared Cost Accepted",

        "ready-for-pickup":
            "Ready for Pickup",

        "pickup-started":
            "Pickup Started",

        "pickup-completed":
            "Pickup Completed",

        "in-transit":
            "In Transit",

        "delivery-started":
            "Delivery Started",

        delivered:
            "Delivered",

        "operation-ready":
            "Operation Ready",

        "operation-started":
            "Operation Started",

        "operation-paused":
            "Operation Paused",

        "operation-issue":
            "Operation Issue",

        "operation-completed":
            "Operation Completed",

        "confirmation-pending":
            "Farmer Confirmation Pending",

        "inspection-pending":
            "Inspection Pending",

        "inspection-completed":
            "Inspection Completed",

        "payment-pending":
            "Payment Pending",

        "payment-processing":
            "Payment Processing",

        "payment-completed":
            "Payment Completed",

        "settlement-pending":
            "Settlement Pending",

        "settlement-processing":
            "Settlement Processing",

        settled:
            "Settled",

        "rating-pending":
            "Rating Pending",

        completed:
            "Completed",

        disputed:
            "Disputed",

        "on-hold":
            "On Hold",

        cancelled:
            "Cancelled"

    };


    /* =========================================================
       JOB TYPES
       ========================================================= */

    const JOB_TYPES = {

        PLOUGHING:
            "ploughing",

        HARROWING:
            "harrowing",

        CULTIVATION:
            "cultivation",

        SEEDING:
            "seeding",

        SOWING:
            "sowing",

        TRANSPLANTING:
            "transplanting",

        SPRAYING:
            "spraying",

        FERTILIZER:
            "fertilizer-application",

        WEEDING:
            "weeding",

        HARVESTING:
            "harvesting",

        THRESHING:
            "threshing",

        BALING:
            "baling",

        LAND_LEVELING:
            "land-leveling",

        RIDGING:
            "ridging",

        CUSTOM:
            "custom"

    };


    /* =========================================================
       EVENTS
       ========================================================= */

    const EVENTS = {

        STATE_CHANGED:
            "agrivision:state-changed",

        USER_CREATED:
            "agrivision:user-created",

        ORDER_CREATED:
            "agrivision:order-created",

        ORDER_UPDATED:
            "agrivision:order-updated",

        SHIPMENT_CREATED:
            "agrivision:shipment-created",

        SHIPMENT_UPDATED:
            "agrivision:shipment-updated",

        TRIP_CREATED:
            "agrivision:trip-created",

        TRIP_UPDATED:
            "agrivision:trip-updated",

        EQUIPMENT_UPDATED:
            "agrivision:equipment-updated",

        OPERATOR_UPDATED:
            "agrivision:operator-updated",

        DRIVER_UPDATED:
            "agrivision:driver-updated",

        PAYMENT_CREATED:
            "agrivision:payment-created",

        SETTLEMENT_CREATED:
            "agrivision:settlement-created",

        NOTIFICATION_CREATED:
            "agrivision:notification-created"

    };


    /* =========================================================
       DEFAULT STATE
       ========================================================= */

    function defaultState() {

        return {

            meta: {

                version:
                    VERSION,

                createdAt:
                    new Date().toISOString(),

                updatedAt:
                    new Date().toISOString()

            },


            session: {

                userId:
                    null,

                role:
                    null,

                authenticated:
                    false

            },


            users: [],

            farmers: [],

            equipmentOwners: [],

            operators: [],

            drivers: [],

            equipment: [],

            orders: [],

            shipments: [],

            trips: [],

            payments: [],

            settlements: [],

            invoices: [],

            disputes: [],

            maintenance: [],

            ratings: [],

            notifications: [],

            documents: [],

            serviceAreas: [],

            auditLog: []

        };

    }


    let state =
        loadState();


    /* =========================================================
       BASIC HELPERS
       ========================================================= */

    function clone(value) {

        return JSON.parse(
            JSON.stringify(value)
        );

    }


    function timestamp() {

        return new Date()
            .toISOString();

    }


    function createId(prefix) {

        return (

            prefix +

            "-" +

            Date.now()
                .toString(36) +

            "-" +

            Math.random()
                .toString(36)
                .slice(2, 8)

        ).toUpperCase();

    }


    function number(
        value,
        fallback = 0
    ) {

        const n =
            Number(value);

        return Number.isFinite(n)
            ? n
            : fallback;

    }


    function collection(
        name
    ) {

        if (
            !Array.isArray(
                state[name]
            )
        ) {

            throw new Error(
                `Unknown collection: ${name}`
            );

        }

        return state[name];

    }


    /* =========================================================
       PERSISTENCE
       ========================================================= */

    function loadState() {

        try {

            const raw =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (!raw) {

                return defaultState();

            }


            const parsed =
                JSON.parse(raw);


            return {

                ...defaultState(),

                ...parsed

            };

        }

        catch (error) {

            console.error(
                "AgriVision state load failed:",
                error
            );


            return defaultState();

        }

    }


    function save() {

        state.meta.updatedAt =
            timestamp();


        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(state)

        );


        window.dispatchEvent(

            new CustomEvent(

                EVENTS.STATE_CHANGED,

                {

                    detail: {
                        state:
                            clone(state)
                    }

                }

            )

        );

    }


    function reset() {

        state =
            defaultState();

        save();

    }


    function getState() {

        return clone(state);

    }


    /* =========================================================
       GENERIC DATABASE OPERATIONS
       ========================================================= */

    function find(
        collectionName,
        id
    ) {

        return collection(
            collectionName
        ).find(
            item =>
                item.id === id
        ) || null;

    }


    function insert(
        collectionName,
        item
    ) {

        collection(
            collectionName
        ).push(item);


        save();


        return clone(item);

    }


    function update(
        collectionName,
        id,
        changes
    ) {

        const items =
            collection(
                collectionName
            );


        const index =
            items.findIndex(
                item =>
                    item.id === id
            );


        if (index === -1) {

            return null;

        }


        items[index] = {

            ...items[index],

            ...changes,

            updatedAt:
                timestamp()

        };


        save();


        return clone(
            items[index]
        );

    }


    function remove(
        collectionName,
        id
    ) {

        const items =
            collection(
                collectionName
            );


        const index =
            items.findIndex(
                item =>
                    item.id === id
            );


        if (index === -1) {

            return false;

        }


        items.splice(
            index,
            1
        );


        save();


        return true;

    }


    /* =========================================================
       AUDIT
       ========================================================= */

    function audit(
        action,
        entityType,
        entityId,
        details = {}
    ) {

        const entry = {

            id:
                createId("AUD"),

            action,

            entityType,

            entityId,

            details:
                clone(details),

            timestamp:
                timestamp()

        };


        state.auditLog.push(
            entry
        );


        save();


        return clone(entry);

    }


    /* =========================================================
       SESSION / AUTH
       ========================================================= */

    function createUser(
        data = {}
    ) {

        const user = {

            id:
                data.id ||
                createId("USR"),

            name:
                data.name ||
                "",

            email:
                data.email ||
                "",

            phone:
                data.phone ||
                "",

            role:
                data.role ||
                ROLES.FARMER,

            status:
                "active",

            createdAt:
                timestamp()

        };


        insert(
            "users",
            user
        );


        audit(
            "USER_CREATED",
            "user",
            user.id,
            {
                role:
                    user.role
            }
        );


        window.dispatchEvent(

            new CustomEvent(

                EVENTS.USER_CREATED,

                {
                    detail:
                        clone(user)
                }

            )

        );


        return clone(user);

    }


    function login(
        userId,
        role
    ) {

        const user =
            find(
                "users",
                userId
            );


        if (!user) {

            throw new Error(
                "User not found."
            );

        }


        state.session = {

            userId,

            role:
                role ||
                user.role,

            authenticated:
                true

        };


        save();


        audit(
            "LOGIN",
            "user",
            userId,
            {
                role:
                    state.session.role
            }
        );


        return clone(
            state.session
        );

    }


    function logout() {

        const previous =
            clone(
                state.session
            );


        state.session = {

            userId:
                null,

            role:
                null,

            authenticated:
                false

        };


        save();


        audit(
            "LOGOUT",
            "session",
            previous.userId
        );

    }


    /* =========================================================
       FARMER
       ========================================================= */

    function createFarmer(
        data = {}
    ) {

        const farmer = {

            id:
                data.id ||
                createId("FAR"),

            userId:
                data.userId ||
                null,

            name:
                data.name ||
                "",

            phone:
                data.phone ||
                "",

            email:
                data.email ||
                "",

            district:
                data.district ||
                "",

            taluk:
                data.taluk ||
                "",

            village:
                data.village ||
                "",

            landAcres:
                number(
                    data.landAcres
                ),

            crops:
                Array.isArray(data.crops)
                    ? data.crops
                    : [],

            status:
                "active",

            createdAt:
                timestamp()

        };


        insert(
            "farmers",
            farmer
        );


        audit(
            "FARMER_CREATED",
            "farmer",
            farmer.id
        );


        return clone(farmer);

    }


    /* =========================================================
       EQUIPMENT OWNER
       ========================================================= */

    function createEquipmentOwner(
        data = {}
    ) {

        const owner = {

            id:
                data.id ||
                createId("EQO"),

            userId:
                data.userId ||
                null,

            name:
                data.name ||
                "",

            businessName:
                data.businessName ||
                "",

            phone:
                data.phone ||
                "",

            email:
                data.email ||
                "",

            district:
                data.district ||
                "",

            verificationStatus:
                data.verificationStatus ||
                "pending",

            rating:
                number(
                    data.rating
                ),

            status:
                "active",

            createdAt:
                timestamp()

        };


        insert(
            "equipmentOwners",
            owner
        );


        audit(
            "EQUIPMENT_OWNER_CREATED",
            "equipmentOwner",
            owner.id
        );


        return clone(owner);

    }


    /* =========================================================
       OPERATOR
       ========================================================= */

    function createOperator(
        data = {}
    ) {

        const operator = {

            id:
                data.id ||
                createId("OPR"),

            userId:
                data.userId ||
                null,

            name:
                data.name ||
                "",

            phone:
                data.phone ||
                "",

            email:
                data.email ||
                "",

            district:
                data.district ||
                "",

            skills:
                Array.isArray(
                    data.skills
                )
                    ? data.skills
                    : [],

            certifications:
                Array.isArray(
                    data.certifications
                )
                    ? data.certifications
                    : [],

            experienceYears:
                number(
                    data.experienceYears
                ),

            availability:
                data.availability ||
                "available",

            verificationStatus:
                data.verificationStatus ||
                "pending",

            rating:
                number(
                    data.rating
                ),

            totalJobs:
                0,

            completedJobs:
                0,

            status:
                "active",

            createdAt:
                timestamp()

        };


        insert(
            "operators",
            operator
        );


        audit(
            "OPERATOR_CREATED",
            "operator",
            operator.id
        );


        return clone(operator);

    }


    function updateOperator(
        operatorId,
        changes = {}
    ) {

        return update(

            "operators",

            operatorId,

            changes

        );

    }


    function setOperatorAvailability(
        operatorId,
        availability
    ) {

        const operator =
            find(
                "operators",
                operatorId
            );


        if (!operator) {

            throw new Error(
                "Operator not found."
            );

        }


        if (
            ![
                "available",
                "unavailable",
                "assigned",
                "on-job"
            ].includes(
                availability
            )
        ) {

            throw new Error(
                "Invalid operator availability."
            );

        }


        return update(

            "operators",

            operatorId,

            {
                availability
            }

        );

    }


    /* =========================================================
       DRIVER
       ========================================================= */

    function createDriver(
        data = {}
    ) {

        const driver = {

            id:
                data.id ||
                createId("DRV"),

            userId:
                data.userId ||
                null,

            name:
                data.name ||
                "",

            phone:
                data.phone ||
                "",

            licenseNumber:
                data.licenseNumber ||
                "",

            licenseStatus:
                data.licenseStatus ||
                "pending",

            availability:
                data.availability ||
                "available",

            rating:
                number(
                    data.rating
                ),

            currentLocation:
                data.currentLocation ||
                null,

            status:
                "active",

            createdAt:
                timestamp()

        };


        insert(
            "drivers",
            driver
        );


        audit(
            "DRIVER_CREATED",
            "driver",
            driver.id
        );


        return clone(driver);

    }


    /* =========================================================
       EQUIPMENT
       ========================================================= */

    function createEquipment(
        data = {}
    ) {

        const equipment = {

            id:
                data.id ||
                createId("EQP"),

            ownerId:
                data.ownerId ||
                null,

            name:
                data.name ||
                "",

            category:
                data.category ||
                "",

            brand:
                data.brand ||
                "",

            model:
                data.model ||
                "",

            registrationNumber:
                data.registrationNumber ||
                "",

            year:
                data.year ||
                null,

            capacityKg:
                number(
                    data.capacityKg
                ),

            status:
                data.status ||
                "available",

            availability:
                data.availability ||
                "available",

            location:
                data.location ||
                null,

            pricing: {

                hourly:
                    number(
                        data.pricing?.hourly
                    ),

                daily:
                    number(
                        data.pricing?.daily
                    ),

                custom:
                    number(
                        data.pricing?.custom
                    )

            },

            createdAt:
                timestamp()

        };


        insert(
            "equipment",
            equipment
        );


        audit(
            "EQUIPMENT_CREATED",
            "equipment",
            equipment.id
        );


        return clone(equipment);

    }


    function updateEquipment(
        equipmentId,
        changes = {}
    ) {

        return update(

            "equipment",

            equipmentId,

            changes

        );

    }


    /* =========================================================
       ORDER
       ========================================================= */

    function createOrder(
        data = {}
    ) {

        const order = {

            id:
                data.id ||
                createId("ORD"),

            farmerId:
                data.farmerId ||
                null,

            equipmentOwnerId:
                data.equipmentOwnerId ||
                null,

            equipmentId:
                data.equipmentId ||
                null,

            operatorId:
                data.operatorId ||
                null,

            driverId:
                data.driverId ||
                null,

            operation: {

                type:
                    data.operation?.type ||
                    "",

                crop:
                    data.operation?.crop ||
                    "",

                acreage:
                    number(
                        data.operation?.acreage
                    ),

                description:
                    data.operation?.description ||
                    ""

            },

            location: {

                farm:
                    data.location?.farm ||
                    "",

                district:
                    data.location?.district ||
                    "",

                taluk:
                    data.location?.taluk ||
                    "",

                village:
                    data.location?.village ||
                    "",

                latitude:
                    data.location?.latitude ||
                    null,

                longitude:
                    data.location?.longitude ||
                    null

            },

            schedule: {

                requestedDate:
                    data.schedule?.requestedDate ||
                    null,

                startTime:
                    data.schedule?.startTime ||
                    null,

                endTime:
                    data.schedule?.endTime ||
                    null

            },

            pricing: {

                equipment:
                    number(
                        data.pricing?.equipment
                    ),

                operator:
                    number(
                        data.pricing?.operator
                    ),

                transport:
                    number(
                        data.pricing?.transport
                    ),

                platformFee:
                    number(
                        data.pricing?.platformFee
                    ),

                total:
                    number(
                        data.pricing?.total
                    )

            },

            priority:
                data.priority ||
                "normal",

            status:
                data.status ||
                STATES.REQUESTED,

            workflow: {

                current:
                    data.status ||
                    STATES.REQUESTED,

                history: [

                    {

                        state:
                            data.status ||
                            STATES.REQUESTED,

                        timestamp:
                            timestamp(),

                        actor:
                            "system"

                    }

                ]

            },

            createdAt:
                timestamp(),

            updatedAt:
                timestamp()

        };


        insert(
            "orders",
            order
        );


        audit(
            "ORDER_CREATED",
            "order",
            order.id
        );


        emit(
            EVENTS.ORDER_CREATED,
            {
                order:
                    clone(order)
            }
        );


        return clone(order);

    }


    /* =========================================================
       WORKFLOW TRANSITIONS
       ========================================================= */

    const TRANSITIONS = {

        requested: [
            STATES.QUOTED,
            STATES.CANCELLED
        ],

        quoted: [
            STATES.FARMER_ACCEPTED,
            STATES.CANCELLED
        ],

        "farmer-accepted": [
            STATES.OWNER_ACCEPTED,
            STATES.CANCELLED
        ],

        "owner-accepted": [
            STATES.EQUIPMENT_ASSIGNED,
            STATES.CANCELLED
        ],

        "equipment-assigned": [
            STATES.OPERATOR_ASSIGNED,
            STATES.DRIVER_ASSIGNED,
            STATES.CANCELLED
        ],

        "operator-assigned": [
            STATES.OPERATOR_ACCEPTED,
            STATES.DRIVER_ASSIGNED,
            STATES.CANCELLED
        ],

        "operator-accepted": [
            STATES.DRIVER_ASSIGNED,
            STATES.OPERATION_READY,
            STATES.CANCELLED
        ],

        "driver-assigned": [
            STATES.SHIPMENT_CREATED,
            STATES.READY_FOR_PICKUP,
            STATES.CANCELLED
        ],

        "shipment-created": [
            STATES.ROUTE_MATCHING,
            STATES.READY_FOR_PICKUP
        ],

        "route-matching": [
            STATES.ROUTE_OPTIMIZED,
            STATES.READY_FOR_PICKUP
        ],

        "route-optimized": [
            STATES.SHARED_COST_PENDING,
            STATES.READY_FOR_PICKUP
        ],

        "shared-cost-pending": [
            STATES.SHARED_COST_ACCEPTED,
            STATES.ROUTE_MATCHING,
            STATES.CANCELLED
        ],

        "shared-cost-accepted": [
            STATES.READY_FOR_PICKUP
        ],

        "ready-for-pickup": [
            STATES.PICKUP_STARTED,
            STATES.CANCELLED
        ],

        "pickup-started": [
            STATES.PICKUP_COMPLETED
        ],

        "pickup-completed": [
            STATES.IN_TRANSIT
        ],

        "in-transit": [
            STATES.DELIVERY_STARTED,
            STATES.DISPUTED,
            STATES.ON_HOLD
        ],

        "delivery-started": [
            STATES.DELIVERED,
            STATES.DISPUTED,
            STATES.ON_HOLD
        ],

        delivered: [
            STATES.OPERATION_READY,
            STATES.OPERATION_STARTED,
            STATES.INSPECTION_PENDING
        ],

        "operation-ready": [
            STATES.OPERATION_STARTED,
            STATES.CANCELLED
        ],

        "operation-started": [
            STATES.OPERATION_PAUSED,
            STATES.OPERATION_COMPLETED,
            STATES.OPERATION_ISSUE,
            STATES.ON_HOLD
        ],

        "operation-paused": [
            STATES.OPERATION_STARTED,
            STATES.OPERATION_ISSUE,
            STATES.ON_HOLD
        ],

        "operation-issue": [
            STATES.OPERATION_STARTED,
            STATES.OPERATION_PAUSED,
            STATES.ON_HOLD,
            STATES.CANCELLED
        ],

        "operation-completed": [
            STATES.CONFIRMATION_PENDING,
            STATES.INSPECTION_PENDING,
            STATES.PAYMENT_PENDING
        ],

        "confirmation-pending": [
            STATES.INSPECTION_PENDING,
            STATES.DISPUTED
        ],

        "inspection-pending": [
            STATES.INSPECTION_COMPLETED,
            STATES.DISPUTED,
            STATES.ON_HOLD
        ],

        "inspection-completed": [
            STATES.PAYMENT_PENDING,
            STATES.RATING_PENDING
        ],

        "payment-pending": [
            STATES.PAYMENT_PROCESSING,
            STATES.DISPUTED
        ],

        "payment-processing": [
            STATES.PAYMENT_COMPLETED,
            STATES.DISPUTED
        ],

        "payment-completed": [
            STATES.SETTLEMENT_PENDING,
            STATES.RATING_PENDING
        ],

        "settlement-pending": [
            STATES.SETTLEMENT_PROCESSING,
            STATES.DISPUTED
        ],

        "settlement-processing": [
            STATES.SETTLED,
            STATES.DISPUTED
        ],

        settled: [
            STATES.RATING_PENDING,
            STATES.COMPLETED
        ],

        "rating-pending": [
            STATES.COMPLETED
        ],

        disputed: [
            STATES.ON_HOLD,
            STATES.PAYMENT_PENDING,
            STATES.SETTLEMENT_PENDING,
            STATES.COMPLETED
        ],

        "on-hold": [
            STATES.ROUTE_MATCHING,
            STATES.OPERATION_STARTED,
            STATES.PAYMENT_PENDING,
            STATES.SETTLEMENT_PENDING,
            STATES.COMPLETED,
            STATES.CANCELLED
        ]

    };


    function transition(
        orderId,
        nextState,
        options = {}
    ) {

        const order =
            find(
                "orders",
                orderId
            );


        if (!order) {

            throw new Error(
                "Order not found."
            );

        }


        const current =
            order.status;


        if (
            current ===
                STATES.COMPLETED
            ||
            current ===
                STATES.CANCELLED
        ) {

            throw new Error(
                "Order is already closed."
            );

        }


        const allowed =
            TRANSITIONS[
                current
            ] || [];


        if (
            !allowed.includes(
                nextState
            )
        ) {

            throw new Error(

                `Invalid workflow transition: ${current} → ${nextState}`

            );

        }


        const history =
            order.workflow
                ?.history || [];


        const updated =
            update(

                "orders",

                orderId,

                {

                    status:
                        nextState,

                    workflow: {

                        current:
                            nextState,

                        lastTransitionAt:
                            timestamp(),

                        history:

                            [

                                ...history,

                                {

                                    state:
                                        nextState,

                                    previousState:
                                        current,

                                    actor:
                                        options.actor ||
                                        "system",

                                    note:
                                        options.note ||
                                        "",

                                    timestamp:
                                        timestamp()

                                }

                            ]

                    },

                    ...(
                        options.data ||
                        {}
                    )

                }

            );


        audit(

            "WORKFLOW_TRANSITION",

            "order",

            orderId,

            {

                from:
                    current,

                to:
                    nextState,

                actor:
                    options.actor ||
                    "system"

            }

        );


        emit(

            EVENTS.ORDER_UPDATED,

            {
                order:
                    updated
            }

        );


        return updated;

    }


    /* =========================================================
       QUOTE
       ========================================================= */

    function createQuote(
        orderId,
        pricing,
        actor = ROLES.EQUIPMENT_OWNER
    ) {

        return transition(

            orderId,

            STATES.QUOTED,

            {

                actor,

                data: {

                    pricing: {

                        ...pricing

                    },

                    quoteCreatedAt:
                        timestamp()

                }

            }

        );

    }


    /* =========================================================
       FARMER ACCEPT
       ========================================================= */

    function farmerAccept(
        orderId
    ) {

        return transition(

            orderId,

            STATES.FARMER_ACCEPTED,

            {

                actor:
                    ROLES.FARMER

            }

        );

    }


    /* =========================================================
       OWNER ACCEPT
       ========================================================= */

    function ownerAccept(
        orderId
    ) {

        return transition(

            orderId,

            STATES.OWNER_ACCEPTED,

            {

                actor:
                    ROLES.EQUIPMENT_OWNER

            }

        );

    }


    /* =========================================================
       ASSIGN EQUIPMENT
       ========================================================= */

    function assignEquipment(
        orderId,
        equipmentId
    ) {

        const equipment =
            find(
                "equipment",
                equipmentId
            );


        if (!equipment) {

            throw new Error(
                "Equipment not found."
            );

        }


        update(

            "equipment",

            equipmentId,

            {

                availability:
                    "assigned"

            }

        );


        return transition(

            orderId,

            STATES.EQUIPMENT_ASSIGNED,

            {

                actor:
                    ROLES.EQUIPMENT_OWNER,

                data: {

                    equipmentId

                }

            }

        );

    }


    /* =========================================================
       ASSIGN OPERATOR
       ========================================================= */

    function assignOperator(
        orderId,
        operatorId
    ) {

        const operator =
            find(
                "operators",
                operatorId
            );


        if (!operator) {

            throw new Error(
                "Operator not found."
            );

        }


        update(

            "operators",

            operatorId,

            {

                availability:
                    "assigned"

            }

        );


        const order =
            find(
                "orders",
                orderId
            );


        const updated =
            transition(

                orderId,

                STATES.OPERATOR_ASSIGNED,

                {

                    actor:
                        ROLES.EQUIPMENT_OWNER,

                    data: {

                        operatorId,

                        operatorAssignedAt:
                            timestamp()

                    }

                }

            );


        update(

            "operators",

            operatorId,

            {

                totalJobs:
                    number(
                        operator.totalJobs
                    ) + 1

            }

        );


        notify({

            userId:
                operator.userId,

            title:
                "New operation assigned",

            message:
                `A new agricultural operation ${orderId} has been assigned to you.`,

            type:
                "operator-assignment",

            relatedEntityType:
                "order",

            relatedEntityId:
                orderId

        });


        return updated;

    }


    /* =========================================================
       OPERATOR ACCEPT
       ========================================================= */

    function operatorAccept(
        orderId,
        operatorId
    ) {

        const order =
            find(
                "orders",
                orderId
            );


        if (
            !order ||
            order.operatorId !==
            operatorId
        ) {

            throw new Error(
                "This order is not assigned to this operator."
            );

        }


        return transition(

            orderId,

            STATES.OPERATOR_ACCEPTED,

            {

                actor:
                    ROLES.OPERATOR,

                data: {

                    operatorAcceptance: {

                        status:
                            "accepted",

                        operatorId,

                        acceptedAt:
                            timestamp()

                    }

                }

            }

        );

    }


    /* =========================================================
       OPERATOR REJECT
       ========================================================= */

    function operatorReject(
        orderId,
        operatorId,
        reason = ""
    ) {

        const order =
            find(
                "orders",
                orderId
            );


        if (
            !order ||
            order.operatorId !==
            operatorId
        ) {

            throw new Error(
                "This order is not assigned to this operator."
            );

        }


        const updated =
            update(

                "orders",

                orderId,

                {

                    status:
                        "operator-rejected",

                    operatorAcceptance: {

                        status:
                            "rejected",

                        operatorId,

                        reason,

                        rejectedAt:
                            timestamp()

                    }

                }

            );


        update(

            "operators",

            operatorId,

            {

                availability:
                    "available"

            }

        );


        audit(

            "OPERATOR_REJECTED",

            "order",

            orderId,

            {

                operatorId,

                reason

            }

        );


        return updated;

    }


    /* =========================================================
       ASSIGN DRIVER
       ========================================================= */

    function assignDriver(
        orderId,
        driverId
    ) {

        const driver =
            find(
                "drivers",
                driverId
            );


        if (!driver) {

            throw new Error(
                "Driver not found."
            );

        }


        update(

            "drivers",

            driverId,

            {

                availability:
                    "assigned"

            }

        );


        return transition(

            orderId,

            STATES.DRIVER_ASSIGNED,

            {

                actor:
                    ROLES.LOGISTICS,

                data: {

                    driverId,

                    driverAssignedAt:
                        timestamp()

                }

            }

        );

    }


    /* =========================================================
       SHIPMENT
       ========================================================= */

    function createShipment(
        data = {}
    ) {

        const shipment = {

            id:
                data.id ||
                createId("SHP"),

            orderId:
                data.orderId ||
                null,

            buyerId:
                data.buyerId ||
                data.farmerId ||
                null,

            origin:
                data.origin ||
                {},

            destination:
                data.destination ||
                {},

            cargo: {

                weightKg:
                    number(
                        data.cargo?.weightKg ||
                        data.weightKg
                    ),

                volumeM3:
                    number(
                        data.cargo?.volumeM3 ||
                        data.volumeM3
                    ),

                quantity:
                    number(
                        data.cargo?.quantity ||
                        data.quantity,
                        1
                    ),

                category:
                    data.cargo?.category ||
                    "Agricultural goods"

            },

            pricing: {

                original:
                    number(
                        data.pricing?.original ||
                        data.transportPrice
                    ),

                optimized:
                    null,

                savings:
                    null

            },

            tripId:
                null,

            status:
                "created",

            createdAt:
                timestamp()

        };


        insert(
            "shipments",
            shipment
        );


        if (
            shipment.orderId
        ) {

            const order =
                find(
                    "orders",
                    shipment.orderId
                );


            if (
                order &&
                [
                    STATES.DRIVER_ASSIGNED,
                    STATES.OPERATOR_ACCEPTED,
                    STATES.EQUIPMENT_ASSIGNED
                ].includes(
                    order.status
                )
            ) {

                transition(

                    shipment.orderId,

                    STATES.SHIPMENT_CREATED,

                    {

                        actor:
                            "system",

                        data: {

                            shipmentId:
                                shipment.id

                        }

                    }

                );

            }

        }


        emit(

            EVENTS.SHIPMENT_CREATED,

            {
                shipment:
                    clone(shipment)
            }

        );


        audit(

            "SHIPMENT_CREATED",

            "shipment",

            shipment.id

        );


        return clone(shipment);

    }


    /* =========================================================
       ROUTE UTILITIES
       ========================================================= */

    function coordinate(
        point
    ) {

        if (!point) {

            return null;

        }


        const lat =
            number(
                point.latitude ??
                point.lat,
                NaN
            );


        const lon =
            number(
                point.longitude ??
                point.lng ??
                point.lon,
                NaN
            );


        if (
            !Number.isFinite(lat)
            ||
            !Number.isFinite(lon)
        ) {

            return null;

        }


        return {
            lat,
            lon
        };

    }


    function haversine(
        a,
        b
    ) {

        const A =
            coordinate(a);


        const B =
            coordinate(b);


        if (!A || !B) {

            return null;

        }


        const R =
            6371;


        const dLat =
            (
                B.lat -
                A.lat
            ) *
            Math.PI /
            180;


        const dLon =
            (
                B.lon -
                A.lon
            ) *
            Math.PI /
            180;


        const lat1 =
            A.lat *
            Math.PI /
            180;


        const lat2 =
            B.lat *
            Math.PI /
            180;


        const x =

            Math.sin(
                dLat / 2
            ) ** 2

            +

            Math.sin(
                dLon / 2
            ) ** 2

            *
            Math.cos(lat1)
            *
            Math.cos(lat2);


        return (

            R *

            2 *

            Math.atan2(

                Math.sqrt(x),

                Math.sqrt(
                    1 - x
                )

            )

        );

    }


    /* =========================================================
       SHIPMENT COMPATIBILITY
       ========================================================= */

    function checkCompatibility(
        shipments,
        vehicle
    ) {

        const reasons = [];


        const capacity =
            number(
                vehicle.capacityKg
            );


        const weight =
            shipments.reduce(

                (
                    total,
                    shipment
                ) =>

                    total +
                    number(
                        shipment
                            .cargo
                            ?.weightKg
                    ),

                0

            );


        if (
            capacity > 0 &&
            weight > capacity
        ) {

            reasons.push(
                "Vehicle capacity exceeded."
            );

        }


        /*
         * Compare route endpoints when coordinates exist.
         */

        for (
            let i = 0;
            i < shipments.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < shipments.length;
                j++
            ) {

                const A =
                    shipments[i];


                const B =
                    shipments[j];


                /*
                 * A simple compatibility test is used here.
                 * A production version should use a road-network
                 * routing service.
                 */

                if (
                    A.cargo?.category &&
                    B.cargo?.category &&
                    A.cargo.category !==
                    B.cargo.category
                ) {

                    /*
                     * Different cargo is not automatically
                     * incompatible. This is informational only.
                     */

                }

            }

        }


        return {

            compatible:
                reasons.length === 0,

            reasons,

            totalWeight:
                weight,

            capacity,

            remainingCapacity:
                Math.max(
                    0,
                    capacity -
                    weight
                )

        };

    }


    /* =========================================================
       SHARED COST ALLOCATION
       ========================================================= */

    function allocateSharedCost(
        shipments,
        totalCost,
        options = {}
    ) {

        const totalWeight =
            shipments.reduce(

                (
                    total,
                    shipment
                ) =>

                    total +
                    number(
                        shipment
                            .cargo
                            ?.weightKg
                    ),

                0

            );


        const totalOriginal =
            shipments.reduce(

                (
                    total,
                    shipment
                ) =>

                    total +
                    number(
                        shipment
                            .pricing
                            ?.original
                    ),

                0

            );


        const weightWeight =
            number(
                options.weightWeight,
                0.5
            );


        const priceWeight =
            number(
                options.priceWeight,
                0.5
            );


        const raw = [];


        shipments.forEach(

            shipment => {

                const weight =
                    number(
                        shipment
                            .cargo
                            ?.weightKg
                    );


                const original =
                    number(
                        shipment
                            .pricing
                            ?.original
                    );


                const weightShare =

                    totalWeight > 0

                        ?

                        weight /
                        totalWeight

                        :

                        0;


                const priceShare =

                    totalOriginal > 0

                        ?

                        original /
                        totalOriginal

                        :

                        0;


                const score =

                    (
                        weightShare *
                        weightWeight
                    )

                    +

                    (
                        priceShare *
                        priceWeight
                    );


                raw.push({

                    shipmentId:
                        shipment.id,

                    originalTransportPrice:
                        original,

                    score

                });

            }

        );


        const scoreTotal =
            raw.reduce(

                (
                    total,
                    item
                ) =>

                    total +
                    item.score,

                0

            );


        let allocatedTotal =
            0;


        const allocations =
            raw.map(

                (
                    item,
                    index
                ) => {

                    let allocated;


                    if (
                        index ===
                        raw.length - 1
                    ) {

                        allocated =
                            Math.max(
                                0,
                                totalCost -
                                allocatedTotal
                            );

                    }

                    else {

                        allocated =

                            scoreTotal > 0

                                ?

                                totalCost *
                                (
                                    item.score /
                                    scoreTotal
                                )

                                :

                                totalCost /
                                raw.length;

                        allocated =
                            Math.round(
                                allocated *
                                100
                            ) / 100;

                    }


                    allocatedTotal +=
                        allocated;


                    return {

                        shipmentId:
                            item.shipmentId,

                        originalTransportPrice:
                            item.originalTransportPrice,

                        allocatedTransportCost:
                            allocated,

                        savings:

                            Math.max(

                                0,

                                item.originalTransportPrice -
                                allocated

                            )

                    };

                }

            );


        return allocations;

    }


    /* =========================================================
       SHARED TRIP OPTIMIZER
       ========================================================= */

    function optimizeSharedTrip(
        shipmentIds,
        vehicle,
        options = {}
    ) {

        const shipments =
            shipmentIds

                .map(
                    id =>
                        find(
                            "shipments",
                            id
                        )
                )

                .filter(Boolean);


        if (
            shipments.length === 0
        ) {

            return {

                success:
                    false,

                reasons:
                    [
                        "No valid shipments."
                    ]

            };

        }


        const compatibility =
            checkCompatibility(

                shipments,

                vehicle

            );


        if (
            !compatibility.compatible
        ) {

            return {

                success:
                    false,

                compatibility

            };

        }


        /*
         * Route distance:
         *
         * 1. Use an externally supplied road distance if available.
         * 2. Otherwise use coordinate distance.
         * 3. Otherwise use a configurable estimate.
         *
         * Real production deployment should use a road routing API.
         */

        let distanceKm =
            number(
                options.actualRouteDistanceKm
            );


        if (
            distanceKm <= 0
        ) {

            let coordinateDistance =
                0;


            shipments.forEach(

                shipment => {

                    const d =
                        haversine(

                            shipment.origin,

                            shipment.destination

                        );


                    if (d) {

                        coordinateDistance +=
                            d;

                    }

                }

            );


            distanceKm =
                coordinateDistance;

        }


        if (
            distanceKm <= 0
        ) {

            distanceKm =
                number(
                    options.estimatedDistanceKm,
                    0
                );

        }


        const operatingCostPerKm =
            number(
                vehicle.operatingCostPerKm,
                0
            );


        const fixedCost =
            number(
                vehicle.fixedTripCost,
                0
            );


        const routeCost =

            (
                distanceKm *
                operatingCostPerKm
            )

            +

            fixedCost;


        const totalOriginal =
            shipments.reduce(

                (
                    total,
                    shipment
                ) =>

                    total +
                    number(
                        shipment
                            .pricing
                            ?.original
                    ),

                0

            );


        /*
         * If a route cost is unavailable, use the original
         * transport total as a ceiling/reference rather than
         * inventing a saving.
         */

        const sharedCost =

            routeCost > 0

                ?

                Math.min(
                    routeCost,
                    totalOriginal
                )

                :

                totalOriginal;


        const allocations =
            allocateSharedCost(

                shipments,

                sharedCost,

                options

            );


        const totalSavings =
            allocations.reduce(

                (
                    total,
                    item
                ) =>

                    total +
                    item.savings,

                0

            );


        const trip = {

            id:
                createId("TRIP"),

            vehicleId:
                vehicle.id ||
                null,

            driverId:
                vehicle.driverId ||
                null,

            equipmentOwnerId:
                vehicle.equipmentOwnerId ||
                null,

            shipmentIds:
                shipments.map(
                    shipment =>
                        shipment.id
                ),

            route: {

                distanceKm,

                origin:
                    shipments[0]
                        ?.origin ||
                    null,

                destinations:
                    shipments.map(

                        shipment =>
                            shipment.destination

                    )

            },

            capacity: {

                totalKg:
                    compatibility.totalWeight,

                vehicleKg:
                    compatibility.capacity,

                remainingKg:
                    compatibility.remainingCapacity

            },

            pricing: {

                totalOriginal,

                totalSharedTransportCost:
                    sharedCost,

                totalSavings

            },

            allocations,

            status:
                "planned",

            createdAt:
                timestamp()

        };


        return {

            success:
                true,

            trip

        };

    }


    /* =========================================================
       COMMIT TRIP
       ========================================================= */

    function createTrip(
        trip
    ) {

        insert(
            "trips",
            trip
        );


        trip.shipmentIds
            .forEach(

                shipmentId => {

                    update(

                        "shipments",

                        shipmentId,

                        {

                            tripId:
                                trip.id,

                            status:
                                "trip-assigned"

                        }

                    );

                }

            );


        audit(

            "SHARED_TRIP_CREATED",

            "trip",

            trip.id,

            {

                shipmentIds:
                    trip.shipmentIds

            }

        );


        emit(

            EVENTS.TRIP_CREATED,

            {
                trip:
                    clone(trip)
            }

        );


        return clone(trip);

    }


    function applyAllocations(
        tripId
    ) {

        const trip =
            find(
                "trips",
                tripId
            );


        if (!trip) {

            throw new Error(
                "Trip not found."
            );

        }


        trip.allocations
            .forEach(

                allocation => {

                    update(

                        "shipments",

                        allocation.shipmentId,

                        {

                            pricing: {

                                original:
                                    allocation
                                        .originalTransportPrice,

                                optimized:
                                    allocation
                                        .allocatedTransportCost,

                                savings:
                                    allocation
                                        .savings

                            }

                        }

                    );

                }

            );


        update(

            "trips",

            tripId,

            {

                allocationsApplied:
                    true,

                allocationAppliedAt:
                    timestamp()

            }

        );


        return find(
            "trips",
            tripId
        );

    }


    /* =========================================================
       LOGISTICS WORKFLOW
       ========================================================= */

    function startRouteMatching(
        orderId
    ) {

        return transition(

            orderId,

            STATES.ROUTE_MATCHING,

            {

                actor:
                    ROLES.LOGISTICS

            }

        );

    }


    function optimizeOrderRoute(
        orderId,
        shipmentIds,
        vehicle,
        options = {}
    ) {

        const order =
            find(
                "orders",
                orderId
            );


        if (!order) {

            throw new Error(
                "Order not found."
            );

        }


        if (
            order.status ===
            STATES.SHIPMENT_CREATED
        ) {

            startRouteMatching(
                orderId
            );

        }


        const result =
            optimizeSharedTrip(

                shipmentIds,

                vehicle,

                options

            );


        if (!result.success) {

            audit(

                "ROUTE_OPTIMIZATION_FAILED",

                "order",

                orderId,

                result

            );


            return result;

        }


        const trip =
            createTrip(
                result.trip
            );


        applyAllocations(
            trip.id
        );


        shipmentIds
            .forEach(

                shipmentId => {

                    const shipment =
                        find(
                            "shipments",
                            shipmentId
                        );


                    if (
                        shipment?.orderId
                    ) {

                        update(

                            "orders",

                            shipment.orderId,

                            {

                                status:
                                    STATES.ROUTE_OPTIMIZED,

                                tripId:
                                    trip.id,

                                routeOptimization: {

                                    status:
                                        "optimized",

                                    tripId:
                                        trip.id,

                                    route:
                                        trip.route,

                                    allocations:
                                        trip.allocations

                                }

                            }

                        );

                    }

                }

            );


        return {

            success:
                true,

            trip:
                find(
                    "trips",
                    trip.id
                )

        };

    }


    /* =========================================================
       SHARED COST ACCEPTANCE
       ========================================================= */

    function requestSharedCostAcceptance(
        tripId
    ) {

        const trip =
            find(
                "trips",
                tripId
            );


        if (!trip) {

            throw new Error(
                "Trip not found."
            );

        }


        trip.shipmentIds
            .forEach(

                shipmentId => {

                    const shipment =
                        find(
                            "shipments",
                            shipmentId
                        );


                    if (
                        !shipment ||
                        !shipment.orderId
                    ) {

                        return;

                    }


                    update(

                        "orders",

                        shipment.orderId,

                        {

                            status:
                                STATES.SHARED_COST_PENDING,

                            tripId

                        }

                    );


                    notify({

                        userId:
                            shipment.buyerId,

                        title:
                            "Optimized transport available",

                        message:
                            "Review the shared transport allocation for your shipment.",

                        type:
                            "shared-cost",

                        relatedEntityType:
                            "trip",

                        relatedEntityId:
                            tripId

                    });

                }

            );


        update(

            "trips",

            tripId,

            {

                status:
                    STATES.SHARED_COST_PENDING

            }

        );


        return find(
            "trips",
            tripId
        );

    }


    function acceptSharedCost(
        orderId
    ) {

        const order =
            find(
                "orders",
                orderId
            );


        if (
            !order ||
            order.status !==
            STATES.SHARED_COST_PENDING
        ) {

            throw new Error(
                "Order is not awaiting shared-cost acceptance."
            );

        }


        const updated =
            transition(

                orderId,

                STATES.SHARED_COST_ACCEPTED,

                {

                    actor:
                        ROLES.FARMER

                }

            );


        /*
         * If every shipment in the trip has accepted,
         * release the entire trip for pickup.
         */

        const trip =
            find(
                "trips",
                order.tripId
            );


        if (trip) {

            const allAccepted =
                trip.shipmentIds.every(

                    shipmentId => {

                        const shipment =
                            find(
                                "shipments",
                                shipmentId
                            );


                        if (
                            !shipment
                        ) {

                            return false;

                        }


                        const relatedOrder =
                            find(
                                "orders",
                                shipment.orderId
                            );


                        return (

                            relatedOrder?.status ===
                            STATES.SHARED_COST_ACCEPTED

                            ||

                            relatedOrder?.status ===
                            STATES.READY_FOR_PICKUP

                        );

                    }

                );


            if (allAccepted) {

                trip.shipmentIds
                    .forEach(

                        shipmentId => {

                            const shipment =
                                find(
                                    "shipments",
                                    shipmentId
                                );


                            if (
                                shipment?.orderId
                            ) {

                                const relatedOrder =
                                    find(
                                        "orders",
                                        shipment.orderId
                                    );


                                if (
                                    relatedOrder.status !==
                                    STATES.READY_FOR_PICKUP
                                ) {

                                    transition(

                                        shipment.orderId,

                                        STATES.READY_FOR_PICKUP,

                                        {

                                            actor:
                                                "system"

                                        }

                                    );

                                }

                            }

                        }

                    );


                update(

                    "trips",

                    trip.id,

                    {

                        status:
                            STATES.READY_FOR_PICKUP

                    }

                );

            }

        }


        return updated;

    }


    /* =========================================================
       DRIVER OPERATIONS
       ========================================================= */

    function driverStartPickup(
        orderId,
        driverId
    ) {

        validateDriver(
            orderId,
            driverId
        );


        return transition(

            orderId,

            STATES.PICKUP_STARTED,

            {

                actor:
                    ROLES.DRIVER,

                data: {

                    pickupStartedAt:
                        timestamp()

                }

            }

        );

    }


    function driverCompletePickup(
        orderId,
        driverId
    ) {

        validateDriver(
            orderId,
            driverId
        );


        return transition(

            orderId,

            STATES.PICKUP_COMPLETED,

            {

                actor:
                    ROLES.DRIVER,

                data: {

                    pickupCompletedAt:
                        timestamp()

                }

            }

        );

    }


    function driverStartTransit(
        orderId,
        driverId
    ) {

        validateDriver(
            orderId,
            driverId
        );


        return transition(

            orderId,

            STATES.IN_TRANSIT,

            {

                actor:
                    ROLES.DRIVER,

                data: {

                    transitStartedAt:
                        timestamp()

                }

            }

        );

    }


    function driverStartDelivery(
        orderId,
        driverId
    ) {

        validateDriver(
            orderId,
            driverId
        );


        return transition(

            orderId,

            STATES.DELIVERY_STARTED,

            {

                actor:
                    ROLES.DRIVER

            }

        );

    }


    function driverCompleteDelivery(
        orderId,
        driverId,
        deliveryData = {}
    ) {

        validateDriver(
            orderId,
            driverId
        );


        const updated =
            transition(

                orderId,

                STATES.DELIVERED,

                {

                    actor:
                        ROLES.DRIVER,

                    data: {

                        delivery: {

                            completedAt:
                                timestamp(),

                            receiverName:
                                deliveryData
                                    .receiverName ||
                                "",

                            notes:
                                deliveryData
                                    .notes ||
                                "",

                            location:
                                deliveryData
                                    .location ||
                                null

                        }

                    }

                }

            );


        const shipment =
            state.shipments.find(

                item =>
                    item.orderId ===
                    orderId

            );


        if (shipment) {

            update(

                "shipments",

                shipment.id,

                {

                    status:
                        "delivered",

                    deliveredAt:
                        timestamp()

                }

            );

        }


        return updated;

    }


    function validateDriver(
        orderId,
        driverId
    ) {

        const order =
            find(
                "orders",
                orderId
            );


        if (
            !order ||
            order.driverId !==
            driverId
        ) {

            throw new Error(
                "This job is not assigned to this driver."
            );

        }


        return true;

    }


    /* =========================================================
       OPERATOR WORKFLOW
       ========================================================= */

    function operatorArrive(
        orderId,
        operatorId,
        location = null
    ) {

        validateOperator(
            orderId,
            operatorId
        );


        return update(

            "orders",

            orderId,

            {

                status:
                    STATES.OPERATION_READY,

                operatorArrival: {

                    arrivedAt:
                        timestamp(),

                    location

                }

            }

        );

    }


    function operatorPrepare(
        orderId,
        operatorId,
        checklist = {}
    ) {

        validateOperator(
            orderId,
            operatorId
        );


        return update(

            "orders",

            orderId,

            {

                status:
                    STATES.OPERATION_READY,

                operationReadiness: {

                    checkedAt:
                        timestamp(),

                    equipmentChecked:
                        checklist
                            .equipmentChecked !==
                        false,

                    fieldReady:
                        checklist
                            .fieldReady !==
                        false,

                    safetyChecked:
                        checklist
                            .safetyChecked !==
                        false,

                    notes:
                        checklist.notes ||
                        ""

                }

            }

        );

    }


    function operatorStart(
        orderId,
        operatorId,
        startData = {}
    ) {

        validateOperator(
            orderId,
            operatorId
        );


        const updated =
            transition(

                orderId,

                STATES.OPERATION_STARTED,

                {

                    actor:
                        ROLES.OPERATOR,

                    data: {

                        operatorOperation: {

                            startedAt:
                                timestamp(),

                            startingMeter:
                                number(
                                    startData.meter
                                ),

                            startingAcreage:
                                number(
                                    startData.acreage
                                ),

                            notes:
                                startData.notes ||
                                "",

                            progress:
                                []

                        }

                    }

                }

            );


        setOperatorAvailability(

            operatorId,

            "on-job"

        );


        return updated;

    }


    function operatorProgress(
        orderId,
        operatorId,
        progressData = {}
    ) {

        validateOperator(
            orderId,
            operatorId
        );


        const order =
            find(
                "orders",
                orderId
            );


        const existing =
            order
                .operatorOperation
                ?.progress ||
                [];


        const entry = {

            id:
                createId("PROG"),

            timestamp:
                timestamp(),

            percentage:
                Math.max(

                    0,

                    Math.min(

                        100,

                        number(
                            progressData
                                .percentage
                        )

                    )

                ),

            completedAcreage:
                number(
                    progressData
                        .completedAcreage
                ),

            workedHours:
                number(
                    progressData
                        .workedHours
                ),

            machineHours:
                number(
                    progressData
                        .machineHours
                ),

            notes:
                progressData.notes ||
                "",

            location:
                progressData.location ||
                null

        };


        return update(

            "orders",

            orderId,

            {

                status:
                    STATES.OPERATION_STARTED,

                operatorOperation: {

                    ...(order
                        .operatorOperation ||
                        {}),

                    progress:

                        [

                            ...existing,

                            entry

                        ],

                    latestProgress:
                        entry

                }

            }

        );

    }


    function operatorPause(
        orderId,
        operatorId,
        reason = ""
    ) {

        validateOperator(
            orderId,
            operatorId
        );


        return transition(

            orderId,

            STATES.OPERATION_PAUSED,

            {

                actor:
                    ROLES.OPERATOR,

                data: {

                    pause: {

                        pausedAt:
                            timestamp(),

                        reason

                    }

                }

            }

        );

    }


    function operatorResume(
        orderId,
        operatorId
    ) {

        validateOperator(
            orderId,
            operatorId
        );


        return transition(

            orderId,

            STATES.OPERATION_STARTED,

            {

                actor:
                    ROLES.OPERATOR,

                data: {

                    resumedAt:
                        timestamp()

                }

            }

        );

    }


    function operatorReportIssue(
        orderId,
        operatorId,
        issueData = {}
    ) {

        validateOperator(
            orderId,
            operatorId
        );


        const issue = {

            id:
                createId("ISS"),

            orderId,

            operatorId,

            type:
                issueData.type ||
                "other",

            severity:
                issueData.severity ||
                "medium",

            description:
                issueData.description ||
                "",

            requiresImmediateStop:
                Boolean(
                    issueData
                        .requiresImmediateStop
                ),

            location:
                issueData.location ||
                null,

            createdAt:
                timestamp(),

            status:
                "open"

        };


        update(

            "orders",

            orderId,

            {

                status:
                    STATES.OPERATION_ISSUE,

                latestIssue:
                    issue

            }

        );


        audit(

            "OPERATOR_REPORTED_ISSUE",

            "order",

            orderId,

            issue

        );


        if (
            issue.requiresImmediateStop
            ||
            issue.type ===
            "safety"
        ) {

            update(

                "orders",

                orderId,

                {

                    status:
                        STATES.ON_HOLD,

                    holdReason:
                        issue.description,

                    holdCreatedAt:
                        timestamp()

                }

            );

        }


        return issue;

    }


    function operatorComplete(
        orderId,
        operatorId,
        completion = {}
    ) {

        validateOperator(
            orderId,
            operatorId
        );


        const result = {

            completedAt:
                timestamp(),

            completedAcreage:
                number(
                    completion.completedAcreage
                ),

            totalHours:
                number(
                    completion.totalHours
                ),

            machineHours:
                number(
                    completion.machineHours
                ),

            outputQuantity:
                number(
                    completion.outputQuantity
                ),

            outputUnit:
                completion.outputUnit ||
                "",

            qualityNotes:
                completion.qualityNotes ||
                "",

            operatorNotes:
                completion.operatorNotes ||
                "",

            result:
                completion.result ||
                "completed"

        };


        const updated =
            transition(

                orderId,

                STATES.OPERATION_COMPLETED,

                {

                    actor:
                        ROLES.OPERATOR,

                    data: {

                        operatorCompletion:
                            result

                    }

                }

            );


        const order =
            find(
                "orders",
                orderId
            );


        const operator =
            find(
                "operators",
                operatorId
            );


        if (operator) {

            update(

                "operators",

                operatorId,

                {

                    availability:
                        "available",

                    completedJobs:
                        number(
                            operator.completedJobs
                        ) + 1

                }

            );

        }


        notify({

            userId:
                find(
                    "farmers",
                    order.farmerId
                )?.userId,

            title:
                "Operation completed",

            message:
                `Operation ${orderId} has been completed by the operator.`,

            type:
                "operation-completed",

            relatedEntityType:
                "order",

            relatedEntityId:
                orderId

        });


        return updated;

    }


    function validateOperator(
        orderId,
        operatorId
    ) {

        const order =
            find(
                "orders",
                orderId
            );


        if (
            !order ||
            order.operatorId !==
            operatorId
        ) {

            throw new Error(
                "This job is not assigned to this operator."
            );

        }


        return true;

    }


    /* =========================================================
       FARMER CONFIRMATION
       ========================================================= */

    function farmerConfirmOperation(
        orderId,
        farmerId,
        confirmation = {}
    ) {

        const order =
            find(
                "orders",
                orderId
            );


        if (
            !order ||
            order.farmerId !==
            farmerId
        ) {

            throw new Error(
                "This order does not belong to this farmer."
            );

        }


        const result = {

            confirmed:
                confirmation.confirmed !==
                false,

            farmerId,

            comment:
                confirmation.comment ||
                "",

            confirmedAt:
                timestamp()

        };


        const next =
            result.confirmed

                ?

                STATES.INSPECTION_PENDING

                :

                STATES.DISPUTED;


        return transition(

            orderId,

            next,

            {

                actor:
                    ROLES.FARMER,

                data: {

                    farmerConfirmation:
                        result

                }

            }

        );

    }


    /* =========================================================
       INSPECTION
       ========================================================= */

    function completeInspection(
        orderId,
        inspectorId,
        inspection = {}
    ) {

        return transition(

            orderId,

            STATES.INSPECTION_COMPLETED,

            {

                actor:
                    inspectorId,

                data: {

                    inspection: {

                        passed:
                            inspection.passed !==
                            false,

                        notes:
                            inspection.notes ||
                            "",

                        score:
                            number(
                                inspection.score
                            ),

                        inspectorId,

                        completedAt:
                            timestamp()

                    }

                }

            }

        );

    }


    /* =========================================================
       PAYMENT
       ========================================================= */

    function createPayment(
        data = {}
    ) {

        const payment = {

            id:
                data.id ||
                createId("PAY"),

            orderId:
                data.orderId ||
                null,

            tripId:
                data.tripId ||
                null,

            payerId:
                data.payerId ||
                null,

            receiverId:
                data.receiverId ||
                null,

            amount:
                number(
                    data.amount
                ),

            type:
                data.type ||
                "service",

            method:
                data.method ||
                null,

            reference:
                data.reference ||
                null,

            status:
                data.status ||
                "pending",

            createdAt:
                timestamp()

        };


        insert(
            "payments",
            payment
        );


        emit(

            EVENTS.PAYMENT_CREATED,

            {
                payment:
                    clone(payment)
            }

        );


        return clone(payment);

    }


    function processPayment(
        orderId,
        paymentData
    ) {

        transition(

            orderId,

            STATES.PAYMENT_PROCESSING,

            {

                actor:
                    "payment-system"

            }

        );


        const payment =
            createPayment({

                ...paymentData,

                orderId,

                status:
                    "processing"

            });


        return payment;

    }


    function completePayment(
        orderId,
        paymentId
    ) {

        const payment =
            find(
                "payments",
                paymentId
            );


        if (!payment) {

            throw new Error(
                "Payment not found."
            );

        }


        update(

            "payments",

            paymentId,

            {

                status:
                    "completed",

                completedAt:
                    timestamp()

            }

        );


        return transition(

            orderId,

            STATES.PAYMENT_COMPLETED,

            {

                actor:
                    "payment-system",

                data: {

                    paymentId

                }

            }

        );

    }


    /* =========================================================
       FINANCE / SETTLEMENT
       ========================================================= */

    function createSettlement(
        data = {}
    ) {

        const gross =
            number(
                data.grossAmount
            );


        const operatorAmount =
            number(
                data.operatorAmount
            );


        const transportAmount =
            number(
                data.transportAmount
            );


        const platformFee =
            number(
                data.platformFee
            );


        const deductions =
            number(
                data.deductions
            );


        const net =

            data.netAmount !== undefined

                ?

                number(
                    data.netAmount
                )

                :

                Math.max(

                    0,

                    gross -
                    operatorAmount -
                    transportAmount -
                    platformFee -
                    deductions

                );


        const settlement = {

            id:
                data.id ||
                createId("SET"),

            ownerId:
                data.ownerId ||
                null,

            operatorId:
                data.operatorId ||
                null,

            driverId:
                data.driverId ||
                null,

            orderId:
                data.orderId ||
                null,

            tripId:
                data.tripId ||
                null,

            grossAmount:
                gross,

            operatorAmount,

            transportAmount,

            platformFee,

            deductions,

            netAmount:
                net,

            status:
                data.status ||
                "pending",

            createdAt:
                timestamp()

        };


        insert(

            "settlements",

            settlement

        );


        emit(

            EVENTS.SETTLEMENT_CREATED,

            {
                settlement:
                    clone(settlement)
            }

        );


        audit(

            "SETTLEMENT_CREATED",

            "settlement",

            settlement.id,

            {
                netAmount:
                    net
            }

        );


        return clone(settlement);

    }


    /* =========================================================
       INVOICE
       ========================================================= */

    function createInvoice(
        data = {}
    ) {

        const invoice = {

            id:
                data.id ||
                createId("INV"),

            orderId:
                data.orderId ||
                null,

            tripId:
                data.tripId ||
                null,

            customerId:
                data.customerId ||
                null,

            amount:
                number(
                    data.amount
                ),

            items:
                Array.isArray(
                    data.items
                )
                    ? data.items
                    : [],

            status:
                "generated",

            issuedAt:
                timestamp(),

            dueAt:
                data.dueAt ||
                null

        };


        insert(
            "invoices",
            invoice
        );


        return clone(invoice);

    }


    /* =========================================================
       NOTIFICATIONS
       ========================================================= */

    function notify(
        data = {}
    ) {

        const notification = {

            id:
                data.id ||
                createId("NTF"),

            userId:
                data.userId ||
                null,

            type:
                data.type ||
                "system",

            title:
                data.title ||
                "AgriVision update",

            message:
                data.message ||
                "",

            relatedEntityType:
                data.relatedEntityType ||
                null,

            relatedEntityId:
                data.relatedEntityId ||
                null,

            read:
                false,

            createdAt:
                timestamp()

        };


        insert(

            "notifications",

            notification

        );


        emit(

            EVENTS.NOTIFICATION_CREATED,

            {
                notification:
                    clone(notification)
            }

        );


        return clone(notification);

    }


    function markNotificationRead(
        notificationId
    ) {

        return update(

            "notifications",

            notificationId,

            {
                read:
                    true
            }

        );

    }


    /* =========================================================
       MAINTENANCE
       ========================================================= */

    function createMaintenance(
        data = {}
    ) {

        const record = {

            id:
                data.id ||
                createId("MNT"),

            equipmentId:
                data.equipmentId ||
                null,

            ownerId:
                data.ownerId ||
                null,

            type:
                data.type ||
                "routine",

            description:
                data.description ||
                "",

            scheduledDate:
                data.scheduledDate ||
                null,

            completedDate:
                data.completedDate ||
                null,

            cost:
                number(
                    data.cost
                ),

            status:
                data.status ||
                "scheduled",

            createdAt:
                timestamp()

        };


        insert(
            "maintenance",
            record
        );


        return clone(record);

    }


    /* =========================================================
       SERVICE AREA
       ========================================================= */

    function createServiceArea(
        data = {}
    ) {

        const area = {

            id:
                data.id ||
                createId("AREA"),

            ownerId:
                data.ownerId ||
                null,

            district:
                data.district ||
                "",

            taluk:
                data.taluk ||
                "",

            village:
                data.village ||
                "",

            radiusKm:
                number(
                    data.radiusKm
                ),

            deliveryAvailable:
                data.deliveryAvailable !==
                false,

            pickupAvailable:
                data.pickupAvailable !==
                false,

            createdAt:
                timestamp()

        };


        insert(
            "serviceAreas",
            area
        );


        return clone(area);

    }


    /* =========================================================
       DOCUMENTS
       ========================================================= */

    function addDocument(
        data = {}
    ) {

        const document = {

            id:
                data.id ||
                createId("DOC"),

            ownerId:
                data.ownerId ||
                null,

            entityType:
                data.entityType ||
                null,

            entityId:
                data.entityId ||
                null,

            documentType:
                data.documentType ||
                "other",

            fileName:
                data.fileName ||
                "",

            status:
                data.status ||
                "pending",

            uploadedAt:
                timestamp(),

            verifiedAt:
                null

        };


        insert(
            "documents",
            document
        );


        return clone(document);

    }


    /* =========================================================
       DISPUTES
       ========================================================= */

    function createDispute(
        data = {}
    ) {

        const dispute = {

            id:
                data.id ||
                createId("DSP"),

            orderId:
                data.orderId ||
                null,

            shipmentId:
                data.shipmentId ||
                null,

            tripId:
                data.tripId ||
                null,

            raisedBy:
                data.raisedBy ||
                null,

            category:
                data.category ||
                "other",

            reason:
                data.reason ||
                "",

            amount:
                number(
                    data.amount
                ),

            evidence:
                Array.isArray(
                    data.evidence
                )
                    ? data.evidence
                    : [],

            status:
                "open",

            createdAt:
                timestamp()

        };


        insert(
            "disputes",
            dispute
        );


        if (
            dispute.orderId
        ) {

            const order =
                find(
                    "orders",
                    dispute.orderId
                );


            if (
                order &&
                order.status !==
                STATES.COMPLETED
            ) {

                update(

                    "orders",

                    dispute.orderId,

                    {

                        status:
                            STATES.DISPUTED,

                        disputeId:
                            dispute.id

                    }

                );

            }

        }


        return clone(dispute);

    }


    /* =========================================================
       RATINGS
       ========================================================= */

    function createRating(
        data = {}
    ) {

        const rating = {

            id:
                data.id ||
                createId("RAT"),

            orderId:
                data.orderId ||
                null,

            fromUserId:
                data.fromUserId ||
                null,

            toUserId:
                data.toUserId ||
                null,

            category:
                data.category ||
                "overall",

            score:
                Math.max(

                    1,

                    Math.min(

                        5,

                        number(
                            data.score,
                            1
                        )

                    )

                ),

            review:
                data.review ||
                "",

            createdAt:
                timestamp()

        };


        insert(
            "ratings",
            rating
        );


        return clone(rating);

    }


    /* =========================================================
       OPERATOR DASHBOARD
       ========================================================= */

    function operatorDashboard(
        operatorId
    ) {

        const operator =
            find(
                "operators",
                operatorId
            );


        if (!operator) {

            throw new Error(
                "Operator not found."
            );

        }


        const jobs =
            state.orders.filter(

                order =>
                    order.operatorId ===
                    operatorId

            );


        const pending =
            jobs.filter(

                order =>

                    [
                        STATES.OPERATOR_ASSIGNED,
                        "operator-rejected"
                    ].includes(
                        order.status
                    )

            );


        const accepted =
            jobs.filter(

                order =>
                    order.status ===
                    STATES.OPERATOR_ACCEPTED

            );


        const active =
            jobs.filter(

                order =>

                    [
                        STATES.OPERATION_READY,
                        STATES.OPERATION_STARTED,
                        STATES.OPERATION_PAUSED,
                        STATES.OPERATION_ISSUE
                    ].includes(
                        order.status
                    )

            );


        const completed =
            jobs.filter(

                order =>

                    [
                        STATES.OPERATION_COMPLETED,
                        STATES.COMPLETED,
                        STATES.SETTLED
                    ].includes(
                        order.status
                    )

            );


        return {

            operator:
                clone(operator),

            counts: {

                total:
                    jobs.length,

                pending:
                    pending.length,

                accepted:
                    accepted.length,

                active:
                    active.length,

                completed:
                    completed.length

            },

            pendingJobs:
                clone(pending),

            acceptedJobs:
                clone(accepted),

            activeJobs:
                clone(active),

            completedJobs:
                clone(completed)

        };

    }


    /* =========================================================
       OPERATOR EARNINGS
       ========================================================= */

    function operatorEarnings(
        operatorId
    ) {

        const orders =
            state.orders.filter(

                order =>
                    order.operatorId ===
                    operatorId

            );


        const settlements =
            state.settlements.filter(

                settlement =>
                    settlement.operatorId ===
                    operatorId

            );


        const totalBooked =
            orders.reduce(

                (
                    total,
                    order
                ) =>

                    total +
                    number(
                        order.pricing
                            ?.operator
                    ),

                0

            );


        const paid =
            settlements.reduce(

                (
                    total,
                    settlement
                ) =>

                    total +
                    number(
                        settlement.operatorAmount
                    ),

                0

            );


        return {

            totalBooked,

            paid,

            pending:
                Math.max(
                    0,
                    totalBooked -
                    paid
                ),

            jobs:
                orders.map(

                    order => ({

                        orderId:
                            order.id,

                        amount:
                            number(
                                order.pricing
                                    ?.operator
                            ),

                        status:
                            order.status

                    })

                )

        };

    }


    /* =========================================================
       EQUIPMENT OWNER DASHBOARD
       ========================================================= */

    function ownerDashboard(
        ownerId
    ) {

        const equipment =
            state.equipment.filter(

                item =>
                    item.ownerId ===
                    ownerId

            );


        const orders =
            state.orders.filter(

                item =>
                    item.equipmentOwnerId ===
                    ownerId

            );


        const trips =
            state.trips.filter(

                item =>
                    item.equipmentOwnerId ===
                    ownerId

            );


        const settlements =
            state.settlements.filter(

                item =>
                    item.ownerId ===
                    ownerId

            );


        return {

            equipmentCount:
                equipment.length,

            bookingCount:
                orders.length,

            activeBookings:
                orders.filter(

                    order =>
                        ![
                            STATES.COMPLETED,
                            STATES.CANCELLED
                        ].includes(
                            order.status
                        )

                ).length,

            tripCount:
                trips.length,

            grossRevenue:
                settlements.reduce(

                    (
                        total,
                        item
                    ) =>

                        total +
                        number(
                            item.grossAmount
                        ),

                    0

                ),

            netRevenue:
                settlements.reduce(

                    (
                        total,
                        item
                    ) =>

                        total +
                        number(
                            item.netAmount
                        ),

                    0

                )

        };

    }


    /* =========================================================
       FARMER DASHBOARD
       ========================================================= */

    function farmerDashboard(
        farmerId
    ) {

        const orders =
            state.orders.filter(

                order =>
                    order.farmerId ===
                    farmerId

            );


        const shipments =
            state.shipments.filter(

                shipment =>
                    shipment.buyerId ===
                    farmerId

            );


        return {

            orders:
                orders.length,

            activeOrders:
                orders.filter(

                    order =>
                        ![
                            STATES.COMPLETED,
                            STATES.CANCELLED
                        ].includes(
                            order.status
                        )

                ).length,

            completedOrders:
                orders.filter(

                    order =>
                        order.status ===
                        STATES.COMPLETED

                ).length,

            shipments:
                shipments.length,

            totalSpent:
                orders.reduce(

                    (
                        total,
                        order
                    ) =>

                        total +
                        number(
                            order.pricing
                                ?.total
                        ),

                    0

                )

        };

    }


    /* =========================================================
       LOGISTICS DASHBOARD
       ========================================================= */

    function logisticsDashboard() {

        const orders =
            state.orders;


        const shipments =
            state.shipments;


        const trips =
            state.trips;


        return {

            totalOrders:
                orders.length,

            activeOrders:
                orders.filter(

                    order =>
                        ![
                            STATES.COMPLETED,
                            STATES.CANCELLED
                        ].includes(
                            order.status
                        )

                ).length,

            shipments:
                shipments.length,

            activeTrips:
                trips.filter(

                    trip =>
                        ![
                            STATES.COMPLETED,
                            STATES.CANCELLED
                        ].includes(
                            trip.status
                        )

                ).length,

            optimizedTrips:
                trips.filter(

                    trip =>
                        trip.allocations
                            ?.length > 1

                ).length

        };

    }


    /* =========================================================
       QUERY HELPERS
       ========================================================= */

    function getOrder(
        orderId
    ) {

        return find(
            "orders",
            orderId
        );

    }


    function getShipment(
        shipmentId
    ) {

        return find(
            "shipments",
            shipmentId
        );

    }


    function getTrip(
        tripId
    ) {

        return find(
            "trips",
            tripId
        );

    }


    function getOrdersForOperator(
        operatorId
    ) {

        return state.orders
            .filter(

                order =>
                    order.operatorId ===
                    operatorId

            )
            .map(clone);

    }


    function getOrdersForFarmer(
        farmerId
    ) {

        return state.orders
            .filter(

                order =>
                    order.farmerId ===
                    farmerId

            )
            .map(clone);

    }


    function getEquipmentForOwner(
        ownerId
    ) {

        return state.equipment
            .filter(

                item =>
                    item.ownerId ===
                    ownerId

            )
            .map(clone);

    }


    function getBookingsForOwner(
        ownerId
    ) {

        return state.orders
            .filter(

                order =>
                    order.equipmentOwnerId ===
                    ownerId

            )
            .map(clone);

    }


    function getNotifications(
        userId
    ) {

        return state.notifications
            .filter(

                item =>
                    item.userId ===
                    userId

            )
            .map(clone);

    }


    function workflowSummary(
        orderId
    ) {

        const order =
            getOrder(
                orderId
            );


        if (!order) {

            return null;

        }


        return {

            orderId,

            state:
                order.status,

            label:
                STATE_LABELS[
                    order.status
                ] ||
                order.status,

            possibleNextStates:
                TRANSITIONS[
                    order.status
                ] || [],

            possibleNextLabels:

                (
                    TRANSITIONS[
                        order.status
                    ] || []
                )

                .map(

                    stateName => ({

                        state:
                            stateName,

                        label:
                            STATE_LABELS[
                                stateName
                            ] ||
                            stateName

                    })

                ),

            history:
                clone(
                    order.workflow
                        ?.history ||
                    []
                )

        };

    }


    /* =========================================================
       COMPLETE ORDER
       ========================================================= */

    function completeOrder(
        orderId
    ) {

        const order =
            getOrder(
                orderId
            );


        if (!order) {

            throw new Error(
                "Order not found."
            );

        }


        /*
         * Release assigned resources.
         */

        if (
            order.equipmentId
        ) {

            update(

                "equipment",

                order.equipmentId,

                {

                    availability:
                        "available"

                }

            );

        }


        if (
            order.operatorId
        ) {

            update(

                "operators",

                order.operatorId,

                {

                    availability:
                        "available"

                }

            );

        }


        if (
            order.driverId
        ) {

            update(

                "drivers",

                order.driverId,

                {

                    availability:
                        "available"

                }

            );

        }


        return transition(

            orderId,

            STATES.COMPLETED,

            {

                actor:
                    "system",

                data: {

                    completedAt:
                        timestamp()

                }

            }

        );

    }


    /* =========================================================
       CANCEL
       ========================================================= */

    function cancelOrder(
        orderId,
        reason = "",
        actor = "system"
    ) {

        return transition(

            orderId,

            STATES.CANCELLED,

            {

                actor,

                data: {

                    cancellationReason:
                        reason,

                    cancelledAt:
                        timestamp()

                }

            }

        );

    }


    /* =========================================================
       HOLD
       ========================================================= */

    function holdOrder(
        orderId,
        reason = "",
        actor = "system"
    ) {

        return transition(

            orderId,

            STATES.ON_HOLD,

            {

                actor,

                data: {

                    holdReason:
                        reason,

                    holdCreatedAt:
                        timestamp()

                }

            }

        );

    }


    /* =========================================================
       PUBLIC ENGINE
       ========================================================= */

    const Engine = {

        version:
            VERSION,


        constants: {

            ROLES,

            STATES,

            STATE_LABELS,

            JOB_TYPES,

            EVENTS

        },


        storage: {

            get:
                getState,

            save,

            reset

        },


        database: {

            find,

            insert,

            update,

            remove

        },


        auth: {

            createUser,

            login,

            logout

        },


        farmer: {

            create:
                createFarmer,

            dashboard:
                farmerDashboard,

            orders:
                getOrdersForFarmer

        },


        owner: {

            create:
                createEquipmentOwner,

            dashboard:
                ownerDashboard,

            equipment:
                getEquipmentForOwner,

            bookings:
                getBookingsForOwner

        },


        operator: {

            create:
                createOperator,

            update:
                updateOperator,

            availability:
                setOperatorAvailability,

            dashboard:
                operatorDashboard,

            earnings:
                operatorEarnings,

            jobs:
                getOrdersForOperator,

            accept:
                operatorAccept,

            reject:
                operatorReject,

            arrive:
                operatorArrive,

            prepare:
                operatorPrepare,

            start:
                operatorStart,

            progress:
                operatorProgress,

            pause:
                operatorPause,

            resume:
                operatorResume,

            reportIssue:
                operatorReportIssue,

            complete:
                operatorComplete

        },


        driver: {

            create:
                createDriver,

            startPickup:
                driverStartPickup,

            completePickup:
                driverCompletePickup,

            startTransit:
                driverStartTransit,

            startDelivery:
                driverStartDelivery,

            completeDelivery:
                driverCompleteDelivery

        },


        equipment: {

            create:
                createEquipment,

            update:
                updateEquipment,

            assign:
                assignEquipment

        },


        order: {

            create:
                createOrder,

            get:
                getOrder,

            quote:
                createQuote,

            farmerAccept:
                farmerAccept,

            ownerAccept:
                ownerAccept,

            assignEquipment:
                assignEquipment,

            assignOperator:
                assignOperator,

            assignDriver:
                assignDriver,

            transition,

            cancel:
                cancelOrder,

            hold:
                holdOrder,

            complete:
                completeOrder

        },


        shipment: {

            create:
                createShipment,

            get:
                getShipment

        },


        logistics: {

            dashboard:
                logisticsDashboard,

            startRouteMatching,

            optimize:
                optimizeOrderRoute,

            requestSharedCostAcceptance,

            acceptSharedCost

        },


        route: {

            distance:
                haversine,

            compatibility:
                checkCompatibility,

            allocateCost:
                allocateSharedCost,

            optimize:
                optimizeSharedTrip,

            createTrip,

            applyAllocations

        },


        payment: {

            create:
                createPayment,

            process:
                processPayment,

            complete:
                completePayment

        },


        finance: {

            settlement:
                createSettlement,

            invoice:
                createInvoice

        },


        notifications: {

            create:
                notify,

            markRead:
                markNotificationRead,

            get:
                getNotifications

        },


        maintenance: {

            create:
                createMaintenance

        },


        serviceArea: {

            create:
                createServiceArea

        },


        documents: {

            add:
                addDocument

        },


        disputes: {

            create:
                createDispute

        },


        ratings: {

            create:
                createRating

        },


        farmerConfirmation: {

            confirm:
                farmerConfirmOperation

        },


        inspection: {

            complete:
                completeInspection

        },


        workflow: {

            states:
                STATES,

            transitions:
                TRANSITIONS,

            labels:
                STATE_LABELS,

            transition,

            summary:
                workflowSummary

        },


        audit: {

            add:
                audit

        }

    };


    /* =========================================================
       EXPORT
       ========================================================= */

    AgriVision.Engine =
        Engine;


    /*
     * Backward-compatible aliases.
     *
     * This means existing pages can gradually migrate from
     * Data / Workflow / Operator objects to the single engine.
     */

    AgriVision.Data =
        Engine;


    AgriVision.Workflow =
        Engine.workflow;


    AgriVision.Operator =
        Engine.operator;


    console.info(
        `AgriVision Engine ${VERSION} loaded.`
    );


})(window);