# ChirpStack V4 Device Provisioning

A JavaScript utility for creating and activating multiple LoRaWAN devices through the ChirpStack v4 REST API.

## Features

- Creates LoRaWAN devices in ChirpStack v4.
- Assigns devices to an application and device profile.
- Supports bulk device creation.
- Activates devices using device session keys.
- Uses the ChirpStack REST API with JWT authentication.
- Processes device creation and activation asynchronously.

## Configuration

Update the following values in the JavaScript file:

- `BASE_URL`: ChirpStack server API URL
- `JWT`: ChirpStack API authentication token
- `APP_ID`: Application ID
- `PROFILE_ID`: Device profile ID
- `devices`: Device information, including DevEUI, JoinEUI, DevAddr, and session keys

## Security Notice

Do not commit JWT tokens, application IDs, device keys, or other sensitive credentials to GitHub. Use environment variables or a separate local configuration file instead.

## Usage

1. Configure the ChirpStack server URL and authentication details.
2. Add the device information to the `devices` array.
3. Run the JavaScript file in an environment that supports the `fetch` API.
4. Check the console output for creation and activation results.
