class Hike {
    location: string;
    length: string;
    difficulty: number; 
    userId: string;
    reviews: Array<Review>;
    stars: number;
    qrCode: String;
    busyTimes: Array<HourInfo>;

    constructor() {
        this.location = "";
        this.length = "";
        this.userId = "";
        this.reviews = [];
        this.stars = 0;
        this.difficulty = 0;
        this.qrCode = "";
        this.busyTimes = [];
    }

}

class Review {

}

class HourInfo {

}