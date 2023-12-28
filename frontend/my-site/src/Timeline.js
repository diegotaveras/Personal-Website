import React from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './App.scss';

export default function Timeline() {
    return (
        <VerticalTimeline>
            <VerticalTimelineElement
                animate = {true}
                 className="vertical-timeline-element--work"
                 contentStyle={{ background: '#04006c', color: '#FFC200' }}
                 contentArrowStyle={{ borderRight: '15px solid #04006c' }}
                 date="Summer 2024"
                 iconStyle={{ color: '#fff' }}
                 icon={<img style= {{paddingTop:"1.5px"}} src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Warner_Bros._Discovery_%28symbol%29.svg"></img>}
                //  icon={<WorkIcon />}
            >
                <h3 className="vertical-timeline-element-title">WBD <span style={{color:"white"}}> | </span> Incoming Software Engineering Intern</h3>
                <h4 className="vertical-timeline-element-subtitle"></h4>
                
            </VerticalTimelineElement>
            <VerticalTimelineElement
                animate = {true}
                 className="vertical-timeline-element--work"
                 contentStyle={{ background: '#071d49', color: '' }}
                 contentArrowStyle={{ borderRight: '15px solid #071d49' }}
                 date="September 2023 - May 2024"
                 iconStyle={{ color: '#fff' }}
                 icon={<img style= {{borderRadius:"100%"}} src="https://asset.brandfetch.io/id16yPOFSJ/idWGoSk0t3.svg"></img>}
                //  icon={<WorkIcon />}
            >
                <h3 className="vertical-timeline-element-title">AbbVie <span style={{color:"white"}}> | </span> Frontend Developer Intern</h3>
                <h4 className="vertical-timeline-element-subtitle">Champaign, IL</h4>
                
            </VerticalTimelineElement>
            <VerticalTimelineElement
                animate = {true}
                 className="vertical-timeline-element--work"
                 contentStyle={{ background: '#13294B', color: '#FF5F05' }}
                 contentArrowStyle={{ borderRight: '15px solid #13294B' }}
                 date="June - August 2023"
                 iconStyle={{ color: '#fff' }}
                 icon={<img style= {{width:"100%",height:"100%",borderRadius:"100%"}} src="https://scontent-mia3-2.xx.fbcdn.net/v/t39.30808-6/299587452_492138892912100_8577244854158482487_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=xBI74ZgsKLYAX81JSKN&_nc_ht=scontent-mia3-2.xx&oh=00_AfCLaxbnrsG4brNUGpEh4u-9gLB_cL25bMl9g14Ivg2WQQ&oe=65923B8C"></img>}
                //  icon={<WorkIcon />}
            >
                <h3 className="vertical-timeline-element-title">Information Trust Institute <span style={{color:"white"}}> | </span> Software Developer Intern</h3>
                <br/>
                <h4 style={{color:"white"}} className="vertical-timeline-element-subtitle"> 
                • Used various Python libraries to develop a GUI that streamlines OT-network security policy creation and
                validation by converting user input to XML format. Enabled users to customize policy parameters and
                upload their created policies to a shared JSON library. <br/><br/>
                • Presented the app to company members and produced detailed documentation on features and usage. <br/><br/>
                • Expanded the GUI features with an Angular web application and experimented with web-based
                collaboration for users</h4>
                
                
            </VerticalTimelineElement>
            <VerticalTimelineElement
                animate = {true}
                 className="vertical-timeline-element--work"
                 contentStyle={{ background: '#13294B', color: '#FF5F05' }}
                 contentArrowStyle={{ borderRight: '15px solid #13294B' }}
                 date="June - August 2023"
                 iconStyle={{ color: '#fff' }}
                 icon={<img style= {{width:"100%",height:"100%",borderRadius:"100%"}} src="https://avatars.githubusercontent.com/u/86036083?s=200&v=4"></img>}
                //  icon={<WorkIcon />}
            >
                <h3 className="vertical-timeline-element-title">CS124 @ UIUC <span style={{color:"white"}}> | </span> Course Assistant</h3> <br/>
                <h4 style={{color:"white"}} className="vertical-timeline-element-subtitle"> 
                • Teach fundamental topics in Java and Kotlin through virtual office hours and course forum. <br/><br/>
                • Develop recorded audiovisual code walkthroughs to teach students in both programming
                languages. <br/><br/>
                • Help students with Android development machine projects in Android Studio.</h4>
            </VerticalTimelineElement>
            
            
            
    </VerticalTimeline>
    )
};