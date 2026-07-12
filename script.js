async function payNow() {

    const response = await fetch(
        "YOUR_WORKER_URL"
    );

    const order = await response.json();

    const options = {

        key: "YOUR_TEST_KEY_ID",

        amount: order.amount,

        currency: order.currency,

        name: "My Website",

        description: "₹1 Test Payment",

        order_id: order.id,

        handler: function (response) {

            alert(
                "Payment Successful!\n\n" +
                "Payment ID: " + response.razorpay_payment_id
            );

            console.log(response);

        }

    };

    const rzp = new Razorpay(options);

    rzp.open();

}
