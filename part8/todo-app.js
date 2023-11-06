(function (){

    function addToLocalStorage(key,item){
        localStorage.setItem(key,JSON.stringify(item));
    };

    function readLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }

    function inputStorage(itemArr,todoList,key){
        if(!itemArr){
            itemArr = [];
        }
        else{
            for (item of itemArr){
                let todoItem = createTodoItem({
                    name: item.name,
                    done: item.done,
                    id : item.id
                });
                if (todoItem.itemObject.done){
                    todoItem.itemObject.item.classList.toggle('list-group-item-success');
                }
                todoItem.doneButton.addEventListener('click', function() {
                    if (todoItem.itemObject.done === false){
                        todoItem.itemObject.done = true;
                        for (item of itemArr){
                            if (item.name === todoItem.itemObject.item.textContent.substring(0,item.name.length)){
                                item.done = true;
                                addToLocalStorage(key,itemArr);
                                break;
                            }
                        }
                    }
                    else{
                        todoItem.itemObject.done = false;
                        for (item of itemArr){
                            if (item.name === todoItem.itemObject.item.textContent.substring(0,item.name.length)){
                                item.done = false;
                                addToLocalStorage(key,itemArr);
                                break;
                            }
                        }
                    }
                    todoItem.itemObject.item.classList.toggle('list-group-item-success');
                });
    
    
                todoItem.deleteButton.addEventListener('click', function() {
                    if (confirm('Вы уверены?')) {
                        todoItem.itemObject.item.remove();
                        for (item in itemArr) {
                            if (todoItem.itemObject.id === itemArr[item].id) { 
                                itemArr.splice(item,1);
                                addToLocalStorage(key,itemArr);
                                break;
                            }
                        }
                    }
                });
                todoList.append(todoItem.itemObject.item);
            }
        }
    }

    function getId(itemArr){
        if (itemArr === null || itemArr.length === 0){
            return 0;
        }

        let maxId = -1;
        for (item of itemArr){
            if (item.id > maxId){
                maxId = item.id;
            }
        }
        return maxId + 1;
    }

    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');
        
        button.setAttribute('disabled', true);

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add("btn", 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(taskItem) {
        let itemObject = {
            item : document.createElement('li'),
            done : taskItem.done,
            id : taskItem.id
        };
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        itemObject.item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        itemObject.item.textContent = taskItem.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        itemObject.item.append(buttonGroup);

        return {
            itemObject,
            doneButton,
            deleteButton,
        };

    }

    function createTodoApp(container, title = "Список дел", listName) {
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        let itemArr = readLocalStorage(listName);

        if (itemArr === null){
            itemArr = [];
        }

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        inputStorage(itemArr,todoList,listName);
        todoItemForm.input.addEventListener('input', function() {
            if (todoItemForm.button.getAttribute('disabled')){
                todoItemForm.button.removeAttribute('disabled');
            }
        });

        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();
            todoItemForm.button.setAttribute('disabled', true);
            
            let count = getId(itemArr);
            let todoItem = createTodoItem({
                name: todoItemForm.input.value,
                done: false,
                id : count
            });
    
            todoItem.doneButton.addEventListener('click', function() {
                if (todoItem.itemObject.done === false){
                    todoItem.itemObject.done = true;
                    for (item of itemArr){
                        if (item.name === todoItem.itemObject.item.textContent.substring(0,item.name.length)){
                            item.done = true;
                            addToLocalStorage(listName,itemArr);
                            break;
                        }
                    }
                }
                else{
                    todoItem.itemObject.done = false;
                    for (item of itemArr){
                        if (item.name === todoItem.itemObject.item.textContent.substring(0,item.name.length)){
                            item.done = false;
                            addToLocalStorage(listName,itemArr);
                            break;
                        }
                    }
                }
                todoItem.itemObject.item.classList.toggle('list-group-item-success');
            });


            todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                    todoItem.itemObject.item.remove();
                    for (item in itemArr) {
                        if (todoItem.itemObject.id === itemArr[item].id) { 
                            itemArr.splice(item,1);
                            addToLocalStorage(listName,itemArr);
                            break;
                        }
                    }
                }
            });

            itemArr.push({
                id: count,
                name : todoItemForm.input.value,
                done: todoItem.itemObject.done,
            })
            addToLocalStorage(listName,itemArr);

            todoList.append(todoItem.itemObject.item);
            todoItemForm.input.value = '';
        });
    }
    
    window.createTodoApp = createTodoApp;
})();