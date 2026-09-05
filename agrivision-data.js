/* ============================================================
   AGRIVISION KARNATAKA
   CENTRAL DATA + STATE LAYER
   ============================================================

   PURPOSE
   ------------------------------------------------------------
   This file is the shared application state for the frontend.

   It connects:

   FARMER
      ↓
   ORDER
      ↓
   SHIPMENT
      ↓
   EQUIPMENT
      ↓
   OPERATOR
      ↓
   DRIVER
      ↓
   LOGISTICS
      ↓
   SMART ROUTE
      ↓
   SHARED COST
      ↓
   COMPLETION
      ↓
   FINANCE
      ↓
   SETTLEMENT
      ↓
   RATING / HISTORY

   This frontend layer uses localStorage for persistence while
   the project is being developed.

   Later, the same API can be connected to a real backend/database.
   ============================================================ */

(function (window) {

    "use strict";


    /* =========================================================
       APPLICATION CONSTANTS
       ========================================================= */

    const VERSION = "1.0.0";

    const STORAGE_KEY =
        "agrivision_karnataka_app_state";


    const EVENTS = {

        STATE_CHANGED:
            "agrivision:state-changed",

        ORDER_CREATED:
            "agrivision:order-created",

        ORDER_UPDATED:
            "agrivision:order-updated",

        SHIPMENT_CREATED:
            "agrivision:shipment-created",

        SHIPMENT_UPDATED:
            "agrivision:shipment-updated",

        EQUIPMENT_UPDATED:
            "agrivision:equipment-updated",

        OPERATOR_UPDATED:
            "agrivision:operator-updated",

        DRIVER_UPDATED:
            "agrivision:driver-updated",

        TRIP_CREATED:
            "agrivision:trip-created",

        TRIP_UPDATED:
            "agrivision:trip-updated",

        PAYMENT_CREATED:
            "agrivision:payment-created",

        SETTLEMENT_CREATED:
            "agrivision:settlement-created",

        NOTIFICATION_CREATED:
            "agrivision:notification-created"

    };



    /* =========================================================
       UTILITY FUNCTIONS
       ========================================================= */

    function clone(value) {

        return JSON.parse(
            JSON.stringify(value)
        );

    }


    function now() {

        return new Date()
            .toISOString();

    }


    function createId(prefix) {

        return (

            prefix +
            "-" +
            Date.now().toString(36) +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 8)

        ).toUpperCase();

    }


    function emit(eventName, detail = {}) {

        window.dispatchEvent(

            new CustomEvent(
                eventName,
                {
                    detail
                }
            )

        );

    }



    /* =========================================================
       DEFAULT STATE
       ========================================================= */

    function createDefaultState() {

        return {

            meta: {

                version:
                    VERSION,

                createdAt:
                    now(),

                updatedAt:
                    now()

            },


            session: {

                currentUserId:
                    null,

                currentRole:
                    null,

                isAuthenticated:
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



    /* =========================================================
       STATE LOAD / SAVE
       ========================================================= */

    function loadState() {

        try {

            const stored =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (!stored) {

                return createDefaultState();

            }


            const parsed =
                JSON.parse(stored);


            return {

                ...createDefaultState(),

                ...parsed

            };

        }

        catch (error) {

            console.error(
                "AgriVision state could not be loaded:",
                error
            );


            return createDefaultState();

        }

    }



    let state =
        loadState();



    function saveState() {

        state.meta.updatedAt =
            now();


        try {

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(state)

            );

        }

        catch (error) {

            console.error(
                "AgriVision state could not be saved:",
                error
            );

        }


        emit(
            EVENTS.STATE_CHANGED,
            {
                state:
                    clone(state)
            }
        );

    }



    /* =========================================================
       RESET
       ========================================================= */

    function resetState() {

        state =
            createDefaultState();


        saveState();

    }



    /* =========================================================
       GET STATE
       ========================================================= */

    function getState() {

        return clone(state);

    }



    /* =========================================================
       GENERIC COLLECTION HELPERS
       ========================================================= */

    function getCollection(
        collectionName
    ) {

        if (
            !Array.isArray(
                state[collectionName]
            )
        ) {

            throw new Error(
                `Unknown collection: ${collectionName}`
            );

        }


        return state[
            collectionName
        ];

    }


    function findById(
        collectionName,
        id
    ) {

        return getCollection(
            collectionName
        ).find(
            item =>
                item.id === id
        ) || null;

    }


    function addToCollection(
        collectionName,
        item
    ) {

        getCollection(
            collectionName
        ).push(item);


        saveState();


        return clone(item);

    }


    function updateCollectionItem(
        collectionName,
        id,
        updates
    ) {

        const collection =
            getCollection(
                collectionName
            );


        const index =
            collection.findIndex(
                item =>
                    item.id === id
            );


        if (index === -1) {

            return null;

        }


        collection[index] = {

            ...collection[index],

            ...updates,

            updatedAt:
                now()

        };


        saveState();


        return clone(
            collection[index]
        );

    }



    /* =========================================================
       AUDIT LOG
       ========================================================= */

    function addAuditLog(
        action,
        entityType,
        entityId,
        details = {}
    ) {

        const entry = {

            id:
                createId("AUD"),

            timestamp:
                now(),

            action,

            entityType,

            entityId,

            details:
                clone(details)

        };


        state.auditLog.push(
            entry
        );


        saveState();


        return clone(entry);

    }



    /* =========================================================
       USER / SESSION
       ========================================================= */

    function setSession(
        userId,
        role
    ) {

        state.session = {

            currentUserId:
                userId,

            currentRole:
                role,

            isAuthenticated:
                Boolean(userId)

        };


        saveState();


        addAuditLog(

            "SESSION_UPDATED",

            "session",

            userId,

            {
                role
            }

        );

    }


    function clearSession() {

        state.session = {

            currentUserId:
                null,

            currentRole:
                null,

            isAuthenticated:
                false

        };


        saveState();

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

            district:
                data.district ||
                "",

            taluk:
                data.taluk ||
                "",

            village:
                data.village ||
                "",

            createdAt:
                now(),

            updatedAt:
                now(),

            status:
                "active"

        };


        addToCollection(
            "farmers",
            farmer
        );


        addAuditLog(
            "FARMER_CREATED",
            "farmer",
            farmer.id
        );


        emit(
            EVENTS.ORDER_CREATED,
            {
                farmer:
                    clone(farmer)
            }
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

            status:
                "active",

            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(
            "equipmentOwners",
            owner
        );


        addAuditLog(
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

            availability:
                data.availability ||
                "available",

            status:
                "active",

            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(
            "operators",
            operator
        );


        addAuditLog(
            "OPERATOR_CREATED",
            "operator",
            operator.id
        );


        return clone(operator);

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

            licenseStatus:
                data.licenseStatus ||
                "pending",

            availability:
                data.availability ||
                "available",

            currentLocation:
                data.currentLocation ||
                null,

            rating:
                data.rating ||
                0,

            status:
                "active",

            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(
            "drivers",
            driver
        );


        addAuditLog(
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

            year:
                data.year ||
                null,

            registrationNumber:
                data.registrationNumber ||
                "",

            capacityKg:
                Number(
                    data.capacityKg ||
                    0
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
                    Number(
                        data.pricing
                            ?.hourly ||
                        0
                    ),

                daily:
                    Number(
                        data.pricing
                            ?.daily ||
                        0
                    ),

                custom:
                    Number(
                        data.pricing
                            ?.custom ||
                        0
                    )

            },

            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(
            "equipment",
            equipment
        );


        addAuditLog(
            "EQUIPMENT_CREATED",
            "equipment",
            equipment.id
        );


        emit(
            EVENTS.EQUIPMENT_UPDATED,
            {
                equipment:
                    clone(equipment)
            }
        );


        return clone(equipment);

    }



    /* =========================================================
       ORDER CREATION
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

            farmerName:
                data.farmerName ||
                "",


            equipmentId:
                data.equipmentId ||
                null,

            equipmentOwnerId:
                data.equipmentOwnerId ||
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
                    data.operationType ||
                    "",

                crop:
                    data.operation?.crop ||
                    "",

                acreage:
                    Number(
                        data.operation?.acreage ||
                        0
                    ),

                description:
                    data.operation?.description ||
                    ""

            },


            location: {

                farm:
                    data.location?.farm ||
                    null,

                district:
                    data.location?.district ||
                    "",

                taluk:
                    data.location?.taluk ||
                    "",

                village:
                    data.location?.village ||
                    ""

            },


            schedule: {

                requestedDate:
                    data.schedule
                        ?.requestedDate ||
                    null,

                startTime:
                    data.schedule
                        ?.startTime ||
                    null,

                endTime:
                    data.schedule
                        ?.endTime ||
                    null

            },


            pricing: {

                equipment:
                    Number(
                        data.pricing
                            ?.equipment ||
                        0
                    ),

                operator:
                    Number(
                        data.pricing
                            ?.operator ||
                        0
                    ),

                transport:
                    Number(
                        data.pricing
                            ?.transport ||
                        0
                    ),

                platformFee:
                    Number(
                        data.pricing
                            ?.platformFee ||
                        0
                    ),

                total:
                    Number(
                        data.pricing
                            ?.total ||
                        0
                    )

            },


            status:
                data.status ||
                "requested",


            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(
            "orders",
            order
        );


        addAuditLog(
            "ORDER_CREATED",
            "order",
            order.id,
            {
                status:
                    order.status
            }
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
       ORDER STATUS
       ========================================================= */

    function updateOrderStatus(
        orderId,
        status,
        extraData = {}
    ) {

        const order =
            updateCollectionItem(

                "orders",

                orderId,

                {

                    status,

                    ...extraData

                }

            );


        if (!order) {

            return null;

        }


        addAuditLog(

            "ORDER_STATUS_CHANGED",

            "order",

            orderId,

            {
                status
            }

        );


        emit(

            EVENTS.ORDER_UPDATED,

            {
                order
            }

        );


        return order;

    }



    /* =========================================================
       SHIPMENT CREATION
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
                    Number(
                        data.cargo
                            ?.weightKg ||
                        data.weightKg ||
                        0
                    ),

                volumeM3:
                    Number(
                        data.cargo
                            ?.volumeM3 ||
                        data.volumeM3 ||
                        0
                    ),

                quantity:
                    Number(
                        data.cargo
                            ?.quantity ||
                        data.quantity ||
                        1
                    ),

                category:
                    data.cargo
                        ?.category ||
                    "Agricultural goods"

            },


            pricing: {

                originalTransportPrice:
                    Number(
                        data.pricing
                            ?.originalTransportPrice ||
                        data.transportPrice ||
                        0
                    ),

                optimizedTransportPrice:
                    null,

                savings:
                    null

            },


            status:
                data.status ||
                "accepted",


            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(
            "shipments",
            shipment
        );


        addAuditLog(

            "SHIPMENT_CREATED",

            "shipment",

            shipment.id,

            {
                orderId:
                    shipment.orderId
            }

        );


        emit(

            EVENTS.SHIPMENT_CREATED,

            {
                shipment:
                    clone(shipment)
            }

        );


        return clone(shipment);

    }



    /* =========================================================
       SHIPMENT STATUS
       ========================================================= */

    function updateShipment(
        shipmentId,
        updates = {}
    ) {

        const shipment =
            updateCollectionItem(

                "shipments",

                shipmentId,

                updates

            );


        if (!shipment) {

            return null;

        }


        addAuditLog(

            "SHIPMENT_UPDATED",

            "shipment",

            shipmentId,

            updates

        );


        emit(

            EVENTS.SHIPMENT_UPDATED,

            {
                shipment
            }

        );


        return shipment;

    }



    /* =========================================================
       EQUIPMENT ASSIGNMENT
       ========================================================= */

    function assignEquipment(
        orderId,
        equipmentId
    ) {

        return updateOrderStatus(

            orderId,

            "equipment-assigned",

            {
                equipmentId
            }

        );

    }



    /* =========================================================
       OPERATOR ASSIGNMENT
       ========================================================= */

    function assignOperator(
        orderId,
        operatorId
    ) {

        const order =
            updateOrderStatus(

                orderId,

                "operator-assigned",

                {
                    operatorId
                }

            );


        if (order) {

            updateCollectionItem(

                "operators",

                operatorId,

                {
                    availability:
                        "assigned"
                }

            );


            emit(

                EVENTS.OPERATOR_UPDATED,

                {
                    operatorId,
                    orderId
                }

            );

        }


        return order;

    }



    /* =========================================================
       DRIVER ASSIGNMENT
       ========================================================= */

    function assignDriver(
        orderId,
        driverId
    ) {

        const order =
            updateOrderStatus(

                orderId,

                "driver-assigned",

                {
                    driverId
                }

            );


        if (order) {

            updateCollectionItem(

                "drivers",

                driverId,

                {
                    availability:
                        "assigned"
                }

            );


            emit(

                EVENTS.DRIVER_UPDATED,

                {
                    driverId,
                    orderId
                }

            );

        }


        return order;

    }



    /* =========================================================
       SHARED TRIP CREATION
       ========================================================= */

    function createTrip(
        tripData
    ) {

        const trip = {

            id:
                tripData.id ||
                createId("TRIP"),

            vehicleId:
                tripData.vehicleId ||
                null,

            driverId:
                tripData.driverId ||
                null,

            equipmentOwnerId:
                tripData.equipmentOwnerId ||
                null,

            shipmentIds:
                Array.isArray(
                    tripData.shipmentIds
                )
                    ? tripData.shipmentIds
                    : [],

            route:
                tripData.route ||
                {},

            capacity:
                tripData.capacity ||
                {},

            pricing:
                tripData.pricing ||
                {},

            allocations:
                tripData.allocations ||
                [],

            driverEarnings:
                tripData.driverEarnings ||
                {},

            status:
                tripData.status ||
                "planned",

            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(
            "trips",
            trip
        );


        /*
         * Connect every shipment to the trip.
         */

        trip.shipmentIds.forEach(
            shipmentId => {

                updateShipment(

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


        addAuditLog(

            "TRIP_CREATED",

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



    /* =========================================================
       TRIP STATUS
       ========================================================= */

    function updateTripStatus(
        tripId,
        status,
        extraData = {}
    ) {

        const trip =
            updateCollectionItem(

                "trips",

                tripId,

                {

                    status,

                    ...extraData

                }

            );


        if (!trip) {

            return null;

        }


        addAuditLog(

            "TRIP_STATUS_CHANGED",

            "trip",

            tripId,

            {
                status
            }

        );


        emit(

            EVENTS.TRIP_UPDATED,

            {
                trip
            }

        );


        return trip;

    }



    /* =========================================================
       APPLY SHARED COST ALLOCATION
       ========================================================= */

    function applySharedAllocation(
        tripId,
        allocations
    ) {

        const trip =
            findById(
                "trips",
                tripId
            );


        if (!trip) {

            return null;

        }


        trip.allocations =
            clone(allocations);


        trip.allocations.forEach(
            allocation => {

                updateShipment(

                    allocation.shipmentId,

                    {

                        pricing: {

                            optimizedTransportPrice:
                                allocation
                                    .allocatedTransportCost,

                            originalTransportPrice:
                                allocation
                                    .originalTransportPrice,

                            savings:
                                allocation
                                    .savings

                        }

                    }

                );

            }
        );


        trip.updatedAt =
            now();


        saveState();


        addAuditLog(

            "SHARED_COST_APPLIED",

            "trip",

            tripId,

            {
                allocations
            }

        );


        return clone(trip);

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

            shipmentId:
                data.shipmentId ||
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

            type:
                data.type ||
                "transport",

            amount:
                Number(
                    data.amount ||
                    0
                ),

            status:
                data.status ||
                "pending",

            method:
                data.method ||
                null,

            reference:
                data.reference ||
                null,

            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(
            "payments",
            payment
        );


        addAuditLog(

            "PAYMENT_CREATED",

            "payment",

            payment.id,

            {
                amount:
                    payment.amount
            }

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



    /* =========================================================
       SETTLEMENT
       ========================================================= */

    function createSettlement(
        data = {}
    ) {

        const settlement = {

            id:
                data.id ||
                createId("SET"),

            ownerId:
                data.ownerId ||
                null,

            tripId:
                data.tripId ||
                null,

            orderId:
                data.orderId ||
                null,

            grossAmount:
                Number(
                    data.grossAmount ||
                    0
                ),

            operatorAmount:
                Number(
                    data.operatorAmount ||
                    0
                ),

            transportAmount:
                Number(
                    data.transportAmount ||
                    0
                ),

            platformFee:
                Number(
                    data.platformFee ||
                    0
                ),

            deductions:
                Number(
                    data.deductions ||
                    0
                ),

            netAmount:
                Number(
                    data.netAmount ||
                    0
                ),

            status:
                data.status ||
                "pending",

            createdAt:
                now(),

            updatedAt:
                now()

        };


        /*
         * If net amount was not explicitly supplied,
         * calculate it.
         */

        if (
            !data.netAmount
        ) {

            settlement.netAmount =

                settlement.grossAmount

                -

                settlement.operatorAmount

                -

                settlement.transportAmount

                -

                settlement.platformFee

                -

                settlement.deductions;

        }


        settlement.netAmount =
            Math.max(
                0,
                settlement.netAmount
            );


        addToCollection(

            "settlements",

            settlement

        );


        addAuditLog(

            "SETTLEMENT_CREATED",

            "settlement",

            settlement.id,

            {
                netAmount:
                    settlement.netAmount
            }

        );


        emit(

            EVENTS.SETTLEMENT_CREATED,

            {
                settlement:
                    clone(settlement)
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

            settlementId:
                data.settlementId ||
                null,

            customerId:
                data.customerId ||
                null,

            amount:
                Number(
                    data.amount ||
                    0
                ),

            status:
                data.status ||
                "generated",

            issuedAt:
                now(),

            dueAt:
                data.dueAt ||
                null,

            items:
                Array.isArray(
                    data.items
                )
                    ? data.items
                    : []

        };


        addToCollection(
            "invoices",
            invoice
        );


        addAuditLog(

            "INVOICE_CREATED",

            "invoice",

            invoice.id

        );


        return clone(invoice);

    }



    /* =========================================================
       DISPUTE
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

            amount:
                Number(
                    data.amount ||
                    0
                ),

            reason:
                data.reason ||
                "",

            evidence:
                Array.isArray(
                    data.evidence
                )
                    ? data.evidence
                    : [],

            status:
                "open",

            resolution:
                null,

            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(
            "disputes",
            dispute
        );


        addAuditLog(

            "DISPUTE_CREATED",

            "dispute",

            dispute.id

        );


        return clone(dispute);

    }



    /* =========================================================
       NOTIFICATION
       ========================================================= */

    function createNotification(
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
                now()

        };


        addToCollection(

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



    /* =========================================================
       NOTIFICATION READ
       ========================================================= */

    function markNotificationRead(
        notificationId
    ) {

        return updateCollectionItem(

            "notifications",

            notificationId,

            {
                read: true
            }

        );

    }



    /* =========================================================
       DOCUMENT
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
                now(),

            verifiedAt:
                null

        };


        addToCollection(
            "documents",
            document
        );


        addAuditLog(

            "DOCUMENT_ADDED",

            "document",

            document.id

        );


        return clone(document);

    }



    /* =========================================================
       SERVICE AREA
       ========================================================= */

    function saveServiceArea(
        data = {}
    ) {

        const serviceArea = {

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
                Number(
                    data.radiusKm ||
                    0
                ),

            mode:
                data.mode ||
                "local",

            deliveryAvailable:
                data.deliveryAvailable !== false,

            farmerPickupAvailable:
                Boolean(
                    data.farmerPickupAvailable
                ),

            longDistance:
                Boolean(
                    data.longDistance
                ),

            updatedAt:
                now()

        };


        addToCollection(

            "serviceAreas",

            serviceArea

        );


        return clone(serviceArea);

    }



    /* =========================================================
       MAINTENANCE RECORD
       ========================================================= */

    function createMaintenanceRecord(
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
                Number(
                    data.cost ||
                    0
                ),

            status:
                data.status ||
                "scheduled",

            createdAt:
                now(),

            updatedAt:
                now()

        };


        addToCollection(

            "maintenance",

            record

        );


        return clone(record);

    }



    /* =========================================================
       RATING
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
                        Number(
                            data.score ||
                            0
                        )
                    )
                ),

            review:
                data.review ||
                "",

            createdAt:
                now()

        };


        addToCollection(
            "ratings",
            rating
        );


        return clone(rating);

    }



    /* =========================================================
       DASHBOARD AGGREGATION
       ========================================================= */

    function getOwnerDashboard(
        ownerId
    ) {

        const ownerEquipment =
            state.equipment.filter(
                equipment =>
                    equipment.ownerId ===
                    ownerId
            );


        const ownerOrders =
            state.orders.filter(
                order =>
                    order.equipmentOwnerId ===
                    ownerId
            );


        const ownerTrips =
            state.trips.filter(
                trip =>
                    trip.equipmentOwnerId ===
                    ownerId
            );


        const ownerSettlements =
            state.settlements.filter(
                settlement =>
                    settlement.ownerId ===
                    ownerId
            );


        const ownerMaintenance =
            state.maintenance.filter(
                record =>
                    record.ownerId ===
                    ownerId
            );


        const pendingSettlements =
            ownerSettlements.filter(
                settlement =>
                    settlement.status ===
                    "pending"
            );


        const completedSettlements =
            ownerSettlements.filter(
                settlement =>
                    settlement.status ===
                    "completed"
            );


        const totalGross =
            ownerSettlements.reduce(

                (
                    total,
                    settlement
                ) =>

                    total +
                    Number(
                        settlement.grossAmount ||
                        0
                    ),

                0

            );


        const totalNet =
            ownerSettlements.reduce(

                (
                    total,
                    settlement
                ) =>

                    total +
                    Number(
                        settlement.netAmount ||
                        0
                    ),

                0

            );


        return {

            equipmentCount:
                ownerEquipment.length,

            orderCount:
                ownerOrders.length,

            tripCount:
                ownerTrips.length,

            pendingSettlementCount:
                pendingSettlements.length,

            completedSettlementCount:
                completedSettlements.length,

            maintenanceCount:
                ownerMaintenance.length,

            totalGross:
                totalGross,

            totalNet:
                totalNet

        };

    }



    /* =========================================================
       FARMER ORDER HISTORY
       ========================================================= */

    function getFarmerOrders(
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



    /* =========================================================
       OWNER EQUIPMENT
       ========================================================= */

    function getOwnerEquipment(
        ownerId
    ) {

        return state.equipment
            .filter(
                equipment =>
                    equipment.ownerId ===
                    ownerId
            )
            .map(clone);

    }



    /* =========================================================
       OWNER BOOKINGS
       ========================================================= */

    function getOwnerBookings(
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



    /* =========================================================
       OWNER FINANCE
       ========================================================= */

    function getOwnerFinance(
        ownerId
    ) {

        const settlements =
            state.settlements.filter(
                settlement =>
                    settlement.ownerId ===
                    ownerId
            );


        const payments =
            state.payments.filter(
                payment =>
                    payment.receiverId ===
                    ownerId
            );


        const invoices =
            state.invoices.filter(
                invoice =>
                    invoice.customerId ===
                    ownerId
            );


        return {

            settlements:
                settlements.map(clone),

            payments:
                payments.map(clone),

            invoices:
                invoices.map(clone)

        };

    }



    /* =========================================================
       CONNECT SMART ROUTE ENGINE
       ========================================================= */

    function optimizeShipments(
        shipmentIds,
        vehicle,
        options = {}
    ) {

        if (
            !window.AgriVision ||
            !window.AgriVision
                .SmartRouteEngine
        ) {

            throw new Error(

                "SmartRouteEngine must be loaded before optimizeShipments()."

            );

        }


        const shipments =
            shipmentIds

                .map(
                    id =>
                        findById(
                            "shipments",
                            id
                        )
                )

                .filter(Boolean);


        if (
            shipments.length === 0
        ) {

            throw new Error(
                "No valid shipments supplied."
            );

        }


        return window.AgriVision
            .SmartRouteEngine
            .optimize
            .buildSharedTrip(

                shipments,

                vehicle,

                options

            );

    }



    /* =========================================================
       COMMIT OPTIMIZED TRIP
       ========================================================= */

    function commitOptimizedTrip(
        result
    ) {

        if (
            !result ||
            !result.success ||
            !result.trip
        ) {

            throw new Error(
                "Invalid optimization result."
            );

        }


        const trip =
            createTrip(
                result.trip
            );


        applySharedAllocation(

            trip.id,

            result.trip
                .allocations

        );


        return findById(
            "trips",
            trip.id
        );

    }



    /* =========================================================
       COMPLETE TRIP
       ========================================================= */

    function completeTrip(
        tripId
    ) {

        const trip =
            updateTripStatus(

                tripId,

                "completed"

            );


        if (!trip) {

            return null;

        }


        trip.shipmentIds
            .forEach(
                shipmentId => {

                    updateShipment(

                        shipmentId,

                        {
                            status:
                                "delivered",
                            completedAt:
                                now()
                        }

                    );

                }
            );


        /*
         * Driver becomes available again.
         */

        if (
            trip.driverId
        ) {

            updateCollectionItem(

                "drivers",

                trip.driverId,

                {
                    availability:
                        "available"
                }

            );

        }


        addAuditLog(

            "TRIP_COMPLETED",

            "trip",

            tripId

        );


        return findById(
            "trips",
            tripId
        );

    }



    /* =========================================================
       PUBLIC API
       ========================================================= */

    const API = {

        version:
            VERSION,


        events:
            EVENTS,


        state: {

            get:
                getState,

            save:
                saveState,

            reset:
                resetState

        },


        session: {

            set:
                setSession,

            clear:
                clearSession

        },


        query: {

            findById,

            getOwnerDashboard,

            getFarmerOrders,

            getOwnerEquipment,

            getOwnerBookings,

            getOwnerFinance

        },


        farmer: {

            create:
                createFarmer

        },


        owner: {

            create:
                createEquipmentOwner

        },


        operator: {

            create:
                createOperator,

            assign:
                assignOperator

        },


        driver: {

            create:
                createDriver,

            assign:
                assignDriver

        },


        equipment: {

            create:
                createEquipment,

            assign:
                assignEquipment

        },


        order: {

            create:
                createOrder,

            update:
                updateOrderStatus

        },


        shipment: {

            create:
                createShipment,

            update:
                updateShipment

        },


        trip: {

            create:
                createTrip,

            update:
                updateTripStatus,

            optimize:
                optimizeShipments,

            commitOptimization:
                commitOptimizedTrip,

            applyAllocation:
                applySharedAllocation,

            complete:
                completeTrip

        },


        finance: {

            payment:
                createPayment,

            settlement:
                createSettlement,

            invoice:
                createInvoice

        },


        dispute: {

            create:
                createDispute

        },


        notification: {

            create:
                createNotification,

            markRead:
                markNotificationRead

        },


        document: {

            add:
                addDocument

        },


        serviceArea: {

            save:
                saveServiceArea

        },


        maintenance: {

            create:
                createMaintenanceRecord

        },


        rating: {

            create:
                createRating

        },


        audit: {

            add:
                addAuditLog

        }

    };



    /* =========================================================
       GLOBAL EXPORT
       ========================================================= */

    window.AgriVision =
        window.AgriVision || {};


    window.AgriVision
        .Data = API;


    console.info(
        "AgriVision Central Data Layer loaded:",
        VERSION
    );


})(window);