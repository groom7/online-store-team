import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import DetailsComponent from '../../components/Details/Details'
import { DetailsProps } from '../../types/Response'

function Details({loading, setModalActive} : DetailsProps) {
  return (
    <>
      <Header />
        <DetailsComponent loading={loading} setModalActive={setModalActive}/>
      <Footer />
    </>
  )
}

export default Details