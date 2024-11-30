var overlay = document.getElementById("overlay")

var newtarefa = document.getElementById("criarTarefa")

var lista = document.getElementById("lista")

function tarefa(){
    

    overlay.classList.add("active") /*adiciona ao overlay as declarações da classe active */
    newtarefa.classList.add("active")


}



function fecharTarefa(){
    overlay.classList.remove("active")/* remove do overlay as declarações do active */
    newtarefa.classList.remove("active")
}

function buscarTarefa(){
    fetch("http://localhost:3000/tarefas")
    .then(tarefas => tarefas.json())
    .then(tarefas => {
        inserirTarefas(tarefas)
    })
} buscarTarefa();




function inserirTarefas(listaDeTarefas){
    if(listaDeTarefas.length > 0){
        lista.innerHTML = ""
        listaDeTarefas.map(tarefa => {
           lista.innerHTML += `
                     <li>
                        <h5> ${tarefa.titulo} </h5>
                        <p> ${tarefa.descricao} </p>
                        <div class="actions" >
                            <box-icon name='edit-alt'></box-icon>
                            <box-icon onclick="deletarTarefa(${tarefa.id})" type='solid' name='trash-alt' size="sm" ></box-icon>
                        </div>
                    </li>
           `
        })
    }
}


function criarTarefa(){
    event.preventDefault() /*impede que seja feito o recarregamento */
    
    var titulo = document.getElementById("titulo")
    var descricao = document.getElementById("descricao")

    let formularioTarefas = {
        titulo : titulo.value,
        descricao: descricao.value
    }


    fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify(formularioTarefas)

    }).then(res => res.json())
    .then(res => {
        console.log(res)
       
    })
    fecharTarefa()

}



function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
    .then(res => {
        console.log(res);
        buscarTarefa(); 
    });
}






