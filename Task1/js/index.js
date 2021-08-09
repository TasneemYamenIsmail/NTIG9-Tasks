
const addForm = document.querySelector('#addForm')
studentHeads = ['name', 'class', 'age', 'grade']


students = []
let student = {}

addForm.addEventListener('submit', function(e){
    e.preventDefault()
    studentHeads.forEach(cHead => {
        student[cHead] = this.elements[cHead].value});

  const valid=validateFields(student);
    if(valid) {
        students.push(student);
        col3Div = createNewElement("div", "", "col-3", rowDiv,[])
        single = createNewElement("div", "","m-2 p-2 border border-1 bg-warning text-center text-white", col3Div,[])

        createNewElement('h4', student.name, "", single,[])
        createNewElement('h6', student.age, "", single,[])
        createNewElement('p', student.class, "", single,[])
        createNewElement('p', student.grade, "", single,[])
        const button=createNewElement('button', 'delete', "btn btn-danger", single,[])
        button.addEventListener('click',function(e){
            students.splice(students.indexOf(student),1)
            this.parentElement.parentElement.remove()
            console.log('students: after delete',students)
        });
    }
})

addForm.addEventListener('keyup',()=>{
   document.querySelector(".alert-danger").remove();
})

mainWrap = document.querySelector('#mainWrapper');

let createNewElement = (elementTag, elementTxt, elementClasses,parent, attributes) =>{
    myNewEl = document.createElement(elementTag)
    if(elementTxt!='') myNewEl.innerText = elementTxt
    if(elementClasses!="") myNewEl.className =elementClasses
    parent.appendChild(myNewEl)  

    attributes.forEach(attr=>{
            myNewEl.setAttribute(attr.attrName, attr.attrVal)
        })
    return myNewEl  
}

let createForm=(studentHeads)=>{
    studentHeads.forEach(sHead=>{
        const div=createNewElement('div',"","mb-3",addForm,[{attrName:'id',attrVal:sHead}])
        createNewElement('input',"","form-control",div,[{attrName:'name',attrVal:sHead}, {attrName:'placeholder',attrVal:sHead}])
    })
   createNewElement('input',"","btn btn-primary",addForm,[{attrName:'type',attrVal:'submit'}, {attrName:'value',attrVal:'Add Student'}])
}

createForm(studentHeads);

rowDiv = createNewElement("div", "", "row", mainWrap,[])

function validateFields(student){
    let noErr=true
    studentHeads.forEach(cHead=>{
        myErr = document.createElement('div')

        if(!student[cHead]){
            noErr=false
        myErr.className = 'alert alert-danger mt-2'
        myErr.innerText = `please add ${cHead}`
        document.querySelector(`#${cHead}`).appendChild(myErr)
        
        }
        else{
            myErr.remove()
        }
    })
    return noErr
}