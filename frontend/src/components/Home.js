import React from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.2 });
const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.2 });
const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.2 });

  return (
    <div className="container">
      <div className="section-container" >
        <div className={`section ${inView1 ? 'in-view' : ''}`} ref={ref1} id="about">
          <h2>About Us</h2>
          <p>Learn about the team.</p>
          <Link to="/about" className="btn btn-secondary">About HELP.</Link>
        </div> <hr/>
        <div className={`section ${inView2 ? 'in-view' : ''}`} ref={ref2} id="resource">
          <p>Find resources and support for end-of-life planning.</p>
          <Link to="/resource" className="btn btn-secondary">Explore Resources</Link>
        </div> <hr/>
        <div className={`section ${inView3 ? 'in-view' : ''}`} ref={ref3} id="org">
          <h2>For Organisations</h2>
          <p>Discover how organisations can promote death literacy.</p>
          <Link to="/org" className="btn btn-secondary">Get Involved</Link>
        </div> <hr/>
      </div>
    </div>
  );
};

export default Home;