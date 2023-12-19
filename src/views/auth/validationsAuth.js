const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;





export default function validations(input){
console.log(input)


    const error ={};

    if(!input.email){
        error.email = 'Este campo no puede estar vacio';
    }

    if(!emailRegex.test(input.email)){
        error.email = 'Correo electrónico inválido';
    }
    if(!input.password){
        error.password = 'Este campo no puede estar vacio';
    }
    if(!passwordRegex.test(input.password)){
        error.password = 'Debe ser  mayo a 8 y contener un caracter especial';
    }
return error
}