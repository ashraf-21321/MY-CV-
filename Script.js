// ===== GLOBAL VARIABLES =====
let projects = [];
let skills = [];
let profileData = {};
let currentFilter = 'all';
let editingProjectId = null;
let editingSkillId = null;

// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loadingScreen');
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const projectModal = document.getElementById('projectModal');
const skillModal = document.getElementById('skillModal');
const closeAdminModal = document.getElementById('closeAdminModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const closeSkillModal = document.getElementById('closeSkillModal');
const addProjectBtn = document.getElementById('addProjectBtn');
const addSkillBtn = document.getElementById('addSkillBtn');
const cancelProjectBtn = document.getElementById('cancelProjectBtn');
const cancelSkillBtn = document.getElementById('cancelSkillBtn');
const profileForm = document.getElementById('profileForm');
const projectForm = document.getElementById('projectForm');
const skillForm = document.getElementById('skillForm');
const contactForm = document.getElementById('contactForm');
const projectsGrid = document.getElementById('projectsGrid');
const skillsGrid = document.getElementById('skillsGrid');
const projectsList = document.getElementById('projectsList');
const skillsList = document.getElementById('skillsList');
const emptyState = document.getElementById('emptyState');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadDataFromStorage();
    setupEventListeners();
    updateUI();
    hideLoadingScreen();
    initializeAnimations();
    setupSmoothScrolling();
    setupNavbarScroll();
    initializeTheme();
}

// ===== DATA MANAGEMENT =====
function loadDataFromStorage() {
    // Load projects
    const savedProjects = localStorage.getItem('cv_projects');
    if (savedProjects) {
        projects = JSON.parse(savedProjects);
    } else {
        // Add sample projects for demonstration
        projects = [
            {
                id: Date.now(),
                name: 'موقع تجارة إلكترونية حديث',
                category: 'web',
                description: 'منصة تجارة إلكترونية متكاملة مع نظام دفع آمن وإدارة المنتجات وتتبع الطلبات',
                image: 'https://via.placeholder.com/400x300/7c3aed/FFFFFF?text=E-Commerce',
                link: 'https://example.com',
                github: 'https://github.com',
                tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB']
            },
            {
                id: Date.now() + 1,
                name: 'تطبيق مهام ذكي',
                category: 'app',
                description: 'تطبيق لإدارة المهام اليومية مع ميزات التنبيه الذكي والتتبع المتقدم',
                image: 'https://via.placeholder.com/400x300/06b6d4/FFFFFF?text=Task+App',
                link: 'https://example.com',
                github: 'https://github.com',
                tech: ['React Native', 'Firebase', 'Redux', 'TypeScript']
            },
            {
                id: Date.now() + 2,
                name: 'موقع أعمال احترافي',
                category: 'design',
                description: 'تصميم وتطوير موقع أعمال عصري بتأثيرات بصرية مذهلة',
                image: 'https://via.placeholder.com/400x300/5eead4/FFFFFF?text=Portfolio',
                link: 'https://example.com',
                github: 'https://github.com',
                tech: ['UI/UX', 'Figma', 'HTML', 'CSS', 'JavaScript']
            }
        ];
        saveProjects();
    }

    // Load skills
    const savedSkills = localStorage.getItem('cv_skills');
    if (savedSkills) {
        skills = JSON.parse(savedSkills);
    } else {
        // Add sample skills
        skills = [
            { id: 1, name: 'HTML/CSS', level: 95, icon: 'fab fa-html5' },
            { id: 2, name: 'JavaScript', level: 90, icon: 'fab fa-js' },
            { id: 3, name: 'React', level: 85, icon: 'fab fa-react' },
            { id: 4, name: 'Node.js', level: 80, icon: 'fab fa-node' },
            { id: 5, name: 'Python', level: 75, icon: 'fab fa-python' },
            { id: 6, name: 'UI/UX Design', level: 70, icon: 'fas fa-palette' },
            { id: 7, name: 'Git', level: 85, icon: 'fab fa-git-alt' },
            { id: 8, name: 'Database', level: 70, icon: 'fas fa-database' }
        ];
        saveSkills();
    }

    // Load profile data
    const savedProfile = localStorage.getItem('cv_profile');
    if (savedProfile) {
        profileData = JSON.parse(savedProfile);
    } else {
        // Set default profile data
        profileData = {
            name: 'اسمك',
            surname: 'هنا',
            title: 'Front-End Developer & UI/UX Enthusiast',
            description: 'أُحوّل الأفكار إلى واجهات سريعة، متجاوبة وجذابة.',
            about: 'أنا مطور واجهات أمامية (Front-End Developer) بخبرة في تطوير مواقع وتطبيقات ويب حديثة وسريعة الاستجابة. أستخدم أحدث التقنيات والأدوات لتحويل الأفكار إلى واقع رقمي جذاب.',
            about2: 'شغوف بتصميم واجهات مستخدم ممتعة وسهلة الاستخدام، مع التركيز على الأداء العالي وتجربة المستخدم المثلى.',
            experience: 5,
            email: 'email@example.com',
            phone: '+20 100 123 4567',
            location: 'القاهرة، مصر',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com'
        };
        saveProfileData();
    }
}

