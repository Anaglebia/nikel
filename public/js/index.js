const myModal = new bootstrap.Modal("#register-Modal");
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');
checkLogged();

// Logar no sistema
document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault(e);

    const email = document.getElementById('login-input').value;
    const password = document.getElementById('password-input').value;
    const checkSession = document.getElementById('session-check').checked;

    const accont = getAccount(email);

    if(!accont){
        alert('Ops, verifiqe o seu usuario e senha!');
        return;
    }
    if(accont){
        if(accont.password !== password){
            alert('Ops, verifiqe o seu usuario e senha!');
            return;
        }
        saveSession(email, checkSession );
        window.location.href = 'home.html';
    }
   
});

// Criar conta
document.getElementById('form-create').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email-create-input').value;
    const password = document.getElementById('senha-create-input').value;

    if(email.length < 5) {
        alert('Preencha o compo com um e-amil valido');
        return;
    }if(password.length < 4) {
        alert('A senha deve ter no minimo 6 caracteres');
        return;
    }

    saveAcount({
        login:email,
        password: password,
        transactions: []
    });

    myModal.hide();
    alert("Conta criada com sucesso");
});


function saveAcount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
    console.log(data);

}

// checa se ta logado
function checkLogged(){
    if(session){
        sessionStorage.setItem('logged', session);
        logged = session;
    }
    if(logged){
        saveSession(logged, session);

        window.location.href = 'home.html';
}
}

// salva a sessao
function saveSession(data, saveSession ){
    if(saveSession){
        localStorage.setItem('session', data);
    }
    sessionStorage.setItem('logged', data);
}

function getAccount(key){
    const accont = localStorage.getItem(key)
    if(accont){
        return JSON.parse(accont);
    }
    return '';
}