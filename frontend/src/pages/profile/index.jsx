import { getAboutUser } from '@/config/redux/action/authAction'
import DashBoardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React, { useEffect, useState } from 'react'

import styles from "./index.module.css"
import { BASE_URL, clientServer } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '@/config/redux/action/postAction'

export default function ProfilePage() {

    const authState = useSelector((state) => state.auth);
    const postReducer = useSelector((state) => state.postReducer)

    const [userProfile, setUserProfile] = useState({})

    const [userPosts, setUserPosts] = useState([])

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState();

    const [inputData, setInputData] = useState({ company: '', position: '', years: '' });

    const handleWorkInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }

    useEffect(() => {
        dispatch(getAboutUser({ token: localStorage.getItem("token") }))
        dispatch(getAllPosts())
    }, [])

    useEffect(() => {

        if (authState.user != undefined) {
            setUserProfile(authState.user)
            let post = postReducer.posts.filter((post) => {
                return post.userId.username === authState.user.userId.username
            })
            setUserPosts(post);
        }


    }, [authState.user, postReducer.posts])

    const updateProfilePicture = async (file) => {

        const formData = new FormData();
        formData.append("profile_picture", file);
        formData.append("token", localStorage.getItem("token"));

        const response = await clientServer.post("/update_profile_picture", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }


    const updateProfileData = async () => {
        try {
            const request = await clientServer.post("/user_update", {
                token: localStorage.getItem("token"),
                name: userProfile.userId.name,
            });

            const response = await clientServer.post("/update_profile_data", {
                token: localStorage.getItem("token"),
                bio: userProfile.bio,
                currentPost: userProfile.currentPost,
                pastWork: userProfile.pastWork,
                education: userProfile.education
            });

            dispatch(getAboutUser({ token: localStorage.getItem("token") }))
        } catch (err) {
            console.log(err.response?.data)
        }

    }

    return (
        <UserLayout>
            <DashBoardLayout>

                {authState.user && userProfile.userId &&
                    < div className={styles.container}>
                        <div className={styles.backDropContainer}>
                            <label htmlFor='profilePictureUpload' className={styles.backDropEdit} >
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </p>
                            </label>
                            <input onChange={(e) =>
                                updateProfilePicture(e.target.files[0])
                            } hidden type="file" id='profilePictureUpload' />
                            <img className={styles.backDrop} src={`${BASE_URL}/uploads/${userProfile.userId.profilePicture}`} alt="" />
                        </div>

                        <div className={styles.profileContainer_details}>
                            <div className={styles.profileContainer_flex }>

                                <div style={{ flex: "0.7" }} >

                                    <div style={{ display: "flex", width: "", alignItems: "center", gap: "1rem", fontSize: "larger" }} >
                                        <input className={styles.nameEdit} type="text" value={userProfile.userId.name} onChange={(e) => {
                                            setUserProfile({ ...userProfile, userId: { ...userProfile.userId, name: e.target.value } })
                                        }} />
                                        <p style={{ color: "grey" }} >@{userProfile.userId.username}</p>
                                    </div>

                                    <div>
                                        <textarea
                                            value={userProfile.bio}
                                            onChange={(e) => {
                                                setUserProfile({ ...userProfile, bio: e.target.value })
                                            }}
                                            rows={Math.max(3, Math.ceil(userProfile.bio.length / 80))}
                                            style={{ width: "100%" }}
                                        />

                                    </div>

                                </div>

                                <div style={{ flex: "0.3"}} >
                                    <h3>Recent Activity</h3>
                                    {userPosts?.map((post) => {
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
                                                <p style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem" }} >{work.company} - {work.position}</p>
                                                <p>{work.years} Year's</p>
                                            </div>
                                        )
                                    })
                                }

                                <button className={styles.addWorkButton} onClick={() => {
                                    setIsModalOpen(true);
                                }}>Add Work </button>


                            </div>
                        </div>

                        {userProfile != authState.user &&
                            <div onClick={() => {
                                updateProfileData();
                            }} className={styles.connectedButton} >
                                Update Profile
                            </div>
                        }

                    </div>
                }

                {
                    isModalOpen &&
                    <div
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                        className={styles.commentsContainer}>
                        <div onClick={(e) => {
                            e.stopPropagation()
                        }}
                            className={styles.allCommentsContainer}>
                            <input onChange={handleWorkInputChange} name='company' className={styles.inputField} type="text" placeholder='Enter Company Name' />
                            <input onChange={handleWorkInputChange} name='position' className={styles.inputField} type="text" placeholder='Enter Position Work' />
                            <input onChange={handleWorkInputChange} name='years' className={styles.inputField} type="number" placeholder='Working years' />
                            <div onClick={() => {
                                setUserProfile({ ...userProfile, pastWork: [...userProfile.pastWork, inputData] })
                                setIsModalOpen(false);
                            }} className={styles.connectedButton2} > Add Work</div>
                        </div>

                    </div>
                }
            </DashBoardLayout>
        </UserLayout >
    )
}
