import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { supabase } from '../config/supabase-client';

function PaymentPortal() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {locationNameOut, planOut, swimmingCentresOut} = location.state;

  const createTransaction = async (user, location, swimmingCenter, plan, msg) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert({ user_id: user, location_name: location, swimming_center: swimmingCenter, plan_name: plan, status: msg });
    
    if (error) {
      console.error('Error inserting transaction:', error.message);
      return null;
    } else {
      navigate("/profile")
    }
    
    return data;
  };
  

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Payment Portal</h1>
        <p className="mb-2"><span className="font-bold">Plan:</span> {planOut}</p>
        <p className="mb-2"><span className="font-bold">Location:</span> {locationNameOut}</p>
        <p className="mb-4"><span className="font-bold">Swimming Center:</span> {swimmingCentresOut}</p>
        <button onClick={() => createTransaction(user.id, locationNameOut, swimmingCentresOut, planOut, 'failure')} className="w-full py-2 mb-2 bg-red-500 text-white rounded hover:bg-red-600">Failure</button>
        <button onClick={() => createTransaction(user.id, locationNameOut, swimmingCentresOut, planOut, 'success')} className="w-full py-2 mb-2 bg-green-500 text-white rounded hover:bg-green-600">Success</button>
        <button onClick={() => createTransaction(user.id, locationNameOut, swimmingCentresOut, planOut, 'pending')} className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Pending</button>
      </div>
    </div>
  )
}

export default PaymentPortal