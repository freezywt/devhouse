import Reserve from "../models/Reserve";
import User from '../models/User';
import House from "../models/House";

class ReserveController {
    async index(req, res){
        const { user_id } = req.headers;

        const reserves = await Reserve.find({ user: user_id });

        Reserve.findById({ _id: reserve._id })
        .populate("house")
        .populate("user")
        .exec(function (err, reserve) {
          return res.json(reserve);
        });

        return res.json(reserves);
    }

    async store(req, res){
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        const house = await House.findById(house_id);
        if(!house){
            return res.status(400).json({error: 'Essa casa nao existe'});
        }

        if(house.status !== true) {
            return res.status(400).json({error: 'Solicitacao indisponivel'});
        }

        const user = await User.findById(user_id);
        if(String(user._id) === String(house.user)) {
            return res.status(400).json({error: 'Reserva nao permitida'});
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date: date,
          });
      
          Reserve.findById({ _id: reserve._id })
            .populate("house")
            .populate("user")
            .exec(function (err, reserve) {
              return res.json(reserve);
            });

        return res.json(reserve);
    }

    async destroy(req, res){

        const { reserve_id } = req.body;
        
        await Reserve.findByIdAndDelete({ _id: reserve_id })

        return res.send();
    }
}

export default new ReserveController();