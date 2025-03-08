const myModal = new bootstrap.Modal("#register-Modal");

document.getElementById('form-create').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email-create-input').value;
    const password = document.getElementById('senha-create-input').value;

    if(email.length < 5) {
        alert('Password must be at least 6 characters');
        return;
    }if(password.length < 4) {
        alert('Email must be at least 6 characters');
        return;
    }

    saveAcount({
        login:email,
        password: password,
        transactions: []
    });

    myModal.hide();
    alert("conta criada com sucesso");
});


function saveAcount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
    console.log(data);

}