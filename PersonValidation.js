import * as Yup from 'yup'

class PersonValidation{

  async post(body) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })

    let isValid = await schema.isValid(body)

    return {
      isValid,
      message : !isValid ? await schema.validate(body).catch(err => err.errors) : "Valid"
    }
  }

  async put(body) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6)
        .when('oldPassword', (oldPassword, field) => 
          oldPassword ? field.required("Campo password é obrigatório") : field
        ),
        confirmPassword: Yup.string().when('password', (password, field) => 
          password ? field.required("Campo confirmPassword é obrigatório").oneOf([Yup.ref("password")], "Campo confirmPassword tem que ser igual ao campo password") : password
        ),
      email: Yup.string().email()
    })

    let isValid = await schema.isValid(body)

    return {
      isValid,
      message : !isValid ? await schema.validate(body).catch(err => err.errors) : "Valid"
    }
  }

}

export default new PersonValidation()