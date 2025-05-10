import React from "react";
import "./Resource.css";

const Resource = () => {
    return (
        <div className="resource">
            <img src="/pic/tree.png" alt="tree"></img>
            <div className="resource-container">
                <section className="resource-block">
                    <h2>Where to get immediate help (for Australian citizens)</h2>
                    <ul>
                        <li>
                            LifeLine Australia - Crisis support and suicide prevention. (
                            <u>13 11 14</u>)
                        </li>
                        <li>
                            Beyond Blue Australia - Mental health support, including anxiety and
                            depression. (<u>1300 22 4636 </u>)
                        </li>
                        <li>
                            GriefLine Australia - Specialist grief and loss support. (
                            <u>1300 845 745 </u>)
                        </li>
                        <li>
                            Palliative Care Australia National Helpline - Information and support
                            related to palliative care.
                        </li>
                        <li>
                            Kids Helpline - Support for children and young people up to 25 years old
                            dealing with any issues, including grief and loss. ({" "}
                            <u>1800 55 1800 </u>)
                        </li>
                    </ul>
                </section>

                <section className="resource-block">
                    <h2>Professional Counselling and Therapy</h2>
                    <p>
                        Seeking professional support can be incredibly beneficial when navigating
                        the complex emotions and challenges associated with grief, loss, and
                        confronting mortality. Qualified counsellors and therapists can provide a
                        safe and confidential space to process your feelings, develop coping
                        strategies, and find pathways towards healing and understanding. The
                        following links will connect you with directories and professional
                        organizations that can help you find experienced therapists and counsellors
                        specializing in grief, bereavement, and end-of-life issues. <br />
                        <br />
                        <u>
                            Here are some links to professional organizations and directories in
                            Australia that can help people find counsellors and therapists:
                        </u>
                        <ul>
                            <li>Australian Psychological Society (APS)</li>
                            <li>Psychology Today</li>
                            <li>Australian Association of Social Workers (AASW)</li>
                            <li>Relationships Australia. </li>
                            <li>PACFA (Psychotherapy and Counselling Federation of Australia)</li>
                        </ul>
                        <br />
                    </p>
                </section>

                <section className="resource-block">
                    <h2>Online Forum and Communities</h2>
                    <p>
                        Connecting with others who have similar experiences can provide invaluable
                        support, understanding, and a sense of community when navigating grief or
                        exploring topics related to death literacy. Online forums and communities
                        offer a space to share stories, ask questions, and find comfort in knowing
                        you are not alone. While we aim to provide links to supportive and moderated
                        online spaces, please remember that these are community-driven platforms,
                        and individual experiences and advice may vary. We encourage you to engage
                        thoughtfully and seek professional guidance when needed.
                        <br /> <br />
                        <u>
                            Here are some links to websites that offers support groups for people
                            who are going through grief:
                        </u>
                        <ul>
                            <li>https://tcfa.org.au (The Compassionate Friends Australia)</li>
                            <li>facebook.com/deathsupportgroup (Facebook support group)</li>
                            <li>grieflineau.com (GriefLine Australia)</li>
                            <li>thedeathhelpers.com.au (The Death Helpers)</li>
                            <li>theheartsompassioners.com.au (The Heart Compassioners)</li>
                        </ul>
                    </p>
                </section>

            </div>
        </div>
    );
};

export default Resource;
