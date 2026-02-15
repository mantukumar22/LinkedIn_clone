import { getAllUsers } from '@/config/redux/action/authAction'
import DashBoardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Discoverpage() {

  const authState = useSelector((state) => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    if(authState.all_profiles_fetched){
      dispatch(getAllUsers());
    }
  }, [])

  return (
    <div>
      <UserLayout>
            <DashBoardLayout>
                <div>
                    <h1>
                       Discoverpage
                    </h1>
                </div>
            </DashBoardLayout>
        </UserLayout>
    </div>
  )
}
