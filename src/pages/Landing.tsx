import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-900">PayLane</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-900 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-800 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center px-6 pt-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Banking made simple, fast & secure
            </h2>
            <p className="text-xl text-blue-200 mb-10">
              Send money, track transactions, and manage your finances — all in one place. PayLane puts you in control of your money.
            </p>
            <div className="flex gap-4 mb-10">
              <button
                onClick={() => navigate('/signup')}
                className="bg-white text-blue-900 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition"
              >
                Open Account
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-900 transition"
              >
                Sign In
              </button>
            </div>
           {/* Download Buttons */}
<div>
  <p className="text-blue-200 text-sm mb-4">Download the app</p>
  <div className="flex gap-4">
    {/* App Store */}
    <div className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-gray-900 transition">
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <div>
        <p className="text-xs text-gray-400">Download on the</p>
        <p className="text-sm font-semibold">App Store</p>
      </div>
    </div>

    {/* Google Play */}
    <div className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl cursor-pointer hover:bg-gray-900 transition">
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M3.18 23.76c.3.17.64.22.99.14l12.5-7.17-2.61-2.61-10.88 9.64zM.5 1.4C.19 1.73 0 2.23 0 2.88v18.24c0 .65.19 1.15.51 1.48l.08.07 10.21-10.21v-.24L.58 1.33.5 1.4zM20.49 10.34l-2.78-1.6-2.93 2.93 2.93 2.93 2.8-1.61c.8-.46.8-1.2-.02-1.65zM3.18.24L15.68 7.4l-2.61 2.61L2.19.37C2.5.1 2.88.07 3.18.24z"/>
      </svg>
      <div>
        <p className="text-xs text-gray-400">Get it on</p>
        <p className="text-sm font-semibold">Google Play</p>
      </div>
        </div>
        </div>
    </div>
 </div>

          {/* App Mockup */}
          <div className="hidden md:flex justify-center">
            <div className="bg-white rounded-3xl p-6 shadow-2xl w-72">
              <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-5 text-white mb-4">
                <p className="text-blue-200 text-xs mb-1">Total Balance</p>
                <p className="text-3xl font-bold">$12,500.00</p>
              </div>
              <div className="space-y-3">
                {['Salary', 'Netflix', 'Freelance'].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-700">{item}</p>
                    <p className={`text-sm font-semibold ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {i % 2 === 0 ? '+$500' : '-$200'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Why choose PayLane?</h3>
          <p className="text-lg text-gray-500 mb-16">Everything you need to manage your money with confidence.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Instant Transfers', desc: 'Send money to anyone in seconds, anywhere in the world.' },
              { icon: '🔒', title: 'Bank-Level Security', desc: 'Your money and data are protected with top-tier encryption.' },
              { icon: '💱', title: 'Multi-Currency', desc: 'Manage USD and NGN balances with real-time conversion.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-blue-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to take control of your money?</h3>
          <p className="text-xl text-blue-200 mb-10">Join thousands of people who trust PayLane for their daily banking needs.</p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-900 font-semibold px-10 py-4 rounded-full hover:bg-blue-50 transition"
          >
            Open a Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6 text-center">
        <p className="text-2xl font-bold text-white mb-2">PayLane</p>
        <p className="text-sm">© 2026 PayLane. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Landing