const fullPhoto = document.querySelector('.thirdOrderContainerImgTop');
const thumbnails = document.querySelectorAll('.thirdOrderContainerImgDown');

for(let i = 0; i < thumbnails.length; i++){
    thumbnails[i].addEventListener('click', function(){
        fullPhoto.src = thumbnails[i].src;
    });
}




function isNumeric(char){
    if (char >= '0' && char <='9')
        return true;
    return false;
}

function isDigit(s)
{
    let i = 0;
    while (i<s.length)
    {
        if (isNumeric(s[i])==false)
            return false;
        i++;
    }
    return true;
}
function isLetter(char){
    if (char >= 'a' && char <='z')
        return true;
    else if (char >= 'A' && char <='Z')
        return true;
    return false;
}
function isAlpha(s){
    let i = 0;
    while (i<s.length)
    {
        if (isLetter(s[i])==false){
            return false;
        }
        i++;
    }
    return true;
}

function validation(form){
    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.errorLabel').remove()
            parent.classList.remove('error')
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label')
    
        errorLabel.classList.add('errorLabel')
        errorLabel.textContent = text
        parent.classList.add('error')
        parent.append(errorLabel)
    }
    let result = true;
    const allInputs=form.querySelectorAll('input');
    for (const input of allInputs){
        removeError(input);
        if (input.dataset.phone){
            if (input.value.length != input.dataset.phone){
                removeError(input);
                createError(input, `Длина номера должна равеняться 11`)
                result = false;
            }
            if (isDigit(input.value)==false){
                removeError(input);
                createError(input, `Только цифры`);
                result = false;
            }
        }
        if (input.dataset.name){
            if (input.value.length <1){
                removeError(input);
                createError(input, `Длина имени должна быть больше 1`)
                result = false;
            }
            if (isAlpha(input.value)==false){
                removeError(input);
                createError(input, `Только буквы`);
                result = false;
            }
        }
    }
    return result;
}

document.getElementById('Checker').addEventListener('submit', function(e){
    e.preventDefault();
    if (validation(this) == true){
        alert('Форма было успешно проверена!');
    }
})



const modalopen=document.getElementById("modalOpen");
const buymodal= document.getElementById("buyModal");
const modalOpenMaster= document.getElementById("modalOpenMaster");
const closeModalBtn= document.getElementById("closeModalBtn");

modalopen.addEventListener("click",function(){
    buymodal.classList.add("open")
});
modalOpenMaster.addEventListener("click",function(){
    buymodal.classList.add("open")
});
closeModalBtn.addEventListener("click",function(){
    buymodal.classList.remove("open")
});
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        buymodal.classList.remove("open")
    }
});
 