import { Head } from '@inertiajs/react'
import { CalendarIcon, HeartIcon, WineIcon, UtensilsIcon, MapPinIcon, ClockIcon, TrophyIcon, MusicIcon, PhoneIcon, UsersIcon, StarIcon, SparklesIcon, CrownIcon } from 'lucide-react'
import CountdownTimer from '@/components/countdown-timer'
import PurchaseTicketDialog from '@/components/events/purchase-ticket-dialog'
import ManageTicketDialog from '@/components/events/manage-ticket-dialog'

export default function SinglesEvent() {
  return (
    <>
      <Head title="OLQP Singles Dinner 2025" />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-gray-900/55 to-black/65"></div>
          
          {/* Floating Particles Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce opacity-50"></div>
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute bottom-20 right-10 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-30"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Enhanced Header */}
          <header className="bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-2xl border-b border-yellow-500/40 shadow-2xl">
            <div className="max-w-5xl mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold tracking-widest text-yellow-500">OLQP PARISH</h2>
                  </div>
                </div>
                
                {/* Enhanced Countdown Timer */}
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-yellow-500/15 to-amber-500/15 backdrop-blur-lg rounded-full px-4 py-2 border border-yellow-500/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CountdownTimer targetDate="2025-10-31T18:00:00" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-yellow-500">October 31, 2025</div>
                    <div className="text-xs text-yellow-400/90">6:00 PM - 12:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-4 py-6">
            <div className="max-w-5xl w-full">
              <div className="grid lg:grid-cols-2 gap-6 items-center">
                
                {/* Left Column - Enhanced Main Content */}
                <div className="space-y-5">
                  {/* Enhanced Hero Title */}
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                      <SparklesIcon className="size-5 text-yellow-500 animate-pulse" />
                      <p className="text-yellow-500 text-sm font-bold tracking-widest uppercase">Welcome to the</p>
                      <SparklesIcon className="size-5 text-yellow-500 animate-pulse" />
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                      <h1 className="text-2xl lg:text-3xl font-black text-gray-100 tracking-tight leading-tight font-serif">
                        OLQP SINGLES DINNER 2025
                      </h1>
                    </div>
                    <p className="text-lg text-yellow-400 mb-5 leading-relaxed font-light italic font-serif">
                      An evening of connection, fine dining, and unforgettable memories. 
                      Open to all singles looking for meaningful connections.
                    </p>
                  </div>

                  {/* Enhanced Pricing & Payment Card */}
                  <div className="bg-gradient-to-r from-yellow-500/8 to-amber-500/8 backdrop-blur-lg rounded-2xl p-5 border border-yellow-500/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <h3 className="text-gray-50 font-bold text-xl mb-4 text-center tracking-wide">Payment Details</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center group">
                        <div className="text-2xl font-black text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300">Ksh. 4,999</div>
                        <div className="text-yellow-400 text-sm font-semibold">Registration</div>
                      </div>
                      <div className="text-center group">
                        <div className="text-2xl font-black text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300">Ksh. 1,000</div>
                        <div className="text-yellow-400 text-sm font-semibold">Booking Fee</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 rounded-xl border border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300">
                        <div className="text-yellow-400 font-bold mb-1 text-xs tracking-wide">M-Pesa Paybill</div>
                        <div className="text-xl font-black text-gray-300">7171186</div>
                      </div>
                      <div className="p-3 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 rounded-xl border border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300">
                        <div className="text-yellow-400 font-bold mb-1 text-xs tracking-wide">Account</div>
                        <div className="text-xl font-black text-gray-300">DINNER</div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center group">
                      <p className="text-yellow-400 text-xs mb-2 font-bold uppercase tracking-widest group-hover:text-yellow-300 transition-colors duration-300">Paid for a new ticket?</p>
                      <div className="transform group-hover:scale-105 transition-transform duration-300">
                        <PurchaseTicketDialog />
                      </div>
                    </div>
                    <div className="text-center group">
                      <p className="text-yellow-400 text-xs mb-2 font-bold uppercase tracking-widest group-hover:text-yellow-300 transition-colors duration-300">Topped up existing ticket?</p>
                      <div className="transform group-hover:scale-105 transition-transform duration-300">
                        <ManageTicketDialog />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Enhanced Event Info Card */}
                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl border border-yellow-500/30 hover:shadow-3xl transition-all duration-500">
                  <div className="text-center mb-5">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-4 py-2 rounded-full text-sm font-black tracking-wide shadow-lg">
                      <WineIcon className="size-4" />
                      Event Information
                    </div>
                  </div>

                  {/* Enhanced Event Details Grid */}
                  <div className="grid grid-cols-1 gap-4 mb-5">
                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group">
                      <div className="bg-yellow-500/20 p-2 rounded-full group-hover:bg-yellow-500/30 transition-colors duration-300">
                        <CalendarIcon className="size-5 text-yellow-500" />
                      </div>
                      <div>
                        <div className="font-bold text-yellow-400 text-sm tracking-wide">Date & Time</div>
                        <div className="text-yellow-300/90 text-xs">Oct 31, 2025 • 6:00 PM - 12:00 AM</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group">
                      <div className="bg-yellow-500/20 p-2 rounded-full group-hover:bg-yellow-500/30 transition-colors duration-300">
                        <MapPinIcon className="size-5 text-yellow-500" />
                      </div>
                      <div>
                        <div className="font-bold text-yellow-400 text-sm tracking-wide">Venue</div>
                        <div className="text-yellow-300/90 text-xs">The Edge, South C</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group">
                      <div className="bg-yellow-500/20 p-2 rounded-full group-hover:bg-yellow-500/30 transition-colors duration-300">
                        <TrophyIcon className="size-5 text-yellow-500" />
                      </div>
                      <div>
                        <div className="font-bold text-yellow-400 text-sm tracking-wide">Highlights</div>
                        <div className="text-yellow-300/90 text-xs">Networking • Fine Dining • Entertainment</div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Open to All Information */}
                  <div className="text-center p-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/30 mb-4 hover:border-yellow-400/50 transition-all duration-300 group">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <UsersIcon className="size-4 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                      <span className="font-bold text-yellow-400 text-sm tracking-wide group-hover:text-yellow-300 transition-colors duration-300">Open to All</span>
                    </div>
                    <p className="text-yellow-300/90 text-xs italic">Even those from outside OLQP are welcome to join us!</p>
                  </div>

                  {/* Enhanced Contact Info */}
                  <div className="text-center p-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 group">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <PhoneIcon className="size-4 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                      <span className="font-bold text-yellow-400 text-sm tracking-wide group-hover:text-yellow-300 transition-colors duration-300">Contact Us</span>
                    </div>
                    <div className="text-yellow-500 font-black text-lg group-hover:text-yellow-400 transition-colors duration-300">0777111000</div>
                    <p className="text-yellow-300/90 text-xs mt-1 italic">For inquiries and support</p>
                  </div>
                </div>
              </div>
            </div>
          </main>

        </div>
      </div>
    </>
  )
}
