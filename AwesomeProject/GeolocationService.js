import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

class GeolocationService {
  constructor() {
    this.timeout = 10000;
    this.maximumAge = 1000;
    this.enableHighAccuracy = true;
    this.distanceFilter = 10;
    this.watchID = null;
  }

  async requestAuthorization() {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
        PermissionsAndroid.request(permission)
          .then(result => {
            if (result === PermissionsAndroid.RESULTS.GRANTED) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            reject(error);
          });
      } else if (Platform.OS === 'ios') {
        Geolocation.requestAuthorization('whenInUse')
          .then(result => {
            if (result === 'granted') {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
        error => reject(error),
        {
          timeout: this.timeout,
          maximumAge: this.maximumAge,
          enableHighAccuracy: this.enableHighAccuracy,
        }
      );
    });
  }

  async watchPosition(callback) {
    this.watchID = Geolocation.watchPosition(
      position => callback({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
      error => console.error(error),
      {
        timeout: this.timeout,
        maximumAge: this.maximumAge,
        enableHighAccuracy: this.enableHighAccuracy,
        distanceFilter: this.distanceFilter,
      }
    );
  }

  clearWatch() {
    if (this.watchID !== null) {
      Geolocation.clearWatch(this.watchID);
    }
  }
}

export default GeolocationService;