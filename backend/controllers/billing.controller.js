    // import { PLANS } from "../config/plan.js"
    // import stripe from "../config/stripe.js"

    // export const billing = async (req,res)=> {
    //     try {
    //         const{planType} = req.body
    //         const userId = req.user._id
    //         const plan = PLANS[planType]
    //         if(!plan || plan.price == 0){
    //             return res.status(400).json({message:"invalid paid plan"})
    //         }
    //         const session = await stripe.checkout.sessions.create({
    //             mode:"payment",
    //             payment_method_types:["card"],
    //             line_items:[
    //                 {
    //                     price_data:{
    //                         currency:"usd",
    //                         product_data:{
    //                             name:`Genweb.ai ${planType.toUpperCase()} plan`
    //                         },
    //                         unit_amount:plan.price*100
    //                     },
    //                     quantity: 1
    //                 }
    //             ],
    //             metadata:{
    //                 userId:userId.toString(),
    //                 credits:plan.credits,
    //                 plan:plan.plan
    //             },
    //             success_url:`${process.env.FRONTEND_URL}/`,
    //             cancel_url:`${process.env.FRONTEND_URL}/pricing`
    //         })
    //         return res.status(200).json({
    //             sessionUrl:session.url
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({message:`billing error: ${error}`})
    //     }
    // }




    import stripe from "../config/stripe.js";
    import User from "../models/user.model.js";
    import { PLANS } from "../config/plans.js";

    // 1. Handles creating the checkout session
    export const billing = async (req, res) => {
        try {
            const { planType } = req.body;
            const userId = req.user._id;
            const plan = PLANS[planType?.toLowerCase()];

            if (!plan || plan.price == 0) {
                return res.status(400).json({ message: "invalid paid plan" });
            }

            const session = await stripe.checkout.sessions.create({
                mode: "payment",
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: `Genweb.ai ${planType.toUpperCase()} plan`
                            },
                            unit_amount: plan.price * 100
                        },
                        quantity: 1
                    }
                ],
                metadata: {
                    userId: userId.toString(),
                    credits: plan.credits.toString(), 
                    plan: plan.plan
                },
                success_url: `${process.env.FRONTEND_URL}/`,
                cancel_url: `${process.env.FRONTEND_URL}/pricing`
            });

            return res.status(200).json({ sessionUrl: session.url });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: `billing error: ${error}` });
        }
    };

    // 2. Handles the incoming event after successful payment
    export const stripeWebhook = async (req, res) => {
        const sig = req.headers["stripe-signature"];
        let event;

        try {
            // req.body here MUST be a raw Buffer, provided by express.raw() in the router
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (error) {
            console.error("❌ Webhook Signature Verification Failed:", error.message);
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const userId = session.metadata.userId;
            const credits = Number(session.metadata.credits);
            const plan = session.metadata.plan;

            try {
                await User.findByIdAndUpdate(userId, {
                    $inc: { credits: credits },
                    $set: { plan: plan } // Use $set to explicitly update the string field cleanly
                });
                console.log(`✅ Successfully provisioned ${credits} credits to User: ${userId}`);
            } catch (dbError) {
                console.error("❌ Database update failed:", dbError);
                return res.status(500).json({ message: "Internal server database error" });
            }
        }

        // Acknowledge receipt of the event
        return res.status(200).json({ received: true });
    };