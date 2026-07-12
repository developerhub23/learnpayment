function generateQR(){

document.getElementById("qrcode").innerHTML="";

const upi =
"upi://pay?pa=YOUR_UPI_ID@bank&pn=Rishi&am=1&cu=INR&tn=Demo Payment";

new QRCode(document.getElementById("qrcode"),{

text:upi,
width:250,
height:250

});

}
