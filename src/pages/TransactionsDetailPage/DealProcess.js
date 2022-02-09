import styled from 'styled-components'
import { ChevronTab } from '../../components/Tab/tabs'
import dealStatus from '../../constants/dealStatus'

const ProcessWrapper = styled.div`
  display: flex;
  overflow: auto;
`

const Process = styled(ChevronTab)``

const DealProcess = ({ status }) => {
  const { toFillInfo, toCharge, delivering, isCompleted, isCanceled } =
    dealStatus

  switch (status) {
    case toFillInfo:
      return (
        <ProcessWrapper>
          <Process $status={'isActive'}>{toFillInfo}</Process>
          <Process $status={'none'}>{toCharge}</Process>
          <Process $status={'none'}>{delivering}</Process>
          <Process $status={'none'}>{isCompleted}</Process>
        </ProcessWrapper>
      )
    case toCharge:
      return (
        <ProcessWrapper>
          <Process $status={'isPassed'}>{toFillInfo}</Process>
          <Process $status={'isActive'}>{toCharge}</Process>
          <Process $status={'none'}>{delivering}</Process>
          <Process $status={'none'}>{isCompleted}</Process>
        </ProcessWrapper>
      )
    case delivering:
      return (
        <ProcessWrapper>
          <Process $status={'isPassed'}>{toFillInfo}</Process>
          <Process $status={'isPassed'}>{toCharge}</Process>
          <Process $status={'isActive'}>{delivering}</Process>
          <Process $status={'none'}>{isCompleted}</Process>
        </ProcessWrapper>
      )
    case isCompleted:
      return (
        <ProcessWrapper>
          <Process $status={'isPassed'}>{toFillInfo}</Process>
          <Process $status={'isPassed'}>{toCharge}</Process>
          <Process $status={'isPassed'}>{delivering}</Process>
          <Process $status={'isActive'}>{isCompleted}</Process>
        </ProcessWrapper>
      )
    case isCanceled:
      return (
        <ProcessWrapper>
          <Process $status={'none'}>{toFillInfo}</Process>
          <Process $status={'none'}>{toCharge}</Process>
          <Process $status={'none'}>{delivering}</Process>
          <Process $status={'none'}>{isCompleted}</Process>
        </ProcessWrapper>
      )
    default:
      return <ProcessWrapper></ProcessWrapper>
  }
}

export default DealProcess
