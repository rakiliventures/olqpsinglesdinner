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
import { useMemo, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, CreditCard, User, Calendar, Phone, Mail } from 'lucide-react'
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
  status: 'pending' | 'confirmed' | 'failed'
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
    amount: 0
  })

  const validAttendeeId = useMemo(() => /^\d+$/.test(attendeeId), [attendeeId])
  const validMpesaCode = useMemo(() => mpesaCode.trim().length >= 6, [mpesaCode])

  const totalConfirmedPayments = attendee?.payments
    ?.filter(p => p.status === 'confirmed')
    ?.reduce((sum, p) => sum + p.amount, 0) || 0

  const totalPendingPayments = attendee?.payments
    ?.filter(p => p.status === 'pending')
    ?.reduce((sum, p) => sum + p.amount, 0) || 0

  const canAddPayment = totalConfirmedPayments < 4999

  async function handleFindAttendee(e: React.FormEvent) {
    e.preventDefault()
    if (!validAttendeeId) return

    setIsLoading(true)
    setError('')

    try {
      // In a real app, this would be an API call
      // For now, we'll simulate finding an attendee
      const mockAttendee: Attendee = {
        id: parseInt(attendeeId),
        name: "John Doe",
        email: "john@example.com",
        whatsapp: "+254700000000",
        gender: "Male",
        is_olqp_member: true,
        created_at: "2025-01-15T10:00:00Z",
        payments: [
          {
            id: 1,
            amount: 2000,
            mpesa_code: "ABC123",
            status: "confirmed",
            method: "mpesa",
            created_at: "2025-01-15T10:30:00Z"
          },
          {
            id: 2,
            amount: 1500,
            mpesa_code: "DEF456",
            status: "pending",
            method: "mpesa",
            created_at: "2025-01-15T11:00:00Z"
          }
        ]
      }

      setAttendee(mockAttendee)
    } catch (err) {
      setError('Attendee not found. Please check the ID and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validMpesaCode || !form.data.amount || !attendee) {
      return
    }

    form.setData('mpesa_code', mpesaCode)
    form.setData('attendee_id', attendee.id.toString())
    form.setData('amount', form.data.amount)

    // In a real app, this would submit to the backend
    form.post(route('admin.payments.store'), {
      onSuccess: () => {
        // Redirect to home page after successful payment
        window.location.href = '/'
      },
      onError: (errors) => {
        console.error('Payment submission errors:', errors)
        toast({
          title: 'Error adding payment',
          description: 'Please try again or contact support.',
          variant: 'destructive',
        })
      },
    })
  }

  function handleClose() {
    setOpen(false)
    setAttendeeId('')
    setAttendee(null)
    setMpesaCode('')
    setError('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-w-48 h-12 text-lg font-semibold text-black">
          Update/View Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Your Ticket</DialogTitle>
          <DialogDescription>
            Enter your attendee ID to view ticket details and manage payments.
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
                value={attendeeId}
                onChange={(e) => setAttendeeId(e.target.value)}
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
              <Button type="submit" size="sm" disabled={!validAttendeeId || isLoading}>
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
                      Ksh. {(4999 - totalConfirmedPayments).toLocaleString()}
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
                  </div>
                ) : (
                  <div className="text-center p-2 bg-yellow-50 rounded text-xs">
                    <XCircle className="size-4 text-yellow-600 mx-auto mb-1" />
                    <p className="text-yellow-800 font-medium">Payment Incomplete</p>
                    <p className="text-yellow-600">
                      You need Ksh. {(4999 - totalConfirmedPayments).toLocaleString()} more.
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
                        onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                        placeholder="Enter your M-Pesa transaction code"
                        className="h-7 text-xs"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Enter the transaction code from your M-Pesa payment confirmation.
                      </p>
                    </div>

                    <div className="grid gap-1">
                      <Label htmlFor="payment-amount" className="text-xs">Payment Amount (Ksh.)</Label>
                      <Input
                        id="payment-amount"
                        type="number"
                        value={form.data.amount || ''}
                        onChange={(e) => form.setData('amount', parseFloat(e.target.value) || 0)}
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
                      <Button type="submit" size="sm" disabled={!validMpesaCode || !form.data.amount || form.processing}>
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
