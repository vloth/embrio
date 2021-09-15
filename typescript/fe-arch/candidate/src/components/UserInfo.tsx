import 'twin.macro'
import { useEffect, useState, MouseEvent, ChangeEvent } from 'react'
import { FederatedModules } from 'shared/types'
import { useUserStore } from 'shared/store/index'
import { Input } from './common/Input'
import { Button } from './common/Button'

const UserInfo: FederatedModules.Candidate.UserInfo = ({ onSave }) => {
  const user = useUserStore(store => store.user)
  const updateName = useUserStore(store => store.updateName)
  const [name, setName] = useState<string>('')

  useEffect(
    function () {
      if (user) setName(user.name)
    },
    [user]
  )

  if (!user) {
    return null
  }

  const save = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    updateName(name)
    onSave && onSave()
  }

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <form tw="w-full max-w-sm">
      <h1 tw="text-xl text-indigo-900">Update user:</h1>
      <div tw="md:flex">
        <Input value={name} onChange={onNameChange} />
      </div>
      <Button onClick={save}>Save</Button>
    </form>
  )
}

export default UserInfo
