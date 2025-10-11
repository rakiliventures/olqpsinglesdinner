import AppLayout from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Head, usePage, router } from '@inertiajs/react'
import { useState, useMemo } from 'react'
import { CheckCircle, AlertCircle, Mail, MessageCircle, User, Trash2, CreditCard, TrendingUp, XCircle, Clock, Search, Download, FileText, Table as TableIcon, Loader2 } from 'lucide-react'

 type PaymentRow = {
  id: number
  attendee_name?: string | null
  attendee_phone?: string | null
  event_name?: string | null
  amount: number
  mpesa_code: string
  status: 'pending' | 'confirmed' | 'failed'
  method: string
  ticket_type: string
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

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  
  // Progress dialog state
  const [isConfirming, setIsConfirming] = useState(false)
  const [confirmingPaymentId, setConfirmingPaymentId] = useState<number | null>(null)
  const [confirmingPaymentName, setConfirmingPaymentName] = useState<string>('')

  // Filtered payments based on search and status filter
  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        payment.attendee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.attendee_phone?.includes(searchTerm) ||
        payment.mpesa_code.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [payments, searchTerm, statusFilter])

  // Calculate payment summary based on filtered results
  const paymentSummary = {
    total: filteredPayments.length,
    confirmed: filteredPayments.filter(p => p.status === 'confirmed').length,
    failed: filteredPayments.filter(p => p.status === 'failed').length,
    pending: filteredPayments.filter(p => p.status === 'pending').length,
    totalConfirmedAmount: filteredPayments
      .filter(p => p.status === 'confirmed')
      .reduce((sum, p) => sum + p.amount, 0),
  }

  function updateStatus(id: number, status: PaymentRow['status'], attendeeName?: string) {
    // Show progress dialog for confirmation
    if (status === 'confirmed') {
      setIsConfirming(true)
      setConfirmingPaymentId(id)
      setConfirmingPaymentName(attendeeName || 'Unknown')
    }

    router.put(route('admin.payments.update', id), { status }, {
      preserveScroll: true,
      onSuccess: () => {
        if (status === 'confirmed') {
          // Add minimum delay of 5 seconds for better UX
          setTimeout(() => {
            setIsConfirming(false)
            setConfirmingPaymentId(null)
            setConfirmingPaymentName('')
            toast({ 
              title: 'Payment Confirmed!', 
              description: 'Payment has been confirmed successfully. Notifications will be sent in the background.',
              variant: 'default',
            })
          }, 5000)
        } else {
          toast({ 
            title: 'Payment Updated', 
            description: `Payment status has been updated to ${status}.`,
            variant: 'default',
          })
        }
      },
      onError: () => {
        setIsConfirming(false)
        setConfirmingPaymentId(null)
        setConfirmingPaymentName('')
        toast({ 
          title: 'Error', 
          description: 'Failed to update payment status. Please try again.',
          variant: 'destructive',
        })
      }
    })
  }

  function deletePayment(id: number) {
    if (confirm('Are you sure you want to delete this payment? This action cannot be undone.')) {
      router.delete(route('admin.payments.destroy', id), {
        preserveScroll: true,
        onSuccess: () => {
          toast({ 
            title: 'Payment Deleted', 
            description: 'The payment has been successfully deleted.',
            variant: 'default',
          })
        },
        onError: () => {
          toast({ 
            title: 'Error', 
            description: 'Failed to delete payment. Please try again.',
            variant: 'destructive',
          })
        }
      })
    }
  }

  function exportToPDF() {
    // Build query parameters
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (statusFilter !== 'all') params.append('status', statusFilter)
    
    // Create direct download link
    const url = route('admin.payments.export.pdf') + (params.toString() ? '?' + params.toString() : '')
    
    // Open in new window to trigger download
    window.open(url, '_blank')
    
    toast({ 
      title: 'PDF Export Started', 
      description: 'Your PDF export will download shortly.',
      variant: 'default',
    })
  }

  function exportToExcel() {
    // Build query parameters
    const params = new URLSearchParams()
    if (searchTerm) params.append('search', searchTerm)
    if (statusFilter !== 'all') params.append('status', statusFilter)
    
    // Create direct download link
    const url = route('admin.payments.export.excel') + (params.toString() ? '?' + params.toString() : '')
    
    // Open in new window to trigger download
    window.open(url, '_blank')
    
    toast({ 
      title: 'CSV Export Started', 
      description: 'Your CSV export will download shortly.',
      variant: 'default',
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

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CreditCard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{paymentSummary.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Confirmed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{paymentSummary.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Failed</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{paymentSummary.failed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Action</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{paymentSummary.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Confirmed</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  Ksh. {paymentSummary.totalConfirmedAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 mb-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or M-Pesa code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="flex-shrink-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-1.5">
              <Button
                onClick={exportToPDF}
                size="sm"
                variant="outline"
                className="flex items-center gap-1.5 border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-950/30"
              >
                <FileText className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              <Button
                onClick={exportToExcel}
                size="sm"
                variant="outline"
                className="flex items-center gap-1.5 border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-950/30"
              >
                <TableIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">CSV</span>
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
            Showing {filteredPayments.length} of {payments.length} payments
            {searchTerm && (
              <span className="ml-2">
                • Search: "{searchTerm}"
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="ml-2">
                • Status: {statusFilter}
              </span>
            )}
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
              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="h-8 w-8 text-gray-300" />
                      <span>
                        {payments.length === 0 
                          ? 'No payments found.' 
                          : 'No payments match your search criteria.'
                        }
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {filteredPayments.map((p) => (
                <TableRow key={p.id} className={p.status === 'pending' ? 'bg-yellow-50 dark:bg-yellow-950/20' : ''}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{p.attendee_name ?? '-'}</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                        {p.ticket_type}
                      </div>
                      {p.attendee_phone && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {p.attendee_phone}
                        </div>
                      )}
                    </div>
                  </TableCell>
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
                            onClick={() => updateStatus(p.id, 'confirmed', p.attendee_name || 'Unknown')}
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
                          onClick={() => updateStatus(p.id, 'confirmed', p.attendee_name || 'Unknown')}
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
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deletePayment(p.id)}
                        className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/30 ml-2"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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

      {/* Progress Dialog */}
      <Dialog open={isConfirming} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Confirming Payment
            </DialogTitle>
            <DialogDescription>
              Please wait while we confirm the payment...
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Processing payment for {confirmingPaymentName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Processing payment confirmation...
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
    </AppLayout>
  )
}
