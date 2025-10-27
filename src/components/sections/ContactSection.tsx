"use client"

import { useState, useEffect } from 'react';
import locationService from '../../services/locationService';
import { submitForm, submitNewsletter } from '@/services/contactServices';
import Swal from 'sweetalert2';

interface Country {
  name: string;
  code: string;
}

interface State {
  name: string;
  code: string;
  countryCode: string;
}


const ContactSection = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState({
    countries: false,
    states: false,
    cities: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch countries on component mount
  useEffect(() => {
    const getCountries = async () => {
      setIsLoading(prev => ({ ...prev, countries: true }));
      const countriesData = await locationService.fetchCountries();
      setCountries(countriesData);
      setIsLoading(prev => ({ ...prev, countries: false }));
    };
    
    getCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const getStates = async () => {
        setIsLoading(prev => ({ ...prev, states: true }));
        const statesData = await locationService.fetchStatesByCountry(selectedCountry.code);
        setStates(statesData);
        setSelectedState(null);
        setIsLoading(prev => ({ ...prev, states: false }));
      };
      
      getStates();
    }
  }, [selectedCountry]);

  // Handle country change
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = countries.find(c => c.code === countryCode) || null;
    setSelectedCountry(country);
  };

  // Handle state change
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = e.target.value;
    const state = states.find(s => s.code === stateCode) || null;
    setSelectedState(state);
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name,
      email,
      phone,
      message,
      subject: "Website Contact",
      country: selectedCountry?.name || "",
      state: selectedState?.name || "",
      city,
      zip: zipCode,
      form_type: "contact",
      page_url: typeof window !== "undefined" ? window.location.href : "",
      custom_fields: {
        subscribed: isSubscribed ? "Yes" : "No",
      },
    };

    try {
      const response = await submitForm(payload);
      Swal.fire({
        showCancelButton: true,
        title: "Success!",
        text: response.message || "Your form has been submitted successfully.",
        icon: "success"
      });
    } catch (error: unknown) {
      type ApiError = { response?: { data?: { message?: string } } };

      const apiMessage =
        typeof error === "object" && error !== null && "response" in error
          ? (error as ApiError).response?.data?.message
          : null;

      const errorMessage =
        apiMessage ||
        (error instanceof Error ? error.message : null) ||
        "Something went wrong! Please try again later.";

      Swal.fire({
        showCancelButton: true,
        icon: "error",
        title: "Oops...",
        text: errorMessage,
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscribeChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubscribed(e.target.checked);

    if(e.target.checked){
      try {
        const response  = await submitNewsletter(name , email);
        console.log("Newsletter Response:", response);
        Swal.fire({
          showCancelButton: true,
          title: "Subscribed!",
          text: response.message || "Your form has been submitted successfully.",
          icon: "success"
        });

      } catch (error: unknown) {
        type ApiError = { response?: { data?: { message?: string } } };

        const apiMessage =
          typeof error === "object" && error !== null && "response" in error
            ? (error as ApiError).response?.data?.message
            : null;

        const errorMessage =
          apiMessage ||
          (error instanceof Error ? error.message : null) ||
          "Something went wrong! Please try again later.";

        Swal.fire({
          showCancelButton: true,
          icon: "error",
          title: "Oops...",
          text: errorMessage,
        });
        console.error("Newsletter subscription error:", error);
      }
    }    
  }

  return (
    <section className=" mx-auto not-first:py-25 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="md:mb-6 text-[#1E1410]">
          <h2 className="text-lg md:text-5xl font-thin mb-1 md:mb-4">Contact Us</h2>
          <p className="text-xs md:text-[15px] font-[300] uppercase">CONTACT US OR GIVE US A CALL TO DISCOVER HOW WE CAN HELP.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Contact Form */}
          <div>
            <h3 className="text-md md:text-[30px] font-[300] mb-2 md:mb-6 mt-4 md:mt-10 text-[#1E1410]">Send Us a Message</h3>
            <form className="space-y-2 md:space-y-5" onSubmit={handleSubmit}>
              <div className='px-2 md:px-4 py-2 border-1 border-[#D6D6D6] rounded-2xl focus:outline-[#000] hover:border-[#000] transition-all'>
                <label htmlFor="name" className="text-black/40 text-xs md:text-[15px]">Name*</label>
                <input
                  type="text"
                  id="name"
                  className="w-full text-black border-none outline-none shadow-none text-sm md:text-[15px] placeholder-black"
                  placeholder="John Doi"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className='px-3 md:px-4 py-2 border-1 border-[#D6D6D6] rounded-2xl focus:outline-[#000] hover:border-[#000] transition-all'>
                <label htmlFor="email" className="text-black/40 text-xs md:text-[15px]">Email*</label>
                <input
                  type="email"
                  id="email"
                  className="w-full text-black border-none outline-none shadow-none text-sm md:text-[15px] placeholder-black"
                  placeholder="John@outlook.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="flex items-center mb-4 md:mb-7">
                <div className="relative flex items-center">
                  <input
                    id="subscribe"
                    type="checkbox"
                    className="sr-only peer"
                    checked={isSubscribed}
                    onChange={handleSubscribeChange}
                  />
                  <div className="w-5 h-5 md:w-6 md:h-6 border border-gray-300 rounded peer-checked:bg-orange-500 peer-checked:border-orange-500 transition-colors"></div>
                  <svg 
                    className="absolute w-3 h-3 md:w-4 md:h-4 text-white left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <label htmlFor="subscribe" className="ml-2 text-xs md:text-[16px] text-[#1E1410] cursor-pointer">
                  Subscribe to our news letter
                </label>
              </div>
              
              <div className='px-3 md:px-4 py-2 border-1 border-[#D6D6D6] rounded-2xl focus:outline-[#000] hover:border-[#000] transition-all'>
                <label htmlFor="phone" className="text-black/40 text-xs md:text-[15px]">Phone Number*</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full text-black border-none outline-none shadow-none text-sm md:text-[15px] placeholder-black"
                  placeholder="(215) 424-7763"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='px-3 md:px-4 py-2 border-1 border-[#D6D6D6] rounded-2xl focus:outline-[#000] hover:border-[#000] transition-all'>
                  <label htmlFor="country" className="text-black/40 text-xs md:text-[15px]">Country*</label>
                  <select
                    id="country"
                    className="w-full text-black border-none outline-none shadow-none text-sm md:text-[15px] appearance-none bg-white cursor-pointer"
                    onChange={handleCountryChange}
                    value={selectedCountry?.code || ''}
                    disabled={isLoading.countries}
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f97316' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className='px-3 md:px-4 py-2 border-1 border-[#D6D6D6] rounded-2xl focus:outline-[#000] hover:border-[#000] transition-all'>
                  <label htmlFor="state" className="text-black/40 text-xs md:text-[15px]">State*</label>
                  <select
                    id="state"
                    className="w-full text-black border-none outline-none shadow-none text-sm md:text-[15px] appearance-none bg-white cursor-pointer"
                    onChange={handleStateChange}
                    value={selectedState?.code || ''}
                    disabled={!selectedCountry || isLoading.states}
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f97316' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {isLoading.states && (
                    <div className="text-orange-500 text-sm mt-1">Loading states...</div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className='px-3 md:px-4 py-2 border-1 border-[#D6D6D6] rounded-2xl focus:outline-[#000] hover:border-[#000] transition-all'>
                  <label htmlFor="city" className="text-black/40 text-xs md:text-[15px]">City*</label>
                    <input
                      type="text"
                      id="city"
                      className="w-full text-black border-none outline-none shadow-none text-sm md:text-[15px] placeholder-black"
                      placeholder="Enter City"
                      onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                
                <div className='px-3 md:px-4 py-2 border-1 border-[#D6D6D6] rounded-2xl focus:outline-[#000] hover:border-[#000] transition-all'>
                  <label htmlFor="zip" className="text-black/40 text-xs md:text-[15px]">Zip Code*</label>
                  <input
                    type="text"
                    id="zip"
                    className="w-full text-black border-none outline-none shadow-none text-sm md:text-[15px] placeholder-black"
                    placeholder="Enter Zip Code"
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>

              <div className='px-3 md:px-4 py-2 border-1 border-[#D6D6D6] rounded-2xl focus:outline-[#000] hover:border-[#000] transition-all'>
                <label htmlFor="message" className="text-black/40 text-xs md:text-[15px]">Messages*</label>
                <input
                  type="text"
                  id="message"
                  className="w-full text-black border-none outline-none shadow-none text-sm md:text-[15px] placeholder-black"
                  placeholder="Enter your message here"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-md font-medium hover:bg-orange-600 transition flex items-center text-sm md:text-[15px]"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
          
          {/* Right Column - Contact Information */}
          <div>
            <div className="mb-4 mt-1 md:mt-15">
              <h4 className="text-sm md:text-[16px] uppercase font-medium mb-4 text-[#1E1410]">CORPORATE HEADQUARTERS - DELHI, INDIA</h4>
              
              <div className="mb-4 md:mb-6">
                <h5 className="text-gray-700 text-sm md:text-[16px] md:mb-2 tracking-[1]">ENQUIRE US</h5>
                <div className="flex items-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 mr-2 md:mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-sm md:text-[16px] break-all">8860886086</span> 
                </div>
              </div>
              
              <div className="mb-4 md:mb-6">
                <h5 className="text-gray-700 md:mb-2 text-sm md:text-[16px] tracking-[1]">SEND AN EMAIL</h5>
                <div className="flex items-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm md:text-[16px] break-all">INFO@REALTIMEBIOMETRICS.COM</span>
                </div>
              </div>
              
              <div className="mb-4 md:mb-6">
                <h5 className="text-gray-700 md:mb-2 text-sm md:text-[16px] tracking-[1]">CORPORATE HEADQUARTERS - DELHI, INDIA</h5>
                <div className="flex items-center text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mr-2 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm md:text-[16px]">C-83, GANESH NAGAR PANDAV NAGAR COMPLEX DELHI-110092</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-40 sm:h-81 rounded-lg overflow-hidden">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2676026374565!2d77.28099627550043!3d28.621740775670638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce350d82a5555%3A0xded517f01ea7b98f!2sRealtime%20Biometrics!5e0!3m2!1sen!2sin!4v1760680350707!5m2!1sen!2sin" width="100%" height="100%" style={{border:0}} loading="lazy" ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;