(function (){
    const studentsList = [
        {
            name: "Егор",
            surname: "Хренов",
            fatherName: "Сергеевич",
            date: "2004-07-01",
            year: "2022",
            faculty: "ИВТ"
        },
        {
            name: "Сергей",
            surname: "Иванов",
            fatherName: "Иванович",
            date: "2002-07-11",
            year: "2018",
            faculty: "информатика"
        },
        {
            name: "Виктор",
            surname: "Иванов",
            fatherName: "Иванович",
            date: "2002-01-21",
            year: "2020",
            faculty: "русский язык"
        },
        {
            name: "Анатолий",
            surname: "Иванов",
            fatherName: "Иванович",
            date: "2002-04-04",
            year: "2020",
            faculty: "гум"
        },
        {
            name: "Артём",
            surname: "Иванов",
            fatherName: "Иванович",
            date: "2002-02-17",
            year: "2020",
            faculty: "мат"
        },
    ]

    function sortText(text){
        return (a, b) => a[text].toLowerCase()  > b[text].toLowerCase()  ? 1 : -1;
    }

    function sortYearLearning(year){
        return ((a, b) => Number(a.year)  - Number(b.year));
    }

    function get_current_age(date,param) {
        var d = date.split('-');
        if (param === "age") date = d[1]+'-'+d[2]+'-'+d[0];
        else date = d[2]+'-'+d[1]+'-'+d[0];
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }

    function reverseDate(date){
        let d = date.split("-");
        return d[2] + "-" + d[1] + "-" + d[0];
    }

    function checkDate(year){
        let text = get_current_age("01-09-" + String(year),"year") + 1
        if (text > 4){
            return " (закончил)";
        }
        else{
            return " (" + String(text) + " курс)";
        }
    }

    function getStudentItem(studentObj) {
        let tr = document.createElement("tr")
        let fullName = [studentObj.surname,studentObj.name,studentObj.fatherName].join(" ");
        let faculty = studentObj.faculty;
        let dateAge = reverseDate(studentObj.date) + " (" + get_current_age(studentObj.date,"age") + " лет)";
        let studentYear = String(studentObj.year) + " - " + String(Number(studentObj.year) + 4) + checkDate(studentObj.year);
        let list = [fullName, faculty,dateAge,studentYear];
        for (let x of list){
            let td = document.createElement("td");
            td.textContent = x;
            tr.append(td);
        }
        return tr;
    }

    function checkZero(number){
        if (number.length === 1){
            return String(0) + number;
        }
        return number;
    }

    function createFilter(div, table){
        let button = document.getElementById("filterButton");
        let fl = true;
        button.addEventListener("click", function(){
            if (fl){
                let search = document.createElement("input");
                let select = document.createElement("select");
                let optionArray = ["По ФИО", "По факультету", "По году начала обучения", "По году окончания обучения"];
                for (let i = 0; i < 4; i++){
                    let option = document.createElement("option");
                    option.textContent = optionArray[i];
                    select.append(option);
                }
                search.addEventListener("input", function(){
                    filterText(table, search.value, select.selectedIndex);
                })
                div.append(search);
                div.append(select);
                fl = false
            }
            else{
                fl = true
                div.children[1].remove();
                div.children[1].remove();
            }
        });
    }

    function filterText(table, find, condition){
        if (condition === 0 || condition=== 1){
            if (condition === 0){
                const filteredArray = studentsList.filter(student => 
                    student.surname.toLowerCase().startsWith(find.toLowerCase()) ||
                    student.name.toLowerCase().startsWith(find.toLowerCase()) ||
                    student.fatherName.toLowerCase().startsWith(find.toLowerCase())
                )
                table.innerHTML = "";
                for (let student of filteredArray){
                    let tr = getStudentItem(student);
                    table.append(tr);
                } 
            }
            else{
                const filteredArray = studentsList.filter(student => 
                    student.faculty.toLowerCase().startsWith(find.toLowerCase())
                )
                table.innerHTML = "";
                for (let student of filteredArray){
                    let tr = getStudentItem(student);
                    table.append(tr);
                } 
            }
        }
        else{
            if (condition === 2){
                const filteredArray = studentsList.filter(student => find === "" || student.year === find)
                table.innerHTML = "";
                for (let student of filteredArray){
                    let tr = getStudentItem(student);
                    table.append(tr);
                } 
            }
            else{
                const filteredArray = studentsList.filter(student => find === "" || String((Number(student.year) + 4)) === find)
                table.innerHTML = "";
                for (let student of filteredArray){
                    let tr = getStudentItem(student);
                    table.append(tr);
                } 
            }
        }
    }


    function renderStudentsTable(studentsArray) {
        let div = document.getElementById("filterContanier");
        let table = document.getElementById("table");
        let form = document.getElementById("form");
        let fio = document.getElementById("sortFio");
        let sortFaculty = document.getElementById("sortFaculty");
        let sortYear = document.getElementById("sortYear");
        let sortDate = document.getElementById("sortDate");
        for (let student of studentsArray){
            let tr = getStudentItem(student);
            table.append(tr);
        }
        createFilter(div, table);
        fio.addEventListener("click", function(){
            studentsArray.sort((a, b) => (a.surname + a.name + a.fatherName).toLowerCase() > (b.surname + b.name + b.fatherName).toLowerCase()  ? 1 : -1);
            table.innerHTML = "";
            for (let student of studentsArray){
                let tr = getStudentItem(student);
                table.append(tr);
            }

        });
        sortDate.addEventListener("click", function(){
            studentsArray.sort(sortText("date"));
            table.innerHTML = "";
            for (let student of studentsArray){
                let tr = getStudentItem(student);
                table.append(tr);
            }

        });
        sortFaculty.addEventListener("click", function(){
            studentsArray.sort(sortText("faculty"));
            table.innerHTML = "";
            for (let student of studentsArray){
                let tr = getStudentItem(student);
                table.append(tr);
            }

        });
        sortYear.addEventListener("click", function(){
            studentsArray.sort(sortYearLearning("year"));
            table.innerHTML = "";
            for (let student of studentsArray){
                let tr = getStudentItem(student);
                table.append(tr);
            }

        });
        form.addEventListener('submit', function(e){
            e.preventDefault();
            let date = document.getElementById("date").value;
            let name = document.getElementById("name").value;
            let surname = document.getElementById("surname").value;
            let fatherName = document.getElementById("fatherName").value;
            let year = document.getElementById("year").value;
            let faculty = document.getElementById("faculty").value;
            table.append(getStudentItem({
                surname: surname,
                name : name,
                fatherName: fatherName,
                date: date,
                year: year,
                faculty: faculty
            }))
            studentsArray.push({
                surname: surname,
                name : name,
                fatherName: fatherName,
                date: date,
                year: year,
                faculty: faculty
            })
        });

    }
    document.addEventListener('DOMContentLoaded', function() {
        Data = new Date();
        let date = document.getElementById("date");
        date.setAttribute("max",Data.getFullYear() + "-" + checkZero(String(Data.getMonth()+1)) + "-" + checkZero(String(Data.getDate())));
        renderStudentsTable(studentsList);
    });
})();