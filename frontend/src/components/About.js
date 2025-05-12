import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about">
            <img src="/pic/tree.svg" alt="tree" />
            <div className="about-container">
                <section className="about-block" id="what-is-it">
                    <h2>What is Death Literacy?</h2>
                    <p>
                        Death Literacy is the knowledge and skills that make it possible to gain
                        access to, understand and act upon end-of-life and death care options.
                    </p>
                    <p>
                        It’s the practical knowledge needed to plan well for end of life, for
                        yourself or for people that you love. This includes knowledge about:
                        <ul>
                            <li>What good end-of-life care looks like for individuals.</li>
                            <li>What happens when someone dies</li>
                            <li>What legal processes need to be followed</li>
                            <li>Who needs to be notified </li>
                            <li>Who should be involved</li>
                            <li>What support is available at different stages</li>
                        </ul>
                    </p>
                </section>

                <section className="about-block" id="why-it-matters">
                    <h2>Why is it important?</h2>
                    <p>
                        In many societies, conversations about death are often avoided, leaving
                        individuals unprepared when facing end-of-life decisions — either for
                        themselves or their loved ones. Low death literacy can lead to confusion,
                        distress, or missed opportunities for support. <br />
                        Improving death literacy:
                        <ul>
                            <li>Encourages open, informed conversations about mortality.</li>
                            <li>Reduces fear and anxiety around death and dying.</li>
                            <li>Helps people make better end-of-life care decisions.</li>
                            <li>Strengthens community support during times of loss. </li>
                        </ul>
                        <br />
                        With higher death literacy, individuals are better equipped to advocate for
                        themselves and others, plan ahead, and find meaning even during difficult
                        times.
                    </p>
                </section>

                <section className="about-block" id="how-it-helps">
                    <h2>Be informed, be prepared</h2>
                    <p>
                        Knowledge about Death Literacy comes with a lot of benefits. This includes:
                        <br /> <br />
                        <h3>Empowerment and Informed Choices:</h3>
                        <ul>
                            <li>
                                Understand end-of-life options (care, funerals, legal) to make
                                informed decisions aligned with your values.
                            </li>
                            <li>Navigate complex healthcare systems with greater confidence.</li>
                        </ul>
                        <br />
                        <h3>Reduced Fear and Anxiety:</h3>
                        <ul>
                            <li>
                                Demystify death and dying, replacing uncertainty with understanding.
                            </li>
                            <li>Find greater peace of mind by being better prepared.</li>
                        </ul>
                        <br />
                        <h3>Proactive Planning:</h3>
                        <ul>
                            <li>
                                Alleviate burdens on loved ones by planning your end-of-life wishes.
                            </li>
                            <li>Increase the likelihood of your preferences being honored.</li>
                        </ul>
                        <br />
                        <h3>Improved Communication:</h3>
                        <ul>
                            <li>Facilitate open and honest conversations about death and grief.</li>
                            <li>Offer better support to those experiencing loss</li>
                        </ul>
                        <br />
                        <h3>Improved Communication:</h3>
                        <ul>
                            <li>
                                Understand death as a natural part of life, fostering appreciation
                                for the present.
                            </li>
                            <li>Potentially inspire a more intentional and fuller life.</li>
                        </ul>
                        <br />
                        <h3>Societal Impact:</h3>
                        <ul>
                            <li>Advocate for better end-of-life care and support for all.</li>
                            <li>Build more compassionate and understanding communities.</li>
                            <li>Break down societal taboos surrounding death.</li>
                        </ul>
                    </p>
                </section>

                <section className="about-block" id="who-is-it-for">
                    <h2>Who is This For?</h2>
                    <p>
                        This platform is designed for:
                        <ul>
                            <li>Individuals curious or concerned about end-of-life planning</li>
                            <li>Families looking to prepare or support one another</li>
                            <li>Health and community workers engaging with palliative care</li>
                            <li>
                                Educators, researchers, and organisations focused on public health
                            </li>
                        </ul>
                    </p>
                    <p>
                        Whether you're just starting to think about these issues or already deeply
                        involved, this tool offers guidance, reflection, and a path forward.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
