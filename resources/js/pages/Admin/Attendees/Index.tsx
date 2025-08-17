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
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react'
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

  function submitDelete(id: number) {
    const form = useForm({})
    form.delete(route('admin.attendees.destroy', id), {
      preserveScroll: true,
      onSuccess: () => toast({ title: 'Attendee deleted' }),
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
          <CreateAttendeeModal />
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Event</TableHead>
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
                  <TableCell colSpan={9} className="text-sm text-neutral-600 dark:text-neutral-400">
                    No attendees found.
                  </TableCell>
                </TableRow>
              )}
              {attendees.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>
                    <div className="font-medium">{a.name}</div>
                    {a.gender && <div className="text-xs text-neutral-600 dark:text-neutral-400">{a.gender}</div>}
                  </TableCell>
                  <TableCell>{a.event_name ?? props.event?.name ?? '-'}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell>{a.whatsapp}</TableCell>
                  <TableCell>{a.is_olqp_member ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{a.total_amount.toLocaleString()}</TableCell>
                  <TableCell><PaymentBadge total={a.total_amount} /></TableCell>
                  <TableCell className="flex gap-2">
                    <EditAttendeeModal attendee={a} />
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
