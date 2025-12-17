import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home as HomeIcon,
  Briefcase,
  Car,
  Bike,
  Building2,
  Users,
  CheckCircle,
  Star,
  Smartphone,
  ArrowLeft,
  ArrowRight,
  ArrowRightCircle,
} from 'lucide-react';
import EmiCalculator from '../components/EmiCalculator';

const heroImage =
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80';

type Product = {
  icon: React.ElementType;
  title: string;
  desc: string;
  cta?: string;
};

const loanProducts: Product[] = [
  { icon: Users, title: 'Personal Loan', desc: 'Personal loan for your many needs' },
  { icon: HomeIcon, title: 'Loan Against Property', desc: 'Use property to get credit' },
  { icon: Car, title: 'Used Car Loan', desc: 'Drive your dream car with ease' },
  { icon: Building2, title: 'Home Loan', desc: 'Affordable home loan in less than 10 minutes' },
  { icon: Briefcase, title: 'Business Loan', desc: 'Grow your business with up to Rs. 90 lakhs' },
  { icon: Bike, title: 'Two Wheeler Loan', desc: 'Ride the bike of your dreams' },
];

const services = [
  'Virtual Customer Portal',
  'e-Pay',
  'My Wealth Account',
  'Dropline Overdraft Loan',
  'Moneyfy',
];

const testimonials = [
  {
    name: 'Rita Sharma',
    loan: 'Personal Loan',
    text: 'Quick processing and transparent communication. Loved the experience!',
  },
  {
    name: 'Aman Gupta',
    loan: 'Home Loan',
    text: 'Smooth journey from application to approval. Great rates too!',
  },
  {
    name: 'Nidhi Patel',
    loan: 'Business Loan',
    text: 'Helped me scale operations fast. Support team is excellent.',
  },
];

const insights = [
  { title: 'What is an overdraft facility?', date: 'Jan 2024', read: '2 min read' },
  { title: 'What is an Encumbrance Certificate?', date: 'Jan 2024', read: '2 min read' },
  { title: 'What is debt financing?', date: 'Jan 2024', read: '2 min read' },
];

