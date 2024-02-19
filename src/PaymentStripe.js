import React, {  useState,useEffect } from 'react'

const PaymentStripe = () => {
    const ProductDisplay = () => (
        <section>
          <div className="product">
            <img
              src="https://i.imgur.com/EHyR2nP.png"
              alt="The cover of Stubborn Attachments"
            />
            <div className="description">
            <h3>Payment Subscription</h3>
            <h5>$500.00</h5>
            </div>
          </div>
          <form action="https://distributionresolutionapi.com/subscription/create-checkout-session" method="POST">
          {/* <form action="http://127.0.0.1:5000/subscription/create-checkout-session" method="POST"> */}
          
          {/* <input type="hidden" name="Starter Subscription" value="price_1NuqTwBZOj0ItyZLmmS4o0dX" /> */}
          <input type="hidden" name="Starter Subscription" value="price_1NvHmhBZOj0ItyZLTRHgEmBb" />
            <button type="submit">
              Checkout
            </button>
          </form>
        </section>
      );
      
      const Message = ({ message }) => (
        <section>
          <p>{message}</p>
        </section>
      );
      
        const [message, setMessage] = useState("");
      
        useEffect(() => {
          // Check to see if this is a redirect back from Checkout
          const query = new URLSearchParams(window.location.search);
      
          if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
          }
      
          if (query.get("canceled")) {
            setMessage(
              "Order canceled -- continue to shop around and checkout when you're ready."
            );
          }
        }, []);
      

    return message ? (
        <Message message={message} />
      ) : (
        <ProductDisplay />
      );
    

}
export default PaymentStripe;