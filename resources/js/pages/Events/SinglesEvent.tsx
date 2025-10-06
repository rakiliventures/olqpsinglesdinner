import { Head } from '@inertiajs/react'
import { CalendarIcon, HeartIcon, WineIcon, UtensilsIcon, MapPinIcon, ClockIcon, TrophyIcon, MusicIcon, PhoneIcon, UsersIcon, StarIcon, SparklesIcon, CrownIcon, UserCheckIcon, MoonIcon, FlameIcon, GemIcon } from 'lucide-react'
import CountdownTimer from '@/components/countdown-timer'
import PurchaseTicketDialog from '@/components/events/purchase-ticket-dialog'
import ManageTicketDialog from '@/components/events/manage-ticket-dialog'

export default function SinglesEvent() {
  return (
    <>
      <Head title="OLQP Singles Dinner 2025" />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-900 to-black relative overflow-hidden">
        {/* Masquerade Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-red-900/75 to-black/85"></div>
          
          {/* Masquerade Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-70 shadow-lg shadow-yellow-400/50"></div>
            <div className="absolute top-40 right-20 w-2 h-2 bg-amber-300 rounded-full animate-ping opacity-60 shadow-lg shadow-amber-300/50"></div>
            <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-bounce opacity-80 shadow-lg shadow-yellow-500/50"></div>
            <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-gold-400 rounded-full animate-pulse opacity-70 shadow-lg shadow-yellow-400/50"></div>
            <div className="absolute bottom-20 right-10 w-3 h-3 bg-amber-300 rounded-full animate-ping opacity-50 shadow-lg shadow-amber-300/50"></div>
            
            {/* Masquerade Mask Elements */}
            <div className="absolute top-32 left-1/4 w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute bottom-32 right-1/4 w-6 h-6 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full animate-ping opacity-40"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Masquerade Header */}
          <header className="bg-gradient-to-r from-purple-900/95 via-red-900/95 to-black/95 backdrop-blur-2xl border-b border-yellow-500/40 shadow-2xl">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <div className="flex items-center gap-3">
                    <UserCheckIcon className="size-6 sm:size-8 text-yellow-500 animate-pulse" />
                    <h2 className="text-sm sm:text-lg font-bold tracking-widest text-yellow-500">OLQP PARISH</h2>
                    <MoonIcon className="size-5 sm:size-6 text-yellow-400 animate-pulse" />
                  </div>
                </div>
                
                {/* Masquerade Countdown Timer */}
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-lg rounded-full px-5 py-3 border border-yellow-500/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CountdownTimer targetDate="2025-10-31T18:00:00" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-bold text-yellow-500 flex items-center gap-1">
                      <FlameIcon className="size-3" />
                      October 31, 2025
                    </div>
                    <div className="text-xs text-yellow-400/90">6:00 PM - 12:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="max-w-6xl w-full">
              <div className="text-center space-y-8">
                
                {/* Masquerade Welcome Story */}
                <div className="space-y-6">
                  {/* Masquerade Title */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <UserCheckIcon className="size-6 sm:size-8 text-yellow-500 animate-pulse" />
                      <GemIcon className="size-5 sm:size-6 text-yellow-400 animate-ping" />
                      <CrownIcon className="size-6 sm:size-8 text-yellow-500 animate-pulse" />
                    </div>
                    
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight" style={{fontFamily: 'serif'}}>
                      THE MASQUERADE DINNER
                    </h1>
                    
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent flex-1"></div>
                      <p className="text-yellow-500 text-sm sm:text-base font-bold tracking-widest uppercase px-4">A Night of Mystery & Romance</p>
                      <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent flex-1"></div>
                    </div>
                  </div>

                  {/* Masquerade Story */}
                  <div className="bg-gradient-to-br from-purple-900/40 via-red-900/30 to-black/50 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-yellow-500/30 shadow-2xl">
                    <div className="space-y-4 text-left">
                      <div className="flex items-start gap-3">
                        <MoonIcon className="size-5 text-yellow-500 mt-1 flex-shrink-0" />
                        <p className="text-yellow-300/90 text-sm sm:text-base leading-relaxed italic" style={{fontFamily: 'serif'}}>
                          "Under the veil of twilight, where shadows dance with golden light, 
                          we invite you to an evening of enchantment and mystery..."
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <FlameIcon className="size-5 text-yellow-500 mt-1 flex-shrink-0" />
                        <p className="text-white text-sm sm:text-base leading-relaxed">
                          Join us for an exclusive masquerade dinner where elegance meets intrigue. 
                          Don your finest mask and step into a world of sophisticated networking, 
                          where connections are made through whispered conversations and stolen glances.
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <HeartIcon className="size-5 text-yellow-500 mt-1 flex-shrink-0" />
                        <p className="text-yellow-300/90 text-sm sm:text-base leading-relaxed italic" style={{fontFamily: 'serif'}}>
                          "In the candlelit halls of The Boma Hotel, where every glance holds a promise 
                          and every smile tells a story, discover the magic of meaningful connections 
                          in the most enchanting setting."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Masquerade Pricing & Payment Card */}
                <div className="bg-gradient-to-br from-purple-900/40 via-red-900/30 to-black/50 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-yellow-500/30 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <GemIcon className="size-5 text-yellow-500 animate-pulse" />
                      <h3 className="text-white font-bold text-lg sm:text-xl tracking-wide">Your Invitation to the Masquerade</h3>
                      <GemIcon className="size-5 text-yellow-500 animate-pulse" />
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-3xl sm:text-4xl font-black text-yellow-500 mb-2">Ksh. 4,999</div>
                      <div className="text-yellow-400 text-base sm:text-lg font-semibold">Exclusive Entry Fee</div>
                      <p className="text-yellow-300/80 text-sm mt-2 italic">
                        Secure your place with as low as Ksh. 1,000 and complete your payment later
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl border border-yellow-500/50 hover:border-yellow-400/70 transition-all duration-300">
                      <div className="text-yellow-400 font-bold mb-2 text-sm tracking-wide">M-Pesa Paybill</div>
                      <div className="text-xl sm:text-2xl font-black text-white">7171186</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl border border-yellow-500/50 hover:border-yellow-400/70 transition-all duration-300">
                      <div className="text-yellow-400 font-bold mb-2 text-sm tracking-wide">Account</div>
                      <div className="text-xl sm:text-2xl font-black text-white">DINNER</div>
                    </div>
                  </div>

                  {/* Masquerade Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center group">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <UserCheckIcon className="size-4 text-yellow-500" />
                        <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest group-hover:text-yellow-300 transition-colors duration-300">
                          New Masquerade Entry
                        </p>
                      </div>
                      <div className="transform group-hover:scale-105 transition-transform duration-300">
                        <PurchaseTicketDialog />
                      </div>
                    </div>
                    <div className="text-center group">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <CrownIcon className="size-4 text-yellow-500" />
                        <p className="text-yellow-400 text-sm font-bold uppercase tracking-widest group-hover:text-yellow-300 transition-colors duration-300">
                          Complete Your Invitation
                        </p>
                      </div>
                      <div className="transform group-hover:scale-105 transition-transform duration-300">
                        <ManageTicketDialog />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Masquerade Event Details */}
                <div className="bg-gradient-to-br from-purple-900/40 via-red-900/30 to-black/50 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-yellow-500/30 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <FlameIcon className="size-5 text-yellow-500" />
                      <h3 className="text-white font-bold text-lg sm:text-xl tracking-wide">The Masquerade Details</h3>
                      <FlameIcon className="size-5 text-yellow-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 rounded-xl border border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300 group">
                      <div className="bg-yellow-500/25 p-2 rounded-full group-hover:bg-yellow-500/35 transition-colors duration-300">
                        <CalendarIcon className="size-5 text-yellow-500" />
                      </div>
                      <div>
                        <div className="font-bold text-yellow-400 text-sm tracking-wide">Date & Time</div>
                        <div className="text-yellow-300/90 text-sm">Oct 31, 2025 • 6:00 PM - 12:00 AM</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 rounded-xl border border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300 group">
                      <div className="bg-yellow-500/25 p-2 rounded-full group-hover:bg-yellow-500/35 transition-colors duration-300">
                        <MapPinIcon className="size-5 text-yellow-500" />
                      </div>
                      <div>
                        <div className="font-bold text-yellow-400 text-sm tracking-wide">Venue</div>
                        <div className="text-yellow-300/90 text-sm">The Boma Hotel, South C</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 rounded-xl border border-yellow-500/40 mb-4 hover:border-yellow-400/60 transition-all duration-300 group">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <UsersIcon className="size-4 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                      <span className="font-bold text-yellow-400 text-sm tracking-wide group-hover:text-yellow-300 transition-colors duration-300">Open to All</span>
                    </div>
                    <p className="text-yellow-300/90 text-sm italic">Even those from outside OLQP are welcome to join our masquerade!</p>
                  </div>

                  <div className="text-center p-4 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 rounded-xl border border-yellow-500/40 hover:border-yellow-400/60 transition-all duration-300 group">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <PhoneIcon className="size-4 text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" />
                      <span className="font-bold text-yellow-400 text-sm tracking-wide group-hover:text-yellow-300 transition-colors duration-300">Contact Us</span>
                    </div>
                    <a 
                      href="tel:+254717186600" 
                      className="text-yellow-500 font-black text-lg group-hover:text-yellow-400 transition-colors duration-300 hover:underline cursor-pointer"
                    >
                      0717186600
                    </a>
                    <p className="text-yellow-300/90 text-sm mt-1 italic">For inquiries and support</p>
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
