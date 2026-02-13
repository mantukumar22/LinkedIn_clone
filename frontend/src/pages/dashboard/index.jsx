import { getAllPosts } from '@/config/redux/action/postAction';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export default function Dashboard() {

    const router = useRouter();

    const dispath = useDispatch();


    const [isTokenThere, setIsTokenThere] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            router.push("/login")
        }

        setIsTokenThere(true)
    })

    useEffect(() => {
        if(isTokenThere) {
            dispath(getAllPosts())
        }

    }, [isTokenThere])

    return (
        <div>
            Dashboard
        </div>
    )
}
