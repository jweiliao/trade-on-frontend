import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getDealMessages, addMessage, deleteMessage } from '../WebAPI'

export default function useDealMessage() {
  const { id: tradeRecordId } = useParams()
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState([])
  const [days, setDays] = useState([])
  const isTextAreaDisabled = value.trim().length === 0

  const fetchMessage = useCallback(() => {
    const fetchingMessage = async () => {
      const {
        data: { dealMessages },
      } = await getDealMessages(tradeRecordId)
      if (dealMessages) setMessages(dealMessages)
    }

    fetchingMessage()
  }, [tradeRecordId])

  useEffect(() => {
    fetchMessage()
  }, [fetchMessage])

  useEffect(() => {
    let daysData = []
    if (messages) {
      daysData = messages.map((dealMessage) => {
        return dealMessage.createdAt.split(' ')[0]
      })
    }
    setDays([...new Set(daysData)])
  }, [messages])

  const handleMessageInput = (e) => {
    setValue(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      handleAddMessage()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddMessage()
  }

  const handleAddMessage = () => {
    const content = value.trim()
    if (content.length === 0) return
    const newMessage = {
      content,
      messageType: 'transaction',
      relatedId: tradeRecordId,
    }
    addMessage(newMessage).then((res) => {
      if (res.data.message === 'success') {
        fetchMessage()
        setValue('')
      }
    })
  }

  const handleDeleteMessage = (id) => {
    deleteMessage(id).then((res) => {
      if (res.data.message === 'success') {
        setMessages(
          messages.map((message) => {
            if (message.id !== id) return message
            return {
              ...message,
              isDeleted: true,
            }
          })
        )
      }
    })
  }

  return {
    value,
    isTextAreaDisabled,
    days,
    messages,
    handleMessageInput,
    handleKeyPress,
    handleSubmit,
    handleDeleteMessage,
  }
}
