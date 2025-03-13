const myModal = new bootstrap.Modal("#transactions-modal");
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');
let data = {
    transactions:[]
};


document.getElementById("btn-logout").addEventListener('click', logout);

// Adicionarlancamento

document.getElementById("form-transsaction").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("data-input").value; // Mudança para evitar conflito com o nome 'data'
    const type = document.querySelector('input[name="type-input"]:checked').value;

    // Verifica se data.transactions é um array; se não, inicializa como um array vazio
    if (!Array.isArray(data.transactions)) {
        data.transactions = [];
    }

    // Adiciona o novo lançamento no início do array transactions
    data.transactions.unshift({
        value: value,
        description: description,
        date: date,  // Alterado para 'date' para evitar conflito com a variável 'data'
        type: type
    });

    // Salva os dados atualizados
    saveData(data);

    e.target.reset();
    myModal.hide();

    alert("Lançamento realizado com sucesso");
});



checkLogged();
function checkLogged(){
    if(session){
        sessionStorage.setItem('logged', session);
        logged = session;
    }
    if(!logged){
        window.location.href = 'index.html';
        return;
    }
    const dataUser = localStorage.getItem(logged);
        if(dataUser){
            data =JSON.parse(dataUser);
    }
    console.log(data);
}

function logout(){
    sessionStorage.removeItem('logged');
    localStorage.removeItem('session');

    window.location.href = 'index.html';
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));

}