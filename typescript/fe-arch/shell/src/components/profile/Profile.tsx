import 'twin.macro'
import { useEffect } from 'react'
import { useUserStore } from 'shared/store'
import { Badge } from '../common/Badge'

export function Profile() {
  const user = useUserStore(store => store.user)
  const fetchCurrentUser = useUserStore(store => store.fetchCurrentUser)

  useEffect(function () {
    fetchCurrentUser()
  }, [])

  if (!user) {
    return null
  }

  return (
    <div tw="max-w-sm">
      <div tw="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
        <img tw="rounded-t-lg" src={user.picture} alt="candidate profile" />
        <div tw="py-6 px-8 rounded-lg bg-white">
          <h1 tw="text-gray-700 font-bold text-2xl mb-1 hover:text-gray-900">
            {user.name}
          </h1>
          <span tw="text-indigo-700 font-light text-sm">Applied at&nbsp;</span>
          <span tw="text-indigo-800 font-semibold text-sm mb-2">
            {user.vacancy}
          </span>
          <div tw="flex flex-col my-4 text-gray-700">
            <div tw="flex">
              <svg fill="none" stroke="currentColor" tw="h-6 w-6">
                <path
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h1 tw="px-2 text-sm">{user.location}</h1>
            </div>
            <div tw="flex">
              <svg tw="h-6 w-6" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <h1 tw="px-2 text-sm">{user.phone}</h1>
            </div>
          </div>
          <Badge>New</Badge>
        </div>
      </div>
    </div>
  )
}
