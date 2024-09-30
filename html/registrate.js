

const email = document.getElementById('email');
const contraseña = document.getElementById('contraseña');
const submit = document.getElementById('submit');
const visible = document.getElementById('visible');

document.addEventListener("change", (e)=>{
    if (e.target === visible){
        if (visible.checked === false)contraseña.type = "password";
        else contraseña.type = "text";
    }
});



document.addEventListener("click", (e)=>{
    if(e.target === submit ){
        if(contraseña.value !== "" || email.value !== ""){
            e.preventDefault();
            window.location.href="home.html";
            
            
        }
    }
})



