import AppLayout from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import { Head, usePage, router } from '@inertiajs/react'

 type PaymentRow = {
  id: number
  attendee_name?: string | null
  event_name?: string | null
  amount: number
  mpesa_code: string
  status: 'pending' | 'confirmed' | 'failed'
  method: string
  created_at?: string | null
}

type PageProps = {
  event: { id: number; name: string; date: string } | null
  payments: PaymentRow[]
}

export default function AdminPaymentsIndex() {
  const { toast } = useToast()
  const { props } = usePage<PageProps>()
  const payments = props.payments || []

  function updateStatus(id: number, status: PaymentRow['status']) {
    router.put(route('admin.payments.update', id), { status }, {
      preserveScroll: true,
      onSuccess: () => toast({ title: 'Payment updated' }),
    })
  }

  function getStatusBadge(status: PaymentRow['status']) {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Confirmed</Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Failed</Badge>
      case 'pending':
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
    }
  }

  return (
    <AppLayout breadcrumbs={[{ title: 'Payments', href: route('admin.payments.index') }]}>
      <Head title="Payments" />
      <div className="p-4 sm:p-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Payments</h1>
          {props.event && (
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Event: {props.event.name} ({props.event.date})</div>
          )}
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payee</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>M-Pesa Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-sm text-neutral-600 dark:text-neutral-400">
                    No payments found.
                  </TableCell>
                </TableRow>
              )}
              {payments.map((p) => (
                <TableRow key={p.id} className={p.status === 'pending' ? 'bg-red-50 dark:bg-red-950/30' : ''}>
                  <TableCell>{p.attendee_name ?? '-'}</TableCell>
                  <TableCell>{p.event_name ?? '-'}</TableCell>
                  <TableCell>{p.amount.toLocaleString()}</TableCell>
                  <TableCell>{p.mpesa_code}</TableCell>
                  <TableCell>
                    {getStatusBadge(p.status)}
                  </TableCell>
                  <TableCell>{p.method}</TableCell>
                  <TableCell>{p.created_at ?? ''}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {p.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => updateStatus(p.id, 'confirmed')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Confirm
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStatus(p.id, 'failed')}
                            className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/30"
                          >
                            Failed
                          </Button>
                        </>
                      )}
                      {p.status === 'failed' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateStatus(p.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Confirm
                        </Button>
                      )}
                      {p.status === 'confirmed' && (
                        <span className="text-sm text-green-600 dark:text-green-400">✓ Confirmed</span>
                      )}
                    </div>
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
