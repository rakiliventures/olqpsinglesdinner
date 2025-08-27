import AppLayout from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import { Head, usePage, router } from '@inertiajs/react'
import { CheckCircle, AlertCircle, Mail, MessageCircle, User } from 'lucide-react'

 type PaymentRow = {
  id: number
  attendee_name?: string | null
  event_name?: string | null
  amount: number
  mpesa_code: string
  status: 'pending' | 'confirmed' | 'failed'
  method: string
  created_at?: string | null
  actioned_by_name?: string | null
  actioned_at?: string | null
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
      onSuccess: () => {
        if (status === 'confirmed') {
          toast({ 
            title: 'Payment Confirmed!', 
            description: 'Email and WhatsApp notifications have been sent to the attendee.',
            variant: 'default',
          })
        } else {
          toast({ 
            title: 'Payment Updated', 
            description: `Payment status has been updated to ${status}.`,
            variant: 'default',
          })
        }
      },
      onError: () => {
        toast({ 
          title: 'Error', 
          description: 'Failed to update payment status. Please try again.',
          variant: 'destructive',
        })
      }
    })
  }

  function getStatusBadge(status: PaymentRow['status']) {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Confirmed
        </Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Failed
        </Badge>
      case 'pending':
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Pending
        </Badge>
    }
  }

  return (
    <AppLayout breadcrumbs={[{ title: 'Payments', href: route('admin.payments.index') }]}>
      <Head title="Payments" />
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Payments Management</h1>
          {props.event && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Event: {props.event.name} ({props.event.date})
            </div>
          )}
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            💡 When you confirm a payment, the system automatically sends email and WhatsApp notifications to the attendee.
          </div>
        </div>

        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-gray-900 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead className="font-semibold">Payee</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">M-Pesa Code</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Method</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Actioned By</TableHead>
                <TableHead className="font-semibold w-40">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="h-8 w-8 text-gray-300" />
                      <span>No payments found.</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {payments.map((p) => (
                <TableRow key={p.id} className={p.status === 'pending' ? 'bg-yellow-50 dark:bg-yellow-950/20' : ''}>
                  <TableCell className="font-medium">{p.attendee_name ?? '-'}</TableCell>
                  <TableCell className="font-semibold text-green-600 dark:text-green-400">
                    Ksh. {p.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{p.mpesa_code}</TableCell>
                  <TableCell>
                    {getStatusBadge(p.status)}
                  </TableCell>
                  <TableCell className="capitalize">{p.method}</TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                    {p.created_at ? new Date(p.created_at).toLocaleDateString() : '-'}
                  </TableCell>
                  <TableCell>
                    {p.actioned_by_name ? (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-3 w-3 text-gray-500" />
                        <span className="font-medium">{p.actioned_by_name}</span>
                        {p.actioned_at && (
                          <span className="text-xs text-gray-500">
                            {new Date(p.actioned_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {p.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => updateStatus(p.id, 'confirmed')}
                            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Confirm
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateStatus(p.id, 'failed')}
                            className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/30"
                          >
                            <AlertCircle className="h-3 w-3" />
                            Failed
                          </Button>
                        </>
                      )}
                      {p.status === 'failed' && (
                        <Button 
                          size="sm" 
                          onClick={() => updateStatus(p.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Confirm
                        </Button>
                      )}
                      {p.status === 'confirmed' && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span>Confirmed</span>
                          <div className="flex gap-1">
                            <Mail className="h-3 w-3" />
                            <MessageCircle className="h-3 w-3" />
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Notification Info Card */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                Automatic Notifications
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                When you confirm a payment, the system automatically sends:
              </p>
              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                <li className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span>Email confirmation to the attendee's email address</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-3 w-3" />
                  <span>WhatsApp message to the attendee's phone number</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