function saveProjects() {
    localStorage.setItem('cv_projects', JSON.stringify(projects));
}

function saveSkills() {
    localStorage.setItem('cv_skills', JSON.stringify(skills));
}

function saveProfileData() {
    localStorage.setItem('cv_profile', JSON.stringify(profileData));
}

// ===== UI UPDATES =====
function updateUI() {
    updateProfile();
    updateProjects();
    updateSkills();
    updateStats();
    updateProjectsList();
    updateSkillsList();
}

function updateProfile() {
    // Update brand
    document.getElementById('brandName').innerHTML = `${profileData.name} <strong>${profileData.surname}</strong>`;
    
    // Update hero section
    document.getElementById('heroName').textContent = profileData.name || 'اسمك';
    document.getElementById('heroSurname').textContent = profileData.surname || 'هنا';
    document.getElementById('heroDescription').textContent = profileData.description || 'أُحوّل الأفكار إلى واجهات سريعة، متجاوبة وجذابة.';
    
    // Update about section
    document.getElementById('aboutSubtitle').textContent = profileData.title || 'Front-End Developer';
    document.getElementById('aboutText').textContent = profileData.about || 'أنا مطور واجهات أمامية بخبرة في تطوير مواقع وتطبيقات ويب حديثة.';
    document.getElementById('aboutText2').textContent = profileData.about2 || 'شغوف بتصميم واجهات مستخدم ممتعة وسهولة الاستخدام.';
    
    // Update info section
    document.getElementById('infoName').textContent = `${profileData.name} ${profileData.surname}`;
    document.getElementById('infoTitle').textContent = profileData.title || 'Front-End Developer';
    document.getElementById('infoLocation').textContent = profileData.location || 'القاهرة، مصر';
    document.getElementById('infoEmail').textContent = profileData.email || 'email@example.com';
    
    // Update contact section
    document.getElementById('contactEmail').textContent = profileData.email || 'email@example.com';
    document.getElementById('contactPhone').textContent = profileData.phone || '+20 100 123 4567';
    document.getElementById('contactLocation').textContent = profileData.location || 'القاهرة، مصر';
    
    // Update social links
    updateSocialLinks();
    
    // Update footer
    document.getElementById('footerName').textContent = `${profileData.name} ${profileData.surname}`;
}

function updateSocialLinks() {
    const socialLinks = [
        { id: 'githubLink', url: profileData.github },
        { id: 'linkedinLink', url: profileData.linkedin },
        { id: 'twitterLink', url: profileData.twitter },
        { id: 'githubLinkLarge', url: profileData.github },
        { id: 'linkedinLinkLarge', url: profileData.linkedin },
        { id: 'twitterLinkLarge', url: profileData.twitter },
        { id: 'instagramLinkLarge', url: profileData.instagram },
        { id: 'githubFooter', url: profileData.github },
        { id: 'linkedinFooter', url: profileData.linkedin },
        { id: 'twitterFooter', url: profileData.twitter }
    ];
    
    socialLinks.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
            element.href = link.url || '#';
        }
    });
}

