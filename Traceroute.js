class Traceroute {
 
    constructor(tracerouteWebsite, tracerouteIP, traceroutePathing, date, time) {
        this.websiteURL = tracerouteWebsite;
        this.websiteIP = tracerouteIP;
        this.pathing = traceroutePathing;
        this.date = date;
        this.time = time;
    }

    getWebsiteURL() {
        return this.websiteURL;
    }

    getWebsiteIP() {
        return this.websiteIP;
    }

    getTraceroutePaths() {
        return this.pathing;
    }

    getDate() {
        return this.date;
    }

    getTime() {
        return this.time;
    }

    logTraceroute() {
        return console.log(`Website: ${this.getWebsiteURL()} | \nIP: ${this.getWebsiteIP()} | \nDate: ${this.getDate()} | \nTime: ${this.getTime()} | \nRoutes: \n${this.getTraceroutePaths().join(", ")}\n`);
    }

}

module.exports = Traceroute;