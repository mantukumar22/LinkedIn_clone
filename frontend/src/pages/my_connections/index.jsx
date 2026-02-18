import { AcceptConnection, getMyConnectionRequests } from '@/config/redux/action/authAction'
import DashBoardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect } from 'react'
import styles from "./index.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '@/config'
import { useRouter } from 'next/router'

export default function MyConnections() {

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMyConnectionRequests({ token: localStorage.getItem("token") }));
    }, [])

    const router = useRouter();

    useEffect(() => {
        if (authState.connectionRequest.length != 0) {
            console.log(authState.connectionRequest)
        }
    }, [authState.connectionRequest])

    return (
        <UserLayout>
            <DashBoardLayout>
                <div className={styles.MyConnections}>
                    <h1> [ Connection Requests]</h1>

                    {authState.connectionRequest.length === 0 && <h1>No Connection Request Pending</h1>}

                    {authState.connectionRequest.length != 0 && authState.connectionRequest.filter((connection) => connection.status_accepted === null).map((user, index) => {
                        return (
                            <div onClick={() => {
                                router.push(`/view_profile/${user.userId.username}`)
                            }} className={styles.userCard} key={index}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <div className={styles.profilePicture}>
                                        <img src={`${BASE_URL}/uploads/${user.userId.profilePicture}`} alt="" />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <h3>{user.userId.name}</h3>
                                        <p>{user.userId.username}</p>
                                    </div>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(AcceptConnection({
                                            connectionId: user._id,
                                            token: localStorage.getItem("token"),
                                            action: "accept"
                                        }))
                                    }} className={styles.connectedButton} >Accept</button>
                                </div>

                            </div>
                        )
                    })}
                    <br /><br />
                    <h2> [ My Network ]</h2>
                    {authState.connectionRequest.filter((connection) => connection.status_accepted !== null).map((user, index) => {
                        return (
                            <div onClick={() => {
                                router.push(`/view_profile/${user.userId.username}`)
                            }} className={styles.userCard} key={index}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                                    <div className={styles.profilePicture}>
                                        <img src={`${BASE_URL}/uploads/${user.userId.profilePicture}`} alt="" />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <h3>{user.userId.name}</h3>
                                        <p>{user.userId.username}</p>
                                    </div>
                                </div>

                            </div>
                        )
                    })}

                </div>
            </DashBoardLayout>
        </UserLayout>
    )
}
