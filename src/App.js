import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(e.target);
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post(
          "https://stripe-storesrp.onrender.com/api/checkout",
          {
            id,
            amount: 10000,
          }
        );
        setMessage(data.message);
        elements.getElement(CardElement).clear();
        navigate("/api/success-payment");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };
  return (
    <form
      action="/api-checkout"
      method="POST"
      className="card card-body"
      onSubmit={handleSubmit}
    >
      <img
        src="https://i.linio.com/p/9c6664b58a403c0917e9415a33e7bfaa-catalog.jpg"
        alt="corsair_keybord"
        className="img-fluid p-4"
      />

      <h4 className="text-center">Price: 100$</h4>

      <div className="form-group mb-2 ">
        <CardElement className="form-control" required />
      </div>
      <button className="btn btn-warning" disabled={!stripe}>
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            StripeStore
          </a>
        </div>
      </nav>

      <div className="d-block container d-flex flex-row-reverse mt-3">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Click me!!
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-white">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Useful informatiom
                </h1>
                <button
                  type="button"
                  className="btn-close bg-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                You can use 4242 4242 4242 4242 as card number. for the next
                field you need to use a future date,for CVC and C.P you can use
                any number
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Elements stripe={stripePromise}>
        <div className="container p-4">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </Elements>
    </>
  );
}

export default App;
