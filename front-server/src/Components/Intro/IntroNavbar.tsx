import { MouseEventHandler } from "react"
import { useNavigate } from "react-router-dom"

function IntroNavbar():JSX.Element {
  const navigate = useNavigate()
  const onClick:MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if (target.ariaLabel === 'main') {
      navigate('/main')
    } else if (target.ariaLabel === 'mypage') {
      navigate('/mypage')
    }
  }

  return (
    <div className="w-full" style={{borderBottom: 'solid 4px rgba(234,234,234,0.5)'}}>
    <div id='header' role={'banner'} className='container max-w-screen-xl w-[80%] h-12 flex justify-center items-center mx-auto'>
      {/* 헤더 */}
      <div className="flex justify-between items-center w-full bg-white text-[#A87E6E] " >
        <div aria-label="main" className='font-bold text-[0.3rem] sm:text-[0.5rem] md:text-[0.8rem] lg:text-[1rem] cursor-pointer' onClick={onClick}>홍민정음</div>
        <div className='flex justify-center text-[0.5rem] md:text-[0.55rem] lg:text-[0.85rem]'>
        </div>
      </div>
    </div>
  </div>
  )
}
export default IntroNavbar