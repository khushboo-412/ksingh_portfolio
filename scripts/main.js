document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        populatePersonalInfo(data.personalInfo);
        populateEducation(data.education);
        populatePublications(data.publications);
        populateProjects(data.academicProjects);
        populateExperience(data.professionalExperience);
        populateSkills(data.skills);
        populateAwards(data.awards);
        populateLeadership(data.leadership);
        populateCertifications(data.certifications);
  
        // Set current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Handle mobile nav toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        navToggle.addEventListener('click', () => {
          navMenu.classList.toggle('open');
        });
  
        // Add fade-in class to all sections
        document.querySelectorAll('section').forEach(sec => sec.classList.add('fade-in'));
  
        // Intersection Observer for fade-in
        const fadeObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if(entry.isIntersecting) {
              entry.target.classList.add('visible');
              fadeObserver.unobserve(entry.target);
            }
          });
        }, {threshold: 0.1});
  
        document.querySelectorAll('section').forEach(sec => {
          fadeObserver.observe(sec);
        });
  
        // Intersection Observer for active section highlight
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav__link');
        const options = {threshold: 0.3};
  
        const sectionObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if(entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach(link => {
                link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${id}`);
              });
            }
          });
        }, options);
  
        sections.forEach(section => {
          sectionObserver.observe(section);
        });
  
      })
      .catch(error => console.error('Error loading data:', error));
  });
  
  function populatePersonalInfo(info) {
    const nameDisplay = document.getElementById('nameDisplay');
    const aboutContacts = document.getElementById('aboutContacts');
    const aboutDescription = document.getElementById('aboutDescription');
    
    nameDisplay.textContent = info.name;
    aboutDescription.textContent = info.about;
    
    // Using custom icons from images folder
    aboutContacts.innerHTML = `
        <a href="mailto:${info.email}">
        <img src="images/email-icon.png" alt="Email Icon" style="width:20px;vertical-align:middle;"/>
        </a>
        <a href="${info.linkedin}" target="_blank">
        <img src="images/linkedin-icon.png" alt="LinkedIn Icon" style="width:20px;vertical-align:middle;"/>
        </a>
        <a href="${info.github}" target="_blank">
        <img src="images/github-icon.png" alt="GitHub Icon" style="width:20px;vertical-align:middle;"/>
        </a>
         <!-- Commented Google Scholar -->
    <!-- <a href="${info.google_scholar}" target="_blank">
    <img src="images/google-scholar-icon.png" alt="Google Scholar Icon" style="width:20px;vertical-align:middle;"/>
    </a> -->
    `;

  }
  
  function populateEducation(educationArray) {
    const container = document.getElementById('educationList');
    container.innerHTML = educationArray.map(item => {
      return `
        <div class="card">
          <h3>${item.degree}</h3>
          <div class="info-line"><strong>Institution:</strong><span>${item.institution}</span></div>
          <div class="info-line"><strong>Timeframe:</strong><span>${item.timeframe}</span></div>
          <div class="info-line"><strong>Advisor:</strong><span>${item.advisor}</span></div>
          <div class="info-line"><strong>GPA:</strong><span>${item.gpa}</span></div>
          <div class="info-line"><strong>Coursework:</strong><span>${item.coursework.join(', ')}</span></div>
        </div>
      `;
    }).join('');
  }
  
  function populatePublications(publicationsArray) {
    const container = document.getElementById('publicationsList');
    container.innerHTML = publicationsArray.map(pub => {
      return `
        <div class="card">
          <h3>${pub.title}</h3>
          <div class="info-line"><strong>Conference:</strong><span>${pub.conference}${pub.venue}</span></div>
          <div class="info-line"><strong>Authors:</strong><span>${pub.authors}</span></div>
          <!--  <div class="info-line"><strong>Date:</strong><span>${pub.date}</span></div>  -->
          <div class="info-line"><strong>Type:</strong><span>${pub.type}</span></div>
        </div>
      `;
    }).join('');
  }
  
  function populateProjects(projectsArray) {
    const container = document.getElementById('projectsList');
    container.innerHTML = projectsArray.map(project => {
      return `
        <div class="card">
          <h3>${project.title1}</h3>
          <ul>
            ${project.details.map(detail => `<li>${detail}</li>`).join('')}
          </ul>
        </div>
      `;
    }).join('');
  }
  
  function populateExperience(experienceArray) {
    const container = document.getElementById('experienceList');
    container.innerHTML = experienceArray.map(exp => {
      return `
        <div class="card">
<span><h3 style="display:inline">${exp.role}</h3> (${exp.timeframe})</span>
          <ul>
            ${exp.description.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>
      `;
    }).join('');
  }
  
  function populateSkills(skills) {
    const container = document.getElementById('skillsList');
    container.innerHTML = `
             <div class="info-line">
  <strong>Programming Languages:</strong>
  <span>${skills.programmingLanguages}</span>
</div>
<div class="info-line">
  <strong>Operating Systems:</strong>
  <span>${skills.operatingSystems}</span>
</div>
<div class="info-line">
  <strong>Frameworks & Technologies:</strong>
  <span>${skills.frameworksAndTechnologies}</span>
</div>

    `;
  }
  
  function populateAwards(awardsArray) {
    const container = document.getElementById('awardsList');
    container.innerHTML = awardsArray.map(award => {
      return `
        <div class="card">
          <h3>${award.name}</h3>
          <div class="info-line"><strong>Year:</strong><span>${award.year}</span></div>
          <div class="info-line"><strong>Awarded By:</strong><span>${award.awardedBy}</span></div>
        </div>
      `;
    }).join('');
  }
  
  function populateLeadership(leadershipArray) {
    const container = document.getElementById('leadershipList');
    container.innerHTML = leadershipArray.map(item => {
      return `
        <div class="card">
          <span><h3 style="display:inline">${item.position} </h3>at ${item.organization} (${item.timeframe})</span>

         </div>
      `;
    }).join('');
  }
  
  function populateCertifications(certificationsArray) {
    const container = document.getElementById('certificationsList');
    container.innerHTML = certificationsArray.map(cert => 
      `<li><a href="${cert.link}" target="_blank">${cert.name}</a></li>`
    ).join('');
  }
  
