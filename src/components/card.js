import styled from 'styled-components'

export const Cards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`

export const Card = styled.div`
  width: 12.5rem;
  height: 15.625rem;
  border-radius: 1.25rem;
  overflow: hidden;
  margin: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    img {
      opacity: 0.5;
      transition: all 0.5s ease 0s;
    }
  }
`

export const CardImage = styled.img`
  width: 100%;
  height: 12.5rem;
  display: block;
  margin: auto;
  object-fit: cover;
`

export const CardContent = styled.div`
  height: 3.125rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`

export const CardTitle = styled.p`
  color: ${(props) => props.theme.secondary};
  font-size: 1rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const EmptyCard = styled.div`
  width: 12.5rem;
  margin: 1rem;
`
