var dictionary = {
    "ru": {
        "my_name": "Александра Дубинкина",
        "my_role": "Арт-терапевт",
        "my_location": "(арт-терапевтическая студия Sasha Sham)",
        
        "text_welcome": "Добро пожаловать на мой сайт!",
        "text_about_me": "Меня зовут Александра Дубинкина, я арт-терапевт.",
        "text_about": "Живу в Витебске, имею свою студию по арт-терапии. Увлекаюсь творчеством, культурой разных стран, публикациями в сфере психологии, педагогики, языкознания.",
        
        "type_confidential": "Конфиденциальность",
        "text_confidential": "Всё сказанное Вами на сеансах является тайной",
        "type_comfort": "Ваш комфорт",
        "text_comfort": "Терапия проходит в удобное для Вас время с использованием различных методик и техник",
        "type_quality": "Упор на качество",
        "text_quality": "Терапия продолжается до решения проблемы или когда Вы сами решите закончить",

        "type_format": "Формат работы:",
        "text_format_1": "провожу индивидуальные и групповые психологические консультации посредством арт-терапии;",
        "text_format_2": "психологические арт-игры;",
        "text_format_3": "арт-встречи (девичники, свидания, дни рождения) на русском и английском языках (для иностранной аудитории);",
        
        "type_recomendation": "Рекомендации для посещения моей арт-студии:",
        "text_recomendation_1": "у Вас есть конкретная проблема, которую Вы хотите решить, но не понимаете, как это сделать самостоятельно;",
        "text_recomendation_2": "преобладает желание глубже разобраться в себе (стиль жизни, ценности, желания, цели и др.);",
        "text_recomendation_3": "проблемная ситуация повторяется систематически (связь с Вашей личностью, темпераментом, моделями поведения, травмами и др.);",
        "text_recomendation_4": "задумались о развитии Вашего творческого потенциала и креативного времени препровождения и др.",

        "type_kids": "Личность ребенка",
        "text_kids": "Минимизация трудностей поведения и коммуникации, повышение адаптивности в меняющемся мире, концентрация на чувствах, подтверждение индивидуальности",
        "type_relationship": "Отношения",
        "text_relationship": "Научитесь ценить себя с партнёром, друзьями, говорить 'нет' без угрызения совести",
        "type_stress": "Стресс",
        "text_stress": "Выявим причины беспокойств, волнений, переживаний, тревожности и способы с этим справиться",

        "type_feedback": "Отзывы"
    },
    "en": {
        "my_name": "Aliaksandra Dubinkina",
        "my_role": "Art therapist",
        "my_location": "(art therapy studio Sasha Sham)",
        
        "text_welcome": "Welcome to my site!",
        "text_about_me": "My name is Alexandra Dubinkina, I am an art therapist.",
        "text_about": "I live in Vitebsk, I have my own art therapy studio. I am interested in creativity and culture different countries, publications in the field of psychology, pedagogy, linguistics.",
        
        "type_confidential": "Confidentiality",
        "text_confidential": "Everything you said during the sessions is a secret",
        "type_comfort": "Your comfort",
        "text_comfort": "Therapy takes place at a time convenient for you using various methods and techniques",
        "type_quality": "Focus on quality",
        "text_quality": "Therapy continues until the problem is resolved or when you decide to stop",

        "type_format": "Work format:",
        "text_format_1": "individual and group psychological consultations through art therapy;",
        "text_format_2": "psychological art games;",
        "text_format_3": "art meetings (hen parties, dates, birthdays) in Russian and English (for foreign audiences);",

        "type_recomendation": "Recommendations for visiting my art studio:",
        "text_recomendation_1": "you have a specific problem that you want to solve, but you don’t understand how to do it yourself;",
        "text_recomendation_2": "the desire to understand yourself more deeply (lifestyle, values, desires, goals, etc.);",
        "text_recomendation_3": "the problematic situation is repeated systematically (connection with your personality, temperament, behavior patterns, traumas, scars, etc.);",
        "text_recomendation_4": "thought about developing your creative potential and spend time creatively, etc.",

        "type_kids": "Child's personality",
        "text_kids": "Minimizing behavioral and communication difficulties, increasing adaptability in a changing world, focusing on feelings, confirming individuality",
        "type_relationship": "Relationship",
        "text_relationship": "Learn to value yourself with your partner, friends, and say 'no' without remorse",
        "type_stress": "Stress",
        "text_stress": "We will identify the causes of worries, worries, worries, anxiety and ways to cope with them",

        "type_feedback": "Feebback"
    }

}

class HTMLLocalizer {
    constructor() {
        customElements.define('localized-text', LocalizedTextElement);
    }
}

class LocalizedTextElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        var key = this.hasAttribute('key') ? this.getAttribute('key') : ''; 
        var lang = this.hasAttribute('lang') ? this.getAttribute('lang') : this.getLang();
        this.innerHTML = this.translate(key, lang);
    }

    getLang() {
        var lang = (navigator.languages != undefined)?navigator.languages[0]:navigator.language;
        // Ignore country code (example: en-US -> en)
        return lang.split("-")[0];
    }
    
    translate(key, lang) {
        return (lang in dictionary)?dictionary[lang][key]:dictionary['ru'][key];
    }
}
  
new HTMLLocalizer();
