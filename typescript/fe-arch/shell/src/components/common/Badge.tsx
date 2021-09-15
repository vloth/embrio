import 'twin.macro'

type BadgeProps = React.PropsWithChildren<unknown>

export function Badge({ children }: BadgeProps) {
  return (
    <span tw="inline-block rounded-full text-white bg-indigo-500 px-2 py-1 text-xs font-bold mr-3">
      {children}
    </span>
  )
}
