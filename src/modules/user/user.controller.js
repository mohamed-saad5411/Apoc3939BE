import { userModel } from "../../../database/model/user.model.js"
import Stripe from 'stripe';


const register = (async (req, res) => {
    const { name, email, payment, phone } = req.body;
    const user = await userModel.insertMany({ name, email, payment, phone });
    res.json({ Message: 'success', user });
    // let isExist = await userModel.findOne({email})
    // if (!isExist) {
    // }else{
    //     res.json({ Message: 'user is already exist' });
    // }
})

const stripe = new Stripe('sk_test_51RP9hN044uBAHJFxFID697tFgcRyOjdQL1mDR5crsy4pVhtxCTH5LOiqV3DRAF52IpzCeBaTExDEVTNMk52kBMEm00ORXwlnUb');

const createCheckOutSession = async (req, res) => {
    try {
        const { name, email, payment } = req.body;
        let sess = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'egp',
                        unit_amount: payment*100 ,
                        product_data: {
                            name: name
                        }
                    },
                    quantity: 1

                }
            ],
            mode: 'payment',
            success_url: 'https://mohamed-saad5411.github.io/Apoc3939FE/src/success.html',
            cancel_url: 'https://mohamed-saad5411.github.io/Apoc3939FE/src/cancel.html',
            customer_email: email,
            client_reference_id: req.params.id,
            metadata: req.body
        })
        // console.log();
        
        res.json({ message: "success", url: sess?.url, sess })
    } catch (err) {
        // console.log(err);
        
        res.json({ error: err.message })
    }
}

const users = async (req, res) => {
    let users = await userModel.find()
    res.json({ message: 'success', users })
}


export {
    register,
    users, createCheckOutSession
}