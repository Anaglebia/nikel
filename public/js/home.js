const myModal = new bootstrap.Modal("#transactions-modal");
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');
let data = {
    transactions:[]
};


document.getElementById("btn-logout").addEventListener('click', logout);
document.getElementById("transaction-button").addEventListener('click', function(e){
    window.location.href = 'transactions.html';
});


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

    getCashIn();
    getCahsOut();
    getTotal();
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
    getCashIn();
    getCahsOut();
    getTotal();
}

function logout(){
    sessionStorage.removeItem('logged');
    localStorage.removeItem('session');

    window.location.href = 'index.html';
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));

}




function getCashIn() {
    const transactions = data.transactions;

    // Filtra transações do tipo '1'
    const cashIn = transactions.filter(item => item.type === '1');
    
    if (cashIn.length) {
        let cashInHtml = '';
        const limit = cashIn.length > 5 ? 5 : cashIn.length;

        // Laço que itera no máximo até o limite de 5
        for (let index = 0; index < limit; index++) {
            const transaction = cashIn[index]; // Define uma variável para o item atual da iteração
            cashInHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">${transaction.value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${transaction.description}</p> <!-- Aqui você pode ajustar o campo conforme necessário -->
                                </div>
                                <div class="col-12 col-md-3 justify-content-end">
                                    ${transaction.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById("cashIn").innerHTML = cashInHtml;
    }

    console.log(cashIn);
}


function getCahsOut() {
    const transactions = data.transactions;

    const cashIn = transactions.filter(item => item.type === '2');
    
    if (cashIn.length) {
        let cashInHtml = '';
        const limit = cashIn.length > 5 ? 5 : cashIn.length;

        for (let index = 0; index < limit; index++) {
            const transaction = cashIn[index]; // Define uma variável para o item atual da iteração
            cashInHtml += `
                <div class="row mb-4">
                    <div class="col-12">
                        <h3 class="fs-2">${transaction.value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${transaction.description}</p> <!-- Aqui você pode ajustar o campo conforme necessário -->
                                </div>
                                <div class="col-12 col-md-3 justify-content-end">
                                    ${transaction.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        document.getElementById("cashOut").innerHTML = cashInHtml;
    }

    console.log(cashIn);
}


function getTotal(){
    const transactions = data.transactions;

    total = 0;
    transactions.forEach((item) =>{
        if(item.type ==='1'){
            total += item.value;
        }else{
            total -= item.value;
        }
    });
    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;

}
