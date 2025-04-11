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
            <h1>Our Vision</h1>
            <p>Created by a passionate team of university students, this platform pioneers a 
              new approach to death literacy through accessible digital tools. We offer personalized 
              assessments from individual knowledge quizzes to organizational reports helping users 
              engage meaningfully with end-of-life planning. <br/> <br/>

              Whether you’re seeking clarity on funeral options, supporting a grieving loved one, or 
              researching community death literacy, our platform provides tailored resources to navigate 
              these conversations with confidence.</p>
            </div>
            <img src="/pic/people-talk.jpg" alt="People Talking" className="about-image" />
          </section> 

          <section className={`section ${inView2 ? 'in-view' : ''}`} ref={ref2} id="resource">
            <h2>Resources & Support</h2>
              <div className="card-container">
                <div className="card">
                  <img src="/pic/oldpp.jpg" alt="book" className="card-image" />
                  <h3>Understanding Death Literacy</h3>
                  <p>Death literacy develops our ability to understand and discuss end-of-life matters. 
                    These skills help individuals and communities navigate mortality with greater confidence
                    and compassion. </p>                
                  <Link to="/about" className="btn">Learn More</Link>
                </div>
                <div className="card">
                  <img src="/pic/org.jpg" alt="org" className="card-image" />
                  <h3>For Organisations</h3>
                  <p>Learn how organizations can use the platform to assess, track, and improve death 
                    literacy across teams or communities. Access data insights, and 
                    tailored support through our reseacher's portal.</p>
                  <Link to="/org" className="btn">Learn More</Link>
                </div>
                <div className="card">
                  <img src="/pic/folder.jpg" alt="folder" className="card-image" />
                  <h3>Planning & Support Resources</h3>
                  <p>Explore some practical guides on advance care planning, grief support, and funeral 
                    preparation checklists. These resources are designed to help you feel more imformed, prepared and less alone.</p>
                  <Link to="/resource" className="btn">Learn More</Link>
                </div>
              </div>
          </section> 
          
          <section className={`section ${inView3 ? 'in-view' : ''}`} ref={ref3} id="quiz">
            <h2>Take The Assessment</h2>
            <p>Discover your level of death literacy through a short, thoughtful quiz. Receive personalized feedback and resources to help you grow in knowledge and confidence</p>
            <Link to="/quiz" className="btn">Take Quiz</Link>
          </section>
        </div>
      </div>
      
    </div>
  );
};

export default Home;