document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(`data.json?v=${Date.now()}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    populatePersonalInfo(data.personalInfo);
    populateMetrics(data.metrics);
    populateFocus(data.focusAreas);
    populateProjects(data.academicProjects);
    populatePublications(data.publications);
    populateEducation(data.education);
    populateSkills(data.skills);
    populateRecognition('awardsList', data.awards, item => `${item.name}`, item => `${item.awardedBy} · ${item.year}`);
    populateRecognition('leadershipList', data.leadership, item => item.position, item => `${item.organization} · ${item.timeframe}`);

    document.getElementById('year').textContent = new Date().getFullYear();
    setupNavigation();
    setupReveal();
  } catch (error) {
    console.error('Unable to load portfolio data:', error);
    document.getElementById('heroSummary').textContent = 'Portfolio content is temporarily unavailable. Please refresh the page.';
  }
});

function populatePersonalInfo(info) {
  document.getElementById('nameDisplay').textContent = info.name;
  document.getElementById('heroEyebrow').textContent = info.eyebrow;
  document.getElementById('heroTitle').textContent = info.title;
  document.getElementById('heroSummary').textContent = info.summary;
  document.getElementById('aboutDescription').textContent = info.about;

  const buttons = `
    <a class="button button--primary" href="mailto:${info.email}">Email me ↗</a>
    <a class="button" href="${info.linkedin}" target="_blank" rel="noreferrer">LinkedIn ↗</a>
    <a class="button" href="${info.github}" target="_blank" rel="noreferrer">GitHub ↗</a>
    <a class="button" href="${info.google_scholar}" target="_blank" rel="noreferrer">Google Scholar ↗</a>`;
  document.getElementById('heroActions').innerHTML = buttons;
  document.getElementById('contactActions').innerHTML = buttons;
}

function populateMetrics(metrics) {
  document.getElementById('metricsList').innerHTML = metrics.map(item => `
    <div class="metric"><strong>${item.value}</strong><span>${item.label}</span></div>`).join('');
}

function populateFocus(items) {
  document.getElementById('focusList').innerHTML = items.map(item => `
    <div class="focus-card"><strong>${item.title}</strong><span>${item.description}</span></div>`).join('');
}

function populateProjects(items) {
  document.getElementById('projectsList').innerHTML = items.map(item => `
    <article class="project-card">
      <div class="project-card__top"><h3>${item.title}</h3><span class="project-tag">${item.tag}</span></div>
      <p>${item.summary}</p>
      <ul>${item.highlights.map(line => `<li>${line}</li>`).join('')}</ul>
    </article>`).join('');
}

function populatePublications(items) {
  document.getElementById('publicationsList').innerHTML = items.map(item => `
    <article class="publication">
      <span class="publication__year">${item.year}</span>
      <div><h3>${item.title}</h3><p>${item.authors}</p><p>${item.venue}</p></div>
      ${item.link ? `<a class="publication__link" href="${item.link}" target="_blank" rel="noreferrer">View paper ↗</a>` : ''}
    </article>`).join('');
}

function populateEducation(items) {
  document.getElementById('educationList').innerHTML = items.map(item => `
    <article class="education-card">
      <h3 class="degree">${item.degree}</h3>
      <p class="school">${item.institution}</p>
      <p class="edu-meta">${item.timeframe} · GPA ${item.gpa}</p>
    </article>`).join('');
}

function populateSkills(groups) {
  document.getElementById('skillsList').innerHTML = Object.entries(groups).map(([name, skills]) => `
    <div class="skill-group"><h3>${name}</h3><div class="skill-tags">${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}</div></div>`).join('');
}

function populateRecognition(target, items, title, detail) {
  document.getElementById(target).innerHTML = items.map(item => `
    <div class="recognition-item"><strong>${title(item)}</strong><span>${detail(item)}</span></div>`).join('');
}

function setupNavigation() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const links = [...document.querySelectorAll('.nav__link')];
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  const sections = [...document.querySelectorAll('main section[id]')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(section => observer.observe(section));
}

function setupReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
