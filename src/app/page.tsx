'use client';
import { Mic, MessageCircle, Users, BarChart3, Trophy, Target } from 'lucide-react';
import { useForensIQData } from '../hooks/useForensIQData';

const CheckIcon = () => (
  <svg className="inline w-5 h-5 mr-1 text-green-400 align-middle" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 6.293a1 1 0 00-1.414 0L9 12.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414z" clipRule="evenodd" /></svg>
);

const LightningIcon = () => (
  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046a1 1 0 0 1 .7 1.254l-1.1 4.4h3.1a1 1 0 0 1 .8 1.6l-7 10a1 1 0 0 1-1.8-.8l1.1-4.4h-3.1a1 1 0 0 1-.8-1.6l7-10a1 1 0 0 1 1.1-.354z"/></svg>
);

const FeatureIcons = {
  speech: <Mic className="w-7 h-7 text-blue-500 bg-blue-100 rounded-lg p-1" strokeWidth={2.2} fill="none" />,
  debate: <MessageCircle className="w-7 h-7 text-green-500 bg-green-100 rounded-lg p-1" strokeWidth={2.2} fill="none" />,
  team: <Users className="w-7 h-7 text-purple-500 bg-purple-100 rounded-lg p-1" strokeWidth={2.2} fill="none" />,
  analytics: <BarChart3 className="w-7 h-7 text-orange-400 bg-orange-100 rounded-lg p-1" strokeWidth={2.2} fill="none" />,
  achievements: <Trophy className="w-7 h-7 text-yellow-400 bg-yellow-100 rounded-lg p-1" strokeWidth={2.2} fill="none" />,
  goals: <Target className="w-7 h-7 text-pink-400 bg-pink-100 rounded-lg p-1" strokeWidth={2.2} fill="none" />,
};

