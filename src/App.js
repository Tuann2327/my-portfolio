import logo from './logo.svg';
import './App.scss';
import { useState,useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import axios from 'axios';

//project picture
import anochatpic from './pj-pic/anochat.png'
import shortlinkpic from './pj-pic/shortlink.png'
import huddlepic from './pj-pic/huddle.png'

const Nav = (props)=>{
  const [btnArr,setBtnArr] = useState(['About Me','My Work','Contact Me'])
  useEffect(() => {
  
  }, [])
  const btnRender = btnArr.map((btn,index)=>{
    return (
        <button 
          onClick={()=>{props.SetMenu(index)}} 
          key={index} 
          className={`navItem${props.menu===index?'-focus':''}`}
        >
          {btn}
        </button>
    )    
  })

  return(
    <div className='navBar'>
      {btnRender}
    </div>
  )
}

const Skill = ()=>{

  const [skillArr,setSkillArr] = useState(['Javascript','Html/CSS','ReactJS','NodeJS','MongoDB','Bootstrap'])

  const skillRender = skillArr.map((skill,index)=>{
    return (
      <div key={index}>
      {index===0
      ?''
      :<span className={`dot color${index%4+1}`}></span>}
        <span className='skillItem'>{skill}</span>
        
      </div>
    )    
  })

  return(
    <div className='skillBar'>
      {skillRender}
    </div>
  )
}

const Article = (props)=>{
  const [projects,setProjects] = useState([])
  const [fromEmail,setEmail] = useState()
  const [subject,setSubject] = useState()
  const [msg,setMsg] = useState()

  const SendEmail = async (e)=>{
    e.preventDefault();
    if(fromEmail===('')||msg===('')) return
    const data =  {
      service_id: "service_dhon0hr",
      template_id: "template_i0j04bn",
      user_id: "user_QsPGMbxYmL3wkEbZe7t0I",
      template_params: {
          from_email: fromEmail,
          subject: subject,
          msg : msg
      }
    }
    await axios.post('https://api.emailjs.com/api/v1.0/email/send',data)
    setEmail('')
    setSubject('')
    setMsg('')
    
  }

  useEffect(() => {
    setProjects(props.projects)
    console.log(window.innerHeight)
  }, [props.projects])

  const projectsRender = projects.map((project,index)=>{
    return(
      <SplideSlide key={index}>
        <a href={project.link} target="_blank" className='project' >
          <div className='project-img'>
            <img src={`${project.img}`}/>
          </div>
          <div className='project-info'>
            <h2 className='project-title'>{`#${index+1} ${project.name}`}</h2>
            <p className='project-des'>{project.des}</p>
          </div>
        </a>
      </SplideSlide>
    )
  })

  return(
    <article className='mainContent'>
      
      <div className={`projectHolder ${(props.menu===1)?'':'hide'}`}>
      <Splide
          options={ { 
            type : "loop",
            gap    : '1rem',
            autoplay: true,
            interval: '5000ms',
            perPage: 2,
            perMove: 1,
            speed: 1000,
            easing: 'ease',
            arrows: true,
            breakpoints: {
              9999:{
                destroy: window.innerHeight<800&&window.innerWidth<800?false:true,
              },
              500: {
                perPage: 1,
              },
            }
          } }
        >

        {projectsRender}
        </Splide>
      </div>
      
      <form className={`sendMeEmail ${(props.menu===2)?'':'hide'}`}>
        <input onChange={(e)=>{setEmail(e.target.value)}} value={fromEmail} placeholder='Email' type='email'></input>
        <input onChange={(e)=>{setSubject(e.target.value)}} value={subject} placeholder='Subject' type='text'></input>
        <textarea onChange={(e)=>{setMsg(e.target.value)}} value={msg}></textarea>
        <button onClick={SendEmail}>Send</button>
      </form>
    </article>
  )
}

const Introduce = (props)=>{
  
  const [title,setTitle] = useState()
  useEffect(()=>{
    switch (props.menu){
      case 0:
        setTitle(
          <div key={Math.random()} className='introduce'>
            <p className='greed highlight'>Hello, I'm Tuan Tran</p>
            <div className='des'>
              <p>I'm a <span className='highlight'>self-taught developer</span>. I make responsive websites using <span className='highlight'>MERN</span> Stack </p>
              <p>and build beautiful Front-End with Html/CSS and Javascript.</p>
              <p>Feel free to contact me anytime for websites commission.</p>
            </div>
          </div>
        )
        break
      case 1:
        setTitle(
          <div key={Math.random()} className='introduce'>
            <p className='greed highlight'>My Work</p>
            <div className='des'>
              <p>You can check my list of project below.</p>
            </div>
          </div>
        )
        break
      case 2:
        setTitle(
          <div key={Math.random()} className='introduce'>
            <p className='greed highlight'>Contact Me</p>
            <div className='des'>
              <p>You can contact me at <a href='https://mail.google.com/mail/u/0/?fs=1&to=tuanwork880@gmail.com&su=&body=&bcc=&tf=cm' target="_blank" className='highlight'>Tuanwork880@gmail.com</a></p>
              <p>or send me direct email below.</p>
            </div>
          </div>
        )
        break
      
    }
  },[props.menu])

  return(
    <>
    {title}
    </>
  )
}

const App = ()=>{
  const [menu,setMenu] = useState(0)
  const projects = [
    {
      name: 'AnoChat ChatApp',
      img: anochatpic,
      des: <>
        A chat app that help you connect with other people, you can connect randomly or chat in a public lobby.
      </>,
      link: 'https://anochatclient.herokuapp.com/',
    },
    {
      name: 'Shortly Link-shorter',
      img: shortlinkpic,
      des: <>A Web application that help you shorten your link. Created with HTML, CSS/SCSS, and Javascript.</>,
      link: 'https://tuann2327.github.io/shorten-link/'
    },
    {
      name: 'Huddle Landing Page',
      img: huddlepic,
      des: <>A responsive landing page made with HTML, CSS/SCSS (flex box), and Javascript.</>,
      link: 'https://tuann2327.github.io/front-end-projects/HundleLandingPage/index.html'
    },
  ]


  const SetToMenu = (menu)=>{
    console.log('haha')
    setMenu(Math.abs(menu))
  }

  const scroll = (e)=>{
    if(e.deltaY<0) SetToMenu(menu-1)
    else SetToMenu(menu+1)
  }

  return (
    <main>
      <Introduce menu={menu%3}/>
      <Nav menu={menu%3} SetMenu={SetToMenu}/>
      <Article projects={projects} menu={menu%3}/>
      <Skill/>
      <div key={Math.random()} className='splide-holder'>
        <Splide
          options={ { 
            fixedHeight: menu%3===0?'200px':'0px',
            type : "loop",
            gap    : '1rem',
            perPage: 3,
            perMove: 1,
            autoplay: true,
            interval: 2500,
            speed: 1000,
            easing: 'ease',
            arrows: false,
            breakpoints: {
              1000: {
                perPage: 2,
              },
              540: {
                perPage: 1,
              },
            }
          } }
        >
          
        {menu%3===0
        ?<>
          <SplideSlide>
            <img src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDd8fGNvZGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="Image 1"/>
          </SplideSlide>
          <SplideSlide>
            <img src="https://images.unsplash.com/photo-1581978846964-d3ee3ed0bed1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGNvZGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="Image 2"/>
          </SplideSlide>
          <SplideSlide>
            <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzd8fGNvZGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="Image 2"/>
          </SplideSlide>
          <SplideSlide>
            <img src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGNvZGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="Image 2"/>
          </SplideSlide>
          <SplideSlide>
            <img src="https://images.unsplash.com/photo-1573235781593-0094b20e59d2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA0fHxjb2RlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60" alt="Image 2"/>
          </SplideSlide>
        </>
        :''
        }
        </Splide>
      </div>
      
    </main>
  );
}

export default App;
