import AppLayout from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import { Head, useForm, usePage } from '@inertiajs/react'
import { PencilIcon, PlusIcon, Trash2Icon, MailIcon, BellIcon, UsersIcon, TicketIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

type AttendeeRow = {
  id: number
  name: string
  email: string
  whatsapp: string
  gender: string | null
  is_olqp_member: boolean
  total_amount: number
  event_name?: string | null
}

type PageProps = {
  event: { id: number; name: string; date: string; amount: number } | null
  attendees: AttendeeRow[]
}

export default function AdminAttendeesIndex() {
  const { toast } = useToast()
  const { props } = usePage<PageProps>()
  const attendees = props.attendees || []
  const eventAmount = props.event?.amount ?? 0

  const deleteForm = useForm({})
  const resendTicketForm = useForm({})
  const sendReminderForm = useForm({})
  const bulkSendRemindersForm = useForm({})
  const bulkResendTicketsForm = useForm({})

  function submitDelete(id: number) {
    deleteForm.delete(route('admin.attendees.destroy', id), {
      preserveScroll: true,
      onSuccess: () => toast({ title: 'Attendee deleted' }),
    })
  }

  function resendTicket(id: number) {
    resendTicketForm.post(route('admin.attendees.resend-ticket', id), {
      preserveScroll: true,
      onSuccess: () => toast({ title: 'Ticket resent successfully' }),
      onError: () => toast({ title: 'Failed to resend ticket', variant: 'destructive' }),
    })
  }

  function sendReminder(id: number) {
    sendReminderForm.post(route('admin.attendees.send-reminder', id), {
      preserveScroll: true,
      onSuccess: () => toast({ title: 'Reminder sent successfully' }),
      onError: () => toast({ title: 'Failed to send reminder', variant: 'destructive' }),
    })
  }

  function bulkSendReminders() {
    bulkSendRemindersForm.post(route('admin.attendees.bulk-send-reminders'), {
      preserveScroll: true,
      onSuccess: () => toast({ title: 'Bulk reminders sent successfully' }),
      onError: () => toast({ title: 'Failed to send bulk reminders', variant: 'destructive' }),
    })
  }

  function bulkResendTickets() {
    bulkResendTicketsForm.post(route('admin.attendees.bulk-resend-tickets'), {
      preserveScroll: true,
      onSuccess: () => toast({ title: 'Bulk tickets resent successfully' }),
      onError: () => toast({ title: 'Failed to resend bulk tickets', variant: 'destructive' }),
    })
  }

  function PaymentBadge({ total }: { total: number }) {
    const full = total >= eventAmount
    if (total <= 0) return <Badge variant="destructive">Unpaid</Badge>
    return full ? <Badge>Fully paid</Badge> : <Badge variant="secondary">Partially paid</Badge>
  }

  return (
    <AppLayout breadcrumbs={[{ title: 'Attendees', href: route('admin.attendees.index') }]}>
      <Head title="Attendees" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Attendees</h1>
            {props.event && (
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Event: {props.event.name} ({props.event.date})</div>
            )}
          </div>
          <div className="flex gap-2">
            <BulkSendRemindersButton 
              onBulkSendReminders={bulkSendReminders}
              processing={bulkSendRemindersForm.processing}
              attendees={attendees}
            />
            <BulkResendTicketsButton 
              onBulkResendTickets={bulkResendTickets}
              processing={bulkResendTicketsForm.processing}
              attendees={attendees}
            />
            <CreateAttendeeModal />
          </div>
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>OLQP</TableHead>
                <TableHead>Total Paid</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="w-28">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-sm text-neutral-600 dark:text-neutral-400">
                    No attendees found.
                  </TableCell>
                </TableRow>
              )}
              {attendees.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="font-mono font-medium text-sm">#{a.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{a.name}</div>
                    {a.gender && <div className="text-xs text-neutral-600 dark:text-neutral-400">{a.gender}</div>}
                  </TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell>{a.whatsapp}</TableCell>
                  <TableCell>{a.is_olqp_member ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{a.total_amount.toLocaleString()}</TableCell>
                  <TableCell><PaymentBadge total={a.total_amount} /></TableCell>
                  <TableCell className="flex gap-2">
                    <EditAttendeeModal attendee={a} />
                    {a.total_amount >= 4999 && (
                      <ResendTicketButton 
                        attendeeId={a.id} 
                        attendeeName={a.name}
                        onResend={resendTicket}
                        processing={resendTicketForm.processing}
                      />
                    )}
                    {a.total_amount < 4999 && (
                      <SendReminderButton 
                        attendeeId={a.id} 
                        attendeeName={a.name}
                        onSendReminder={sendReminder}
                        processing={sendReminderForm.processing}
                      />
                    )}
                    <Button variant="destructive" onClick={() => submitDelete(a.id)}>
                      <Trash2Icon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  )
}

function CreateAttendeeModal() {
  const { toast } = useToast()
  const form = useForm({ name: '', email: '', whatsapp: '', gender: '', is_olqp_member: 'no', amount: '', status: 'pending' })
  const [open, setOpen] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.transform((d) => ({ ...d, is_olqp_member: d.is_olqp_member === 'yes' }))
    form.post(route('admin.attendees.store'), {
      onSuccess: () => { toast({ title: 'Attendee created' }); setOpen(false); form.reset() },
      preserveScroll: true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> New Attendee
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Attendee</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} aria-invalid={!!form.errors.name || undefined} />
            {form.errors.name && <span className="text-sm text-red-600">{form.errors.name}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} aria-invalid={!!form.errors.email || undefined} />
            {form.errors.email && <span className="text-sm text-red-600">{form.errors.email}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input id="whatsapp" value={form.data.whatsapp} onChange={(e) => form.setData('whatsapp', e.target.value)} aria-invalid={!!form.errors.whatsapp || undefined} />
            {form.errors.whatsapp && <span className="text-sm text-red-600">{form.errors.whatsapp}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" value={form.data.gender} onChange={(e) => form.setData('gender', e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label>OLQP Member</Label>
            <Select value={form.data.is_olqp_member} onValueChange={(v) => form.setData('is_olqp_member', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="amount">Initial Payment (optional)</Label>
            <Input id="amount" type="number" inputMode="decimal" value={form.data.amount} onChange={(e) => form.setData('amount', e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label>Status</Label>
            <Select value={form.data.status} onValueChange={(v) => form.setData('status', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={form.processing}>{form.processing ? 'Saving…' : 'Save'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditAttendeeModal({ attendee }: { attendee: AttendeeRow }) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const form = useForm({
    name: attendee.name,
    email: attendee.email,
    whatsapp: attendee.whatsapp,
    gender: attendee.gender ?? '',
    is_olqp_member: attendee.is_olqp_member ? 'yes' : 'no',
  })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.transform((d) => ({ ...d, is_olqp_member: d.is_olqp_member === 'yes' }))
    form.put(route('admin.attendees.update', attendee.id), {
      onSuccess: () => { toast({ title: 'Attendee updated' }); setOpen(false) },
      preserveScroll: true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PencilIcon /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Attendee</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor={`name-${attendee.id}`}>Name</Label>
            <Input id={`name-${attendee.id}`} value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`email-${attendee.id}`}>Email</Label>
            <Input id={`email-${attendee.id}`} type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`whatsapp-${attendee.id}`}>WhatsApp</Label>
            <Input id={`whatsapp-${attendee.id}`} value={form.data.whatsapp} onChange={(e) => form.setData('whatsapp', e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`gender-${attendee.id}`}>Gender</Label>
            <Input id={`gender-${attendee.id}`} value={form.data.gender} onChange={(e) => form.setData('gender', e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label>OLQP Member</Label>
            <Select value={form.data.is_olqp_member} onValueChange={(v) => form.setData('is_olqp_member', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={form.processing}>{form.processing ? 'Saving…' : 'Save'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ResendTicketButton({ 
  attendeeId, 
  attendeeName, 
  onResend, 
  processing 
}: { 
  attendeeId: number
  attendeeName: string
  onResend: (id: number) => void
  processing: boolean
}) {
  const [open, setOpen] = useState(false)

  function handleResend() {
    onResend(attendeeId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MailIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resend Event Ticket</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Are you sure you want to resend the event ticket to <strong>{attendeeName}</strong>?
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
            This will send a new email with the event ticket PDF attached.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleResend} disabled={processing}>
            {processing ? 'Sending...' : 'Resend Ticket'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SendReminderButton({ 
  attendeeId, 
  attendeeName, 
  onSendReminder, 
  processing 
}: { 
  attendeeId: number
  attendeeName: string
  onSendReminder: (id: number) => void
  processing: boolean
}) {
  const [open, setOpen] = useState(false)

  function handleSendReminder() {
    onSendReminder(attendeeId)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <BellIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Payment Reminder</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Are you sure you want to send a payment reminder to <strong>{attendeeName}</strong>?
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
            This will send an email with payment status, remaining balance, and event details.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendReminder} disabled={processing}>
            {processing ? 'Sending...' : 'Send Reminder'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function BulkSendRemindersButton({ 
  onBulkSendReminders, 
  processing, 
  attendees 
}: { 
  onBulkSendReminders: () => void
  processing: boolean
  attendees: AttendeeRow[]
}) {
  const [open, setOpen] = useState(false)
  
  const partiallyPaidCount = attendees.filter(a => a.total_amount < 4999).length

  function handleBulkSendReminders() {
    onBulkSendReminders()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={partiallyPaidCount === 0}>
          <UsersIcon className="h-4 w-4 mr-2" />
          Send Reminders ({partiallyPaidCount})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Bulk Payment Reminders</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Are you sure you want to send payment reminders to <strong>{partiallyPaidCount} partially paid attendees</strong>?
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
            This will send personalized reminder emails with payment status and remaining balance to all attendees who have not fully paid.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleBulkSendReminders} disabled={processing}>
            {processing ? 'Sending...' : `Send to ${partiallyPaidCount} Attendees`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function BulkResendTicketsButton({ 
  onBulkResendTickets, 
  processing, 
  attendees 
}: { 
  onBulkResendTickets: () => void
  processing: boolean
  attendees: AttendeeRow[]
}) {
  const [open, setOpen] = useState(false)
  
  const fullyPaidCount = attendees.filter(a => a.total_amount >= 4999).length

  function handleBulkResendTickets() {
    onBulkResendTickets()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={fullyPaidCount === 0}>
          <TicketIcon className="h-4 w-4 mr-2" />
          Resend Tickets ({fullyPaidCount})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resend Bulk Event Tickets</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Are you sure you want to resend event tickets to <strong>{fullyPaidCount} fully paid attendees</strong>?
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
            This will send event tickets with QR codes to all attendees who have fully paid (Ksh. 4,999 and above).
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleBulkResendTickets} disabled={processing}>
            {processing ? 'Sending...' : `Resend to ${fullyPaidCount} Attendees`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}