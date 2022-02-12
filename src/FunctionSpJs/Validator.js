
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
function Validator({form,rules,errorSelector,exist,callBack})
{
    const formElement = $(form)
    if(formElement)
    {
        const rulesCollection = {}
        function validate(errorElement,inputElement,selector){
            let isCorrect = true
            for(var i=0 ;i<rulesCollection[selector].length;i++)
            {
                let errorMessage = rulesCollection[selector][i](inputElement.value)
                if(errorMessage)
                {
                    errorElement.innerText = errorMessage
                    isCorrect=false
                    break
                }
            }
            return isCorrect
        }
        //set test function into an object array
        rules.forEach(({test,selector})=>{
            if(Array.isArray(rulesCollection[selector]))
            {
                rulesCollection[selector].push(test)
            }
            else{
                rulesCollection[selector] = [test]
            }
        })
        //loop and listening events
        rules.forEach(({test,selector})=>{
            const inputElement = $(selector)
            if(inputElement)
            {
                const errorElement = inputElement.parentElement.parentElement.querySelector(`.${errorSelector}`)
                inputElement.onblur = ()=>{
                    validate(errorElement,inputElement,selector)
                }
                inputElement.oninput = ()=>{
                    const existElement = $(exist.selector)
                    errorElement.innerText=''
                    existElement.innerText = ''
                }
            }
        })
        formElement.onsubmit = async (e)=>{
            e.preventDefault()
            let result = {}
            let isSubmit = true
            rules.forEach(({test,selector})=>{
                const inputElement = $(selector)
                if(inputElement)
                {
                    const errorElement = inputElement.parentElement.parentElement.querySelector(`.${errorSelector}`)
                    if(validate(errorElement,inputElement,selector))
                    {
                        result[inputElement.name] = inputElement.value
                    }
                    else{
                        isSubmit=false
                    }
                }
            })
            delete result.passwordConfirmation
            if(isSubmit)
            {
                callBack(result,exist)
            }
        }
    }
}
Validator.isRequire = (selector,message)=>{
    return {
        selector,
        test:(value)=>{
            return value.trim()===''?message||'Vui lòng nhập trường này!':undefined
        }
    }
}
Validator.minLength = (selector,min)=>{
    return {
        selector,
        test:(value)=>{
            return value.trim().length>=min?undefined:`Vui lòng nhập tối thiểu ${min} ký tự!`
        }
    }
}
Validator.passwordComfirmation = (selector,passwordSelector,message)=>{
    function getPassword(){
        const passwordElement = $(passwordSelector)
        const password = passwordElement.value
        return password
    }
    return{
        selector,
        test:(value)=>{
            return getPassword()===value?undefined:message||'Mật khẩu xác nhận không chính xác!'
        }
    }
}

export default Validator
