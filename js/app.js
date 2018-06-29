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

    //funkcja sprawdzajaca czy cos jest w local storage
    function checkLocalStorage() {
        var tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
          } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
          }
        return tasks;  
    }


    addTask.addEventListener("click", function(event){

        //walidacja

        if (validation(task.value) === false) {
            alert("Your task name has incorrect length. Please try again! ");
            e.stopImmediatePropagation();
        }

        //Nowe elementy (dzieci i buttony)
        var newLi           = document.createElement("li");
        var newTask         = document.createElement("h3");
        var newDate         = document.createElement("span");
        var newPriority     = document.createElement("div");
        var newDescription  = document.createElement("p");
        var newBtnDelete    = document.createElement("a");
        var newBtnComplete  = document.createElement("a");
        var priorityClass = "prio-" + priority.value;


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
        newLi.classList.add(priorityClass);
        newLi.classList.add("not-completed");


        //dodanie elementów do głównego li
        newLi.appendChild(newTask);
        newLi.appendChild(newBtnDelete);
        newLi.appendChild(newBtnComplete);
        newLi.appendChild(newPriority);
        newLi.appendChild(newDate);
        newLi.appendChild(newDescription);

        taskList.appendChild(newLi);

        // Zapisywanie  wartosic inputow w local storage
        var storageInfo = {title: task.value, date: date.value, priority: priority.value, description: description.value, isCompleted: false};
        storeTaskInLocalStorage(storageInfo);
        
        //event do buttona delete
        newBtnDelete.addEventListener("click",  removeTask);

        //event do buttona completed
        newBtnComplete.addEventListener("click", function () {
            newLi.classList.toggle("completed");
            newLi.classList.toggle("not-completed");
            changeCompletedInLocalStorage(this.parentElement);

        });

        //ukrywanie formularza po kliknięciu
        taskForm.classList.toggle("task-features-display");

        //czyszczenie wartości formularza
        task.value = "";
        date.value = "";
        priority.value = "";
        description.value = "";


    });


    // funkcja zapisujaca dane do tablicy w localstorage
    function storeTaskInLocalStorage(task) {
        var tasks = checkLocalStorage();

        tasks.push(task);
      
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // funkcja wczytująca informacji z local storage
    function getTasks() {
        var tasks = checkLocalStorage();
        
        //robimy loopa przez klucze w tablicy tasks
        tasks.forEach(function(key){
            //Nowe elementy (dzieci i buttony)
            var newLi           = document.createElement("li");
            var newTask         = document.createElement("h3");
            var newDate         = document.createElement("span");
            var newPriority     = document.createElement("div");
            var newDescription  = document.createElement("p");
            var newBtnDelete    = document.createElement("a");
            var newBtnComplete  = document.createElement("a");

            //Tworzenie giwazdek
            for (var i = 0; i < key.priority; i++){
                var newStar = document.createElement("span");
                newStar.classList.add("fa");
                newStar.classList.add("fa-star");
                newStar.classList.add("checked");
                newPriority.appendChild(newStar);
            }

            //Wewnętrzne do poszczególnych elentów
            newTask.innerText           = key.title; //od klucza tasks
            newDate.innerText           = key.date;
            newDescription.innerText    = key.description;
            newBtnDelete.innerHTML      = '<i class="far fa-times-circle"></i>';
            newBtnComplete.innerHTML    = '<i class="far fa-check-circle"></i>';

            //Klasy poszczególnych elementów
            newLi.classList.add("collection-item");
            if(key.isCompleted === true){
                newLi.classList.add("completed");
            }
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
            newBtnDelete.addEventListener("click", removeTask);

            //event do buttona completed
            newBtnComplete.addEventListener("click", function () {
                newLi.classList.toggle("completed");
                changeCompletedInLocalStorage(newLi);
            });
        });
    }

    // wywolanie funkcji wczytujacej z local storage
    getTasks();

    //usuwanie taska pojedynczo
    function removeTask(e) {
        if(e.target.parentElement.classList.contains('task-delete')) {
            e.target.parentElement.parentElement.remove();
            // usuwanie z local storage 
            removeTaskFromLocalStorage(e.target.parentElement.parentElement); 
        }
    }

    // funkcja usuwajaca elementy pojedynczo z local storage
    function removeTaskFromLocalStorage(removedTask) {
        var tasks = checkLocalStorage();
      
        tasks.forEach(function(task, index){
          if( task.title === removedTask.children[0].innerHTML && task.description === removedTask.children[5].innerHTML) {
            tasks.splice(index, 1);
          }
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
   
    // funkcja sprawdzajaca czy task jest complited
    function changeCompletedInLocalStorage(completedTask){
        var tasks = checkLocalStorage();

        tasks.forEach(function(task){
            if(task.title === completedTask.children[0].innerHTML && task.description === completedTask.children[5].innerHTML){
                if(task.isCompleted){
                    task.isCompleted = false;
                }else{
                    task.isCompleted = true;
                } 
            }
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // funkcja czyszczaca caly  local storage
    function clearTasksFromLocalStorage() {
        localStorage.removeItem('tasks');
    }

    //USUWANIE WSZYSTKICH TASKÓW Z LISTY
    var deleteTasks = document.getElementById("clear")

    deleteTasks.addEventListener("click", function(event){
        var allTasks = document.querySelectorAll(".collection-item");
        clearTasksFromLocalStorage()
        for (var i = 0; i < allTasks.length; i++) {
            allTasks[i].parentElement.removeChild(allTasks[i]);
        }
    });

    //Filtrowanie

    //wyswietlanie listy filtrowania
    var filterButton = document.querySelector(".filter-button");
    var filterList = document.querySelector(".filter-list");

    filterButton.addEventListener("mouseover", function(event) {
        filterList.classList.toggle("filter-list-active");

    })


    var rateOneButton = document.querySelector("#rate-one");
    var rateTwoButton = document.querySelector("#rate-two");
    var rateThreeButton = document.querySelector("#rate-three");
    var rateFourButton = document.querySelector("#rate-four");
    var rateFiveButton = document.querySelector("#rate-five");


    var doneFilter = document.querySelector("#done-filter");
    var toDoFilter = document.querySelector("#todo-filter");
    var resetFilter = document.querySelector("#reset-filter")



    rateOneButton.addEventListener("click", function(event) {

            var rateTwo = document.querySelectorAll(".prio-2");
            var rateThree = document.querySelectorAll(".prio-3");
            var rateFour = document.querySelectorAll(".prio-4");
            var rateFive = document.querySelectorAll(".prio-5");
        console.log(rateTwo);

        rateTwo.forEach(function (el) {
           el.classList.add("hidden");
        });
        rateThree.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateFour.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateFive.forEach(function (el) {
            el.classList.add("hidden");
        });

    })


    rateTwoButton.addEventListener("click", function(event) {

        var rateOne = document.querySelectorAll(".prio-1");
        var rateThree = document.querySelectorAll(".prio-3");
        var rateFour = document.querySelectorAll(".prio-4");
        var rateFive = document.querySelectorAll(".prio-5");

        rateOne.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateThree.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateFour.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateFive.forEach(function (el) {
            el.classList.add("hidden");
        });

    })


    rateThreeButton.addEventListener("click", function(event) {

        var rateOne = document.querySelectorAll(".prio-1");
        var rateTwo = document.querySelectorAll(".prio-2");
        var rateFour = document.querySelectorAll(".prio-4");
        var rateFive = document.querySelectorAll(".prio-5");

        rateTwo.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateOne.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateFour.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateFive.forEach(function (el) {
            el.classList.add("hidden");
        });

    })


    rateFourButton.addEventListener("click", function(event) {

        var rateOne = document.querySelectorAll(".prio-1");
        var rateTwo = document.querySelectorAll(".prio-2");
        var rateThree = document.querySelectorAll(".prio-3");

        var rateFive = document.querySelectorAll(".prio-5");
        console.log(rateTwo);

        rateTwo.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateThree.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateOne.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateFive.forEach(function (el) {
            el.classList.add("hidden");
        });

    })

    rateFiveButton.addEventListener("click", function(event) {

        var rateOne = document.querySelectorAll(".prio-1");
        var rateTwo = document.querySelectorAll(".prio-2");
        var rateThree = document.querySelectorAll(".prio-3");

        var rateFour = document.querySelectorAll(".prio-4");
        console.log(rateTwo);

        rateTwo.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateThree.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateOne.forEach(function (el) {
            el.classList.add("hidden");
        });
        rateFour.forEach(function (el) {
            el.classList.add("hidden");
        });

    })


    toDoFilter.addEventListener("click", function(event) {
        var doneTasks = document.querySelectorAll(".completed");


        doneTasks.forEach(function (el) {
            el.classList.add ("hidden");
        });
    });

    doneFilter.addEventListener("click", function(event) {
        var toDoTasks = document.querySelectorAll(".not-completed")

        toDoTasks.forEach(function (el) {
            el.classList.add ("hidden");
        });
    });

    resetFilter.addEventListener("click", function(event) {

        var allTasks = document.querySelectorAll(".collection-item");
        allTasks.forEach(function (el) {
            el.classList.remove("hidden");
        })
    })


    //warunek walidacji
    function validation(value) {
        if (value.length > 5 && value.length < 100) {
            return true;
        } else {
            return false;
        }
    }
});