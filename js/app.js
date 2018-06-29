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

        //event do buttona delete
        newBtnDelete.addEventListener("click", function () {
            taskList.removeChild(newLi);
        });

        //event do buttona completed
        newBtnComplete.addEventListener("click", function () {
            newLi.classList.toggle("completed");
            newLi.classList.toggle("not-completed");
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

    //Filtrowanie

    //wyswietlanie listy filtrowania
    var filterButton = document.querySelector(".filter-button");
    var filterList = document.querySelector(".filter-list");

    filterButton.addEventListener("mouseover", function(event) {
        filterList.classList.toggle("filter-list-active");

    })
    //
    // filterButton.addEventListener("mouseout", function(event) {
    //     rateTwo.forEach(function (el) {
    //         el.classList.add("hidden");
    //     });
    //     rateThree.forEach(function (el) {
    //         el.classList.add("hidden");
    //     });
    //     rateFour.forEach(function (el) {
    //         el.classList.add("hidden");
    //     });
    //     rateFive.forEach(function (el) {
    //         el.classList.add("hidden");
    //     });
    //     filterList.classList.toggle("filter-list-active");
    //
    // })

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
    // rateOneButton.addEventListener("click", function(event) {
    //     var dataRate = document.
    // })


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



    // toDoFilter.addEventListener("click", function(event) {
    //     // var doneTasks = document.querySelectorAll(".completed");
    //     var doneTasks = document.querySelectorAll(".completed");
    //     var filterAllTasks = document.querySelectorAll(".collection-item");
    //         for (var i = 0; i < filterAllTasks.length; i++) {
    //             if (filterAllTasks[i].className === "completed") {
    //
    //             } else {
    //                 doneTasks[i].classList.add ("hidden");
    //             }
    //         }
    //
    // });
    //
    // doneFilter.addEventListener("click", function(event) {
    //     var doneTasks = document.querySelectorAll(".completed");
    //     var allTasks = document.querySelectorAll(".collection-item");
    //
    //     console.log(doneTasks);
    //     // allTasks.forEach(function (el) {
    //     //     if (el.className === "completed") {
    //     //         console.log("task-done" + el);
    //     //     } else {
    //     //         el.classList.add("hidden");
    //     //         console.log("task-gowno" + el);
    //     //     }
    //     // });
    //
    //     for (var i = 0; i < allTasks.length; i++) {
    //         for (var j = 0; j < doneTasks.length; j++) {
    //             if (allTasks[i] === doneTasks[j]) {
    //
    //             } else {
    //                 allTasks[i].classList.add("hidden");
    //             }
    //         }
    //     }
    // });



});