import stripeModule from 'stripe';

const stripe = stripeModule('sk_test_51N2bqvSIEzY742rCxgOT7qV0PJmYX1a2QRguWtdrW67Op0YUOaEcxBZKn1kRDva3DoNwk9b2pyGId4D43fsNrdBc00lnYofwco');


export const processPayment = async(req, res) => {
    const paymentIntents = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',

        metadata: { integration_check : 'accept_n_payment'}
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntents.client_secret
    })
}