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
import { PencilIcon, PlusIcon, Trash2Icon, MailIcon, BellIcon, UsersIcon, TicketIcon, Download, FileText, Table as TableIcon, Search, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'

type AttendeeRow = {
  id: number
  name: string
  email: string
  whatsapp: string
  gender: string | null
  is_olqp_member: boolean
  total_amount: number
  ticket_type: string
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

  // Search state
  const [searchTerm, setSearchTerm] = useState('')

  // Progress dialog state
  const [isResendingTicket, setIsResendingTicket] = useState(false)
  const [resendingTicketId, setResendingTicketId] = useState<number | null>(null)
  const [resendingTicketName, setResendingTicketName] = useState<string>('')
  
  // Send reminder progress dialog
  const [isSendingReminder, setIsSendingReminder] = useState(false)
  const [sendingReminderId, setSendingReminderId] = useState<number | null>(null)
  const [sendingReminderName, setSendingReminderName] = useState<string>('')
  
  // Bulk action progress dialogs
  const [isBulkResendingTickets, setIsBulkResendingTickets] = useState(false)
  const [isBulkSendingReminders, setIsBulkSendingReminders] = useState(false)

  // Filter attendees based on search term
  const filteredAttendees = useMemo(() => {
    if (!searchTerm.trim()) {
      return attendees
    }
    
    const term = searchTerm.toLowerCase()
    return attendees.filter(attendee => 
      attendee.name.toLowerCase().includes(term) ||
      attendee.email.toLowerCase().includes(term) ||
      attendee.whatsapp.toLowerCase().includes(term) ||
      attendee.ticket_type.toLowerCase().includes(term) ||
      (attendee.gender && attendee.gender.toLowerCase().includes(term))
    )
  }, [attendees, searchTerm])

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

  function resendTicket(id: number, attendeeName?: string) {
    // Show progress dialog
    setIsResendingTicket(true)
    setResendingTicketId(id)
    setResendingTicketName(attendeeName || 'Unknown')

    resendTicketForm.post(route('admin.attendees.resend-ticket', id), {
      preserveScroll: true,
      onSuccess: () => {
        setIsResendingTicket(false)
        setResendingTicketId(null)
        setResendingTicketName('')
        toast({ title: 'Ticket resent successfully' })
      },
      onError: () => {
        setIsResendingTicket(false)
        setResendingTicketId(null)
        setResendingTicketName('')
        toast({ title: 'Failed to resend ticket', variant: 'destructive' })
      },
    })
  }

  function sendReminder(id: number, attendeeName?: string) {
    // Show progress dialog
    setIsSendingReminder(true)
    setSendingReminderId(id)
    setSendingReminderName(attendeeName || 'Unknown')

    sendReminderForm.post(route('admin.attendees.send-reminder', id), {
      preserveScroll: true,
      onSuccess: () => {
        setIsSendingReminder(false)
        setSendingReminderId(null)
        setSendingReminderName('')
        toast({ title: 'Reminder sent successfully' })
      },
      onError: () => {
        setIsSendingReminder(false)
        setSendingReminderId(null)
        setSendingReminderName('')
        toast({ title: 'Failed to send reminder', variant: 'destructive' })
      },
    })
  }

  function bulkSendReminders() {
    // Show progress dialog
    setIsBulkSendingReminders(true)

    bulkSendRemindersForm.post(route('admin.attendees.bulk-send-reminders'), {
      preserveScroll: true,
      onSuccess: () => {
        setIsBulkSendingReminders(false)
        toast({ title: 'Bulk reminders sent successfully' })
      },
      onError: () => {
        setIsBulkSendingReminders(false)
        toast({ title: 'Failed to send bulk reminders', variant: 'destructive' })
      },
    })
  }

  function bulkResendTickets() {
    // Show progress dialog
    setIsBulkResendingTickets(true)

    bulkResendTicketsForm.post(route('admin.attendees.bulk-resend-tickets'), {
      preserveScroll: true,
      onSuccess: () => {
        setIsBulkResendingTickets(false)
        toast({ title: 'Bulk tickets resent successfully' })
      },
      onError: () => {
        setIsBulkResendingTickets(false)
        toast({ title: 'Failed to resend bulk tickets', variant: 'destructive' })
      },
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
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold">Attendees</h1>
              {props.event && (
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Event: {props.event.name} ({props.event.date})</div>
              )}
            </div>
            
            {/* Mobile-first button layout */}
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Export buttons - always visible */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => window.open(route('admin.attendees.export-pdf'), '_blank')}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                  size="sm"
                >
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Export PDF</span>
                  <span className="sm:hidden">PDF</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open(route('admin.attendees.export-excel'), '_blank')}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                  size="sm"
                >
                  <TableIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Export CSV</span>
                  <span className="sm:hidden">CSV</span>
                </Button>
              </div>
              
              {/* Bulk action buttons - always visible */}
              <div className="flex gap-2">
                <BulkSendRemindersButton 
                  onBulkSendReminders={bulkSendReminders}
                  processing={bulkSendRemindersForm.processing}
                  attendees={filteredAttendees}
                />
                <BulkResendTicketsButton 
                  onBulkResendTickets={bulkResendTickets}
                  processing={bulkResendTicketsForm.processing}
                  attendees={filteredAttendees}
                />
                <CreateAttendeeModal />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search attendees by name, email, WhatsApp, ticket type, or gender..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchTerm && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredAttendees.length} of {attendees.length} attendees
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block rounded-lg border border-black/10 dark:border-white/10">
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
              {filteredAttendees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-sm text-neutral-600 dark:text-neutral-400">
                    {searchTerm ? 'No attendees found matching your search.' : 'No attendees found.'}
                  </TableCell>
                </TableRow>
              )}
              {filteredAttendees.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="font-mono font-medium text-sm">#{a.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                      {a.ticket_type}
                    </div>
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
                        onResend={(id) => resendTicket(id, a.name)}
                        processing={resendTicketForm.processing}
                      />
                    )}
                    {a.total_amount < 4999 && (
                      <SendReminderButton 
                        attendeeId={a.id} 
                        attendeeName={a.name}
                        onSendReminder={(id) => sendReminder(id, a.name)}
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

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {filteredAttendees.length === 0 && (
            <div className="text-center py-8 text-sm text-neutral-600 dark:text-neutral-400">
              {searchTerm ? 'No attendees found matching your search.' : 'No attendees found.'}
            </div>
          )}
          {filteredAttendees.map((a) => (
            <div key={a.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-mono font-medium text-sm text-gray-500 dark:text-gray-400">#{a.id}</div>
                  <div className="font-semibold text-lg">{a.name}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                    {a.ticket_type}
                  </div>
                  {a.gender && <div className="text-xs text-gray-500 dark:text-gray-400">{a.gender}</div>}
                </div>
                <PaymentBadge total={a.total_amount} />
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Email:</span>
                  <span className="text-right break-all">{a.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">WhatsApp:</span>
                  <span>{a.whatsapp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">OLQP Member:</span>
                  <span>{a.is_olqp_member ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Total Paid:</span>
                  <span className="font-semibold">Ksh. {a.total_amount.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex gap-1 flex-wrap">
                <EditAttendeeModal attendee={a} />
                {a.total_amount >= 4999 && (
                  <ResendTicketButton 
                    attendeeId={a.id} 
                    attendeeName={a.name}
                    onResend={(id) => resendTicket(id, a.name)}
                    processing={resendTicketForm.processing}
                  />
                )}
                {a.total_amount < 4999 && (
                  <SendReminderButton 
                    attendeeId={a.id} 
                    attendeeName={a.name}
                    onSendReminder={(id) => sendReminder(id, a.name)}
                    processing={sendReminderForm.processing}
                  />
                )}
                <Button variant="destructive" size="sm" onClick={() => submitDelete(a.id)}>
                  <Trash2Icon className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Dialog for Resend Ticket */}
        <Dialog open={isResendingTicket} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Resending Ticket
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <MailIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Sending confirmed payment ticket to {resendingTicketName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Generating PDF and sending email...
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Progress Dialog for Bulk Resend Tickets */}
        <Dialog open={isBulkResendingTickets} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Resending Bulk Tickets
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <TicketIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Processing bulk confirmed payment ticket resend
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Generating PDFs and sending emails to all fully paid attendees...
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Progress Dialog for Send Reminder */}
        <Dialog open={isSendingReminder} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending Reminder
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <BellIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Sending reminder to {sendingReminderName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Preparing payment reminder email...
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Progress Dialog for Bulk Send Reminders */}
        <Dialog open={isBulkSendingReminders} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending Bulk Reminders
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <BellIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Processing bulk reminders
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Sending payment reminders to all partially paid attendees...
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
        <Button size="sm" className="text-xs sm:text-sm">
          <PlusIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">New Attendee</span>
          <span className="sm:hidden">New</span>
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
        <Button variant="outline" size="sm">
          <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline ml-1">Edit</span>
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
          <MailIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline ml-1">Resend</span>
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
            This will send a new email with the event ticket PDF attached. The attendee's payment has been confirmed.
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
          <BellIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline ml-1">Remind</span>
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
        <Button variant="outline" disabled={partiallyPaidCount === 0} size="sm" className="text-xs sm:text-sm">
          <UsersIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Send Reminders ({partiallyPaidCount})</span>
          <span className="sm:hidden">Reminders ({partiallyPaidCount})</span>
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
        <Button variant="outline" disabled={fullyPaidCount === 0} size="sm" className="text-xs sm:text-sm">
          <TicketIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Resend Tickets ({fullyPaidCount})</span>
          <span className="sm:hidden">Tickets ({fullyPaidCount})</span>
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
            This will send event tickets with QR codes to all attendees who have fully paid (Ksh. 4,999 and above). All payments have been confirmed.
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