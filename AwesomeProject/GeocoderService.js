const Geocoder = require('geocoder');

class GeocoderJS {
    constructor() {
        this.geocodingObject = [];
    }

    async geocodeAddress(address, locale, maxResults) {
        try {
            const data = await new Promise((resolve, reject) => {
                Geocoder.geocode({ address, locale, maxResults }, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.results);
                    }
                });
            });

            this.geocodingObject = data;
            return data;
        } catch (error) {
            throw error;
        }
    }
}

// 다른 부분에서 이 모듈을 사용하려면 export 구문을 추가
module.exports = GeocoderJS;