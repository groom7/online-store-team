import React from 'react'
import DetailsComponent from '../../components/Details/Details'
import { DetailsProps } from '../../types/Response'

function Details({loading, setModalActive} : DetailsProps) {
  return (
    <>
    <DetailsComponent loading={loading} setModalActive={setModalActive}/>
    </>
  )
}

export default Details