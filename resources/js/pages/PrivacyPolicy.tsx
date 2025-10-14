import { Head } from '@inertiajs/react'
import { Shield, Lock, Eye, Database, Users, Mail, Phone, Calendar, MapPin } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <>
      <Head title="Privacy Policy - OLQP Singles Dinner 2025" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">OLQP Singles Dinner 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            
            {/* Last Updated */}
            <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
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
                <Lock className="h-5 w-5 text-blue-600" />
                Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                At OLQP (Our Lady Queen of Peace) Parish, we are committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you register 
                for and participate in the OLQP Singles Dinner 2025 event.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Information We Collect
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Personal Information</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    When you register for the event, we collect the following information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>WhatsApp phone number</li>
                    <li>Gender</li>
                    <li>OLQP membership status</li>
                    <li>Payment information (M-Pesa transaction codes and amounts)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Event Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                    <li>Event attendance records</li>
                    <li>Payment history and status</li>
                    <li>Communication preferences</li>
                    <li>Ticket information and QR codes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                How We Use Your Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Event Management</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>Process your event registration</li>
                      <li>Generate and send event tickets</li>
                      <li>Manage event attendance</li>
                      <li>Process payments and refunds</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Communication</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>Send event updates and reminders</li>
                      <li>Confirm payments and registrations</li>
                      <li>Provide customer support</li>
                      <li>Send important event information</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Analytics & Improvement</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>Analyze event attendance patterns</li>
                      <li>Improve our services</li>
                      <li>Generate event reports</li>
                      <li>Ensure event security</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Legal Compliance</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>Comply with applicable laws</li>
                      <li>Protect against fraud</li>
                      <li>Maintain event records</li>
                      <li>Respond to legal requests</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                Information Sharing
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Service Providers</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        With trusted third-party service providers who assist us in operating our website, 
                        processing payments, or sending communications (such as email and WhatsApp services).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Legal Requirements</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        When required by law or to protect our rights, property, or safety, or that of our users or the public.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Consent</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        When you have given us explicit consent to share your information for specific purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Data Security
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                    <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">Security Measures</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-green-800 dark:text-green-200">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure database storage</li>
                      <li>Regular security updates</li>
                      <li>Access controls and authentication</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Data Protection</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      <li>Limited access to personal information</li>
                      <li>Regular data backups</li>
                      <li>Secure payment processing</li>
                      <li>Privacy by design principles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Your Rights
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                  <h3 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">Access & Correction</h3>
                  <p className="text-sm text-indigo-800 dark:text-indigo-200">
                    You have the right to access, update, or correct your personal information at any time.
                  </p>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                  <h3 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">Data Portability</h3>
                  <p className="text-sm text-indigo-800 dark:text-indigo-200">
                    You can request a copy of your personal data in a structured, machine-readable format.
                  </p>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                  <h3 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">Deletion</h3>
                  <p className="text-sm text-indigo-800 dark:text-indigo-200">
                    You can request deletion of your personal information, subject to legal and operational requirements.
                  </p>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                  <h3 className="font-medium text-indigo-900 dark:text-indigo-100 mb-2">Opt-out</h3>
                  <p className="text-sm text-indigo-800 dark:text-indigo-200">
                    You can opt-out of non-essential communications while maintaining essential event updates.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-teal-600" />
                Contact Us
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-lg">
                    <h3 className="font-medium text-teal-900 dark:text-teal-100 mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </h3>
                    <p className="text-sm text-teal-800 dark:text-teal-200">
                      olqpsouthbsecretary@gmail.com
                    </p>
                  </div>
                  
                  <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-lg">
                    <h3 className="font-medium text-teal-900 dark:text-teal-100 mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </h3>
                    <p className="text-sm text-teal-800 dark:text-teal-200">
                      0712328325
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-lg">
                    <h3 className="font-medium text-teal-900 dark:text-teal-100 mb-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </h3>
                    <p className="text-sm text-teal-800 dark:text-teal-200">
                      OLQP Parish<br />
                      South B, Nairobi, Kenya
                    </p>
                  </div>
                  
                  <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-lg">
                    <h3 className="font-medium text-teal-900 dark:text-teal-100 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Response Time
                    </h3>
                    <p className="text-sm text-teal-800 dark:text-teal-200">
                      We respond to privacy inquiries within 48 hours
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, 
                legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy 
                on our website and updating the "Last Updated" date. Your continued use of our services after such changes 
                constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This Privacy Policy is effective as of {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} and applies to all information collected by OLQP Parish in connection with the Singles Dinner 2025 event.
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
