import React,{useEffect,useState,useContext} from 'react'
const [username,setUsername]=useState("")
const [open, setOpen] = useState(false);
const [amount,setAmount]= useState(0);
const [body,setBody]=useState("body1")


//razorpay
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay(amt) {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const result = await Axios.post("http://localhost:3001/api/payment/orders",{donorId:JSON.parse(localStorage.getItem('user'))._id,postId:_id,ngoId:userId,amount:amt});

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_CYQ81y4KZJOjlT", 
        amount: amount.toString(),
        currency: currency,
        name: JSON.parse(localStorage.getItem('user')).name,
        description: `Donation to ${username}`,
        image: "logo.png",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                donorId:JSON.parse(localStorage.getItem('user'))._id,
                postId:_id,
                ngoId:userId,
                amount:amt,
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
            };

            const result = await Axios.post("http://localhost:3001/api/payment/finalorders", data);

            if(result.data.message=="success"){
                setBody("body2")
                setOpen(true)
            }
        },
        prefill: {
            name: JSON.parse(localStorage.getItem('user')).name,
            email: JSON.parse(localStorage.getItem('user')).email,
            contact: JSON.parse(localStorage.getItem('user')).phone,
        },
        // notes: {
        //     address: "Soumya Dey Corporate Office",
        // },
        theme: {
            color: "#4267B2",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}
//razorpay

          //make payment
    const pay=()=>{
        console.log(amount)
        setOpen(false)
        displayRazorpay(amount)
    }
    //make payment

    //share success
    const share_success=async()=>{
        const data={
        userId:JSON.parse(localStorage.getItem('user'))._id,
        ngoId:_id,
        caption:body2_text
        };
        const result = await Axios.post("http://localhost:3001/api/post/sharesuccess", data);
        setOpen(false)
        history.push("/")
    }
    const dont_share_success=()=>{
        setOpen(false);
        setBody("body1");
        history.push("/")
    }
    //share success

    //modal
    function rand() {
        return Math.round(Math.random() * 20) - 10;
      }
      
      function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
      
        return {
          top: `${50}%`,
          left: `${50}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
      
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 300,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
      const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    
      
        const handleOpen = () => {
            if(post_type=="request"){
                setOpen(true);
            }
            else{

            }
            
        };
      
        const handleClose = () => {
            setBody("body1")
            setOpen(false);  
        };

        const body1 = (
            <div style={modalStyle} className={classes.paper}>
              <div>
                  <h1>Donate to {username}</h1>
                  <TextField onChange={(event)=>{setAmount(event.target.value)}} id="outlined-basic" label="Amount" variant="outlined" />
                  <br/>
                  <button onClick={pay} className="modal_button">Donate</button>
              </div>
            </div>
          );
          const body2 = (
            <div style={modalStyle} className={classes.paper}>
              <div>
                  <div className="share_donation_post">
                    {body2_text}
                  </div>
                  <div>Share it as a post?</div>
                  <button className="modal_button" onClick={(body2_text)=>{share_success(body2_text)}}>Yes</button>
                  <button className="modal_button" style={{marginLeft:10}} 
                  onClick={dont_share_success}>No</button>
              </div>
            </div>
          );
      //modal
      