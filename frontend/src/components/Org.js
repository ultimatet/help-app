import React from "react";
import "./Org.css";

const Org = () => {
    return (
        <div className="org">
            <img src="/pic/tree.svg" alt="tree" />
            <div className="org-container">
                <section className="org-block">
                    <h2>Why It Matters for Organizations</h2>
                    <p>
                        High levels of death literacy in organizations foster a supportive culture
                        where staff, clients, and community members can engage with death-related
                        topics confidently and respectfully. It enhances decision-making, improves
                        end-of-life care outcomes, and promotes emotional wellbeing by reducing
                        confusion, distress, and isolation during critical moments.
                    </p>
                </section>

                <section className="org-block">
                    <h2>What HELP Offers</h2>
                    <ul>
                        <li>Confidential assessments for staff or community members</li>
                        <li>Personalized PDF reports with insights and guidance</li>
                        <li>Data export options for strategic planning</li>
                    </ul>
                </section>

                <section className="org-block">
                    <h2>Why Partner With Us</h2>
                    <p>
                        Partnering with HELP empowers your people with crucial knowledge, provides
                        your organization with valuable anonymised insights from your cohort to
                        inform your support strategies, and contributes to significant national
                        research in death literacy. Individual privacy is always our priority.
                        <br />
                        <br />
                        The HELP platform equips your organization to assess and improve death
                        literacy. We offer a user-friendly and confidential experience for your
                        members or employees, delivering tailored reports to guide end-of-life
                        preparedness and understanding.
                        <br />
                    </p>
                </section>

                <section className="org-block">
                    <h2>How to Get Started</h2>
                    <p>
                        Getting started with HELP is simple. We’ll walk your organization through
                        the onboarding process, assist with user setup, and provide access to
                        training materials if needed. Whether you're a large institution or a small
                        community service, our team is here to ensure a smooth rollout and ongoing
                        support.
                        <br />
                        <br />
                        To express interest or schedule a demo, please reach out—we'd love to
                        explore how we can support your goals.
                    </p>
                    <br />
                    📧 <strong>Email:</strong> info@helpappresearch.com
                    <br />
                </section>
            </div>
        </div>
    );
};

export default Org;
