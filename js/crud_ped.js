document.querySelector("#salvar1").addEventListener("click", cadastrar_ped)

let pedidos = []

window.addEventListener("load", () => {
    pedidos = JSON.parse(localStorage.getItem("pedidos")) || []
    atualizar_ped()
})

document.querySelector("#busca").addEventListener("keyup", ()=> {
    let busca = document.querySelector("#busca").value
    let pedidosFiltrados = pedidos.filter((pedido) =>{
        return pedido.produto_ped.toLowerCase().includes(busca.toLowerCase())
    })
    filtrar_ped(pedidosFiltrados)
})

function filtrar_ped(pedidos){
    document.querySelector("#pedidos").innerHTML = ""
    pedidos.forEach((pedido) => {
        document.querySelector("#pedidos").innerHTML += createCard_ped(pedido)
    })
}

function atualizar_ped(){
    document.querySelector("#pedidos").innerHTML = ""
    localStorage.setItem("pedidos", JSON.stringify(pedidos)) //("nome", array)
    pedidos.forEach((pedido) => {
        document.querySelector("#pedidos").innerHTML += createCard_ped(pedido)
    })
}

function cadastrar_ped(){
    const produto_ped = document.querySelector("#prod_ped").value
    const quantidade = document.querySelector("#quantidade").value
    const modal2 = bootstrap.Modal.getInstance(document.querySelector("#exampleModal2"))

    const pedido = {
        id_ped: Date.now(),
        produto_ped: produto_ped,
        quantidade,
        concluido_ped: false
    }
    
    if (!validar_ped(pedido.produto_ped, document.querySelector("#prod_ped"))) return
    if (!validar_ped(pedido.quantidade, document.querySelector("#quantidade"))) return

    pedidos.push(pedido)

    atualizar_ped()

    modal2.hide()
}

function validar_ped(valor, campo){
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

function apagar_ped(id_ped){
    
    pedidos = pedidos.filter((pedido) => {
        return pedido.id_ped != id_ped
    })
    atualizar_ped()
}

function concluir_ped(id_ped){
    let pedidoEncontrado = pedidos.find((pedido) => {
        return pedido.id_ped == id_ped
    })
    pedidoEncontrado.concluido_ped = true
    atualizar_ped()

}

function createCard_ped(pedido){
    let disabled = pedido.concluido_ped ? "disabled" : ""

    return `
        <div class="col-lg-3 col-md-6 col-12 mt-2">
            <div class="card">
                <div class="card-header bg-secondary-subtle">
                    ${pedido.produto_ped}
                </div>
                <div class="card-body">
                    <p class="card-text">${pedido.quantidade}</p>
                    <a onClick="concluir_ped(${pedido.id_ped})" href="#" class="btn btn-success ${disabled}" title="Concluir pedido">
                        <i class="bi bi-check-lg"></i>
                    </a>
                    <a href="#" class="btn btn-primary" title="Editar pedido">
                        <i class="bi bi-pencil"></i>
                    </a>
                    <a onClick="apagar_ped(${pedido.id_ped})" href="#" class="btn btn-danger" title="Apagar pedido">
                        <i class="bi bi-trash"></i>
                    </a>
                </div> <!-- card-body -->
            </div> <!-- card -->
        </div> <!-- col -->
    ` //template literals
}