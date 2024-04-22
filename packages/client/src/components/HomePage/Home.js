import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavBar from '../SideNavBar/SideNavBar';
import '../../assets/HomePageStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import BillAlert from '../BillAlert/BillAlert';
import { setBillAlertStatus } from '../../features/userSlice';

function Home() {


  const user = useSelector((state) => state.user);
  const userName = user.user.userName;
  const alertBillStatus = user.billAlertStatus;
  const [alertBills, setAlertBills] = useState([]);
  const [isAlertBillPopUp, setAlertBillPopUp] = useState(false);
  const [flag, setFlag] = useState(true);
  const [navBarisToggle, setNavBarisToggle] = useState(false);

  console.log("Alert Bill Status: " + alertBillStatus);

  const dispatch = useDispatch();

  const fetchBillAlert = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/BillReminders/fetchBillAlert?userName=${userName}`);
      setAlertBills(response.data.alertBills);
      setAlertBillPopUp(true);

    } catch (e) {
      console.log(e);
    }
  }

  const setCrossClick = async () => {
    setAlertBillPopUp(false);
    setFlag(false);

    dispatch(setBillAlertStatus({
      alertStatus: false,
    }))
  }

  useEffect(() => {
    if (alertBillStatus) {
      fetchBillAlert();
    }

  }, []);

  const setNavBarTogggle = () => {
    setNavBarisToggle(!navBarisToggle);
  }


  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div >
        <SideNavBar
          isToggle={setNavBarTogggle}
        />
      </div>

      {navBarisToggle && <div className="Model"></div>}

      <div className="content">
        <div className="content-row">
          <div className="HomePageCards" id="transaction-history">
            <h2>Transaction History</h2>
            <p>Store and track your transactions month wise easily.</p>
            <button className="explore-button"
              onClick={() => navigate("/Transact")}
            >Explore</button>
          </div>

          <div className="HomePageCards" id="transaction-history">
            <h2>FinanceFeed</h2>
            <p>Stay Informed with the Latest Financial News</p>

            <button className="explore-button"
              onClick={() => navigate("/Main")}
            >Explore</button>
           
          </div>
        </div>

        <div className="content-row">
          <div className="HomePageCards" id="transaction-history">
            <h2>Graphs</h2>
            <p>Visualize and track your total monthly expenditure and plan accordingly</p>
           
            <button className="explore-button"
              onClick={() => navigate("/Graphs")}
            >Explore</button>
   
          </div>

          <div className="HomePageCards" id="transaction-history">
            <h2>Bill reminders</h2>
            <p>Never miss a payment with reminder feature, ensuring you stay on top of your financial commitments effortlessly.</p>
      
            <button className="explore-button"
              onClick={() => navigate("/BillReminder")}
            >Explore</button>
            
          </div>
        </div>

        <div className="content-row">
          <div className="HomePageCards" id="transaction-history">
            <h2>Past bills</h2>
            <p>Get a history of past bills.</p>
         
            <button className="explore-button"
              onClick={() => navigate("/PastBills")}
            >Explore</button>
      
          </div>
        </div>

      </div>

      {isAlertBillPopUp && alertBills.length != 0 && <div className="Model"><BillAlert alertBills={alertBills} onCrossClick={setCrossClick} /></div>}

    </div>
  );
};

export default Home;
