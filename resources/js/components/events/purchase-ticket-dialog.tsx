import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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

export default function PurchaseTicketDialog({ eventId }: { eventId?: number }) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    event_id: eventId ?? null as unknown as number | null,
    name: '',
    gender: '',
    email: '',
    whatsapp: '',
    mpesa_code: '',
    is_olqp_member: '', // will convert to boolean before submit
    amount: '4999',
  })

  const numericAmount = useMemo(() => {
    const n = Number(form.data.amount)
    return Number.isFinite(n) ? n : 0
  }, [form.data.amount])

  const isFullPayment = numericAmount >= 4999
  const isPartialPayment = numericAmount > 0 && numericAmount < 4999

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

    form.transform((data) => ({
      ...data,
      is_olqp_member: data.is_olqp_member === 'yes',
      amount: Number(data.amount),
    }))

    form.post(route('singles-event.purchase-ticket'), {
      preserveScroll: true,
      onSuccess: () => {
        toast({ title: 'Success', description: 'Ticket details received successfully.' })
        setOpen(false)
        form.reset('name', 'gender', 'email', 'whatsapp', 'mpesa_code', 'is_olqp_member', 'amount')
        form.setData('amount', '4999')
      },
    })
  }

  // Handle M-Pesa code input with validation
  function handleMpesaCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toUpperCase()
    // Only allow letters and digits
    const sanitizedValue = value.replace(/[^A-Z0-9]/g, '')
    form.setData('mpesa_code', sanitizedValue)
  }

  // Keep badge reactive as user types amount
  useEffect(() => {}, [numericAmount])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:min-w-48 h-12 sm:h-14 text-sm sm:text-lg font-medium bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-500 hover:to-gray-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-slate-400 rounded-full">
          Register and Get Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Purchase Ticket</DialogTitle>
          <DialogDescription>
            Provide your details to reserve your spot. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <Alert className="mb-2 bg-green-100 text-green-800">
          <AlertDescription className="space-x-10">
            <p className="space-x-10">PayBill: <strong>7171186</strong></p>
            <p className="space-x-10">Account: <strong>DINNER</strong></p>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              value={form.data.name}
              onChange={(e) => form.setData('name', e.target.value)}
              placeholder="Jane Doe"
              required
              aria-invalid={!!form.errors.name || undefined}
            />
            <InputError message={form.errors.name} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={form.data.gender}
              onValueChange={(v) => form.setData('gender', v)}
            >
              <SelectTrigger id="gender" aria-invalid={!!form.errors.gender || undefined}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            <InputError message={form.errors.gender} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.data.email}
              onChange={(e) => form.setData('email', e.target.value)}
              placeholder="jane@example.com"
              required
              aria-invalid={!!form.errors.email || undefined}
            />
            <InputError message={form.errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="whatsapp">WhatsApp number</Label>
            <Input
              id="whatsapp"
              type="tel"
              value={form.data.whatsapp}
              onChange={(e) => form.setData('whatsapp', e.target.value)}
              placeholder="e.g. +254712345678"
              required
              aria-invalid={!!form.errors.whatsapp || undefined}
            />
            <InputError message={form.errors.whatsapp} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mpesa">M-Pesa payment code</Label>
            <Input
              id="mpesa"
              value={form.data.mpesa_code}
              onChange={handleMpesaCodeChange}
              placeholder="e.g. QW12AB34CD"
              required
              aria-invalid={!!form.errors.mpesa_code || !mpesaCodeValidation.isValid || undefined}
              className={!mpesaCodeValidation.isValid && form.data.mpesa_code ? 'border-red-500' : ''}
            />
            {!mpesaCodeValidation.isValid && form.data.mpesa_code && (
              <p className="text-sm text-red-600">{mpesaCodeValidation.message}</p>
            )}
            <InputError message={form.errors.mpesa_code} />
            <p className="text-xs text-gray-500">
              Only letters and numbers allowed. Minimum 6 characters.
            </p>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="amount">Amount paid (KES)</Label>
              {isFullPayment && <Badge>Full payment</Badge>}
              {!isFullPayment && isPartialPayment && (
                <Badge variant="destructive">Partial payment</Badge>
              )}
            </div>
            <Input
              id="amount"
              inputMode="decimal"
              type="number"
              min={0}
              step={1}
              value={form.data.amount}
              onChange={(e) => form.setData('amount', e.target.value)}
              placeholder="e.g. 4999"
              required
              aria-invalid={!!form.errors.amount || undefined}
            />
            <InputError message={form.errors.amount} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="member">OLQP member</Label>
            <Select
              value={form.data.is_olqp_member}
              onValueChange={(v) => form.setData('is_olqp_member', v)}
            >
              <SelectTrigger id="member" aria-invalid={!!form.errors.is_olqp_member || undefined}>
                <SelectValue placeholder="Are you an OLQP member?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
            <InputError message={form.errors.is_olqp_member} />
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            Note: You can only purchase one ticket at a time.
          </p>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={form.processing || !mpesaCodeValidation.isValid}
            >
              {form.processing ? 'Submitting…' : 'Continue'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
