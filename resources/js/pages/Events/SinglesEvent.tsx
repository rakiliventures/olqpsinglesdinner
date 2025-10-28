import { Head } from '@inertiajs/react'
import { CalendarIcon, HeartIcon, WineIcon, UtensilsIcon, MapPinIcon, ClockIcon, TrophyIcon, MusicIcon, PhoneIcon, UsersIcon, StarIcon, SparklesIcon, CrownIcon, UserCheckIcon, MoonIcon, FlameIcon, GemIcon } from 'lucide-react'
import CountdownTimer from '@/components/countdown-timer'
import PurchaseTicketDialog from '@/components/events/purchase-ticket-dialog'
import ManageTicketDialog from '@/components/events/manage-ticket-dialog'
import GroupTicketDialog from '@/components/events/group-ticket-dialog'

export default function SinglesEvent() {
  return (
    <>
      <Head title="OLQP Singles Dinner 2025" />
      
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
        {/* Masquerade Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/mobile_bg1.png')] sm:bg-[url('/images/bg7.png')] bg-cover bg-center bg-fixed"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-gray-900/60 to-gray-800/40"></div>
          
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
          <header className="bg-gradient-to-r from-black/90 via-gray-900/80 to-gray-800/70 backdrop-blur-2xl border-b border-yellow-500/40 shadow-2xl">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1.5 sm:py-3 border-2 border-gray-300 shadow-lg">
                      <img 
                        src="/images/logo.png" 
                        alt="OLQP Parish Logo" 
                        className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Masquerade Countdown Timer */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-lg rounded-full px-3 sm:px-5 py-2 sm:py-3 border border-yellow-500/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CountdownTimer targetDate="2025-10-31T18:00:00" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-bold text-yellow-500 flex items-center gap-1">
                      October 31, 2025
                    </div>
                    <div className="text-xs text-yellow-400/90">6:00 PM - 12:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-3 sm:px-4 py-4 sm:py-8">
            <div className="max-w-6xl w-full">
              <div className="text-center space-y-4 sm:space-y-8">
                
                {/* Masquerade Welcome Story */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Parish Welcome and Event Title */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Parish Welcome - Paragraph Style */}
                    <div className="text-center mb-4 sm:mb-6">
                      <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium mb-1 sm:mb-2 px-2">
                        Our Lady Queen of Peace Catholic Parish, South B
                      </p>
                      <p className="text-xs sm:text-sm text-yellow-400 font-serif italic px-2">
                        welcomes you to the
                      </p>
                    </div>
                    
                    {/* Masquerade Singles Dinner - Enhanced */}
                    <div className="text-center mb-6 sm:mb-8">
                      
                      <div className="text-center px-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-wider drop-shadow-2xl leading-tight">
                          <span className="block sm:inline">MASQUERADE</span> <span className="block sm:inline text-yellow-500 font-serif italic">SINGLES DINNER</span>
                        </h1>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-2">
                      <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent flex-1"></div>
                      <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-yellow-500/40 opacity-80">
                        <p className="text-yellow-500 text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase">At The Boma Hotel, South C</p>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent flex-1"></div>
                    </div>
                  </div>

                  {/* Masquerade Story */}
                  <div className="text-center px-2">
                    <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
                      Come enjoy a wonderful evening of fun, networking and great experiences
                    </p>
                  </div>
                </div>

                {/* Masquerade Pricing & Payment Card */}
                <div className="bg-gradient-to-br from-black/40 via-gray-900/30 to-gray-800/25 backdrop-blur-lg rounded-xl p-3 sm:p-4 md:p-6 border border-yellow-500/40 shadow-2xl mx-2 sm:mx-0">
                  <div className="text-center mb-3 sm:mb-4">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                      <GemIcon className="size-3 sm:size-4 text-yellow-500 animate-pulse" />
                      <h3 className="text-gray-200 font-medium text-xs sm:text-sm md:text-base tracking-wide">Your Invitation to the Masquerade</h3>
                      <GemIcon className="size-3 sm:size-4 text-yellow-500 animate-pulse" />
                    </div>
                    
                    {/* Pricing Options - Side by Side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3">
                      {/* Individual Ticket */}
                      <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-yellow-500/50 hover:border-yellow-400/70 transition-all duration-300">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                            <UserCheckIcon className="size-3 sm:size-4 text-yellow-500" />
                            <h4 className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-widest">Individual Ticket</h4>
                          </div>
                          <div className="text-lg sm:text-xl md:text-2xl font-black text-yellow-500 mb-1">Ksh. 4,999</div>
                          <div className="text-yellow-300/90 text-xs sm:text-sm font-semibold">Per Person</div>
      
                        </div>
                      </div>
                      
                      {/* Group Ticket */}
                      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-green-500/50 hover:border-green-400/70 transition-all duration-300">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2">
                            <UsersIcon className="size-3 sm:size-4 text-green-500" />
                            <h4 className="text-green-400 text-xs sm:text-sm font-bold uppercase tracking-widest">Group of 5</h4>
                          </div>
                          <div className="text-lg sm:text-xl md:text-2xl font-black text-green-500 mb-1">Ksh. 22,500</div>
                          <div className="text-green-300/90 text-xs sm:text-sm font-semibold">Ksh. 4,500 per person</div>
                          <p className="text-green-300/70 text-xs mt-1 italic">
                            Only when paid in full
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="p-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 opacity-75">
                      <div className="text-yellow-400/70 font-bold mb-1 text-xs tracking-wide">M-Pesa Paybill</div>
                      <div className="text-sm sm:text-base font-black text-white/80">7171186</div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 opacity-75">
                      <div className="text-yellow-400/70 font-bold mb-1 text-xs tracking-wide">Account</div>
                      <div className="text-sm sm:text-base font-black text-white/80">DINNER</div>
                    </div>
                  </div>

                  {/* Masquerade Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    <div className="text-center group">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <UserCheckIcon className="size-2.5 sm:size-3 text-yellow-500" />
                        <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest group-hover:text-yellow-300 transition-colors duration-300">
                          PAID FOR A NEW TICKET ?
                        </p>
                      </div>
                      <div className="transform group-hover:scale-105 transition-transform duration-300">
                        <PurchaseTicketDialog />
                      </div>
                    </div>
                    <div className="text-center group">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <CrownIcon className="size-2.5 sm:size-3 text-yellow-500" />
                        <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest group-hover:text-yellow-300 transition-colors duration-300">
                          PAID SUBSEQUENT INSTALLMENT?
                        </p>
                      </div>
                      <div className="transform group-hover:scale-105 transition-transform duration-300">
                        <ManageTicketDialog />
                      </div>
                    </div>
                    <div className="text-center group sm:col-span-2 lg:col-span-1">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <UsersIcon className="size-2.5 sm:size-3 text-green-500" />
                        <p className="text-green-400 text-xs font-bold uppercase tracking-widest group-hover:text-green-300 transition-colors duration-300">
                          GROUP TICKET (5 PAX)
                        </p>
                      </div>
                      <div className="transform group-hover:scale-105 transition-transform duration-300">
                        <GroupTicketDialog />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Masquerade Footer */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <UsersIcon className="size-3 sm:size-4 text-yellow-500" />
                      <span className="font-bold text-yellow-400 text-xs sm:text-sm tracking-wide">Open to All</span>
                    </div>
                    <p className="text-yellow-300/90 text-xs sm:text-sm italic">Even those from outside OLQP are welcome to join our masquerade!</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <PhoneIcon className="size-3 sm:size-4 text-yellow-500" />
                      <span className="font-bold text-yellow-400 text-xs sm:text-sm tracking-wide">Contact Us</span>
                    </div>
                    <a 
                      href="tel:+254712328325" 
                      className="text-yellow-500 font-black text-sm sm:text-lg hover:text-yellow-400 transition-colors duration-300 hover:underline cursor-pointer"
                    >
                      0712328325
                    </a>
                    <p className="text-yellow-300/90 text-xs sm:text-sm mt-1 italic">For inquiries and support</p>
                  </div>
                </div>

                {/* Legal Links */}
                <div className="mt-4 pt-3 border-t border-yellow-500/20">
                  <div className="text-center space-x-4">
                    <a 
                      href={route('privacy-policy')}
                      className="text-yellow-400/80 hover:text-yellow-300 text-xs sm:text-sm transition-colors duration-300 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    <span className="text-yellow-500/50">|</span>
                    <a 
                      href={route('terms-of-service')}
                      className="text-yellow-400/80 hover:text-yellow-300 text-xs sm:text-sm transition-colors duration-300 hover:underline"
                    >
                      Terms of Service
                    </a>
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
