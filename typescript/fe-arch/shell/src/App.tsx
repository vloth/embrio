import 'twin.macro'
import { lazy, Suspense, useState, useEffect } from 'react'
import { FederatedModules } from 'shared/types'

import { Navbar } from './components/navbar/Navbar'
import { Profile } from './components/profile/Profile'
import { Alarm } from './components/common/Alarm'

const UserInfo = lazy<FederatedModules.Candidate.UserInfo>(
  () => import('candidate/UserInfo')
)

export function App() {
  const [message, setMessage] = useState<string>('')

  const onUserInfoSaved = () => {
    setMessage('user info changed!')
  }

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(''), 3000)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <>
      <Navbar />
      <div tw="mx-auto p-4 flex gap-4">
        <Profile />
        <Suspense fallback={'loading...'}>
          <UserInfo onSave={onUserInfoSaved} />
        </Suspense>
        {message && <Alarm>{message}</Alarm>}
      </div>
    </>
  )
}
