import * as Yup from 'yup'

class PessoaValidation{

  constructor(){
    this.post = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(6)
    })
  }

}

export default new PessoaValidation()