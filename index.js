function banco() {
    const bd = [
        { id: 1, nome: "snoopy", login: "snoopy", senha: "woodstock", email: "peanuts@gmail.com" },
        { id: 2, nome: "gabriel", login: "gabriel", senha: "123", email: "gabriel@gmail.com" },
        { id: 3, nome: "Ayrton Senna", login: "senna", senha: "mclaren", email: "senna@gmail.com" }
    ];
    localStorage.setItem("bd", JSON.stringify(bd));
}

function login() {
    let bd = JSON.parse(localStorage.getItem("bd")) || [];
    let lg = document.querySelector("#login").value;
    let sn = document.querySelector("#senha").value;

    let usuario = bd.find(user => user.login === lg && user.senha === sn);

    if (usuario) {
        alert("Login realizado com sucesso!");
        window.location.href = "sobre.html";
    } else {
        alert("Login ou senha incorretos.");
    }
}

function adicionarOuEditar() {
    let bd = JSON.parse(localStorage.getItem("bd")) || [];

    let id = document.querySelector("#idUsuario").value;
    let nm = document.querySelector("#nome").value;
    let lg = document.querySelector("#login").value;
    let sn = document.querySelector("#senha").value;
    let email = document.querySelector("#email").value;

    if (!nm || !lg || !sn || !email) {
        alert("Todos os campos devem ser preenchidos!");
        return;
    }

    if (id) {
        // Editar usuário existente
        let index = bd.findIndex(user => user.id == id);
        if (index !== -1) {
            bd[index] = { id: parseInt(id), nome: nm, login: lg, senha: sn, email: email };
            alert("Usuário atualizado com sucesso!");
        }
    } else {
        // Criar novo usuário
        let novoId = bd.length > 0 ? bd[bd.length - 1].id + 1 : 1;
        bd.push({ id: novoId, nome: nm, login: lg, senha: sn, email: email });
        alert("Usuário cadastrado com sucesso!");
    }

    localStorage.setItem("bd", JSON.stringify(bd));
    limparFormulario();
    exibirUsuarios();
}

function exibirUsuarios() {
    let lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";
   
    let usuarios = JSON.parse(localStorage.getItem("bd")) || [];

    usuarios.forEach((usuario, index) => {
        let li = document.createElement("li");
        li.textContent = `${usuario.nome} - ${usuario.email}`;

        // Botão Editar
        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.style.marginLeft = "10px";
        btnEditar.onclick = function () {
            editarUsuario(usuario);
        };

        // Botão Remover
        let btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.style.marginLeft = "5px";
        btnRemover.onclick = function () {
            removerUsuario(index);
        };

        li.appendChild(btnEditar);
        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

function editarUsuario(usuario) {
    document.querySelector("#idUsuario").value = usuario.id;
    document.querySelector("#nome").value = usuario.nome;
    document.querySelector("#login").value = usuario.login;
    document.querySelector("#senha").value = usuario.senha;
    document.querySelector("#email").value = usuario.email;
}

function removerUsuario(index) {
    let bd = JSON.parse(localStorage.getItem("bd")) || [];

    if (confirm(`Tem certeza que deseja remover ${bd[index].nome}?`)) {
        bd.splice(index, 1);
        localStorage.setItem("bd", JSON.stringify(bd));
        exibirUsuarios();
    }
}

function limparFormulario() {
    document.querySelector("#idUsuario").value = "";
    document.querySelector("#nome").value = "";
    document.querySelector("#login").value = "";
    document.querySelector("#senha").value = "";
    document.querySelector("#email").value = "";
}

if (!localStorage.getItem("bd")) {
    banco();
}

function sobre(){
    window.location.href = "sobre/sobre.html";
}
function loginCadastro(){
    window.location.href = "/login/login.html";
}