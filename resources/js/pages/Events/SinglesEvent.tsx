import { Head } from '@inertiajs/react'
import { CalendarIcon, HeartIcon, WineIcon, UtensilsIcon, MapPinIcon, ClockIcon, TrophyIcon, MusicIcon, PhoneIcon, UsersIcon } from 'lucide-react'
import CountdownTimer from '@/components/countdown-timer'
import PurchaseTicketDialog from '@/components/events/purchase-ticket-dialog'
import ManageTicketDialog from '@/components/events/manage-ticket-dialog'

export default function SinglesEvent() {
  return (
    <>
      <Head title="OLQP Singles Dinner 2025" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Background Image Overlay */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/70 to-slate-900/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h2 className="text-lg font-semibold">OLQP PARISH</h2>
                </div>
                
                {/* Countdown Timer */}
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                    <CountdownTimer targetDate="2025-10-31T18:00:00" />
                  </div>
                  <div className="text-white text-center">
                    <div className="text-sm font-medium">October 31, 2025</div>
                    <div className="text-xs text-white/80">6:00 PM - 12:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-6 py-8">
            <div className="max-w-6xl w-full">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                
                {/* Left Column - Main Content */}
                <div className="space-y-6">
                  {/* Hero Title */}
                  <div className="text-center lg:text-left">
                    <p className="text-white/90 text-sm mb-3 font-medium">Welcome to the </p>
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                      <h1 className="text-4xl lg:text-4xl font-bold text-white">
                        OLQP SINGLES DINNER 2025
                      </h1>
                    </div>
                    <p className="text-xl text-white/90 mb-6 leading-relaxed">
                      An evening of connection, fine dining, and unforgettable memories. 
                      Open to all singles looking for meaningful connections.
                    </p>
                  </div>

                  {/* Pricing & Payment */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <h3 className="text-white font-semibold text-lg mb-3 text-center">Payment Details</h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center">
                        <div className="text-xl font-bold text-cyan-400">Ksh.4,999</div>
                        <div className="text-white/80 text-sm">Registration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-amber-400">Ksh.1,000</div>
                        <div className="text-white/80 text-sm">Booking Fee</div>
                      </div>
                    </div>
                    <div className="text-center text-white/90 text-sm">
                      <div className="mb-2 p-2 bg-white/20 rounded-lg border border-white/30">
                        <div className="text-cyan-300 font-semibold mb-1 text-xs">M-Pesa Paybill</div>
                        <div className="text-lg font-bold text-white">7171186</div>
                      </div>
                      <div className="p-2 bg-white/20 rounded-lg border border-white/30">
                        <div className="text-amber-300 font-semibold mb-1 text-xs">Account</div>
                        <div className="text-lg font-bold text-white">DINNER</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Made More Prominent */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-white/90 text-sm mb-3 font-medium">Paid for a new ticket?</p>
                      <PurchaseTicketDialog />
                    </div>
                    <div className="text-center">
                      <p className="text-white/90 text-sm mb-3 font-medium">Topped up existing ticket?</p>
                      <ManageTicketDialog />
                    </div>
                  </div>
                </div>

                {/* Right Column - Event Info Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/30">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      <CalendarIcon className="size-4" />
                      Event Information
                    </div>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <CalendarIcon className="size-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Date & Time</div>
                        <div className="text-gray-600">Oct 31, 2025 • 6:00 PM - 12:00 AM</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
                      <div className="bg-cyan-100 p-2 rounded-full">
                        <MapPinIcon className="size-5 text-cyan-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Venue</div>
                        <div className="text-gray-600">The Edge, South C</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <TrophyIcon className="size-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">Highlights</div>
                        <div className="text-gray-600">Networking • Fine Dining • Entertainment</div>
                      </div>
                    </div>
                  </div>

                  {/* Open to All Information */}
                  <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <UsersIcon className="size-4 text-green-600" />
                      <span className="font-semibold text-gray-800">Open to All</span>
                    </div>
                    <p className="text-gray-600 text-sm">Even those from outside OLQP are welcome to join us!</p>
                  </div>

                  {/* Contact Info */}
                  <div className="text-center p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <PhoneIcon className="size-4 text-rose-600" />
                      <span className="font-semibold text-gray-800">Contact Us</span>
                    </div>
                    <div className="text-rose-600 font-bold text-lg">0777111000</div>
                    <p className="text-gray-600 text-sm mt-1">For inquiries and support</p>
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
