import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div>
      Payment success! Return to <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default PaymentSuccess;
