import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'
import { useForm } from '@inertiajs/react'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

export default function CreateEventModal() {
  const { toast } = useToast()
  const form = useForm({ name: '', description: '', date: '', venue: '', amount: '' })
  const [open, setOpen] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    form.post(route('admin.events.store'), {
      onSuccess: () => {
        toast({ title: 'Event created' })
        setOpen(false)
        form.reset()
      },
      preserveScroll: true,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon /> New Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} aria-invalid={!!form.errors.name || undefined} />
            {form.errors.name && <span className="text-sm text-red-600">{form.errors.name}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} aria-invalid={!!form.errors.description || undefined} />
            {form.errors.description && <span className="text-sm text-red-600">{form.errors.description}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={form.data.date} onChange={(e) => form.setData('date', e.target.value)} aria-invalid={!!form.errors.date || undefined} />
            {form.errors.date && <span className="text-sm text-red-600">{form.errors.date}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="venue">Venue</Label>
            <Input id="venue" value={form.data.venue} onChange={(e) => form.setData('venue', e.target.value)} aria-invalid={!!form.errors.venue || undefined} />
            {form.errors.venue && <span className="text-sm text-red-600">{form.errors.venue}</span>}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="amount">Amount (KES)</Label>
            <Input id="amount" type="number" inputMode="decimal" value={form.data.amount} onChange={(e) => form.setData('amount', e.target.value)} aria-invalid={!!form.errors.amount || undefined} />
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
