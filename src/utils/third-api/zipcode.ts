import { enqueueSnackbar } from 'notistack';

import { GEOLOCATION_API_KEY } from '@/config/global';

export async function getCityFromZipCode(zipcode: string, countryCode = 'us') {
  const url = `https://api.zippopotam.us/${countryCode}/${zipcode}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`No data found for ZIP code: ${zipcode}`);
    }
    const data = await response.json();
    // Assuming the ZIP code exists and data.places is not empty
    const city = data.places[0]['place name'];
    return city;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function getLocationFromCoords({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  try {
    const result = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GEOLOCATION_API_KEY}`,
    )
      .then(response => response.json())
      .then(response => response.results[0].components);
    return result;
  } catch {
    enqueueSnackbar(
      'Cannot get current location. Please allow location settings on the browser and retry.',
      { variant: 'warning' },
    );
  }
}

export async function getLocationFromZipcode(zipcode: string) {
  try {
    const result = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${zipcode}&key=${GEOLOCATION_API_KEY}`,
    )
      .then(response => response.json())
      .then(response => response.results[0].components);
    return result;
  } catch {
    enqueueSnackbar(
      'Cannot get current location. Please allow location settings on the browser and retry.',
      { variant: 'warning' },
    );
  }
}
