import { Head } from '@inertiajs/react'
import { FileText, Users, CreditCard, Shield, AlertTriangle, Phone, Mail, Calendar, MapPin, CheckCircle, XCircle } from 'lucide-react'

export default function TermsOfService() {
  return (
    <>
      <Head title="Terms of Service - OLQP Singles Dinner 2025" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">OLQP Singles Dinner 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            
            {/* Last Updated */}
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to the OLQP (Our Lady Queen of Peace) Singles Dinner 2025 event platform. These Terms of Service 
                ("Terms") govern your use of our event registration and management system. By accessing or using our services, 
                you agree to be bound by these Terms.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Acceptance of Terms
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  By using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms. 
                  If you do not agree to these Terms, please do not use our services.
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Important:</strong> These Terms constitute a legally binding agreement between you and OLQP Parish. 
                    Please read them carefully before proceeding with event registration.
                  </p>
                </div>
              </div>
            </section>

            {/* Event Registration */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Event Registration
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Registration Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-purple-800 dark:text-purple-200">
                      <li>Provide accurate and complete information</li>
                      <li>Be at least 18 years of age</li>
                      <li>Have a valid email address and phone number</li>
                      <li>Agree to event terms and conditions</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Registration Process</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-purple-800 dark:text-purple-200">
                      <li>Complete registration form with valid information</li>
                      <li>Make payment through approved methods</li>
                      <li>Receive confirmation and event details</li>
                      <li>Present valid ID at event entrance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-orange-600" />
                Payment Terms
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Payment Methods</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-orange-800 dark:text-orange-200">
                        <li>M-Pesa mobile money transfers</li>
                        <li>Bank transfers (subject to approval)</li>
                        <li>Cash payments (at designated locations)</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Payment Schedule</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-orange-800 dark:text-orange-200">
                        <li>Individual tickets: Ksh. 4,999 (full payment or installments)</li>
                        <li>Group tickets: Ksh. 22,500 (must be paid in full)</li>
                        <li>Minimum installment: Ksh. 1,000</li>
                        <li>Final payment due: October 24th, 2025</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Refund Policy</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-orange-800 dark:text-orange-200">
                        <li>Full refunds available until October 15th, 2025</li>
                        <li>Partial refunds (50%) until October 20th, 2025</li>
                        <li>No refunds after October 20th, 2025</li>
                        <li>Processing fees may apply to refunds</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <h3 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Payment Security</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-orange-800 dark:text-orange-200">
                        <li>All transactions are encrypted and secure</li>
                        <li>Payment information is not stored on our servers</li>
                        <li>M-Pesa codes are verified before confirmation</li>
                        <li>Fraudulent payments will be rejected</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Event Terms */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                Event Terms
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                    <h3 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">Event Details</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-indigo-800 dark:text-indigo-200">
                      <li>Date: December 7th, 2025</li>
                      <li>Time: 6:00 PM - 12:00 AM</li>
                      <li>Venue: The Boma Hotel, South C</li>
                      <li>Dress Code: Masquerade attire required</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                    <h3 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">Entry Requirements</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-indigo-800 dark:text-indigo-200">
                      <li>Valid event ticket (digital or printed)</li>
                      <li>Government-issued photo ID</li>
                      <li>Age verification (18+ years)</li>
                      <li>Compliance with dress code</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                User Conduct
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                      <h3 className="font-medium text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Acceptable Behavior
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-green-800 dark:text-green-200">
                        <li>Respectful interaction with all attendees</li>
                        <li>Compliance with venue rules and regulations</li>
                        <li>Appropriate dress code adherence</li>
                        <li>Respectful use of event facilities</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                      <h3 className="font-medium text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        Prohibited Behavior
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-red-800 dark:text-red-200">
                        <li>Harassment or inappropriate conduct</li>
                        <li>Disruptive or violent behavior</li>
                        <li>Unauthorized photography or recording</li>
                        <li>Alcohol or substance abuse</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Liability and Disclaimers */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Liability and Disclaimers
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Event Liability</h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    OLQP Parish and event organizers are not liable for any personal injury, property damage, or loss 
                    incurred during the event. Attendees participate at their own risk and are responsible for their 
                    personal belongings and safety.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Force Majeure</h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    In case of events beyond our control (natural disasters, government restrictions, health emergencies), 
                    we reserve the right to cancel, postpone, or modify the event. Refunds will be provided according to 
                    our refund policy.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Service Availability</h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    We strive to maintain service availability but do not guarantee uninterrupted access to our platform. 
                    We are not liable for any technical issues, downtime, or data loss.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy and Data */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-600" />
                Privacy and Data Protection
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Your privacy is important to us. Our collection, use, and protection of your personal information 
                  is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                </p>
                
                <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-lg">
                  <h3 className="font-medium text-teal-900 dark:text-teal-100 mb-2">Data Usage</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-teal-800 dark:text-teal-200">
                    <li>Personal information is used solely for event management</li>
                    <li>Payment information is processed securely</li>
                    <li>Communication data is used for event updates</li>
                    <li>No personal data is sold to third parties</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Modifications and Termination */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Modifications and Termination</h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Terms Modifications</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      We reserve the right to modify these Terms at any time. Changes will be posted on our website 
                      and will take effect immediately. Continued use of our services constitutes acceptance of modified Terms.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Service Termination</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      We may suspend or terminate your access to our services for violation of these Terms, 
                      fraudulent activity, or other reasons at our discretion.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                Contact Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Support
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      olqpsouthbsecretary@gmail.com
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Support
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      0712328325
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Office Address
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      OLQP Parish<br />
                      South B, Nairobi, Kenya
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Support Hours
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of Kenya. Any disputes arising 
                from these Terms or your use of our services will be subject to the exclusive jurisdiction of the 
                courts of Kenya.
              </p>
            </section>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These Terms of Service are effective as of {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} and apply to all users of the OLQP Singles Dinner 2025 event platform.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                  © 2025 OLQP Parish. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
