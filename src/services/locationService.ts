// API service for fetching countries, states, and cities

export interface Country {
  name: string;
  code: string;
}

export interface State {
  name: string;
  code: string;
  countryCode: string;
}

interface CountriesResponse {
  error: boolean;
  msg?: string;
  data: Array<{
    country: string;
    iso2?: string;
  }>;
}

interface StatesResponse {
  error: boolean;
  msg?: string;
  data?: {
    name?: string;
    iso2?: string;
    states?: Array<{
      name: string;
      state_code?: string;
    }>;
  };
}

// Fetch all countries
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries");
    const data: CountriesResponse = await response.json();

    if (data.error) {
      throw new Error(data.msg || "Failed to fetch countries");
    }

    return data.data.map((country) => ({
      name: country.country,
      code: country.iso2 || country.country.substring(0, 2).toUpperCase(),
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

// Fallback method for fetching states
const fetchStatesByCountryFallback = async (countryCode: string): Promise<State[]> => {
  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/states/q", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: countryCode,
      }),
    });

    const data: StatesResponse = await response.json();

    if (data.error || !data.data?.states) {
      console.error("Fallback API error:", data);
      return [];
    }

    return data.data.states.map((state) => ({
      name: state.name,
      code: state.state_code || state.name.substring(0, 2).toUpperCase(),
      countryCode,
    }));
  } catch (error) {
    console.error("Error in fallback state fetch:", error);
    return [];
  }
};

// Fetch states by country
export const fetchStatesByCountry = async (countryCode: string): Promise<State[]> => {
  try {
    const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: countryCode,
        iso2: countryCode,
      }),
    });

    const data: StatesResponse = await response.json();

    if (data.error || !data.data?.states) {
      console.warn("Primary API failed, using fallback:", data);
      return fetchStatesByCountryFallback(countryCode);
    }

    return data.data.states.map((state) => ({
      name: state.name,
      code: state.state_code || state.name.substring(0, 2).toUpperCase(),
      countryCode,
    }));
  } catch (error) {
    console.error("Error fetching states:", error);
    return fetchStatesByCountryFallback(countryCode);
  }
};

export default {
  fetchCountries,
  fetchStatesByCountry,
};
