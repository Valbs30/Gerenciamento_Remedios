document.querySelector("#salvar").addEventListener("click", cadastrar_prod)

let produtos = []

window.addEventListener("load", () => {
    produtos = JSON.parse(localStorage.getItem("produtos")) || []
    atualizar_prod()
})

document.querySelector("#busca").addEventListener("keyup", ()=> {
    let busca = document.querySelector("#busca").value
    let produtosFiltrados = produtos.filter((produto) =>{
        return produto.nome_prod.toLowerCase().includes(busca.toLowerCase())
    })
    filtrar_prod(produtosFiltrados)
})

function filtrar_prod(produtos){
    document.querySelector("#produtos").innerHTML = ""
    produtos.forEach((produto) => {
        document.querySelector("#produtos").innerHTML += createCard_prod(produto)
    })
}

function atualizar_prod(){
    document.querySelector("#produtos").innerHTML = ""
    localStorage.setItem("produtos", JSON.stringify(produtos)) //("nome", array)
    produtos.forEach((produto) => {
        document.querySelector("#produtos").innerHTML += createCard_prod(produto)
    })
}

function cadastrar_prod(){
    const nome_prod = document.querySelector("#nome_prod").value
    const descricao = document.querySelector("#descricao").value
    const categoria = document.querySelector("#categoria").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal1"))

    const produto = {
        id_prod: Date.now(),
        nome_prod: nome_prod,//ou somente nome, nomevariavel: nomevariavel
        descricao,
        categoria: categoria
    }
    
    if (!validar_prod(produto.nome_prod, document.querySelector("#nome_prod"))) return
    if (!validar_prod(produto.descricao, document.querySelector("#descricao"))) return

    produtos.push(produto)

    atualizar_prod()

    modal.hide()
}

function validar_prod(valor, campo){
    // clean code
    if(valor == ""){
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }

    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
    return true

}

function apagar_prod(id_prod){
    
    produtos = produtos.filter((produto) => {
        return produto.id_prod != id_prod
    })
    atualizar_prod()
}

function createCard_prod(produto){
    return `
        <div class="col-lg-3 col-md-6 col-12 mt-2">
            <div class="card">
                <div class="card-header bg-secondary-subtle">
                    ${produto.nome_prod}
                </div>
                <div class="card-body">
                    <p class="card-text">${produto.descricao}</p>
                    <p>
                        <span class="badge text-bg-info">${produto.categoria}</span>
                    </p>
                    <a href="#" class="btn btn-primary" title="Editar produto">
                        <i class="bi bi-pencil"></i>
                    </a>
                    <a onClick="apagar_prod(${produto.id_prod})" href="#" class="btn btn-danger" title="Apagar produto">
                        <i class="bi bi-trash"></i>
                    </a>
                </div> <!-- card-body -->
            </div> <!-- card -->
        </div> <!-- col -->
    ` //template literals
}