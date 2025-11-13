import ProposalForm from "./ProposalForm";

const FeaturesSection = () => (
  <section id="features" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-sm font-bold uppercase text-[#FC7019] tracking-widest">
          How It Works
        </h2>
        <p className="mt-3 text-4xl md:text-5xl font-extrabold text-[#131B28]">
          A 3-Step Journey to Renewable Energy
        </p>
        <p className="mt-4 text-lg text-gray-600">
          From community analysis to AI-powered recommendations and expert guidance
        </p>
      </div>
      {/* STEP 1: Onboard & Analyze */}
      <div className="mt-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 lg:pr-10">
          <span className="inline-flex items-center px-4 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
            Step 1: Onboard & Analyze
          </span>
          <h3 className="mt-4 text-3xl font-extrabold text-[#131B28]">
            Community Profile Assessment
          </h3>
          <p className="mt-4 text-lg text-gray-700">
            Tell us about your barangay or LGU. Input your location, available natural resources, community population, and existing infrastructure. Our AI analyzes this data to understand your unique renewable energy potential and constraints.
          </p>
          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#FC7019] font-bold">📍</span>
              <span>Geographic location and climate patterns</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FC7019] font-bold">⚡</span>
              <span>Available resources (solar, wind, hydro potential)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FC7019] font-bold">👥</span>
              <span>Community population and energy demand</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FC7019] font-bold">🏗️</span>
              <span>Infrastructure readiness and grid connectivity</span>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 w-full">
          <ProposalForm />
        </div>
      </div>
      {/* STEP 2: AI-Driven Energy Design Studio */}
      <div className="mt-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 w-full">
          {/* Mockup Dashboard */}
          <div className="bg-linear-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-xl">
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-gray-200 pb-4">
                <h4 className="text-xl font-bold text-[#131B28]">
                  Energy Proposal: Barangay San Juan
                </h4>
                <p className="text-sm text-gray-600">AI-Generated Recommendation</p>
              </div>

              {/* System Recommendation */}
              <div className="bg-white rounded-lg p-4 border-l-4 border-[#FC7019]">
                <p className="text-sm font-semibold text-gray-600">Recommended System</p>
                <p className="text-2xl font-bold text-[#131B28] mt-2">
                  ☀️ Hybrid Solar + Wind
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Optimal for your location and resources
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Annual Output</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">45,320 kWh</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Estimated Cost</p>
                  <p className="text-2xl font-bold text-[#131B28] mt-2">₱800K</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Monthly Savings</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">₱50,000</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-600 uppercase">Payback Period</p>
                  <p className="text-2xl font-bold text-[#131B28] mt-2">16 months</p>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-gray-600 mb-3">Cost Breakdown</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Solar Panels (50%)</span>
                    <div className="w-24 bg-gray-200 rounded h-2">
                      <div className="bg-yellow-400 h-2 rounded" style={{width: "50%"}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Wind Turbines (30%)</span>
                    <div className="w-24 bg-gray-200 rounded h-2">
                      <div className="bg-blue-400 h-2 rounded" style={{width: "30%"}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">Installation (20%)</span>
                    <div className="w-24 bg-gray-200 rounded h-2">
                      <div className="bg-green-400 h-2 rounded" style={{width: "20%"}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button className="w-full bg-[#FC7019] hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors">
                View Full Proposal →
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 lg:pr-10">
          <span className="inline-flex items-center px-4 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            Step 2: AI-Driven Design
          </span>
          <h3 className="mt-4 text-3xl font-extrabold text-[#131B28]">
            AI-Driven Energy Design Studio
          </h3>
          <p className="mt-4 text-lg text-gray-700">
            Our AI analyzes your community data and generates a comprehensive renewable energy proposal. We evaluate location, geography, population energy demand, and grid connection feasibility to recommend the optimal system.
          </p>
          
          <div className="mt-6 space-y-4">
            <div className="flex gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-semibold text-[#131B28]">Evaluate Location & Geography</p>
                <p className="text-sm text-gray-600">Analyze climate, terrain, and renewable potential</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-semibold text-[#131B28]">Calculate Energy Demand</p>
                <p className="text-sm text-gray-600">Estimate population energy needs based on infrastructure</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-semibold text-[#131B28]">Recommend Optimal System</p>
                <p className="text-sm text-gray-600">Solar, wind, hydro, or hybrid—matched to your resources</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <p className="font-semibold text-[#131B28]">Generate Cost & ROI Analysis</p>
                <p className="text-sm text-gray-600">Detailed breakdown with payback period projections</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3: Consult & Optimize */}
      <div className="mt-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="lg:w-1/2 lg:pr-10">
          <span className="inline-flex items-center px-4 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
            Step 3: Consult & Optimize
          </span>
          <h3 className="mt-4 text-3xl font-extrabold text-[#131B28]">
            Personal Energy Consultant Chatbot
          </h3>
          <p className="mt-4 text-lg text-gray-700">
            Chat with our AI energy consultant to get personalized answers based on your community's unique profile and proposal. Ask questions, get optimization tips, and receive expert guidance on maximizing energy generation and ROI.
          </p>
          
          <div className="mt-6 space-y-3">
            <p className="font-semibold text-[#131B28]">Common Questions Answered:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#FC7019]">💬</span>
                <span>"Which renewable source is best for our barangay?"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FC7019]">💬</span>
                <span>"How can we maximize energy output?"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FC7019]">💬</span>
                <span>"What's the expected payback period?"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FC7019]">💬</span>
                <span>"How do we maintain the system efficiently?"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#FC7019]">💬</span>
                <span>"What government incentives are available?"</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          {/* Chat Interface Mockup */}
          <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl p-6 shadow-xl border border-gray-200">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Assistant Message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FC7019] flex items-center justify-center text-white text-sm font-bold">
                  AI
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg p-3 rounded-tl-none">
                  <p className="text-sm text-gray-800">
                    Hello! I'm your AI Energy Consultant. I've analyzed your community profile and generated a solar-wind hybrid proposal. How can I help optimize your energy generation today?
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-3 justify-end">
                <div className="flex-1 bg-[#FC7019] rounded-lg p-3 rounded-tr-none text-white">
                  <p className="text-sm">
                    Which source generates more during monsoon season?
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">
                  You
                </div>
              </div>

              {/* Assistant Response */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FC7019] flex items-center justify-center text-white text-sm font-bold">
                  AI
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg p-3 rounded-tl-none">
                  <p className="text-sm text-gray-800">
                    Great question! During monsoon season, wind turbines significantly outperform solar panels. Wind speeds increase 50-100%, while solar output drops ~30%. Your hybrid system balances both sources automatically, maintaining steady energy generation year-round.
                  </p>
                </div>
              </div>

              {/* Suggested Questions */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-3">Suggested Questions:</p>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors text-gray-700">
                    💡 How to maximize energy output?
                  </button>
                  <button className="w-full text-left text-sm bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors text-gray-700">
                    💰 What's the payback period?
                  </button>
                  <button className="w-full text-left text-sm bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors text-gray-700">
                    🎯 Maintenance requirements?
                  </button>
                </div>
              </div>
            </div>

            {/* Input Field */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask your question..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC7019]"
                />
                <button className="bg-[#FC7019] hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection;


