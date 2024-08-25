import React, { useEffect } from 'react'
import orderOnline from '../assets/order-online.png'
import feedback from '../assets/feedback.png'
import deliveryHours from '../assets/fast-delivery.png'
import people from '../assets/people.png'

function FAQs() {
    useEffect(()=>{
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },[])
  return (
    <>
  <section className='bg-secondary-subtle min-vh-100'>
	<div className="container py-6 ">
		<div className="row">
			<div className="col-md-12 text-center mt-5">
				<div className="lc-block text-center text-md-start my-4">
					<div editable="rich ">
						<h1 className=" text-decoration-underline">Frequently Asked Questions</h1>
					</div>
				</div>
			</div>
		</div>

		<div className="row pt-4">
			<div className="col-md-6 mb-5 ">
				<div className="lc-block p-4 card shadow position-relative h-100">
					<div className="card-body">
						<div className="lc-block position-absolute top-0 mt-n4 bg-info rounded-3 shadow">
                        <img src={orderOnline} height={70} alt="orderOnline" />
						</div>

						<div className="lc-block pt-5 ">
							<div editable="rich">

								<h4 className="">How do I place an order online?</h4>
								<p className="rfs-7">You can place an order through our website by selecting your desired items from the menu and following the checkout process.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-6 mb-5">
				<div className="lc-block p-4 card shadow position-relative h-100">
					<div className="card-body">
						<div className="lc-block position-absolute top-0 mt-n4 bg-info p-2 rounded-3 shadow">
                        <img src={deliveryHours} height={60} alt="deliveryHours"  />
						</div>

						<div className="lc-block pt-5 ">
							<div editable="rich">

								<h4 className="">What are your delivery hours?</h4>
								<p className="rfs-7">Our delivery hours are : 10:00 AM to 12:00 AM. </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="row pt-4">
			<div className="col-md-6 mb-5">
				<div className="lc-block p-4 card shadow position-relative h-100">
					<div className="card-body">
						<div className="lc-block position-absolute top-0 mt-n4 bg-info p-3 rounded-3 shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" className="text-white" viewBox="0 0 16 16" lc-helper="svg-icon">
								<path d="M1 13.5a.5.5 0 0 0 .5.5h3.797a.5.5 0 0 0 .439-.26L11 3h3.5a.5.5 0 0 0 0-1h-3.797a.5.5 0 0 0-.439.26L5 13H1.5a.5.5 0 0 0-.5.5zm10 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5z"></path>
							</svg>
						</div>

						<div className="lc-block pt-5 ">
							<div editable="rich">

								<h4 className="">What should I do if I encounter technical issues with the website?</h4>
								<p className="rfs-7">If you experience any technical issues, please contact our customer service team at  contact.moondine@gmail.com . </p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-6 mb-5">
				<div className="lc-block p-4 card shadow position-relative h-100">
					<div className="card-body">
						<div className="lc-block position-absolute top-0 mt-n4 bg-info p-3 rounded-3 shadow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" fill="currentColor" className="text-white" viewBox="0 0 16 16" lc-helper="svg-icon">
								<path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"></path>
							</svg>
						</div>

						<div className="lc-block pt-5 ">
							<div editable="rich">

								<h4 className="">Can I cancel my order after placing it?</h4>
								<p className="rfs-7">You can cancel your order within 10 minutes of placing it.
                                </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="row pt-4">
			<div className="col-md-6 mb-5">
				<div className="lc-block p-4 card shadow position-relative h-100">
					<div className="card-body">
						<div className="lc-block position-absolute top-0 mt-n4 bg-info rounded-3 shadow">
                        <img src={feedback} height={70} alt="feedback" />
						</div>

						<div className="lc-block pt-5 ">
							<div editable="rich">

								<h4 className="">How do I provide feedback about my order?</h4>
								<p className="rfs-7">We value your feedback. You can leave a review on our website or contact us directly .</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-6 mb-5">
				<div className="lc-block p-4 card shadow position-relative h-100">
					<div className="card-body">
						<div className="lc-block position-absolute top-0 mt-n4 bg-info rounded-3 shadow">
							<img src={people} height={70} alt="people" />
						</div>

						<div className="lc-block pt-5 ">
							<div editable="rich">

								<h4 className="">Can you accommodate large groups or special events?</h4>
								<p className="rfs-7">Yes, we can accommodate large groups and special events. Please contact us to discuss your needs.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
    </>
  )
}

export default FAQs

