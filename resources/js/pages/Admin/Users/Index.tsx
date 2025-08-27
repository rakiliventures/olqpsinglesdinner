import AppLayout from '@/layouts/app-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/toast'
import { Head, useForm, usePage, router } from '@inertiajs/react'
import { useState } from 'react'
import { Users, UserPlus, UserX, UserCheck, Trash2, Mail, Calendar, Shield } from 'lucide-react'

type User = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  is_active: boolean
}

type PageProps = {
  users: User[]
}

export default function AdminUsersIndex() {
  const { toast } = useToast()
  const { props } = usePage<PageProps>()
  const users = props.users || []
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const createUserForm = useForm({
    name: '',
    email: '',
  })

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    
    createUserForm.post(route('admin.users.store'), {
      onSuccess: () => {
        setIsCreateDialogOpen(false)
        createUserForm.reset()
        toast({
          title: 'User Created Successfully',
          description: 'The new user has been created and credentials have been sent to their email.',
          variant: 'default',
        })
      },
      onError: (errors) => {
        toast({
          title: 'Error Creating User',
          description: Object.values(errors).join(', '),
          variant: 'destructive',
        })
      }
    })
  }

  const handleDeactivateUser = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeactivate = () => {
    if (!selectedUser) return

    router.put(route('admin.users.deactivate', selectedUser.id), {}, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false)
        setSelectedUser(null)
        toast({
          title: 'User Deactivated',
          description: `${selectedUser.name} has been deactivated successfully.`,
          variant: 'default',
        })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to deactivate user. Please try again.',
          variant: 'destructive',
        })
      }
    })
  }

  const handleActivateUser = (user: User) => {
    router.put(route('admin.users.activate', user.id), {}, {
      onSuccess: () => {
        toast({
          title: 'User Activated',
          description: `${user.name} has been activated successfully.`,
          variant: 'default',
        })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to activate user. Please try again.',
          variant: 'destructive',
        })
      }
    })
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (!selectedUser) return

    router.delete(route('admin.users.destroy', selectedUser.id), {
      onSuccess: () => {
        setIsDeleteDialogOpen(false)
        setSelectedUser(null)
        toast({
          title: 'User Deleted',
          description: `${selectedUser.name} has been deleted successfully.`,
          variant: 'default',
        })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to delete user. Please try again.',
          variant: 'destructive',
        })
      }
    })
  }

  const getStatusBadge = (user: User) => {
    if (user.is_active) {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center gap-1">
        <UserCheck className="h-3 w-3" />
        Active
      </Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center gap-1">
        <UserX className="h-3 w-3" />
        Inactive
      </Badge>
    }
  }

  const activeUsers = users.filter(user => user.is_active).length
  const inactiveUsers = users.filter(user => !user.is_active).length

  return (
    <AppLayout breadcrumbs={[{ title: 'Users', href: route('admin.users.index') }]}>
      <Head title="Users Management" />
      
      <div className="p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Users Management</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage system administrators and their access permissions
              </p>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                  <DialogDescription>
                    Create a new admin user. They will receive an email with their login credentials.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateUser}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={createUserForm.data.name}
                        onChange={(e) => createUserForm.setData('name', e.target.value)}
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={createUserForm.data.email}
                        onChange={(e) => createUserForm.setData('email', e.target.value)}
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={createUserForm.processing}>
                      {createUserForm.processing ? 'Creating...' : 'Create User'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">All system users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{inactiveUsers}</div>
              <p className="text-xs text-muted-foreground">Deactivated accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-black/10 dark:border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Created</TableHead>
                    <TableHead className="font-semibold w-40">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="h-8 w-8 text-gray-300" />
                          <span>No users found.</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {user.email}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(user)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(user.created_at).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {user.is_active ? (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeactivateUser(user)}
                              className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/30"
                            >
                              <UserX className="h-3 w-3 mr-1" />
                              Deactivate
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={() => handleActivateUser(user)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <UserCheck className="h-3 w-3 mr-1" />
                              Activate
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteUser(user)}
                            className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/30"
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
          </CardContent>
        </Card>

        {/* Deactivate/Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                {selectedUser && (
                  <>
                    Are you sure you want to {selectedUser.is_active ? 'deactivate' : 'delete'} <strong>{selectedUser.name}</strong>?
                    {selectedUser.is_active 
                      ? ' They will no longer be able to access the system until reactivated.'
                      : ' This action cannot be undone.'
                    }
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="destructive"
                onClick={selectedUser?.is_active ? confirmDeactivate : confirmDelete}
              >
                {selectedUser?.is_active ? 'Deactivate' : 'Delete'} User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
