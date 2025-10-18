// API service for fetching countries, states, and cities

interface Country {
  name: string;
  code: string;
}

interface State {
  name: string;
  code: string;
  countryCode: string;
}

interface City {
  name: string;
  stateCode: string;
  countryCode: string;
}

// Fetch all countries
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries');
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.msg || 'Failed to fetch countries');
    }
    
    return data.data.map((country: any) => ({
      name: country.country,
      code: country.iso2 || country.country.substring(0, 2).toUpperCase()
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

// Fetch states by country
export const fetchStatesByCountry = async (countryCode: string): Promise<State[]> => {
  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        country: countryCode,
        // Using ISO2 code format for better compatibility
        iso2: countryCode 
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.log('API Error response:', data);
      // Fallback to another endpoint if the first one fails
      return fetchStatesByCountryFallback(countryCode);
    }
    
    if (!data.data || !data.data.states || !Array.isArray(data.data.states)) {
      console.log('Invalid states data format:', data);
      return fetchStatesByCountryFallback(countryCode);
    }
    
    return data.data.states.map((state: any) => ({
      name: state.name,
      code: state.state_code || state.name.substring(0, 2).toUpperCase(),
      countryCode
    }));
  } catch (error) {
    console.error('Error fetching states:', error);
    return fetchStatesByCountryFallback(countryCode);
  }
};

// Fallback method for fetching states
const fetchStatesByCountryFallback = async (countryCode: string): Promise<State[]> => {
  try {
    // Alternative endpoint or approach
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/states/q', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        country: countryCode
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      console.error('Fallback API error:', data);
      return [];
    }
    
    return (data.data?.states || []).map((state: any) => ({
      name: state.name,
      code: state.state_code || state.name.substring(0, 2).toUpperCase(),
      countryCode
    }));
  } catch (error) {
    console.error('Error in fallback state fetch:', error);
    return [];
  }
};


export default {
  fetchCountries,
  fetchStatesByCountry,
};