import React from 'react'
import NavBarComponent from '@/Components/Navbar'
import styles from "./index.module.css"

function UserLayout({ children }) {
  return (
    <div>
      <div className={styles.navbar} >
        <NavBarComponent />
      </div>
      {children}
    </div>
  )
}

export default UserLayout