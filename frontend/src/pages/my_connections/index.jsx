import DashBoardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React from 'react'

export default function MyConnections() {
    return (
        <UserLayout>
            <DashBoardLayout>
                <div>
                    <h1>
                        My Connections
                    </h1>
                </div>
            </DashBoardLayout>
        </UserLayout>
    )
}
