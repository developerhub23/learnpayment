async function payNow() {

    const button = document.querySelector("button");
    const status = document.getElementById("status");

    button.disabled = true;
    button.innerText = "Please Wait...";
    status.innerHTML = "Creating Razorpay Order...";

    try {

        const response = await fetch("https://rough-frost-0867.anishdey0602.workers.dev/", {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("HTTP Error : " + response.status);
        }

        const order = await response.json();

        console.log("Order Received:", order);

        if (!order.id) {
            console.error(order);
            throw new Error("Invalid Order received from backend.");
        }

        var options = {

            key: "rzp_test_TCdvMJSoFybix6",

            amount: order.amount,

            currency: order.currency,

            order_id: order.id,

            name: "My Demo Website",

            description: "₹1 Test Payment",

            image: "",

            handler: function (response) {

                console.log("Payment Success");

                console.log(response);

                status.innerHTML =
                    "<h3 style='color:green'>Payment Successful</h3>" +
                    "<br>" +
                    "Payment ID:<br>" +
                    response.razorpay_payment_id;

            },

            modal: {

                ondismiss: function () {

                    status.innerHTML =
                        "<span style='color:red'>Payment Cancelled</span>";

                    console.log("Popup Closed");

                }

            },

            prefill: {

                name: "Rishi"

            },

            theme: {

                color: "#3399cc"

            }

        };

        var rzp = new Razorpay(options);

        rzp.on("payment.failed", function (response) {

            console.log("Payment Failed");

            console.log(response.error);

            status.innerHTML =
                "<span style='color:red'>Payment Failed</span>";

        });

        rzp.open();

    }

    catch (error) {

        console.error(error);

        status.innerHTML =
            "<span style='color:red'>" +
            error.message +
            "</span>";

        alert(error.message);

    }

    finally {

        button.disabled = false;

        button.innerText = "Pay ₹1";

    }

}
