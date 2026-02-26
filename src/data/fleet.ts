export interface Car {
    id: string;
    name: string;
    type: string; // Sedan, SUV, etc.
    transmission: 'Manual' | 'Automatic';
    seats: number;
    image: string;
    available: boolean;
    features: string[];
    price?: string; // Daily rate for display
}

export const FLEET_DATA: Car[] = [
    // --- Economy / Standard ---
    {
        id: 'suzuki-alto',
        name: 'Suzuki Alto (New)',
        type: 'Hatchback',
        transmission: 'Automatic',
        seats: 4,
        image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['AC', 'Compact', 'Fuel Efficient', 'VXL Model'],
        price: '4,500'
    },
    {
        id: 'suzuki-cultus',
        name: 'Suzuki Cultus VXL',
        type: 'Hatchback',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['AC', 'Bluetooth', 'Power Windows', 'Spacious'],
        price: '6,000'
    },
    {
        id: 'toyota-yaris-ativ',
        name: 'Toyota Yaris ATIV X',
        type: 'Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['Climate Control', 'Cruise Control', 'Airbags', '1.5L Engine'],
        price: '8,500'
    },
    {
        id: 'honda-city-aspire',
        name: 'Honda City Aspire',
        type: 'Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['Leather Seats', 'Touchscreen', 'Alloy Wheels', 'Comfortable'],
        price: '9,000'
    },

    // --- Premium Sedans ---
    {
        id: 'toyota-grande',
        name: 'Toyota Corolla Grande',
        type: 'Premium Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1623122119332-60292fb2f87d?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['Sunroof', 'Paddle Shifters', 'Leather Interior', 'LED Lights'],
        price: '12,000'
    },
    {
        id: 'honda-civic-rs',
        name: 'Honda Civic RS Turbo',
        type: 'Executive Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['Turbo Engine', 'Sunroof', 'Adaptive Cruise', 'Sport Mode'],
        price: '18,500'
    },
    {
        id: 'hyundai-sonata',
        name: 'Hyundai Sonata 2.5',
        type: 'Luxury Sedan',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d6274a?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['Panoramic Sunroof', 'Ambient Lighting', 'Digital Cluster', 'Nappa Leather'],
        price: '25,000'
    },

    // --- SUVs & 4x4s ---
    {
        id: 'kia-sportage-awd',
        name: 'KIA Sportage AWD',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1630046944933-255017006764?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['AWD', 'Panoramic Sunroof', 'Power Tailgate', 'Premium Sound'],
        price: '18,000'
    },
    {
        id: 'hyundai-tucson-ultimate',
        name: 'Hyundai Tucson Ultimate',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1623912953265-5c12030d5246?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['Wireless Charging', 'H-TRAC', 'Ventilated Seats', 'Safety Suite'],
        price: '18,000'
    },
    {
        id: 'toyota-fortuner-legender',
        name: 'Toyota Fortuner Legender',
        type: 'Premium SUV',
        transmission: 'Automatic',
        seats: 7,
        image: 'https://images.unsplash.com/photo-1641044390552-320c296680a1?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['4x4 Sigma 4', 'Dual Tone Interior', 'Sport Mode', 'Off-road King'],
        price: '35,000'
    },
    {
        id: 'toyota-revo-rocco',
        name: 'Toyota Hilux Revo Rocco',
        type: 'Adventure Pick-up',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['Rocco Kit', 'Turbo Diesel', 'Tow Bar', 'Off-road Ready'],
        price: '28,000'
    },

    // --- Luxury & Exotic ---
    {
        id: 'land-cruiser-v8',
        name: 'Toyota Land Cruiser V8',
        type: 'Ultimate Luxury SUV',
        transmission: 'Automatic',
        seats: 7,
        image: 'https://images.unsplash.com/photo-1594912154447-4951475c7e0b?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['V8 Engine', 'Rear Entertainment', 'Four Zone AC', 'Prestige Presence'],
        price: '75,000'
    },
    {
        id: 'toyota-prado-txi',
        name: 'Toyota Prado TXL',
        type: 'Luxury 4x4',
        transmission: 'Automatic',
        seats: 7,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['Sunroof', '7 Seats', 'Cool Box', 'Height Control'],
        price: '45,000'
    },
    {
        id: 'audi-a6',
        name: 'Audi A6 (Business Class)',
        type: 'Executive Luxury',
        transmission: 'Automatic',
        seats: 5,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['Matrix LED', 'Virtual Cockpit', 'Soft Closing Doors', 'Bose Sound'],
        price: '55,000'
    },

    // --- Vans / Group Travel ---
    {
        id: 'hiace-grand-cabin',
        name: 'Toyota HiAce Grand Cabin',
        type: 'Luxury Van',
        transmission: 'Automatic',
        seats: 14,
        image: 'https://images.unsplash.com/photo-1532152399201-9031f0cf2d81?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['14 Seater', 'Dual AC', 'Reclining Seats', 'Entertainment System'],
        price: '18,500'
    },
    {
        id: 'coaster',
        name: 'Toyota Coaster',
        type: 'Executive Bus',
        transmission: 'Manual',
        seats: 26,
        image: 'https://images.unsplash.com/photo-1532581133503-4670cf840f6d?auto=format&fit=crop&q=80&w=800',
        available: true,
        features: ['28 Seater', 'Perfect for Tours', 'High Roof', 'Spacious Cargo'],
        price: '30,000'
    }
];
