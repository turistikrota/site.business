import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to={'/'}>
      <img src='/turistikrota.png' alt='logo' className='h-10 w-10 rounded-md' />
    </Link>
  )
}
