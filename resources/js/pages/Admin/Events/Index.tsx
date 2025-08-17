import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import { Head, useForm, usePage } from '@inertiajs/react'
import { Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'
import CreateEventModal from './create-event-modal'
import EditEventModal from './edit-event-modal'

export type EventDto = {
  id: number
  name: string
  description: string | null
  date: string
  venue: string
  amount: string | number
}

export default function AdminEventsIndex() {
  const { toast } = useToast()
  const { props } = usePage<{ events: EventDto[]; flash?: { success?: string } }>()
  const events = (props.events || []).map((e) => ({ ...e, amount: Number(e.amount) }))

  function submitDelete(id: number) {
    const form = useForm({})
    form.delete(route('admin.events.destroy', id), {
      preserveScroll: true,
      onSuccess: () => toast({ title: 'Event deleted' }),
    })
  }

  return (
    <AppLayout breadcrumbs={[{ title: 'Events', href: route('admin.events.index') }]}>
      <Head title="Manage Events" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Events</h1>
          <CreateEventModal />
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Amount (KES)</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-sm text-neutral-600 dark:text-neutral-400">
                    No events found.
                  </TableCell>
                </TableRow>
              )}
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="font-medium">{event.name}</div>
                    {event.description && (
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">{event.description}</div>
                    )}
                  </TableCell>
                  <TableCell>{event.date.substring(0, 10)}</TableCell>
                  <TableCell>{event.venue}</TableCell>
                  <TableCell>{Number(event.amount).toLocaleString()}</TableCell>
                  <TableCell className="flex gap-2">
                    <EditEventModal event={event} />
                    <Button variant="destructive" onClick={() => submitDelete(event.id)}>
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
