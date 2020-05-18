import dbConnect from '../../../utils/dbConnect';
import Users from '../../../models/Users';
import { jwtdecode } from "../../../utils/auth";
import Payouts from '../../../models/Payouts';

dbConnect();

export default async(req, res) => {
    const { 
        query: { id },
        method 
    } = req;

    const decodesecurepass = await jwtdecode(req.headers.securepass)
    if(decodesecurepass !== process.env.SECURE_PASS){
        return res.status(400).json({ success:false });
    }

    switch  (method) {
        case 'GET':
            try{


                const payouts = await Payouts.find({ user: id });

               
                return res.status(200).json({ success: true, payouts: payouts });

            } catch (error) {
                return res.status(400).json({ success:false });
            }
            break;

    
        default:
            return res.status(400).json({ success:false });
            break;

    }
}