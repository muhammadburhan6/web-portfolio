import { useEffect, useState } from "react";

const projects = [
  { no: "01", name: "SkillSwap", type: "COMMUNITY · FULL STACK", description: "A community skill exchange platform for people to share what they know, find learning partners and grow together. Includes profiles, skill discovery, authentication, AI-assisted matching concepts and a chatbot.", tags: ["React", "Node.js", "Express", "Firebase"], art: "swap", note: "Connect skills. Share knowledge." },
  { no: "02", name: "MERN Bus Ticketing", type: "TRAVEL · MERN", description: "A full stack bus booking application for browsing buses and routes, managing ticket bookings and working with connected REST APIs.", tags: ["MongoDB", "Express", "React", "Node.js"], art: "bus", note: "Your next trip, made simpler." },
  { no: "03", name: "Student Task Manager", type: "PRODUCTIVITY · WEB APP", description: "A responsive task manager for students with authentication, task creation and updates, deletion, and completion status tracking.", tags: ["React", "Firebase", "Tailwind"], art: "tasks", note: "Make room for focused work." },
];
const skillGroups = [
  ["01 / FRONTEND", "React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
  ["02 / BACKEND", "Node.js", "Express.js", "Python", "Flask", "REST APIs"],
  ["03 / DATABASE", "MongoDB", "Firebase Firestore", "Realtime Database", "SQLite"],
  ["04 / TOOLS & WORKFLOW", "Git", "GitHub", "VS Code", "Vite", "NPM"],
  ["05 / FOUNDATIONS", "C++", "C#", "OOP", "CRUD Operations", "API Integration", "Firebase Authentication"],
];
const services = [
  ["01", "Full Stack Web Development", "Complete web applications that connect a polished interface with dependable backend logic."],
  ["02", "React Frontend Development", "Fast, responsive interfaces that make your product intuitive on every screen."],
  ["03", "Python Flask Backend", "Focused backend services that support your application's workflows and business rules."],
  ["04", "Node.js Backend Development", "Application services that connect your users, workflows and data."],
  ["05", "REST API Development", "Clear API endpoints that help your platforms communicate and work together."],
  ["06", "Database Integration", "Connected databases that keep application information organized and accessible."],
];

function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>; }
function ProjectArt({ kind, note }) {
  return <div className={`project-art art-${kind}`} role="img" aria-label={`Decorative concept artwork: ${note}`}>
    <div className="art-window"><div className="window-top"><i/><i/><i/><span>BURHAN / LAB</span><b>•••</b></div>
      {kind === "swap" && <div className="swap-ui"><div className="art-label">A COMMUNITY FOR CURIOSITY</div><strong>Skills grow<br/><em>when shared.</em></strong><div className="orbit-card one">✳ &nbsp; UI DESIGN <small>available to teach</small></div><div className="orbit-card two">⌘ &nbsp; REACT JS <small>looking to learn</small></div><div className="orbit-core">↗</div><div className="art-foot">DISCOVER YOUR NEXT COLLABORATION <span>↗</span></div></div>}
      {kind === "bus" && <div className="bus-ui"><div className="art-label">TRAVEL, WITHOUT THE FRICTION</div><strong>Find your<br/>way <em>forward.</em></strong><div className="route-box"><span>FROM <b>Lahore</b></span><span>TO <b>Islamabad</b></span><button>SEARCH ↗</button></div><div className="bus-line"><i/><i/><i/><i/><i/></div><div className="art-foot">ROUTES MADE FOR THE JOURNEY</div></div>}
      {kind === "tasks" && <div className="task-ui"><div className="art-label">A LITTLE MORE FOCUS</div><strong>Make space<br/>for <em>what matters.</em></strong><div className="task-list"><p><b>✓</b> Read software architecture <small>COMPLETED</small></p><p><b>○</b> Build the next big idea <small>IN PROGRESS</small></p><p><b>○</b> Take a well-earned break <small>UP NEXT</small></p></div><div className="art-foot">YOUR DAY, IN GOOD ORDER <span>03 / 08</span></div></div>}
    </div>
  </div>;
}
function App() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formError, setFormError] = useState("");
  const nav = [["home", "Home"], ["projects", "Projects"], ["skills", "Skills"], ["gallery", "Gallery"], ["resume", "Resume"], ["contact", "Contact"]];

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-section]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: "-30% 0px -60% 0px" });
    nodes.forEach((node) => observer.observe(node));
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); reveal.unobserve(entry.target); } }), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((node) => reveal.observe(node));
    return () => { observer.disconnect(); reveal.disconnect(); };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const { name, email, subject, message } = form;
    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = `mailto:mburhanshariq@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormError("Your email app should open with the message ready to send.");
  };

  return <>
    <header className="site-header"><a className="brand" href="#home" aria-label="Muhammad Burhan Shariq home"><span className="brand-mark">BS<span>.</span></span><span className="brand-name">MUHAMMAD BURHAN SHARIQ<small>SOFTWARE ENGINEER · LAHORE, PK</small></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? "×" : "☰"}</button>
      <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">{nav.map(([id, label]) => <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <a className="header-cta" href="#contact">LET’S TALK <Arrow diagonal/></a>
    </header>

    <main>
      <section className="hero section-wrap" id="home" data-section>
        <div className="hero-copy reveal"><div className="eyebrow"><span className="status-dot"/> OPEN TO OPPORTUNITIES <span className="eyebrow-line"/> LAHORE, PAKISTAN</div>
          <p className="hero-name">MUHAMMAD BURHAN SHARIQ</p>
          <h1>BUILDING<br/><span className="pixel">DIGITAL</span><br/>SOLUTIONS<span className="hero-period">.</span></h1>
          <p className="hero-pre">SOFTWARE ENGINEER <span>/</span> FULL STACK DEVELOPER</p>
          <p className="hero-description">I am a Software Engineering graduate passionate about building modern, scalable and user-friendly web applications. I enjoy turning ideas into practical software solutions using modern technologies.</p>
          <div className="hero-actions"><a className="button button-light" href="#projects">VIEW MY PROJECTS <Arrow diagonal/></a><a className="button button-quiet" href="/resume.pdf" download="Muhammad-Burhan-Shariq-Resume.pdf">DOWNLOAD RESUME <Arrow diagonal/></a><a className="button button-quiet" href="#contact">CONTACT ME <Arrow/></a></div>
          <div className="hero-social"><a href="https://github.com/muhammadburhan6?tab=repositories" target="_blank" rel="noreferrer">GITHUB <Arrow diagonal/></a><span/> <a href="https://www.linkedin.com/in/muhammad-burhan-shariq-190493277" target="_blank" rel="noreferrer">LINKEDIN <Arrow diagonal/></a><span/> <a href="mailto:mburhanshariq@gmail.com">EMAIL <Arrow diagonal/></a></div>
        </div>

        <a className="scroll-cue" href="#about">A LITTLE ABOUT ME <span>↓</span></a>
      </section>
      <section className="projects section-wrap" id="projects" data-section><div className="section-heading reveal"><span className="section-no">01 / SELECTED PROJECTS</span><h2>SELECTED<br/><span>PROJECTS.</span></h2><p className="section-aside">A few projects shaped by curiosity,<br/>care, and a love of making things work.</p></div><div className="project-grid">{projects.map((p) => <article className="project-card reveal" key={p.no}><ProjectArt kind={p.art} note={p.note}/><div className="project-info"><div className="project-meta"><span>{p.type}</span><span>{p.no} / 03</span></div><div className="project-title-row"><h3>{p.name}</h3><span className="project-arrow">↗</span></div><p>{p.description}</p><div className="tag-row">{p.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><button disabled title="A live project URL was not provided">VIEW PROJECT ↗</button><button disabled title="A repository URL was not provided">GITHUB ↗</button></div><div className="project-foot"><span>PERSONAL PROJECT</span><span>LINKS NOT PROVIDED</span></div></div></article>)}</div><div className="project-note"><h3>YOUR IDEA. OUR NEXT PROJECT.</h3><p>Have an idea? Build something people love to use.</p><a href="#contact">WORK TOGETHER <Arrow diagonal/></a></div></section>
      <section className="about section-wrap" id="about" data-section><div className="section-heading reveal"><span className="section-no">02 / ABOUT ME</span><h2>ABOUT ME.</h2></div><div className="about-content reveal"><p className="about-lead">Curiosity drives me.<br/>Building is how I learn.</p><p>I’m a Software Engineering graduate from UMT Lahore with a practical background across frontend and backend development. During my two-month internship at CloudPacer, I worked on web applications, REST API integration, authentication and database-driven features.</p><p>I enjoy the full journey: understanding a problem, shaping a clear interface and bringing it to life with reliable code.</p><div className="education"><span>EDUCATION</span><div><strong>Bachelor of Science · Software Engineering</strong><small>University of Management and Technology, Lahore <i>2022 — 2026</i></small></div><Arrow diagonal/></div></div></section>
      <section className="skills section-wrap" id="skills" data-section><div className="section-heading reveal"><span className="section-no">03 / MY TOOLKIT</span><h2>SKILLS.</h2></div><div className="skills-intro reveal"><p>I choose technology to fit the problem, then focus on making every layer work together.</p><span>NO SCORES. JUST SOLID FOUNDATIONS.</span></div><div className="skill-grid">{skillGroups.map(([heading, ...items], index) => <article className="skill-card reveal" key={heading}><div className="skill-card-head"><span>{heading}</span><span className="skill-glyph">{["◈", "⌘", "▤", "✳", "⌁"][index]}</span></div><p className="skill-desc">{["Thoughtful, responsive interfaces.", "The logic behind the experience.", "Structured data. Connected systems.", "A reliable development workflow.", "Strong fundamentals, practical solutions."][index]}</p><div className="skill-list">{items.map((item, i) => <div key={item}><span className="skill-icon">{["✳", "⌘", "◉", "▣", "↗"][i % 5]}</span><span>{item}</span><Arrow diagonal/></div>)}</div></article>)}</div></section>
      <section className="gallery section-wrap" id="gallery" data-section><div className="section-heading reveal"><span className="section-no">04 / GALLERY</span><h2>GALLERY.</h2><p className="section-aside">Small glimpses into the work<br/>behind the finished product.</p></div><div className="gallery-grid"><div className="gallery-tile gallery-code reveal"><div className="code-top"><span>✳ &nbsp; notes-from-the-build.js</span><span>•••</span></div><pre><span>const</span> idea = {'{'}<br/> &nbsp; curiosity: <i>true</i>,<br/> &nbsp; craft: <i>"intentional"</i>,<br/> &nbsp; details: [<i>"small"</i>, <i>"meaningful"</i>],<br/>{'}'};<br/><br/><span>build</span>(idea); <em>→ something useful</em></pre><div className="tile-label">01 — NOTES FROM THE BUILD</div></div><div className="gallery-tile gallery-sun reveal"><div className="gallery-sun-disc"/><div className="gallery-contour"/><span className="tile-over">LATE AFTERNOON / LAHORE</span><div className="tile-label">02 — ROOM TO THINK</div></div><div className="gallery-tile gallery-type reveal"><span className="type-mark">Aa</span><div><small>DESIGN NOTE / 01</small><strong>Clarity is<br/>a feature.</strong></div><span className="tile-label">03 — INTERFACE THOUGHTS</span></div><div className="gallery-tile gallery-orbit reveal"><div className="gallery-orbit-shape">BS<span>.</span></div><span>IDEAS IN MOTION</span><div className="tile-label">04 — ALWAYS EXPLORING</div></div></div></section>
      <section className="experience section-wrap" id="experience"><div className="section-heading reveal"><span className="section-no">05 / EXPERIENCE</span><h2>EXPERIENCE.</h2></div><article className="experience-card reveal"><div className="exp-date"><span>INTERNSHIP</span><strong>02<br/>MONTHS</strong></div><div className="exp-main"><div className="exp-head"><div><h3>Full Stack Development Intern</h3><p>CloudPacer <span>·</span> Lahore, Pakistan</p></div><span className="exp-period">2 MONTHS</span></div><p className="exp-desc">Contributed to web application development across the stack, building practical experience with interface implementation, APIs and data workflows.</p><div className="exp-points"><span>Frontend & backend development</span><span>API integration & database operations</span><span>Coding, debugging & problem solving</span></div></div></article></section>
      <section className="services section-wrap" id="services"><div className="section-heading reveal"><span className="section-no">06 / WHAT I CAN BUILD</span><h2>WHAT I CAN<br/><span>BUILD.</span></h2><p className="section-aside">From the first sketch to the<br/>last line of code.</p></div><div className="service-grid">{services.map(([n, title, desc]) => <article className="service-card reveal" key={n}><span>{n} <i>↗</i></span><h3>{title}</h3><p>{desc}</p><div className="service-rule"/></article>)}</div><a href="#contact" className="service-cta reveal">HAVE A PROJECT IN MIND? <strong>LET’S WORK TOGETHER <Arrow diagonal/></strong></a></section>
      <section className="resume section-wrap" id="resume" data-section><div className="section-heading reveal"><span className="section-no">07 / MY RESUME</span><h2>MY<br/><span>RESUME.</span></h2></div><div className="resume-panel reveal"><div className="resume-icon"><span>PDF</span><b>↗</b></div><div className="resume-details"><span className="section-no">PROFESSIONAL PROFILE</span><h3>Muhammad Burhan Shariq</h3><p>Software Engineering Graduate — Full Stack Developer</p><div className="resume-facts"><span>⌖ &nbsp; Lahore, Pakistan</span><span>▤ &nbsp; PDF DOCUMENT</span></div></div><div className="resume-actions"><span className="resume-missing">Muhammad-Burhan-Shariq-Resume.pdf · PDF</span><a className="button button-light" href="/resume.pdf" download="Muhammad-Burhan-Shariq-Resume.pdf">DOWNLOAD RESUME <Arrow diagonal/></a><a className="button button-quiet" href="/resume.pdf" target="_blank" rel="noreferrer">VIEW RESUME <Arrow/></a></div></div><p className="resume-caption">Original resume PDF. Download it or open it in your browser to read and print.</p></section>
      <section className="contact section-wrap" id="contact" data-section><div className="contact-copy reveal"><span className="section-no">08 / YOUR TURN</span><h2>LET’S BUILD<br/>SOMETHING<br/><span>TOGETHER.</span></h2><p>Have an idea or a project in mind? Let’s discuss how I can help turn it into a practical digital solution.</p><a className="contact-email" href="mailto:mburhanshariq@gmail.com">MBURHANSHARIQ@GMAIL.COM <Arrow diagonal/></a><div className="contact-facts"><div><span>BASED IN</span><strong>Lahore, Pakistan</strong></div><div><span>PHONE</span><a href="tel:+923004758376">+92 300 475 8376</a></div></div><div className="contact-social"><a href="https://github.com/muhammadburhan6?tab=repositories" target="_blank" rel="noreferrer">GITHUB <Arrow diagonal/></a><a href="https://www.linkedin.com/in/muhammad-burhan-shariq-190493277" target="_blank" rel="noreferrer">LINKEDIN <Arrow diagonal/></a></div></div><form className="contact-form reveal" onSubmit={sendMessage}><div className="form-heading"><span>HAVE A GOOD ONE IN MIND?</span><span>✳</span></div><label>Your name<input required maxLength="100" autoComplete="name" placeholder="What should I call you?" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/></label><label>Email address<input required type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/></label><label>Subject<input required maxLength="150" placeholder="A little about the project" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}/></label><label>Your message<textarea required rows="4" maxLength="3000" placeholder="Tell me what you're thinking…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}/></label><button className="button button-light" type="submit">PREPARE EMAIL <Arrow diagonal/></button>{formError && <p className="form-feedback" role="status">{formError}</p>}<small className="form-note">Opens your email app to send. No message is sent automatically.</small></form></section>








    </main>
    <footer className="site-footer"><div className="footer-main"><a className="brand" href="#home"><span className="brand-mark">BS<span>.</span></span><span className="brand-name">MUHAMMAD BURHAN SHARIQ<small>SOFTWARE ENGINEER · LAHORE, PK</small></span></a><p>Thoughtful software, built with curiosity<br/>and a little attention to detail.</p><div className="footer-links"><a href="#projects">PROJECTS <Arrow diagonal/></a><a href="#skills">SKILLS <Arrow diagonal/></a><a href="#resume">RESUME <Arrow diagonal/></a><a href="#contact">CONTACT <Arrow diagonal/></a></div><div className="footer-social"><a href="https://github.com/muhammadburhan6?tab=repositories" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/muhammad-burhan-shariq-190493277" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="mailto:mburhanshariq@gmail.com">EMAIL ↗</a></div></div><div className="sunset"><div className="sunset-sun"/><div className="sunset-haze"/><div className="sunset-horizon"/><span>MADE IN LAHORE, PAKISTAN</span><b>GOOD IDEAS HAVE A WAY OF FINDING THEIR WAY OUT.</b></div><div className="footer-bottom"><span>© 2026 MUHAMMAD BURHAN SHARIQ. ALL RIGHTS RESERVED.</span><a href="#home">BACK TO THE TOP ↑</a><span>BUILT WITH INTENTION ✳</span></div></footer>
  </>;
}
export default App;
