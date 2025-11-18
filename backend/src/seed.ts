import { db } from './utils/database';
import { v4 as uuidv4 } from 'uuid';

async function seedData() {
  // Seed ambulances
  const ambulances = [
    {
      id: uuidv4(),
      title: 'Emergency Ambulance Service - Downtown',
      description: '24/7 emergency ambulance service with trained paramedics and advanced life support equipment.',
      location: 'Downtown Medical Center, 123 Main St',
      contactNumber: '+1-555-0101',
      latitude: 40.7128,
      longitude: -74.0060,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'City Rescue Ambulance - Central',
      description: 'Fully equipped ambulance for emergency situations with oxygen supply and defibrillator.',
      location: 'Central Hospital, 456 Park Ave',
      contactNumber: '+1-555-0102',
      latitude: 40.7589,
      longitude: -73.9851,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Metro Emergency Services - North',
      description: 'Advanced cardiac life support ambulance with ICU capabilities.',
      location: 'Northside Medical, 789 Broadway',
      contactNumber: '+1-555-0103',
      latitude: 40.7910,
      longitude: -73.9740,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Quick Response Ambulance - East',
      description: 'Rapid response ambulance service for critical care transportation.',
      location: 'East End Clinic, 321 Oak St',
      contactNumber: '+1-555-0104',
      latitude: 40.7282,
      longitude: -73.7949,
      isAvailable: false
    },
    {
      id: uuidv4(),
      title: 'LifeSave Ambulance - West',
      description: 'Emergency medical transport with ventilator support and critical care paramedics.',
      location: 'Westside Hospital, 654 Pine St',
      contactNumber: '+1-555-0105',
      latitude: 40.7505,
      longitude: -73.9934,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'First Aid Ambulance - South',
      description: 'Basic life support ambulance with first response capabilities.',
      location: 'South Medical Center, 987 Elm St',
      contactNumber: '+1-555-0106',
      latitude: 40.6740,
      longitude: -73.9970,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Critical Care Ambulance - Midtown',
      description: 'Specialized critical care transport with advanced monitoring equipment.',
      location: 'Midtown Medical Plaza, 147 5th Ave',
      contactNumber: '+1-555-0107',
      latitude: 40.7440,
      longitude: -73.9920,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Emergency Response Unit - Uptown',
      description: 'Mobile emergency unit with surgical capabilities.',
      location: 'Uptown Health Center, 258 6th Ave',
      contactNumber: '+1-555-0108',
      latitude: 40.7730,
      longitude: -73.9650,
      isAvailable: false
    },
    {
      id: uuidv4(),
      title: 'Rapid Rescue Ambulance - Financial',
      description: 'Quick deployment ambulance service for business districts.',
      location: 'Financial District Medical, 369 Wall St',
      contactNumber: '+1-555-0109',
      latitude: 40.7070,
      longitude: -74.0110,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'City Med Ambulance - Riverside',
      description: 'Emergency medical services with pediatric emergency specialists.',
      location: 'Riverside Hospital, 741 River Rd',
      contactNumber: '+1-555-0110',
      latitude: 40.7630,
      longitude: -73.9830,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Emergency Care Ambulance - Hilltop',
      description: 'Comprehensive emergency care with cardiac monitoring.',
      location: 'Hilltop Medical Center, 852 Hill St',
      contactNumber: '+1-555-0111',
      latitude: 40.7910,
      longitude: -73.9440,
      isAvailable: true
    }
  ];

  // Seed doctors
  const doctors = [
    {
      id: uuidv4(),
      title: 'Dr. Sarah Johnson',
      description: 'Emergency Medicine Specialist with 10 years of experience in trauma care.',
      location: 'City General Hospital, 123 Main St',
      specialization: 'Emergency Medicine',
      contactNumber: '+1-555-0201',
      experience: 10,
      latitude: 40.7128,
      longitude: -74.0060,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Dr. Michael Chen',
      description: 'Cardiologist and Emergency Care Expert specializing in cardiac emergencies.',
      location: 'Heart Care Center, 456 Park Ave',
      specialization: 'Cardiology',
      contactNumber: '+1-555-0202',
      experience: 8,
      latitude: 40.7589,
      longitude: -73.9851,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Dr. Emily Rodriguez',
      description: 'Pediatric Emergency Specialist with expertise in child emergencies.',
      location: 'Childrens Medical Center, 789 Broadway',
      specialization: 'Pediatrics',
      contactNumber: '+1-555-0203',
      experience: 12,
      latitude: 40.7910,
      longitude: -73.9740,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Dr. James Wilson',
      description: 'Orthopedic Surgeon specializing in emergency fracture care.',
      location: 'Bone & Joint Center, 321 Oak St',
      specialization: 'Orthopedics',
      contactNumber: '+1-555-0204',
      experience: 15,
      latitude: 40.7282,
      longitude: -73.7949,
      isAvailable: false
    },
    {
      id: uuidv4(),
      title: 'Dr. Lisa Thompson',
      description: 'Neurologist with expertise in stroke emergencies.',
      location: 'Neuro Care Institute, 654 Pine St',
      specialization: 'Neurology',
      contactNumber: '+1-555-0205',
      experience: 11,
      latitude: 40.7505,
      longitude: -73.9934,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Dr. Robert Martinez',
      description: 'General Surgeon specializing in emergency surgeries.',
      location: 'Surgical Specialists, 987 Elm St',
      specialization: 'General Surgery',
      contactNumber: '+1-555-0206',
      experience: 14,
      latitude: 40.6740,
      longitude: -73.9970,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Dr. Jennifer Lee',
      description: 'Anesthesiologist with critical care expertise.',
      location: 'Anesthesia Associates, 147 5th Ave',
      specialization: 'Anesthesiology',
      contactNumber: '+1-555-0207',
      experience: 9,
      latitude: 40.7440,
      longitude: -73.9920,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Dr. David Brown',
      description: 'Pulmonologist specializing in respiratory emergencies.',
      location: 'Lung Care Center, 258 6th Ave',
      specialization: 'Pulmonology',
      contactNumber: '+1-555-0208',
      experience: 13,
      latitude: 40.7730,
      longitude: -73.9650,
      isAvailable: false
    },
    {
      id: uuidv4(),
      title: 'Dr. Amanda White',
      description: 'Obstetrician-Gynecologist with emergency pregnancy expertise.',
      location: 'Womens Health Center, 369 Wall St',
      specialization: 'Obstetrics & Gynecology',
      contactNumber: '+1-555-0209',
      experience: 7,
      latitude: 40.7070,
      longitude: -74.0110,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Dr. Kevin Davis',
      description: 'Psychiatrist specializing in emergency psychiatric care.',
      location: 'Mental Health Emergency, 741 River Rd',
      specialization: 'Psychiatry',
      contactNumber: '+1-555-0210',
      experience: 10,
      latitude: 40.7630,
      longitude: -73.9830,
      isAvailable: true
    },
    {
      id: uuidv4(),
      title: 'Dr. Maria Garcia',
      description: 'Infectious Disease Specialist with pandemic response expertise.',
      location: 'Infectious Disease Center, 852 Hill St',
      specialization: 'Infectious Diseases',
      contactNumber: '+1-555-0211',
      experience: 12,
      latitude: 40.7910,
      longitude: -73.9440,
      isAvailable: true
    }
  ];

  for (const ambulance of ambulances) {
    await db.run(
      `INSERT INTO ambulances (id, title, description, location, contactNumber, latitude, longitude, isAvailable) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [ambulance.id, ambulance.title, ambulance.description, ambulance.location, 
       ambulance.contactNumber, ambulance.latitude, ambulance.longitude, ambulance.isAvailable]
    );
  }

  for (const doctor of doctors) {
    await db.run(
      `INSERT INTO doctors (id, title, description, location, specialization, contactNumber, experience, latitude, longitude, isAvailable) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [doctor.id, doctor.title, doctor.description, doctor.location, doctor.specialization,
       doctor.contactNumber, doctor.experience, doctor.latitude, doctor.longitude, doctor.isAvailable]
    );
  }

  console.log('Seed data inserted successfully');
}

seedData().catch(console.error);