function updateProjects() {
    const filteredProjects = currentFilter === 'all' 
        ? projects 
        : projects.filter(project => project.category === currentFilter);

    if (filteredProjects.length === 0) {
        projectsGrid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        projectsGrid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        projectsGrid.innerHTML = filteredProjects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image || `https://via.placeholder.com/400x300/7c3aed/FFFFFF?text=${project.name}`}" alt="${project.name}">
                    <div class="project-overlay">
                        <div class="project-links">
                            ${project.link ? `<a href="${project.link}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                            ${project.github ? `<a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>` : ''}
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function updateSkills() {
    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3 class="skill-name">${skill.name}</h3>
            <p class="skill-level">${skill.level}%</p>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    document.getElementById('projectsCount').textContent = projects.length;
    document.getElementById('skillsCount').textContent = skills.length;
    document.getElementById('experienceCount').textContent = profileData.experience || 0;
}

function updateProjectsList() {
    if (projects.length === 0) {
        projectsList.innerHTML = '<p style="text-align: center; color: var(--muted);">لا توجد مشاريع بعد</p>';
    } else {
        projectsList.innerHTML = projects.map(project => `
            <div class="list-item">
                <div class="list-info">
                    <h5>${project.name}</h5>
                    <p>${project.category} • ${project.tech.slice(0, 3).join(', ')}</p>
                </div>
                <div class="list-actions">
                    <button class="btn btn-sm ghost" onclick="editProject(${project.id})">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="btn btn-sm primary" onclick="deleteProject(${project.id})">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function updateSkillsList() {
    if (skills.length === 0) {
        skillsList.innerHTML = '<p style="text-align: center; color: var(--muted);">لا توجد مهارات بعد</p>';
    } else {
        skillsList.innerHTML = skills.map(skill => `
            <div class="list-item">
                <div class="list-info">
                    <h5>${skill.name}</h5>
                    <p>${skill.level}% • ${skill.icon}</p>
                </div>
                <div class="list-actions">
                    <button class="btn btn-sm ghost" onclick="editSkill(${skill.id})">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="btn btn-sm primary" onclick="deleteSkill(${skill.id})">
                        <i class="fas fa-trash"></i> حذف
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu
    menuBtn.addEventListener('click', toggleMobileMenu);
    
    // Admin panel
    adminBtn.addEventListener('click', openAdminModal);
    closeAdminModal.addEventListener('click', closeAdminModalFunc);
    
    // Project modal
    addProjectBtn.addEventListener('click', openAddProjectModal);
    closeProjectModal.addEventListener('click', closeProjectModalFunc);
    cancelProjectBtn.addEventListener('click', closeProjectModalFunc);
    projectForm.addEventListener('submit', handleProjectSubmit);
    
    // Skill modal
    addSkillBtn.addEventListener('click', openAddSkillModal);
    closeSkillModal.addEventListener('click', closeSkillModalFunc);
    cancelSkillBtn.addEventListener('click', closeSkillModalFunc);
    skillForm.addEventListener('submit', handleSkillSubmit);
    
    // Profile form
    profileForm.addEventListener('submit', handleProfileSubmit);
    
    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
    
    // Project filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterChange);
    });
    
    // Admin tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabChange);
    });
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            closeAdminModalFunc();
        }
        if (e.target === projectModal) {
            closeProjectModalFunc();
        }
        if (e.target === skillModal) {
            closeSkillModalFunc();
        }
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
    const savedTheme = localStorage.getItem('cv_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('cv_theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// ===== MOBILE MENU =====
function toggleMobileMenu() {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// ===== MODAL FUNCTIONS =====
function openAdminModal() {
    adminModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    populateProfileForm();
}

function closeAdminModalFunc() {
    adminModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openAddProjectModal() {
    editingProjectId = null;
    document.getElementById('projectModalTitle').textContent = 'إضافة مشروع جديد';
    projectForm.reset();
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openEditProjectModal(project) {
    editingProjectId = project.id;
    document.getElementById('projectModalTitle').textContent = 'تعديل المشروع';
    
    // Populate form with project data
    document.getElementById('projectName').value = project.name;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectImage').value = project.image || '';
    document.getElementById('projectLink').value = project.link || '';
    document.getElementById('projectGithub').value = project.github || '';
    document.getElementById('projectTech').value = project.tech.join(', ');
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModalFunc() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    projectForm.reset();
    editingProjectId = null;
}

function openAddSkillModal() {
    editingSkillId = null;
    document.getElementById('skillModalTitle').textContent = 'إضافة مهارة جديدة';
    skillForm.reset();
    skillModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openEditSkillModal(skill) {
    editingSkillId = skill.id;
    document.getElementById('skillModalTitle').textContent = 'تعديل المهارة';
    
    // Populate form with skill data
    document.getElementById('skillName').value = skill.name;
    document.getElementById('skillLevel').value = skill.level;
    document.getElementById('skillIcon').value = skill.icon;
    
    skillModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSkillModalFunc() {
    skillModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    skillForm.reset();
    editingSkillId = null;
}

// ===== FORM HANDLERS =====
function populateProfileForm() {
    document.getElementById('profileName').value = profileData.name || '';
    document.getElementById('profileSurname').value = profileData.surname || '';
    document.getElementById('profileTitle').value = profileData.title || '';
    document.getElementById('profileDescription').value = profileData.description || '';
    document.getElementById('profileAbout').value = profileData.about || '';
    document.getElementById('profileEmail').value = profileData.email || '';
    document.getElementById('profilePhone').value = profileData.phone || '';
    document.getElementById('profileLocation').value = profileData.location || '';
    document.getElementById('profileExperience').value = profileData.experience || 0;
    document.getElementById('profileGithub').value = profileData.github || '';
    document.getElementById('profileLinkedin').value = profileData.linkedin || '';
    document.getElementById('profileTwitter').value = profileData.twitter || '';
}

function handleProfileSubmit(e) {
    e.preventDefault();
    
    profileData = {
        ...profileData,
        name: document.getElementById('profileName').value,
        surname: document.getElementById('profileSurname').value,
        title: document.getElementById('profileTitle').value,
        description: document.getElementById('profileDescription').value,
        about: document.getElementById('profileAbout').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        location: document.getElementById('profileLocation').value,
        experience: parseInt(document.getElementById('profileExperience').value),
        github: document.getElementById('profileGithub').value,
        linkedin: document.getElementById('profileLinkedin').value,
        twitter: document.getElementById('profileTwitter').value
    };
    
    saveProfileData();
    updateProfile();
    updateStats();
    showToast('تم تحديث الملف الشخصي بنجاح!');
}

function handleProjectSubmit(e) {
    e.preventDefault();
    
    const projectData = {
        name: document.getElementById('projectName').value,
        category: document.getElementById('projectCategory').value,
        description: document.getElementById('projectDescription').value,
        image: document.getElementById('projectImage').value,
        link: document.getElementById('projectLink').value,
        github: document.getElementById('projectGithub').value,
        tech: document.getElementById('projectTech').value.split(',').map(tech => tech.trim()).filter(tech => tech)
    };
    
    if (editingProjectId) {
        // Update existing project
        const projectIndex = projects.findIndex(p => p.id === editingProjectId);
        if (projectIndex !== -1) {
            projects[projectIndex] = { ...projects[projectIndex], ...projectData };
            showToast('تم تحديث المشروع بنجاح!');
        }
    } else {
        // Add new project
        projects.push({
            id: Date.now(),
            ...projectData
        });
        showToast('تم إضافة المشروع بنجاح!');
    }
    
    saveProjects();
    updateProjects();
    updateProjectsList();
    updateStats();
    closeProjectModalFunc();
}

function handleSkillSubmit(e) {
    e.preventDefault();
    
    const skillData = {
        name: document.getElementById('skillName').value,
        level: parseInt(document.getElementById('skillLevel').value),
        icon: document.getElementById('skillIcon').value
    };
    
    if (editingSkillId) {
        // Update existing skill
        const skillIndex = skills.findIndex(s => s.id === editingSkillId);
        if (skillIndex !== -1) {
            skills[skillIndex] = { ...skills[skillIndex], ...skillData };
            showToast('تم تحديث المهارة بنجاح!');
        }
    } else {
        // Add new skill
        skills.push({
            id: Date.now(),
            ...skillData
        });
        showToast('تم إضافة المهارة بنجاح!');
    }
    
    saveSkills();
    updateSkills();
    updateSkillsList();
    updateStats();
    closeSkillModalFunc();
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would normally send the data to a server
    // For this demo, we'll just show a success message
    console.log('Contact form submitted:', { name, email, subject, message });
    
    contactForm.reset();
    showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
}

// ===== FILTER AND TAB FUNCTIONS =====
function handleFilterChange(e) {
    const filterBtn = e.target.closest('.filter-btn');
    if (!filterBtn) return;
    
    const filter = filterBtn.dataset.filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    filterBtn.classList.add('active');
    
    // Update current filter and projects
    currentFilter = filter;
    updateProjects();
}

function handleTabChange(e) {
    const tabBtn = e.target.closest('.tab-btn');
    if (!tabBtn) return;
    
    const tabName = tabBtn.dataset.tab;
    
    // Update active button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    tabBtn.classList.add('active');
    
    // Update active content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// ===== PROJECT AND SKILL MANAGEMENT =====
function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (project) {
        openEditProjectModal(project);
    }
}

function deleteProject(id) {
    if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
        projects = projects.filter(p => p.id !== id);
        saveProjects();
        updateProjects();
        updateProjectsList();
        updateStats();
        showToast('تم حذف المشروع بنجاح!');
    }
}

function editSkill(id) {
    const skill = skills.find(s => s.id === id);
    if (skill) {
        openEditSkillModal(skill);
    }
}

function deleteSkill(id) {
    if (confirm('هل أنت متأكد من حذف هذه المهارة؟')) {
        skills = skills.filter(s => s.id !== id);
        saveSkills();
        updateSkills();
        updateSkillsList();
        updateStats();
        showToast('تم حذف المهارة بنجاح!');
    }
}

// ===== UTILITY FUNCTIONS =====
function hideLoadingScreen() {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Animate skill bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Animate elements on scroll
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.project-card, .skill-card, .stat-item, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open admin panel
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openAdminModal();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        if (adminModal.classList.contains('active')) {
            closeAdminModalFunc();
        }
        if (projectModal.classList.contains('active')) {
            closeProjectModalFunc();
        }
        if (skillModal.classList.contains('active')) {
            closeSkillModalFunc();
        }
    }
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.editProject = editProject;
window.deleteProject = deleteProject;
window.editSkill = editSkill;
window.deleteSkill = deleteSkill;

// ===== SERVICE WORKER FOR PWA (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== DATA EXPORT/IMPORT FUNCTIONS =====
function exportData() {
    const data = {
        profile: profileData,
        projects: projects,
        skills: skills,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showToast('تم تصدير البيانات بنجاح!');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.profile) {
                profileData = data.profile;
                saveProfileData();
            }
            
            if (data.projects) {
                projects = data.projects;
                saveProjects();
            }
            
            if (data.skills) {
                skills = data.skills;
                saveSkills();
            }
            
            updateUI();
            showToast('تم استيراد البيانات بنجاح!');
        } catch (error) {
            showToast('خطأ في استيراد البيانات!');
            console.error('Import error:', error);
        }
    };
    
    reader.readAsText(file);
}

// Add export/import buttons to admin panel
document.addEventListener('DOMContentLoaded', () => {
    const adminTabs = document.querySelector('.admin-tabs');
    if (adminTabs) {
        const exportImportDiv = document.createElement('div');
        exportImportDiv.innerHTML = `
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button class="btn btn-sm ghost" onclick="exportData()">
                    <i class="fas fa-download"></i> تصدير البيانات
                </button>
                <label class="btn btn-sm ghost" style="margin: 0; cursor: pointer;">
                    <i class="fas fa-upload"></i> استيراد البيانات
                    <input type="file" accept=".json" onchange="importData(event)" style="display: none;">
                </label>
            </div>
        `;
        adminTabs.appendChild(exportImportDiv);
    }
});
// fix github pages loading
