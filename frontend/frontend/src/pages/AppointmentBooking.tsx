import { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle } from 'lucide-react';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const services = [
    { id: 'loan', name: 'Loan Consultation', duration: '30 min', icon: '💰' },
    { id: 'insurance', name: 'Insurance Discussion', duration: '45 min', icon: '🛡️' },
    { id: 'investment', name: 'Investment Planning', duration: '60 min', icon: '📈' },
    { id: 'account', name: 'Account Services', duration: '20 min', icon: '🏦' },
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
    '11:30 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM',
  ];

  const branches = [
    { name: 'TATA Capital - Mumbai', address: 'Nariman Point, Mumbai', availability: 'Low Crowd' },
    { name: 'TATA Capital - Delhi', address: 'Connaught Place, Delhi', availability: 'Medium Crowd' },
    { name: 'TATA Capital - Bangalore', address: 'MG Road, Bangalore', availability: 'Low Crowd' },
  ];

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedService) {
      setIsBooked(true);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-tata-blue mb-8 flex items-center">
          <Calendar className="mr-3" />
          Book Appointment
        </h1>

        {!isBooked ? (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-tata-blue mb-4">Select Service</h2>
                <div className="grid grid-cols-2 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedService === service.id
                          ? 'border-tata-blue bg-blue-50'
                          : 'border-gray-200 hover:border-tata-teal'
                      }`}
                    >
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <p className="font-semibold">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-tata-blue mb-4">Select Date</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
                <p className="text-sm text-gray-600 mt-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  We recommend booking during off-peak hours (2:00 PM - 4:00 PM) for less crowd
                </p>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-tata-blue mb-4">Select Time</h2>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTime === time
                          ? 'border-tata-blue bg-blue-50 font-semibold'
                          : 'border-gray-200 hover:border-tata-teal'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-tata-blue mb-4">Available Branches</h2>
                <div className="space-y-4">
                  {branches.map((branch, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{branch.name}</p>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {branch.address}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          branch.availability === 'Low Crowd'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {branch.availability}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card bg-gradient-to-br from-tata-blue to-tata-teal text-white">
                <h3 className="text-lg font-semibold mb-2">Why Book Online?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Avoid long queues
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Choose your preferred time
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Get dedicated attention
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save time and effort
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="card max-w-2xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-tata-blue mb-4">Appointment Booked!</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-semibold">
                    {services.find(s => s.id === selectedService)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-semibold">{selectedTime}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              You will receive a confirmation email shortly. Please arrive 10 minutes before your appointment.
            </p>
            <button
              onClick={() => {
                setIsBooked(false);
                setSelectedDate('');
                setSelectedTime('');
                setSelectedService('');
              }}
              className="btn-primary"
            >
              Book Another Appointment
            </button>
          </div>
        )}

        {!isBooked && (
          <div className="mt-8 text-center">
            <button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || !selectedService}
              className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;

