'use strict';

function validateForm(settings) {
    var form = document.getElementById(settings.formId);
    var isValidForm = false;

    function check(elem) {
        console.log(elem);
        var isInvalidInput = false;

        //проверка элемента. если элемент верно заполнен вернуть true

        if (isInvalidInput) {
            elem.classList.add(settings.inputErrorClass);
        }
    }






    //отмена стандартной отправки формы
    //проверка всех инпутов
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        var elements = document.getElementsByTagName("input");
        for (var i = 0; i < elements.length; i++) {
            check(elements[i]);

        }
    }, true);



    //потеря фокуса на инпуте
    form.addEventListener("blur", function (e) {
        if (e.target.tagName === "INPUT") {
            check(e.target);
        }
    }, true);


    //при фокусе на инпуте 
    form.addEventListener("focus", function (e) {
        if (e.target.tagName === "INPUT") {
            e.target.classList.remove(settings.inputErrorClass);
        }
    }, true);







}
