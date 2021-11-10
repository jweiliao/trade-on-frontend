import styled from 'styled-components'
import { MEDIA_QUERY_MD } from '../../styles/breakpoints'

// style：DeliveryTab
export const DeliveryTab = styled.div`
  width: 100%;

  // 形狀
  clip-path: polygon(75% 0%, 95% 50%, 75% 100%, 0% 100%, 10% 50%, 0% 0%);

  // 根據不同進程的狀態，更換 tab 背景色
  // 完成：primary_200 | 進行中：primary_100 | 尚未進行：general_400
  background-color: ${({ $isActive, $isDone }) => {
    return $isDone
      ? (props) => props.theme.primary_200
      : $isActive
      ? (props) => props.theme.primary_100
      : (props) => props.theme.general_400
  }};
  font-size: 14px;
  text-align: center;
  padding: 9px 0;
  ${MEDIA_QUERY_MD} {
    font-size: 12px;
  }
`
