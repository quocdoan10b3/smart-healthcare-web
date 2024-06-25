import * as Yup from 'yup'

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  username: Yup.string().required('Tên tài khoản là bắt buộc'),
  fullName: Yup.string().required('Họ và tên là bắt buộc')
})

export const initialForgotPasswordValues = {
  email: '',
  username: '',
  fullName: ''
}
