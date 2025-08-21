import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMemo, useState, useEffect } from 'react'
import { useForm } from '@inertiajs/react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, CreditCard, User, Calendar, Phone, Mail, Download } from 'lucide-react'
import { useToast } from '@/components/ui/toast'

interface Attendee {
  id: number
  name: string
  email: string
  whatsapp: string
  gender: string
  is_olqp_member: boolean
  created_at: string
  payments: Payment[]
}

interface Payment {
  id: number
  amount: number
  mpesa_code: string
  status: string
  method: string
  created_at: string
}

export default function ManageTicketDialog() {
  const [open, setOpen] = useState(false)
  const [attendeeId, setAttendeeId] = useState('')
  const [attendee, setAttendee] = useState<Attendee | null>(null)
  const [mpesaCode, setMpesaCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()

  const form = useForm({
    mpesa_code: '',
    attendee_id: '',
    amount: 0 as number
  })

  const findAttendeeForm = useForm({
    attendee_id: ''
  })

  const validAttendeeId = useMemo(() => /^\d+$/.test(attendeeId), [attendeeId])
  const validMpesaCode = useMemo(() => {
    const code = mpesaCode.trim()
    if (!code) return false
    
    // Check minimum length
    if (code.length < 6) return false
    
    // Check maximum length
    if (code.length > 20) return false
    
    // Check if contains only letters and digits
    const isValidFormat = /^[A-Z0-9]+$/.test(code)
    if (!isValidFormat) return false
    
    return true
  }, [mpesaCode])

  const mpesaCodeError = useMemo(() => {
    const code = mpesaCode.trim()
    if (!code) return ''
    
    if (code.length < 6) {
      return 'M-Pesa code should be at least 6 characters'
    }
    
    if (code.length > 20) {
      return 'M-Pesa code should not exceed 20 characters'
    }
    
    if (!/^[A-Z0-9]+$/.test(code)) {
      return 'M-Pesa code should only contain letters and numbers'
    }
    
    return ''
  }, [mpesaCode])

  const totalConfirmedPayments = useMemo(() => {
    if (!attendee?.payments) return 0
    return attendee.payments
      .filter(p => p.status === 'confirmed')
      .reduce((sum, p) => sum + Number(p.amount), 0)
  }, [attendee?.payments])

  const totalPendingPayments = useMemo(() => {
    if (!attendee?.payments) return 0
    return attendee.payments
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + Number(p.amount), 0)
  }, [attendee?.payments])

  const remainingAmount = useMemo(() => {
    return Math.max(0, 4999 - totalConfirmedPayments)
  }, [totalConfirmedPayments])

  const canAddPayment = totalConfirmedPayments < 4999

  // Debug logging for payment calculations
  useEffect(() => {
    if (attendee) {
      console.log('Payment calculations:', {
        totalConfirmedPayments,
        totalPendingPayments,
        remainingAmount,
        canAddPayment,
        payments: attendee.payments
      })
    }
  }, [attendee, totalConfirmedPayments, totalPendingPayments, remainingAmount, canAddPayment])

  const handleDownloadTicket = async () => {
    if (!attendee) return
    
    try {
      // Create a temporary link and trigger download
      const link = document.createElement('a')
      link.href = route('singles-event.download-ticket', attendee.id)
      link.download = `OLQP_Singles_Dinner_2025_Ticket_${attendee.id}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast({
        title: 'Download Started',
        description: 'Your ticket PDF is being downloaded.',
        variant: 'default',
      })
    } catch (error) {
      console.error('Download error:', error)
      toast({
        title: 'Download Error',
        description: 'Failed to download ticket. Please try again.',
        variant: 'destructive',
      })
    }
  }

  async function handleFindAttendee(e: React.FormEvent) {
    e.preventDefault()
    
    if (!findAttendeeForm.data.attendee_id) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${route('singles-event.find-attendee')}?attendee_id=${findAttendeeForm.data.attendee_id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to find attendee')
      }

      console.log('Found attendee:', data.attendee)
      setAttendee(data.attendee)
    } catch (err) {
      console.log('Error:', err)
      setError(err instanceof Error ? err.message : 'Attendee not found. Please check the ID and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const amount = Number(form.data.amount)
    
    // Validate M-Pesa code
    if (!validMpesaCode) {
      toast({
        title: 'Validation Error',
        description: mpesaCodeError || 'Please enter a valid M-Pesa code.',
        variant: 'destructive',
      })
      return
    }
    
    if (!amount || amount <= 0 || !attendee) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid payment amount.',
        variant: 'destructive',
      })
      return
    }

    try {
      const response = await fetch(route('singles-event.add-payment'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          attendee_id: attendee.id,
          mpesa_code: mpesaCode,
          amount: amount
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add payment')
      }

      // Show success message
      toast({
        title: 'Payment Added Successfully',
        description: data.message,
        variant: 'default',
      })

      // Update attendee data with new payment
      setAttendee(data.attendee)
      
      // Reset form
      setMpesaCode('')
      form.setData('amount', 0)

      console.log('Payment added successfully:', data.attendee)
    } catch (err) {
      console.log('Payment error:', err)
      toast({
        title: 'Payment Error',
        description: err instanceof Error ? err.message : 'Failed to add payment. Please try again.',
        variant: 'destructive',
      })
    }
  }

  function handleClose() {
    setOpen(false)
    setAttendeeId('')
    setAttendee(null)
    setMpesaCode('')
    setError('')
    findAttendeeForm.reset()
  }

  // Handle M-Pesa code input with validation
  const handleMpesaCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()
    // Only allow letters and digits
    const sanitizedValue = value.replace(/[^A-Z0-9]/g, '')
    setMpesaCode(sanitizedValue)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-48 h-14 text-lg font-medium bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-slate-500 rounded-full">
          Update/View Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Your Ticket</DialogTitle>
          <DialogDescription>
            Enter your atten ID to view ticket details and manage payments.
          </DialogDescription>
        </DialogHeader>

        {!attendee ? (
          // Step 1: Enter Attendee ID
          <form onSubmit={handleFindAttendee} className="grid gap-2">
            <div className="grid gap-1">
              <Label htmlFor="attendee-id" className="text-xs">Event Ticket Number</Label>
              <Input
                id="attendee-id"
                type="text"
                value={findAttendeeForm.data.attendee_id}
                onChange={(e) => findAttendeeForm.setData('attendee_id', e.target.value)}
                placeholder="Enter your attendee ID number"
                className="h-8 text-xs"
                required
              />
              <p className="text-xs text-gray-500">
                This is the unique ID provided to you as your event ticket.
              </p>
            </div>

            {error && (
              <div className="text-xs text-red-600 bg-red-50 p-1.5 rounded text-center">
                {error}
              </div>
            )}

            <DialogFooter className="mt-1">
              <Button type="button" variant="outline" size="sm" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={!findAttendeeForm.data.attendee_id || isLoading}>
                {isLoading ? 'Finding...' : 'Find Ticket'}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          // Step 2: Display Attendee Details and Payments
          <div className="space-y-3">
            {/* Attendee Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-1 pt-2">
                <CardTitle className="flex items-center gap-1 text-sm">
                  <User className="size-3" />
                  Attendee Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium text-gray-600">Name:</span>
                    <p className="text-gray-900">{attendee.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <p className="text-gray-900">{attendee.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">WhatsApp:</span>
                    <p className="text-gray-900">{attendee.whatsapp}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Gender:</span>
                    <p className="text-gray-900">{attendee.gender}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">OLQP Member:</span>
                    <Badge variant={attendee.is_olqp_member ? "default" : "secondary"} className="text-xs px-1.5 py-0">
                      {attendee.is_olqp_member ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Registration Date:</span>
                    <p className="text-gray-900">
                      {new Date(attendee.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-1 pt-2">
                <CardTitle className="flex items-center gap-1 text-sm">
                  <CreditCard className="size-3" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="bg-green-50 p-1.5 rounded text-xs">
                    <div className="text-base font-bold text-green-600">
                      Ksh. {totalConfirmedPayments.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-700">Confirmed</div>
                  </div>
                  <div className="bg-yellow-50 p-1.5 rounded text-xs">
                    <div className="text-base font-bold text-yellow-600">
                      Ksh. {totalPendingPayments.toLocaleString()}
                    </div>
                    <div className="text-xs text-yellow-700">Pending</div>
                  </div>
                  <div className="bg-blue-50 p-1.5 rounded text-xs">
                    <div className="text-base font-bold text-blue-600">
                      Ksh. {remainingAmount.toLocaleString()}
                    </div>
                    <div className="text-xs text-blue-700">Remaining</div>
                  </div>
                </div>

                {/* Payment Status */}
                {totalConfirmedPayments >= 4999 ? (
                  <div className="text-center p-2 bg-green-50 rounded text-xs">
                    <CheckCircle className="size-4 text-green-600 mx-auto mb-1" />
                    <p className="text-green-800 font-medium">Payment Complete!</p>
                    <p className="text-green-600">Your ticket is fully paid and confirmed.</p>
                    
                    {/* Download Ticket Button */}
                    <div className="mt-3">
                      <Button
                        onClick={handleDownloadTicket}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 h-7"
                      >
                        <Download className="size-3 mr-1" />
                        Download Ticket PDF
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-2 bg-yellow-50 rounded text-xs">
                    <XCircle className="size-4 text-yellow-600 mx-auto mb-1" />
                    <p className="text-yellow-800 font-medium">Payment Incomplete</p>
                    <p className="text-yellow-600">
                      You need Ksh. {remainingAmount.toLocaleString()} more.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment History */}
            {attendee.payments && attendee.payments.length > 0 && (
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-1 pt-2">
                  <CardTitle className="text-sm">Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1.5">
                    {attendee.payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-1.5 bg-gray-50 rounded text-xs">
                        <div className="flex items-center gap-1.5">
                          <Badge variant={payment.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs px-1.5 py-0">
                            {payment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </Badge>
                          <div>
                            <p className="font-medium">Ksh. {payment.amount.toLocaleString()}</p>
                            <p className="text-gray-600">Code: {payment.mpesa_code}</p>
                          </div>
                        </div>
                        <div className="text-right text-gray-600">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add Payment Form */}
            {canAddPayment && (
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-1 pt-2">
                  <CardTitle className="text-sm">Add New Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddPayment} className="space-y-2">
                    <div className="grid gap-1">
                      <Label htmlFor="mpesa-code" className="text-xs">M-Pesa Transaction Code</Label>
                      <Input
                        id="mpesa-code"
                        value={mpesaCode}
                        onChange={handleMpesaCodeChange}
                        placeholder="Enter your M-Pesa transaction code"
                        className={`h-7 text-xs ${mpesaCodeError && mpesaCode ? 'border-red-500' : ''}`}
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Enter the transaction code from your M-Pesa payment confirmation.
                      </p>
                      {mpesaCodeError && mpesaCode && (
                        <p className="text-xs text-red-600">{mpesaCodeError}</p>
                      )}
                    </div>

                    <div className="grid gap-1">
                      <Label htmlFor="payment-amount" className="text-xs">Payment Amount (Ksh.)</Label>
                      <Input
                        id="payment-amount"
                        type="number"
                        value={form.data.amount || ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value)
                          form.setData('amount', isNaN(value) ? 0 : value)
                        }}
                        placeholder="Enter payment amount"
                        className="h-7 text-xs"
                        min="0"
                        step="0.01"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Enter the amount you paid via M-Pesa.
                      </p>
                    </div>

                    <div className="flex justify-end gap-1.5">
                      <Button type="button" variant="outline" size="sm" onClick={handleClose}>
                        Close
                      </Button>
                      <Button 
                        type="submit" 
                        size="sm" 
                        disabled={!validMpesaCode || !form.data.amount || form.processing}
                      >
                        {form.processing ? 'Adding...' : 'Add Payment'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Close Button */}
            {!canAddPayment && (
              <div className="flex justify-end">
                <Button size="sm" onClick={handleClose}>
                  Close
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
