import React, { useState } from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { SubTitle } from '../../components/heading'
import { LargeButton } from '../../components/buttons'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/FormikControl'
import { ImageUpload } from '../../components/FileUpload/ImageUpload'

const ItemInfoTitle = styled(SubTitle)`
  margin: 3rem 0;
`

const DeliveryMethodTitle = styled(ItemInfoTitle)``

const ItemName = styled.div`
  max-width: 26rem;
`

const Category = styled(ItemName)``

const ItemStatus = styled(ItemName)``

const Description = styled.div`
  max-width: 51rem;
`

const Trading = styled(ItemName)`
  margin-bottom: 0.8rem;
`

const Region = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.8rem;
  select {
    margin: 0.4rem 0;
    width: 9rem;
    height: 1.9rem;
  }
`

const District = styled(Region)`
  input {
    margin: 0.4rem 0;
    width: 9rem;
    height: 1.9rem;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem auto;
  ${MEDIA_QUERY_SM} {
    flex-direction: column-reverse;
  }
`

const AddButton = styled(LargeButton)`
  margin: 0 1.5rem;
  ${MEDIA_QUERY_SM} {
    margin: 1rem 0;
    width: 100%;
  }
`

const CancelButton = styled(AddButton)`
  background: ${(props) => props.theme.general_200};
  &:hover {
    background: ${(props) => props.theme.general_300};
  }
`

export default function AddGiftPage() {
  const categoryOptions = [{ key: '居家用品', value: 'home' }]

  const statusOptions = [
    { key: '全新', value: '全新' },
    { key: '二手', value: '二手' },
  ]

  const tradingOptions = [
    { key: '7-11 店到店', value: '7-11 店到店' },
    { key: '全家店到店', value: '全家店到店' },
    { key: '面交', value: '面交' },
  ]

  const regionOptions = [{ key: '基隆市', value: '基隆市' }]

  // 初始化狀態
  const initialValues = {
    itemName: '',
    category: '',
    description: '',
    itemStatus: '',
    trading: [],
    region: '',
    district: '',
  }

  // 驗證規則
  const validationSchema = Yup.object({
    itemName: Yup.string().required('此欄位為必填'),
    category: Yup.string().required('此欄位為必填'),
    itemStatus: Yup.string().required('此欄位為必填'),
    description: Yup.string().required('此欄位為必填'),
    trading: Yup.array().min(1, '請選擇至少一種交易方式'),
    region: Yup.string().when('trading', (trading, schema) => {
      try {
        if (trading.includes('面交')) {
          return Yup.string().required('請選擇面交縣市')
        }
        return schema
      } catch (error) {
        console.log('error', error)
      }
    }),
    district: Yup.string().when('trading', (trading, schema) => {
      try {
        if (trading.includes('面交')) {
          return Yup.string().required('請填寫面交區域')
        }
        return schema
      } catch (error) {
        console.log('error', error)
      }
    }),
  })

  // 暫放圖片
  const [imageUrl, setImageUrl] = useState([])
  // 取得圖片
  let getImageUrl = (data) => {
    setImageUrl(data)
  }
  console.log(imageUrl)
  // 送出資料
  const onSubmit = (values) => {
    console.log('Save data', JSON.parse(JSON.stringify(values)))
    console.log({ ...values, imageUrl })
  }

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <ItemInfoTitle>禮物資訊</ItemInfoTitle>
            <ItemName>
              <FormikControl
                control="input"
                label="物品名稱"
                name="itemName"
                placeholder="輸入物品名稱"
              />
            </ItemName>
            <Category>
              <FormikControl
                control="select"
                label="物品分類"
                name="category"
                options={categoryOptions}
              />
            </Category>
            <ItemStatus>
              <FormikControl
                control="select"
                label="物品狀態"
                name="itemStatus"
                options={statusOptions}
              />
            </ItemStatus>
            <Description>
              <FormikControl
                control="textarea"
                label="物品介紹"
                name="description"
                placeholder="輸入物品介紹"
              />
            </Description>
            <ImageUpload func={getImageUrl} />
            <DeliveryMethodTitle>交易方式</DeliveryMethodTitle>
            <Trading>
              <FormikControl
                control="checkbox"
                name="trading"
                options={tradingOptions}
              />
              {true && (
                <>
                  <Region>
                    <FormikControl
                      control="select"
                      label="縣市"
                      name="region"
                      options={regionOptions}
                    />
                  </Region>
                  <District>
                    <FormikControl
                      control="input"
                      label="地點"
                      name="district"
                      placeholder="輸入地點"
                    />
                  </District>
                </>
              )}
            </Trading>
            <ButtonsWrapper>
              <CancelButton as={Link} to={'/givings'}>
                取消
              </CancelButton>
              <AddButton type="submit">新增</AddButton>
            </ButtonsWrapper>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
