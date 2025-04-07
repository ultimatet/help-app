import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.2 });
const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.2 });
const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.2 });

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="section-container" >
        <section className={`section ${inView1 ? 'in-view' : ''}`} ref={ref1} id="about">
          <div>
            <h2>Our Vision</h2>
          <p>Created by a passionate team of university students, this platform pioneers a 
            new approach to death literacy through accessible digital tools. We offer personalized 
            assessments from individual knowledge quizzes to organizational reports helping users 
            engage meaningfully with end-of-life planning. <br/> <br/>

            Whether you’re seeking clarity on funeral options, supporting a grieving loved one, or 
            researching community death literacy, our platform provides tailored resources to navigate 
            these conversations with confidence.</p>
          <Link to="/about" className="btn btn-secondary">About HELP.</Link>
          </div>
          <img src="/pic/people-talk.jpg" alt="People Talking" className="about-image" />
        </section> <hr/>

        <section className={`section ${inView2 ? 'in-view' : ''}`} ref={ref2} id="resource">
          <h2>Resources & Support</h2>
          <p>Find resources and support for end-of-life planning.</p>
          <Link to="/resource" className="btn btn-secondary">Explore Resources</Link>
        </section> <hr/>
        
        <section className={`section ${inView3 ? 'in-view' : ''}`} ref={ref3} id="contact">
          <h2>Contact Us</h2>
          <p>If you have any questions or feedback, feel free to reach out.</p>
          <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
        </section> <hr/>
      </div>
      </div>
      
    </div>
  );
};

export default Home;