import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { SubTitle } from '../../components/heading'
import { InputFile, InputLabel } from '../../components/textField'
import { LargeButton } from '../../components/buttons'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/FormikControl'

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
const Imgs = styled.div``

const UploadImg = styled(InputFile)``

const ImgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Img = styled.div`
  width: 10rem;
  height: 10rem;
  position: relative;
  border: 0.1rem solid ${(props) => props.theme.secondary};
  border-radius: 0.25rem;
  margin: 1rem 1rem 0 0;
`

const Pic = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`

const Trading = styled(ItemName)`
  margin-bottom: 0.8rem;
`

const Region = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.8rem;
  margin-bottom: 0.8rem;
  select {
    margin: 0.4rem 0;
    width: 9rem;
    height: 1.9rem;
  }
  p {
    margin: 0rem;
  }
`

const RegionLabel = styled.label`
  width: 100%;
`

const District = styled(Region)`
  input {
    margin: 0.4rem 0;
    width: 9rem;
    height: 1.9rem;
  }
`

const DistrictLabel = styled(RegionLabel)``

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
  const categoryOptions = [
    { key: '', value: '' },
    { key: '居家用品', value: 'home' },
  ]

  const statusOptions = [
    { key: '', value: '' },
    { key: '全新', value: '全新' },
    { key: '二手', value: '二手' },
  ]

  const tradingOptions = [
    { key: '7-11 店到店', value: '7-11 店到店' },
    { key: '全家店到店', value: '全家店到店' },
    { key: '面交', value: '面交' },
  ]

  const regionOptions = [
    { key: '', value: '' },
    { key: '基隆市', value: '基隆市' },
  ]

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

  // 送出資料
  const onSubmit = (values) => {
    console.log('Form data', values)
    console.log('Save data', JSON.parse(JSON.stringify(values)))
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
              <FormikControl control="input" label="物品名稱" name="itemName" />
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
              />
            </Description>
            <Imgs>
              <InputLabel>物品圖片</InputLabel>
              <UploadImg />
              <ImgWrapper>
                <Img>
                  <Pic src={`https://source.unsplash.com/random/1`} />
                </Img>
                <Img>
                  <Pic src={`https://source.unsplash.com/random/2`} />
                </Img>
              </ImgWrapper>
            </Imgs>
            <DeliveryMethodTitle>交易方式</DeliveryMethodTitle>
            <Trading>
              <FormikControl
                control="checkbox"
                name="trading"
                options={tradingOptions}
              />
            </Trading>
            {true && (
              <>
                <Region>
                  <RegionLabel>縣市</RegionLabel>
                  <FormikControl
                    control="select"
                    name="region"
                    options={regionOptions}
                  />
                </Region>
                <District>
                  <DistrictLabel>鄉鎮[市]區</DistrictLabel>
                  <FormikControl control="input" name="district" />
                </District>
              </>
            )}
            <ButtonsWrapper>
              <CancelButton>取消</CancelButton>
              <AddButton type="submit">新增</AddButton>
            </ButtonsWrapper>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
