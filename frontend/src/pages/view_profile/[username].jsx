import { BASE_URL, clientServer } from '@/config';
import DashBoardLayout from '@/layout/DashboardLayout';
import UserLayout from '@/layout/UserLayout';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from "./index.module.css"
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/postAction';
import { getConnectionsRequest, sendConnectionRequest } from '@/config/redux/action/authAction';

export default function ViewProfilePage({ userProfile }) {

  const router = useRouter();
  const postReducer = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth)

  const [userPosts, setUserPosts] = useState([]);

  const [isCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);

  const [isConnectionNull, setIsConnectionNull] = useState(true);

  const getUserPost = async () => {
    await dispatch(getAllPosts());
    await dispatch(getConnectionsRequest({ token: localStorage.getItem("token") }))
  }

  useEffect(() => {

    let post = postReducer.posts.filter((post) => {

      return post.userId.username === router.query.username
    })

    setUserPosts(post);
  }, [postReducer.posts])

  useEffect(() => {
    console.log(authState.connections, userProfile.userId._id)
    if (authState.connections.some(user => user.connectionId._id === userProfile.userId._id)) {
      setIsCurrentUserInConnection(true)
      if (authState.connections.find(user => user.connectionId._id === userProfile.userId._id).status_accepted === true) {
        setIsConnectionNull(false)
      }
    }
  }, [authState.connections])



  useEffect(() => {
    getUserPost();

  }, [])


  return (

    <UserLayout>

      <DashBoardLayout>

        <div className={styles.container}>
          <div className={styles.backDropContainer}>
            <img className={styles.backDrop} src={`${BASE_URL}/${userProfile.userId.profilePicture}`} alt="" />
          </div>

          <div className={styles.profileContainer_details}>
            <div style={{ display: "flex", gap: "0.7rem" }}>

              <div style={{ flex: "0.8" }} >

                <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1rem" }} >
                  <h2>{userProfile.userId.name}</h2>
                  <p style={{ color: "grey" }} >@{userProfile.userId.username}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }} >
                  {isCurrentUserInConnection ?
                    <button className={styles.connectedButton} >{isConnectionNull ? "Pending" : "Connected"}</button>
                    :
                    <button onClick={() => {
                      dispatch(sendConnectionRequest({ token: localStorage.getItem("token"), connectionId: userProfile.userId._id }))
                    }} className={styles.connectbtn} >Connect</button>
                  }

                  <div onClick={async () => {
                    const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
                    window.open(`${BASE_URL}/${response.data.message}`, "_blank")
                  }} >

                    <svg style={{ width: "1.2em", cursor: "pointer" }}  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>

                  </div>
                </div>

                <div>
                  <p>{userProfile.bio}</p>
                </div>

              </div>

              <div style={{ flex: "0.2" }} >
                <h3>Recent Activity</h3>
                {userPosts.map((post) => {
                  return (
                    <div key={post._id} className={styles.postCard} >
                      <div className={styles.card} >

                        <div className={styles.card_profileContainer} >
                          {post.media !== "" ? <img src={`${BASE_URL}/${post.media}`} alt='' />
                            :
                            <div style={{ width: "3.4rem", height: "3.4rem" }} > </div>}
                        </div>

                        <p>{post.body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

          <div className={styles.workHistory} >
            <h4>Work History</h4>
            <div className={styles.workHistoryContainer} >
              {
                userProfile.pastWork.map((work, index) => {
                  return (
                    <div key={index} className={styles.workHistoryCard} >
                      <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem" }} >{work.company} - {WEBPACK_RESOURCE_QUERIES.position}</p>
                      <p>{work.years}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>

        </div>

      </DashBoardLayout>

    </UserLayout>

  )
}


export async function getServerSideProps(context) {

  console.log("from View")
  console.log(context.query.username)

  const request = await clientServer.get("/user/get_profile_based_on_username", {
    params: {
      username: context.query.username
    }
  })

  const response = await request.data;
  console.log(response)

  return { props: { userProfile: request.data.profile } }
}