document.addEventListener("DOMContentLoaded", function () {

    //Wyświetlanie i ukrywanie formularza
    var newTask = document.getElementById("task-new");
    var taskForm = document.querySelector(".task-features")

    newTask.addEventListener("click", function(event){
        taskForm.classList.toggle("task-features-display");
    });

    //Priorytet - podświetlanie gwiazdek
    var priority = document.getElementById("priority");
    var stars = document.querySelectorAll(".fa-star");
    var starCount;

    priority.addEventListener("change", function(){
        var starNumber = priority.value;
        if (starNumber < starCount){
            stars[starCount-1].classList.remove("checked");
        } else {
            for (var i = 0; i < starNumber; i++) {
                stars[i].classList.add("checked");
            }
        }
        starCount = priority.value;

    });

    //DODAWANIE NOWEGO TASKA DO LISTY
    //Elementy
    var addTask = document.getElementById("task-add");
    var taskList = document.getElementById("task-list");
    var task = document.getElementById("task");
    var date = document.getElementById("date");
    var priority = document.getElementById("priority");
    var description = document.getElementById("description");

    addTask.addEventListener("click", function(event){

        //Nowe elementy (dzieci i buttony)
        var newLi           = document.createElement("li");
        var newTask         = document.createElement("h3");
        var newDate         = document.createElement("span");
        var newPriority     = document.createElement("div");
        var newDescription  = document.createElement("p");
        var newBtnDelete    = document.createElement("a");
        var newBtnComplete  = document.createElement("a");

        //Tworzenie giwazdek
        for (var i = 0; i < priority.value; i++){
            var newStar = document.createElement("span");
            newStar.classList.add("fa");
            newStar.classList.add("fa-star");
            newStar.classList.add("checked");
            newPriority.appendChild(newStar);
        }

        //Wewnętrzne do poszczególnych elentów

        newTask.innerText           = task.value;
        newDate.innerText           = date.value;
        newDescription.innerText    = description.value;
        newBtnDelete.innerHTML      = '<i class="far fa-times-circle"></i>';
        newBtnComplete.innerHTML    = '<i class="far fa-check-circle"></i>';
        // //

        //Klasy poszczególnych elementów
        newLi.classList.add("collection-item");
        newTask.classList.add("title");
        newDate.classList.add("till");
        newPriority.classList.add("priority");
        newDescription.classList.add("remark");
        newBtnDelete.classList.add("task-delete");
        newBtnComplete.classList.add("task-complete");


        //dodanie elementów do głównego li
        newLi.appendChild(newTask);
        newLi.appendChild(newBtnDelete);
        newLi.appendChild(newBtnComplete);
        newLi.appendChild(newPriority);
        newLi.appendChild(newDate);
        newLi.appendChild(newDescription);

        taskList.appendChild(newLi);

        //event do buttona delete
        newBtnDelete.addEventListener("click", function () {
            taskList.removeChild(newLi);
        });

        //event do buttona completed
        newBtnComplete.addEventListener("click", function () {
            newLi.classList.toggle("completed");
        });

        //ukrywanie formularza po kliknięciu
        taskForm.classList.toggle("task-features-display");

        //czyszczenie wartości formularza
        task.value = "";
        date.value = "";
        priority.value = "";
        description.value = "";
    });


    //USUWANIE WSZYSTKICH TASKÓW Z LISTY
    var deleteTasks = document.getElementById("clear")

    deleteTasks.addEventListener("click", function(event){
        var allTasks = document.querySelectorAll(".collection-item");

        for (var i = 0; i < allTasks.length; i++) {
            allTasks[i].parentElement.removeChild(allTasks[i]);
        }
    });

});