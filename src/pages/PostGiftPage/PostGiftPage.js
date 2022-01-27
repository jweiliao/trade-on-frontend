import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import { SubTitle } from '../../components/heading'
import { LargeButton } from '../../components/buttons'
import { MEDIA_QUERY_SM } from '../../styles/breakpoints'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import FormikControl from '../../components/FormikControl'
import { ImageUpload } from './ImageUpload'
import usePost from '../../hooks/usePost'
import { district } from '../../constants/cities'

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

export default function PostGiftPage() {
  const {
    postId,
    initialValues,
    validationSchema,
    categoryOptions,
    statusOptions,
    shippingOptions,
    regionOptions,
    districtOptions,
    setDistrictOptions,
    images,
    acceptImagesType,
    maxImagesNumber,
    maxFileSize,
    imageErrorMessage,
    handleImagesChange,
    handleImagesError,
    handleSubmit,
  } = usePost()

  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                name="categoryId"
                options={categoryOptions}
                defaultOption={true}
              />
            </Category>
            <ItemStatus>
              <FormikControl
                control="select"
                label="物品狀態"
                name="itemStatus"
                options={statusOptions}
                defaultOption={true}
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
            <ImageUpload
              images={images}
              acceptImagesType={acceptImagesType}
              maxImagesNumber={maxImagesNumber}
              maxFileSize={maxFileSize}
              imageErrorMessage={imageErrorMessage}
              handleImagesChange={handleImagesChange}
              handleImagesError={handleImagesError}
            />
            <DeliveryMethodTitle>交易方式</DeliveryMethodTitle>
            <Trading>
              <FormikControl
                control="checkbox"
                name="tradingOptions"
                options={shippingOptions}
              />
              <Region>
                <FormikControl
                  control="select"
                  label="縣市"
                  name="region"
                  options={regionOptions}
                  defaultOption={true}
                  onChange={(e) => {
                    const { value } = e.target
                    const selectedCityOfDistricts = [district[value]][0]
                    setDistrictOptions(selectedCityOfDistricts)
                    formik.setFieldValue('region', value)
                    formik.setFieldValue(
                      'district',
                      selectedCityOfDistricts[0].value
                    )
                  }}
                />
              </Region>
              <District>
                <FormikControl
                  control="select"
                  label="鄉鎮(市)區"
                  name="district"
                  options={districtOptions}
                />
              </District>
            </Trading>
            <ButtonsWrapper>
              <CancelButton as={Link} to={'/givings'}>
                取消
              </CancelButton>
              <AddButton type="submit">{postId ? '更新' : '新增'}</AddButton>
            </ButtonsWrapper>
          </Form>
        )}
      </Formik>
    </Container>
  )
}
