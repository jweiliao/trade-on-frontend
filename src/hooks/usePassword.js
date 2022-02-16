import { useContext } from 'react'
import { useHistory } from 'react-router'
import AuthContext from '../contexts'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { updateUserPassword } from '../WebAPI'

export default function usePassword() {
  const {
    user: { id },
  } = useContext(AuthContext)
  const history = useHistory()
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('此欄位為必填'),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})/,
        '長度至少 6 位，包含英文、數字'
      )
      .required('此欄位為必填'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], '請再次確認密碼')
      .required('此欄位為必填'),
  })
  const handleSubmit = (data) => {
    updateUserPassword(id, data)
      .then((res) => {
        const { data } = res
        if (data.message.includes('success')) {
          Swal.fire({
            icon: 'success',
            title: '密碼更改成功',
            showConfirmButton: false,
            timer: 1500,
          })
          history.push('/portfolio')
        }
      })
      .catch((err) => {
        if (
          err.response.data.error &&
          err.response.data.error.includes('new password is identical')
        ) {
          Swal.fire({
            icon: 'error',
            title: '錯誤',
            text: '新密碼不得與目前密碼相同',
            showConfirmButton: true,
            confirmButtonColor: '#B7B7B7',
            confirmButtonText: '關閉',
          })
          return
        }
        if (
          err.response.data.error &&
          err.response.data.error.includes('old password does not match')
        ) {
          Swal.fire({
            icon: 'error',
            title: '更改失敗',
            text: '目前密碼輸入錯誤',
            showConfirmButton: false,
            timer: 1500,
          })
          return
        }
        if (
          err.response.data.message &&
          err.response.data.message.includes('primary user')
        ) {
          Swal.fire({
            icon: 'error',
            title: '更改失敗',
            text: '無法變更預設管理員的密碼',
            showConfirmButton: false,
            timer: 1500,
          })
        }
      })
  }

  return { initialValues, validationSchema, handleSubmit }
}
