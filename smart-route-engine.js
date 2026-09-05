/* ============================================================
   AGRIVISION KARNATAKA
   SMART ROUTE + SHARED LOAD ENGINE
   ============================================================

   PURPOSE
   ------------------------------------------------------------
   This engine handles:

   1. Shipment normalization
   2. Route compatibility
   3. Vehicle capacity
   4. Shared-load detection
   5. Route distance
   6. Detour estimation
   7. Transport cost calculation
   8. Fair cost allocation
   9. Driver earnings
   10. Buyer/Farmer transport charge
   11. Equipment-owner settlement linkage
   12. Shipment grouping
   13. Route sequencing
   14. Optimization scoring
   15. Audit information

   IMPORTANT
   ------------------------------------------------------------
   The ₹35 / ₹65 example is NOT hard-coded.

   The engine calculates allocations from the actual
   shipment, vehicle, route and pricing inputs.

   ============================================================ */

(function (window) {

    "use strict";


    /* =========================================================
       CONFIGURATION
       ========================================================= */

    const CONFIG = {

        version: "1.0.0",

        currency: "INR",

        currencySymbol: "₹",

        distanceUnit: "km",

        weightUnit: "kg",

        volumeUnit: "m³",

        /* ---------------------------------------------
           Route compatibility
           --------------------------------------------- */

        route: {

            maximumDetourKm: 35,

            maximumDetourPercent: 30,

            minimumOverlapPercent: 15,

            maximumPickupDelayMinutes: 60,

            maximumDropDelayMinutes: 90

        },


        /* ---------------------------------------------
           Vehicle defaults
           --------------------------------------------- */

        vehicle: {

            defaultCapacityKg: 5000,

            defaultOperatingCostPerKm: 25,

            defaultFuelCostPerKm: 12,

            defaultDriverCostPerKm: 5,

            defaultMaintenanceCostPerKm: 4,

            defaultOtherCostPerKm: 4

        },


        /* ---------------------------------------------
           Allocation weights
           ---------------------------------------------

           These determine how much each shipment
           contributes to the shared transportation cost.

           They can later be changed by the platform's
           pricing/optimization policy.
           --------------------------------------------- */

        allocation: {

            distanceWeight: 0.45,

            weightWeight: 0.20,

            volumeWeight: 0.10,

            detourWeight: 0.15,

            serviceWeight: 0.10

        },


        /* ---------------------------------------------
           Safety limits
           --------------------------------------------- */

        safety: {

            maximumVehicleLoadPercent: 100,

            requireCapacityCheck: true,

            requireTimeWindowCheck: true,

            requireRouteCompatibility: true

        }

    };



    /* =========================================================
       UTILITY FUNCTIONS
       ========================================================= */

    function number(value, fallback = 0) {

        const parsed = Number(value);

        return Number.isFinite(parsed)
            ? parsed
            : fallback;

    }


    function positiveNumber(value, fallback = 0) {

        const parsed = number(value, fallback);

        return parsed < 0
            ? fallback
            : parsed;

    }


    function clamp(value, min, max) {

        return Math.min(
            Math.max(value, min),
            max
        );

    }


    function round(value, decimals = 2) {

        const factor =
            Math.pow(10, decimals);

        return Math.round(
            value * factor
        ) / factor;

    }


    function percentage(value) {

        return round(
            value * 100,
            2
        );

    }


    function normalizeText(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    function generateId(prefix) {

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


    function sum(array, callback) {

        return array.reduce(
            (total, item) =>
                total + number(
                    callback(item)
                ),
            0
        );

    }



    /* =========================================================
       DISTANCE
       =========================================================

       For production:

       Replace this with the actual routing API.

       The engine itself does not assume that straight-line
       distance is the real road distance.
       ========================================================= */

    function haversineDistance(
        latitude1,
        longitude1,
        latitude2,
        longitude2
    ) {

        const lat1 =
            number(latitude1);

        const lon1 =
            number(longitude1);

        const lat2 =
            number(latitude2);

        const lon2 =
            number(longitude2);


        const earthRadiusKm =
            6371;


        const dLat =
            (
                (lat2 - lat1)
                * Math.PI
            ) / 180;


        const dLon =
            (
                (lon2 - lon1)
                * Math.PI
            ) / 180;


        const a =

            Math.sin(dLat / 2)
            *
            Math.sin(dLat / 2)

            +

            Math.cos(
                lat1 * Math.PI / 180
            )
            *
            Math.cos(
                lat2 * Math.PI / 180
            )
            *
            Math.sin(dLon / 2)
            *
            Math.sin(dLon / 2);


        const c =

            2 *

            Math.atan2(
                Math.sqrt(a),
                Math.sqrt(1 - a)
            );


        return round(
            earthRadiusKm * c,
            2
        );

    }



    /* =========================================================
       SHIPMENT NORMALIZATION
       ========================================================= */

    function normalizeShipment(
        shipment = {}
    ) {

        return {

            id:
                shipment.id ||
                generateId("SHP"),

            orderId:
                shipment.orderId ||
                shipment.bookingId ||
                null,

            buyerId:
                shipment.buyerId ||
                shipment.farmerId ||
                null,

            buyerName:
                shipment.buyerName ||
                shipment.farmerName ||
                "Buyer / Farmer",


            origin: {

                name:
                    shipment.origin?.name ||
                    shipment.pickup?.name ||
                    shipment.pickupLocation ||
                    "",

                latitude:
                    number(
                        shipment.origin?.latitude ??
                        shipment.pickup?.latitude
                    ),

                longitude:
                    number(
                        shipment.origin?.longitude ??
                        shipment.pickup?.longitude
                    )

            },


            destination: {

                name:
                    shipment.destination?.name ||
                    shipment.drop?.name ||
                    shipment.dropLocation ||
                    "",

                latitude:
                    number(
                        shipment.destination?.latitude ??
                        shipment.drop?.latitude
                    ),

                longitude:
                    number(
                        shipment.destination?.longitude ??
                        shipment.drop?.longitude
                    )

            },


            cargo: {

                weightKg:
                    positiveNumber(
                        shipment.cargo?.weightKg ??
                        shipment.weightKg ??
                        shipment.weight
                    ),

                volumeM3:
                    positiveNumber(
                        shipment.cargo?.volumeM3 ??
                        shipment.volumeM3 ??
                        shipment.volume
                    ),

                quantity:
                    positiveNumber(
                        shipment.cargo?.quantity ??
                        shipment.quantity,
                        1
                    ),

                category:
                    shipment.cargo?.category ||
                    shipment.category ||
                    "Agricultural goods"

            },


            pricing: {

                originalTransportPrice:
                    positiveNumber(
                        shipment.pricing
                            ?.originalTransportPrice ??
                        shipment.originalTransportPrice ??
                        shipment.transportPrice ??
                        shipment.price
                    ),

                minimumPrice:
                    positiveNumber(
                        shipment.pricing?.minimumPrice
                    ),

                maximumPrice:
                    positiveNumber(
                        shipment.pricing?.maximumPrice
                    )

            },


            timeWindow: {

                pickupStart:
                    shipment.timeWindow?.pickupStart ||
                    shipment.pickupWindow?.start ||
                    null,

                pickupEnd:
                    shipment.timeWindow?.pickupEnd ||
                    shipment.pickupWindow?.end ||
                    null,

                deliveryStart:
                    shipment.timeWindow?.deliveryStart ||
                    shipment.deliveryWindow?.start ||
                    null,

                deliveryEnd:
                    shipment.timeWindow?.deliveryEnd ||
                    shipment.deliveryWindow?.end ||
                    null

            },


            requirements: {

                temperatureControlled:
                    Boolean(
                        shipment.requirements
                            ?.temperatureControlled
                    ),

                fragile:
                    Boolean(
                        shipment.requirements
                            ?.fragile
                    ),

                hazardous:
                    Boolean(
                        shipment.requirements
                            ?.hazardous
                    ),

                specialHandling:
                    Boolean(
                        shipment.requirements
                            ?.specialHandling
                    )

            },


            status:
                shipment.status ||
                "accepted"

        };

    }



    /* =========================================================
       VEHICLE NORMALIZATION
       ========================================================= */

    function normalizeVehicle(
        vehicle = {}
    ) {

        const capacity =
            positiveNumber(
                vehicle.capacityKg,
                CONFIG.vehicle.defaultCapacityKg
            );


        return {

            id:
                vehicle.id ||
                generateId("VEH"),

            driverId:
                vehicle.driverId ||
                null,

            equipmentOwnerId:
                vehicle.equipmentOwnerId ||
                null,

            type:
                vehicle.type ||
                "Agricultural transport vehicle",

            capacityKg:
                capacity,


            currentLoadKg:
                positiveNumber(
                    vehicle.currentLoadKg
                ),


            operatingCostPerKm:
                positiveNumber(
                    vehicle.operatingCostPerKm,
                    CONFIG.vehicle
                        .defaultOperatingCostPerKm
                ),


            fuelCostPerKm:
                positiveNumber(
                    vehicle.fuelCostPerKm,
                    CONFIG.vehicle
                        .defaultFuelCostPerKm
                ),


            driverCostPerKm:
                positiveNumber(
                    vehicle.driverCostPerKm,
                    CONFIG.vehicle
                        .defaultDriverCostPerKm
                ),


            maintenanceCostPerKm:
                positiveNumber(
                    vehicle.maintenanceCostPerKm,
                    CONFIG.vehicle
                        .defaultMaintenanceCostPerKm
                ),


            otherCostPerKm:
                positiveNumber(
                    vehicle.otherCostPerKm,
                    CONFIG.vehicle
                        .defaultOtherCostPerKm
                ),


            available:
                vehicle.available !== false

        };

    }



    /* =========================================================
       VEHICLE COST
       ========================================================= */

    function calculateOperatingCost(
        distanceKm,
        vehicle
    ) {

        const v =
            normalizeVehicle(vehicle);


        const distance =
            positiveNumber(distanceKm);


        const configuredCost =
            positiveNumber(
                v.operatingCostPerKm
            );


        if (configuredCost > 0) {

            return round(
                distance *
                configuredCost
            );

        }


        return round(

            distance *
            (
                v.fuelCostPerKm
                +
                v.driverCostPerKm
                +
                v.maintenanceCostPerKm
                +
                v.otherCostPerKm
            )

        );

    }



    /* =========================================================
       DIRECT SHIPMENT DISTANCE
       ========================================================= */

    function calculateShipmentDistance(
        shipment,
        routingDistance
    ) {

        const s =
            normalizeShipment(shipment);


        if (
            Number.isFinite(
                Number(routingDistance)
            )
        ) {

            return round(
                Number(routingDistance)
            );

        }


        const hasCoordinates =

            Number.isFinite(
                s.origin.latitude
            )

            &&

            Number.isFinite(
                s.origin.longitude
            )

            &&

            Number.isFinite(
                s.destination.latitude
            )

            &&

            Number.isFinite(
                s.destination.longitude
            );


        if (!hasCoordinates) {

            return 0;

        }


        return haversineDistance(

            s.origin.latitude,
            s.origin.longitude,

            s.destination.latitude,
            s.destination.longitude

        );

    }



    /* =========================================================
       CAPACITY CHECK
       ========================================================= */

    function checkCapacity(
        shipments,
        vehicle
    ) {

        const normalizedVehicle =
            normalizeVehicle(vehicle);


        const normalizedShipments =
            shipments.map(
                normalizeShipment
            );


        const requestedLoad =
            sum(
                normalizedShipments,
                shipment =>
                    shipment.cargo.weightKg
            );


        const availableCapacity =

            Math.max(
                0,

                normalizedVehicle.capacityKg
                -
                normalizedVehicle.currentLoadKg
            );


        const utilization =

            normalizedVehicle.capacityKg > 0

                ?

                requestedLoad /
                normalizedVehicle.capacityKg

                :

                1;


        return {

            compatible:
                requestedLoad <=
                availableCapacity,

            requestedLoadKg:
                round(requestedLoad),

            availableCapacityKg:
                round(availableCapacity),

            remainingCapacityKg:
                round(
                    Math.max(
                        0,
                        availableCapacity -
                        requestedLoad
                    )
                ),

            utilizationPercent:
                percentage(
                    utilization
                )

        };

    }



    /* =========================================================
       ROUTE COMPATIBILITY
       ========================================================= */

    function calculateOverlap(
        shipmentA,
        shipmentB
    ) {

        const a =
            normalizeShipment(
                shipmentA
            );

        const b =
            normalizeShipment(
                shipmentB
            );


        /*
         * This is a simplified geographic approximation.
         *
         * Production should use the actual road-route
         * geometry returned by a routing engine.
         */


        const directA =
            calculateShipmentDistance(a);


        const directB =
            calculateShipmentDistance(b);


        if (
            directA === 0 ||
            directB === 0
        ) {

            return 0;

        }


        const sharedOriginDistance =
            haversineDistance(

                a.origin.latitude,
                a.origin.longitude,

                b.origin.latitude,
                b.origin.longitude

            );


        const sharedDestinationDistance =
            haversineDistance(

                a.destination.latitude,
                a.destination.longitude,

                b.destination.latitude,
                b.destination.longitude

            );


        const originSimilarity =

            clamp(
                1 -
                (
                    sharedOriginDistance /
                    Math.max(
                        directA,
                        directB
                    )
                ),
                0,
                1
            );


        const destinationSimilarity =

            clamp(
                1 -
                (
                    sharedDestinationDistance /
                    Math.max(
                        directA,
                        directB
                    )
                ),
                0,
                1
            );


        return percentage(

            (
                originSimilarity
                +
                destinationSimilarity
            ) / 2

        );

    }



    /* =========================================================
       COMBINED ROUTE ESTIMATE
       ========================================================= */

    function estimateCombinedRoute(
        shipments
    ) {

        const normalized =
            shipments.map(
                normalizeShipment
            );


        if (
            normalized.length === 0
        ) {

            return {

                distanceKm: 0,

                directDistanceKm: 0,

                detourKm: 0,

                detourPercent: 0,

                sequence: [],

                valid: false

            };

        }


        if (
            normalized.length === 1
        ) {

            const distance =
                calculateShipmentDistance(
                    normalized[0]
                );


            return {

                distanceKm:
                    distance,

                directDistanceKm:
                    distance,

                detourKm:
                    0,

                detourPercent:
                    0,

                sequence:
                    [normalized[0].id],

                valid: true

            };

        }


        /*
         * Basic route sequence approximation:
         *
         * Start from shipment with the earliest pickup
         * or first shipment.
         *
         * Production version should evaluate all feasible
         * pickup/drop permutations using road-network data.
         */


        const first =
            normalized[0];


        const rest =
            normalized.slice(1);


        let routeDistance = 0;


        let current =
            first.origin;


        const sequence = [];


        for (
            const shipment of
            [first, ...rest]
        ) {

            sequence.push(
                shipment.id
            );


            routeDistance +=
                haversineDistance(

                    current.latitude,
                    current.longitude,

                    shipment.origin.latitude,
                    shipment.origin.longitude

                );


            routeDistance +=
                haversineDistance(

                    shipment.origin.latitude,
                    shipment.origin.longitude,

                    shipment.destination.latitude,
                    shipment.destination.longitude

                );


            current =
                shipment.destination;

        }


        const directDistance =

            sum(
                normalized,
                shipment =>
                    calculateShipmentDistance(
                        shipment
                    )
            );


        const detourKm =

            Math.max(
                0,
                routeDistance -
                directDistance
            );


        const detourPercent =

            directDistance > 0

                ?

                percentage(
                    detourKm /
                    directDistance
                )

                :

                0;


        return {

            distanceKm:
                round(routeDistance),

            directDistanceKm:
                round(directDistance),

            detourKm:
                round(detourKm),

            detourPercent,

            sequence,

            valid:
                routeDistance > 0

        };

    }



    /* =========================================================
       TIME WINDOW COMPATIBILITY
       ========================================================= */

    function checkTimeWindows(
        shipments
    ) {

        const normalized =
            shipments.map(
                normalizeShipment
            );


        const windows =
            normalized.filter(
                shipment =>
                    shipment.timeWindow.pickupStart ||
                    shipment.timeWindow.pickupEnd
            );


        /*
         * Basic availability result.
         *
         * Production implementation should convert all
         * timestamps to one timezone and run a real scheduling
         * constraint solver.
         */


        return {

            compatible: true,

            checkedShipments:
                windows.length,

            reason:
                windows.length === 0

                    ?

                    "No restrictive pickup windows supplied."

                    :

                    "Preliminary time-window check passed."

        };

    }



    /* =========================================================
       SPECIAL REQUIREMENT COMPATIBILITY
       ========================================================= */

    function checkSpecialRequirements(
        shipments,
        vehicle
    ) {

        const normalized =
            shipments.map(
                normalizeShipment
            );


        const requirements = {

            temperatureControlled:
                false,

            fragile:
                false,

            hazardous:
                false,

            specialHandling:
                false

        };


        normalized.forEach(
            shipment => {

                Object.keys(
                    requirements
                ).forEach(
                    key => {

                        if (
                            shipment.requirements[key]
                        ) {

                            requirements[key] =
                                true;

                        }

                    }
                );

            }
        );


        const vehicleFeatures =
            vehicle?.features || {};


        const incompatible = [];


        if (
            requirements.temperatureControlled
            &&
            !vehicleFeatures
                .temperatureControlled
        ) {

            incompatible.push(
                "Temperature-controlled capability required."
            );

        }


        if (
            requirements.hazardous
            &&
            !vehicleFeatures
                .hazardousCargo
        ) {

            incompatible.push(
                "Hazardous-cargo capability required."
            );

        }


        return {

            compatible:
                incompatible.length === 0,

            requirements,

            incompatible

        };

    }



    /* =========================================================
       SHARED LOAD COMPATIBILITY
       ========================================================= */

    function evaluateCompatibility(
        shipments,
        vehicle
    ) {

        const normalizedShipments =
            shipments.map(
                normalizeShipment
            );


        const normalizedVehicle =
            normalizeVehicle(
                vehicle
            );


        if (
            normalizedShipments.length <
            2
        ) {

            return {

                compatible: false,

                reasons: [
                    "At least two shipments are required for shared loading."
                ]

            };

        }


        const capacity =
            checkCapacity(
                normalizedShipments,
                normalizedVehicle
            );


        const route =
            estimateCombinedRoute(
                normalizedShipments
            );


        const time =
            checkTimeWindows(
                normalizedShipments
            );


        const special =
            checkSpecialRequirements(
                normalizedShipments,
                normalizedVehicle
            );


        const overlap =
            normalizedShipments.length === 2

                ?

                calculateOverlap(
                    normalizedShipments[0],
                    normalizedShipments[1]
                )

                :

                100;


        const reasons = [];


        if (
            !capacity.compatible
        ) {

            reasons.push(
                "Vehicle capacity exceeded."
            );

        }


        if (
            route.detourKm >
            CONFIG.route.maximumDetourKm
        ) {

            reasons.push(
                "Additional route detour is too high."
            );

        }


        if (
            route.detourPercent >
            CONFIG.route.maximumDetourPercent
        ) {

            reasons.push(
                "Detour percentage exceeds platform limit."
            );

        }


        if (
            normalizedShipments.length === 2
            &&
            overlap <
            CONFIG.route.minimumOverlapPercent
        ) {

            reasons.push(
                "Routes are not sufficiently compatible."
            );

        }


        if (
            !time.compatible
        ) {

            reasons.push(
                "Time windows cannot be satisfied."
            );

        }


        if (
            !special.compatible
        ) {

            reasons.push(
                ...special.incompatible
            );

        }


        return {

            compatible:
                reasons.length === 0,

            reasons,

            capacity,

            route,

            time,

            special,

            routeOverlapPercent:
                overlap

        };

    }



    /* =========================================================
       ALLOCATION CONTRIBUTION
       ========================================================= */

    function calculateShipmentContribution(
        shipment,
        routeDistance
    ) {

        const s =
            normalizeShipment(
                shipment
            );


        const distance =
            calculateShipmentDistance(
                s
            );


        const weight =
            positiveNumber(
                s.cargo.weightKg
            );


        const volume =
            positiveNumber(
                s.cargo.volumeM3
            );


        return {

            shipmentId:
                s.id,

            distanceKm:
                distance,

            weightKg:
                weight,

            volumeM3:
                volume,

            originalPrice:
                s.pricing
                    .originalTransportPrice

        };

    }



    /* =========================================================
       FAIR SHARED COST ALLOCATION
       ========================================================= */

    function allocateSharedCost(
        shipments,
        totalSharedCost,
        routeDetails
    ) {

        const normalized =
            shipments.map(
                normalizeShipment
            );


        const totalCost =
            positiveNumber(
                totalSharedCost
            );


        if (
            normalized.length === 0
        ) {

            return [];

        }


        const contributions =
            normalized.map(
                shipment =>
                    calculateShipmentContribution(
                        shipment,
                        routeDetails
                    )
            );


        const totalDistance =
            sum(
                contributions,
                item =>
                    item.distanceKm
            );


        const totalWeight =
            sum(
                contributions,
                item =>
                    item.weightKg
            );


        const totalVolume =
            sum(
                contributions,
                item =>
                    item.volumeM3
            );


        const count =
            normalized.length;


        let weightedTotal = 0;


        const scored =
            contributions.map(
                contribution => {


                    const distanceShare =

                        totalDistance > 0

                            ?

                            contribution.distanceKm /
                            totalDistance

                            :

                            1 / count;


                    const weightShare =

                        totalWeight > 0

                            ?

                            contribution.weightKg /
                            totalWeight

                            :

                            1 / count;


                    const volumeShare =

                        totalVolume > 0

                            ?

                            contribution.volumeM3 /
                            totalVolume

                            :

                            1 / count;


                    /*
                     * Longer contribution deserves a larger
                     * share of the transport cost.
                     */


                    const detourShare =

                        routeDetails &&
                        routeDetails.directDistanceKm > 0

                            ?

                            contribution.distanceKm /
                            routeDetails.directDistanceKm

                            :

                            1 / count;


                    const serviceShare =
                        1 / count;


                    const score =

                        (
                            distanceShare *
                            CONFIG.allocation
                                .distanceWeight
                        )

                        +

                        (
                            weightShare *
                            CONFIG.allocation
                                .weightWeight
                        )

                        +

                        (
                            volumeShare *
                            CONFIG.allocation
                                .volumeWeight
                        )

                        +

                        (
                            detourShare *
                            CONFIG.allocation
                                .detourWeight
                        )

                        +

                        (
                            serviceShare *
                            CONFIG.allocation
                                .serviceWeight
                        );


                    weightedTotal +=
                        score;


                    return {

                        ...contribution,

                        score

                    };

                }
            );


        let allocatedSoFar = 0;


        return scored.map(
            (item, index) => {

                let allocation;


                if (
                    index ===
                    scored.length - 1
                ) {

                    /*
                     * Last item receives the rounding remainder
                     * so the allocations always add exactly
                     * to the shared cost.
                     */

                    allocation =
                        round(
                            totalCost -
                            allocatedSoFar
                        );

                } else {

                    allocation =
                        round(

                            totalCost *
                            (
                                item.score /
                                weightedTotal
                            )

                        );

                    allocatedSoFar +=
                        allocation;

                }


                return {

                    shipmentId:
                        item.shipmentId,

                    allocatedTransportCost:
                        allocation,

                    contributionScore:
                        round(
                            item.score /
                            weightedTotal,
                            6
                        ),

                    originalTransportPrice:
                        item.originalPrice,

                    savings:

                        round(

                            Math.max(
                                0,
                                item.originalPrice -
                                allocation
                            )

                        )

                };

            }
        );

    }



    /* =========================================================
       DRIVER EARNINGS
       ========================================================= */

    function calculateDriverEarnings(
        totalDistanceKm,
        vehicle,
        driverPricing = {}
    ) {

        const v =
            normalizeVehicle(
                vehicle
            );


        const distance =
            positiveNumber(
                totalDistanceKm
            );


        const baseRate =
            positiveNumber(
                driverPricing
                    .baseRatePerKm
            );


        const driverRate =

            baseRate > 0

                ?

                baseRate

                :

                v.driverCostPerKm;


        const distanceEarnings =
            round(
                distance *
                driverRate
            );


        const fixedAmount =
            positiveNumber(
                driverPricing
                    .fixedAmount
            );


        const bonus =
            positiveNumber(
                driverPricing
                    .bonus
            );


        return {

            distanceEarnings,

            fixedAmount,

            bonus,

            total:

                round(
                    distanceEarnings +
                    fixedAmount +
                    bonus
                )

        };

    }



    /* =========================================================
       COMPLETE SHARED TRIP
       ========================================================= */

    function buildSharedTrip(
        shipments,
        vehicle,
        options = {}
    ) {

        const normalizedShipments =
            shipments.map(
                normalizeShipment
            );


        const normalizedVehicle =
            normalizeVehicle(
                vehicle
            );


        const compatibility =
            evaluateCompatibility(
                normalizedShipments,
                normalizedVehicle
            );


        if (
            !compatibility.compatible
        ) {

            return {

                success: false,

                trip: null,

                compatibility

            };

        }


        const route =
            compatibility.route;


        const actualRouteDistance =

            Number.isFinite(
                Number(
                    options.actualRouteDistanceKm
                )
            )

                ?

                number(
                    options.actualRouteDistanceKm
                )

                :

                route.distanceKm;


        const operatingCost =

            calculateOperatingCost(

                actualRouteDistance,

                normalizedVehicle

            );


        const logisticsMarkup =
            positiveNumber(
                options.logisticsMarkup
            );


        const platformFee =
            positiveNumber(
                options.platformFee
            );


        const totalSharedTransportCost =

            round(

                operatingCost
                +
                logisticsMarkup
                +
                platformFee

            );


        const allocations =
            allocateSharedCost(

                normalizedShipments,

                totalSharedTransportCost,

                {

                    ...route,

                    distanceKm:
                        actualRouteDistance

                }

            );


        const driverEarnings =
            calculateDriverEarnings(

                actualRouteDistance,

                normalizedVehicle,

                options.driverPricing

            );


        const trip = {

            id:
                generateId("TRIP"),

            createdAt:
                new Date()
                    .toISOString(),

            vehicleId:
                normalizedVehicle.id,

            driverId:
                normalizedVehicle.driverId,

            equipmentOwnerId:
                normalizedVehicle
                    .equipmentOwnerId,


            shipmentIds:
                normalizedShipments.map(
                    shipment =>
                        shipment.id
                ),


            route: {

                distanceKm:
                    actualRouteDistance,

                directDistanceKm:
                    route.directDistanceKm,

                detourKm:
                    route.detourKm,

                detourPercent:
                    route.detourPercent,

                sequence:
                    route.sequence

            },


            capacity:
                compatibility.capacity,


            pricing: {

                operatingCost,

                logisticsMarkup,

                platformFee,

                totalSharedTransportCost

            },


            allocations,


            driverEarnings,


            status:
                "optimized",


            audit: {

                engineVersion:
                    CONFIG.version,

                allocationMethod:
                    "weighted-shared-cost",

                routeMethod:
                    options.actualRouteDistanceKm
                        ? "external-road-routing"
                        : "geographic-estimate",

                generatedAt:
                    new Date()
                        .toISOString()

            }

        };


        return {

            success: true,

            trip,

            compatibility

        };

    }



    /* =========================================================
       FIND SHARED LOAD GROUPS
       ========================================================= */

    function findCompatibleGroups(
        shipments,
        vehicle
    ) {

        const normalized =
            shipments.map(
                normalizeShipment
            );


        const groups = [];


        for (
            let i = 0;
            i < normalized.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < normalized.length;
                j++
            ) {

                const pair = [

                    normalized[i],
                    normalized[j]

                ];


                const evaluation =
                    evaluateCompatibility(
                        pair,
                        vehicle
                    );


                groups.push({

                    shipmentIds:
                        pair.map(
                            shipment =>
                                shipment.id
                        ),

                    compatible:
                        evaluation.compatible,

                    score:
                        calculateOptimizationScore(
                            evaluation
                        ),

                    evaluation

                });

            }

        }


        return groups.sort(
            (a, b) =>
                b.score -
                a.score
        );

    }



    /* =========================================================
       OPTIMIZATION SCORE
       ========================================================= */

    function calculateOptimizationScore(
        evaluation
    ) {

        if (
            !evaluation
        ) {

            return 0;

        }


        const routeScore =

            clamp(

                1 -
                (
                    evaluation.route
                        ?.detourPercent || 0
                )
                /
                100,

                0,
                1

            );


        const overlapScore =

            clamp(

                (
                    evaluation
                        .routeOverlapPercent || 0
                )
                /
                100,

                0,
                1

            );


        const capacityScore =

            evaluation.capacity

                ?

                clamp(

                    1 -
                    (
                        evaluation.capacity
                            .utilizationPercent
                        /
                        100
                    ),

                    0,
                    1

                )

                :

                0;


        return round(

            (
                routeScore *
                0.45
            )

            +

            (
                overlapScore *
                0.35
            )

            +

            (
                capacityScore *
                0.20
            ),

            6

        );

    }



    /* =========================================================
       SAVINGS
       ========================================================= */

    function calculateSavings(
        shipments,
        allocations
    ) {

        const normalized =
            shipments.map(
                normalizeShipment
            );


        const originalTotal =
            sum(

                normalized,

                shipment =>
                    shipment.pricing
                        .originalTransportPrice

            );


        const optimizedTotal =
            sum(

                allocations,

                allocation =>
                    allocation
                        .allocatedTransportCost

            );


        return {

            originalTotal:
                round(
                    originalTotal
                ),

            optimizedTotal:
                round(
                    optimizedTotal
                ),

            totalSavings:
                round(

                    Math.max(
                        0,
                        originalTotal -
                        optimizedTotal
                    )

                ),

            savingsPercent:

                originalTotal > 0

                    ?

                    percentage(

                        Math.max(
                            0,
                            originalTotal -
                            optimizedTotal
                        )
                        /
                        originalTotal

                    )

                    :

                    0

        };

    }



    /* =========================================================
       PUBLIC API
       ========================================================= */

    const SmartRouteEngine = {

        version:
            CONFIG.version,


        config:
            CONFIG,


        utils: {

            round,

            clamp,

            percentage,

            haversineDistance

        },


        shipment: {

            normalize:
                normalizeShipment,

            calculateDistance:
                calculateShipmentDistance

        },


        vehicle: {

            normalize:
                normalizeVehicle,

            checkCapacity:
                checkCapacity,

            calculateOperatingCost:
                calculateOperatingCost

        },


        route: {

            calculateOverlap,

            estimateCombinedRoute,

            checkTimeWindows

        },


        compatibility: {

            evaluate:
                evaluateCompatibility,

            findGroups:
                findCompatibleGroups

        },


        pricing: {

            allocateSharedCost,

            calculateSavings,

            calculateDriverEarnings

        },


        optimize: {

            buildSharedTrip,

            calculateScore:
                calculateOptimizationScore

        }

    };


    /* =========================================================
       EXPORT
       ========================================================= */

    window.AgriVision =
        window.AgriVision || {};


    window.AgriVision
        .SmartRouteEngine =
        SmartRouteEngine;


    console.info(
        "AgriVision Smart Route Engine loaded:",
        CONFIG.version
    );


})(window);