export interface Car {
    id: string;
    name: string;
    type: string; // Sedan, SUV, etc.
    transmission: 'Manual' | 'Automatic';
    seats: number;
    image: string;
    available: boolean;
    features: string[];
    // Service-specific pricing (set by admin)
    priceFleet?: string;        // Daily rental price
    priceOneSideDrop?: string;  // One Side Drop price
    priceAirportLahore?: string;  // Airport Lahore price
    priceAirportIslamabad?: string; // Airport Islamabad price
    priceCorporate?: string;    // Corporate rental price
    priceWedding?: string;      // Wedding/Event price
}

export const FLEET_DATA: Car[] = [
    {
        id: 'suzuki-alto',
        name: 'Suzuki Alto',
        type: 'Hatchback',
        transmission: 'Automatic',
        seats: 4,
        image: '/cars/suzuki-alto.png',
        available: true,
        features: ['AC', 'Compact', 'Fuel Efficient', 'City Drive']
    },
    {
        id: 'suzuki-cultus',
        name: 'Suzuki Cultus',
        type: 'Hatchback',
        transmission: 'Manual',
        seats: 5,
        image: '/cars/suzuki-cultus.png',
        available: true,
        features: ['AC', 'Bluetooth', 'Economical', 'Spacious']
    },
    {
        id: 'suzuki-wagon-r',
        name: 'Suzuki Wagon R',
        type: 'Hatchback',
        transmission: 'Manual',
        seats: 5,
        image: '/cars/suzuki-wagon-r.png',
        available: true,
        features: ['High Roof', 'Economical', 'Spacious Cabin', 'AC']
    },
    {
        id: 'suzuki-swift',
        name: 'Suzuki Swift',
        type: 'Hatchback',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/suzuki-swift.png',
        available: true,
        features: ['AC', 'Alloy Rims', 'Sporty Look', 'Push Start']
    },
    {
        id: 'toyota-yaris',
        name: 'Toyota Yaris',
        type: 'Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/toyota-yaris.png',
        available: true,
        features: ['AC', 'Bluetooth', 'Airbags', 'Apple CarPlay']
    },
    {
        id: 'honda-city',
        name: 'Honda City',
        type: 'Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/honda-city.png',
        available: true,
        features: ['AC', 'Touchscreen', 'Spacious Trunk', 'Comfortable']
    },
    {
        id: 'toyota-corolla-gli',
        name: 'Toyota Corolla GLi',
        type: 'Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/toyota-corolla.png',
        available: true,
        features: ['Reliable', 'AC', 'Comfortable Ride', 'Family Car']
    },
    {
        id: 'honda-civic-2023',
        name: 'Honda Civic 2023',
        type: 'Premium Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/honda-civic.png',
        available: true,
        features: ['Sunroof', 'Adaptive Cruise', 'Leather Seats', 'Lane Assist']
    },
    {
        id: 'changan-alsvin',
        name: 'Changan Alsvin',
        type: 'Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/changan-alsvin.png',
        available: true,
        features: ['Sunroof', 'Cruise Control', 'Touchscreen', 'Fuel Efficient']
    },
    {
        id: 'honda-brv',
        name: 'Honda BR-V',
        type: 'MPV',
        transmission: 'Automatic',
        seats: 7,
        image: '/cars/honda-brv.png',
        available: true,
        features: ['7 Seater', 'Family Car', 'Rear AC Vents', 'Spacious']
    },
    {
        id: 'hyundai-tucson',
        name: 'Hyundai Tucson',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/hyundai-tucson.png',
        available: true,
        features: ['Panoramic Sunroof', 'AWD', 'Premium Audio', 'Wireless Charging']
    },
    {
        id: 'kia-sportage',
        name: 'KIA Sportage',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/kia-sportage.png',
        available: true,
        features: ['Panoramic Sunroof', 'All-Wheel Drive', 'Premium Audio']
    },
    {
        id: 'mg-hs',
        name: 'MG HS',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/mg-hs-trophy.png',
        available: true,
        features: ['Turbo Engine', 'Panoramic Sunroof', 'Leather Seats', 'Ambient Lighting']
    },
    {
        id: 'toyota-fortuner',
        name: 'Toyota Fortuner',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 7,
        image: '/cars/toyota-fortuner.png',
        available: true,
        features: ['4x4', 'Leather Interior', 'Spacious', 'Off-road']
    },
    {
        id: 'toyota-prado',
        name: 'Toyota Land Cruiser Prado',
        type: 'Luxury SUV',
        transmission: 'Automatic',
        seats: 7,
        image: '/cars/toyota-prado.png',
        available: true,
        features: ['4x4', 'Luxury Interior', 'Sunroof', 'Off-road Master']
    },
    {
        id: 'toyota-revo',
        name: 'Toyota Hilux Revo',
        type: 'Pickup / 4x4',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/toyota-hilux-revo.png',
        available: true,
        features: ['4x4', 'Off-road Capability', 'Turbo Diesel', 'Tow Bar']
    },
    {
        id: 'hiace-grand-cabin',
        name: 'Toyota HiAce Grand Cabin',
        type: 'Van',
        transmission: 'Automatic',
        seats: 14,
        image: '/cars/toyota-hiace.png',
        available: true,
        features: ['14 Seater', 'Dual AC', 'Large Luggage Space', 'Group Travel']
    },
    {
        id: 'toyota-corolla-altis-grande',
        name: 'Toyota Corolla Altis Grande',
        type: 'Premium Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/toyota-corolla-altis.png',
        available: true,
        features: ['Sunroof', 'Leather Seats', 'Cruise Control', 'Alloy Rims']
    },
    {
        id: 'lc-v8',
        name: 'Toyota Land Cruiser V8',
        type: 'Luxury Protocol SUV',
        transmission: 'Automatic',
        seats: 7,
        image: '/cars/toyota-land-cruiser-v8.png',
        available: true,
        features: ['VIP Protocol', 'Sunroof', 'Beige Interior', 'Armored Options']
    },
    {
        id: 'hyundai-sonata',
        name: 'Hyundai Sonata',
        type: 'Luxury Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/hyundai-sonata.png',
        available: true,
        features: ['Panoramic Sunroof', 'Digital Cluster', 'LED Headlamps', 'Premium Audio']
    },
    {
        id: 'hyundai-elantra',
        name: 'Hyundai Elantra',
        type: 'Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/hyundai-elantra.png',
        available: true,
        features: ['Smart Trunk', 'Sunroof', 'Wireless Charging', 'Drive Modes']
    },
    {
        id: 'audi-a6',
        name: 'Audi A6',
        type: 'Executive Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/audi-a6.png',
        available: true,
        features: ['Matrix LED', 'Quattro AWD', 'Virtual Cockpit', 'Executive Protocol']
    },
    {
        id: 'kia-carnival',
        name: 'KIA Grand Carnival',
        type: 'Luxury MPV',
        transmission: 'Automatic',
        seats: 11,
        image: '/cars/kia-carnival.png',
        available: true,
        features: ['11 Seater', 'Dual Sunroof', 'Smart Power Doors', 'Family VIP Trip']
    },
    {
        id: 'changan-karvaan',
        name: 'Changan Karvaan Plus',
        type: 'Van',
        transmission: 'Manual',
        seats: 7,
        image: '/cars/changan-karvaan.png',
        available: true,
        features: ['7 Seater', 'Dual AC', 'Budget Friendly', 'Touring']
    },
    {
        id: 'suzuki-apv',
        name: 'Suzuki APV',
        type: 'MPV',
        transmission: 'Manual',
        seats: 8,
        image: '/cars/suzuki-apv.png',
        available: true,
        features: ['8 Seater', 'High Ground Clearance', 'Family Touring', 'Reliable']
    },
    {
        id: 'toyota-coaster-saloon',
        name: 'Toyota Coaster Saloon',
        type: 'Bus',
        transmission: 'Manual',
        seats: 29,
        image: '/cars/toyota-coaster.png',
        available: true,
        features: ['Group Travel', 'Curtains', 'Roof AC', 'Ample Legroom']
    },
    {
        id: 'toyota-prius',
        name: 'Toyota Prius',
        type: 'Hybrid Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/toyota-prius.png',
        available: true,
        features: ['Hybrid Tech', 'Excellent Mileage', 'Quiet Drive', 'Eco Mode']
    },
    {
        id: 'toyota-vitz',
        name: 'Toyota Vitz / Yaris Hatchback',
        type: 'Hatchback',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/toyota-vitz.png',
        available: true,
        features: ['City Economy', 'Compact', 'Auto AC', 'Push Start']
    },
    {
        id: 'honda-hrv',
        name: 'Honda HR-V',
        type: 'Crossover SUV',
        transmission: 'Automatic',
        seats: 5,
        image: '/cars/honda-hrv.png',
        available: true,
        features: ['Sleek Design', 'Honda Sensing', 'Auto Brake Hold', 'Spacious']
    }
];
