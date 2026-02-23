export const serviceVehicles = [
  {
    id: 'SV001',
    owner: 'Rajesh Kumar',
    model: 'Maruti Suzuki Swift',
    regNumber: 'DL01AB1234',
    engineType: '1197cc Petrol',
    mileage: 45230,
    lastService: '2025-08-15',
    issues: [
      {
        id: 'ISS001',
        type: 'Tire Issues',
        severity: 'High',
        description: 'Front left tire pressure low and uneven wear pattern detected',
        solutions: [
          'Replace front left tire with OEM specification',
          'Check wheel alignment and suspension',
          'Inflate all tires to correct PSI (28 PSI)',
          'Perform rotation (every 8000 km)'
        ]
      },
      {
        id: 'ISS002',
        type: 'Engine Knocking',
        severity: 'High',
        description: 'Unusual knocking sound detected during acceleration',
        solutions: [
          'Check fuel quality and switch to higher octane fuel',
          'Replace spark plugs',
          'Carbon cleaning of engine',
          'Check engine timing'
        ]
      },
      {
        id: 'ISS003',
        type: 'Battery Issues',
        severity: 'Medium',
        description: 'Battery voltage dropping, slow engine start',
        solutions: [
          'Test battery capacity and voltage',
          'Clean battery terminals and connections',
          'Replace battery if faulty',
          'Check alternator charging'
        ]
      }
    ]
  },
  {
    id: 'SV002',
    owner: 'Priya Sharma',
    model: 'Hyundai i20',
    regNumber: 'MH02XY5678',
    engineType: '1396cc Petrol',
    mileage: 32150,
    lastService: '2025-09-01',
    issues: [
      {
        id: 'ISS004',
        type: 'Transmission Issues',
        severity: 'High',
        description: 'Gear shifting delay and occasional jerking',
        solutions: [
          'Change transmission fluid',
          'Scan for transmission fault codes',
          'Replace transmission filter',
          'Check transmission solenoid'
        ]
      },
      {
        id: 'ISS005',
        type: 'Air Conditioning',
        severity: 'Medium',
        description: 'AC not cooling efficiently, weak airflow',
        solutions: [
          'Check refrigerant level',
          'Clean AC condenser and evaporator',
          'Replace cabin air filter',
          'Check compressor operation'
        ]
      }
    ]
  },
  {
    id: 'SV003',
    owner: 'Amit Patel',
    model: 'Tata Nexon',
    regNumber: 'GJ03AB9012',
    engineType: '1497cc Diesel',
    mileage: 58450,
    lastService: '2025-07-20',
    issues: [
      {
        id: 'ISS006',
        type: 'Brake Issues',
        severity: 'High',
        description: 'Increased brake pedal travel and reduced braking efficiency',
        solutions: [
          'Bleed brake system and replace brake fluid',
          'Inspect brake pads and rotors',
          'Replace brake pads if worn below 2mm',
          'Check brake master cylinder'
        ]
      },
      {
        id: 'ISS007',
        type: 'Engine Oil Leakage',
        severity: 'Medium',
        description: 'Minor oil leakage from engine gaskets',
        solutions: [
          'Identify exact point of leakage',
          'Replace worn gaskets and seals',
          'Check oil pressure regulator',
          'Inspect rocker cover gasket'
        ]
      },
      {
        id: 'ISS008',
        type: 'Suspension Noise',
        severity: 'Low',
        description: 'Creaking sound when going over bumps',
        solutions: [
          'Inspect suspension bushings',
          'Check shock absorber condition',
          'Lubricate suspension joints',
          'Tighten suspension bolts'
        ]
      }
    ]
  },
  {
    id: 'SV004',
    owner: 'Neha Singh',
    model: 'Mahindra XUV500',
    regNumber: 'KA04CD3456',
    engineType: '2.0L Petrol',
    mileage: 41200,
    lastService: '2025-08-10',
    issues: [
      {
        id: 'ISS009',
        type: 'Electrical System',
        severity: 'Medium',
        description: 'Dashboard warning lights flickering intermittently',
        solutions: [
          'Check battery voltage and connections',
          'Scan vehicle for fault codes',
          'Replace faulty sensor if detected',
          'Update vehicle software'
        ]
      }
    ]
  },
  {
    id: 'SV005',
    owner: 'Vikram Desai',
    model: 'Renault Kwid',
    regNumber: 'MH05EF7890',
    engineType: '999cc Petrol',
    mileage: 28600,
    lastService: '2025-09-05',
    issues: [
      {
        id: 'ISS010',
        type: 'Throttle Issue',
        severity: 'High',
        description: 'Unresponsive throttle and engine hesitation',
        solutions: [
          'Clean throttle body',
          'Check throttle position sensor',
          'Replace air filter',
          'Reset engine control module'
        ]
      },
      {
        id: 'ISS011',
        type: 'Radiator Coolant',
        severity: 'Medium',
        description: 'Coolant level dropping, possible leak',
        solutions: [
          'Inspect cooling system for leaks',
          'Replace radiator hoses if cracked',
          'Flush and refill cooling system',
          'Check radiator cap pressure'
        ]
      }
    ]
  }
];
