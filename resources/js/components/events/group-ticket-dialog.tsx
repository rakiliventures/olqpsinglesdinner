import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
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
import InputError from '@/components/input-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'
import { useForm } from '@inertiajs/react'
import { useEffect, useMemo, useState } from 'react'
import { Users, UserPlus } from 'lucide-react'

interface AttendeeData {
  name: string
  email: string
  whatsapp: string
  gender: string
  is_olqp_member: string
}

export default function GroupTicketDialog({ eventId }: { eventId?: number }) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    event_id: eventId ?? null as unknown as number | null,
    amount: '22500',
    mpesa_code: '',
    attendees: [
      { name: '', email: '', whatsapp: '', gender: '', is_olqp_member: '' },
      { name: '', email: '', whatsapp: '', gender: '', is_olqp_member: '' },
      { name: '', email: '', whatsapp: '', gender: '', is_olqp_member: '' },
      { name: '', email: '', whatsapp: '', gender: '', is_olqp_member: '' },
      { name: '', email: '', whatsapp: '', gender: '', is_olqp_member: '' },
    ] as AttendeeData[],
  })

  const numericAmount = useMemo(() => {
    const n = Number(form.data.amount)
    return Number.isFinite(n) ? n : 0
  }, [form.data.amount])

  // M-Pesa code validation
  const mpesaCodeValidation = useMemo(() => {
    const code = form.data.mpesa_code
    if (!code) return { isValid: false, message: '' }
    
    // Check if contains only letters and digits
    const isValidFormat = /^[A-Z0-9]+$/.test(code)
    if (!isValidFormat) {
      return { 
        isValid: false, 
        message: 'M-Pesa code should only contain letters and numbers' 
      }
    }
    
    // Check minimum length
    if (code.length < 6) {
      return { 
        isValid: false, 
        message: 'M-Pesa code should be at least 6 characters' 
      }
    }
    
    // Check maximum length
    if (code.length > 20) {
      return { 
        isValid: false, 
        message: 'M-Pesa code should not exceed 20 characters' 
      }
    }
    
    return { isValid: true, message: '' }
  }, [form.data.mpesa_code])

  // Validate all attendees are filled
  const allAttendeesFilled = useMemo(() => {
    return form.data.attendees.every(attendee => 
      attendee.name.trim() !== '' && 
      attendee.email.trim() !== '' && 
      attendee.whatsapp.trim() !== '' && 
      attendee.gender !== '' && 
      attendee.is_olqp_member !== ''
    )
  }, [form.data.attendees])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Validate M-Pesa code before submission
    if (!mpesaCodeValidation.isValid) {
      toast({ 
        title: 'Validation Error', 
        description: mpesaCodeValidation.message,
        variant: 'destructive'
      })
      return
    }

    // Validate all attendees are filled
    if (!allAttendeesFilled) {
      toast({ 
        title: 'Validation Error', 
        description: 'All 5 attendees must be completely filled out',
        variant: 'destructive'
      })
      return
    }

    form.transform((data) => ({
      ...data,
      amount: Number(data.amount),
      attendees: data.attendees.map(attendee => ({
        ...attendee,
        is_olqp_member: attendee.is_olqp_member === 'yes',
      }))
    }))
    form.post(route('singles-event.purchase-group-ticket'), {
      onSuccess: () => {
        setOpen(false)
        form.reset()
        toast({
          title: 'Success',
          description: 'Group ticket registered successfully!',
        })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to register group ticket. Please try again.',
          variant: 'destructive',
        })
      },
    })
  }

  function handleMpesaCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toUpperCase()
    // Only allow letters and digits
    const sanitizedValue = value.replace(/[^A-Z0-9]/g, '')
    form.setData('mpesa_code', sanitizedValue)
  }

  function handleAttendeeChange(index: number, field: keyof AttendeeData, value: string) {
    const newAttendees = [...form.data.attendees]
    newAttendees[index] = { ...newAttendees[index], [field]: value }
    form.setData('attendees', newAttendees)
  }

  function handleClose() {
    setOpen(false)
    form.reset()
  }

  // Keep badge reactive as user types amount
  useEffect(() => {}, [numericAmount])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:min-w-48 h-12 sm:h-14 text-sm sm:text-lg font-medium bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-green-400 rounded-full">
          <Users className="w-4 h-4 mr-2" />
          Group Ticket (5 Pax)
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Group Ticket Registration (5 People)
          </DialogTitle>
          <DialogDescription className="text-sm">
            Register 5 people for the discounted group rate of Ksh. 22,500 (Ksh. 4,500 per person).
          </DialogDescription>
        </DialogHeader>

        <Alert className="mb-4 bg-green-100 text-green-800">
          <AlertDescription className="text-sm">
            <p className="mb-1">PayBill: <strong>7171186</strong></p>
            <p>Account: <strong>DINNER</strong></p>
            <p className="mt-2 font-semibold">Group Rate: Ksh. 22,500 for 5 people (Ksh. 4,500 per person)</p>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Payment Information */}
          <div className="grid gap-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Payment Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount Paid (Ksh.)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={form.data.amount}
                  onChange={(e) => form.setData('amount', e.target.value)}
                  placeholder="22500"
                  className="text-lg font-semibold"
                />
                <InputError message={form.errors.amount} className="mt-1" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mpesa_code">M-Pesa Code</Label>
                <Input
                  id="mpesa_code"
                  type="text"
                  value={form.data.mpesa_code}
                  onChange={handleMpesaCodeChange}
                  placeholder="Enter M-Pesa code"
                  className="uppercase"
                />
                <InputError message={form.errors.mpesa_code} className="mt-1" />
                {!mpesaCodeValidation.isValid && form.data.mpesa_code && (
                  <p className="text-sm text-red-600">{mpesaCodeValidation.message}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Badge 
                variant={numericAmount === 22500 ? "default" : "destructive"}
                className="text-lg px-4 py-2"
              >
                {numericAmount === 22500 ? '✓ Correct Amount' : `Amount: Ksh. ${numericAmount.toLocaleString()}`}
              </Badge>
            </div>
          </div>

          {/* Attendees Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Attendees Information (5 People Required)</h3>
            
            {form.data.attendees.map((attendee, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                <h4 className="font-medium text-gray-700 mb-3">Person {index + 1}</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Full Name</Label>
                    <Input
                      id={`name-${index}`}
                      type="text"
                      value={attendee.name}
                      onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                      placeholder="Enter full name"
                    />
                    <InputError message={form.errors[`attendees.${index}.name`]} className="mt-1" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      type="email"
                      value={attendee.email}
                      onChange={(e) => handleAttendeeChange(index, 'email', e.target.value)}
                      placeholder="Enter email address"
                    />
                    <InputError message={form.errors[`attendees.${index}.email`]} className="mt-1" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`whatsapp-${index}`}>WhatsApp Number</Label>
                    <Input
                      id={`whatsapp-${index}`}
                      type="tel"
                      value={attendee.whatsapp}
                      onChange={(e) => handleAttendeeChange(index, 'whatsapp', e.target.value)}
                      placeholder="Enter WhatsApp number"
                    />
                    <InputError message={form.errors[`attendees.${index}.whatsapp`]} className="mt-1" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gender-${index}`}>Gender</Label>
                    <Select
                      value={attendee.gender}
                      onValueChange={(value) => handleAttendeeChange(index, 'gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={form.errors[`attendees.${index}.gender`]} className="mt-1" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`olqp-${index}`}>OLQP Member</Label>
                    <Select
                      value={attendee.is_olqp_member}
                      onValueChange={(value) => handleAttendeeChange(index, 'is_olqp_member', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Are you an OLQP member?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={form.errors[`attendees.${index}.is_olqp_member`]} className="mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.processing || !allAttendeesFilled || !mpesaCodeValidation.isValid}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
            >
              {form.processing ? 'Registering Group...' : 'Register Group Ticket'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