const Home = () => {
  const [loanSlide, setLoanSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);

  const visibleLoans = loanProducts.slice(loanSlide * 3, loanSlide * 3 + 3);
  const maxLoanSlide = Math.ceil(loanProducts.length / 3) - 1;

  const visibleTestimonial = testimonials[testimonialSlide];

  const renderLoanCard = (product: Product, idx: number) => {
    const Icon = product.icon;
    return (
      <motion.div
        key={`${product.title}-${idx}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-2xl shadow-lg px-5 py-6 hover:shadow-xl transition-all border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#f2edff] flex items-center justify-center text-purple-600">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Apply Now</p>
            <h3 className="text-lg font-semibold text-tata-blue">{product.title}</h3>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-4">{product.desc}</p>
        <div className="flex items-center space-x-3 text-sm font-semibold">
          <Link to="/bank-comparison" className="text-tata-blue hover:underline">
            Apply Now <ArrowRight className="inline w-4 h-4 ml-1" />
          </Link>
          <Link to="/bank-comparison" className="text-tata-teal hover:underline">
            Learn More <ArrowRight className="inline w-4 h-4 ml-1" />
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Thin top info bar */}
      <div className="bg-[#f4f7ff] text-xs text-gray-700 border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-tata-blue">Sarvasva</span>
            <span>Helping you take the leap from dream to reality</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="text-blue-600 cursor-pointer">Redeem Cashback Offers</span>
            <span>Call: 1860 267 6060</span>
            <span>Emergency Helpline</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto mt-4 px-4">
          <div className="rounded-3xl overflow-hidden shadow-2xl relative">
            <div
              className="h-[360px] md:h-[420px] bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(0,36,92,0.85), rgba(0,163,161,0.65)), url(${heroImage})`,
              }}
            />
            <div className="absolute inset-0 px-6 md:px-10 py-8 md:py-10 text-white flex flex-col justify-between">
              <div className="text-sm flex items-center space-x-3">
                <span className="px-3 py-1 bg-white/20 rounded-full">7.49% onwards</span>
                <span>Minimum salary ₹20,000</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                <div className="max-w-lg">
                  <h1 className="text-3xl md:text-4xl font-bold leading-snug">One Personal Loan</h1>
                  <p className="text-xl md:text-2xl mt-1 font-semibold">Many uses</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="bg-white/20 rounded-full px-4 py-2 text-sm">
                      EMI starting from <span className="font-bold">Rs.94/day</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-5">
                    <Link
                      to="/bank-comparison"
                      className="rounded-full bg-white text-tata-blue px-5 py-3 font-semibold shadow hover:opacity-90"
                    >
                      Apply Now
                    </Link>
                    <Link
                      to="/bank-comparison"
                      className="rounded-full bg-white/10 border border-white px-5 py-3 font-semibold text-white hover:bg-white/20"
                    >
                      Business Documentation
                    </Link>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-auto">
                  <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-md border border-white/20">
                    <p className="text-sm mb-1">Disbursement in 24 hours*</p>
                    <div className="flex flex-wrap gap-3">
                      <div className="px-3 py-2 bg-white/10 rounded-lg text-sm">Wedding</div>
                      <div className="px-3 py-2 bg-white/10 rounded-lg text-sm">Education</div>
                      <div className="px-3 py-2 bg-white/10 rounded-lg text-sm">Medical</div>
                      <div className="px-3 py-2 bg-white/10 rounded-lg text-sm">Travel</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm flex items-center space-x-2">
                <span className="text-white/80">Track your application today</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Loans slider */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Apply for a Loan Online with <span className="text-tata-blue">Sarvasva</span>
          </h2>
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-4">
              {visibleLoans.map(renderLoanCard)}
            </div>
            <button
              className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-50"
              disabled={loanSlide === 0}
              onClick={() => setLoanSlide(Math.max(0, loanSlide - 1))}
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-gray-50"
              disabled={loanSlide === maxLoanSlide}
              onClick={() => setLoanSlide(Math.min(maxLoanSlide, loanSlide + 1))}
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            {[...Array(maxLoanSlide + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setLoanSlide(i)}
                className={`w-2.5 h-2.5 rounded-full ${
                  loanSlide === i ? 'bg-tata-blue' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Instant loan form */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-2xl font-bold text-tata-blue mb-4">Instant loan instant benefits</h3>
            <p className="text-sm text-gray-600 mb-6">
              You are eligible for pre-approved offers. Apply now!
            </p>
            <div className="space-y-3">
              <input type="text" placeholder="Name" className="input-field" />
              <input type="tel" placeholder="Phone Number" className="input-field" />
              <button className="btn-primary w-full rounded-full">Proceed</button>
            </div>
            <p className="text-xs text-gray-500 mt-4">Track your application today</p>
          </div>

          {/* Visual card with real photo (similar to Tata Capital) */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-xs md:max-w-sm rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.18)] overflow-hidden bg-gradient-to-br from-[#c6ffdd] via-[#fbd786] to-[#f7797d]">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80"
                alt="Happy family celebrating loan approval"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
              <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 flex items-center space-x-2 text-xs font-semibold text-tata-blue shadow">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Pre-approved offer</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium opacity-90">Instant loan</p>
                <p className="text-lg font-semibold leading-tight">Approval in minutes, benefits for years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator (fully functional) */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <EmiCalculator />
        </div>
      </section>

      {/* Mobile apps & offers */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex flex-wrap gap-4 border-b pb-4 mb-6">
              <button className="px-4 py-2 bg-tata-gold text-tata-blue font-semibold rounded-t-lg">
                Mobile Apps
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-tata-blue">My Offers</button>
              <button className="px-4 py-2 text-gray-600 hover:text-tata-blue">WhatsApp</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl font-bold text-tata-blue mb-2">
                  Stay connected through Mobile Apps
                </h3>
                <p className="text-gray-600 mb-4">Access your loan information with ease</p>
                <div className="flex items-center gap-3 mb-4">
                  <button className="p-2 border rounded-lg text-sm hover:bg-gray-50">📱 Google Play</button>
                  <button className="p-2 border rounded-lg text-sm hover:bg-gray-50">🍎 App Store</button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.6 Rating</span>
                  <span className="text-gray-400">|</span>
                  <span>1.4 Million</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-tata-blue to-tata-teal rounded-2xl shadow-xl flex items-center justify-center text-white text-3xl font-bold">
                  App
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service portals + CTA banner */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6 items-stretch">
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-tata-blue mb-3">Service Portals</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {services.map((s) => (
                    <li key={s} className="flex items-center space-x-2">
                      <ArrowRightCircle className="w-4 h-4 text-tata-blue" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-tata-blue mb-3">Contact Us</h4>
                <p className="text-xl font-bold text-tata-blue mb-2">1860 267 6060</p>
                <p className="text-sm text-gray-600 mb-2">Email us / Contact Information</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-tata-blue mb-3">Locate Us</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Find our branch and talk to our lending experts today
                </p>
                <Link to="/appointment" className="text-tata-teal font-semibold hover:underline text-sm">
                  Locate our Branches →
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#ffefba] to-[#ffffff] rounded-2xl shadow-lg p-6 border border-yellow-100 flex flex-col justify-center">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">ShubhChintak</h4>
            <p className="text-sm text-gray-700 mb-4">
              Discover insights about finance, migration, and more
            </p>
            <button className="btn-primary bg-tata-blue text-white w-fit">Explore</button>
          </div>
        </div>
      </section>

      {/* Community stats */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-tata-blue mb-6">Creating value for our communities</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
              <p className="text-sm text-gray-600">Card Communities</p>
              <p className="text-2xl font-bold text-tata-blue">9,527</p>
            </div>
            <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
              <p className="text-sm text-gray-600">Card Network</p>
              <p className="text-2xl font-bold text-tata-blue">5,000+</p>
            </div>
            <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
              <p className="text-sm text-gray-600">Hospitals</p>
              <p className="text-2xl font-bold text-tata-blue">77,000+</p>
            </div>
            <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
              <p className="text-sm text-gray-600">Branches</p>
              <p className="text-2xl font-bold text-tata-blue">500+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials slider */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-tata-blue mb-6">
            What our customers say about us
          </h3>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">"{visibleTestimonial.text}"</p>
              <p className="font-semibold text-tata-blue">{visibleTestimonial.name}</p>
              <p className="text-sm text-gray-600">{visibleTestimonial.loan}</p>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    testimonialSlide === i ? 'bg-tata-blue' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financial insights */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-tata-blue">Financial insights</h3>
            <button className="text-sm text-tata-blue font-semibold">See more</button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {insights.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow border border-gray-100 p-4">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-3" />
                <p className="text-sm text-gray-600 mb-1">
                  {item.date} • {item.read}
                </p>
                <p className="text-gray-800 font-semibold text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-tata-blue text-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h3>
            <p className="text-sm text-white/80">Get the latest updates and offers</p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <input
              type="email"
              placeholder="Email ID"
              className="input-field flex-1 md:w-64 text-gray-900"
            />
            <button className="btn-primary bg-white text-tata-blue hover:bg-gray-100 rounded-lg">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
