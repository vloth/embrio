import 'twin.macro'
import { Logo } from './Logo'

const menu = {
  Home: '#',
  Insights: '#',
  Settings: '#'
}

export function Navbar() {
  return (
    <header>
      <nav tw="flex items-center justify-between p-6 h-20 bg-white shadow-sm">
        <Logo />
        <ul>
          <li tw="space-x-5 text-xl">{Object.entries(menu).map(Link)}</li>
        </ul>
      </nav>
    </header>
  )
}

function Link([text, link]: [string, string]) {
  return (
    <a
      key={text}
      href={link}
      tw="hidden sm:inline-block text-gray-700 hover:text-indigo-700">
      {text}
    </a>
  )
}
