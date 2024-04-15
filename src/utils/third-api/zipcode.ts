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
