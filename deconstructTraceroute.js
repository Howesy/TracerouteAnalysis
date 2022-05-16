/**
 * Script written by Charlie (Howesy) to deconstruct our traceroute log.
 * Implementations include the functionality to execute comparisons on traceroutes.
 */

const { readFileSync } = require("fs");
const Traceroute = require("./Traceroute.js");

console.clear();
const retrievedTextFile = readFileSync("./task1output.txt", {encoding: "utf-8"});
const splitTracerouteData = retrievedTextFile.split("-----------------------------------------");
const tracerouteObjects = [];

splitTracerouteData.forEach(function(tracerouteData) {
    const splitTracerouteInstance = tracerouteData.split("Tracerouting");
    const [tracerouteInstanceDate, ...data] = splitTracerouteInstance;
    const [_, tracerouteDate, tracerouteTime] = tracerouteInstanceDate.split("\n");

    data.forEach(function(tracerouteChild) {
        const preparedTracerouteChild = tracerouteChild.split("\n");
        const [websiteURLRaw, ...tracerouteInformation] = preparedTracerouteChild;
        const websiteURL = websiteURLRaw.split(" ")[2];
        const [tracerouteHeaderInformation] = tracerouteInformation;
        const tracerouteIP = tracerouteHeaderInformation.split(" ")[3];
        const cleanedTracerouteIP = prepareTracerouteIP(tracerouteIP);

        const preparedRoutes = [];
        const tracerouteRoutes = prepareTracerouteRoutes(tracerouteInformation);
        tracerouteRoutes.forEach(function(route) {
            const deconstructedRoute = route.split("  ");
            const [routeID, routeIP, minimumJumpTime, averageJumpTime, maximumJumpTime] = deconstructedRoute;
            preparedRoutes.push(routeIP);
        });

        const tracerouteObject = new Traceroute(websiteURL, cleanedTracerouteIP, preparedRoutes, tracerouteDate, tracerouteTime);
        tracerouteObjects.push(tracerouteObject);
    });
});

const barentsTraceroutes = filterTraceroutes("www.barents.lv");
const [initialBarentsTraceroute] = barentsTraceroutes;
const dirTraceroutes = filterTraceroutes("www.dir.bg");
const [initialDirTraceroute] = dirTraceroutes;
const iispTraceroutes = filterTraceroutes("www.iisp.com");
const [initialIispTraceroute] = iispTraceroutes;
const waldorTraceroutes = filterTraceroutes("www.waldorfastoriaversailles.fr");
const [initialWaldorTraceroute] = waldorTraceroutes;

performTracerouteComparisons("Barents", initialBarentsTraceroute, barentsTraceroutes);
performTracerouteComparisons("Dir", initialDirTraceroute, dirTraceroutes);
performTracerouteComparisons("IISP", initialIispTraceroute, iispTraceroutes);
performTracerouteComparisons("Waldor", initialWaldorTraceroute, waldorTraceroutes);


function prepareTracerouteRoutes(tracerouteInformation) {
    const placeholderInformation = tracerouteInformation;
    placeholderInformation.pop();
    placeholderInformation.shift();
    placeholderInformation.pop();
    placeholderInformation.pop();
    return placeholderInformation;
}

function prepareTracerouteIP(specifiedIP) {
    const firstEdit = specifiedIP.slice(0, specifiedIP.length - 2);
    const finalEdit = firstEdit.slice(1, specifiedIP.length);
    return finalEdit;
}

function filterTraceroutes(tracerouteWebsite) {
    return tracerouteObjects.filter(tracerouteObject => tracerouteObject.getWebsiteURL() == tracerouteWebsite);
}

function compareArrays(initialArray, secondaryArray) {
    const equalLength = initialArray.length === secondaryArray.length;
    const equalElements = initialArray.every((value, index) => value === secondaryArray[index]);
    return equalLength && equalElements;
}

function performTracerouteComparisons(tracerouteName, initialTraceroute, comparisonTargets) {
    console.log(`Initial ${tracerouteName} Traceroute (Parent Comparison):`);
    initialTraceroute.logTraceroute();
    console.log(`Displaying unique ${tracerouteName} Traceroutes:`);
    comparisonTargets.forEach(function(comparisonTarget) {
        if (!compareArrays(initialTraceroute.getTraceroutePaths(), comparisonTarget.getTraceroutePaths()))
            comparisonTarget.logTraceroute();
    });
    console.log(`Finished ${tracerouteName} Traceroute Comparisons!`);
}