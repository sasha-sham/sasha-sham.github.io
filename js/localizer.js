var dictionary = {
    "ru": {
        "my_name": "Александра Дубинкина",
        "my_role": "Арт-терапевт",
        "my_location": "(арт-терапевтическая студия Sasha Sham)",
        
        "text_welcome": "Добро пожаловать на мой сайт!",
        "text_who_is": "Меня зовут Александра Дубинкина, я арт-терапевт.",
        "text_about": "Живу в Витебске, имею свою студию по арт-терапии. Увлекаюсь творчеством, культурой разных стран, публикациями в сфере психологии, педагогики, языкознания.",
        
        "type_confidential": "Конфиденциальность",
        "text_confidential": "Всё сказанное Вами на сеансах является тайной",
        "type_comfort": "Ваш комфорт",
        "text_comfort": "Терапия проходит в удобное для Вас время с использованием различных методик и техник",
        "type_quality": "Упор на качество",
        "text_quality": "Терапия продолжается до решения проблемы или когда Вы сами решите закончить"
    },
    "en": {
        "my_name": "Aliaksandra Dubinkina",
        "my_role": "Art therapist",
        "my_location": "(art therapy studio Sasha Sham)",
        
        "text_welcome": "Welcome to my site!",
        "text_who_is": "My name is Alexandra Dubinkina, I am an art therapist.",
        "text_about": "I live in Vitebsk, I have my own art therapy studio. I am interested in creativity and culture different countries, publications in the field of psychology, pedagogy, linguistics.",
        
        "type_confidential": "Confidentiality",
        "text_confidential": "Everything you said during the sessions is a secret",
        "type_comfort": "Your comfort",
        "text_comfort": "Therapy takes place at a time convenient for you using various methods and techniques",
        "type_quality": "Focus on quality",
        "text_quality": "Therapy continues until the problem is resolved or when you decide to stop"
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
