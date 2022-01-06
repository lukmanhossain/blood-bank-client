import React, { useEffect, useState } from 'react';
import './HomeDonor.css'
import HomeDonorData from './HomeDonorData';
import { useForm } from "react-hook-form";

const HomeDonor = () => {
    const [donors, setDonor]=useState([])
    const [uidonor, setUidonor]=useState([])


    const { register, handleSubmit } = useForm();

     const onSubmit = data =>{ 
     
       const seacredonor = donors.filter(donor => donor?.bloodGroup === data.bloodGroup)
       setUidonor(seacredonor)
      };

    useEffect(()=>{ 
        fetch('http://hidden-coast-99117.herokuapp.com/donateBlood')
        .then(res => res.json())
        .then(data => {
          setDonor(data);
          setUidonor(data);
        })
      },[])
      

      if(!donors.length){
          return <button class="btn btn-primary spner-btn" type="button" disabled>
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Loading...
        </button>
      };

  
      


    return (
        <div>
          <div className='Searce-Fild'>
            
          <form onSubmit={handleSubmit(onSubmit)} className='search-option'>

          <h3 className='Donor-src'>Donor Search</h3>
            <div className='select-option'>
            <small className='smaill-css'>Blood Group</small>
            <select {...register("bloodGroup")} className='mb-3'>
              <option value="A+">A+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>
              <option value="B+">B+</option>
              <option value="A-">A-</option>
              <option value="O-">O-</option>
              <option value="AB-">AB-</option>
              <option value="B-">B-</option> 
            </select>
            <input type="submit" value="Search" className='searce-btn' />
            </div>
           
           
           
          </form>
          </div>


           <div className='row mx-3 mb-5'>
           {
            uidonor.map(donordata => <HomeDonorData
            donordata={donordata}
            key={donordata._id}
            
            ></HomeDonorData>)   
           }
           </div>
        </div>
    );
};

export default HomeDonor;