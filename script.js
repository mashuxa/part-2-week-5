'use strict'; 
function validateForm(settings) {
    var form = document.getElementById(settings.formId);
    var inputs = document.getElementsByTagName("input");

   
    //    функция которая делает проверку одного инпута
    function check(elem) {
        var val = elem.value;
        var isValid = true;

        //проверка на required
        if ((elem.dataset.required !== undefined) && (val.trim() === "")) {
            elem.classList.add(settings.inputErrorClass);
            return false;
        }


        switch (elem.dataset.validator) {
            case "letters":
                if (val.match(/^([a-zа-яё]*)$/ig) === null) {
                    isValid = false;
                }
                break;
            case "number":
                if (val.match(/^(-?\d*)$/ig) === null) {
                    isValid = false;
                } else {
                    if ((elem.dataset.validatorMax !== undefined) && (Number(val) > Number(elem.dataset.validatorMax))) {
                        isValid = false;
                    } else if ((elem.dataset.validatorMin !== undefined) && (Number(val) < Number(elem.dataset.validatorMin))) {
                        isValid = false;
                    }

                }

                break;
            case "regexp":
                if (val.match(elem.dataset.validatorPattern) === null) {
                    isValid = false;
                }
                break;
        } 
        
        
        if (!isValid) {
            elem.classList.add(settings.inputErrorClass);
        }
        
        
        return isValid;
    }


    //отмена стандартной отправки формы
    //проверка всех инпутов по enter или кнопке
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var formClass = settings.formValidClass;

        for (var i = 0; i < inputs.length; i++) {
            if (!check(inputs[i])) {
                formClass = settings.formInvalidClass;
            }
        }
        form.classList.remove(settings.formValidClass);
        form.classList.remove(settings.formInvalidClass);
        form.classList.add(formClass);
    }, true);


    //потеря фокуса на инпуте
    //проверка теекущего инпута при потере фокуса
    form.addEventListener("blur", function (e) {
        var currentInput = e.target;
        if (currentInput.tagName === "INPUT") {
            check(currentInput);
        }
    }, true);


    //при фокусе на инпуте
    //удалить класс с ошибкой
    form.addEventListener("focus", function (e) {
        if (e.target.tagName === "INPUT") {
            e.target.classList.remove(settings.inputErrorClass);
        }
    }, true);


}
