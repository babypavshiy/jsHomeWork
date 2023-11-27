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
                },key,itemArr);
                if (todoItem.itemObject.done){
                    todoItem.itemObject.item.classList.toggle('list-group-item-success');
                }
                todoList.append(todoItem.itemObject.item);
            }
        }
    }

    function getId(itemArr){
        if (!itemArr?.length){
            return 0;
        }
        itemArr.sort((a, b) => a.id < b.id ? 1 : -1);
        console.log(itemArr)
        return itemArr[0].id + 1;
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

    function createTodoItem(taskItem, listName, itemArr) {
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
        
        doneButton.addEventListener('click', function() {
            itemObject.done = !itemObject.done;
            itemArr.find((elem) => elem.name === itemObject.item.textContent.substring(0,elem.name.length)).done = !itemArr.find((elem) => elem.name === itemObject.item.textContent.substring(0,elem.name.length)).done;
            addToLocalStorage(listName,itemArr);
            itemObject.item.classList.toggle('list-group-item-success');
        });


        deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
                itemObject.item.remove();
                itemArr.splice(itemArr.findIndex((elem)=>elem.id === itemObject.id),1);
                addToLocalStorage(listName,itemArr);
            }
        });

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
            },listName,itemArr);
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