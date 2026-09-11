import config from "../../config";
import { getBkashIdToken } from "../../lib/bkash";

const bookAppoinment = async () => {
    // business logic

    const bkashIdToken = await getBkashIdToken();

    if (!bkashIdToken) {
        throw new Error("Bkash ID Token not available");
    }

    const bkashCreatePaymentResponse = await 
    fetch(`${config.bkash_base_url}/tokenized/checkout/payment/create`, {
        method: "POST",
        headers: {  
            'Content-Type': 'application/json',
             Accept: 'application/json',   
            'authorization':  bkashIdToken,  
            "X-APP-Key": config.bkash_app_key
        },
        body: JSON.stringify({
            agreementId: "agreement123",
            mode: "0011",
            payerReference: "01723888888",
            callbackURL: `${config.bkash_callback_url}/book-appoinment/payment-callback`,
            // merchantAssociationInfo: "MI05MID54RF091234560ne",
            amount: "10",
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: "inv001"
        })
    }); 

    const bkashCreatePaymentResult = await bkashCreatePaymentResponse.json();

    // if (!bkashCreatePaymentResponse.ok) {
    //     throw new Error("Bkash Payment Creation Failed");
    // }

    return bkashCreatePaymentResult;
}

export const AppoinmentService = {
    bookAppoinment
}       
