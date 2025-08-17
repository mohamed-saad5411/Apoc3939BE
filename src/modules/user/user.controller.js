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

// const stripe = new Stripe('sk_test_51RP9hN044uBAHJFxFID697tFgcRyOjdQL1mDR5crsy4pVhtxCTH5LOiqV3DRAF52IpzCeBaTExDEVTNMk52kBMEm00ORXwlnUb');

const createCheckOutSession = async (req, res) => {
    const username = "merchant.TESTQNBAATEST001";

    // const password = "9c6a123857f1ea50830efa023ad8c8d1b";
    const password = "9c6a123857f1ea50830fa023ad8c8d1b";

    const token = Buffer.from(`${username}:${password}`).toString("base64");
    const order = req.body?.order ?? {
        id: "ORDER-" + Date.now(),
        amount: "10.00",
        currency: "EGP",
        description: "TEST ORDER"
    };

    const payload = {
        apiOperation: "INITIATE_CHECKOUT",
        interaction: { timeout: "1800", returnUrl: "https://google.com" },
        order
    };

    try {

        const mpgsRes = await fetch("https://qnbalahli.test.gateway.mastercard.com/api/rest/version/72/merchant/TESTQNBAATEST001/session", {
            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization": `Basic ${token}`

            },

            body: JSON.stringify(req.body)

        });

        const data = await mpgsRes.text();

        res.status(mpgsRes.status).send(data);

    } catch (err) {

        res.status(500).send(err.toString());

    }
}

// const createCheckOutSession = async (req, res) => {
//     const username = "merchant.TESTQNBAATEST001";

//     // const password = "9c6a123857f1ea50830efa023ad8c8d1b";
//     const password = "9c6a123857f1ea50830fa023ad8c8d1b";

//     const token = Buffer.from(`${username}:${password}`).toString("base64");
//     const order = req.body?.order ?? {
//         id: "ORDER-" + Date.now(),
//         amount: "10.00",
//         currency: "EGP",
//         description: "TEST ORDER"
//     };

//     const payload = {
//         apiOperation: "INITIATE_CHECKOUT",
//         interaction: { timeout: "1800", returnUrl: "https://google.com" },
//         order
//     };

//     try {

//         const mpgsRes = await fetch("https://qnbalahli.test.gateway.mastercard.com/api/rest/version/72/merchant/TESTQNBAATEST001/session", {
//             method: "POST",

//             headers: {

//                 "Content-Type": "application/json",

//                 "Authorization": `Basic ${token}`

//             },

//             body: JSON.stringify(payload)

//         });
//         console.log("MPGS status:", mpgsRes.status, mpgsRes.statusText);
//         let data;

//         const text = await mpgsRes.text();
//         try { data = JSON.parse(text); } catch { data = null; }
//         if (!mpgsRes.ok) {
//             // Forward MPGS error to client for visibility
//             return res.status(mpgsRes.status).json({
//                 error: true,
//                 message: "MPGS returned non-OK status",
//                 status: mpgsRes.status,
//                 raw: data || text
//             });

//         }

//         // Success path: flatten sessionId for the frontend
//         if (data?.session?.id) {
//             return res.json({
//                 result: data.result,
//                 sessionId: data.session.id,
//                 successIndicator: data.successIndicator,
//                 order
//             });

//         }

//         return res.status(502).json({
//             error: true,
//             message: "Unexpected MPGS response shape",
//             raw: data || text
//         });

//     } catch (err) {
//         console.error("MPGS call failed:", err);
//         return res.status(500).json({ error: true, message: err.message });
//     }
// }


// strip
// const createCheckOutSession = async (req, res) => {
//     try {
//         const { name, email, payment } = req.body;
//         let sess = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'egp',
//                         unit_amount: payment * 100,
//                         product_data: {
//                             name: name
//                         }
//                     },
//                     quantity: 1

//                 }
//             ],
//             mode: 'payment',
//             success_url: 'https://mohamed-saad5411.github.io/Apoc3939FE/src/success.html',
//             cancel_url: 'https://mohamed-saad5411.github.io/Apoc3939FE/src/cancel.html',
//             customer_email: email,
//             client_reference_id: req.params.id,
//             metadata: req.body
//         })
//         // console.log();

//         res.json({ message: "success", url: sess?.url, sess })
//     } catch (err) {
//         // console.log(err);

//         res.json({ error: err.message })
//     }
// }

const users = async (req, res) => {
    let users = await userModel.find()
    res.json({ message: 'success', users })
}


export {
    register,
    users, createCheckOutSession
}



// {
//     "apiOperation": "INITIATE_CHECKOUT",
//         "interaction" : {
//         "timeout" : "1800",
//             "returnUrl" : "https://google.com",
//                 "operation" : "PURCHASE",
//                     "merchant" : {
//             "name" : "Montasser"
//         }
//     },
//     "order" : {
//         "currency" : "EGP",
//             "id" : "9e4bcfee-f5d1-40dc-8188-7b333d18e1z8",
//                 "reference" : "7361352a-b2b3-4c4f-954d-153322b867ne",
//                     "amount" : "100",
//                         "description" : "TEST Order"
//     },
//     "transaction" : {
//         "reference" : "QNBAA_TESTING_274"
//     }
// }