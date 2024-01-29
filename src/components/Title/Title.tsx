import React from 'react'
import styles from './title.module.scss'
function Title() {
  console.log('Title')
  return <h1 className={styles.title}>To do list typescript</h1>
}

export default React.memo(Title)
