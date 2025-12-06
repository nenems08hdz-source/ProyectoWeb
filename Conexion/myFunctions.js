function validaLogin()
{
    let Estudiante=document.getElementById("Nombre").value;
    let Ap_Paterno=document.getElementById("Apellido paterno").value;
    let Ap_Materno=document.getElementById("Apellido materno").value;
    let Correo=document.getElementById("Correo institucional").value;
    let Grado=document.getElementById("Grado").value;
    let Grupo=document.getElementById("Grupo").value;

    if(Estudiante.lenght ==0 || Ap_Paterno.lenght ==0 || Ap_Materno.lenght ==0 || Correo.lenght ==0 || Grado.lenght ==0 || Grupo.lenght ==0) {
        
   { alert ("Debes introducir todos los datos requeridos")}
 } else {
        if (confirm("Deseas continuar..."))
            {
            document.forms.submit();
        }
    }
}