export default function Home() {
  const {
    stats,
    selectedFeature,
    pricingPlans,
    testimonials,
    features,
    setSelectedFeature,
    getStatsFormatted,
    getSelectedFeature
  } = useForensIQData();

  const formattedStats = getStatsFormatted();
  const selectedFeatureData = getSelectedFeature();

  return (
    <div className="min-h-screen bg-black text-white font-sans scroll-smooth">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-green-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider text-white/80 transition-colors duration-200 hover:bg-cyan-400/80 hover:text-black cursor-pointer">
            <LightningIcon />
            AI-Powered Speech & Debate Platform
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Master the Art of <span className="text-cyan-400">Speech & Debate</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Transform your communication skills with AI-powered coaching. Practice speeches, engage in debates, and track your progress with advanced analytics designed for real improvement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a href="/signup" className="group relative overflow-hidden bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold px-8 py-3 rounded-full shadow hover:scale-110 transition-transform duration-200 text-lg">
            <span className="relative z-10">Start Free Trial</span>
            <span className="shimmer absolute inset-0"></span>
          </a>
          <a href="#" className="bg-white/10 border border-white/20 text-white font-bold px-8 py-3 rounded-full shadow hover:bg-white/20 transition text-lg flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-5.197-3.028A1 1 0 008 9.028v5.944a1 1 0 001.555.832l5.197-3.028a1 1 0 000-1.664z" /></svg>
            Watch Demo
          </a>
        </div>
        <div className="flex flex-wrap gap-4 justify-center text-sm text-green-400 font-medium">
          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>No credit card required</span>
          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Free forever plan</span>
          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Cancel anytime</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-extrabold text-cyan-400 mb-1">{formattedStats.practiceSessions}+</div>
          <div className="font-bold">Practice Sessions</div>
          <div className="text-green-400 text-xs mt-1">{stats.practiceSessionsGrowth}</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-cyan-400 mb-1">{formattedStats.activeUsers}+</div>
          <div className="font-bold">Active Users</div>
          <div className="text-green-400 text-xs mt-1">{stats.activeUsersGrowth}</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-cyan-400 mb-1">{formattedStats.topicsAvailable}+</div>
          <div className="font-bold">Topics Available</div>
          <div className="text-green-400 text-xs mt-1">{stats.topicsGrowth}</div>
        </div>
        <div>
          <div className="text-3xl font-extrabold text-cyan-400 mb-1">{formattedStats.averageImprovement}</div>
          <div className="font-bold">Average Improvement</div>
          <div className="text-green-400 text-xs mt-1">{stats.improvementGrowth}</div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-cyan-600 to-green-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider text-white/80 transition-colors duration-200 hover:bg-cyan-400/80 hover:text-black cursor-pointer">Features</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Everything You Need to Excel</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">From AI-powered speech analysis to team collaboration, ForensIQ provides comprehensive tools to improve your communication skills.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Feature Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
            {features.map((f) => (
              <div
                key={f.key}
                onMouseEnter={() => setSelectedFeature(f.key)}
                className={`cursor-pointer bg-white/5 rounded-2xl p-6 border transition-all duration-200 flex flex-col gap-2 ${selectedFeature === f.key ? 'border-cyan-400 shadow-lg scale-105' : 'border-white/10 hover:border-cyan-400 hover:scale-105'}`}
              >
                <div className={`${f.color} text-2xl mb-2`}>{FeatureIcons[f.key as keyof typeof FeatureIcons]}</div>
                <div className="font-bold text-lg mb-1">{f.title}</div>
                <div className="text-white/80 text-sm mb-2">{f.desc}</div>
                <ul className="text-green-400 text-xs space-y-1">
                  {f.benefits.map((b) => (
                    <li key={b}><CheckIcon />{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Right: Feature Detail */}
          <div className="flex-1 flex items-center justify-center">
            {selectedFeatureData && (
              <div className="bg-white/5 rounded-2xl p-8 border-2 border-cyan-400 shadow-xl max-w-md w-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`${selectedFeatureData.color} text-3xl`}>{FeatureIcons[selectedFeatureData.key as keyof typeof FeatureIcons]}</span>
                  <span className="font-bold text-xl">{selectedFeatureData.title}</span>
                </div>
                <div className="text-white/90 mb-4">{selectedFeatureData.desc}</div>
                <div className="font-bold mb-2 text-white/80">Key Benefits:</div>
                <ul className="text-green-400 text-sm space-y-1">
                  {selectedFeatureData.benefits.map((b) => (
                    <li key={b}><CheckIcon />{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-cyan-600 to-green-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider text-white/80 transition-colors duration-200 hover:bg-cyan-400/80 hover:text-black cursor-pointer">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">How It Works</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Get started in minutes with our simple three-step process</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-cyan-900 flex items-center justify-center text-2xl font-bold mb-2">1</div>
            <div className="font-bold mb-1">Sign Up & Choose</div>
            <div className="text-white/80 text-sm">Create your account and select from our library of practice topics or create your own.</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-900 flex items-center justify-center text-2xl font-bold mb-2">2</div>
            <div className="font-bold mb-1">Practice & Record</div>
            <div className="text-white/80 text-sm">Record your speech or engage in a debate with our AI opponent. Get real-time feedback.</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center text-2xl font-bold mb-2">3</div>
            <div className="font-bold mb-1">Improve & Track</div>
            <div className="text-white/80 text-sm">Review detailed analytics, track your progress, and celebrate achievements as you improve.</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-green-600 to-cyan-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider text-white/80 transition-colors duration-200 hover:bg-cyan-400/80 hover:text-black cursor-pointer">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Loved by Speakers Worldwide</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">See how ForensIQ is helping people improve their communication skills and achieve their goals.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-300 text-xl">{'★'.repeat(testimonial.rating)}</span>
              </div>
              <div className="text-white/90 italic mb-2">&quot;{testimonial.text}&quot;</div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`${testimonial.author.avatarColor} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold`}>{testimonial.author.initials}</span>
                <div>
                  <div className="font-bold text-sm">{testimonial.author.name}</div>
                  <div className="text-xs text-white/60">{testimonial.author.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-cyan-600 to-green-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider text-white/80 transition-colors duration-200 hover:bg-cyan-400/80 hover:text-black cursor-pointer">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Choose Your Plan</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">Start free and upgrade as you grow. All plans include our core features.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`${plan.isPopular ? 'bg-white/10 border-2 border-cyan-400 scale-105 shadow-lg' : 'bg-white/5 border border-white/10'} rounded-2xl p-8 flex flex-col gap-4 items-center`}>
              <div className="font-bold text-xl mb-2">
                {plan.name} 
                {plan.isPopular && <span className="bg-cyan-400 text-black text-xs font-semibold px-2 py-1 rounded-full ml-2">Most Popular</span>}
              </div>
              <div className="text-3xl font-extrabold text-cyan-400 mb-2">${plan.price} <span className="text-base font-normal">{plan.period}</span></div>
              <ul className="text-white/80 text-sm space-y-1">
                {plan.features.map((feature) => (
                  <li key={feature}><CheckIcon />{feature}</li>
                ))}
              </ul>
              <a href="/signup" className={`group ${plan.isPopular ? 'bg-gradient-to-r from-cyan-400 to-green-400' : 'bg-gradient-to-r from-cyan-600 to-green-600'} text-black font-bold px-5 py-2 rounded-full shadow hover:scale-105 transition overflow-hidden relative`}>
                <span className="relative z-10">{plan.ctaText}</span>
                <span className="shimmer absolute inset-0"></span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-gradient-to-r from-cyan-700 to-green-700 py-16 text-center mt-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Transform Your Speaking Skills?</h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">Join thousands of students, professionals, and public speakers who are already improving with ForensIQ.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/signup" className="group bg-white text-black font-bold px-8 py-3 rounded-full shadow hover:scale-105 transition overflow-hidden relative">
            <span className="relative z-10">Start Your Free Trial</span>
            <span className="shimmer absolute inset-0"></span>
          </a>
          <a href="/signin" className="bg-black/20 border border-white/20 text-white font-bold px-8 py-3 rounded-full shadow hover:bg-white/10 transition text-lg">Sign In</a>
        </div>
      </section>
    </div>
  );
}
