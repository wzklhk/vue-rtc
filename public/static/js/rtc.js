/**
 * Fetch an array of devices of a certain type
 * @param type
 * @returns {Promise<MediaDeviceInfo[]>} devices
 */
async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  if (type == null) {
    return devices;
  } else {
    return devices.filter((device) => device.kind === type);
  }
}

/**
 * Open camera with at least minWidth and minHeight capabilities
 * @param cameraId
 * @param minWidth
 * @param minHeight
 * @returns {Promise<MediaStream>} stream
 */
async function openCamera(cameraId, minWidth, minHeight) {
  const constraints = {
    'audio': { 'echoCancellation': true },
    'video': {
      'deviceId': cameraId,
      'width': { 'min': minWidth },
      'height': { 'min': minHeight }
    }
  }

  return await navigator.mediaDevices.getUserMedia(constraints);
}

async function playVideoFromCamera() {
  try {
    const constraints = { 'video': true, 'audio': true };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector('video#localVideo');
    videoElement.srcObject = stream;
  } catch (error) {
    console.error('Error opening video camera.', error);
  }
}