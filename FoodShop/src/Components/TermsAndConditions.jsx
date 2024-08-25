import React, { useEffect } from 'react'

function TermsAndConditions() {

    useEffect(()=>{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },[])
      
  return (
    <>
    <div className="bg-success-subtle vh-min-100">
    <div className="container py-5 mt-4">
   <div className="row">
      <div className="col-md-3">
         <div className="lc-block mb-5 mb-md-0">
            <div editable="rich">
               <h1 className="fw-bolder text-decoration-underline">Terms & Conditions</h1>
            </div>
         </div>
      </div>
      <div className="col-md-7 offset-md-1">
         <div className="lc-block mb-4">
            <div editable="rich">
               <p className="h4 text-decoration-underline">Order</p>
               <p>All orders placed through our website are subject to acceptance and availability. <br />
We reserve the right to refuse or cancel any order for any reason. <br />
Prices and availability are subject to change without notice.</p>
            </div>
         </div>
         <div className="lc-block mb-4">
            <div editable="rich">
               <p className="h4 text-decoration-underline">Payment</p>
               <p>Payment must be made at the time of order using the methods specified on our website. <br />
               All payments are processed securely.</p>
            </div>
         </div>
         <div className="lc-block mb-4">
            <div editable="rich">
               <p className="h4 text-decoration-underline">Delivery</p>
               <p>Delivery times are estimates and may vary. <br />
We are not responsible for any delays caused by events outside our control. <br />
Delivery charges will apply as indicated at the time of order.</p>
            </div>
         </div>
         <div className="lc-block mb-4">
            <div editable="rich">
               <p className="h4 text-decoration-underline">Cancellations and Refunds</p>
               <p>Orders may be canceled within [specific time frame] of placing the order & Refunds will be processed.<br />
No refunds will be given for late cancellations or for items delivered as ordered.</p>
            </div>
         </div>
         <div className="lc-block mb-4">
            <div editable="rich">
               <p className="h4 text-decoration-underline">Changes to Terms and Conditions</p>
               <p>We reserve the right to modify these terms and conditions at any time. <br />
               Any changes will be posted on our website and will become effective immediately upon posting.</p>
            </div>
         </div>
      </div>
   </div>
</div> 
</div>
 
   

    </>
  )
}

export default TermsAndConditions