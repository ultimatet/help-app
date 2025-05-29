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
                        Death literacy is the practical knowledge and skills that help people
                        understand and act on end-of-life options—for themselves or their loved
                        ones. This includes:
                    </p>
                    <ul>
                        <li>What good end-of-life care looks like</li>
                        <li>What happens when someone dies</li>
                        <li>Legal steps and who needs to be notified</li>
                        <li>Available support throughout the process</li>
                    </ul>
                </section>

                <section className="about-block" id="why-it-matters">
                    <h2>Why It Matters</h2>
                    <p>
                        Avoiding conversations about death often leads to confusion, stress, and
                        missed opportunities for support. Increasing death literacy can:
                    </p>
                    <ul>
                        <li>Encourage open, informed conversations</li>
                        <li>Reduce fear and uncertainty</li>
                        <li>Support better end-of-life planning and care</li>
                        <li>Strengthen support for loved ones during loss</li>
                    </ul>
                </section>

                <section className="about-block" id="how-it-helps">
                    <h2>Be Informed, Be Prepared</h2>
                    <ul>
                        <li>
                            <strong>Empowerment:</strong> Make confident decisions aligned with your
                            values and wishes.
                        </li>
                        <li>
                            <strong>Peace of Mind:</strong> Reduce anxiety by understanding what to
                            expect.
                        </li>
                        <li>
                            <strong>Proactive Planning:</strong> Relieve the burden on loved ones by
                            planning ahead.
                        </li>
                        <li>
                            <strong>Improved Communication:</strong> Foster open conversations about
                            death and grief.
                        </li>
                        <li>
                            <strong>Social Impact:</strong> Build more compassionate communities and
                            challenge taboos around death.
                        </li>
                    </ul>
                </section>

                <section className="about-block" id="who-is-it-for">
                    <h2>Who is This For?</h2>
                    <p>This platform is designed for: </p>
                    <ul>
                        <li>Individuals curious or concerned about end-of-life planning</li>
                        <li>Families looking to prepare or support one another</li>
                        <li>Health and community workers engaging with palliative care</li>
                        <li>Educators, researchers, and organisations focused on public health</li>
                    </ul>

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
