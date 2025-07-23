// Comprehensive JavaScript Learning App
class LearningApp {
    constructor() {
        this.courses = this.getCourseData();
        this.currentLesson = null;
        this.userProgress = this.getUserProgress();
        this.initElements();
        this.initEventListeners();
        this.renderNavigation();
        this.updateProgress();
        this.setupCodeEditor();
    }

    initElements() {
        this.themeToggle = document.getElementById('themeToggle');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.courseNav = document.getElementById('courseNav');
        this.lessonView = document.getElementById('lessonView');
        this.progressText = document.getElementById('progressText');
        this.progressFill = document.getElementById('progressFill');
        this.codeEditorContainer = document.getElementById('codeEditorContainer');
        this.codeEditor = document.getElementById('codeEditor');
        this.codeOutput = document.getElementById('codeOutput');
        this.runCodeBtn = document.getElementById('runCode');
        this.closeEditorBtn = document.getElementById('closeEditor');
    }

    initEventListeners() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.searchBtn.addEventListener('click', () => this.searchLessons());
        this.searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') this.searchLessons();
        });
        this.runCodeBtn.addEventListener('click', () => this.executeCode());
        this.closeEditorBtn.addEventListener('click', () => this.closeCodeEditor());
    }

    getCourseData() {
        return [
            {
                id: 'js-fundamentals',
                title: 'JavaScript Fundamentals',
                description: 'Master the core concepts of JavaScript',
                icon: 'fas fa-code',
                sections: [
                    {
                        title: 'Variables & Data Types',
                        lessons: [
                            { id: 'var-let-const', title: 'var, let & const', duration: '10 min' },
                            { id: 'data-types', title: 'Data Types', duration: '15 min' },
                            { id: 'type-conversion', title: 'Type Conversion', duration: '12 min' }
                        ]
                    },
                    {
                        title: 'Operators & Expressions',
                        lessons: [
                            { id: 'arithmetic-ops', title: 'Arithmetic Operators', duration: '8 min' },
                            { id: 'comparison-ops', title: 'Comparison Operators', duration: '10 min' },
                            { id: 'logical-ops', title: 'Logical Operators', duration: '12 min' }
                        ]
                    },
                    {
                        title: 'Control Flow',
                        lessons: [
                            { id: 'conditionals', title: 'Conditional Statements', duration: '15 min' },
                            { id: 'loops', title: 'Loops', duration: '18 min' },
                            { id: 'switch-case', title: 'Switch Case', duration: '10 min' }
                        ]
                    }
                ]
            },
            {
                id: 'functions-scope',
                title: 'Functions & Scope',
                description: 'Learn about functions and scope in JavaScript',
                icon: 'fas fa-project-diagram',
                sections: [
                    {
                        title: 'Function Basics',
                        lessons: [
                            { id: 'function-declaration', title: 'Function Declaration', duration: '12 min' },
                            { id: 'function-expression', title: 'Function Expression', duration: '10 min' },
                            { id: 'arrow-functions', title: 'Arrow Functions', duration: '15 min' }
                        ]
                    },
                    {
                        title: 'Scope & Closures',
                        lessons: [
                            { id: 'scope', title: 'Variable Scope', duration: '15 min' },
                            { id: 'hoisting', title: 'Hoisting', duration: '12 min' },
                            { id: 'closures', title: 'Closures', duration: '20 min' }
                        ]
                    }
                ]
            },
            {
                id: 'advanced-js',
                title: 'Advanced JavaScript',
                description: 'Dive into advanced JavaScript concepts',
                icon: 'fas fa-rocket',
                sections: [
                    {
                        title: 'Object Oriented JS',
                        lessons: [
                            { id: 'objects', title: 'Objects Basics', duration: '15 min' },
                            { id: 'prototypes', title: 'Prototypes', duration: '20 min' },
                            { id: 'classes', title: 'ES6 Classes', duration: '18 min' }
                        ]
                    },
                    {
                        title: 'Asynchronous JS',
                        lessons: [
                            { id: 'callbacks', title: 'Callbacks', duration: '15 min' },
                            { id: 'promises', title: 'Promises', duration: '20 min' },
                            { id: 'async-await', title: 'Async/Await', duration: '18 min' }
                        ]
                    },
                    {
                        title: 'Modern Features',
                        lessons: [
                            { id: 'destructuring', title: 'Destructuring', duration: '15 min' },
                            { id: 'spread-rest', title: 'Spread/Rest', duration: '12 min' },
                            { id: 'modules', title: 'Modules', duration: '20 min' }
                        ]
                    }
                ]
            }
        ];
    }

    getUserProgress() {
        const savedProgress = localStorage.getItem('jsLearningProgress');
        return savedProgress ? JSON.parse(savedProgress) : { completedLessons: [], lastLesson: null };
    }

    saveProgress() {
        localStorage.setItem('jsLearningProgress', JSON.stringify(this.userProgress));
        this.updateProgress();
    }

    updateProgress() {
        const totalLessons = this.courses.reduce((total, course) => {
            return total + course.sections.reduce((sectionTotal, section) => {
                return sectionTotal + section.lessons.length;
            }, 0);
        }, 0);

        const completedCount = this.userProgress.completedLessons.length;
        const progressPercent = Math.round((completedCount / totalLessons) * 100);

        this.progressText.textContent = `${progressPercent}%`;
        this.progressFill.style.width = `${progressPercent}%`;
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const icon = this.themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }

    checkTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            this.themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    renderNavigation() {
        this.courseNav.innerHTML = '';
        
        this.courses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course-section';
            courseElement.innerHTML = `
                <div class="section-title">
                    <span><i class="${course.icon}"></i> ${course.title}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <ul class="lesson-list"></ul>
            `;
            
            const sectionTitle = courseElement.querySelector('.section-title');
            const lessonList = courseElement.querySelector('.lesson-list');
            
            course.sections.forEach(section => {
                const sectionElement = document.createElement('li');
                sectionElement.className = 'section-title';
                sectionElement.innerHTML = `
                    <span>${section.title}</span>
                    <i class="fas fa-chevron-down"></i>
                `;
                
                const sectionLessonList = document.createElement('ul');
                sectionLessonList.className = 'lesson-list';
                
                section.lessons.forEach(lesson => {
                    const lessonElement = document.createElement('li');
                    lessonElement.className = `lesson-item ${this.userProgress.completedLessons.includes(lesson.id) ? 'completed' : ''} ${this.userProgress.lastLesson === lesson.id ? 'active' : ''}`;
                    lessonElement.innerHTML = `
                        <span>${lesson.title}</span>
                        <small>${lesson.duration}</small>
                    `;
                    lessonElement.addEventListener('click', () => this.loadLesson(course.id, section.title, lesson));
                    
                    sectionLessonList.appendChild(lessonElement);
                });
                
                sectionElement.addEventListener('click', () => {
                    sectionLessonList.classList.toggle('show');
                    sectionElement.classList.toggle('collapsed');
                });
                
                lessonList.appendChild(sectionElement);
                lessonList.appendChild(sectionLessonList);
            });
            
            sectionTitle.addEventListener('click', () => {
                lessonList.classList.toggle('show');
                sectionTitle.classList.toggle('collapsed');
            });
            
            this.courseNav.appendChild(courseElement);
        });
        
        // Open the last viewed lesson's section
        if (this.userProgress.lastLesson) {
            this.openLessonSection(this.userProgress.lastLesson);
        }
        
        this.checkTheme();
    }

    openLessonSection(lessonId) {
        // Find the lesson and open its parent sections
        for (const course of this.courses) {
            for (const section of course.sections) {
                if (section.lessons.some(lesson => lesson.id === lessonId)) {
                    const sectionElements = document.querySelectorAll('.section-title');
                    sectionElements.forEach(el => {
                        if (el.textContent.includes(section.title) || el.textContent.includes(course.title)) {
                            const lessonList = el.nextElementSibling;
                            if (lessonList && lessonList.classList.contains('lesson-list')) {
                                lessonList.classList.add('show');
                                el.classList.remove('collapsed');
                            }
                        }
                    });
                    return;
                }
            }
        }
    }

    searchLessons() {
        const searchTerm = this.searchInput.value.toLowerCase();
        if (!searchTerm) return;
        
        const results = [];
        
        this.courses.forEach(course => {
            course.sections.forEach(section => {
                section.lessons.forEach(lesson => {
                    if (lesson.title.toLowerCase().includes(searchTerm) || 
                        section.title.toLowerCase().includes(searchTerm) || 
                        course.title.toLowerCase().includes(searchTerm)) {
                        results.push({
                            course: course.title,
                            section: section.title,
                            lesson
                        });
                    }
                });
            });
        });
        
        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        this.lessonView.innerHTML = `
            <h2>Search Results for "${this.searchInput.value}"</h2>
            ${results.length === 0 ? '<p>No lessons found matching your search.</p>' : ''}
            <div class="search-results"></div>
        `;
        
        const resultsContainer = this.lessonView.querySelector('.search-results');
        
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result-item';
            resultElement.innerHTML = `
                <h3>${result.lesson.title}</h3>
                <p><strong>Course:</strong> ${result.course} | <strong>Section:</strong> ${result.section}</p>
                <button class="interactive-btn load-lesson-btn" data-course="${result.course}" data-section="${result.section}" data-lesson="${result.lesson.id}">
                    Go to Lesson
                </button>
            `;
            
            resultsContainer.appendChild(resultElement);
        });
        
        document.querySelectorAll('.load-lesson-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const courseId = btn.getAttribute('data-course');
                const sectionTitle = btn.getAttribute('data-section');
                const lessonId = btn.getAttribute('data-lesson');
                
                const course = this.courses.find(c => c.title === courseId);
                if (!course) return;
                
                const section = course.sections.find(s => s.title === sectionTitle);
                if (!section) return;
                
                const lesson = section.lessons.find(l => l.id === lessonId);
                if (!lesson) return;
                
                this.loadLesson(course.id, section.title, lesson);
            });
        });
    }

    loadLesson(courseId, sectionTitle, lesson) {
        this.currentLesson = { courseId, sectionTitle, ...lesson };
        this.userProgress.lastLesson = lesson.id;
        this.saveProgress();
        
        // Update active lesson in navigation
        document.querySelectorAll('.lesson-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeLesson = document.querySelector(`.lesson-item span:contains(${lesson.title})`);
        if (activeLesson) {
            activeLesson.closest('.lesson-item').classList.add('active');
        }
        
        // Load lesson content
        this.displayLessonContent();
    }

    displayLessonContent() {
        if (!this.currentLesson) return;
        
        const lessonContent = this.getLessonContent(this.currentLesson.id);
        
        this.lessonView.innerHTML = `
            <div class="lesson-content">
                <h2>${this.currentLesson.title}</h2>
                <p class="lesson-meta">${this.getCourseTitle(this.currentLesson.courseId)} • ${this.currentLesson.sectionTitle} • ${this.currentLesson.duration}</p>
                
                ${lessonContent}
                
                <div class="lesson-actions">
                    <button class="interactive-btn toggle-editor-btn">
                        <i class="fas fa-code"></i> Open Code Editor
                    </button>
                    <label class="completed-checkbox">
                        <input type="checkbox" id="completedCheckbox" ${this.userProgress.completedLessons.includes(this.currentLesson.id) ? 'checked' : ''}>
                        Mark as completed
                    </label>
                </div>
            </div>
        `;
        
        document.getElementById('completedCheckbox').addEventListener('change', (e) => {
            if (e.target.checked) {
                if (!this.userProgress.completedLessons.includes(this.currentLesson.id)) {
                    this.userProgress.completedLessons.push(this.currentLesson.id);
                }
            } else {
                this.userProgress.completedLessons = this.userProgress.completedLessons.filter(id => id !== this.currentLesson.id);
            }
            this.saveProgress();
            this.renderNavigation();
        });
        
        document.querySelector('.toggle-editor-btn').addEventListener('click', () => {
            this.toggleCodeEditor();
        });
        
        // Add copy functionality to code examples
        document.querySelectorAll('.copy-code').forEach(btn => {
            btn.addEventListener('click', () => {
                const code = btn.previousElementSibling.textContent;
                navigator.clipboard.writeText(code);
                btn.textContent = 'Copied!';
                setTimeout(() => {
                    btn.textContent = 'Copy';
                }, 2000);
            });
        });
    }

    getCourseTitle(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        return course ? course.title : '';
    }

    getLessonContent(lessonId) {
        // In a real app, this would come from a database or separate content files
        const lessonContents = {
            'var-let-const': `
                <p>JavaScript provides three ways to declare variables: <code>var</code>, <code>let</code>, and <code>const</code>.</p>
                
                <h3>var</h3>
                <p>The <code>var</code> keyword is the oldest way to declare variables. It has function scope and is hoisted.</p>
                <div class="code-example">
                    <pre>var x = 10;
if (true) {
    var x = 20; // Same variable
    console.log(x); // 20
}
console.log(x); // 20</pre>
                    <button class="copy-code">Copy</button>
                </div>
                
                <h3>let</h3>
                <p><code>let</code> has block scope and is not hoisted. It allows reassignment but not redeclaration in the same scope.</p>
                <div class="code-example">
                    <pre>let y = 10;
if (true) {
    let y = 20; // Different variable
    console.log(y); // 20
}
console.log(y); // 10</pre>
                    <button class="copy-code">Copy</button>
                </div>
                
                <h3>const</h3>
                <p><code>const</code> also has block scope but cannot be reassigned after declaration.</p>
                <div class="code-example">
                    <pre>const z = 10;
// z = 20; // Error: Assignment to constant variable</pre>
                    <button class="copy-code">Copy</button>
                </div>
                
                <div class="challenge-container">
                    <h3 class="challenge-title">Challenge</h3>
                    <p>Predict the output of the following code:</p>
                    <div class="code-example">
                        <pre>for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j), 1000);
}</pre>
                    </div>
                    <button class="interactive-btn show-answer-btn">Show Answer</button>
                    <div class="answer" style="display: none;">
                        <p>The first loop will log <code>3</code> three times because <code>var</code> has function scope. The second loop will log <code>0, 1, 2</code> because <code>let</code> has block scope.</p>
                    </div>
                </div>
            `,
            'data-types': `
                <p>JavaScript has several built-in data types:</p>
                <ul>
                    <li>Primitives: String, Number, Boolean, Null, Undefined, Symbol, BigInt</li>
                    <li>Object: Object, Array, Function, Date, etc.</li>
                </ul>
                
                <h3>Type Checking</h3>
                <p>Use <code>typeof</code> operator to check the type of a value:</p>
                <div class="code-example">
                    <pre>console.log(typeof "hello"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (historical bug)
console.log(typeof []); // "object"
console.log(typeof {}); // "object"
console.log(typeof function(){}); // "function"</pre>
                    <button class="copy-code">Copy</button>
                </div>
            `,
            // More lesson content would be added here...
            'promises': `
                <p>Promises represent the eventual completion (or failure) of an asynchronous operation.</p>
                
                <h3>Creating a Promise</h3>
                <div class="code-example">
                    <pre>const myPromise = new Promise((resolve, reject) => {
    // Asynchronous operation here
    const success = true; // Simulate success/failure
    
    if (success) {
        resolve('Operation succeeded!');
    } else {
        reject('Operation failed!');
    }
});</pre>
                    <button class="copy-code">Copy</button>
                </div>
                
                <h3>Using Promises</h3>
                <div class="code-example">
                    <pre>myPromise
    .then(result => {
        console.log(result); // "Operation succeeded!"
    })
    .catch(error => {
        console.error(error); // "Operation failed!"
    })
    .finally(() => {
        console.log('Operation complete');
    });</pre>
                    <button class="copy-code">Copy</button>
                </div>
                
                <div class="challenge-container">
                    <h3 class="challenge-title">Challenge</h3>
                    <p>Convert this callback-based code to use Promises:</p>
                    <div class="code-example">
                        <pre>function fetchData(callback) {
    setTimeout(() => {
        callback(null, 'Data received');
    }, 1000);
}

fetchData((err, data) => {
    if (err) console.error(err);
    else console.log(data);
});</pre>
                    </div>
                    <button class="interactive-btn show-answer-btn">Show Answer</button>
                    <div class="answer" style="display: none;">
                        <div class="code-example">
                            <pre>function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data received');
        }, 1000);
    });
}

fetchData()
    .then(data => console.log(data))
    .catch(err => console.error(err));</pre>
                        </div>
                    </div>
                </div>
            `
        };
        
        return lessonContents[lessonId] || `<p>Lesson content not available.</p>`;
    }

    setupCodeEditor() {
        // Initialize the code editor with default content
        this.codeEditor.value = `// Write your JavaScript code here\n\nconsole.log("Hello, World!");`;
        
        // Add event listeners for challenge buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('show-answer-btn')) {
                const answer = e.target.nextElementSibling;
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                e.target.textContent = answer.style.display === 'none' ? 'Show Answer' : 'Hide Answer';
            }
            
            if (e.target.classList.contains('run-example-btn')) {
                const code = e.target.getAttribute('data-code');
                this.codeEditor.value = code;
                this.toggleCodeEditor();
            }
        });
    }

    toggleCodeEditor() {
        this.codeEditorContainer.classList.toggle('open');
    }

    closeCodeEditor() {
        this.codeEditorContainer.classList.remove('open');
    }

    executeCode() {
        try {
            this.codeOutput.innerHTML = '';
            const originalConsoleLog = console.log;
            
            console.log = (...args) => {
                originalConsoleLog(...args);
                args.forEach(arg => {
                    const outputLine = document.createElement('div');
                    outputLine.textContent = typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
                    this.codeOutput.appendChild(outputLine);
                });
            };
            
            // Use Function constructor to avoid security issues with eval
            new Function(this.codeEditor.value)();
            
            console.log = originalConsoleLog;
        } catch (error) {
            this.codeOutput.textContent = `Error: ${error.message}`;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new LearningApp();
});