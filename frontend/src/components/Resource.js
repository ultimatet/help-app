import React from "react";
import "./Resource.css";

const Resource = () => {
    return (
        <div className="resource">
            <img src="/pic/tree.svg" alt="tree" />
            <div className="resource-container">
                <section className="resource-block">
                    <h2>Where to get immediate help (for Australian citizens)</h2>
                    <ul>
                        <li>
                            <a
                                href="https://www.lifeline.org.au/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Lifeline Australia
                            </a>{" "}
                            – Crisis support and suicide prevention (
                            <a href="tel:131114">
                                <u>13 11 14</u>
                            </a>
                            )
                        </li>
                        <li>
                            <a
                                href="https://www.beyondblue.org.au/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Beyond Blue
                            </a>{" "}
                            – Mental health support, including anxiety and depression (
                            <a href="tel:1300224636">
                                <u>1300 22 4636</u>
                            </a>
                            )
                        </li>
                        <li>
                            <a
                                href="https://griefline.org.au/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GriefLine Australia
                            </a>{" "}
                            – Specialist grief and loss support (
                            <a href="tel:1300845745">
                                <u>1300 845 745</u>
                            </a>
                            )
                        </li>
                        <li>
                            <a
                                href="https://palliativecare.org.au/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Palliative Care Australia
                            </a>{" "}
                            – Information and support related to palliative care.
                        </li>
                        <li>
                            <a
                                href="https://kidshelpline.com.au/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Kids Helpline
                            </a>{" "}
                            – Support for young people up to 25 years old (
                            <a href="tel:1800551800">
                                <u>1800 55 1800</u>
                            </a>
                            )
                        </li>
                    </ul>
                </section>

                <section className="resource-block">
                    <h2>Professional Counselling and Therapy</h2>
                    <p>
                        Seeking professional support can be incredibly beneficial when navigating
                        grief and confronting mortality. These directories and organizations can
                        help you find qualified therapists:
                    </p>
                    <ul>
                        <li>
                            <a
                                href="https://psychology.org.au/find-a-psychologist"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Australian Psychological Society (APS)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.psychologytoday.com/au"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Psychology Today (Australia)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.aasw.asn.au/find-a-social-worker"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Australian Association of Social Workers (AASW)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.relationships.org.au/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Relationships Australia
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.pacfa.org.au/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                PACFA (Psychotherapy and Counselling Federation of Australia)
                            </a>
                        </li>
                    </ul>
                </section>

                <section className="resource-block">
                    <h2>Online Forums and Communities</h2>
                    <p>
                        Connecting with others who share similar experiences can provide
                        understanding and support. These online platforms offer spaces to share,
                        reflect, and receive comfort during difficult times:
                    </p>
                    <ul>
                        <li>
                            <a href="https://tcfa.org.au" target="_blank" rel="noopener noreferrer">
                                The Compassionate Friends Australia
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.facebook.com/groups/803073684058089/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Tears In Heaven – Grief Support Group (Facebook)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://griefline.org.au"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GriefLine Australia
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.beyondblue.org.au/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Beyond Blue – Mental health and grief support
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.reachout.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ReachOut Australia – Youth mental health & grief
                            </a>
                        </li>
                    </ul>
                    <p>
                        Whether you're just beginning or already deeply involved in navigating
                        grief, these tools offer guidance and a path forward.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Resource;
