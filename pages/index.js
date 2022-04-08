import Header from "../components/Header"
import Card from "../components/Card"

const style = {
  wrapper: `h-full min-h-screen w-screen flex flex-col bg-[#222229]`,
  cardsContainer: `flex flex-col items-center justify-center flex-1 mt-16`,
}

export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
     
      <div className={style.cardsContainer}>
          <Card />
          
      </div>
      
    </div>
  )
}
