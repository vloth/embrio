import 'twin.macro'
import { PropsWithChildren } from 'react'

export function Alarm({ children }: PropsWithChildren<unknown>) {
  return (
    <div
      tw="h-8 p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
      role="alert">
      <span tw="font-semibold mr-2 text-left flex-auto">{children}</span>
      <svg
        tw="fill-current opacity-75 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
      </svg>
    </div>
  )
}
