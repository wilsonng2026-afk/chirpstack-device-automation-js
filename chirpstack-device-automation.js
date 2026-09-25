const BASE_URL = '';
const JWT = '';
const APP_ID = '';
const PROFILE_ID = '';
const devices = [
{ devEui: '', name: '', joinEui: '', devAddr: '', appSKey: '', nwkSEncKey: '' },

];

function createDevice(jwt, device) {
  return fetch(`${BASE_URL}/devices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      device: {
        application_id: APP_ID,
        dev_eui: device.devEui,
        device_profile_id: PROFILE_ID,
        name: device.name,
        description: device.description,
        join_eui: device.joinEui
      }
    })
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(error => {
        throw new Error(`Create failed for ${device.devEui}: ${error}`);
      });
    }
    console.log(`Created ${device.name}`);
    return response;
  });
}

function activateDevice(jwt, device) {
  return fetch(`${BASE_URL}/devices/${device.devEui}/activate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      device_activation: {
        dev_eui: device.devEui,
        dev_addr: device.devAddr,
        app_s_key: device.appSKey,
        nwk_s_enc_key: device.nwkSEncKey,
        s_nwk_s_int_key: device.nwkSEncKey,
        f_nwk_s_int_key: device.nwkSEncKey
      }
    })
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(error => {
        throw new Error(`Activate failed for ${device.devEui}: ${error}`);
      });
    }
    console.log(`Activated ${device.name}`);
    return response;
  });
}

function main() {
  const jwt = JWT;
  console.log('Using provided JWT');

  // Create all in parallel
  Promise.all(devices.map(device => createDevice(jwt, device)))
    .then(() => {
      console.log('All creations complete');
      // Activate all in parallel
      return Promise.all(devices.map(device => activateDevice(jwt, device)));
    })
    .then(() => {
      console.log('All activations complete');
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
}

main();