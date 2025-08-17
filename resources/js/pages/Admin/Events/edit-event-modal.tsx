import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import { useForm } from '@inertiajs/react'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

export type EventDto = {
  id: number
  name: string
  description: string | null
  date: string
  venue: string
  amount: string | number
}

export default function EditEventModal({ event }: { event: EventDto }) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const form = useForm({
    name: event.name,
    description: event.description ?? '',
    date: event.date.substring(0, 10),
    venue: event.venue,
    amount: String(event.amount),
  })

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.put(route('admin.events.update', event.id), {
      onSuccess: () => {
        toast({ title: 'Event updated' })
        setOpen(false)
      },
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
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor={`name-${event.id}`}>Name</Label>
            <Input id={`name-${event.id}`} value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} aria-invalid={!!form.errors.name || undefined} />
            {form.errors.name && <span className="text-sm text-red-600">{form.errors.name}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`description-${event.id}`}>Description</Label>
            <Textarea id={`description-${event.id}`} value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} aria-invalid={!!form.errors.description || undefined} />
            {form.errors.description && <span className="text-sm text-red-600">{form.errors.description}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`date-${event.id}`}>Date</Label>
            <Input id={`date-${event.id}`} type="date" value={form.data.date} onChange={(e) => form.setData('date', e.target.value)} aria-invalid={!!form.errors.date || undefined} />
            {form.errors.date && <span className="text-sm text-red-600">{form.errors.date}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`venue-${event.id}`}>Venue</Label>
            <Input id={`venue-${event.id}`} value={form.data.venue} onChange={(e) => form.setData('venue', e.target.value)} aria-invalid={!!form.errors.venue || undefined} />
            {form.errors.venue && <span className="text-sm text-red-600">{form.errors.venue}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={`amount-${event.id}`}>Amount (KES)</Label>
            <Input id={`amount-${event.id}`} type="number" inputMode="decimal" value={form.data.amount} onChange={(e) => form.setData('amount', e.target.value)} aria-invalid={!!form.errors.amount || undefined} />
            {form.errors.amount && <span className="text-sm text-red-600">{form.errors.amount}</span>}
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
