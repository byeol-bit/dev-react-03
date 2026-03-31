import { formatNumber } from '../utils/format'

const COUNT = 10000;

const Home = () => {
  return (
    <>
      <div>Home body</div>
      <div>count: {formatNumber(COUNT)}</div>
    </>
  )
}

export default Home