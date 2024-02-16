import './Beasts.css'
const Beasts = ({ s, k }: any) => {
  return (
    <div className="flex items-start justify-center absolute top-0 pointer-events-none overflow-visible w-full h-[5960px] overflow-x-hidden">
      <img
        className="origin-top elk"
        src="/images/elk.svg"
      />
      <img
        className="origin-top absolute"
        src="/images/bear.svg"
        style={{
          transform: `
            translateX(${793 / k + (1 - s / 1)}px) 
            translateY(${1166 / k}px) 
            scale(${1 / k})`,
        }}
      />
      <img
        className="origin-top absolute"
        src="/images/gorilla.svg"
        style={{
          transform: `
              translateX(${312 / k}px) 
              translateY(${2660 / k}px) 
              scale(${1 / k})`,
        }}
      />
    </div>
  )
}

export default Beasts
