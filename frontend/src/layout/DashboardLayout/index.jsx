import React, { useEffect } from 'react'
import styles from "./index.module.css"
import { useRouter } from 'next/router'
import { setTokenIsThere } from '@/config/redux/reducer/authReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function DashBoardLayout({ children }) {

  const router = useRouter();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth)

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      router.push("/login")
    }

    dispatch(setTokenIsThere())
  }, [])


  return (
    <div>
      <div className={styles.container}>

        <div className={styles.homeContainer}>

          <div className={styles.homeContainer_leftBar}>

            <div onClick={() => {
              router.push("/dashboard")
            }} className={styles.sideBarOption}>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
              </svg>
              <p>Scroll</p>

            </div>

            <div onClick={() => {
              router.push("/discover")
            }} className={styles.sideBarOption}>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>

              <p>Discover</p>

            </div>

            <div onClick={() => {
              router.push("/my_connections")
            }} className={styles.sideBarOption}>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>


              <p>My Connections</p>

            </div>


          </div>

          <div className={styles.homeContainer_feedContainer}>

            {children}

          </div>

          <div className={styles.homeContainer_extraContainer}>
            <h3>Top Profiles</h3>

            <div className={styles.topProfilesscroll}>

              {authState.all_profiles_fetched && authState.all_users.map((profile) => {

                return (
                  <div key={profile._id} className={styles.extraContainer_profile}>
                    <div>
                      <p><b>{profile.userId.username}</b></p>
                      <p><i>{profile.userId.name}</i></p>
                    </div>
                    <div>
                      <button onClick={() => {
                        router.push(`/view_profile/${profile.userId.username}`)
                      }} className={styles.checkbtn}>Check</button>
                    </div>
                  </div>
                )

              })}
            </div>
          </div>

        </div>


      </div>


      <div className={styles.mobileNavBar}>

        <div onClick={() => {
          router.push("/dashboard")
        }} className={styles.singleNavItemHolder_mobileView}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
          </svg>
        </div>
        <div onClick={() => {
          router.push("/discover")
        }} className={styles.singleNavItemHolder_mobileView}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <div onClick={() => {
          router.push("/my_connections")
        }} className={styles.singleNavItemHolder_mobileView}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>

      </div>

    </div>
  )
}
