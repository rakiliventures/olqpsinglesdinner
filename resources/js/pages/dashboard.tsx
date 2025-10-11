import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    stats: {
        totalAttendees: number;
        attendeesWithConfirmedPayments: number;
        fullyPaidAttendees: number;
        fullyPaidIndividual: number;
        fullyPaidGroup: number;
        partiallyPaidAttendees: number;
        totalConfirmedRevenue: number;
    };
    charts: {
        genderDistribution: Record<string, number>;
        olqpMemberDistribution: Record<string, number>;
    };
}

export default function Dashboard({ stats, charts }: DashboardProps) {
    const genderChartData = {
        labels: Object.keys(charts.genderDistribution),
        datasets: [
            {
                data: Object.values(charts.genderDistribution),
                backgroundColor: [
                    '#3B82F6', // Blue
                    '#EF4444', // Red
                    '#10B981', // Green
                    '#F59E0B', // Yellow
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
            },
        ],
    };

    const olqpMemberChartData = {
        labels: Object.keys(charts.olqpMemberDistribution),
        datasets: [
            {
                data: Object.values(charts.olqpMemberDistribution),
                backgroundColor: [
                    '#8B5CF6', // Purple
                    '#06B6D4', // Cyan
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 overflow-x-auto">
                {/* Statistics Cards */}
                <div className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-5">
                    <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalAttendees}</div>
                            <p className="text-xs text-muted-foreground">All registered attendees</p>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">With Confirmed Payments</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.attendeesWithConfirmedPayments}</div>
                            <p className="text-xs text-muted-foreground">Attendees who have paid</p>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Fully Paid</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.fullyPaidAttendees}</div>
                            <div className="text-xs text-muted-foreground space-y-1">
                                <div>Individual Tickets : {stats.fullyPaidIndividual}</div>
                                <div>Group Tickets: {stats.fullyPaidGroup}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Partially Paid</CardTitle>
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.partiallyPaidAttendees}</div>
                            <p className="text-xs text-muted-foreground">Payments &lt; Ksh.4,999</p>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <CreditCard className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-emerald-600">
                                Ksh. {stats.totalConfirmedRevenue.toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">Confirmed payments only</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid auto-rows-min gap-6 md:grid-cols-2">
                    <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle>Gender Distribution (Confirmed Payments)</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <div className="w-full max-w-sm">
                                <Pie data={genderChartData} options={chartOptions} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader>
                            <CardTitle>OLQP Membership Distribution (Confirmed Payments)</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <div className="w-full max-w-sm">
                                <Pie data={olqpMemberChartData} options={chartOptions} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Placeholder for future content */}
                <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
