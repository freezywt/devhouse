//metodos : index, show, update, store, destroy
/* 
    index: listagem de sessoes
    store: criar uma nova sessao
    show: listar uma unica sessao
    update: quando queremos alterar alguma sessao
    destroy: quando queremos deletar uma sessao
*/
import User from '../models/User';
import * as Yup from 'yup';

class SessionController{
    async store(req, res){

        const schema = Yup.object().shape({
            email: Yup.string().required().email(),
        });

        const { email } = req.body;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validacao'});
        }

        //verificando se esse usuario ja existe
        let user = await User.findOne({ email });

        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
}

export default new SessionController();