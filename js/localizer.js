var dictionary = {
    "_": { // when language is not supported
        "my_name": "Александра Дубинкина",
        "my_role": "Арт-терапевт",
        
        "type_confidential": "Конфиденциальность",
        "text_confidential": "Всё сказанное Вами на сеансах является тайной",
        "type_comfort": "Ваш комфорт",
        "text_comfort": "Терапия проходит в удобное для Вас время с использованием различных методик и техник"
    },
    "en": {
        "my_name": "Aliaksandra Dubinkina",
        "my_role": "Art therapist",
        
        "type_confidential": "Confidentiality",
        "text_confidential": "Everything you said during the sessions is a secret",
        "type_comfort": "Your comfort",
        "text_comfort": "Therapy takes place at a time convenient for you using various methods and techniques"
    },
    "ru": {
        "my_name": "Александра Дубинкина",
        "my_role": "Арт-терапевт",
        
        "type_confidential": "Конфиденциальность",
        "text_confidential": "Всё сказанное Вами на сеансах является тайной",
        "type_comfort": "Ваш комфорт",
        "text_comfort": "Терапия проходит в удобное для Вас время с использованием различных методик и техник"
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
        return (lang in dictionary)?dictionary[lang][key]:dictionary['_'][key];
    }
}
  
new HTMLLocalizer();
